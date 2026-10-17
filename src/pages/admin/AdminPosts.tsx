import React from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Plus, Edit2, Trash2, Pin } from 'lucide-react';

export function AdminPosts() {
  const { posts } = useAdminStore();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">게시글 관리</h1>
          <p className="mt-2 text-sm text-gray-600">공지사항과 교육 자료를 관리합니다.</p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 flex items-center gap-2">
          <Plus size={20} />
          새 글 작성
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">유형</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작성일</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">편집</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    post.type === 'notice' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {post.type === 'notice' ? '공지사항' : '교육자료'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {post.isPinned && <Pin size={16} className="text-red-500" />}
                    <div className="text-sm font-medium text-gray-900">{post.title}</div>
                  </div>
                  <div className="text-sm text-gray-500 truncate max-w-md">{post.content}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {post.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-indigo-600 hover:text-indigo-900"><Edit2 size={18} /></button>
                    <button className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
