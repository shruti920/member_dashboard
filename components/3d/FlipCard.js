'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FlipCard = ({ front, back, onFlip }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    if (onFlip) onFlip(!isFlipped);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="h-72 w-64 cursor-pointer"
      style={{ perspective: 1000 }}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front side */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-[#2d5016] to-[#5a7d3e] rounded-xl shadow-lg p-6 flex flex-col justify-between"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-white">
            <h3 className="text-xl font-bold mb-2">{front.title}</h3>
            <p className="text-sm text-[#f9faf8] opacity-90">{front.description}</p>
          </div>
          <div className="text-white text-xs opacity-70">Click to flip</div>
        </div>

        {/* Back side */}
        <div
          className="absolute w-full h-full bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between border-2 border-[#2d5016]"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div>
            <h4 className="text-[#2d5016] font-bold mb-3 text-sm">Content:</h4>
            <p className="text-gray-700 text-sm leading-relaxed">{back.content}</p>
          </div>
          <div className="text-[#2d5016] text-xs opacity-60">Click to flip back</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard;

