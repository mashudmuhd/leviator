import { create } from 'zustand';
import { PerfumeVariant } from '../types';
import { PERFUME_VARIANTS } from '../data/perfumeVariants';

const STORAGE_KEY = 'leviator_perfume_catalog_v1';

interface ProductStoreState {
  variants: PerfumeVariant[];
  addVariant: (variant: PerfumeVariant) => void;
  updateVariant: (id: string, updated: Partial<PerfumeVariant>) => void;
  deleteVariant: (id: string) => void;
  resetToDefaults: () => void;
  exportAsCode: () => string;
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
    console.warn('Failed to load saved variants from storage:', err);
  }
  return PERFUME_VARIANTS;
};

const saveVariants = (variants: PerfumeVariant[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(variants));
  } catch (err) {
    console.error('Failed to save variants to storage:', err);
  }
};

export const useProductStore = create<ProductStoreState>((set, get) => ({
  variants: loadInitialVariants(),

  addVariant: (variant: PerfumeVariant) => {
    const updated = [variant, ...get().variants];
    saveVariants(updated);
    set({ variants: updated });
  },

  updateVariant: (id: string, updatedFields: Partial<PerfumeVariant>) => {
    const updated = get().variants.map((v) =>
      v.id === id ? { ...v, ...updatedFields } : v
    );
    saveVariants(updated);
    set({ variants: updated });
  },

  deleteVariant: (id: string) => {
    const updated = get().variants.filter((v) => v.id !== id);
    saveVariants(updated);
    set({ variants: updated });
  },

  resetToDefaults: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({ variants: PERFUME_VARIANTS });
  },

  exportAsCode: () => {
    const json = JSON.stringify(get().variants, null, 2);
    return `import { PerfumeVariant } from '../types';\n\nexport const PERFUME_VARIANTS: PerfumeVariant[] = ${json};\n`;
  },
}));
