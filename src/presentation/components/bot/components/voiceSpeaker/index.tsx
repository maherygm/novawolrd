import React, { useEffect, useRef } from 'react';

interface SpeechVisualizerProps {
  text: string;
  start: boolean;
  onStart?: () => void;
  onEnd?: () => void;
}

const SpeechText: React.FC<SpeechVisualizerProps> = ({
  text,
  start,
  onStart,
  onEnd,
}) => {
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!window.speechSynthesis) {
      console.error('Speech synthesis not supported');
      return;
    }

    if (start && text) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';

      const handleStart = () => {
        onStart?.();
      };

      const handleEnd = () => {
        onEnd?.();
      };

      utterance.addEventListener('start', handleStart);
      utterance.addEventListener('end', handleEnd);

      speechSynthesisRef.current = utterance;

      setTimeout(() => {
        try {
          window.speechSynthesis.speak(utterance);
        } catch (error) {
          console.error('Error starting speech:', error);
        }
      }, 100);

      return () => {
        utterance.removeEventListener('start', handleStart);
        utterance.removeEventListener('end', handleEnd);
      };
    } else {
      window.speechSynthesis.cancel();
    }
  }, [text]);


  return (
    <></>
  );
};

export default SpeechText;
