'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AnimatedCounter = ({
  from = 0,
  to = 100,
  duration = 2,
  decimals = 0,
  className = '',
}) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startValue = from;
    const endValue = to;
    const totalDuration = duration * 1000;
    const increment = (endValue - startValue) / (totalDuration / 16);

    const timer = setInterval(() => {
      startValue += increment;

      if (increment > 0 && startValue >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else if (increment < 0 && startValue <= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.round(startValue * Math.pow(10, decimals)) / Math.pow(10, decimals));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [from, to, duration, decimals]);

  return (
    <motion.span
      className={`text-[#F5C518] font-bold ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {count.toFixed(decimals)}
    </motion.span>
  );
};

export default AnimatedCounter;
