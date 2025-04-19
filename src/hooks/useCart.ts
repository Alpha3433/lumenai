
import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'package' | 'addon';
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const items = get().items;
    if (!items.find(i => i.id === item.id)) {
      set(state => ({ 
        items: [...state.items, item],
        total: state.total + item.price
      }));
    }
  },
  removeItem: (id) => {
    const items = get().items;
    const item = items.find(i => i.id === item.id);
    if (item) {
      set(state => ({ 
        items: state.items.filter(i => i.id !== id),
        total: state.total - item.price
      }));
    }
  },
  clearCart: () => set({ items: [], total: 0 }),
  total: 0
}));

