import React from "react";
import Cube from "@/presentation/assets/image/gif/output-onlinegiftools.gif";

/**
 *
 * @desc: Page de rediction pour les routes en cours de chargement
 */
const LoaderPage = () => {
    return (
        <div className="bg-line-background bg-light-custom-background h-screen w-screen dark:bg-slate-950">
            <div className="bg-backglass3-background flex h-screen flex-col items-center justify-center bg-cover">
                <div className="w-[200px] h-[200px] rounded-full overflow-hidden flex items-center justify-center">
                    <img
                        src={Cube}
                        className="w-full h-full object-cover rounded-full"
                        alt="Loading"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoaderPage;

export const CircularBarsSpinnerLoader = ({
    numberOfBars = 12,
    width = 3,
    height = 16,
}) => {
    const animationDuration = 1.5;
    const delay = animationDuration / numberOfBars;
    return (
        <>
            <style>
                {`
          @keyframes circular-bars {
            0% {
              opacity: 1;
              rotate: 0deg;
              scale: 1;
            }
            70% {
              opacity: 0;
              rotate: -40deg;
              scale: 0.9;
            }
            100% {
              opacity: 1;
              rotate: 0deg;
              scale: 1;
            }
          }
        `}
            </style>
            <div
                aria-hidden="true"
                className="relative flex size-12 items-center justify-center"
            >
                {[...new Array(numberOfBars)].map((_, index) => (
                    <div
                        className="absolute rounded-[1px] bg-emerald-500 dark:invert"
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={`circular-bars-spinner-loader-bar-${index}`}
                        style={{
                            width: `${width}px`,
                            height: `${height}px`,
                            transform: `rotate(${
                                index * (360 / numberOfBars)
                            }deg) translateX(6px) translateY(-16px)`,
                            animation: `circular-bars ${animationDuration}s ease-in-out infinite`,
                            animationDelay: `-${index * delay}s`,
                        }}
                    />
                ))}
                <span className="sr-only">Loading...</span>
            </div>
        </>
    );
};
