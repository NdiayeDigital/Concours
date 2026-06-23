-- =========================================================================
-- ECOM ACADEMIE — MIGRATION VERS SUPABASE AUTH OFFICIEL (SÉCURITÉ)
-- =========================================================================

-- 1. Suppression des anciens mécanismes non sécurisés
DROP FUNCTION IF EXISTS public.verify_admin(text, text) CASCADE;
DROP FUNCTION IF EXISTS public.get_all_inscriptions(text, text) CASCADE;
DROP FUNCTION IF EXISTS public.delete_inscription(uuid, text, text) CASCADE;
DROP FUNCTION IF EXISTS public.create_evenement(text, text, text, boolean, text, text, text) CASCADE;
DROP FUNCTION IF EXISTS public.delete_evenement(uuid, text, text) CASCADE;

DROP TABLE IF EXISTS public.admin_users CASCADE;

-- 2. Mise à jour des politiques RLS (Row Level Security)

-- Nettoyage des anciennes politiques
DROP POLICY IF EXISTS "Deny public select inscriptions" ON public.inscriptions;
DROP POLICY IF EXISTS "Deny public delete inscriptions" ON public.inscriptions;

DROP POLICY IF EXISTS "Deny public insert evenements" ON public.evenements;
DROP POLICY IF EXISTS "Deny public update evenements" ON public.evenements;
DROP POLICY IF EXISTS "Deny public delete evenements" ON public.evenements;

-- Nouvelles politiques sécurisées basées sur l'authentification officielle (auth.uid())

-- INSCRIPTIONS : Seul un administrateur connecté peut lire et supprimer
CREATE POLICY "Allow auth select inscriptions" ON public.inscriptions FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow auth delete inscriptions" ON public.inscriptions FOR DELETE USING (auth.uid() IS NOT NULL);

-- EVENEMENTS : Seul un administrateur connecté peut ajouter, modifier, supprimer
CREATE POLICY "Allow auth insert evenements" ON public.evenements FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Allow auth update evenements" ON public.evenements FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Allow auth delete evenements" ON public.evenements FOR DELETE USING (auth.uid() IS NOT NULL);

-- NOTE IMPORTANTE : Les politiques permettant au public de s'inscrire (INSERT) 
-- et de voir les événements (SELECT) restent actives car elles n'ont pas été supprimées.
