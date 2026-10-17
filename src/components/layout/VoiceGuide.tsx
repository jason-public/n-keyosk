import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, MessageCircle } from 'lucide-react';
import { useVoiceGuide } from '../../hooks/useVoiceGuide';
import { useUserStore } from '../../store/userStore';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'motion/react';

/**
 * VoiceGuide 컴포넌트의 Props(속성) 인터페이스
 * - stepId: 현재 화면 및 상태에 해당하는 음성 가이드 식별자 (예: 'home', 'category', 'cart')
 */
interface VoiceGuideProps {
  stepId: string;
}

/**
 * 어르신을 위한 인터랙티브 음성 안내 팝업 컴포넌트 (VoiceGuide)
 * 
 * [반응형 최적화 특징]
 * 1. 하단 바(Bottom Bar)와의 겹침 방지:
 *    - 모바일에서는 하단 바 높이(h-20) 바로 위인 bottom-22 (88px)에 알맞게 자리잡아
 *      상품 선택 및 결제 버튼을 가리지 않음
 * 2. 텍스트 및 조작 버튼 반응형 스케일링:
 *    - 모바일 스마트폰 화면에서도 음성 내용(text-sm~3xl)과 '다시 듣기', '천천히 듣기' 버튼이
 *      깔끔한 크기로 표시되어 가독성과 조작성을 모두 확보
 * 3. 콤팩트 플로팅 복원 버튼:
 *    - 안내가 끝난 후 우측 상단에 나타나는 '음성 안내 다시 듣기' 버튼도
 *      모바일 화면에 맞춰 아담하고 깔끔한 크기로 자동 변환
 */
export function VoiceGuide({ stepId }: VoiceGuideProps) {
  const { isVoiceEnabled } = useUserStore();
  const { play, isPlaying, text } = useVoiceGuide(stepId);
  const [isVisible, setIsVisible] = useState(true);

  // 음성 재생이 끝나면 2초 후에 안내 상자를 부드럽게 닫음
  useEffect(() => {
    if (isPlaying) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying]);

  // 화면 단계(stepId)가 바뀌면 다시 안내 상자를 열어줌
  useEffect(() => {
    setIsVisible(true);
  }, [stepId]);

  // 음성이 꺼져 있거나 안내 문구가 없으면 표시하지 않음
  if (!isVoiceEnabled || !text) return null;

  return (
    <AnimatePresence mode="wait">
      {isVisible ? (
        // [음성 안내 팝업 박스]
        <motion.div
          key="guide-box"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-22 sm:bottom-28 md:bottom-44 left-1/2 -translate-x-1/2 z-40 w-[94%] sm:w-[90%] max-w-4xl"
        >
          <div className="bg-black/90 backdrop-blur-xl border-2 border-[#6F3FF5] rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 md:p-8 shadow-[0_10px_40px_rgba(111,63,245,0.35)] flex items-center gap-3 sm:gap-6 md:gap-8">
            {/* 음성 안내 자막 텍스트 */}
            <div className="flex-1 text-xs sm:text-xl md:text-3xl leading-snug text-white font-medium break-keep">
              {text}
            </div>

            {/* 재청취 및 느리게 듣기 버튼 그룹 */}
            <div className="flex flex-col gap-1.5 sm:gap-3 md:gap-4 shrink-0">
              <Button
                variant="outline"
                size="md"
                className="h-8 sm:h-12 md:h-16 px-2.5 sm:px-4 md:px-6 text-xs sm:text-base md:text-xl gap-1 sm:gap-2 border-[#B59BFF] text-[#B59BFF] rounded-lg sm:rounded-xl md:rounded-2xl"
                onClick={() => play(1.0)}
                disabled={isPlaying}
                aria-label="안내 음성 다시 듣기"
              >
                <Play className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span>다시 듣기</span>
              </Button>
              <Button
                variant="ghost"
                size="md"
                className="h-8 sm:h-12 md:h-16 px-2.5 sm:px-4 md:px-6 text-xs sm:text-base md:text-xl gap-1 sm:gap-2 text-gray-300 bg-white/5 rounded-lg sm:rounded-xl md:rounded-2xl"
                onClick={() => play(0.8)}
                disabled={isPlaying}
                aria-label="안내 음성 천천히 듣기"
              >
                <RotateCcw className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                <span>천천히 듣기</span>
              </Button>
            </div>
          </div>
        </motion.div>
      ) : (
        // [팝업이 닫혔을 때 우측 상단 플로팅 다시 듣기 버튼]
        <motion.div
          key="guide-button"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.2 }}
          className="fixed top-18 sm:top-24 md:top-32 right-3 sm:right-6 md:right-8 z-40"
        >
          <Button
            variant="primary"
            size="md"
            className="h-10 sm:h-14 md:h-20 px-3 sm:px-4 md:px-6 text-xs sm:text-base md:text-2xl gap-1.5 sm:gap-2 md:gap-3 rounded-xl md:rounded-2xl shadow-[0_10px_30px_rgba(111,63,245,0.4)]"
            onClick={() => {
              setIsVisible(true);
              play(1.0);
            }}
            aria-label="음성 안내 다시 듣기"
          >
            <MessageCircle className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
            <span>음성 안내 다시 듣기</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
