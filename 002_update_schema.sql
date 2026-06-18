-- =========================================================================
-- ECOM ACADEMIE — SUPABASE DATABASE MIGRATION SCRIPT (002_update_schema.sql)
-- =========================================================================
-- INSTRUCTIONS: 
-- 1. Copy the entire contents of this file.
-- 2. Go to your Supabase Dashboard (https://supabase.com/).
-- 3. Click on the "SQL Editor" tab on the left navigation menu.
-- 4. Create a new query, paste this script, and click "Run".
-- =========================================================================

-- 1. DROP THE EMAIL FORMAT CHECK CONSTRAINT (FIXES GMAIL/YAHOO REGISTRATION BLOCKS)
ALTER TABLE public.inscriptions DROP CONSTRAINT IF EXISTS inscriptions_email_check;

-- 2. SETUP SECURE ROW LEVEL SECURITY (RLS) POLICIES FOR INSCRIPTIONS TABLE
ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;

-- Drop old policies to avoid duplicates
DROP POLICY IF EXISTS "Allow public insert" ON public.inscriptions;
DROP POLICY IF EXISTS "Allow public read" ON public.inscriptions;
DROP POLICY IF EXISTS "Allow public delete" ON public.inscriptions;
DROP POLICY IF EXISTS "Deny public select" ON public.inscriptions;
DROP POLICY IF EXISTS "Deny public delete" ON public.inscriptions;

-- Allow anyone to submit registration (insert candidate data)
CREATE POLICY "Allow public insert" 
ON public.inscriptions 
FOR INSERT 
WITH CHECK (true);

-- Explicitly deny all public selects and deletes (only accessible via SECURITY DEFINER RPCs)
CREATE POLICY "Deny public select" 
ON public.inscriptions 
FOR SELECT 
USING (false);

CREATE POLICY "Deny public delete" 
ON public.inscriptions 
FOR DELETE 
USING (false);


-- 3. SETUP SECURE ROW LEVEL SECURITY (RLS) POLICIES FOR EVENEMENTS TABLE
ALTER TABLE public.evenements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select on evenements" ON public.evenements;
DROP POLICY IF EXISTS "Deny public mutate on evenements" ON public.evenements;

-- Allow public read of all events (so they display on the homepage for visitors)
CREATE POLICY "Allow public select on evenements"
ON public.evenements
FOR SELECT
USING (true);

-- Deny public insert/update/delete (only accessible via SECURE RPCs or admin bypass)
CREATE POLICY "Deny public mutate on evenements"
ON public.evenements
FOR ALL
TO public
USING (false)
WITH CHECK (false);


-- 4. INSERT DEFAULT ADMINISTRATOR CREDENTIALS (Ecom221 / EcomAcademie)
-- This allows logging in securely through the database verify_admin RPC.
INSERT INTO public.admin_users (username, password_hash)
VALUES (
  'Ecom221',
  crypt('EcomAcademie', gen_salt('bf'))
)
ON CONFLICT (username) DO NOTHING;


-- 5. SECURE DATABASE RPC FUNCTIONS FOR EVENTS (SECURITY DEFINER)

-- Function to create an event securely as an administrator
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

-- Function to delete an event securely as an administrator
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
