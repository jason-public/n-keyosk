import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { VoiceGuide } from '../components/layout/VoiceGuide';
import { useUserStore } from '../store/userStore';
import { CreditCard, Smartphone, Banknote } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * 결제 방식 선택 화면 (Payment)
 * 
 * - 신용카드, 간편결제(삼성/카카오페이), 현금결제(직원 문의)
 * 
 * [반응형 최적화 특징]
 * 1. 모바일 뷰 최적화:
 *    - 스마트폰에서는 세 개의 결제 수단 카드가 가로형(Row) 컴팩트 카드로 변경되어,
 *      화면을 아래로 많이 스크롤할 필요 없이 한눈에 세 가지 결제 방식을 모두 확인하고 터치 가능
 * 2. 태블릿/PC 뷰:
 *    - 기존의 큼직한 3열 그리드(grid-cols-3) 및 거대 아이콘을 유지하여 시원한 키오스크 느낌 전달
 */
export function Payment() {
  const navigate = useNavigate();
  const { cart, setCurrentStep } = useUserStore();

  // 화면 진입 시 가이드 단계를 'payment'로 설정
  useEffect(() => {
    setCurrentStep('payment');
  }, [setCurrentStep]);

  // 총 결제 금액 계산
  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  // 결제 수단 선택 시 다음 확인(Confirm) 화면으로 이동
  const handlePayment = (method: string) => {
    navigate('/kiosk/confirm', { state: { method } });
  };

  return (
    <div className="min-h-screen bg-black pt-16 sm:pt-20 md:pt-28 pb-20 sm:pb-24 md:pb-40 flex flex-col">
      {/* 상단바 헤더 */}
      <TopBar title="결제 방식 선택" />
      
      {/* 결제 수단 선택 메인 영역 */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full flex flex-col items-center justify-center gap-4 sm:gap-8 md:gap-12 my-auto">
        <h2 className="text-xl sm:text-3xl md:text-6xl font-bold text-white mb-2 sm:mb-6 md:mb-8 text-center break-keep">
          어떻게 결제하시겠습니까?
        </h2>
        
        {/* 결제 수단 카드 그리드 (모바일: 1열 가로형 카드, 태블릿/PC: 3열 세로형 카드) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 md:gap-8 w-full">
          {/* 1. 신용카드 */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => handlePayment('card')}
            className="bg-[#1A1A1A] border-2 md:border-4 border-transparent hover:border-[#6F3FF5] rounded-2xl sm:rounded-3xl md:rounded-[40px] p-4 sm:p-8 md:p-12 flex flex-row md:flex-col items-center gap-4 md:gap-8 transition-all shadow-lg cursor-pointer select-none text-left md:text-center w-full"
          >
            <div className="w-14 h-14 sm:w-28 sm:h-28 md:w-40 md:h-40 bg-[#6F3FF5]/20 rounded-full flex items-center justify-center shrink-0">
              <CreditCard className="w-7 h-7 sm:w-14 sm:h-14 md:w-20 md:h-20 text-[#6F3FF5]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-2xl md:text-5xl font-bold text-white mb-0.5 sm:mb-2">
                신용카드
              </h3>
              <p className="text-xs sm:text-base md:text-2xl text-gray-400">
                가장 많이 쓰는<br className="hidden md:inline" /> 결제 방식입니다
              </p>
            </div>
          </motion.button>

          {/* 2. 간편결제 */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => handlePayment('simple')}
            className="bg-[#1A1A1A] border-2 md:border-4 border-transparent hover:border-[#B59BFF] rounded-2xl sm:rounded-3xl md:rounded-[40px] p-4 sm:p-8 md:p-12 flex flex-row md:flex-col items-center gap-4 md:gap-8 transition-all shadow-lg cursor-pointer select-none text-left md:text-center w-full"
          >
            <div className="w-14 h-14 sm:w-28 sm:h-28 md:w-40 md:h-40 bg-[#B59BFF]/20 rounded-full flex items-center justify-center shrink-0">
              <Smartphone className="w-7 h-7 sm:w-14 sm:h-14 md:w-20 md:h-20 text-[#B59BFF]" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-2xl md:text-5xl font-bold text-white mb-0.5 sm:mb-2">
                간편결제
              </h3>
              <p className="text-xs sm:text-base md:text-2xl text-gray-400">
                삼성페이, 카카오페이 등<br className="hidden md:inline" /> 스마트폰 결제입니다
              </p>
            </div>
          </motion.button>

          {/* 3. 현금결제 */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => handlePayment('cash')}
            className="bg-[#1A1A1A] border-2 md:border-4 border-transparent hover:border-gray-500 rounded-2xl sm:rounded-3xl md:rounded-[40px] p-4 sm:p-8 md:p-12 flex flex-row md:flex-col items-center gap-4 md:gap-8 transition-all shadow-lg cursor-pointer select-none text-left md:text-center w-full"
          >
            <div className="w-14 h-14 sm:w-28 sm:h-28 md:w-40 md:h-40 bg-gray-500/20 rounded-full flex items-center justify-center shrink-0">
              <Banknote className="w-7 h-7 sm:w-14 sm:h-14 md:w-20 md:h-20 text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-2xl md:text-5xl font-bold text-white mb-0.5 sm:mb-2">
                현금결제
              </h3>
              <p className="text-xs sm:text-base md:text-2xl text-gray-400">
                직원에게 직접<br className="hidden md:inline" /> 결제하는 방식입니다
              </p>
            </div>
          </motion.button>
        </div>
      </div>

      {/* 하단 고정 결제 금액 바 */}
      <div className="fixed bottom-0 left-0 right-0 h-20 sm:h-24 md:h-40 bg-[#1A1A1A] border-t border-white/10 flex items-center justify-between px-4 sm:px-8 md:px-12 z-50">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
          <div className="text-sm sm:text-2xl md:text-4xl text-white font-bold whitespace-nowrap">
            결제할 금액
          </div>
          <div className="text-lg sm:text-3xl md:text-6xl font-bold text-[#B59BFF] whitespace-nowrap">
            {totalAmount.toLocaleString()}원
          </div>
        </div>
      </div>

      {/* 음성 안내 가이드 */}
      <VoiceGuide stepId="payment" />
    </div>
  );
}
