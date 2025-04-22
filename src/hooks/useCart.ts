
import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'package' | 'addon';
  quantity?: number; // Support for tracking quantity per item
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  setItemQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => {
    const items = get().items;
    const existing = items.find(i => i.id === item.id);
    if (!existing) {
      set(state => ({
        items: [...state.items, { ...item, quantity: item.quantity || 1 }],
        total: state.total + item.price * (item.quantity || 1),
      }));
    } else {
      // For simplicity, do not add duplicates; if needed, increase quantity.
      set(state => ({
        items: state.items.map(i =>
          i.id === item.id
            ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
            : i
        ),
        total: state.total + item.price * (item.quantity || 1),
      }));
    }
  },
  removeItem: (id) => {
    const items = get().items;
    const item = items.find(i => i.id === id);
    if (item) {
      set(state => ({
        items: state.items.filter(i => i.id !== id),
        total: state.total - (item.price * (item.quantity || 1)),
      }));
    }
  },
  setItemQuantity: (id, quantity) => {
    set(state => {
      const idx = state.items.findIndex(i => i.id === id);
      if (idx === -1) return state;
      const oldItem = state.items[idx];
      const totalDifference = (quantity - (oldItem.quantity || 1)) * oldItem.price;
      return {
        items: [
          ...state.items.slice(0, idx),
          { ...oldItem, quantity },
          ...state.items.slice(idx + 1),
        ],
        total: state.total + totalDifference,
      };
    });
  },
  clearCart: () => set({ items: [], total: 0 }),
  total: 0
}));
