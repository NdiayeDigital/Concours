-- =========================================================================
-- ECOM ACADEMIE — AUTHENTIFICATION ALTERNATIVE (RPC SECURITY DEFINER)
-- =========================================================================

-- 1. Nettoyage de l'ancienne politique basée sur auth.uid()
DROP POLICY IF EXISTS "Allow auth select inscriptions" ON public.inscriptions;
DROP POLICY IF EXISTS "Allow auth delete inscriptions" ON public.inscriptions;
DROP POLICY IF EXISTS "Allow admin select all temoignages" ON public.temoignages;
DROP POLICY IF EXISTS "Allow admin update temoignages" ON public.temoignages;
DROP POLICY IF EXISTS "Allow admin delete temoignages" ON public.temoignages;

-- 2. Création de la table pour stocker les accès (invisible au public)
CREATE TABLE IF NOT EXISTS public.admin_system (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password_hash TEXT NOT NULL
);

-- Sécuriser la table admin_system (personne ne peut la lire directement)
ALTER TABLE public.admin_system ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Deny all admin_system" ON public.admin_system;
CREATE POLICY "Deny all admin_system" ON public.admin_system FOR ALL USING (false);

-- Insérer le compte administrateur (mot de passe en clair pour l'exemple, mais protégé par RLS)
TRUNCATE TABLE public.admin_system;
INSERT INTO public.admin_system (username, password_hash) VALUES ('admin', 'Ecom2026');

-- =========================================================================
-- 3. FONCTIONS RPC (SECURITY DEFINER)
-- Ces fonctions contournent le RLS mais VÉRIFIENT LE MOT DE PASSE en interne.
-- =========================================================================

-- A. Fonction de connexion (renvoie vrai ou faux)
CREATE OR REPLACE FUNCTION public.rpc_admin_login(p_user TEXT, p_pass TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM public.admin_system WHERE username = p_user AND password_hash = p_pass) THEN
        RETURN TRUE;
    END IF;
    RETURN FALSE;
END;
$$;

-- B. Récupérer les inscriptions
CREATE OR REPLACE FUNCTION public.rpc_get_inscriptions(p_pass TEXT)
RETURNS SETOF public.inscriptions
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.admin_system WHERE password_hash = p_pass) THEN
        RAISE EXCEPTION 'Non autorisé';
    END IF;
    RETURN QUERY SELECT * FROM public.inscriptions ORDER BY created_at DESC;
END;
$$;

-- C. Supprimer une inscription
CREATE OR REPLACE FUNCTION public.rpc_delete_inscription(p_pass TEXT, p_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.admin_system WHERE password_hash = p_pass) THEN
        RAISE EXCEPTION 'Non autorisé';
    END IF;
    DELETE FROM public.inscriptions WHERE id = p_id;
    RETURN TRUE;
END;
$$;

-- D. Récupérer TOUS les témoignages (pour le dashboard admin)
CREATE OR REPLACE FUNCTION public.rpc_get_all_temoignages(p_pass TEXT)
RETURNS SETOF public.temoignages
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.admin_system WHERE password_hash = p_pass) THEN
        RAISE EXCEPTION 'Non autorisé';
    END IF;
    RETURN QUERY SELECT * FROM public.temoignages ORDER BY created_at DESC;
END;
$$;

-- E. Mettre à jour le statut d'un témoignage (approuver/rejeter)
CREATE OR REPLACE FUNCTION public.rpc_update_temoignage(p_pass TEXT, p_id UUID, p_statut TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.admin_system WHERE password_hash = p_pass) THEN
        RAISE EXCEPTION 'Non autorisé';
    END IF;
    UPDATE public.temoignages SET statut_validation = p_statut WHERE id = p_id;
    RETURN TRUE;
END;
$$;

-- F. Supprimer un témoignage
CREATE OR REPLACE FUNCTION public.rpc_delete_temoignage(p_pass TEXT, p_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM public.admin_system WHERE password_hash = p_pass) THEN
        RAISE EXCEPTION 'Non autorisé';
    END IF;
    DELETE FROM public.temoignages WHERE id = p_id;
    RETURN TRUE;
END;
$$;
