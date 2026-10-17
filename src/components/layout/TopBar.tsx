import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ChevronLeft, Volume2, VolumeX } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import { Button } from '../ui/Button';

/**
 * TopBar 컴포넌트의 Props(속성) 정의
 * - title: 상단바 중앙에 표시될 화면 이름 (예: "메뉴 선택", "옵션 선택")
 * - showBack: 이전 화면으로 돌아가는 화살표 버튼 표시 여부 (기본값: true)
 * - onBack: 뒤로가기 버튼 클릭 시 실행할 커스텀 함수 (선택 사항)
 */
interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

/**
 * 상단 네비게이션 바 컴포넌트 (반응형 최적화)
 * 
 * [반응형 디자인 적용 내용]
 * 1. 높이: 모바일 h-16 (64px) -> 태블릿 h-20 (80px) -> 대형 키오스크 h-28 (112px)
 * 2. 아이콘 및 버튼 크기: 작은 스마트폰 화면에서도 화면을 가리지 않도록 유연하게 스케일링
 * 3. 중앙 타이틀: 화면 크기에 맞춰 글씨 크기가 자동으로 조절되며 긴 텍스트도 줄바꿈 없이 깔끔하게 표시
 * 4. 음성 버튼: 모바일에서는 콤팩트하게, 태블릿/PC에서는 큼직하게 자동 전환
 */
export function TopBar({ title, showBack = true, onBack }: TopBarProps) {
  const navigate = useNavigate();
  const { isVoiceEnabled, toggleVoice } = useUserStore();

  // 뒤로가기 처리: 커스텀 onBack 함수가 있으면 실행하고, 없으면 브라우저 히스토리 한 단계 뒤로 이동
  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  // 홈 화면으로 바로 가기
  const handleHome = () => {
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 sm:h-20 md:h-28 bg-black/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-3 sm:px-6 md:px-8 z-50 transition-all duration-200">
      {/* 좌측: 뒤로가기 및 홈 버튼 그룹 */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
        {showBack && (
          <Button
            variant="ghost"
            onClick={handleBack}
            className="w-10 h-10 sm:w-14 sm:h-14 md:w-24 md:h-20 p-0 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-white/10"
            aria-label="이전 화면으로 돌아가기"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-white" />
          </Button>
        )}
        <Button
          variant="ghost"
          onClick={handleHome}
          className="w-10 h-10 sm:w-14 sm:h-14 md:w-24 md:h-20 p-0 rounded-xl md:rounded-2xl flex items-center justify-center hover:bg-white/10"
          aria-label="처음 화면으로 돌아가기"
        >
          <Home className="w-5 h-5 sm:w-7 sm:h-7 md:w-10 md:h-10 text-white" />
        </Button>
      </div>

      {/* 중앙: 화면 제목 (반응형 폰트 크기 및 중앙 정렬) */}
      {title && (
        <h1 className="text-lg sm:text-2xl md:text-4xl font-bold text-white text-center truncate px-2 flex-1">
          {title}
        </h1>
      )}

      {/* 우측: 음성 안내 켜기/끄기 토글 버튼 */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <Button
          variant={isVoiceEnabled ? 'primary' : 'outline'}
          onClick={toggleVoice}
          className="h-10 sm:h-14 md:h-20 px-3 sm:px-4 md:px-6 gap-1.5 sm:gap-2 md:gap-3 rounded-xl md:rounded-2xl"
          aria-label={isVoiceEnabled ? '음성 안내 끄기' : '음성 안내 켜기'}
        >
          {isVoiceEnabled ? (
            <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 md:w-9 md:h-9" />
          ) : (
            <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 md:w-9 md:h-9" />
          )}
          <span className="text-xs sm:text-base md:text-2xl font-bold">
            {isVoiceEnabled ? '음성 켜짐' : '음성 꺼짐'}
          </span>
        </Button>
      </div>
    </header>
  );
}
