import { useRef, useCallback } from "react";

interface UseSpeechSynthesisProps {
  onStart?: () => void;
  onEnd?: () => void;
}

const useSpeechSynthesis = ({ onStart, onEnd }: UseSpeechSynthesisProps = {}) => {
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) {
      console.error("Speech synthesis not supported");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";

    utterance.addEventListener("start", () => onStart?.());
    utterance.addEventListener("end", () => onEnd?.());

    speechSynthesisRef.current = utterance;

    setTimeout(() => {
      try {
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error("Error starting speech:", error);
      }
    }, 100);
  }, [onStart, onEnd]);

  return speak; // Retourne la fonction `speak`
};

export default useSpeechSynthesis;
