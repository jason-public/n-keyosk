import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { VoiceGuide } from '../components/layout/VoiceGuide';
import { Button } from '../components/ui/Button';
import { useUserStore } from '../store/userStore';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/**
 * 장바구니 확인 화면 (Cart)
 * 
 * [반응형 최적화 특징]
 * 1. 장바구니 카드 반응형 정렬:
 *    - 모바일(sm 미만): 썸네일과 상품명을 상단에 두고, 금액과 수량/삭제 버튼을 하단 양 끝으로 배치하여
 *      스마트폰 좁은 폭에서도 정보가 겹치거나 잘리지 않고 깔끔하게 분할 표시
 *    - 태블릿/PC(sm 이상): 가로 1열 리스트로 시원하게 배치
 * 2. 텍스트 및 버튼 크기:
 *    - 디바이스 해상도에 알맞게 자동 스케일링
 */
export function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, setCurrentStep } = useUserStore();

  // 화면 진입 시 가이드 단계를 'cart'로 설정
  useEffect(() => {
    setCurrentStep('cart');
  }, [setCurrentStep]);

  // 담긴 모든 상품의 합계 금액 계산
  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  // 장바구니가 비어있는 경우 표시할 빈 화면
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black pt-16 sm:pt-20 md:pt-28 pb-20 sm:pb-24 md:pb-40 flex flex-col items-center justify-center p-4">
        <TopBar title="장바구니" />
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 md:mb-12 text-center">
          장바구니가 비어있습니다.
        </h2>
        <Button
          size="2xl"
          onClick={() => navigate('/kiosk/menu')}
          className="w-48 sm:w-64 md:w-80 h-14 sm:h-18 md:h-24 text-base sm:text-2xl md:text-4xl"
        >
          메뉴 고르기
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16 sm:pt-20 md:pt-28 pb-20 sm:pb-24 md:pb-40 flex flex-col">
      {/* 상단바 헤더 */}
      <TopBar title="장바구니 확인" />
      
      {/* 장바구니 아이템 리스트 영역 */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full">
        <h2 className="text-xl sm:text-3xl md:text-5xl font-bold text-white mb-4 sm:mb-8 md:mb-12">
          주문하실 메뉴를 확인해주세요
        </h2>
        
        <div className="flex flex-col gap-3 sm:gap-5 md:gap-6">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="bg-[#1A1A1A] rounded-2xl sm:rounded-3xl md:rounded-[40px] p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 md:gap-8 border border-white/10"
              >
                {/* 상단/좌측 정보 (이미지 + 상품명 + 옵션) */}
                <div className="flex items-center gap-3 sm:gap-5 md:gap-8 flex-1">
                  {/* 상품 썸네일 */}
                  <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-xl sm:rounded-2xl overflow-hidden bg-black/50 shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  {/* 상품명 및 선택된 옵션 텍스트 */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-2xl md:text-4xl font-bold text-white mb-1 sm:mb-2 md:mb-4 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-xs sm:text-base md:text-2xl text-gray-400">
                      {item.options.temperature === 'hot' ? '따뜻하게 (HOT)' : '차갑게 (ICE)'} / 
                      {item.options.size === 'tall' ? ' 기본 크기' : item.options.size === 'grande' ? ' 큰 크기' : ' 가장 큰 크기'}
                    </p>
                  </div>
                </div>
                
                {/* 하단/우측 정보 (금액 + 수량 + 삭제 버튼) */}
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2 sm:gap-4 shrink-0 pt-2 sm:pt-0 border-t border-white/5 sm:border-0">
                  <div className="text-lg sm:text-2xl md:text-4xl font-bold text-[#B59BFF]">
                    {item.totalPrice.toLocaleString()}원
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
                    <span className="text-xs sm:text-base md:text-3xl font-bold text-white bg-white/10 px-3 py-1 sm:px-4 sm:py-1.5 md:px-6 md:py-2 rounded-full">
                      수량 {item.quantity}개
                    </span>
                    <Button
                      variant="danger"
                      size="md"
                      className="w-8 h-8 sm:w-11 sm:h-11 md:w-16 md:h-16 p-0 rounded-full"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="장바구니에서 삭제"
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* 하단 고정 바 (더 고르기 & 결제하기) */}
      <div className="fixed bottom-0 left-0 right-0 h-20 sm:h-24 md:h-40 bg-[#1A1A1A] border-t border-white/10 flex items-center justify-between px-4 sm:px-8 md:px-12 z-50">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
          <div className="text-sm sm:text-2xl md:text-4xl text-white font-bold whitespace-nowrap">
            총 <span className="text-[#B59BFF]">{cart.length}</span>개
          </div>
          <div className="text-base sm:text-3xl md:text-5xl font-bold text-white whitespace-nowrap">
            {totalAmount.toLocaleString()}원
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <Button
            variant="outline"
            size="2xl"
            onClick={() => navigate('/kiosk/menu')}
            className="w-20 sm:w-36 md:w-64 h-12 sm:h-16 md:h-24 text-xs sm:text-xl md:text-4xl border-white/20 text-white"
          >
            더 고르기
          </Button>
          <Button
            size="2xl"
            onClick={() => navigate('/kiosk/payment')}
            className="w-24 sm:w-44 md:w-80 h-12 sm:h-16 md:h-24 text-xs sm:text-xl md:text-4xl"
          >
            결제하기
          </Button>
        </div>
      </div>

      {/* 음성 안내 가이드 */}
      <VoiceGuide stepId="cart" />
    </div>
  );
}
