import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useUserStore } from '../store/userStore';
import { VoiceGuide } from '../components/layout/VoiceGuide';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * 키오스크 주문 완료 축하 화면 (Complete)
 * 
 * [반응형 최적화 특징]
 * 1. 체크 아이콘 및 축하 문구:
 *    - 스마트폰 세로 화면에서도 스크롤 없이 축하 메시지와 버튼이 한눈에 보이도록 크기 동적 조절
 * 2. 버튼 터치 최적화:
 *    - 모바일에서도 편안하게 누를 수 있는 직관적인 반응형 버튼 크기 제공
 */
export function Complete() {
  const navigate = useNavigate();
  const { clearCart, setCurrentStep } = useUserStore();

  // 화면 진입 시 가이드 단계를 'complete'로 설정하고 장바구니 비우기
  useEffect(() => {
    setCurrentStep('complete');
    const timer = setTimeout(() => {
      clearCart();
    }, 1000);
    return () => clearTimeout(timer);
  }, [clearCart, setCurrentStep]);

  // 첫 화면으로 돌아가기
  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 py-10 sm:py-16 relative overflow-hidden">
      {/* 은은한 배경 보라빛 조명 효과 */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#6F3FF5] blur-[150px] opacity-20 rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#B59BFF] blur-[150px] opacity-20 rounded-full" />

      {/* 중앙 완료 알림 컨테이너 */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
        className="z-10 flex flex-col items-center text-center max-w-4xl w-full my-auto"
      >
        {/* 성공 체크마크 아이콘 원형 배지 */}
        <div className="w-24 h-24 sm:w-44 sm:h-44 md:w-64 md:h-64 bg-[#6F3FF5] rounded-full flex items-center justify-center mb-6 sm:mb-10 md:mb-16 shadow-[0_0_80px_rgba(111,63,245,0.5)]">
          <CheckCircle2 className="w-12 h-12 sm:w-20 sm:h-20 md:w-32 md:h-32 text-white" />
        </div>
        
        {/* 주문 완료 축하 타이틀 */}
        <h1 className="text-3xl sm:text-5xl md:text-8xl font-bold text-white mb-4 sm:mb-8 md:mb-12 leading-tight break-keep">
          주문이 완료되었습니다!
        </h1>
        
        {/* 어르신 격려 메시지 */}
        <p className="text-lg sm:text-3xl md:text-5xl text-[#D9D9D9] mb-8 sm:mb-14 md:mb-20 leading-relaxed break-keep font-medium">
          참 잘하셨습니다.<br />이제 실제 카페에서도<br />자신 있게 주문해보세요.
        </p>

        {/* 첫 화면으로 돌아가기 버튼 */}
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full max-w-2xl px-2">
          <Button
            size="2xl"
            onClick={handleHome}
            className="w-full h-14 sm:h-20 md:h-32 text-lg sm:text-2xl md:text-4xl shadow-[0_0_40px_rgba(111,63,245,0.4)]"
          >
            처음으로 돌아가기
          </Button>
        </div>
      </motion.div>

      {/* 완료 축하 음성 안내 */}
      <VoiceGuide stepId="complete" />
    </div>
  );
}
