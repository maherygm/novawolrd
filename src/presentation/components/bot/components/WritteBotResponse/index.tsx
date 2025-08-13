import { useEffect, useRef } from "react";
import "./style.scss";

interface WritterProps {
    textToWritte: string;
}

export function WrtitteResponse({ textToWritte }: WritterProps) {
    const writteContainer = useRef<HTMLParagraphElement | null>(null);
    const cursorRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const container = writteContainer.current;
        const cursor = cursorRef.current;

        const writte = (index: number = 0) => {
            if (index < textToWritte.length) {
                if (container) {
                    const span = document.createElement("span");
                    const char = textToWritte[index];

                    // Gérer explicitement les espaces
                    if (char === " ") {
                        span.innerHTML = "&nbsp;";
                    } else {
                        span.textContent = char;
                    }

                    span.className = "letter";
                    container.appendChild(span);

                    setTimeout(() => {
                        span.classList.add("visible");
                    }, 10); // Apparition rapide des lettres
                }
                setTimeout(() => {
                    writte(index + 1);
                }, 50); // Délai réduit entre les lettres
            } else {
                if (cursor) {
                    cursor.classList.add("blink");
                }
            }
        };

        if (container) {
            container.innerHTML = "";
        }
        if (cursor) {
            cursor.classList.remove("blink");
        }

        writte();
    }, [textToWritte]);

    return (
        <div className="writte-response">
            <p ref={writteContainer}></p>
            <span ref={cursorRef} className="cursor">|</span>
        </div>
    );
}
