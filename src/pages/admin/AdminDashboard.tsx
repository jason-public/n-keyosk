import React from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Users, CheckCircle, Coffee, AlertCircle } from 'lucide-react';

export function AdminDashboard() {
  const { products, posts } = useAdminStore();

  const stats = [
    { label: '오늘 연습 횟수', value: '124', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: '완료율', value: '85%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
    { label: '가장 많이 연습한 메뉴', value: '아메리카노', icon: Coffee, color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: '가장 어려워한 단계', value: '결제 방식 선택', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
        <p className="mt-2 text-sm text-gray-600">어르신 키오스크 연습센터의 현황을 확인하세요.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg}`}>
                <Icon size={24} className={stat.color} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Posts */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">최근 공지사항</h2>
            <a href="/admin/posts" className="text-sm text-purple-600 hover:text-purple-700 font-medium">전체보기</a>
          </div>
          <ul className="divide-y divide-gray-200">
            {posts.slice(0, 4).map((post) => (
              <li key={post.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
                  <span className="text-xs text-gray-500 ml-4">{post.date}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Products */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">인기 연습 메뉴</h2>
            <a href="/admin/menu" className="text-sm text-purple-600 hover:text-purple-700 font-medium">메뉴 관리</a>
          </div>
          <ul className="divide-y divide-gray-200">
            {products.filter(p => p.isPopular).slice(0, 4).map((product) => (
              <li key={product.id} className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" referrerPolicy="no-referrer" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{product.name}</p>
                  <p className="text-xs text-gray-500">{product.price.toLocaleString()}원</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
