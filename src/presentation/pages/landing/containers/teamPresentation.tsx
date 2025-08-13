"use client";
import { Carousel, Card } from "@/presentation/components/TeamCardsCarousel";
import React from "react";
import Stevano from "@/presentation/assets/image/supernova/Stevano.jpg";
import Joel from "@/presentation/assets/image/supernova/Joel.jpg";
import Kevin from "@/presentation/assets/image/supernova/Kevin.jpg";
import Mahery from "@/presentation/assets/image/supernova/Mahery.jpg";
import Faneva from "@/presentation/assets/image/supernova/Faneva.jpg";
import Unity from "@/presentation/assets/image/supernova/tech/unity.png";
import ThreeJs from "@/presentation/assets/image/supernova/tech/ThreeJs.png";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AppleCardsCarouselDemo() {
    const ref = useRef<HTMLDivElement>(null);
    const cards = data.map((card, index) => (
        <Card key={card.imgsrc} card={card} index={index} layout={true} />
    ));

    return (
        <div className="bg-abstract-background">
            <div className="w-full bg-backglass-background font-syne h-full pt-[80px] py-4">
                <h2 className="max-w-7xl  flex flex-col swipeLeft pl-4 mx-auto font-syne text-neutral-800 dark:text-neutral-200">
                    <small className="text-[14px]  px-2 py-1 text-center rounded-full bg-yellow-400 w-[150px] font-poppins text-white font-semibold">
                        Notre SuperTeam
                    </small>
                    <span className="font-light text-2xl md:text-4xl mt-4 max-w-[600px]">
                        L’équipe qui a{" "}
                        <span className="font-bold">tout donné</span> pour
                        rendre ça{" "}
                        <span className="font-extralight italic">
                            possible.
                        </span>
                    </span>
                </h2>
                <Carousel items={cards} />

                <div className="w-screen bg-red-500">
                    <div
                        className="flex justify-start mx-auto max-w-[1200px]  w-full items-center mt-8 animate-bounce cursor-pointer"
                        onClick={() =>
                            document
                                .getElementById("techno")
                                ?.scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        <div className="flex bg-violet-600 hover:scale-105 transition shadow-sm text-center py-2 px-5 text-white rounded-full absolute -top-[160px] items-center">
                            <svg
                                className="w-6 h-6 text-neutral-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                            <span className="text-white font-poppins text-[14px]">
                                Les technologies
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <motion.div
                className="w-[110%] relative -top-[50px] overflow-hidden bg-violet-600 py-4 -rotate-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative flex overflow-x-hidden" ref={ref}>
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="whitespace-nowrap py-2"
                    >
                        {[
                            "REACT",
                            "VITE",
                            "THREE.JS",
                            "UNITY3D",
                            "NODE.JS",
                            "EXPRESS",
                            "AMPALIBE",
                        ].map((tech, index) => (
                            <motion.span
                                key={index}
                                whileHover={{ scale: 1.1 }}
                                className="inline-block"
                            >
                                <span
                                    className="text-6xl font-bold font-syne mx-4 text-transparent bg-clip-text"
                                    style={{
                                        WebkitTextStroke: "1px white",
                                    }}
                                >
                                    {tech}
                                </span>
                                <motion.span
                                    className="text-violet-900 mx-2"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    ★
                                </motion.span>
                            </motion.span>
                        ))}
                    </motion.div>
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute top-0 whitespace-nowrap py-2"
                    >
                        {[
                            "REACT",
                            "VITE",
                            "THREE.JS",
                            "UNITY3D",
                            "NODE.JS",
                            "EXPRESS",
                            "AMPALIBE",
                        ].map((tech, index) => (
                            <motion.span
                                key={`clone-${index}`}
                                whileHover={{ scale: 1.1 }}
                                className="inline-block"
                            >
                                <span
                                    className="text-6xl font-bold font-syne mx-4 text-transparent bg-clip-text"
                                    style={{
                                        WebkitTextStroke: "1px white",
                                    }}
                                >
                                    {tech}
                                </span>
                                <motion.span
                                    className="text-violet-900 mx-2"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    ★
                                </motion.span>
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            <div
                className="w-full h-screen bg-backglass-background font-syne pt-[80px] py-4"
                id="techno"
                ref={ref}
            >
                <motion.h2
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="max-w-7xl flex flex-col swipeLeft pl-4 mx-auto font-syne text-neutral-800 dark:text-neutral-200"
                >
                    <motion.small
                        whileHover={{ scale: 1.05 }}
                        className="text-[14px] px-2 py-1 text-center rounded-full bg-yellow-400 w-[150px] font-poppins text-white font-semibold"
                    >
                        outils magique
                    </motion.small>
                    <motion.span
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="font-light text-2xl md:text-4xl mt-4 max-w-[800px]"
                    >
                        Ce qu'on utilise pour{" "}
                        <span className="font-bold">
                            coder, créer, tester, rater, recommencer, réussir.
                        </span>{" "}
                        Bref, notre quotidien de devs.
                    </motion.span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="grid grid-cols-1 mt-4 mb-[80px] md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto p-4"
                >
                    {[
                        {
                            icon: "https://vitejs.dev/logo.svg",
                            title: "React + Vite",
                            description:
                                "Construisez des applications web ultra-rapides avec des outils modernes et un rechargement instantané.",
                        },
                        {
                            icon: "https://static.xx.fbcdn.net/rsrc.php/y9/r/tL_v571NdZ0.svg",
                            title: "ngrok + LLMA",
                            description:
                                "Tunneling sécurisé et capacités de modèles de langage pour une intégration IA avancée.",
                        },
                        {
                            icon: Unity,
                            title: "Unity3D",
                            description:
                                "Créez des expériences 3D immersives et du contenu interactif avec des outils de pointe.",
                        },
                        {
                            icon: ThreeJs,
                            title: "Three Fiber",
                            description:
                                "Intégrez des graphiques 3D sur le web avec l'approche déclarative puissante de React.",
                        },
                        {
                            icon: "https://nodejs.org/static/images/logo.svg",
                            title: "NodeJS + Express",
                            description:
                                "Développez des applications côté serveur évolutives avec l'environnement JavaScript et son framework web.",
                        },
                        {
                            icon: "https://ampalibe.readthedocs.io/en/latest/_static/ampalibe_logo.png",
                            title: "Ampalibe",
                            description:
                                "Framework innovant malgache pour la construction de bot messenger.",
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 * index }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/30 backdrop-blur-md rounded-xl p-6 shadow-lg"
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <motion.img
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.8 }}
                                    src={item.icon}
                                    alt={item.title}
                                    className="w-12 h-12"
                                />
                                <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                                    {item.title}
                                </h3>
                            </div>
                            <p className="text-neutral-600 text-sm dark:text-neutral-300">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

const DummyContent = () => {
    return (
        <>
            {[...new Array(5).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        className="bg-[#F5F5F7] p-8 md:p-14 rounded-3xl mb-4"
                    >
                        <p className="text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
                            <span className="font-bold text-neutral-700">
                                The first rule of Apple club is that you boast
                                about Apple club.
                            </span>{" "}
                            Keep a journal, quickly jot down a grocery list, and
                            take amazing class notes. Want to convert those
                            notes to text? No problem. Langotiya jeetu ka mara
                            hua yaar is ready to capture every thought. Lorem
                            ipsum dolor sit, amet consectetur adipisicing elit.
                            Numquam dolorum commodi perspiciatis ipsa atque
                            nulla molestiae explicabo neque suscipit quisquam.
                            Ex molestiae quos magnam voluptatum at minus
                            asperiores sunt minimam.
                        </p>
                        <img
                            src="https://assets.aceternity.com/macbook.png"
                            alt="Macbook mockup from Aceternity UI"
                            height="500"
                            width="500"
                            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                        />
                    </div>
                );
            })}
        </>
    );
};

const data = [
    {
        skills: ["Designer", "Dev Frontend", "Modeleur 3D"],
        title: "Edouardo Stevano R.",
        description:
            "Crée des interfaces intuitives avec une touche artistique en 3D.",

        imgsrc: Stevano,
        content: <DummyContent />,
    },
    {
        skills: ["Designer", "Dev Frontend", "Dev mobile", "UI/UX"],
        title: "Jean Mahery Rak.",
        description:
            "Allie design et développement mobile pour des applis fluides et esthétiques.",

        imgsrc: Mahery,
        content: <DummyContent />,
    },
    {
        skills: ["Dev fullstack", "artiste 3D web", "Dev mobile"],
        title: "Pierris Kevin R.",
        description:
            "Fusionne code et création 3D pour des projets web innovants.",
        imgsrc: Kevin,
        content: <DummyContent />,
    },
    {
        skills: ["Dev fullstack", "CybSec", "Dev mobile"],
        title: "Mamy Joel R.",
        description:
            "Conçoit des architectures solides et des applis performantes.",
        imgsrc: Joel,
        content: <DummyContent />,
    },
    {
        title: "Henriella Faneva R.",
        skills: [
            "Présentatrice",
            "Testeur de la qualité",
            "Notre petite fleur",
        ],
        description: "Présente avec charme et teste avec rigueur.",
        imgsrc: Faneva,
        content: <DummyContent />,
    },
];
