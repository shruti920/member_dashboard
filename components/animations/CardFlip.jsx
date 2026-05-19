'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const CardFlip = ({ front, back, className = '' }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipVariants = {
    front: {
      rotateY: 0,
      transition: { duration: 0.6 },
    },
    back: {
      rotateY: 180,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className={`w-full h-full cursor-pointer perspective ${className}`}
      onClick={() => setIsFlipped(!isFlipped)}
      initial="front"
      animate={isFlipped ? 'back' : 'front'}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative w-full h-full"
        variants={flipVariants}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <motion.div
          className="absolute w-full h-full p-6 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
        </motion.div>

        {/* Back */}
        <motion.div
          className="absolute w-full h-full p-6 bg-gradient-to-br from-[#F5C518] to-[#C4A000] border border-[#F5C518] rounded-lg flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="text-center text-[#000000]">
            {back}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CardFlip;
