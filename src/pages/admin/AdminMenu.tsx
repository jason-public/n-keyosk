import React, { useState } from 'react';
import { useAdminStore, Product } from '../../store/adminStore';
import { Plus, Edit2, Trash2, Image as ImageIcon, Check, X } from 'lucide-react';

export function AdminMenu() {
  const { categories, products, updateProduct, addCategory } = useAdminStore();
  const [activeTab, setActiveTab] = useState(categories[0]?.id);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const filteredProducts = products.filter(p => p.categoryId === activeTab);

  const handleToggleSoldOut = (product: Product) => {
    updateProduct(product.id, { isSoldOut: !product.isSoldOut });
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim());
      setNewCategoryName('');
      setIsAddingCategory(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">메뉴 관리</h1>
          <p className="mt-2 text-sm text-gray-600">키오스크에 표시될 메뉴를 관리합니다.</p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 flex items-center gap-2">
          <Plus size={20} />
          새 메뉴 추가
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`
                whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === category.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {category.name}
            </button>
          ))}
          
          {isAddingCategory ? (
            <div className="flex items-center pb-4 px-1">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="카테고리명"
                className="border border-gray-300 rounded-md px-2 py-1 text-sm w-24 focus:outline-none focus:ring-1 focus:ring-purple-500"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddCategory();
                  if (e.key === 'Escape') {
                    setIsAddingCategory(false);
                    setNewCategoryName('');
                  }
                }}
              />
              <button onClick={handleAddCategory} className="ml-1 text-green-600 hover:text-green-700">
                <Check size={16} />
              </button>
              <button onClick={() => { setIsAddingCategory(false); setNewCategoryName(''); }} className="ml-1 text-red-600 hover:text-red-700">
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingCategory(true)}
              className="whitespace-nowrap pb-4 px-1 border-b-2 border-transparent font-medium text-sm text-gray-400 hover:text-purple-600 flex items-center gap-1"
            >
              <Plus size={16} />
              카테고리 추가
            </button>
          )}
        </nav>
      </div>

      {/* Product List */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이미지</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">메뉴명</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">가격</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">편집</span></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="h-12 w-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    {product.image ? (
                      <img src={product.image} alt="" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.price.toLocaleString()}원
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleSoldOut(product)}
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.isSoldOut ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {product.isSoldOut ? '품절' : '판매중'}
                  </button>
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
