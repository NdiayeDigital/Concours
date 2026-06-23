-- =========================================================================
-- ECOM ACADEMIE — SUPABASE DATABASE MIGRATION SCRIPT (004_update_schema.sql)
-- =========================================================================
-- INSTRUCTIONS: 
-- 1. Copy the entire contents of this file.
-- 2. Go to your Supabase Dashboard (https://supabase.com/).
-- 3. Click on the "SQL Editor" tab on the left navigation menu.
-- 4. Create a new query, paste this script, and click "Run".
-- =========================================================================

-- 1. RENOMMER LES COLONNES POUR CORRESPONDRE À ECOM ACADEMIE
DO $$
BEGIN
  IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='ufr') THEN
    ALTER TABLE public.inscriptions RENAME COLUMN ufr TO module_choisi;
  END IF;
  
  IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='filiere') THEN
    ALTER TABLE public.inscriptions RENAME COLUMN filiere TO objectif;
  END IF;
  
  IF EXISTS(SELECT * FROM information_schema.columns WHERE table_name='inscriptions' AND column_name='niveau') THEN
    ALTER TABLE public.inscriptions RENAME COLUMN niveau TO experience;
  END IF;
END $$;

-- 2. AJOUTER DES INDEX POUR AMÉLIORER LES PERFORMANCES (Fluidité)
CREATE INDEX IF NOT EXISTS idx_inscriptions_created_at ON public.inscriptions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inscriptions_email ON public.inscriptions(email);

-- 3. METTRE À JOUR LA FONCTION RPC (get_all_inscriptions) POUR LE DASHBOARD ADMIN
DROP FUNCTION IF EXISTS public.get_all_inscriptions(text, text);

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
