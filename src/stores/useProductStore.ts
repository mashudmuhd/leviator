import { create } from 'zustand';
import { PerfumeVariant } from '../types';
import { PERFUME_VARIANTS } from '../data/perfumeVariants';
import { getSupabaseClient, isSupabaseConfigured } from '../services/supabaseClient';

const STORAGE_KEY = 'leviator_perfume_catalog_v1';

// Convert DB row (snake_case) to PerfumeVariant (camelCase)
function mapRowToVariant(row: any): PerfumeVariant {
  return {
    id: row.id,
    name: row.name,
    tagline: row.tagline || '',
    description: row.description || '',
    price: Number(row.price) || 80,
    currency: row.currency || 'AED',
    volume: row.volume || '100ml / 3.4 fl. oz.',
    glassColor: row.glass_color || '#1c140a',
    liquidColor: row.liquid_color || '#f39c12',
    accentColor: row.accent_color || '#f1c40f',
    capColor: row.cap_color || '#0a0a0d',
    bgGradient: row.bg_gradient || 'radial-gradient(circle at 50% 40%, rgba(243, 156, 18, 0.22) 0%, rgba(10, 10, 12, 0.95) 75%)',
    roughness: Number(row.roughness) || 0.1,
    transmission: Number(row.transmission) || 0.9,
    ior: Number(row.ior) || 1.52,
    scentFamily: row.scent_family || 'Oriental Woody Gold',
    notes: row.notes || { top: [], heart: [], base: [] },
    craftsmanshipDetails: row.craftsmanship_details || {
      title: 'Artisanal Acoustic Extraction',
      description: 'Macerated in darkened French cellars.',
      macerationTime: '180 Days',
      concentration: 'Extrait de Parfum (30%)',
      artisan: 'Master Perfumer LEVIATOR',
    },
    inStock: row.in_stock !== false,
    isComingSoon: Boolean(row.is_coming_soon),
    imageFallback: row.image_fallback || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80',
  };
}

// Convert PerfumeVariant (camelCase) to DB row (snake_case)
function mapVariantToRow(v: PerfumeVariant) {
  return {
    id: v.id,
    name: v.name,
    tagline: v.tagline,
    description: v.description,
    price: v.price,
    currency: v.currency,
    volume: v.volume,
    glass_color: v.glassColor,
    liquid_color: v.liquidColor,
    accent_color: v.accentColor,
    cap_color: v.capColor,
    bg_gradient: v.bgGradient,
    roughness: v.roughness,
    transmission: v.transmission,
    ior: v.ior,
    scent_family: v.scentFamily,
    notes: v.notes,
    craftsmanship_details: v.craftsmanshipDetails,
    in_stock: v.inStock,
    is_coming_soon: v.isComingSoon,
    image_fallback: v.imageFallback,
    updated_at: new Date().toISOString(),
  };
}

interface ProductStoreState {
  variants: PerfumeVariant[];
  isLoading: boolean;
  isCloudConnected: boolean;
  fetchLiveVariants: () => Promise<void>;
  addVariant: (variant: PerfumeVariant) => Promise<void>;
  updateVariant: (id: string, updated: Partial<PerfumeVariant>) => Promise<void>;
  deleteVariant: (id: string) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  exportAsCode: () => string;
  syncLocalToCloud: () => Promise<void>;
}

const loadInitialVariants = (): PerfumeVariant[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load local variants:', err);
  }
  return PERFUME_VARIANTS;
};

const saveLocalVariants = (variants: PerfumeVariant[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(variants));
  } catch (err) {
    console.error('Failed to save local variants:', err);
  }
};

export const useProductStore = create<ProductStoreState>((set, get) => ({
  variants: loadInitialVariants(),
  isLoading: false,
  isCloudConnected: isSupabaseConfigured(),

  fetchLiveVariants: async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('perfumes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        const mapped = data.map(mapRowToVariant);
        saveLocalVariants(mapped);
        set({ variants: mapped, isCloudConnected: true, isLoading: false });
      } else {
        // Cloud is empty, offer sync
        set({ isCloudConnected: true, isLoading: false });
      }
    } catch (err) {
      console.warn('Cloud fetch failed, using local catalog:', err);
      set({ isLoading: false });
    }
  },

  addVariant: async (variant: PerfumeVariant) => {
    const updated = [variant, ...get().variants];
    saveLocalVariants(updated);
    set({ variants: updated });

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const row = mapVariantToRow(variant);
        await supabase.from('perfumes').upsert(row);
      } catch (err) {
        console.error('Cloud insert failed:', err);
      }
    }
  },

  updateVariant: async (id: string, updatedFields: Partial<PerfumeVariant>) => {
    const updated = get().variants.map((v) =>
      v.id === id ? { ...v, ...updatedFields } : v
    );
    saveLocalVariants(updated);
    set({ variants: updated });

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const found = updated.find((v) => v.id === id);
        if (found) {
          const row = mapVariantToRow(found);
          await supabase.from('perfumes').update(row).eq('id', id);
        }
      } catch (err) {
        console.error('Cloud update failed:', err);
      }
    }
  },

  deleteVariant: async (id: string) => {
    const updated = get().variants.filter((v) => v.id !== id);
    saveLocalVariants(updated);
    set({ variants: updated });

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        await supabase.from('perfumes').delete().eq('id', id);
      } catch (err) {
        console.error('Cloud delete failed:', err);
      }
    }
  },

  syncLocalToCloud: async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      const rows = get().variants.map(mapVariantToRow);
      await supabase.from('perfumes').upsert(rows);
      alert('All local perfumes successfully synced to Cloud Database! 🎉');
    } catch (err) {
      alert('Cloud sync error: ' + String(err));
    }
  },

  resetToDefaults: async () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ variants: PERFUME_VARIANTS });

    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const rows = PERFUME_VARIANTS.map(mapVariantToRow);
        await supabase.from('perfumes').upsert(rows);
      } catch (err) {
        console.error('Cloud reset failed:', err);
      }
    }
  },

  exportAsCode: () => {
    const json = JSON.stringify(get().variants, null, 2);
    return `import { PerfumeVariant } from '../types';\n\nexport const PERFUME_VARIANTS: PerfumeVariant[] = ${json};\n`;
  },
}));

// Auto-trigger live fetch on app boot if configured
if (typeof window !== 'undefined') {
  useProductStore.getState().fetchLiveVariants();
}
