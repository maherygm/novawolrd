import { useState, useRef, useEffect } from "react";
import {
    Pencil,
    Lightbulb,
    Compass,
    Code,
    Moon,
    Sun,
    Send,
    Bot,
    RotateCcw,
    SquareMenu,
    User,
    Eye,
    CircleArrowLeft,
} from "lucide-react";
import { Button } from "@heroui/button";
import { ScrollShadow } from "@heroui/react";
import LangSelection from "@/presentation/components/LangSelection";
import { Link } from "react-router-dom";
import NotFoundAnimation from "./sub-Assets/notFound.json";
import Lottie from "lottie-react";

interface Message {
    type: "outgoing" | "incoming";
    content: string;
    loading?: boolean;
    error?: boolean;
}

interface ChatHistory {
    id: string;
    title: string;
    messages: Message[];
    timestamp: Date;
}

interface ArtifactView {
    type: string;
    content: any;
    visible: boolean;
}

const predefinedResponses: Record<string, string> = {
    hi: "Hello! How may I assist you?",
    hello: "Hello! How may I assist you?",
    // ... other predefined responses
};

const AssistanceIA = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [userInput, setUserInput] = useState("");
    const [isLightMode, setIsLightMode] = useState(() => {
        const theme = localStorage.getItem("themeColor");
        return theme === "light_mode";
    });
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [isResponseGenerating, setIsResponseGenerating] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const [artifactView, setArtifactView] = useState<ArtifactView>({
        type: "",
        content: null,
        visible: false,
    });

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const suggestions = [
        {
            text: "Help me plan a game night with my 5 best friends for under $100.",
            icon: <Pencil className="w-6 h-6" />,
        },
        {
            text: "What are the best tips to improve my public speaking skills?",
            icon: <Lightbulb className="w-6 h-6" />,
        },
        {
            text: "Can you help me find the latest news on web development?",
            icon: <Compass className="w-6 h-6" />,
        },
        {
            text: "Write JavaScript code to sum all elements in an array.",
            icon: <Code className="w-6 h-6" />,
        },
    ];

    const handleSendMessage = async (text: string) => {
        if (!text.trim() || isResponseGenerating) return;
        setIsResponseGenerating(true);
        setIsHeaderVisible(false);
        setArtifactView({ type: "", content: null, visible: false });

        const newOutgoingMessage: Message = { type: "outgoing", content: text };
        const newIncomingMessage: Message = {
            type: "incoming",
            content: "",
            loading: true,
        };

        setMessages((prev) => [
            ...prev,
            newOutgoingMessage,
            newIncomingMessage,
        ]);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const response =
                predefinedResponses[text.toLowerCase()] ||
                "I'm sorry, I don't have an answer for that yet.";

            // Check if response contains code or other artifacts
            if (text.toLowerCase().includes("code")) {
                setArtifactView({
                    type: "code",
                    content: response,
                    visible: true,
                });
            }

            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    type: "incoming",
                    content: response,
                    loading: false,
                };
                return updated;
            });

            if (messages.length === 0) {
                const newChat: ChatHistory = {
                    id: Date.now().toString(),
                    title: text.slice(0, 30) + "...",
                    messages: [
                        ...messages,
                        newOutgoingMessage,
                        { type: "incoming", content: response },
                    ],
                    timestamp: new Date(),
                };
                setChatHistory((prev) => [newChat, ...prev]);
            }
        } catch (error) {
            setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                    type: "incoming",
                    content: "",
                    loading: false,
                    error: true,
                };
                return updated;
            });
        } finally {
            setIsResponseGenerating(false);
        }
    };

    const handleThemeToggle = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("abm-mytick-theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("abm-mytick-theme", "light");
            }
            return newMode;
        });
    };

    const handleReset = () => {
        setMessages([]);
        setIsHeaderVisible(true);
        setArtifactView({ type: "", content: null, visible: false });
    };

    const loadChatHistory = (chat: ChatHistory) => {
        setMessages(chat.messages);
        setIsHeaderVisible(false);
        setIsSidebarOpen(false);
    };

    return (
        <div className="transition bg-abstract-background dark:bg-gray-900">
            <div className="h-[100vh] bg-backglass3-background bg-cover card flex">
                <div
                    className={`left-0 h-[95vh] rounded-2xl m-4 dark:bg-gray-800 shadow-lg transition-all duration-300 z-10 ${
                        isSidebarOpen
                            ? "w-66 ring right-2 ring-offset-2 ring-violet-200 bg-white bg-opacity-55 backdrop-blur-sm"
                            : "w-0"
                    }`}
                >
                    {/* Sidebar content remains the same */}
                    <div className="">
                        <h2
                            className={`text-lg  px-4 py-2 border-b-1 pb-2 font-bold mb-4 ${
                                isSidebarOpen ? "w-64" : "hidden"
                            }`}
                        >
                            Chat History
                        </h2>
                        <div
                            className={`space-y-2 p-4 ${
                                isSidebarOpen ? "w-64" : "hidden"
                            }`}
                        >
                            {chatHistory.length > 0 ? (
                                chatHistory.map((chat) => (
                                    <div
                                        key={chat.id}
                                        onClick={() => loadChatHistory(chat)}
                                        className="p-2 transition hover:text-white cursor-pointer hover:bg-violet-600 dark:hover:bg-violet-700 rounded-xl"
                                    >
                                        <p className="text-sm font-medium">
                                            {chat.title}
                                        </p>
                                        <p className="text-xs transition text-slate-400">
                                            {chat.timestamp.toLocaleDateString()}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center p-4">
                                    <Lottie
                                        animationData={NotFoundAnimation}
                                        loop={true}
                                        style={{
                                            width: "200px",
                                            height: "200px",
                                            marginBottom: "50px",
                                        }}
                                    />
                                    <p className="text-sm text-gray-500 text-center">
                                        No chat history yet. Start a new
                                        conversation!
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="w-full">
                        <div className="w-[80%] mx-auto flex p-2 justify-between items-center">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() =>
                                        setIsSidebarOpen(!isSidebarOpen)
                                    }
                                    className="p-2 bg-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                                >
                                    <SquareMenu className="w-6 h-6" />
                                </button>
                                <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                                    Sentinel.IA
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <LangSelection />

                                <Button
                                    color="secondary"
                                    onClick={handleReset}
                                    className="flex items-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    New Chat
                                </Button>

                                <Link to="/">
                                    <Button
                                        variant="flat"
                                        isIconOnly
                                        onClick={() =>
                                            handleSendMessage(userInput)
                                        }
                                        color="secondary"
                                    >
                                        <CircleArrowLeft className="w-4 h-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {isHeaderVisible && (
                        <header className="p-8 flex h-[70%] justify-center flex-col items-start w-[70%] max-w-[1400px] mx-auto text-center">
                            <h1 className="text-4xl px-2 font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                                Akory aby eh...
                            </h1>
                            <p className="text-2xl px-2 text-gray-600 dark:text-gray-300 mt-2">
                                How can I help you today?
                            </p>
                            <ul className="flex gap-5 p-2 mt-10 overflow-x-auto scrollbar-hide snap-x">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        className={`flex-shrink-0 bg-problem${
                                            index + 1
                                        } bg-cover ring-2 ring-offset-2 ring- w-56 p-5 bg-white dark:bg-gray-800 hover:text-white rounded-xl hover:bg-violet-600 cursor-pointer dark:hover:bg-gray-700 transition`}
                                        onClick={() =>
                                            handleSendMessage(suggestion.text)
                                        }
                                    >
                                        <p className="text-left text-[14px] dark:text-gray-200">
                                            {suggestion.text}
                                        </p>
                                        <div className="flex justify-end">
                                            <div className="mt-6 p-2 text-violet-700 bg-gray-200 dark:bg-gray-700 rounded-full w-fit">
                                                {suggestion.icon}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </header>
                    )}

                    {artifactView.visible && (
                        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl z-50">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">
                                    {artifactView.type === "code"
                                        ? "Code Result"
                                        : "Result View"}
                                </h3>
                                <button
                                    onClick={() =>
                                        setArtifactView({
                                            ...artifactView,
                                            visible: false,
                                        })
                                    }
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                                >
                                    <Eye className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                                <pre className="whitespace-pre-wrap">
                                    {artifactView.content}
                                </pre>
                            </div>
                        </div>
                    )}

                    <ScrollShadow
                        ref={chatContainerRef}
                        className={`p-8 space-y-6 w-[70%] ${
                            !isHeaderVisible && "h-[70%]"
                        } max-w-[1400px] mx-auto overflow-y-auto`}
                    >
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex gap-4 ${
                                    message.type === "outgoing"
                                        ? "justify-end"
                                        : ""
                                }`}
                            >
                                {message.type === "incoming" && (
                                    <User
                                        className={`w-10 h-10 p-2 rounded-full bg-white dark:bg-gray-800 ${
                                            message.loading
                                                ? "animate-spin"
                                                : ""
                                        }`}
                                    />
                                )}
                                <div
                                    className={`max-w-[80%] p-2 rounded-xl ${
                                        message.type === "outgoing"
                                            ? "bg-violet-600 shadow-lg text-white"
                                            : message.error
                                            ? "bg-red-100 dark:bg-red-900"
                                            : "bg-white shadow-lg dark:bg-gray-800"
                                    }`}
                                >
                                    {message.loading ? (
                                        <div className="space-y-2">
                                            <div className="h-2 w-[300px] bg-indigo-200 dark:bg-gray-700 rounded animate-pulse" />
                                            <div className="h-2 w-[500px] bg-indigo-200 dark:bg-gray-700 rounded animate-pulse" />
                                            <div className="h-2 w-[400px] bg-indigo-200 dark:bg-gray-700 rounded animate-pulse" />
                                            <div className="h-2 w-[300px] bg-indigo-200 dark:bg-gray-700 rounded animate-pulse" />
                                        </div>
                                    ) : message.error ? (
                                        <p className="text-red-600 whitespace-pre-wrap dark:text-red-400">
                                            An error occurred. Please try again.
                                        </p>
                                    ) : (
                                        <p className="whitespace-pre-wrap text-wrap break-words">
                                            {message.content}
                                        </p>
                                    )}
                                </div>
                                {message.type === "outgoing" && (
                                    <Bot className="w-10 h-10 p-2 rounded-full text-white bg-violet-500 dark:bg-gray-800" />
                                )}
                            </div>
                        ))}
                    </ScrollShadow>

                    <div className="left-0 fixed bottom-0 w-full  p-4">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSendMessage(userInput);
                                setUserInput("");
                            }}
                            className="max-w-4xl mx-auto flex gap-4"
                        >
                            <input
                                type="text"
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                placeholder="Enter a prompt here"
                                className="flex-1 p-4 rounded-full bg-gray-100 bg-opacity-20 backdrop-blur-sm dark:bg-gray-700 focus:outline-none"
                                disabled={isResponseGenerating}
                                required
                            />
                            <button
                                type="button"
                                onClick={handleThemeToggle}
                                className="p-4 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                {isLightMode ? (
                                    <Moon className="w-6 h-6" />
                                ) : (
                                    <Sun className="w-6 h-6" />
                                )}
                            </button>
                            <button
                                type="submit"
                                disabled={isResponseGenerating}
                                className="p-4 transition-all rounded-full bg-violet-400 text-white hover:bg-violet-600 disabled:opacity-50"
                            >
                                <Send className="w-6 h-6" />
                            </button>
                        </form>
                        <p className="text-center text-[10px] text-gray-500 mt-4">
                            Mega-Bot may display inaccurate info, including
                            about people, so double-check its responses.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssistanceIA;
