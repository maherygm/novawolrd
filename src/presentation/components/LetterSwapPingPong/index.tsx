"use client";

import { useState } from "react";
import { AnimationOptions, motion, stagger, useAnimate } from "motion/react";
import { debounce } from "lodash";

interface TextProps {
    label: string;
    reverse?: boolean;
    transition?: AnimationOptions;
    staggerDuration?: number;
    staggerFrom?: "first" | "last" | "center" | number;
    className?: string;
    onClick?: () => void;
}

const LetterSwapPingPong = ({
    label,
    reverse = true,
    transition = {
        type: "spring",
        duration: 0.7,
    },
    staggerDuration = 0.03,
    staggerFrom = "first",
    className,
    onClick,
    ...props
}: TextProps) => {
    const [scope, animate] = useAnimate();
    const [isHovered, setIsHovered] = useState(false);

    const mergeTransition = (baseTransition: AnimationOptions) => ({
        ...baseTransition,
        delay: stagger(staggerDuration, {
            from: staggerFrom,
        }),
    });

    const hoverStart = debounce(
        () => {
            if (isHovered) return;
            setIsHovered(true);

            animate(
                ".letter",
                { y: reverse ? "100%" : "-120%" },
                mergeTransition(transition)
            );

            animate(
                ".letter-secondary",
                {
                    top: "0%",
                },
                mergeTransition(transition)
            );
        },
        100,
        { leading: true, trailing: true }
    );

    const hoverEnd = debounce(
        () => {
            setIsHovered(false);

            animate(
                ".letter",
                {
                    y: 0,
                },
                mergeTransition(transition)
            );

            animate(
                ".letter-secondary",
                {
                    top: reverse ? "-100%" : "120%",
                },
                mergeTransition(transition)
            );
        },
        100,
        { leading: true, trailing: true }
    );

    return (
        <motion.span
            className={`flex items-center relative overflow-hidden  ${className} `}
            onHoverStart={hoverStart}
            onHoverEnd={hoverEnd}
            onClick={onClick}
            ref={scope}
            {...props}
        >
            <span className="sr-only">{label}</span>

            {label.split("").map((letter: string, i: number) => {
                return (
                    <span
                        className="whitespace-pre relative overflow-hidden flex"
                        key={i}
                        aria-hidden={true}
                    >
                        <motion.span
                            className={`relative letter`}
                            style={{ top: 0 }}
                        >
                            {letter}
                        </motion.span>
                        <motion.span
                            className="absolute letter-secondary mt-2"
                            style={{ top: reverse ? "-100%" : "120%" }}
                        >
                            {letter}
                        </motion.span>
                    </span>
                );
            })}
        </motion.span>
    );
};

export default LetterSwapPingPong;
