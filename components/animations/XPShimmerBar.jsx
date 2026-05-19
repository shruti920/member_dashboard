'use client';

import { motion } from 'framer-motion';

const XPShimmerBar = ({
  current = 1500,
  total = 5000,
  className = '',
  showLabel = true,
}) => {
  const percentage = (current / total) * 100;

  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: {
      x: '100%',
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      },
    },
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-2">
          <span className="text-sm text-[#888888]">XP Progress</span>
          <span className="text-sm text-[#F5C518] font-bold">
            {current} / {total}
          </span>
        </div>
      )}

      <div className="w-full h-8 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] overflow-hidden relative">
        {/* Background bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-[#F5C518] to-[#C4A000] rounded-lg"
          initial={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {/* Shimmer overlay */}
        <motion.div
          className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
        />

        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-[#000000] mix-blend-multiply">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default XPShimmerBar;
