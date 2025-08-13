import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/core/utils/tmerge";

interface InteractiveHoverButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const InteractiveHoverButton = React.forwardRef<
    HTMLButtonElement,
    InteractiveHoverButtonProps
>(({ children, className, ...props }, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                "group relative w-auto cursor-pointer  text-slate-700 rounded-full p-2 px-6 text-center text-sm shadow-2xs hover:shadow-2xs overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:rounded-full transition duration-100 ",
                className
            )}
            {...props}
        >
            <div className="flex items-center gap-2">
                <div className="h-2 w-2 z-10 rounded-full bg-[rgb(120,105,190)] transition-all duration-300 group-hover:scale-[100.8]"></div>
                <span className="inline-block z-10 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                    {children}
                </span>
                <div className="h-2 w-2 rounded-full bg-white backdrop-blur-sm bg-opacity-50 z-5 scale-[100.8]"></div>
            </div>
            <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
                <span>{children}</span>
                <ArrowRight />
            </div>
        </button>
    );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
