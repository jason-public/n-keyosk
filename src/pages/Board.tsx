import React from 'react';
import { TopBar } from '../components/layout/TopBar';
import { useAdminStore } from '../store/adminStore';
import { Pin } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * 공지사항 및 교육자료 게시판 화면 (Board)
 * 
 * [반응형 최적화 특징]
 * 1. 카드 패딩 및 폰트 크기 가변화:
 *    - 모바일 스마트폰 화면에서도 글자가 넘치지 않고 쾌적하게 읽히도록 최적화
 * 2. 뱃지 및 중요 핀 표시:
 *    - 화면 폭에 맞춰 크기 비율 자동 조정
 */
export function Board() {
  const { posts } = useAdminStore();

  return (
    <div className="min-h-screen bg-black pt-16 sm:pt-20 md:pt-28 pb-10 sm:pb-16 md:pb-24 flex flex-col">
      {/* 상단바 헤더 */}
      <TopBar title="공지사항 및 교육자료" />
      
      {/* 게시글 리스트 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-5xl mx-auto w-full">
        <div className="flex flex-col gap-4 sm:gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1A1A1A] rounded-2xl sm:rounded-3xl md:rounded-[40px] p-4 sm:p-7 md:p-10 border border-white/10 shadow-md"
            >
              {/* 상단 메타 정보 (구분 뱃지, 중요 핀, 작성일자) */}
              <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6">
                <span
                  className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-base md:text-xl font-bold rounded-full ${
                    post.type === 'notice'
                      ? 'bg-[#6F3FF5] text-white'
                      : 'bg-[#B59BFF] text-black'
                  }`}
                >
                  {post.type === 'notice' ? '공지사항' : '교육자료'}
                </span>

                {post.isPinned && (
                  <span className="flex items-center gap-1 sm:gap-2 text-red-500 font-bold text-xs sm:text-base md:text-xl">
                    <Pin className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    중요
                  </span>
                )}

                <span className="text-gray-400 text-xs sm:text-base md:text-xl ml-auto">
                  {post.date}
                </span>
              </div>
              
              {/* 게시글 제목 */}
              <h2 className="text-base sm:text-2xl md:text-4xl font-bold text-white mb-2 sm:mb-4 md:mb-6 break-keep leading-snug">
                {post.title}
              </h2>

              {/* 게시글 내용 */}
              <p className="text-xs sm:text-lg md:text-2xl text-gray-300 leading-relaxed break-keep font-medium">
                {post.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
