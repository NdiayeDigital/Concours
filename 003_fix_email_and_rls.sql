-- =========================================================================
-- ECOM ACADEMIE — MIGRATION 003: FIX EMAIL CONSTRAINT & RLS POLICIES
-- =========================================================================
-- INSTRUCTIONS: 
-- 1. Copiez l'intégralité de ce fichier.
-- 2. Allez sur votre Dashboard Supabase (https://supabase.com/).
-- 3. Cliquez sur "SQL Editor" dans le menu latéral gauche.
-- 4. Créez une nouvelle requête, collez ce script, et cliquez "Run".
-- =========================================================================

-- =============================================
-- ÉTAPE 1: SUPPRIMER LA CONTRAINTE EMAIL
-- =============================================
-- L'ancien schéma exigeait un email @univ-thies.sn uniquement.
-- Ecom Academie accepte tous les emails (gmail, yahoo, etc.)
ALTER TABLE public.inscriptions DROP CONSTRAINT IF EXISTS inscriptions_email_check;


-- =============================================
-- ÉTAPE 2: CORRIGER LES POLITIQUES RLS POUR INSCRIPTIONS
-- =============================================
-- On s'assure que les politiques sont correctes :
-- - INSERT public autorisé (formulaire d'inscription)
-- - SELECT/DELETE interdits publiquement (uniquement via RPC sécurisées)

ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert" ON public.inscriptions;
DROP POLICY IF EXISTS "Allow public read" ON public.inscriptions;
DROP POLICY IF EXISTS "Allow public delete" ON public.inscriptions;
DROP POLICY IF EXISTS "Deny public select" ON public.inscriptions;
DROP POLICY IF EXISTS "Deny public delete" ON public.inscriptions;

-- Autoriser l'insertion publique (formulaire)
CREATE POLICY "Allow public insert" 
ON public.inscriptions 
FOR INSERT 
WITH CHECK (true);

-- Bloquer la lecture publique (seulement via RPC get_all_inscriptions)
CREATE POLICY "Deny public select" 
ON public.inscriptions 
FOR SELECT 
USING (false);

-- Bloquer la suppression publique (seulement via RPC delete_inscription)
CREATE POLICY "Deny public delete" 
ON public.inscriptions 
FOR DELETE 
USING (false);


-- =============================================
-- ÉTAPE 3: CORRIGER LES POLITIQUES RLS POUR EVENEMENTS
-- =============================================
ALTER TABLE public.evenements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select on evenements" ON public.evenements;
DROP POLICY IF EXISTS "Deny public mutate on evenements" ON public.evenements;
DROP POLICY IF EXISTS "Allow public insert on evenements" ON public.evenements;
DROP POLICY IF EXISTS "Allow public delete on evenements" ON public.evenements;

-- Autoriser la lecture publique des événements (homepage)
CREATE POLICY "Allow public select on evenements"
ON public.evenements
FOR SELECT
USING (true);

-- Autoriser l'insertion via service_role ou RPC sécurisée
CREATE POLICY "Allow public insert on evenements"
ON public.evenements
FOR INSERT
WITH CHECK (true);

-- Autoriser la suppression via service_role ou RPC sécurisée
CREATE POLICY "Allow public delete on evenements"
ON public.evenements
FOR DELETE
USING (true);


-- =============================================
-- ÉTAPE 4: INSÉRER L'ADMIN Ecom221 (si pas déjà fait)
-- =============================================
-- Le hash est généré avec pgcrypto crypt() pour compatibilité avec verify_admin
INSERT INTO public.admin_users (username, password_hash)
VALUES (
  'Ecom221',
  crypt('EcomAcademie', gen_salt('bf'))
)
ON CONFLICT (username) DO UPDATE SET password_hash = crypt('EcomAcademie', gen_salt('bf'));


-- =============================================
-- ÉTAPE 5: RECRÉER LES RPC SÉCURISÉES (CORRIGÉES)
-- =============================================

-- RPC: Vérifier un admin
CREATE OR REPLACE FUNCTION public.verify_admin(p_username text, p_password text)
RETURNS boolean AS $$
DECLARE
  v_match boolean;
BEGIN
  SELECT (password_hash = crypt(p_password, password_hash)) INTO v_match
  FROM admin_users
  WHERE username = p_username;
  
  RETURN COALESCE(v_match, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC: Lire toutes les inscriptions (admin authentifié)
CREATE OR REPLACE FUNCTION public.get_all_inscriptions(p_username text, p_password text)
RETURNS TABLE (
  id uuid,
  nom text,
  prenom text,
  telephone text,
  email text,
  ufr text,
  filiere text,
  niveau text,
  created_at timestamptz
) AS $$
BEGIN
  IF public.verify_admin(p_username, p_password) THEN
    RETURN QUERY 
    SELECT i.id, i.nom, i.prenom, i.telephone, i.email, i.ufr, i.filiere, i.niveau, i.created_at
    FROM inscriptions i
    ORDER BY i.created_at DESC;
  ELSE
    RAISE EXCEPTION 'Non autorisé : Identifiants administrateur invalides.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC: Supprimer une inscription (admin authentifié)
CREATE OR REPLACE FUNCTION public.delete_inscription(p_id uuid, p_username text, p_password text)
RETURNS void AS $$
BEGIN
  IF public.verify_admin(p_username, p_password) THEN
    DELETE FROM inscriptions WHERE id = p_id;
  ELSE
    RAISE EXCEPTION 'Non autorisé : Identifiants administrateur invalides.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC: Créer un événement (admin authentifié)
CREATE OR REPLACE FUNCTION public.create_evenement(
  p_titre text,
  p_date_evenement text,
  p_lieu text,
  p_inscription_requise boolean,
  p_lien_inscription text,
  p_username text,
  p_password text
)
RETURNS uuid AS $$
DECLARE
  v_id uuid;
BEGIN
  IF public.verify_admin(p_username, p_password) THEN
    INSERT INTO public.evenements (titre, date_evenement, lieu, inscription_requise, lien_inscription)
    VALUES (p_titre, p_date_evenement, p_lieu, p_inscription_requise, p_lien_inscription)
    RETURNING id INTO v_id;
    RETURN v_id;
  ELSE
    RAISE EXCEPTION 'Non autorisé : Identifiants administrateur invalides.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC: Supprimer un événement (admin authentifié)
CREATE OR REPLACE FUNCTION public.delete_evenement(
  p_id uuid,
  p_username text,
  p_password text
)
RETURNS void AS $$
BEGIN
  IF public.verify_admin(p_username, p_password) THEN
    DELETE FROM public.evenements WHERE id = p_id;
  ELSE
    RAISE EXCEPTION 'Non autorisé : Identifiants administrateur invalides.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =========================================================================
-- FIN DU SCRIPT DE MIGRATION 003
-- =========================================================================
