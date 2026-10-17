import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { VoiceGuide } from '../components/layout/VoiceGuide';
import { ProductCard } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';
import { useAdminStore, Product } from '../store/adminStore';
import { useUserStore } from '../store/userStore';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

/**
 * 키오스크 메뉴 및 카테고리 선택 화면 (Menu)
 * 
 * [반응형 최적화 특징]
 * 1. 카테고리 반응형 듀얼 모드:
 *    - 모바일/스마트폰(md 미만): 화면 상단에 가로 스크롤 탭(Horizontal Scroll Tabs)으로 표시하여
 *      화면 가로 폭을 전혀 낭비하지 않고 상품 그리드 공간을 100% 확보
 *    - 태블릿/PC(md 이상): 전통적인 대형 키오스크 스타일의 좌측 사이드바(Sidebar) 유지
 * 2. 상품 그리드 반응형:
 *    - 모바일에서는 2열 그리드(grid-cols-2)와 컴팩트한 간격(gap-3),
 *    - PC/태블릿에서는 2~3열 그리드와 넓은 카드 높이 지원
 * 3. 하단 장바구니 결제 바(Bottom Bar):
 *    - 스마트폰에서는 화면을 가리지 않도록 높이를 알맞게(h-20) 조정하고,
 *      총 수량/금액과 결제 버튼이 깔끔하게 양쪽에 정렬되도록 구성
 */
export function Menu() {
  const navigate = useNavigate();
  const { categories, products } = useAdminStore();
  const { cart, setCurrentStep } = useUserStore();
  
  // 현재 선택된 활성 카테고리 ID (기본값: 첫 번째 카테고리)
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id);
  // 어르신이 10초 이상 조작이 없을 경우 도움 음성을 제공하기 위한 유휴 시간(idleTime)
  const [idleTime, setIdleTime] = useState(0);

  // 장바구니 상태와 유휴 시간에 따라 음성 안내 단계 동적 갱신
  useEffect(() => {
    if (cart.length > 0) {
      if (idleTime >= 10) {
        setCurrentStep('category_idle');
      } else {
        setCurrentStep('category_with_items');
      }
    } else {
      setCurrentStep('category');
    }
  }, [cart.length, idleTime, setCurrentStep]);

  // 화면 터치나 클릭이 발생하면 유휴 시간 타이머를 0으로 리셋
  useEffect(() => {
    if (cart.length === 0) return;

    const timer = setInterval(() => {
      setIdleTime((prev) => prev + 1);
    }, 1000);

    const resetIdleTime = () => setIdleTime(0);
    window.addEventListener('click', resetIdleTime);
    window.addEventListener('touchstart', resetIdleTime);

    return () => {
      clearInterval(timer);
      window.removeEventListener('click', resetIdleTime);
      window.removeEventListener('touchstart', resetIdleTime);
    };
  }, [cart.length]);

  // 현재 활성화된 카테고리에 속한 상품들만 필터링
  const filteredProducts = products.filter((p) => p.categoryId === activeCategory);
  // 장바구니에 담긴 총 결제 금액 계산
  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  // 상품 클릭/터치 시 옵션 선택 페이지로 이동 (품절 상품 제외)
  const handleProductClick = (product: Product) => {
    if (product.isSoldOut) return;
    navigate(`/kiosk/options/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-black pt-16 sm:pt-20 md:pt-28 pb-20 sm:pb-24 md:pb-40 flex flex-col">
      {/* 상단 네비게이션 헤더 */}
      <TopBar title="메뉴 선택" />

      {/* 모바일 전용: 상단 가로 스크롤 카테고리 탭 (화면 폭 md 미만에서 표시) */}
      <div className="md:hidden w-full bg-[#111] border-b border-white/10 px-3 py-2 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none shrink-0 z-40">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm sm:text-base font-bold transition-all shrink-0 cursor-pointer select-none',
              activeCategory === cat.id
                ? 'bg-[#6F3FF5] text-white shadow-[0_0_15px_rgba(111,63,245,0.4)]'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 메인 콘텐츠 영역 (PC에서는 사이드바 + 그리드 가로 배치) */}
      <div className="flex-1 flex overflow-hidden">
        {/* 태블릿/PC 전용: 좌측 카테고리 사이드바 (화면 폭 md 이상에서 표시) */}
        <div className="hidden md:block w-48 lg:w-64 bg-[#111] border-r border-white/10 overflow-y-auto shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'w-full text-left px-5 lg:px-8 py-7 lg:py-10 text-xl lg:text-3xl font-bold transition-colors border-b border-white/5 cursor-pointer select-none',
                activeCategory === cat.id
                  ? 'bg-[#6F3FF5] text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 상품 그리드 영역 (스크롤 가능) */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 md:gap-8 pb-8"
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={handleProductClick}
                  className="min-h-[200px] sm:min-h-[280px] md:min-h-[420px]"
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 하단 고정 장바구니 현황 및 결제 바 (반응형 최적화) */}
      <div className="fixed bottom-0 left-0 right-0 h-20 sm:h-24 md:h-40 bg-[#1A1A1A] border-t border-white/10 flex items-center justify-between px-4 sm:px-8 md:px-12 z-50 transition-all">
        {/* 수량 및 총 금액 표시 */}
        <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
          <div className="text-base sm:text-2xl md:text-4xl text-white font-bold whitespace-nowrap">
            총 <span className="text-[#B59BFF]">{cart.length}</span>개
          </div>
          <div className="text-lg sm:text-3xl md:text-5xl font-bold text-white whitespace-nowrap">
            {totalAmount.toLocaleString()}원
          </div>
        </div>
        
        {/* 결제하기/장바구니 확인 버튼 */}
        <Button
          size="2xl"
          disabled={cart.length === 0}
          onClick={() => navigate('/kiosk/cart')}
          className="w-28 sm:w-48 md:w-80 h-12 sm:h-16 md:h-24 text-sm sm:text-xl md:text-4xl shrink-0"
        >
          결제하기
        </Button>
      </div>

      {/* 상황별 음성 안내 가이드 */}
      <VoiceGuide
        stepId={
          cart.length > 0
            ? idleTime >= 10
              ? 'category_idle'
              : 'category_with_items'
            : 'category'
        }
      />
    </div>
  );
}
