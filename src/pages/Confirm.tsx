import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { VoiceGuide } from '../components/layout/VoiceGuide';
import { Button } from '../components/ui/Button';
import { useUserStore } from '../store/userStore';
import { motion } from 'motion/react';

/**
 * 최종 결제 확인 화면 (Confirm)
 * 
 * [반응형 최적화 특징]
 * 1. 모바일 뷰포트 맞춤형 다이얼로그:
 *    - 스마트폰 폭에 맞춰 패딩(p-5~p-16)과 내부 금액 박스가 안전하게 축소되어 화면 밖으로 넘치지 않음
 * 2. 버튼 배치 반응형:
 *    - 모바일에서는 '네, 결제할게요'와 '아니오' 버튼이 상하 세로(flex-col) 또는 나란히(sm:flex-row) 알맞게 배치되어
 *      엄지손가락으로 쉽게 누를 수 있도록 터치 영역 확보
 */
export function Confirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, setCurrentStep } = useUserStore();

  // 화면 진입 시 가이드 단계를 'confirm'으로 설정
  useEffect(() => {
    setCurrentStep('confirm');
  }, [setCurrentStep]);

  // 전달받은 결제 수단 확인 (기본값: card)
  const method = location.state?.method || 'card';
  // 총 결제 금액 계산
  const totalAmount = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  // 결제 승인 시 완료 화면으로 이동
  const handleConfirm = () => {
    navigate('/kiosk/complete');
  };

  return (
    <div className="min-h-screen bg-black pt-16 sm:pt-20 md:pt-28 pb-20 sm:pb-24 md:pb-40 px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center">
      {/* 상단바 헤더 */}
      <TopBar title="최종 확인" />
      
      {/* 중앙 메인 확인 카드 */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-[#1A1A1A] rounded-2xl sm:rounded-3xl md:rounded-[60px] p-5 sm:p-10 md:p-16 max-w-4xl w-full text-center border-2 md:border-4 border-[#6F3FF5] shadow-[0_0_80px_rgba(111,63,245,0.3)] my-auto"
      >
        {/* 질문 타이틀 */}
        <h2 className="text-2xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-8 md:mb-12 break-keep leading-tight">
          이대로 결제할까요?
        </h2>
        
        {/* 결제 금액 및 결제 방식 표시 박스 */}
        <div className="bg-black/50 rounded-xl sm:rounded-2xl md:rounded-[40px] p-4 sm:p-8 md:p-12 mb-6 sm:mb-10 md:mb-16">
          <div className="text-base sm:text-2xl md:text-4xl text-gray-400 mb-2 sm:mb-4 md:mb-6">
            총 결제 금액
          </div>
          <div className="text-3xl sm:text-6xl md:text-8xl font-bold text-[#B59BFF] break-all">
            {totalAmount.toLocaleString()}원
          </div>
          <div className="text-xs sm:text-xl md:text-3xl text-white mt-3 sm:mt-6 md:mt-8 bg-white/10 inline-block px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-medium">
            {method === 'card'
              ? '신용카드 결제'
              : method === 'simple'
              ? '간편결제 (스마트폰)'
              : '현금결제 (직원 문의)'}
          </div>
        </div>

        {/* 확인 / 취소 액션 버튼 그룹 */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-6 md:gap-8 justify-center">
          <Button
            variant="outline"
            size="2xl"
            onClick={() => navigate(-1)}
            className="w-full sm:w-44 md:w-64 h-12 sm:h-20 md:h-32 text-base sm:text-2xl md:text-4xl border-2 md:border-4 border-white/20 text-white"
          >
            아니오
          </Button>
          <Button
            size="2xl"
            onClick={handleConfirm}
            className="w-full sm:w-64 md:w-96 h-14 sm:h-20 md:h-32 text-lg sm:text-3xl md:text-5xl"
          >
            네, 결제할게요
          </Button>
        </div>
      </motion.div>

      {/* 음성 안내 가이드 */}
      <VoiceGuide stepId="confirm" />
    </div>
  );
}
