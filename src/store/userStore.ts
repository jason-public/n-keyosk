import { create } from 'zustand';
import { Product } from './adminStore';

export interface OrderItem {
  id: string;
  product: Product;
  options: {
    temperature: 'hot' | 'ice';
    size: 'tall' | 'grande' | 'venti';
    shot: number;
    syrup: number;
  };
  quantity: number;
  totalPrice: number;
}

export type PracticeMode = 'practice' | 'real' | 'step' | null;

interface UserState {
  mode: PracticeMode;
  cart: OrderItem[];
  isVoiceEnabled: boolean;
  currentStep: string;
  setMode: (mode: PracticeMode) => void;
  addToCart: (item: OrderItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleVoice: () => void;
  setVoiceEnabled: (enabled: boolean) => void;
  setCurrentStep: (step: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  mode: null,
  cart: [],
  isVoiceEnabled: true,
  currentStep: 'home',
  setMode: (mode) => set({ mode }),
  addToCart: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),
  clearCart: () => set({ cart: [] }),
  toggleVoice: () => set((state) => ({ isVoiceEnabled: !state.isVoiceEnabled })),
  setVoiceEnabled: (enabled) => set({ isVoiceEnabled: enabled }),
  setCurrentStep: (step) => set({ currentStep: step }),
}));
