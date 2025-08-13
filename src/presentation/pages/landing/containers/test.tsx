import { ArrowDown, ArrowUpRight } from "lucide-react";

import { motion } from "motion/react";
import { Pointer } from "@/presentation/components/Pointer";
import { Button } from "@heroui/button";
import Star from "@/presentation/assets/image/illustrations/star.png";

import Hand from "@/presentation/assets/image/illustrations/Hand.png";
import Band from "@/presentation/components/band/band";

import Doctor from "@/presentation/assets/image/illustrations/virus1.jpg";
import Envi from "@/presentation/assets/image/illustrations/envi.jpg";
import { t } from "@/core/config/translation/i18nHelper";

import { LandingRevel3D } from "./landingReveal3d";
import { BotProvider } from "@/presentation/components/bot/providers";

const test = () => {
    return (
        <BotProvider >
        <div className="bg-abstract-background ">
            <div className="bg-backglass-background flex flex-col">
                <div className=" h-[100vh] max-w-[1200px] mx-auto w-full flex flex-row items-center justify-center ">
                    <Pointer>
                        <motion.div
                            animate={{
                                scale: [0.8, 1, 0.8],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            Text
                        </motion.div>
                    </Pointer>

                    <div className="w-1/2 swipeFadeUpCard">
                        <span className="font-syne p-2 px-4 text-[13px] rounded-full bg-slate-800 bg-opacity-10 font-bold">
                            NovaWorld -
                        </span>
                        <div className="text-[60px] text-slate-900 flex flex-col mb-4 font-syne font-bold w-[100%]">
                            <span className="font-syne">
                                {t("banner.Title")}
                            </span>
                            <span className="font-syne flex items-center">
                                {t("banner.Title1")}{" "}
                                <span className="bg-slate-900 ml-6 flex justify-center rounded-full w-[150px] p-[2px]">
                                    <ArrowUpRight className="w-[60px] h-[60px] text-white" />
                                </span>
                            </span>
                            <span className="font-syne">
                                {t("banner.Title2")}.
                            </span>
                        </div>
                        <p className="w-[80%] font-normal text-[14px] text-slate-600">
                            {t("banner.para1")}
                        </p>

                        <Button
                            size="lg"
                            className="mt-10"
                            variant="shadow"
                            color="secondary"
                        >
                            {t("banner.btn")}
                        </Button>

                        {/* <Spline scene="https://prod.spline.design/ESVh2ZChQhHUFMjW/scene.splinecode" /> */}
                    </div>

                    <div className="w-1/2">
                        <div className="w-[260px] zoom p-4 absolute top-[100px] z-10 bg-slate-300 bg-opacity-50 backdrop-blur-sm h-[300px] rotate-6 rounded-[20px] hover:scale-105 transition hover:shadow-md">
                            <div className="flex flex-col h-full">
                                <img
                                    src={Doctor}
                                    alt="Environment"
                                    lazy="loading"
                                    className="w-full h-[210px] object-cover rounded-lg mb-4"
                                />
                                <div className="space-y-2">
                                    <div className="bg-slate-300 h-4 w-2/3 rounded-full"></div>
                                    <div className="bg-slate-300 h-4 w-[200px] rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <div className="w-[260px] zoom p-4 absolute top-[200px] z-10 bg-slate-300 bg-opacity-50 backdrop-blur-sm h-[300px] -rotate-6 rounded-[20px] right-[160px] hover:scale-105 transition hover:shadow-md">
                            <div className="flex flex-col h-full">
                                <img
                                    src={Envi}
                                    alt="Health"
                                    lazy="loading"
                                    className="w-full h-[210px] object-cover rounded-lg mb-4"
                                />
                                <div className="space-y-2">
                                    <div className="bg-slate-300 h-4 w-3/4 rounded-full"></div>
                                    <div className="bg-slate-300 h-4 w-1/2 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <img
                            src={Star}
                            alt="star"
                            width={"90px"}
                            className="relative -top-[200px] left-[540px]"
                        />

                        <img
                            src={Star}
                            alt="star"
                            width={"220px"}
                            className="relative top-[70px] right-[70px]"
                        />

                        <div className="sign-image3 hover:scale-110 border-opacity-15 z-20 absolute right-[30vw] bottom-[15vh] backdrop-blur-sm mt-[130px] h-[150px] border-1 border-slate-900 w-[150px] rounded-full bg-slate-300 bg-opacity-25 shadow-large shadow-slate-300 dark:shadow-slate-700 transition">
                            <svg
                                className="absolute turnInfinite  w-[150px] h-[150px]"
                                viewBox="0 0 200 200"
                            >
                                <defs>
                                    <path
                                        id="circlePath"
                                        d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                                    />
                                </defs>
                                <text
                                    fill="black"
                                    fontSize="16"
                                    fontWeight="bold"
                                >
                                    <textPath
                                        xlinkHref="#circlePath"
                                        className="flex justify-between"
                                        startOffset="50%"
                                        textAnchor="middle"
                                    >
                                        Le progrès numérique en symbiose avec le
                                        corps.
                                    </textPath>
                                </text>
                            </svg>
                            <ArrowDown className="absolute border-1 p-6 border-slate-900 top-[20%] left-[20%] border-opacity-15 rounded-full text-black w-[90px] h-[90px]" />
                        </div>

                        <img
                            src={Hand}
                            alt="Hand"
                            className="absolute right-0 z-5 top-[210px]"
                            width={"650px"}
                        />
                    </div>
                </div>

                <Band />
            </div>

            <div className="h-[120px] w-[500px] left-[100px] backdrop-blur-lg relative -top-[60px] bg-white bg-opacity-50 backdrop-blur-md p-6 text-slate-900 rounded-2xl ring-2 ring-offset-4 ring-violet-700">
                <h3 className="text-xl font-syne font-bold mb-2">
                    Découvrez NovaBot
                </h3>
                <p className="text-sm">
                    Interagissez avec NovaBot, votre assistant virtuel
                    intelligent pour toutes vos questions santé.
                </p>
            </div>

            <div className="h-[70px] bg-gradient-to-b from-transparent to-slate-300 p-10 text-slate-300">
                Text
            </div>

            <LandingRevel3D />
        </div>
        </BotProvider>
    );
};
export default test;
