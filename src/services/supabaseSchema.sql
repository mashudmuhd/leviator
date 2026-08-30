-- ==============================================================================
-- LEVIATOR HAUTE PARFUMERIE — 100% FREE SUPABASE DATABASE SCHEMA
-- ==============================================================================
-- Run this script in your Supabase SQL Editor (1-Click Setup)

-- 1. Create the perfumes table
CREATE TABLE IF NOT EXISTS public.perfumes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 80,
  currency TEXT DEFAULT 'AED',
  volume TEXT DEFAULT '100ml / 3.4 fl. oz.',
  glass_color TEXT DEFAULT '#1c140a',
  liquid_color TEXT DEFAULT '#f39c12',
  accent_color TEXT DEFAULT '#f1c40f',
  cap_color TEXT DEFAULT '#0a0a0d',
  bg_gradient TEXT,
  roughness NUMERIC DEFAULT 0.1,
  transmission NUMERIC DEFAULT 0.9,
  ior NUMERIC DEFAULT 1.52,
  scent_family TEXT DEFAULT 'Oriental Woody Gold',
  notes JSONB DEFAULT '{"top":[], "heart":[], "base":[]}'::jsonb,
  craftsmanship_details JSONB DEFAULT '{"title":"", "description":"", "macerationTime":"180 Days", "concentration":"Extrait de Parfum (30%)", "artisan":""}'::jsonb,
  in_stock BOOLEAN DEFAULT true,
  is_coming_soon BOOLEAN DEFAULT false,
  image_fallback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.perfumes ENABLE ROW LEVEL SECURITY;

-- 3. Allow Public Read Access (Anyone visiting the store can view products)
CREATE POLICY "Public Read Access"
ON public.perfumes
FOR SELECT
USING (true);

-- 4. Allow Public Insert/Update/Delete (For simple admin console management)
CREATE POLICY "Public Write Access"
ON public.perfumes
FOR ALL
USING (true)
WITH CHECK (true);

-- 5. Enable Realtime Broadcasting
ALTER PUBLICATION supabase_realtime ADD TABLE public.perfumes;
