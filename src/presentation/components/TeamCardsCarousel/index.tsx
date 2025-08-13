"use client";
import React, {
    useEffect,
    useRef,
    useState,
    createContext,
    useContext,
} from "react";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeft, ChevronRight, Code, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/core/utils/tmerge";
import { useOutsideClick } from "@/presentation/hooks/use-outside-click";
import { Image } from "@heroui/image";

interface CarouselProps {
    items: JSX.Element[];
    initialScroll?: number;
}

type Card = {
    description: string;
    imgsrc: string;
    skills: string[];
    title: string;
    content: React.ReactNode;
};

export const CarouselContext = createContext<{
    onCardClose: (index: number) => void;
    currentIndex: number;
}>({
    onCardClose: () => {},
    currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = initialScroll;
            checkScrollability();
        }
    }, [initialScroll]);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } =
                carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const handleCardClose = (index: number) => {
        if (carouselRef.current) {
            const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
            const gap = isMobile() ? 4 : 8;
            const scrollPosition = (cardWidth + gap) * (index + 1);
            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            });
            setCurrentIndex(index);
        }
    };

    const isMobile = () => {
        return window && window.innerWidth < 768;
    };

    return (
        <CarouselContext.Provider
            value={{ onCardClose: handleCardClose, currentIndex }}
        >
            <div className="relative h-screen w-full">
                <div className="flex justify-end -mt-10 gap-2 mr-10">
                    <button
                        className="relative z-40 h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center disabled:opacity-50"
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                    >
                        <ChevronLeft className="h-4 w-4 text-slate-100" />
                    </button>
                    <button
                        className="relative z-40 h-10 w-10  rounded-full bg-slate-900 flex items-center justify-center disabled:opacity-50"
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                    >
                        <ChevronRight className="h-4 w-4 text-slate-100" />
                    </button>
                </div>

                <div
                    className="flex w-full overflow-x-scroll overscroll-x-auto py-2 md:py-8 scroll-smooth [scrollbar-width:none]"
                    ref={carouselRef}
                    onScroll={checkScrollability}
                >
                    <div
                        className={cn(
                            "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
                        )}
                    ></div>

                    <div
                        className={cn(
                            "flex flex-row justify-start gap-4 pl-4",
                            "max-w-7xl mx-auto"
                        )}
                    >
                        {items.map((item, index) => (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: 0.2 * index,
                                        ease: "easeOut",
                                        once: true,
                                    },
                                }}
                                key={"card" + index}
                                className="last:pr-[5%] md:last:pr-[33%]  rounded-3xl"
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </CarouselContext.Provider>
    );
};

export const Card = ({
    card,
    index,
    layout = false,
}: {
    card: Card;
    index: number;
    layout?: boolean;
}) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { onCardClose, currentIndex } = useContext(CarouselContext);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                handleClose();
            }
        }

        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    useOutsideClick(containerRef, () => handleClose());

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        onCardClose(index);
    };

    return (
        <>
            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 h-[60vhpx]  z-40 overflow-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            ref={containerRef}
                            layoutId={layout ? `card-${card.title}` : undefined}
                            className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit  z-[60] my-10 p-4 md:p-10 rounded-3xl font-sans relative"
                        >
                            <button
                                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-black dark:bg-white rounded-full flex items-center justify-center"
                                onClick={handleClose}
                            >
                                <XIcon className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
                            </button>
                            <motion.p
                                layoutId={
                                    layout
                                        ? `category-${card.title}`
                                        : undefined
                                }
                                className="text-base font-medium text-black dark:text-white"
                            >
                                {card.category}
                            </motion.p>
                            <motion.p
                                layoutId={
                                    layout ? `title-${card.title}` : undefined
                                }
                                className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white"
                            >
                                {card.title}
                            </motion.p>
                            <div className="py-10">{card.content}</div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                layoutId={layout ? `card-${card.title}` : undefined}
                onClick={handleOpen}
                className="rounded-3xl font-poppins bg-gray-400 bg-opacity-20 dark:text-white backdrop-blur-sm text-slate-800 hover:text-white hover:bg-lime-500 transition-colors duration-300 h-80 w-56 md:h-[63vh] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10"
            >
                {/* <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" /> */}
                <div className="relative z-10 p-8">
                    {/* <motion.p
                        layoutId={
                            layout ? `category-${card.ageGroup}` : undefined
                        }
                        className="text-sm md:text-base font-medium font-sans text-left"
                    >
                        {card.ageGroup}{" "}
                    </motion.p> */}

                    {/* Compétences sous forme de badges */}
                    <div className="flex justify-between">
                        <div className="flex flex-wrap gap-2 ">
                            {card.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="bg-white bg-opacity-65 text-slate-800 text-xs px-3 py-1 rounded-full group-hover:bg-white/20 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>

                        <div className="bg-slate-300 transition-colors peer-hover:bg-slate-800 rounded-full w-8 group-hover:bg-slate-800 hover:bg-slate-800 h-8 text-center align-middle flex justify-center flex-col items-center">
                            <Code className="w-4 h-4"/>
                        </div>
                    </div>
                    <motion.p
                        layoutId={layout ? `title-${card.title}` : undefined}
                        className=" text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-poppins mt-2"
                    >
                        {card.title} {/* Ex: "For kids" ou "For teens" */}
                    </motion.p>
                    <motion.p className=" text-sm mt-4 text-left">
                        {card.description}{" "}
                    </motion.p>
                    <button className="mt-6 flex items-center hover:shadow-sm  transition absolute rounded-full -bottom-[215px] left-[30px] bg-white bg-opacity-20 backdrop-blur-sm p-1 text-white font-medium hover:scale-110">
                        <span className="mr-2 px-2 group-hover:mr-7">
                            Read More
                        </span>
                        <span className="relative z-10 h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center disabled:opacity-50">
                            <ArrowRightIcon className="h-6 w-6 text-slate-800" />
                        </span>
                    </button>
                </div>
                <BlurImage src={card.imgsrc} alt={card.title} fill />
            </motion.button>
        </>
    );
};

export const BlurImage = ({
    height,
    width,
    src,
    className,
    alt,
    ...rest
}: ImageProps) => {
    const [isLoading, setLoading] = useState(true);
    return (
        <img
            className={cn(
                "transition duration-300 rounded-[40px] z-20",
                isLoading ? "blur-sm" : "blur-0",
                className
            )}
            onLoad={() => setLoading(false)}
            src={src}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            blurDataURL={typeof src === "string" ? src : undefined}
            alt={alt ? alt : "Background of a beautiful view"}
            {...rest}
        />
    );
};
