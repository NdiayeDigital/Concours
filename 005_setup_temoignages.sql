-- =========================================================================
-- ECOM ACADEMIE — GESTION DES TÉMOIGNAGES
-- =========================================================================

-- 1. Création de la table des témoignages
CREATE TABLE IF NOT EXISTS public.temoignages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    prenom TEXT NOT NULL,
    nom TEXT NOT NULL,
    role_statut TEXT NOT NULL DEFAULT 'Étudiant(e)',
    message TEXT NOT NULL,
    note INTEGER CHECK (note >= 1 AND note <= 5) DEFAULT 5,
    statut_validation TEXT NOT NULL DEFAULT 'en_attente', -- Peut être 'en_attente', 'approuve', 'rejete'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Activation de la sécurité RLS (Row Level Security)
ALTER TABLE public.temoignages ENABLE ROW LEVEL SECURITY;

-- 3. Politiques (Policies)

-- A. PUBLIC : Tout le monde peut insérer (ajouter un témoignage)
CREATE POLICY "Allow public insert temoignages" 
ON public.temoignages 
FOR INSERT 
WITH CHECK (true);

-- B. PUBLIC : Tout le monde peut voir UNIQUEMENT les témoignages approuvés
CREATE POLICY "Allow public select approved temoignages" 
ON public.temoignages 
FOR SELECT 
USING (statut_validation = 'approuve');

-- C. ADMIN : Peut tout voir (y compris ceux en attente)
CREATE POLICY "Allow admin select all temoignages" 
ON public.temoignages 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- D. ADMIN : Peut modifier (ex: approuver ou rejeter)
CREATE POLICY "Allow admin update temoignages" 
ON public.temoignages 
FOR UPDATE 
USING (auth.uid() IS NOT NULL);

-- E. ADMIN : Peut supprimer
CREATE POLICY "Allow admin delete temoignages" 
ON public.temoignages 
FOR DELETE 
USING (auth.uid() IS NOT NULL);

-- =========================================================================
-- FIN DU SCRIPT
-- =========================================================================
