import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// Style importation
import "./band.scss";
import { ScrollTrigger } from "gsap/all";

function Band() {
    const animateRef = useRef();

    gsap.registerPlugin(ScrollTrigger);
    useEffect(() => {
        const bannerAnimate = gsap.context(() => {
            gsap.to(".marquee", {
                opacity: 1,
                delay: 0,
            });
            const timeline = gsap.timeline();
            timeline.to(".marquee-wrapper", {
                x: -5000,
                ease: "sine.inOut",
                duration: 1,
            });
            ScrollTrigger.create({
                animation: timeline,
                scrub: 3,
                start: "top center",
            });
        });
    }, animateRef);

    return (
        <div className="marquee bg-violet-700" ref={animateRef}>
            <h3>
                <div className="marquee-wrapper">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="marquee-title">
                            / Explorez{" "}
                            <span className="text-stroke-black">Créez</span>
                            &amp; Construisez des choses incroyables.
                            <span className="text-stroke-black">" Innovez </span> /
                            avec NovaWorld.
                        </div>
                    ))}
                </div>
            </h3>
        </div>
    );
}

export default Band;
