'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const GlitchText = ({ text, trigger = 'click', className = '' }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  const handleTrigger = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 600);
  };

  const glitchVariants = {
    initial: { opacity: 1 },
    glitch: {
      opacity: [1, 0.8, 1, 0.8, 1],
      x: [-2, 2, -2, 2, 0],
    },
  };

  const glitchCharVariants = {
    initial: { opacity: 1 },
    glitch: {
      opacity: [0, 1, 0, 1, 1],
      x: [2, -2, 2, -2, 0],
    },
  };

  return (
    <motion.div
      className={`relative inline-block cursor-pointer ${className}`}
      onClick={handleTrigger}
      onHoverStart={() => trigger === 'hover' && handleTrigger()}
    >
      <motion.span
        className="relative z-10"
        variants={glitchVariants}
        initial="initial"
        animate={isGlitching ? 'glitch' : 'initial'}
        transition={{ duration: 0.6 }}
      >
        {text}
      </motion.span>

      {/* Red glitch layer */}
      <motion.span
        className="absolute top-0 left-0 text-red-500 opacity-0 z-20"
        variants={glitchCharVariants}
        initial="initial"
        animate={isGlitching ? 'glitch' : 'initial'}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        {text}
      </motion.span>

      {/* Cyan glitch layer */}
      <motion.span
        className="absolute top-0 left-0 text-cyan-400 opacity-0 z-20"
        variants={glitchCharVariants}
        initial="initial"
        animate={isGlitching ? 'glitch' : 'initial'}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {text}
      </motion.span>
    </motion.div>
  );
};

export default GlitchText;
