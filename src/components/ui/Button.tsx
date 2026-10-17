import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

/**
 * Button 컴포넌트의 Props(속성) 인터페이스
 * 
 * - variant: 버튼의 시각적 테마 스타일
 *   - 'primary': 메인 보라색 배경 (강조 버튼)
 *   - 'secondary': 연한 보라색 배경
 *   - 'outline': 테두리 스타일
 *   - 'ghost': 투명 배경 스타일 (상단바 아이콘 등에 사용)
 *   - 'danger': 붉은색 경고/삭제 스타일
 * - size: 버튼 크기 (모바일/태블릿/데스크톱 반응형 지원)
 *   - 'md': 일반 크기
 *   - 'lg': 큰 크기
 *   - 'xl': 아주 큰 크기
 *   - '2xl': 키오스크용 거대 크기 (모바일에서는 화면에 맞게 자동 축소)
 * - isLoading: 로딩 스피너 표시 여부
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'md' | 'lg' | 'xl' | '2xl';
  isLoading?: boolean;
}

/**
 * 재사용 가능한 공통 Button 컴포넌트
 * 
 * [반응형 최적화 특징]
 * 기존에는 size="2xl"일 때 모바일에서도 고정 높이 128px(h-32), 글자 크기 36px(text-4xl)로
 * 화면을 심하게 가리고 넘쳤습니다.
 * 반응형 Tailwind 클래스(sm:, md:)를 적용하여 스마트폰에서는 알맞은 크기로,
 * 태블릿과 데스크톱에서는 큼직하고 시원한 키오스크 버튼 크기로 자동 변환됩니다.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'xl', isLoading, children, ...props }, ref) => {
    return (
      <motion.button
        // 버튼을 터치하거나 클릭할 때 살짝 눌리는 애니메이션 효과로 손맛 제공
        whileTap={{ scale: 0.97 }}
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl md:rounded-2xl font-bold transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6F3FF5] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
          {
            // 색상 테마 (Variants)
            'bg-[#6F3FF5] text-white hover:bg-[#5A33C7] shadow-[0_0_20px_rgba(111,63,245,0.3)] hover:shadow-[0_0_30px_rgba(111,63,245,0.5)]':
              variant === 'primary',
            'bg-[#B59BFF] text-black hover:bg-[#9A7BE5]': variant === 'secondary',
            'border-2 border-[#6F3FF5] text-[#6F3FF5] hover:bg-[#6F3FF5]/10':
              variant === 'outline',
            'hover:bg-white/10 text-white': variant === 'ghost',
            'bg-red-500 text-white hover:bg-red-600': variant === 'danger',

            // 반응형 크기 (Sizes): 모바일 -> 태블릿(sm:) -> PC/키오스크(md:)
            'h-10 px-3 text-sm sm:h-12 sm:px-4 sm:text-base md:h-14 md:px-6 md:text-lg':
              size === 'md',
            'h-12 px-4 text-base sm:h-16 sm:px-6 sm:text-xl md:h-20 md:px-8 md:text-2xl':
              size === 'lg',
            'h-14 px-5 text-lg sm:h-18 sm:px-8 sm:text-2xl md:h-24 md:px-10 md:text-3xl':
              size === 'xl',
            'h-16 px-6 text-xl sm:h-24 sm:px-8 sm:text-3xl md:h-32 md:px-12 md:text-4xl':
              size === '2xl',
          },
          className
        )}
        {...props}
      >
        {isLoading ? <span className="animate-spin mr-2">⏳</span> : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
