import { Canvas } from "@react-three/fiber";
import Blob from "./components/blob";
import { useState, useEffect } from "react";
import { MicIcon } from "lucide-react";

const link = import.meta.env.VITE_DETECT_TTS_LINK;

export default function BlobContains() {
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isListening, setIsListening] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>("");

    // Initialize SpeechRecognition
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    useEffect(() => {
        console.log("audioUrl", link);
        if (recognition) {
            recognition.lang = "fr-FR";
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                const speechResult = event.results[0][0].transcript;
                console.log("Texte transcrit:", speechResult);
                setTranscript(speechResult);
                setIsListening(false);
                sendToTTS(speechResult);
            };

            recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
                console.error("Erreur de reconnaissance vocale:", event.error);
                setIsListening(false);
            };

            recognition.onend = () => {
                console.log("Reconnaissance vocale arrêtée.");
                setIsListening(false);
            };
        }
    }, [recognition]);

    const sendToTTS = async (text: string) => {
        try {
            const response = await fetch(link + "speak", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error(`Erreur API: ${response.status}`);
            }

            const audioBlob = await response.blob();
            const newAudioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl((prev) => {
                if (prev) URL.revokeObjectURL(prev);
                return newAudioUrl;
            });
            console.log("Audio généré:", newAudioUrl);
        } catch (error) {
            console.error("Erreur lors de l'appel à l'API TTS:", error);
        }
    };

    const handleListen = () => {
        if (recognition) {
            if (isListening) {
                recognition.stop();
                setIsListening(false);
            } else {
                try {
                    recognition.start();
                    setIsListening(true);
                    console.log("Écoute démarrée.");
                } catch (error) {
                    console.error("Erreur démarrage reconnaissance:", error);
                    setIsListening(false);
                }
            }
        } else {
            console.error("SpeechRecognition non supporté.");
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setAudioUrl((prev) => {
                if (prev) URL.revokeObjectURL(prev);
                return url;
            });
            console.log("Fichier audio sélectionné:", url);
        }
    };

    useEffect(() => {
        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [audioUrl]);

    return (
        <div className="containe bg-backglass-background">
            <div className="my-24 flex items-center w-screen h-screen  flex-col gap-4">
                <h1>Discussion avec NOVA-AI</h1>

                <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileChange}
                    className="file-input hidden"
                />
                <Canvas
                    camera={{ position: [0.0, 0.0, 8.0] }}
                    style={{ width: "100vw", height: "70vh" }}
                >
                    <Blob audioUrl={audioUrl ?? undefined} />{" "}
                    {/* Convert null to undefined */}
                </Canvas>

                <button
                    onClick={handleListen}
                    className={`px-4 flex gap-2 py-2 rounded-full ${
                        isListening ? "bg-red-500" : "bg-blue-500"
                    } text-white`}
                >
                    <MicIcon />
                    {isListening ? "Arrêter l'écoute" : "Parler"}
                </button>
                {/* {transcript && (
    <p className="text-gray-700">Texte transcrit: {transcript}</p>
  )} */}
            </div>
        </div>
    );
}
