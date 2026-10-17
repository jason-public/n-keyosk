import React from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Save, Palette } from 'lucide-react';

export function AdminSettings() {
  const { settings, updateSettings } = useAdminStore();

  const handleSave = () => {
    alert('디자인 설정이 저장되었습니다.');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">디자인 설정</h1>
          <p className="mt-2 text-sm text-gray-600">앱의 테마 색상, 폰트 크기 등을 설정합니다.</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 flex items-center gap-2"
        >
          <Save size={20} />
          저장하기
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-8 space-y-8">
        <div className="flex items-center gap-4 mb-6">
          <Palette size={24} className="text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">색상 설정</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">배경 색상</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={settings.themeColor}
                onChange={(e) => updateSettings({ themeColor: e.target.value })}
                className="h-12 w-12 rounded border border-gray-300 cursor-pointer"
              />
              <span className="text-sm text-gray-500 font-mono">{settings.themeColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">포인트 색상</label>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={settings.accentColor}
                onChange={(e) => updateSettings({ accentColor: e.target.value })}
                className="h-12 w-12 rounded border border-gray-300 cursor-pointer"
              />
              <span className="text-sm text-gray-500 font-mono">{settings.accentColor}</span>
            </div>
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-xl font-bold text-gray-900">사용자 경험 설정</h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">고대비 모드</p>
              <p className="text-sm text-gray-500">시력이 약한 어르신을 위해 글자와 배경의 대비를 높입니다.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.highContrast}
                onChange={(e) => updateSettings({ highContrast: e.target.checked })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">버튼 둥글기</p>
              <p className="text-sm text-gray-500">모든 버튼의 모서리 둥글기를 설정합니다.</p>
            </div>
            <select
              value={settings.buttonRadius}
              onChange={(e) => updateSettings({ buttonRadius: e.target.value })}
              className="rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 text-gray-900"
            >
              <option value="0.5rem">조금 둥글게</option>
              <option value="1rem">보통</option>
              <option value="2rem">많이 둥글게</option>
              <option value="9999px">완전 둥글게</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
