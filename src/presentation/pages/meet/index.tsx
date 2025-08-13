import { Button } from "@heroui/button";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface VideoCallProps {
    roomName: string;
    displayName: string;
    onClose?: () => void;
}

interface Room {
    id: string;
    name: string;
    participants: number;
    description: string;
    isActive: boolean;
}

const SignLanguageAvatar: React.FC<{ text: string }> = ({ text }) => {
    const [currentSign, setCurrentSign] = useState<string>("");
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const animationRef = useRef<HTMLDivElement>(null);

    // Dictionnaire simplifié de traduction texte -> signes
    const signDictionary: Record<string, string> = {
        bonjour: "👋",
        salut: "👋",
        hello: "👋",
        merci: "🙏",
        aide: "✋",
        "s'il vous plaît": "✊",
        oui: "👍",
        non: "👎",
        je: "👉",
        tu: "👉",
        vous: "👉",
        manger: "🤲",
        boire: "🤲",
        eau: "🤲",
        toilette: "🤲",
        bien: "👌",
        mal: "👎",
        "d'accord": "👌",
        "au revoir": "👋",
        "comment ça va": "👋",
        heureux: "😊",
        triste: "😞",
        fatigué: "😴",
        malade: "🤒",
        docteur: "🏥",
        hôpital: "🏥",
        urgence: "🚨",
        "aide-moi": "🆘",
    };

    useEffect(() => {
        if (!text) {
            setCurrentSign("");
            return;
        }

        const words = text.toLowerCase().split(/\s+/);
        let index = 0;

        const animateNextWord = () => {
            if (index < words.length) {
                const word = words[index];
                setCurrentSign(word);
                setIsAnimating(true);

                // Trouver le signe correspondant ou utiliser un signe par défaut
                const sign = signDictionary[word] || "👐";

                // Animation
                if (animationRef.current) {
                    animationRef.current.innerHTML = sign;
                    animationRef.current.style.transform =
                        "translateY(-10px) scale(1.2)";
                    setTimeout(() => {
                        if (animationRef.current) {
                            animationRef.current.style.transform =
                                "translateY(0) scale(1)";
                        }
                    }, 300);
                }

                index++;
                setTimeout(() => setIsAnimating(false), 500);
                setTimeout(animateNextWord, 800);
            }
        };

        animateNextWord();
    }, [text]);

    return (
        <div className="fixed bottom-20 right-4 z-50 bg-white p-4 rounded-lg shadow-xl border-2 border-blue-500 w-64">
            <div className="flex items-center mb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-2xl">👐</span>
                </div>
                <div>
                    <h3 className="font-bold text-blue-600">Traduction LSF</h3>
                    <p className="text-xs text-gray-500">
                        Langue des Signes Française
                    </p>
                </div>
            </div>
            <div
                ref={animationRef}
                className={`text-center py-4 px-6 bg-blue-50 rounded-md transition-all duration-300 text-6xl ${
                    isAnimating ? "animate-pulse" : ""
                }`}
            >
                {signDictionary[currentSign] || "👐"}
            </div>
            <div className="mt-2 text-sm text-gray-700 text-center min-h-8">
                {currentSign || "En attente de parole..."}
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">
                Traduction en temps réel activée
            </div>
        </div>
    );
};

const VideoCall: React.FC<VideoCallProps> = ({
    roomName,
    displayName,
    onClose,
}) => {
    const jitsiContainerRef = useRef<HTMLDivElement>(null);
    const [jitsiApi, setJitsiApi] = useState<any>(null);
    const [transcribedText, setTranscribedText] = useState<string>("");
    const [isListening, setIsListening] = useState<boolean>(false);
    const [translationEnabled, setTranslationEnabled] =
        useState<boolean>(false);
    const recognitionRef = useRef<any>(null);

    const initSpeechRecognition = () => {
        if ("webkitSpeechRecognition" in window) {
            const recognition = new (window as any).webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = "fr-FR";

            recognition.onresult = (event: any) => {
                let interimTranscript = "";
                let finalTranscript = "";

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript + " ";
                    } else {
                        interimTranscript += transcript;
                    }
                }

                if (finalTranscript) {
                    setTranscribedText((prev) => prev + " " + finalTranscript);
                } else if (interimTranscript) {
                    setTranscribedText(interimTranscript);
                }
            };

            recognition.onerror = (event: any) => {
                console.error("Erreur de reconnaissance vocale:", event.error);
                setIsListening(false);
            };

            recognitionRef.current = recognition;
        } else {
            console.warn(
                "La reconnaissance vocale n'est pas supportée par ce navigateur"
            );
        }
    };

    const toggleListening = () => {
        if (!recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
            setTranscribedText(""); // Réinitialiser le texte
        }
    };

    const toggleTranslation = () => {
        setTranslationEnabled(!translationEnabled);
        if (!translationEnabled) {
            setTranscribedText("");
        }
    };

    useEffect(() => {
        initSpeechRecognition();
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    useEffect(() => {
        const loadJitsiScript = () => {
            return new Promise<void>((resolve) => {
                if (window.JitsiMeetExternalAPI) {
                    return resolve();
                }

                const script = document.createElement("script");
                script.src = "https://meet.jit.si/external_api.js";
                script.async = true;
                script.onload = () => resolve();
                document.body.appendChild(script);
            });
        };

        const initJitsi = async () => {
            await loadJitsiScript();

            if (jitsiContainerRef.current && window.JitsiMeetExternalAPI) {
                const domain = "meet.jit.si";
                const options = {
                    roomName: roomName,
                    parentNode: jitsiContainerRef.current,
                    userInfo: {
                        displayName: displayName,
                    },
                    configOverwrite: {
                        prejoinPageEnabled: false,
                        disableSimulcast: true,
                        startWithAudioMuted: false,
                        startWithVideoMuted: false,
                        disableWatermark: true,
                        constraints: {
                            video: {
                                height: {
                                    ideal: 720,
                                    max: 720,
                                    min: 240,
                                },
                            },
                        },
                        disableSelfView: true,
                        filmstrip: {
                            disableSelfView: true,
                        },
                        tileView: {
                            numberOfVisibleTiles: 15,
                        },
                    },
                    interfaceConfigOverwrite: {
                        SHOW_JITSI_WATERMARK: false,
                        SHOW_WATERMARK_FOR_GUESTS: false,
                        SHOW_BRAND_WATERMARK: false,
                        SHOW_POWERED_BY: false,
                        TOOLBAR_BUTTONS: [
                            "microphone",
                            "camera",
                            "closedcaptions",
                            "desktop",
                            "fullscreen",
                            "hangup",
                            "profile",
                            "chat",
                            "settings",
                            "raisehand",
                            "videoquality",
                            "filmstrip",
                            "invite",
                            "feedback",
                            "stats",
                            "tileview",
                            "videobackgroundblur",
                            "help",
                            "mute-everyone",
                        ],
                    },
                };

                try {
                    const api = new window.JitsiMeetExternalAPI(
                        domain,
                        options
                    );

                    api.executeCommand("setTileView", true);

                    api.addEventListeners({
                        readyToClose: () => {
                            if (onClose) onClose();
                        },
                        videoConferenceJoined: () => {
                            api.executeCommand("toggleSelfView", false);
                        },
                    });

                    setJitsiApi(api);
                } catch (error) {
                    console.error(
                        "Erreur lors de l'initialisation de Jitsi:",
                        error
                    );
                }
            }
        };

        initJitsi();

        return () => {
            if (jitsiApi) {
                jitsiApi.dispose();
            }
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [roomName, displayName, onClose]);

    return (
        <div className="fixed inset-0 bg-black">
            <style>
                {`
          .watermark, .leftwatermark, .rightwatermark, .jitsi-watermark,
          div[class*="watermark"], div[class*="Watermark"], .corner-watermark {
            display: none !important;
          }
          .filmstrip__videos .videocontainer[data-local="true"],
          .self-view-container, .self-view {
            display: none !important;
          }
        `}
            </style>

            <div ref={jitsiContainerRef} className="w-full h-full"></div>

            {/* Contrôles de traduction */}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
                <button
                    onClick={toggleTranslation}
                    className={`p-4 rounded-full shadow-lg text-white ${
                        translationEnabled
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-500 hover:bg-gray-600"
                    }`}
                    title="Activer/désactiver la traduction"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                        />
                    </svg>
                </button>

                {translationEnabled && (
                    <button
                        onClick={toggleListening}
                        className={`p-4 rounded-full shadow-lg text-white ${
                            isListening
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        title={
                            isListening
                                ? "Arrêter la traduction"
                                : "Démarrer la traduction"
                        }
                    >
                        {isListening ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                                />
                            </svg>
                        )}
                    </button>
                )}
            </div>

            {/* Afficher l'avatar de traduction seulement quand activé */}
            {translationEnabled && (transcribedText || isListening) && (
                <SignLanguageAvatar text={transcribedText} />
            )}
        </div>
    );
};

const ConnectivityIndicator: React.FC<{ isActive: boolean }> = ({
    isActive,
}) => {
    const [isBlinking, setIsBlinking] = useState(true);

    useEffect(() => {
        if (isActive) {
            const interval = setInterval(() => {
                setIsBlinking((prev) => !prev);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isActive]);

    if (!isActive) {
        return (
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
        );
    }

    return (
        <span
            className={`inline-block w-3 h-3 rounded-full mr-2 ${
                isBlinking ? "bg-green-500" : "bg-green-300"
            } transition-colors duration-300`}
        ></span>
    );
};

const JoinModal: React.FC<{
    show: boolean;
    onClose: () => void;
    onJoin: (displayName: string) => void;
    selectedRoom: Room | null;
}> = ({ show, onClose, onJoin, selectedRoom }) => {
    const [displayName, setDisplayName] = useState<string>("");

    if (!show || !selectedRoom) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-2xl transform transition-all">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                    <ConnectivityIndicator isActive={selectedRoom.isActive} />
                    Rejoindre {selectedRoom.name}
                </h2>

                <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 text-sm mb-3">
                        {selectedRoom.description}
                    </p>
                    <p className="text-gray-700 flex items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <span>
                            {selectedRoom.participants} participants actifs
                        </span>
                    </p>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Votre nom
                    </label>
                    <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Entrez votre nom"
                        autoFocus
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={() => onJoin(displayName)}
                        className={`px-5 py-2 rounded-2xl font-medium transition-colors ${
                            !selectedRoom.isActive
                                ? "bg-red-500 text-white cursor-not-allowed opacity-70"
                                : !displayName.trim()
                                ? "bg-blue-400 text-white cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        disabled={!displayName.trim() || !selectedRoom.isActive}
                    >
                        {selectedRoom.isActive ? "Rejoindre" : "Salle inactive"}
                    </button>
                </div>

                {!selectedRoom.isActive && (
                    <p className="mt-4 text-red-500 text-sm">
                        Cette salle n'est plus active. Veuillez choisir une
                        autre salle.
                    </p>
                )}
            </div>
        </div>
    );
};

const RoomCard: React.FC<{
    room: Room;
    onSelect: (room: Room) => void;
}> = ({ room, onSelect }) => {
    return (
        <div
            className={`border rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
                room.isActive ? "bg-white" : "bg-gray-100"
            }`}
        >
            <div className="p-5">
                <div className="flex items-center mb-2">
                    <ConnectivityIndicator isActive={room.isActive} />
                    <h3 className="font-bold text-lg text-gray-800">
                        {room.name}
                    </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4 h-12 overflow-hidden">
                    {room.description}
                </p>
                <div className="flex justify-between items-center">
                    <span className="flex items-center text-sm text-gray-500">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                        </svg>
                        {room.participants}
                    </span>
                    <button
                        onClick={() => onSelect(room)}
                        className={`px-4 py-2 text-white rounded-lg hover:shadow-md transition-all ${
                            room.isActive
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-red-500 hover:bg-red-600"
                        }`}
                    >
                        {room.isActive ? "Rejoindre" : "Inactif"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const JitsiVideoCallApp: React.FC = () => {
    const [isCallActive, setIsCallActive] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [displayName, setDisplayName] = useState<string>("");

    const availableRooms: Room[] = [
        {
            id: "room1",
            name: "Réunion Marketing",
            participants: 5,
            description: "Discussion sur la campagne de fin d'année",
            isActive: true,
        },
        {
            id: "room2",
            name: "Formation Technique",
            participants: 12,
            description:
                "Session d'apprentissage sur les nouvelles fonctionnalités",
            isActive: true,
        },
        {
            id: "room3",
            name: "Équipe Projet Alpha",
            participants: 3,
            description: "Point d'avancement hebdomadaire",
            isActive: false,
        },
        {
            id: "room4",
            name: "Discussion Produit",
            participants: 8,
            description: "Brainstorming sur les nouvelles fonctionnalités",
            isActive: true,
        },
        {
            id: "room5",
            name: "Support Client",
            participants: 2,
            description: "Assistance en direct pour les clients",
            isActive: true,
        },
        {
            id: "room6",
            name: "Café Virtuel",
            participants: 7,
            description: "Espace de détente et d'échanges informels",
            isActive: true,
        },
        {
            id: "room7",
            name: "Présentation Investisseurs",
            participants: 0,
            description: "Prévu pour le 15/04 à 14h00",
            isActive: false,
        },
        {
            id: "room8",
            name: "Réunion Mensuelle",
            participants: 22,
            description: "Bilan mensuel et objectifs à venir",
            isActive: true,
        },
    ];

    const handleRoomSelect = (room: Room) => {
        setSelectedRoom(room);
        setShowModal(true);
    };

    const handleJoinRoom = (name: string) => {
        if (name.trim() && selectedRoom && selectedRoom.isActive) {
            setDisplayName(name);
            setShowModal(false);
            setIsCallActive(true);
        }
    };

    const endCall = () => {
        setIsCallActive(false);
        setSelectedRoom(null);
    };

    return (
        <div className="min-h-screen flex bg-abstract-background flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
            {!isCallActive ? (
                <div className="flex flex-col bg-backglass-background items-center justify-start flex-grow p-6">
                    <div className="w-full max-w-6xl">
                        <div className="text-center mb-10">
                            <Link to="/" className="w-full flex justify-end">
                                <Button
                                    color="secondary"
                                    onClick={() => window.history.back()}
                                >
                                    ← Retour
                                </Button>
                            </Link>
                            <h1 className="text-3xl font-syne font-bold mb-3 text-gray-800">
                                Salles de vidéoconférence
                            </h1>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Sélectionnez une salle pour rejoindre une
                                conférence. Les indicateurs verts montrent les
                                salles actives, les rouges sont inactives.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {availableRooms.map((room) => (
                                <RoomCard
                                    key={room.id}
                                    room={room}
                                    onSelect={handleRoomSelect}
                                />
                            ))}
                        </div>

                        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                                Informations
                            </h2>
                            <div className="flex items-start space-x-4">
                                <div className="flex items-center">
                                    <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                                    <span className="text-gray-700">
                                        Salle active
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                                    <span className="text-gray-700">
                                        Salle inactive
                                    </span>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600 text-sm">
                                Chaque participant ne verra que les autres
                                utilisateurs, sans visionner son propre écran.
                                La traduction en langue des signes est
                                disponible pendant les appels.
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <VideoCall
                    roomName={selectedRoom?.id || ""}
                    displayName={displayName}
                    onClose={endCall}
                />
            )}

            <JoinModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onJoin={handleJoinRoom}
                selectedRoom={selectedRoom}
            />
        </div>
    );
};

declare global {
    interface Window {
        JitsiMeetExternalAPI: any;
        webkitSpeechRecognition: any;
    }
}

export default JitsiVideoCallApp;
