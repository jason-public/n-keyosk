import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isPopular?: boolean;
  isRecommended?: boolean;
  isSoldOut?: boolean;
}

export interface Category {
  id: string;
  name: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  type: 'notice' | 'education';
  date: string;
  isPinned?: boolean;
  thumbnail?: string;
}

export interface VoiceScript {
  stepId: string;
  text: string;
}

export interface Settings {
  themeColor: string;
  accentColor: string;
  voiceGuidanceDefault: boolean;
  highContrast: boolean;
  buttonRadius: string;
}

interface AdminState {
  categories: Category[];
  products: Product[];
  posts: Post[];
  voiceScripts: VoiceScript[];
  settings: Settings;
  isAuthenticated: boolean;
  setAuthenticated: (auth: boolean) => void;
  updateCategory: (id: string, name: string) => void;
  addCategory: (name: string) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  updateSettings: (updates: Partial<Settings>) => void;
}

const defaultCategories: Category[] = [
  { id: 'c1', name: '커피' },
  { id: 'c2', name: '라떼' },
  { id: 'c3', name: '차가운 음료' },
  { id: 'c4', name: '티' },
  { id: 'c5', name: '디저트' },
];

const defaultProducts: Product[] = [
  { id: 'p1', categoryId: 'c1', name: '퍼플 아메리카노', description: '퍼플리프의 시그니처 원두로 내린 아메리카노', price: 4500, image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop', isPopular: true },
  { id: 'p2', categoryId: 'c1', name: '디카페인 아메리카노', description: '카페인 부담 없이 즐기는 깔끔한 아메리카노', price: 4800, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop' },
  { id: 'p3', categoryId: 'c2', name: '바닐라 라떼', description: '달콤한 바닐라 시럽이 들어간 부드러운 라떼', price: 5500, image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=400&h=400&fit=crop', isRecommended: true },
  { id: 'p4', categoryId: 'c2', name: '돌체 라떼', description: '연유의 달콤함이 가득한 라떼', price: 5800, image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&h=400&fit=crop' },
  { id: 'p5', categoryId: 'c3', name: '카라멜 크림 프라페', description: '시원하고 달콤한 카라멜 얼음 음료', price: 6500, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=400&fit=crop' },
  { id: 'p6', categoryId: 'c4', name: '유자 캐모마일 티', description: '상큼한 유자와 향긋한 캐모마일의 조화', price: 5000, image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=400&h=400&fit=crop' },
  { id: 'p8', categoryId: 'c4', name: '녹차', description: '깔끔하고 부드러운 유기농 녹차', price: 3500, image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&h=400&fit=crop' },
  { id: 'p7', categoryId: 'c5', name: '블루베리 머핀', description: '상큼한 블루베리가 듬뿍 들어간 머핀', price: 3500, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400&h=400&fit=crop' },
];

const defaultPosts: Post[] = [
  { id: 'post1', title: '처음 이용하시는 분은 연습모드를 먼저 사용해보세요.', content: '연습모드에서는 음성 안내와 함께 천천히 키오스크 사용법을 익힐 수 있습니다.', type: 'notice', date: '2026-03-28', isPinned: true },
  { id: 'post2', title: '음성안내 버튼을 누르면 화면 설명을 들을 수 있습니다.', content: '화면 우측 상단의 스피커 모양 버튼을 누르면 현재 화면에 대한 설명을 들을 수 있습니다.', type: 'education', date: '2026-03-27' },
  { id: 'post3', title: '실전모드는 실제 키오스크처럼 연습할 수 있습니다.', content: '충분히 연습하신 후 실전모드에 도전해보세요!', type: 'notice', date: '2026-03-26' },
];

const defaultVoiceScripts: VoiceScript[] = [
  { stepId: 'home', text: '남양주 어르신 키오스크 연습센터에 오신 것을 환영합니다. 화면 가운데에 있는 음성안내와 함께 시작하기 또는 조용히 연습 시작하기 중 하나를 선택하세요.' },
  { stepId: 'mode', text: '연습하실 모드를 선택해주세요. 처음이시라면 연습 모드를 추천합니다.' },
  { stepId: 'category', text: '왼쪽에서 원하시는 음료 종류를 선택하고, 오른쪽에서 음료를 골라주세요.' },
  { stepId: 'category_with_items', text: '결제를 도와드리겠습니다. 결제를 하시려는 경우 하단의 결제하기 버튼을 눌러주세요.' },
  { stepId: 'category_idle', text: '다른 메뉴를 추가혀려면 왼쪽에서 원하시는 음료 종류를 선택하고, 오른쪽에서 음료를 골라주세요.' },
  { stepId: 'product', text: '선택하신 음료의 온도와 크기를 선택해주세요. 다 고르셨다면 장바구니 담기 버튼을 눌러주세요.' },
  { stepId: 'cart', text: '장바구니에 담긴 음료를 확인해주세요. 맞다면 결제하기 버튼을 눌러주세요.' },
  { stepId: 'payment', text: '결제 방식을 선택해주세요. 카드로 결제하시려면 카드 결제를 눌러주세요.' },
  { stepId: 'confirm', text: '이대로 결제하시겠습니까? 맞다면 결제하기 버튼을 눌러주세요.' },
  { stepId: 'complete', text: '잘하셨습니다. 주문이 완료되었습니다. 처음으로 돌아가시려면 처음으로 버튼을 눌러주세요.' },
];

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      categories: defaultCategories,
      products: defaultProducts,
      posts: defaultPosts,
      voiceScripts: defaultVoiceScripts,
      settings: {
        themeColor: '#000000',
        accentColor: '#6F3FF5',
        voiceGuidanceDefault: true,
        highContrast: false,
        buttonRadius: '1rem',
      },
      isAuthenticated: false,
      setAuthenticated: (auth) => set({ isAuthenticated: auth }),
      updateCategory: (id, name) => set((state) => ({
        categories: state.categories.map((c) => c.id === id ? { ...c, name } : c)
      })),
      addCategory: (name) => set((state) => ({
        categories: [...state.categories, { id: `c${Date.now()}`, name }]
      })),
      updateProduct: (id, updates) => set((state) => ({
        products: state.products.map((p) => p.id === id ? { ...p, ...updates } : p)
      })),
      updateSettings: (updates) => set((state) => ({
        settings: { ...state.settings, ...updates }
      })),
    }),
    { name: 'kiosk-admin-storage' }
  )
);
