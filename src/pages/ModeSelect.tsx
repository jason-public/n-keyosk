import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { VoiceGuide } from '../components/layout/VoiceGuide';
import { useUserStore, PracticeMode } from '../store/userStore';
import { motion } from 'motion/react';

/**
 * 연습 모드 선택 화면 (ModeSelect)
 * 
 * - '연습 모드': 음성 안내 및 힌트 제공
 * - '실전 모드': 실제 키오스크와 동일하게 스스로 주문
 * 
 * [반응형 최적화 특징]
 * 1. 상단 TopBar(h-16~h-28)에 맞춘 유연한 상단 패딩(`pt-20 sm:pt-24 md:pt-36`) 적용
 * 2. 모바일 화면에서 카드가 한눈에 쏙 들어오도록 카드 패딩(`p-6 sm:p-8 md:p-12`) 및 폰트 크기 최적화
 * 3. 둥근 모서리(`rounded-2xl sm:rounded-3xl md:rounded-[40px]`)와 간격 반응형화
 */
export function ModeSelect() {
  const navigate = useNavigate();
  const { setMode, setCurrentStep } = useUserStore();

  // 화면 진입 시 가이드 단계를 'mode'로 갱신
  useEffect(() => {
    setCurrentStep('mode');
  }, [setCurrentStep]);

  // 모드 선택 처리 후 메뉴 화면으로 이동
  const handleSelect = (mode: PracticeMode) => {
    setMode(mode);
    navigate('/kiosk/menu');
  };

  return (
    <div className="min-h-screen bg-black pt-20 sm:pt-24 md:pt-36 pb-32 sm:pb-36 md:pb-44 px-4 sm:px-6 md:px-8 flex flex-col justify-center">
      {/* 상단바 네비게이션 */}
      <TopBar title="연습 모드 선택" />
      
      {/* 메인 선택 카드 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-12 max-w-5xl mx-auto w-full my-auto">
        {/* 연습 모드 버튼 카드 */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => handleSelect('practice')}
          className="w-full bg-[#1A1A1A] border-2 sm:border-4 border-[#6F3FF5] rounded-2xl sm:rounded-3xl md:rounded-[40px] p-6 sm:p-8 md:p-12 text-left hover:bg-[#2A2A2A] transition-all shadow-[0_0_40px_rgba(111,63,245,0.25)] cursor-pointer select-none"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white">
              연습 모드
            </h2>
            <span className="bg-[#6F3FF5] text-white px-3 py-1 sm:px-5 sm:py-2 md:px-6 md:py-3 rounded-full text-xs sm:text-base md:text-2xl font-bold">
              추천
            </span>
          </div>
          <p className="text-base sm:text-2xl md:text-4xl text-[#D9D9D9] leading-relaxed break-keep">
            음성 안내와 힌트가 제공됩니다.<br />처음이신 분들께 추천합니다.
          </p>
        </motion.button>

        {/* 실전 모드 버튼 카드 */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => handleSelect('real')}
          className="w-full bg-[#1A1A1A] border-2 sm:border-4 border-white/10 hover:border-[#B59BFF] rounded-2xl sm:rounded-3xl md:rounded-[40px] p-6 sm:p-8 md:p-12 text-left hover:bg-[#2A2A2A] transition-all cursor-pointer select-none"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white">
              실전 모드
            </h2>
          </div>
          <p className="text-base sm:text-2xl md:text-4xl text-[#D9D9D9] leading-relaxed break-keep">
            실제 키오스크와 똑같이 진행됩니다.<br />충분히 연습하신 후 도전해보세요.
          </p>
        </motion.button>
      </div>

      {/* 하단 음성 안내 가이드 */}
      <VoiceGuide stepId="mode" />
    </div>
  );
}
