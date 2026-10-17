import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Coffee, Mic, FileText, Settings, LogOut, Lock, Menu as MenuIcon, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAdminStore } from '../../store/adminStore';

/**
 * 관리자 페이지 레이아웃 컴포넌트 (AdminLayout)
 * 
 * [반응형 최적화 특징]
 * 1. 모바일 햄버거 메뉴 및 상단 헤더 지원:
 *    - 스마트폰 화면에서는 상단 바와 토글 가능한 네비게이션 드로어로 전환되어 메인 콘텐츠 영역을 넓게 활용
 * 2. 데스크톱에서는 고정 좌측 사이드바 유지
 */
export function AdminLayout() {
  const location = useLocation();
  const { isAuthenticated, setAuthenticated } = useAdminStore();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 관리자 비밀번호 검증 (기본 비밀번호: 1445)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1445') {
      setAuthenticated(true);
      setError('');
    } else {
      setError('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
  };

  // 로그인하지 않은 상태일 때 표시할 로그인 폼
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-md w-full">
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">관리자 로그인</h1>
            <p className="text-sm sm:text-base text-gray-500 mt-2">비밀번호를 입력해주세요.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                className="w-full px-4 py-3 text-base rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-black"
                autoFocus
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-colors cursor-pointer"
            >
              로그인
            </button>

            <Link
              to="/"
              className="block text-center text-sm sm:text-base text-gray-500 hover:text-gray-700 mt-4"
            >
              키오스크로 돌아가기
            </Link>
          </form>
        </div>
      </div>
    );
  }

  // 관리자 메뉴 목록
  const navItems = [
    { path: '/admin', label: '대시보드', icon: LayoutDashboard },
    { path: '/admin/menu', label: '메뉴 관리', icon: Coffee },
    { path: '/admin/voice', label: '음성안내 관리', icon: Mic },
    { path: '/admin/posts', label: '게시글 관리', icon: FileText },
    { path: '/admin/settings', label: '디자인 설정', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* 모바일 상단 관리자 바 */}
      <header className="md:hidden bg-white border-b border-gray-200 h-14 px-4 flex items-center justify-between z-30">
        <h1 className="text-base font-bold text-gray-900">남양주시 키오스크 관리자</h1>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-gray-900"
          aria-label="메뉴 열기/닫기"
        >
          {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
        </button>
      </header>

      {/* 사이드바 네비게이션 (모바일에서는 토글 드로어, PC에서는 고정 사이드바) */}
      <aside
        className={cn(
          'w-full md:w-64 bg-white border-r border-gray-200 flex flex-col shrink-0 transition-all duration-200',
          mobileMenuOpen ? 'block' : 'hidden md:flex'
        )}
      >
        <div className="hidden md:flex h-16 items-center px-6 border-b border-gray-200">
          <h1 className="text-lg font-bold text-gray-900">남양주시 키오스크 관리자</h1>
        </div>
        
        <nav className="flex-1 py-3 md:py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-purple-50 text-purple-700 border-l-4 md:border-l-0 md:border-r-4 border-purple-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
          >
            <Lock size={18} />
            로그아웃
          </button>
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            <LogOut size={18} />
            키오스크로 돌아가기
          </Link>
        </div>
      </aside>

      {/* 관리자 메인 본문 영역 */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
