import React from 'react';
import { Product } from '../../store/adminStore';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

/**
 * ProductCard 컴포넌트의 Props(속성) 인터페이스
 * - product: 표시할 음료/디저트 상품 객체
 * - onClick: 카드 클릭/터치 시 실행되는 콜백 함수
 * - className: 추가적인 커스텀 클래스 (선택 사항)
 */
interface ProductCardProps {
  key?: React.Key;
  product: Product;
  onClick: (product: Product) => void;
  className?: string;
}

/**
 * 키오스크 메뉴 화면에서 개별 음료/상품을 보여주는 카드 컴포넌트
 * 
 * [반응형 최적화 특징]
 * 1. 스마트폰(모바일)의 2열 그리드에서도 상품명과 가격이 보기 좋게 들어맞도록 반응형 폰트 적용
 * 2. 인기/추천 뱃지와 품절 오버레이 역시 화면 크기에 맞추어 크기가 자연스럽게 스케일링
 * 3. 터치 디바이스에서 누를 때 직관적인 햅틱 느낌을 주는 스프링 축소 애니메이션 유지
 */
export function ProductCard({ product, onClick, className }: ProductCardProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={() => onClick(product)}
      className={cn(
        'relative flex flex-col items-center bg-[#1A1A1A] rounded-2xl sm:rounded-3xl p-3 sm:p-5 md:p-6 border-2 border-transparent hover:border-[#6F3FF5] transition-all shadow-lg overflow-hidden group text-center cursor-pointer select-none w-full',
        className
      )}
    >
      {/* 인기 상품 뱃지 */}
      {product.isPopular && (
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-red-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-full text-xs sm:text-sm md:text-lg font-bold z-10 shadow-md">
          인기
        </div>
      )}

      {/* 추천 상품 뱃지 */}
      {product.isRecommended && (
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-[#6F3FF5] text-white px-2 py-0.5 sm:px-3 sm:py-1 md:px-4 md:py-2 rounded-full text-xs sm:text-sm md:text-lg font-bold z-10 shadow-md">
          추천
        </div>
      )}

      {/* 품절 상품 오버레이 */}
      {product.isSoldOut && (
        <div className="absolute inset-0 bg-black/75 z-20 flex items-center justify-center backdrop-blur-xs">
          <span className="text-white text-lg sm:text-2xl md:text-4xl font-bold bg-red-600 px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl sm:rounded-2xl transform -rotate-12 shadow-xl">
            품절
          </span>
        </div>
      )}

      {/* 상품 대표 이미지 컨테이너 (정사각형 비율 유지) */}
      <div className="w-full aspect-square rounded-xl sm:rounded-2xl overflow-hidden mb-2 sm:mb-4 md:mb-6 bg-black/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>

      {/* 상품명 (어르신도 잘 보이도록 선명하고 큰 글씨, 모바일에서는 적절히 맞춤) */}
      <h3 className="text-base sm:text-xl md:text-3xl font-bold text-white mb-1.5 sm:mb-3 text-center break-keep leading-snug line-clamp-2">
        {product.name}
      </h3>

      {/* 상품 가격 */}
      <p className="text-sm sm:text-lg md:text-3xl font-bold text-[#B59BFF] mt-auto">
        {product.price.toLocaleString()}원
      </p>
    </motion.button>
  );
}
