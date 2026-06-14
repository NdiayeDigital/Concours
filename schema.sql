-- ==============================================================================
-- SCHEMA DE BASE DE DONNÉES - CONCOURS DE PLAIDOIRIE UIDT 2026
-- À exécuter dans l'éditeur SQL de Supabase (SQL Editor)
-- ==============================================================================

-- 1. Création de la table "inscriptions"
CREATE TABLE IF NOT EXISTS public.inscriptions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    telephone TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    ufr TEXT NOT NULL,
    filiere TEXT NOT NULL,
    niveau TEXT NOT NULL
);

-- 2. Sécurité RLS (Row Level Security)
-- Activer RLS pour la table
ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;

-- 3. Stratégies de sécurité (Policies)
-- Autoriser n'importe qui (anonyme) à INSERER des données (pour le formulaire d'inscription)
CREATE POLICY "Allow public insert" 
ON public.inscriptions 
FOR INSERT 
WITH CHECK (true);

-- Autoriser la LECTURE publique (optionnel, pour que l'admin frontend puisse lire les données sans auth complexe)
-- ATTENTION: En production stricte, on restreindrait cela à l'utilisateur admin authentifié.
-- Pour simplifier la logistique demandée (accès admin bypassé), on laisse ouvert en lecture.
CREATE POLICY "Allow public read" 
ON public.inscriptions 
FOR SELECT 
USING (true);

-- Autoriser la SUPPRESSION publique (pour que l'admin frontend puisse supprimer)
CREATE POLICY "Allow public delete" 
ON public.inscriptions 
FOR DELETE 
USING (true);

-- ==============================================================================
-- FIN DU SCRIPT
-- ==============================================================================
