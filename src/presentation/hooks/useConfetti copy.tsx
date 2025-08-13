import { useState } from 'react';
// import Confetti from 'react-confetti';

const useConfetti = (duration : number) => {
  const [isConfettiActive, setConfettiActive] = useState(false);

  const activateConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => {
      setConfettiActive(false);
    }, duration);
  };

  return { isConfettiActive, activateConfetti };
};

export default useConfetti;