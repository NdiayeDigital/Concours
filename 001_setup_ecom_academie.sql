-- =========================================================================
-- ECOM ACADEMIE — MASTER INITIALIZATION SCRIPT (001_setup.sql)
-- =========================================================================
-- ATTENTION : Ce script SUPPRIME les anciennes tables et les RECRÉE à zéro.
-- Toutes les données existantes seront effacées. Utile pour repartir à neuf !
-- =========================================================================

-- =============================================
-- 1. SUPPRESSION DES ANCIENNES TABLES ET FONCTIONS
-- =============================================
DROP FUNCTION IF EXISTS public.verify_admin(text, text) CASCADE;
DROP FUNCTION IF EXISTS public.get_all_inscriptions(text, text) CASCADE;
DROP FUNCTION IF EXISTS public.delete_inscription(uuid, text, text) CASCADE;
DROP FUNCTION IF EXISTS public.create_evenement(text, text, text, boolean, text, text, text) CASCADE;
DROP FUNCTION IF EXISTS public.delete_evenement(uuid, text, text) CASCADE;

DROP TABLE IF EXISTS public.inscriptions CASCADE;
DROP TABLE IF EXISTS public.evenements CASCADE;
DROP TABLE IF EXISTS public.admin_users CASCADE;

-- Activer l'extension pgcrypto pour le hachage des mots de passe
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =============================================
-- 2. CRÉATION DES TABLES
-- =============================================

-- Table des Administrateurs
CREATE TABLE public.admin_users (
  username text PRIMARY KEY,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Table des Inscriptions
CREATE TABLE public.inscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  nom text NOT NULL,
  prenom text NOT NULL,
  telephone text NOT NULL,
  email text NOT NULL UNIQUE, -- Empêche l'inscription multiple
  module_choisi text NOT NULL,
  objectif text NOT NULL,
  experience text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Table des Événements
CREATE TABLE public.evenements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  titre text NOT NULL,
  date_evenement text NOT NULL,
  lieu text NOT NULL,
  inscription_requise boolean DEFAULT false,
  lien_inscription text,
  created_at timestamptz DEFAULT now()
);

-- Index pour accélérer le tableau de bord
CREATE INDEX idx_inscriptions_created_at ON public.inscriptions (created_at DESC);
CREATE INDEX idx_inscriptions_email ON public.inscriptions (email);

-- =============================================
-- 3. SÉCURITÉ : ROW LEVEL SECURITY (RLS)
-- =============================================

-- Activer RLS
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evenements ENABLE ROW LEVEL SECURITY;

-- ADMIN_USERS: Personne ne peut lire ou écrire via l'API publique
CREATE POLICY "Deny all public admin_users" ON public.admin_users FOR ALL USING (false);

-- INSCRIPTIONS: Tout le monde peut s'inscrire (INSERT), personne ne peut lire (SELECT)
CREATE POLICY "Allow public insert inscriptions" ON public.inscriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Deny public select inscriptions" ON public.inscriptions FOR SELECT USING (false);
CREATE POLICY "Deny public update inscriptions" ON public.inscriptions FOR UPDATE USING (false);
CREATE POLICY "Deny public delete inscriptions" ON public.inscriptions FOR DELETE USING (false);

-- EVENEMENTS: Tout le monde peut lire (SELECT), seul l'admin peut modifier
CREATE POLICY "Allow public select evenements" ON public.evenements FOR SELECT USING (true);
CREATE POLICY "Deny public insert evenements" ON public.evenements FOR INSERT WITH CHECK (false);
CREATE POLICY "Deny public update evenements" ON public.evenements FOR UPDATE USING (false);
CREATE POLICY "Deny public delete evenements" ON public.evenements FOR DELETE USING (false);


-- =============================================
-- 4. CRÉATION DU COMPTE ADMINISTRATEUR
-- =============================================
-- Utilisateur par défaut : AdminEcom
-- Mot de passe par défaut : Ecom2026
INSERT INTO public.admin_users (username, password_hash)
VALUES (
  'AdminEcom',
  crypt('Ecom2026', gen_salt('bf'))
);

-- =============================================
-- 5. CRÉATION DES FONCTIONS SÉCURISÉES (RPC)
-- =============================================

-- RPC: Vérifier l'administrateur
CREATE OR REPLACE FUNCTION public.verify_admin(p_username text, p_password text)
RETURNS boolean AS $$
DECLARE
  v_match boolean;
BEGIN
  SELECT (password_hash = crypt(p_password, password_hash)) INTO v_match
  FROM public.admin_users
  WHERE username = p_username;
  
  RETURN COALESCE(v_match, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC: Obtenir toutes les inscriptions
CREATE OR REPLACE FUNCTION public.get_all_inscriptions(p_username text, p_password text)
RETURNS TABLE (
  id uuid,
  nom text,
  prenom text,
  telephone text,
  email text,
  module_choisi text,
  objectif text,
  experience text,
  created_at timestamptz
) AS $$
BEGIN
  IF public.verify_admin(p_username, p_password) THEN
    RETURN QUERY 
    SELECT i.id, i.nom, i.prenom, i.telephone, i.email, i.module_choisi, i.objectif, i.experience, i.created_at
    FROM public.inscriptions i
    ORDER BY i.created_at DESC;
  ELSE
    RAISE EXCEPTION 'Non autorisé : Identifiants administrateur invalides.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC: Supprimer une inscription
CREATE OR REPLACE FUNCTION public.delete_inscription(p_id uuid, p_username text, p_password text)
RETURNS void AS $$
BEGIN
  IF public.verify_admin(p_username, p_password) THEN
    DELETE FROM public.inscriptions WHERE id = p_id;
  ELSE
    RAISE EXCEPTION 'Non autorisé : Identifiants administrateur invalides.';
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC: Créer un événement
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

-- RPC: Supprimer un événement
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
-- FIN DU SCRIPT. 
-- VOTRE BASE EST MAINTENANT TOTALEMENT SÉCURISÉE ET OPÉRATIONNELLE.
-- Identifiants pour vous connecter : AdminEcom / Ecom2026
-- =========================================================================
