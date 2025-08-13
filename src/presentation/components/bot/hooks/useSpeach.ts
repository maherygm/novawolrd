import { useEffect } from "react";

const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

interface UseSpeechRecognitionProps {
    onResult: (text: string) => void;
}

export const useSpeechRecognition = ({ onResult }: UseSpeechRecognitionProps) => {
    useEffect(() => {
        if (!SpeechRecognition) {
            console.warn("Votre navigateur ne supporte pas la reconnaissance vocale.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "fr-FR";

        recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim();
            console.log("Texte interprété:", transcript);
            onResult(transcript);
        };

        recognition.onerror = (event) => {
            console.error("Erreur de reconnaissance vocale:", event.error);
        };

        recognition.start();

        return () => {
            recognition.stop();
        };
    }, [onResult]);
};
