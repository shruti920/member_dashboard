'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiCelebration = ({ trigger = false, autoTrigger = false }) => {
  useEffect(() => {
    if (trigger || autoTrigger) {
      const duration = 2000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min, max) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        // Yellow and white particles
        confetti({
          particleCount: 40,
          angle: randomInRange(55, 125),
          spread: randomInRange(50, 70),
          origin: { x: 0.5, y: 0.5 },
          colors: ['#F5C518', '#FFFFFF', '#C4A000'],
          velocity: randomInRange(50, 100),
          decay: 0.95,
          scalar: 1.2,
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [trigger, autoTrigger]);

  return null;
};

export default ConfettiCelebration;
