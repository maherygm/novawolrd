import { useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Button } from "@heroui/button";

import { Studio } from "@/presentation/components/studio for 3D";
import AOS from "aos/dist/aos";
import "aos/dist/aos.css";

gsap.registerPlugin(ScrollTrigger);
import "./style.scss";

interface pinsectionProps {
    setPercent?: (n: number) => void;
}

export function PinSection({ setPercent }: pinsectionProps) {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Durée de l'animation
            once: true, // Animation se joue une seule fois
        });
    }, []);

    const [progress, setProgress] = useState(0);
    useEffect(() => {
        gsap.set(".photo:not(:first-child)", { opacity: 0, scale: 0.5 });
        const animation = gsap.to(".photo:not(:first-child)", {
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: 1,
        });
        let ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: ".gallery",
                start: "top top",
                end: "bottom bottom",
                pin: ".right",
                animation: animation,
                scrub: true,
                onUpdate: (self) => {
                    if (setPercent) {
                        setPercent(self.progress);
                        setProgress(self.progress);
                    }
                },
                onLeave: () => {
                    gsap.set(".gallery", { clearProps: "all" });
                },
            });
        });
        return () => ctx.revert();
    }, []);
    return (
        <>
            <div className="gallery bg-slate-300">
                <div className="content-just">
                    <div className="just  ">
                        <div className="h-full flex justify-center items-center relative">
                            <div
                                className="w-1/2"
                                data-aos-delay="300"
                                data-aos="fade-up-right"
                            >
                                <h1 className="pl-4 relative -top-20 right-[200px] font-syne text-slate-800 text-7xl font-bold mb-8">
                                    Problématique
                                    <small className="block text-lg text-slate-600 font-normal mt-2">
                                        Découvrez les deux principaux défis
                                        auxquels nous faisons face : la santé et
                                        la gestion durable de l'environnement
                                    </small>
                                </h1>

                                <div className="flex gap-8 relative">
                                    {/* Floating Button 1 */}
                                    <div className="relative group">
                                        <button className="w-12 h-12 relative left-[600px] top-[100px] bg-violet-700 rounded-full flex items-center justify-center animate-pulse shadow-lg hover:bg-blue-600 transition-colors">
                                            <span className="text-white text-2xl">
                                                +
                                            </span>
                                        </button>

                                        {/* Glassmorphism Card 1 */}
                                        <div className="opacity-0 group-hover:opacity-100  relative left-[660px] top-[60px] transition-opacity absolute left-16 top-0 w-[400px] p-4 backdrop-blur-md bg-white/30 rounded-xl shadow-lg border border-white/20">
                                            <h3 className="text-xl font-semibold mb-2">
                                                Santé Publique
                                            </h3>
                                            <p className="text-sm">
                                                La santé publique fait face à
                                                des défis majeurs, notamment
                                                l'accès aux soins, la prévention
                                                des maladies et la gestion des
                                                urgences sanitaires. Ces enjeux
                                                nécessitent des solutions
                                                innovantes et durables.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Floating Button 2 */}
                                    <div className="relative group">
                                        <button className="w-12 h-12 bg-primary-500 relative right-[320px] rounded-full flex items-center justify-center animate-pulse shadow-lg hover:bg-primary-800 transition-colors">
                                            <span className="text-white text-2xl">
                                                +
                                            </span>
                                        </button>

                                        {/* Glassmorphism Card 2 */}
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -left-[260px] top-0 w-[400px]  p-4 backdrop-blur-md bg-white/30 rounded-xl shadow-lg border border-white/20">
                                            <h3 className="text-xl font-semibold mb-2">
                                                Gestion Environnementale
                                            </h3>
                                            <p className="text-sm">
                                                La gestion durable de
                                                l'environnement est cruciale
                                                face aux défis climatiques
                                                actuels. Nous devons adopter des
                                                pratiques responsables pour
                                                préserver nos ressources
                                                naturelles et assurer un avenir
                                                viable pour les générations
                                                futures.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="just ">
                        <div
                            data-aos="fade-up-right"
                            data-aos-delay="300"
                            data-aos-anchor-placement="top-center"
                            className=" h-[80%] rounded-2xl p-6 w-[700px] flex relative left-[300px]  justify-start items-center"
                        >
                            <div className="w-full">
                                <h1 className="pl-4 text-slate-900 font-syne text-4xl font-bold">
                                    Notre Solution
                                </h1>
                                <h4 className="pl-4 text-slate-900 font-syne text-7xl font-bold">
                                    NovaWorld
                                </h4>
                                <p className="pl-4 mt-4 text-md text-zinc-600">
                                    C'est pour répondre à ces défis majeurs que
                                    nous avons conçu NovaWorld. Une plateforme
                                    innovante qui combine technologie de pointe
                                    et approche durable pour créer un impact
                                    positif sur la santé publique et
                                    l'environnement.
                                </p>
                                <a href="#tools">
                                    <Button
                                        color={"secondary"}
                                        className={"ml-4 mt-6"}
                                    >
                                        voir nos outils
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="just" id="tools">
                        <div className="h-full flex justify-center items-center">
                            <div
                                data-aos="fade-up"
                                data-aos-delay="300"
                                className="w-3/4"
                            >
                                <h1 className="pl-4 font-syne text-slate-800 text-7xl font-bold mb-8">
                                    Nos Outils
                                    <small className="block text-lg text-slate-600 font-normal mt-2">
                                        Découvrez nos solutions innovantes pour
                                        répondre aux défis de santé et
                                        environnementaux
                                    </small>
                                </h1>

                                <div className="grid grid-cols-2 gap-8 mt-12">
                                    {/* Tool Items */}
                                    {[
                                        {
                                            title: "Carte Interactive",
                                            description:
                                                "Visualisez en temps réel les données environnementales et sanitaires de votre région",
                                            color: "bg-blue-500",
                                        },
                                        {
                                            title: "Metaverse",
                                            description:
                                                "Explorez un univers virtuel dédié à l'apprentissage et à la sensibilisation",
                                            color: "bg-violet-500",
                                        },
                                        {
                                            title: "Diagnostic en Ligne",
                                            description:
                                                "Accédez à des outils d'évaluation et de diagnostic préliminaire",
                                            color: "bg-green-500",
                                        },
                                        {
                                            title: "Gestion des Déchets",
                                            description:
                                                "Suivez et optimisez votre gestion des déchets de manière intelligente",
                                            color: "bg-amber-500",
                                        },
                                    ].map((tool, index) => (
                                        <div
                                            key={index}
                                            className="relative group"
                                        >
                                            <div className="p-4 backdrop-blur-md items-center bg-white/10 rounded-xl shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
                                                <h3
                                                    data-aos="fade-up"
                                                    data-aos-delay="300"
                                                    className="text-xl flex items-center font-semibold mb-2 text-slate-800"
                                                >
                                                    <div
                                                        className={`w-3 h-3 ${tool.color} rounded-full animate-pulse mr-4`}
                                                    ></div>

                                                    {tool.title}
                                                </h3>
                                                <p
                                                    data-aos="fade-up"
                                                    data-aos-delay="300"
                                                    className="text-sm text-slate-600"
                                                >
                                                    {tool.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                    <span className={"ml-2 text-slate-700"}>
                                        et encore pelin d'autres...
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white/60 backdrop-blur-md h-[100vh] bg-solution flex justify-center mx-auto ">
                        <div className="w-[1300px] flex flex-col justify-center py-12 px-8">
                            <div className="text-center mb-12">
                                <h2
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                    className="text-4xl font-syne font-bold text-slate-800 mb-4"
                                >
                                    Aidez les Zones en Crise
                                </h2>
                                <p
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                    className="text-slate-600 max-w-2xl mx-auto"
                                >
                                    Votre don aide directement les régions
                                    touchées par des catastrophes naturelles,
                                    des crises humanitaires et des cyclones
                                </p>
                            </div>

                            <div
                                data-aos="fade-up"
                                data-aos-delay="300"
                                className="grid  grid-cols-3 gap-8"
                            >
                                {[
                                    {
                                        amount: "10€",
                                        description:
                                            "Aide d'urgence pour les victimes de catastrophes",
                                    },
                                    {
                                        amount: "25€",
                                        description:
                                            "Soutien aux zones sinistrées",
                                        highlight: true,
                                    },
                                    {
                                        amount: "100€",
                                        description:
                                            "Reconstruction post-catastrophe",
                                    },
                                ].map((option, index) => (
                                    <div
                                        key={index}
                                        className={`rounded-xl p-6 transition-all duration-300 hover:transform hover:-translate-y-2 
                    ${
                        option.highlight
                            ? "bg-violet-100 border-2 border-violet-500 shadow-lg"
                            : "bg-white/70 backdrop-blur-sm border border-slate-200 hover:shadow-md"
                    }`}
                                    >
                                        <div className="text-center">
                                            <h3
                                                className={`text-3xl font-bold mb-3 ${
                                                    option.highlight
                                                        ? "text-violet-600"
                                                        : "text-slate-700"
                                                }`}
                                            >
                                                {option.amount}
                                            </h3>
                                            <p className="text-slate-600 text-sm">
                                                {option.description}
                                            </p>
                                            <button
                                                className={`mt-6 px-6 py-2 rounded-full transition-colors duration-300 
                            ${
                                option.highlight
                                    ? "bg-violet-600 text-white hover:bg-violet-700"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                                            >
                                                Faire un don
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="text-center mt-8">
                                <p className="text-sm text-slate-500">
                                    100% des dons sont reversés aux zones
                                    sinistrées via nos partenaires humanitaires
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="bg-slate-900 donation  h-[380px] to-indigo-800 text-white">
                            <div className="container flex flex-col  bg-black/70 h-full mx-auto text-center py-16">
                                <h2
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                    className="text-4xl font-syne font-bold mb-6"
                                >
                                    Rejoignez notre monde virtuelle Novaland
                                </h2>
                                <p
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                    className="text-sm mb-8 max-w-2xl mx-auto"
                                >
                                    Interagissons ensemble dans une monde où
                                    tous le monde est liobre de se communiquer
                                    et faire tout ce qu'il veut
                                </p>
                                <div
                                    data-aos="fade-up"
                                    data-aos-delay="500"
                                    className="flex justify-center gap-4"
                                >
                                    <Button
                                        color="secondary"
                                        className="px-8 py-3 text-md"
                                    >
                                        Commencer l'aventure
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right">
                    <div className="photos">
                        {/* <div className="photo red"></div>
                        <div className="photo green"></div>
                        <div className="photo blue"></div> */}
                        <Studio progress={progress} />
                    </div>
                </div>
                {/* <div className="gradient top"></div> */}
            </div>

            {/* <div className="spacer"></div>
            <div className="spacer"></div>
            <div className="spacer"></div> */}
        </>
    );
}
