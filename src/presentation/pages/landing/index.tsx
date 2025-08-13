import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./layouts/navbar";
import ScrollSlider from "@/presentation/components/sliderScroll/ScrollSlider";
import ScrollToTop from "@/presentation/components/scrollToTop/scrollToTop";
import { StickyFooter } from "./layouts/stickyFooter";
import { ScrollProgress } from "@/presentation/components/ScrollProgress";
import FloatAlert from "@/presentation/components/Alert";

import Image1 from "@/presentation/assets/image/illustrations/Mada1.jpg";
import Image2 from "@/presentation/assets/image/illustrations/imgCard2.jpg";
import Image3 from "@/presentation/assets/image/illustrations/virus2.jpg";
import Image4 from "@/presentation/assets/image/illustrations/virus1.jpg";

// Alert data interface
interface DisasterAlert {
    id: number;
    message: string;
    category: string;
    timestamp: string;
    description: string;
    location: string;
}
import { BotProvider } from "@/presentation/components/bot/providers";

const LandingPage = () => {
    const formatDate = (date: string) => {
        return new Date(date).toLocaleString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const [alerts, setAlerts] = useState<DisasterAlert[]>([
        {
            id: 1,
            message: "Bienvenue sur NovaWorld !",
            category: "info",
            timestamp: formatDate(new Date().toISOString()),
            description: "Bienvenue sur notre plateforme",
            location: "global",
        },
    ]);

    useEffect(() => {
        let isMounted = true;

        const generateFakeDisasterAlerts = () => {
            const disasterTypes = [
                {
                    type: "Séisme",
                    locations: ["Japon", "Californie", "Indonésie"],
                    image: Image1,
                },
                {
                    type: "Tsunami",
                    locations: [
                        "Côte Pacifique",
                        "Océan Indien",
                        "Méditerranée",
                    ],
                    image: Image2,
                },
                {
                    type: "Épidémie",
                    locations: ["Asie de l'Est", "Europe", "Amérique du Sud"],
                    image: Image3,
                },
                {
                    type: "Ouragan",
                    locations: ["Caraïbes", "Floride", "Philippines"],
                    image: Image4,
                },
                {
                    type: "Éruption Volcanique",
                    locations: ["Islande", "Hawaii", "Indonésie"],
                    image: Image1,
                },
            ];

            const newAlerts: DisasterAlert[] = [];
            const numberOfAlerts = Math.floor(Math.random() * 3) + 1; // Génère 1-3 alertes
            const usedCombinations = new Set<string>(); // Track used type-location combinations

            while (newAlerts.length < numberOfAlerts) {
                const randomDisaster =
                    disasterTypes[
                        Math.floor(Math.random() * disasterTypes.length)
                    ];
                const randomLocation =
                    randomDisaster.locations[
                        Math.floor(
                            Math.random() * randomDisaster.locations.length
                        )
                    ];
                const severity = ["Critique", "Élevé", "Moyen"][
                    Math.floor(Math.random() * 3)
                ];

                // Create unique combination key
                const combinationKey = `${randomDisaster.type}-${randomLocation}`;

                // Check if this combination has already been used
                if (!usedCombinations.has(combinationKey)) {
                    usedCombinations.add(combinationKey);

                    newAlerts.push({
                        id: Date.now() + newAlerts.length,
                        message: `Alerte ${randomDisaster.type} - Niveau ${severity}`,
                        category:
                            severity === "Critique" ? "danger" : "warning",
                        timestamp: formatDate(new Date().toISOString()),
                        description: `Un ${randomDisaster.type.toLowerCase()} de niveau ${severity.toLowerCase()} a été détecté en ${randomLocation}. Les autorités locales ont été notifiées et les protocoles d'urgence sont en cours d'activation.`,
                        location: randomLocation,
                        image: randomDisaster.image,
                    });
                }
            }

            if (isMounted) {
                setAlerts((prev) => {
                    const filtered = prev.filter((alert) => alert.id !== 1); // Supprime le message de bienvenue
                    return [...filtered, ...newAlerts].slice(-5); // Garde uniquement les 5 dernières alertes
                });
            }
        };

        // Génération initiale
        generateFakeDisasterAlerts();

        // Génère de nouvelles alertes toutes les 30 secondes pour la simulation
        const interval = setInterval(generateFakeDisasterAlerts, 30000);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    return (
        // <BotProvider>
            <div className=" bg-light-custom-background flex flex-col">
                <div className=" bg-cover">
                    <div className="w-full">
                        <Navbar />
                    </div>

                    {/* Deco */}
                    <ScrollProgress className="top-[0px]" />
                    <ScrollSlider />
                    <ScrollToTop />
                    <FloatAlert alerts={alerts} />

                    <Outlet />
                    <StickyFooter
                        heightValue="100dvh"
                        className="text-neutral-900 dark:text-neutral-100"
                    >
                        <FooterContent />
                    </StickyFooter>
                </div>
            </div>
        // </BotProvider>
    );
};

export default LandingPage;

export function FooterContent() {
    return (
        <div className="py-8 px-[90px] h-full w-full flex bg-slate-200 bg-line-background flex-col justify-between">
            <div className="grid sm:grid-cols-4 grid-cols-1 shrink-0 gap-20 mt-20">
                <div className="flex flex-col gap-2">
                    <h3 className="mb-2 uppercase text-neutral-500">
                        À propos
                    </h3>
                    <p>Accueil</p>
                    <p>Projets</p>
                    <p>Notre Mission</p>
                    <p>Contactez-nous</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="mb-2 uppercase text-neutral-500">
                        Éducation
                    </h3>
                    <p>Actualités</p>
                    <p>Apprentissage</p>
                    <p>Certification</p>
                    <p>Publications</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className="mb-2 uppercase text-neutral-500">
                        Éducation
                    </h3>
                    <p>Actualités</p>
                    <p>Apprentissage</p>
                    <p>Certification</p>
                    <p>Publications</p>
                </div>
            </div>

            <div className="flex flex-col font-syne gap-4 sm:flex-row items-end">
                <h1 className="text-[14vw] leading-[0.8] mt-10">NovaWorld</h1>
                <p>©copyright - 2025</p>
            </div>
        </div>
    );
}
