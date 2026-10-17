import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { VoiceGuide } from '../components/layout/VoiceGuide';
import { Button } from '../components/ui/Button';
import { useAdminStore } from '../store/adminStore';
import { useUserStore, OrderItem } from '../store/userStore';
import { cn } from '../lib/utils';
import { Minus, Plus } from 'lucide-react';

/**
 * 음료/상품 세부 옵션(온도, 크기, 수량) 선택 화면 (Options)
 * 
 * [반응형 최적화 특징]
 * 1. 상품 요약 상단 영역:
 *    - 모바일에서는 이미지와 설명이 세로/압축 배치되어 가로 스크롤 없이 깔끔하게 표시
 * 2. 온도(HOT/ICE) 및 사이즈 선택 버튼:
 *    - 스마트폰에서는 높이와 글씨가 컴팩트하게 맞춰져 한 화면에서 모든 옵션을 쉽게 비교 및 터치 가능
 * 3. 수량 조절 버튼 및 하단 바:
 *    - 모바일 터치에 최적화된 원형 버튼 크기와 반응형 하단 고정 액션 바 제공
 */
export function Options() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useAdminStore();
  const { addToCart, setCurrentStep } = useUserStore();
  
  // URL 파라미터(:id)로 선택된 상품 정보 탐색
  const product = products.find((p) => p.id === id);
  
  // 사용자의 선택 상태 (온도, 크기, 수량)
  const [temp, setTemp] = useState<'hot' | 'ice'>('ice');
  const [size, setSize] = useState<'tall' | 'grande' | 'venti'>('tall');
  const [quantity, setQuantity] = useState(1);

  // 화면 진입 시 가이드 단계를 'product'로 설정
  useEffect(() => {
    setCurrentStep('product');
  }, [setCurrentStep]);

  // 상품이 존재하지 않는 경우 (잘못된 접근 등) 렌더링 방지
  if (!product) return null;

  // 사이즈별 추가 요금 계산
  const sizePrices = { tall: 0, grande: 500, venti: 1000 };
  const basePrice = product.price + sizePrices[size];
  const totalPrice = basePrice * quantity;

  // 장바구니에 아이템 추가 후 메뉴 화면으로 복귀
  const handleAdd = () => {
    const item: OrderItem = {
      id: Date.now().toString(),
      product,
      options: {
        temperature: temp,
        size,
        shot: 0,
        syrup: 0,
      },
      quantity,
      totalPrice,
    };
    addToCart(item);
    navigate('/kiosk/menu');
  };

  return (
    <div className="min-h-screen bg-black pt-16 sm:pt-20 md:pt-28 pb-20 sm:pb-24 md:pb-40 flex flex-col">
      {/* 상단바 헤더 */}
      <TopBar title="옵션 선택" />
      
      {/* 메인 옵션 설정 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full">
        {/* 상품 대표 이미지 및 이름/설명 요약 (모바일 flex-col -> 태블릿 flex-row) */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 md:gap-12 mb-6 sm:mb-8 md:mb-12 bg-[#141414] sm:bg-transparent p-4 sm:p-0 rounded-2xl sm:rounded-none">
          <div className="w-32 h-32 sm:w-44 sm:h-44 md:w-1/3 md:h-auto aspect-square rounded-2xl md:rounded-3xl overflow-hidden bg-white/5 shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-1.5 sm:mb-4 md:mb-6 break-keep">
              {product.name}
            </h2>
            <p className="text-xs sm:text-lg md:text-3xl text-gray-400 mb-2 sm:mb-4 md:mb-8">
              {product.description}
            </p>
            <p className="text-xl sm:text-3xl md:text-5xl font-bold text-[#B59BFF]">
              {basePrice.toLocaleString()}원
            </p>
          </div>
        </div>

        {/* 1. 온도 선택 (HOT / ICE) */}
        <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-3xl md:rounded-[40px] p-4 sm:p-6 md:p-10 mb-4 sm:mb-6 md:mb-8">
          <h3 className="text-base sm:text-2xl md:text-4xl font-bold text-white mb-3 sm:mb-5 md:mb-8">
            온도 선택
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            <button
              onClick={() => setTemp('hot')}
              className={cn(
                'h-14 sm:h-20 md:h-32 rounded-xl sm:rounded-2xl md:rounded-3xl text-base sm:text-2xl md:text-4xl font-bold transition-all border-2 sm:border-4 cursor-pointer select-none',
                temp === 'hot'
                  ? 'bg-red-500 border-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                  : 'bg-transparent border-white/20 text-white hover:bg-white/5'
              )}
            >
              따뜻하게 (HOT)
            </button>
            <button
              onClick={() => setTemp('ice')}
              className={cn(
                'h-14 sm:h-20 md:h-32 rounded-xl sm:rounded-2xl md:rounded-3xl text-base sm:text-2xl md:text-4xl font-bold transition-all border-2 sm:border-4 cursor-pointer select-none',
                temp === 'ice'
                  ? 'bg-blue-500 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  : 'bg-transparent border-white/20 text-white hover:bg-white/5'
              )}
            >
              차갑게 (ICE)
            </button>
          </div>
        </div>

        {/* 2. 크기(사이즈) 선택 (기본 / 큰 사이즈 / 가장 큰 사이즈) */}
        <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-3xl md:rounded-[40px] p-4 sm:p-6 md:p-10 mb-4 sm:mb-6 md:mb-8">
          <h3 className="text-base sm:text-2xl md:text-4xl font-bold text-white mb-3 sm:mb-5 md:mb-8">
            크기 선택
          </h3>
          <div className="grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
            {(['tall', 'grande', 'venti'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn(
                  'h-16 sm:h-24 md:h-32 rounded-xl sm:rounded-2xl md:rounded-3xl text-xs sm:text-lg md:text-3xl font-bold transition-all border-2 sm:border-4 flex flex-col items-center justify-center gap-1 sm:gap-2 cursor-pointer select-none',
                  size === s
                    ? 'bg-[#6F3FF5] border-[#6F3FF5] text-white shadow-[0_0_20px_rgba(111,63,245,0.4)]'
                    : 'bg-transparent border-white/20 text-white hover:bg-white/5'
                )}
              >
                <span>
                  {s === 'tall' ? '기본' : s === 'grande' ? '큰 사이즈' : '가장 큰'}
                </span>
                {sizePrices[s] > 0 && (
                  <span className="text-[10px] sm:text-sm md:text-xl opacity-80">
                    (+{sizePrices[s]}원)
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 3. 주문 수량 조절 */}
        <div className="bg-[#1A1A1A] rounded-2xl sm:rounded-3xl md:rounded-[40px] p-4 sm:p-6 md:p-10 mb-4 sm:mb-6 md:mb-8 flex items-center justify-between">
          <h3 className="text-base sm:text-2xl md:text-4xl font-bold text-white">
            수량
          </h3>
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8">
            {/* 수량 감소 버튼 */}
            <Button
              variant="outline"
              size="lg"
              className="w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 p-0 rounded-full border-white/20 text-white"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              aria-label="수량 1개 줄이기"
            >
              <Minus className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            </Button>

            {/* 현재 수량 숫자 */}
            <span className="text-2xl sm:text-4xl md:text-6xl font-bold text-white w-10 sm:w-16 md:w-20 text-center select-none">
              {quantity}
            </span>

            {/* 수량 증가 버튼 */}
            <Button
              variant="outline"
              size="lg"
              className="w-10 h-10 sm:w-16 sm:h-16 md:w-24 md:h-24 p-0 rounded-full border-white/20 text-white"
              onClick={() => setQuantity(quantity + 1)}
              aria-label="수량 1개 늘리기"
            >
              <Plus className="w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            </Button>
          </div>
        </div>
      </div>

      {/* 하단 고정 옵션 바 (취소 및 담기 버튼) */}
      <div className="fixed bottom-0 left-0 right-0 h-20 sm:h-24 md:h-40 bg-[#1A1A1A] border-t border-white/10 flex items-center justify-between px-4 sm:px-8 md:px-12 z-50">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
          <div className="text-base sm:text-2xl md:text-5xl font-bold text-white whitespace-nowrap">
            총 <span className="text-[#B59BFF]">{totalPrice.toLocaleString()}</span>원
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <Button
            variant="outline"
            size="2xl"
            onClick={() => navigate(-1)}
            className="w-16 sm:w-36 md:w-64 h-12 sm:h-16 md:h-24 text-xs sm:text-xl md:text-4xl border-white/20 text-white"
          >
            취소
          </Button>
          <Button
            size="2xl"
            onClick={handleAdd}
            className="w-32 sm:w-56 md:w-80 h-12 sm:h-16 md:h-24 text-xs sm:text-xl md:text-4xl"
          >
            장바구니 담기
          </Button>
        </div>
      </div>

      {/* 음성 안내 가이드 */}
      <VoiceGuide stepId="product" />
    </div>
  );
}
