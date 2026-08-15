import { create } from 'zustand';
import { CartItem, PerfumeVariant } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (variant: PerfumeVariant, volume?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isOpen: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (variant: PerfumeVariant, volume = '100ml / 3.4 fl. oz.') => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => item.variant.id === variant.id && item.selectedVolume === volume
      );

      if (existingIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex].quantity += 1;
        return { items: updatedItems, isOpen: true };
      }

      const newItem: CartItem = {
        id: `${variant.id}-${Date.now()}`,
        variant,
        quantity: 1,
        selectedVolume: volume,
        unitPrice: variant.price,
      };

      return { items: [...state.items, newItem], isOpen: true };
    });
  },

  removeItem: (id: string) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  updateQuantity: (id: string, delta: number) => {
    set((state) => {
      const updatedItems = state.items
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);

      return { items: updatedItems };
    });
  },

  clearCart: () => set({ items: [] }),

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  },
}));
