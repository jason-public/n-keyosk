import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Save, Mic, Play } from 'lucide-react';

export function AdminVoice() {
  const { voiceScripts, updateSettings, settings } = useAdminStore();
  const [scripts, setScripts] = useState(voiceScripts);

  const handleSave = () => {
    // In a real app, this would save to the backend
    alert('음성 안내 스크립트가 저장되었습니다.');
  };

  const handleTestPlay = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">음성안내 관리</h1>
          <p className="mt-2 text-sm text-gray-600">각 단계별 음성 안내 스크립트를 수정할 수 있습니다.</p>
        </div>
        <button
          onClick={handleSave}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 flex items-center gap-2"
        >
          <Save size={20} />
          저장하기
        </button>
      </div>

      {/* Settings */}
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">기본 설정</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">음성 안내 기본 켜기</p>
            <p className="text-sm text-gray-500">앱 시작 시 음성 안내를 기본으로 켤지 설정합니다.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={settings.voiceGuidanceDefault}
              onChange={(e) => updateSettings({ voiceGuidanceDefault: e.target.checked })}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
          </label>
        </div>
      </div>

      {/* Scripts */}
      <div className="space-y-6">
        {scripts.map((script, index) => (
          <div key={script.stepId} className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Mic size={20} className="text-purple-600" />
                {script.stepId === 'home' ? '시작 화면' :
                 script.stepId === 'mode' ? '모드 선택' :
                 script.stepId === 'category' ? '메뉴 선택' :
                 script.stepId === 'product' ? '옵션 선택' :
                 script.stepId === 'cart' ? '장바구니' :
                 script.stepId === 'payment' ? '결제 수단' :
                 script.stepId === 'confirm' ? '최종 확인' : '완료 화면'}
              </h3>
              <button
                onClick={() => handleTestPlay(script.text)}
                className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
              >
                <Play size={16} />
                미리듣기
              </button>
            </div>
            <textarea
              value={script.text}
              onChange={(e) => {
                const newScripts = [...scripts];
                newScripts[index].text = e.target.value;
                setScripts(newScripts);
              }}
              rows={3}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-4 text-gray-900"
              placeholder="음성 안내 스크립트를 입력하세요."
            />
          </div>
        ))}
      </div>
    </div>
  );
}
