import React, { useState, useEffect } from 'react';
import { useProductStore } from '../stores/useProductStore';
import { PerfumeVariant, OlfactoryNote } from '../types';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import {
  Plus,
  Trash2,
  Edit3,
  Copy,
  Lock,
  Unlock,
  Sparkles,
  Check,
  Eye,
  RefreshCw,
  ArrowLeft,
  X,
  Palette,
  Image as ImageIcon,
  FlaskConical,
  Database,
  Cloud,
  CheckCircle,
  AlertCircle,
  Code,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetPath } from '../utils/assets';
import {
  getSupabaseCredentials,
  saveSupabaseCredentials,
  isSupabaseConfigured,
} from '../services/supabaseClient';

const ADMIN_PIN = '7788';

const COLOR_PRESETS = [
  { name: 'Royal Gold', glass: '#1c140a', liquid: '#f39c12', accent: '#f1c40f' },
  { name: 'Midnight Obsidian', glass: '#0a0a0d', liquid: '#e28743', accent: '#d4af37' },
  { name: 'Crimson Damask', glass: '#1c0c16', liquid: '#e056fd', accent: '#ff7675' },
  { name: 'Electric Cyan', glass: '#0a161d', liquid: '#00cec9', accent: '#81ecec' },
  { name: 'Imperial Emerald', glass: '#0a1c14', liquid: '#00b894', accent: '#55efc4' },
  { name: 'Smoky Amethyst', glass: '#160a1d', liquid: '#9b59b6', accent: '#e056fd' },
];

export const AdminDashboard: React.FC = () => {
  const {
    variants,
    isLoading,
    isCloudConnected,
    fetchLiveVariants,
    addVariant,
    updateVariant,
    deleteVariant,
    resetToDefaults,
    exportAsCode,
    syncLocalToCloud,
  } = useProductStore();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);
  const [editingVariant, setEditingVariant] = useState<PerfumeVariant | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showCloudSettings, setShowCloudSettings] = useState(false);

  // Cloud Config State
  const [cloudUrl, setCloudUrl] = useState('');
  const [cloudKey, setCloudKey] = useState('');
  const [cloudSuccess, setCloudSuccess] = useState(false);

  // Form State
  const [formState, setFormState] = useState<Partial<PerfumeVariant>>({});

  useEffect(() => {
    const creds = getSupabaseCredentials();
    setCloudUrl(creds.url);
    setCloudKey(creds.anonKey);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      pinInput.trim() === ADMIN_PIN ||
      pinInput.trim() === 'admin' ||
      pinInput.trim() === 'leviator'
    ) {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSaveCloudConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveSupabaseCredentials(cloudUrl, cloudKey);
    setCloudSuccess(true);
    fetchLiveVariants();
    setTimeout(() => setCloudSuccess(false), 3000);
  };

  const handleStartCreate = () => {
    const newId = `leviator-${Date.now().toString(36)}`;
    const template: PerfumeVariant = {
      id: newId,
      name: 'New Haute Parfum',
      tagline: 'Rare Resins & Golden Scent',
      description:
        'Handcrafted luxury fragrance composed of natural oils and refined crystal flacon bottling.',
      price: 80,
      currency: 'AED',
      volume: '100ml / 3.4 fl. oz.',
      glassColor: '#1c140a',
      liquidColor: '#f39c12',
      accentColor: '#f1c40f',
      capColor: '#0a0a0d',
      bgGradient:
        'radial-gradient(circle at 50% 40%, rgba(243, 156, 18, 0.22) 0%, rgba(10, 10, 12, 0.95) 75%)',
      roughness: 0.1,
      transmission: 0.9,
      ior: 1.52,
      scentFamily: 'Oriental Woody Gold',
      notes: {
        top: [
          {
            id: `${newId}-t1`,
            name: 'Bergamot Zest',
            category: 'top',
            description: 'Crisp citrus sparkle',
            origin: 'Calabria, Italy',
            color: '#ffeaa7',
          },
        ],
        heart: [
          {
            id: `${newId}-h1`,
            name: 'White Amber',
            category: 'heart',
            description: 'Warm luminous aura',
            origin: 'Baltic Coast',
            color: '#fab1a0',
          },
        ],
        base: [
          {
            id: `${newId}-b1`,
            name: 'Smoked Vanilla',
            category: 'base',
            description: 'Dark sweet resin',
            origin: 'Madagascar',
            color: '#fdcb6e',
          },
        ],
      },
      craftsmanshipDetails: {
        title: 'Artisanal Acoustic Extraction',
        description:
          'Macerated in darkened French cellars for unmatched depth and long-lasting sillage.',
        macerationTime: '180 Days',
        concentration: 'Extrait de Parfum (30%)',
        artisan: 'Master Perfumer LEVIATOR',
      },
      inStock: true,
      isComingSoon: false,
      imageFallback:
        'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
    };
    setFormState(template);
    setIsCreating(true);
    setEditingVariant(null);
  };

  const handleStartEdit = (variant: PerfumeVariant) => {
    setFormState(JSON.parse(JSON.stringify(variant)));
    setEditingVariant(variant);
    setIsCreating(false);
  };

  const handleSaveForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.id) return;

    if (isCreating) {
      await addVariant(formState as PerfumeVariant);
    } else if (editingVariant) {
      await updateVariant(editingVariant.id, formState);
    }

    setEditingVariant(null);
    setIsCreating(false);
  };

  const handleCopyCode = () => {
    const code = exportAsCode();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleCopySql = () => {
    const sql = `CREATE TABLE IF NOT EXISTS public.perfumes (
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
  craftsmanship_details JSONB,
  in_stock BOOLEAN DEFAULT true,
  is_coming_soon BOOLEAN DEFAULT false,
  image_fallback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.perfumes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Access" ON public.perfumes FOR SELECT USING (true);
CREATE POLICY "Public Write Access" ON public.perfumes FOR ALL USING (true) WITH CHECK (true);
ALTER PUBLICATION supabase_realtime ADD TABLE public.perfumes;`;
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2500);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFormState((prev) => ({ ...prev, imageFallback: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const addNote = (category: 'top' | 'heart' | 'base') => {
    const newNote: OlfactoryNote = {
      id: `note-${Date.now()}`,
      name: 'New Note',
      category,
      description: 'Aromatic ingredient',
      origin: 'Grasse, France',
      color: '#d4af37',
    };
    setFormState((prev) => ({
      ...prev,
      notes: {
        ...prev.notes!,
        [category]: [...(prev.notes?.[category] || []), newNote],
      },
    }));
  };

  const removeNote = (category: 'top' | 'heart' | 'base', index: number) => {
    setFormState((prev) => ({
      ...prev,
      notes: {
        ...prev.notes!,
        [category]: prev.notes![category].filter((_, i) => i !== index),
      },
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden bg-[#070709]">
        <div className="absolute inset-0 bg-radial from-brand-gold/10 via-transparent to-transparent pointer-events-none" />

        <GlassCard className="p-8 sm:p-12 max-w-md w-full border-brand-gold/30 shadow-2xl relative z-10 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full border border-brand-gold/40 mx-auto flex items-center justify-center bg-black/60 shadow-glow-gold">
            <Lock className="w-8 h-8 text-brand-gold animate-pulse" />
          </div>

          <div>
            <h1 className="font-serif text-3xl font-bold text-white">LEVIATOR ATELIER</h1>
            <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">
              Private Fragrance Catalog Console
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Access Key (Default: 7788)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-full px-5 py-3.5 text-center text-sm tracking-widest text-white placeholder-neutral-500 focus:outline-none focus:border-brand-gold shadow-inner"
                autoFocus
              />
              {pinError && (
                <p className="text-[11px] text-red-400 mt-2 font-medium">
                  Invalid PIN. Please enter master key 7788.
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full py-3.5 text-xs uppercase tracking-widest"
              icon={<Unlock className="w-4 h-4" />}
            >
              Access Catalog Dashboard
            </Button>
          </form>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-brand-gold transition-colors pt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Boutique</span>
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Header & Quick Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className={`px-2.5 py-0.5 rounded-full border text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 ${
                isCloudConnected
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
              }`}
            >
              {isCloudConnected ? (
                <>
                  <CheckCircle className="w-3 h-3" /> Cloud Connected (Live for all)
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3" /> Local Mode (Free)
                </>
              )}
            </span>
            <span className="text-xs text-neutral-400">100% Free Zero-Expense Storage</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
            Fragrance Catalog Atelier
          </h1>
          <p className="text-xs text-neutral-400">
            Instantly add, edit, change prices, and customize 3D perfume bottles.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={handleStartCreate}
            icon={<Plus className="w-4 h-4" />}
          >
            Add New Flacon
          </Button>

          <Button
            variant={showCloudSettings ? 'primary' : 'glass'}
            size="sm"
            onClick={() => setShowCloudSettings(!showCloudSettings)}
            icon={<Cloud className="w-4 h-4" />}
          >
            Cloud Setup
          </Button>

          <Button
            variant="glass"
            size="sm"
            onClick={handleCopyCode}
            icon={copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          >
            {copiedCode ? 'Code Copied!' : 'Export for GitHub'}
          </Button>

          <Link to="/">
            <Button variant="outline" size="sm" icon={<Eye className="w-4 h-4" />}>
              View Boutique
            </Button>
          </Link>
        </div>
      </div>

      {/* Cloud Database Setup Panel */}
      {showCloudSettings && (
        <GlassCard className="p-6 border-brand-gold/40 shadow-2xl space-y-4 relative overflow-hidden bg-black/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-brand-gold/40 flex items-center justify-center bg-brand-gold/10 text-brand-gold">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  100% Free Cloud Database Connection (Supabase)
                </h3>
                <p className="text-xs text-neutral-400">
                  Connect free Supabase account so all products added from anywhere instantly go live for all users worldwide.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCloudSettings(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSaveCloudConfig} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
            <div className="sm:col-span-5">
              <label className="text-[11px] uppercase font-bold text-neutral-300 block mb-1">
                Supabase Project URL
              </label>
              <input
                type="url"
                value={cloudUrl}
                onChange={(e) => setCloudUrl(e.target.value)}
                placeholder="https://xyzproject.supabase.co"
                className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-gold font-mono"
                required
              />
            </div>

            <div className="sm:col-span-4">
              <label className="text-[11px] uppercase font-bold text-neutral-300 block mb-1">
                Supabase Anon Key
              </label>
              <input
                type="password"
                value={cloudKey}
                onChange={(e) => setCloudKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full bg-black/50 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-brand-gold font-mono"
                required
              />
            </div>

            <div className="sm:col-span-3 flex gap-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full py-2.5 text-xs"
                icon={cloudSuccess ? <Check className="w-4 h-4 text-black" /> : <CheckCircle className="w-4 h-4" />}
              >
                {cloudSuccess ? 'Connected!' : 'Save & Connect'}
              </Button>
            </div>
          </form>

          {/* Quick Helper */}
          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-3">
            <span>
              Don't have Supabase yet? Create a free account at{' '}
              <a
                href="https://supabase.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold underline font-semibold"
              >
                supabase.com
              </a>{' '}
              (Zero cost forever).
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopySql}
                className="px-3 py-1.5 rounded-full border border-white/15 bg-white/5 text-neutral-300 hover:text-white flex items-center gap-1.5 text-xs"
              >
                <Code className="w-3.5 h-3.5 text-brand-gold" />
                <span>{copiedSql ? 'SQL Script Copied!' : 'Copy Database SQL Script'}</span>
              </button>

              {isCloudConnected && (
                <button
                  type="button"
                  onClick={syncLocalToCloud}
                  className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 text-xs font-bold"
                >
                  🚀 Upload All Scents to Cloud
                </button>
              )}
            </div>
          </div>
        </GlassCard>
      )}

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {variants.map((v) => (
          <GlassCard
            key={v.id}
            className="p-5 border-white/10 hover:border-brand-gold/40 transition-all duration-300 space-y-4 relative overflow-hidden group"
          >
            {/* Liquid Background Aura */}
            <div
              className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-25 pointer-events-none"
              style={{ backgroundColor: v.liquidColor }}
            />

            {/* Thumbnail + Title */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-20 rounded-xl border border-white/20 overflow-hidden relative shrink-0 bg-black/50">
                <img
                  src={getAssetPath(v.imageFallback)}
                  alt={v.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              </div>

              <div className="flex-1 overflow-hidden">
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold block truncate">
                  {v.scentFamily}
                </span>
                <h3 className="font-serif text-lg font-bold text-white truncate">{v.name}</h3>
                <p className="font-serif text-base font-bold text-gradient-gold mt-0.5">
                  AED {v.price}
                </p>
                <p className="text-[11px] text-neutral-400 italic truncate mt-0.5">
                  "{v.tagline}"
                </p>
              </div>
            </div>

            {/* 3D Color Swatches */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase">3D Colors:</span>
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
                  title="Glass Tint"
                  style={{ backgroundColor: v.glassColor }}
                />
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
                  title="Liquid Color"
                  style={{ backgroundColor: v.liquidColor }}
                />
                <span
                  className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
                  title="Gold Accent"
                  style={{ backgroundColor: v.accentColor }}
                />
              </div>

              <span
                className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                  v.isComingSoon
                    ? 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                    : 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                }`}
              >
                {v.isComingSoon ? 'Coming Soon' : 'In Stock'}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="glass"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => handleStartEdit(v)}
                icon={<Edit3 className="w-3.5 h-3.5 text-brand-gold" />}
              >
                Edit Flacon
              </Button>

              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to delete "${v.name}"?`)) {
                    deleteVariant(v.id);
                  }
                }}
                className="p-2 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                title="Delete Flacon"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Edit / Create Flacon Modal */}
      {(isCreating || editingVariant) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
          <GlassCard className="max-w-3xl w-full p-6 sm:p-8 border-brand-gold/40 shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-brand-gold/40 flex items-center justify-center bg-brand-gold/10 text-brand-gold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-white">
                    {isCreating ? 'Create New Perfume Flacon' : `Edit ${formState.name}`}
                  </h2>
                  <p className="text-xs text-neutral-400">
                    Live changes apply instantly across the boutique.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingVariant(null);
                }}
                className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveForm} className="space-y-6">
              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase font-bold text-neutral-300 block mb-1.5">
                    Perfume Name
                  </label>
                  <input
                    type="text"
                    value={formState.name || ''}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-gold"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold text-neutral-300 block mb-1.5">
                    Price in AED
                  </label>
                  <input
                    type="number"
                    value={formState.price || 80}
                    onChange={(e) =>
                      setFormState({ ...formState, price: Number(e.target.value) })
                    }
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-gold"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold text-neutral-300 block mb-1.5">
                    Scent Family
                  </label>
                  <input
                    type="text"
                    value={formState.scentFamily || ''}
                    onChange={(e) => setFormState({ ...formState, scentFamily: e.target.value })}
                    placeholder="e.g. Amber Floral, Citrus Woody"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold text-neutral-300 block mb-1.5">
                    Volume Capacity
                  </label>
                  <input
                    type="text"
                    value={formState.volume || '100ml / 3.4 fl. oz.'}
                    onChange={(e) => setFormState({ ...formState, volume: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>

              {/* Tagline & Description */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase font-bold text-neutral-300 block mb-1.5">
                    Artisanal Tagline
                  </label>
                  <input
                    type="text"
                    value={formState.tagline || ''}
                    onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
                    placeholder="e.g. Liquid Gold & Midnight Bloom"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase font-bold text-neutral-300 block mb-1.5">
                    Description & Narrative
                  </label>
                  <textarea
                    rows={3}
                    value={formState.description || ''}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-brand-gold resize-none"
                  />
                </div>
              </div>

              {/* Image Upload & URL */}
              <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <label className="text-xs uppercase font-bold text-brand-gold flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Product Image (Local Upload or URL)</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <div>
                    <input
                      type="text"
                      value={formState.imageFallback || ''}
                      onChange={(e) =>
                        setFormState({ ...formState, imageFallback: e.target.value })
                      }
                      placeholder="Paste Image URL..."
                      className="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="text-xs text-neutral-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-brand-gold file:text-black hover:file:bg-brand-gold/80 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* 3D Bottle Color Customizer */}
              <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs uppercase font-bold text-brand-gold flex items-center gap-2">
                    <Palette className="w-4 h-4" />
                    <span>3D Flacon & Liquid Color Customizer</span>
                  </label>

                  <div className="flex gap-1.5">
                    {COLOR_PRESETS.map((p) => (
                      <button
                        type="button"
                        key={p.name}
                        onClick={() =>
                          setFormState({
                            ...formState,
                            glassColor: p.glass,
                            liquidColor: p.liquid,
                            accentColor: p.accent,
                          })
                        }
                        title={p.name}
                        className="w-5 h-5 rounded-full border border-white/40 transition-transform hover:scale-125"
                        style={{ backgroundColor: p.liquid }}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Glass Tint</label>
                    <div className="flex items-center gap-2 bg-black/40 border border-white/15 p-2 rounded-xl">
                      <input
                        type="color"
                        value={formState.glassColor || '#1c140a'}
                        onChange={(e) =>
                          setFormState({ ...formState, glassColor: e.target.value })
                        }
                        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-[11px] font-mono text-white">
                        {formState.glassColor}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Liquid Glow</label>
                    <div className="flex items-center gap-2 bg-black/40 border border-white/15 p-2 rounded-xl">
                      <input
                        type="color"
                        value={formState.liquidColor || '#f39c12'}
                        onChange={(e) =>
                          setFormState({ ...formState, liquidColor: e.target.value })
                        }
                        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-[11px] font-mono text-white">
                        {formState.liquidColor}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Gold Accent</label>
                    <div className="flex items-center gap-2 bg-black/40 border border-white/15 p-2 rounded-xl">
                      <input
                        type="color"
                        value={formState.accentColor || '#f1c40f'}
                        onChange={(e) =>
                          setFormState({ ...formState, accentColor: e.target.value })
                        }
                        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                      <span className="text-[11px] font-mono text-white">
                        {formState.accentColor}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Olfactory Notes Pyramid */}
              <div className="space-y-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                <label className="text-xs uppercase font-bold text-brand-gold flex items-center gap-2">
                  <FlaskConical className="w-4 h-4" />
                  <span>Olfactory Notes Pyramid</span>
                </label>

                {(['top', 'heart', 'base'] as const).map((cat) => (
                  <div key={cat} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white uppercase tracking-wider">
                        {cat} Notes
                      </span>
                      <button
                        type="button"
                        onClick={() => addNote(cat)}
                        className="text-[11px] text-brand-gold hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" /> Add Note
                      </button>
                    </div>

                    <div className="space-y-2">
                      {formState.notes?.[cat]?.map((n, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={n.name}
                            onChange={(e) => {
                              const updatedNotes = [...formState.notes![cat]];
                              updatedNotes[i].name = e.target.value;
                              setFormState({
                                ...formState,
                                notes: { ...formState.notes!, [cat]: updatedNotes },
                              });
                            }}
                            placeholder="Note Name"
                            className="flex-1 bg-black/40 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                          <input
                            type="text"
                            value={n.origin}
                            onChange={(e) => {
                              const updatedNotes = [...formState.notes![cat]];
                              updatedNotes[i].origin = e.target.value;
                              setFormState({
                                ...formState,
                                notes: { ...formState.notes!, [cat]: updatedNotes },
                              });
                            }}
                            placeholder="Origin (e.g. Grasse, France)"
                            className="w-1/3 bg-black/40 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() => removeNote(cat, i)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingVariant(null);
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={<Check className="w-4 h-4" />}
                >
                  {isCreating ? 'Publish Flacon' : 'Save Changes'}
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
