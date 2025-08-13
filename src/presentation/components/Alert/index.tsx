import React, { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type AlertCategory = "information" | "avertissement" | "erreur" | "succès";
type Alert = {
    id: number;
    message: string;
    category: AlertCategory;
    image?: string;
    location?: string;
    description?: string;
    timestamp: string;
};

type Props = {
    status?: "isAlert" | "noAlert";
    alerts?: Array<Alert>;
};

const FloatAlert = ({ status = "isAlert", alerts = [] }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (!isModalOpen) setSelectedAlert(null);
    };

    const openDetailModal = (alert: Alert) => {
        setSelectedAlert(alert);
    };

    return (
        <div className="fixed left-8 z-20 bottom-8 cursor-pointer">
            <div className="relative">
                <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                    }}
                    style={{
                        backgroundColor:
                            status === "noAlert" ? "#22c55e" : "#ef4444",
                    }}
                />
                <motion.div
                    className={`relative flex items-center justify-center w-[50px] h-[50px] rounded-full ${
                        status === "noAlert" ? "bg-green-500" : "bg-red-500"
                    } text-white`}
                    onClick={toggleModal}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                    }}
                >
                    <FaExclamationTriangle size={24} />
                </motion.div>
            </div>

            <AnimatePresence>
                {isModalOpen && !selectedAlert && (
                    <motion.div
                        className="absolute bottom-[60px] h-[400px] overflow-y-scroll left-0 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg min-w-[300px] border border-white/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-slate-600 mb-3">
                                Notifications
                            </h3>
                            {alerts.length > 0 ? (
                                <ul className="space-y-2">
                                    {alerts.map((alert) => (
                                        <li
                                            key={alert.id}
                                            onClick={() =>
                                                openDetailModal(alert)
                                            }
                                            className="flex items-center p-3 bg-white text-slate-700 rounded-lg border border-white/10 hover:bg-white/10 transition-colors duration-200"
                                        >
                                            {alert.image && (
                                                <img
                                                    src={alert.image}
                                                    alt=""
                                                    className="w-12 h-12 rounded-lg object-cover mr-3"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span
                                                        className={`px-2 py-1 text-xs rounded ${
                                                            alert.category ===
                                                            "erreur"
                                                                ? "bg-red-100 text-red-800"
                                                                : alert.category ===
                                                                  "avertissement"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : alert.category ===
                                                                  "succès"
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-blue-100 text-blue-800"
                                                        }`}
                                                    >
                                                        {alert.category}
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        {alert.timestamp}
                                                    </span>
                                                </div>
                                                <p className="text-sm">
                                                    {alert.message}
                                                </p>
                                                {alert.location && (
                                                    <p className="text-xs text-slate-500 mt-1">
                                                        📍 {alert.location}
                                                    </p>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-white/60 text-center py-4">
                                    No alerts to display
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}

                {selectedAlert && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-100"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-semibold">
                                    Alert Details
                                </h2>
                                <button
                                    onClick={() => setSelectedAlert(null)}
                                    className="text-slate-500 hover:text-slate-700"
                                >
                                    ✕
                                </button>
                            </div>
                            {selectedAlert.image && (
                                <img
                                    src={selectedAlert.image}
                                    alt=""
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                            )}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span
                                        className={`px-2 py-1 text-xs rounded ${
                                            selectedAlert.category === "erreur"
                                                ? "bg-red-100 text-red-800"
                                                : selectedAlert.category ===
                                                  "avertissement"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : selectedAlert.category ===
                                                  "succès"
                                                ? "bg-green-100 text-green-800"
                                                : "bg-blue-100 text-blue-800"
                                        }`}
                                    >
                                        {selectedAlert.category}
                                    </span>
                                    <span className="text-sm text-slate-500">
                                        {selectedAlert.timestamp}
                                    </span>
                                </div>
                                <p className="text-slate-800 font-medium">
                                    {selectedAlert.message}
                                </p>
                                {selectedAlert.description && (
                                    <p className="text-slate-600">
                                        {selectedAlert.description}
                                    </p>
                                )}
                                {selectedAlert.location && (
                                    <p className="text-slate-600">
                                        <span className="font-medium">
                                            Location:{" "}
                                        </span>
                                        {selectedAlert.location}
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatAlert;
