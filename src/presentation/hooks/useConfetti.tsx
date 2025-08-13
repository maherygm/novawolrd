// hooks/useConfetti.ts
import confetti from "canvas-confetti";

const useConfetti = () => {
    const explodeConfetti = () => {
        confetti({
            particleCount: 100,
            spread:250,
            origin: { y: 0.6 },
        });
    };

    return { explodeConfetti };
};

export default useConfetti;
