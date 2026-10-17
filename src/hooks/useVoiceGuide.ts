import { useEffect, useState, useCallback } from 'react';
import { useAdminStore } from '../store/adminStore';
import { useUserStore } from '../store/userStore';

export function useVoiceGuide(stepId: string) {
  const { voiceScripts } = useAdminStore();
  const { isVoiceEnabled } = useUserStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');

  const script = voiceScripts.find((s) => s.stepId === stepId)?.text || '';

  useEffect(() => {
    setText(script);
  }, [script]);

  const play = useCallback((rate = 1.0) => {
    if (!isVoiceEnabled || !script) return;
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.lang = 'ko-KR';
    utterance.rate = rate; // 1.0 is normal, 0.8 is slow
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
  }, [script, isVoiceEnabled]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  }, []);

  // Auto-play on step change if enabled
  useEffect(() => {
    if (isVoiceEnabled && script) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        play();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [stepId, isVoiceEnabled, script, play]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  return { play, stop, isPlaying, text };
}
