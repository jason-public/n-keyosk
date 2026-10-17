import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useUserStore } from '../store/userStore';
import { useVoiceGuide } from '../hooks/useVoiceGuide';
import { motion } from 'motion/react';

/**
 * 키오스크 연습센터 메인 첫 화면 (Home)
 * 
 * [반응형 최적화 특징]
 * 1. 뷰포트 크기에 따른 텍스트 크기 가변화:
 *    - 대형 타이틀: 모바일 30px (text-3xl) -> 태블릿 48px (text-5xl) -> PC/키오스크 72px (text-7xl)
 * 2. 버튼 크기 및 높이:
 *    - 모바일에서는 한 손 터치가 편한 64px(h-16) 높이, 태블릿/PC에서는 큼직한 96~128px 높이로 자동 전환
 * 3. 기기 최적화 안내 문구 개선:
 *    - 모바일, 태블릿, 데스크톱 어디서나 최적화된 화면으로 연습 가능함을 안내
 */
export function Home() {
  const navigate = useNavigate();
  const { clearCart, setVoiceEnabled, setCurrentStep } = useUserStore();
  const { play } = useVoiceGuide('home');

  // 홈 화면 진입 시 이전 장바구니 데이터를 비우고 현재 단계를 'home'으로 설정
  useEffect(() => {
    clearCart();
    setCurrentStep('home');
  }, [clearCart, setCurrentStep]);

  // 시작 버튼 클릭 시 음성 지원 여부 저장 후 연습 모드 선택 화면으로 이동
  const handleStart = (withVoice: boolean) => {
    setVoiceEnabled(withVoice);
    navigate('/mode-select');
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 py-10 sm:py-16 relative overflow-hidden">
      {/* 배경 카페 이미지 (어두운 오버레이 적용) */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1559305616-3f99cd43e353?q=80&w=2000&auto=format&fit=crop")' }}
      />
      
      {/* 화려하고 은은한 보라빛 배경 조명 블러 효과 */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#6F3FF5] blur-[150px] opacity-20 rounded-full z-0" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#B59BFF] blur-[150px] opacity-20 rounded-full z-0" />

      {/* 중앙 메인 콘텐츠 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="z-10 flex flex-col items-center text-center max-w-4xl w-full my-auto"
      >
        {/* 메인 타이틀 (반응형 폰트) */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight break-keep">
          남양주 어르신<br />키오스크 연습센터
        </h1>
        
        {/* 서비스 소개 본문 1 */}
        <p className="text-lg sm:text-2xl md:text-4xl text-[#D9D9D9] mb-3 sm:mb-5 md:mb-8 leading-relaxed break-keep font-medium">
          카페에서 키오스크로 음료를 주문하는 방법을<br className="hidden sm:inline" /> 천천히 따라하며 연습해보세요.
        </p>

        {/* 제작 정보 본문 2 */}
        <p className="text-xs sm:text-base md:text-2xl text-[#A0A0A0] mb-8 sm:mb-12 md:mb-16 leading-relaxed break-keep">
          「남양주시 스마트행정혁신 연구동아리」에서 제작한 웹사이트입니다.<br className="hidden sm:inline" /> 누구나 편안하게 무료로 이용하실 수 있습니다.
        </p>

        {/* 액션 버튼 그룹 */}
        <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full max-w-2xl px-2">
          {/* 음성안내 시작 버튼 */}
          <Button
            size="2xl"
            onClick={() => handleStart(true)}
            className="w-full h-16 sm:h-24 md:h-32 text-xl sm:text-3xl md:text-4xl shadow-[0_0_40px_rgba(111,63,245,0.4)]"
          >
            음성안내와 함께 시작하기
          </Button>
          
          {/* 조용한 연습 시작 버튼 */}
          <Button
            variant="outline"
            size="2xl"
            onClick={() => handleStart(false)}
            className="w-full h-16 sm:h-24 md:h-32 text-xl sm:text-3xl md:text-4xl border-2 sm:border-4 text-white"
          >
            조용히 연습 시작하기
          </Button>

          {/* 하단 안내 및 공지사항 바로가기 */}
          <div className="flex flex-col items-center mt-2 sm:mt-4">
            <p className="text-xs sm:text-sm md:text-lg text-[#888888] mb-3 leading-relaxed break-keep">
              ※ 스마트폰, 태블릿, PC 모든 기기 화면에 최적화되어 있습니다.
            </p>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/board')}
              className="w-full h-12 sm:h-16 md:h-20 text-base sm:text-xl md:text-2xl text-gray-400 hover:text-white"
            >
              공지사항 및 교육자료 보기
            </Button>
          </div>
        </div>

        {/* 우측 상단 관리자 페이지 이동 버튼 */}
        <button
          onClick={() => navigate('/admin')}
          className="absolute top-4 right-4 sm:top-8 sm:right-8 text-xs sm:text-sm md:text-base text-white/30 hover:text-white/70 transition-colors p-2"
          aria-label="관리자 페이지"
        >
          관리자
        </button>
      </motion.div>
    </div>
  );
}
