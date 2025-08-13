import { useEffect } from "react";

const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Votre navigateur ne supporte pas la reconnaissance vocale.");
}

const VoiceInterpreter: React.FC = () => {
  useEffect(() => {
    if (!SpeechRecognition) return;
    
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "fr-FR";

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      console.log("Texte interprété:", transcript);
    };

    recognition.onerror = (event) => {
      console.error("Erreur de reconnaissance vocale:", event.error);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, []);

  return <div>🎤 Écoute en cours...</div>;
};

export default VoiceInterpreter;
