import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Equal, Pyramid } from "lucide-react";
import LangSelection from "@/presentation/components/LangSelection";
import { useBattery } from "@/presentation/hooks/use-battery";
import { BatteryIndicator } from "@/presentation/components/batteryIndicator";
import LetterSwapPingPong from "@/presentation/components/LetterSwapPingPong";
import { InteractiveHoverButton } from "@/presentation/components/InteractiveHoverButton";
import DarkModeSwitch from "@/presentation/components/darkModeSwitch";
// import { useComponent } from "@/presentation/components/bot/providers";
import { t } from "@/core/config/translation/i18nHelper";

import NovaWolrd from "@/presentation/assets/image/NovaWorld/1x/NovaLogo2.png";

const menuItems = [
    {
        label: t("navbar.home"),
        link: "/",
    },

    {
        label: t("navbar.carte"),
        link: "/maps3d",
    },
    {
        label: t("navbar.simulation"),
        link: "/simulation/",
    },
    {
        label: t("navbar.maladie"),
        link: "/disease",
    },

    {
        label: t("navbar.actu"),
        link: "/landing/actuality",
    },

    {
        label: t("navbar.dec"),
        link: "/landing/urbanism",
    },
];

const footerMenuItems = [
    {
        label: "Nous contacter",
        link: "/landing/team",
    },
    {
        label: "À propos de nous",
        link: "/about",
    },
    {
        label: "Labs",
        link: "/labs",
    },
];

export default function Navbar() {
    const [isFixed, setIsFixed] = useState(false);
    const [showFooterMenu, setShowFooterMenu] = useState(false);

    // Initialize refs for each menu item and the sign-in button
    const accueilRef = useRef<HTMLAnchorElement | null>(null);
    const simulationRef = useRef<HTMLAnchorElement | null>(null);
    const assistanceRef = useRef<HTMLAnchorElement | null>(null);
    const consultationRef = useRef<HTMLAnchorElement | null>(null);
    const signRef = useRef<HTMLAnchorElement | null>(null);

    // const { addComponent } = useComponent();

    const {
        isLoading: loading,
        level,
        isCharging,
        chargingTime,
        dischargingTime,
    } = useBattery();

    // Register components with addComponent
    // useLayoutEffect(() => {
    //     if (
    //         accueilRef.current &&
    //         simulationRef.current &&
    //         assistanceRef.current &&
    //         consultationRef.current &&
    //         signRef.current
    //     ) {
    //         addComponent("click", {
    //             name: "accueil link",
    //             refs: accueilRef.current,
    //             description: "Lien Accueil",
    //         });
    //         addComponent("click", {
    //             name: "simulation link",
    //             refs: simulationRef.current,
    //             description: "Lien Simulation",
    //         });
    //         addComponent("click", {
    //             name: "assistance link",
    //             refs: assistanceRef.current,
    //             description: "Lien Assistance",
    //         });
    //         addComponent("click", {
    //             name: "consultation link",
    //             refs: consultationRef.current,
    //             description: "Lien Consultation",
    //         });
    //         addComponent("click", {
    //             name: "sign button",
    //             refs: signRef.current,
    //             description: "Bouton de connexion",
    //         });
    //     }
    // }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsFixed(currentScrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className={`justify-between mx-auto py-4  max-w-[1350px] z-40 transform text-white flex items-center p-2 ${
                    isFixed
                        ? "fixed swipeFadeDown top-0 left-0 right-0"
                        : "absolute top-0 left-0 right-0"
                }`}
            >
                <div className="flex gap-2 items-center">
                    <div className="me-3 rounded-full  bg-violet-600 p-2 bg-gradient-to-r bg-lime-600">
                        <img src={NovaWolrd} alt="NovaWorld" width={"30px"} />
                    </div>
                    <div className="bg-white backdrop-blur-sm bg-opacity-50 p-1 flex rounded-full">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.link}
                                className="px-4 py-2 transition m mx-1 hover:bg-slate-800 hover:text-white text-slate-600 rounded-full text-sm"
                                ref={
                                    index === 0
                                        ? accueilRef
                                        : index === 1
                                        ? simulationRef
                                        : index === 2
                                        ? assistanceRef
                                        : consultationRef
                                }
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="w-auto flex items-center">
                    <Link to={"/auth"} ref={signRef}>
                        <InteractiveHoverButton>
                            Se connecter
                        </InteractiveHoverButton>
                    </Link>
                    <div className="left-header flex gap-2 items-center">
                        <LangSelection />
                    </div>
                    <Link
                        to={"/landing/assistant"}
                        className="p-2 hover:bg-slate-700 transition py-2 ml-2 bg-white text-slate-700 hover:text-white backdrop-blur-sm bg-opacity-50 rounded-full text-sm"
                    >
                        <Bot />
                    </Link>
                    <motion.div
                        whileHover={{
                            scale: 1,
                            rotate: 180,
                            backgroundColor: "rgb(51, 65, 85)",
                            color: "white",
                        }}
                        transition={{
                            duration: 0.2,
                        }}
                        onClick={() => setShowFooterMenu(!showFooterMenu)}
                        className="p-2 cursor-pointer transition py-2 ml-2 bg-white text-slate-700 backdrop-blur-sm bg-opacity-50 rounded-full text-sm"
                    >
                        <Equal />
                    </motion.div>
                    <div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <BatteryIndicator
                                chargingTime={chargingTime}
                                dischargingTime={dischargingTime}
                                isCharging={isCharging}
                                level={level ? level * 100 : null}
                            />
                        )}
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {showFooterMenu && (
                    <motion.div
                        initial={{ y: 100, opacity: 0, rotate: "30deg" }}
                        animate={{ y: 0, opacity: 1, rotate: "0deg" }}
                        exit={{ y: 100, opacity: 0, rotate: "30deg" }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                            duration: 0.8,
                        }}
                        className={`${
                            isFixed
                                ? "fixed fadeInSlow "
                                : "absolute fadeInSlow"
                        } rounded-2xl z-50 top-[75px] right-[150px] text-left bg-white shadow-sm backdrop-blur-sm bg-opacity-50 p-4 flex flex-col gap-4`}
                    >
                        {footerMenuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.link}
                                className="text-[22px] p-4 w-full h-[40px] hover:bg-slate-800 hover:text-white text-slate-600 rounded-md text-sm transition-all duration-300 flex items-center group"
                            >
                                {item.label}
                            </Link>
                        ))}
                        <DarkModeSwitch />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
