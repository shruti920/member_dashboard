'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Typewriter = ({
  texts = ['Build.', 'Design.', 'Lead.'],
  speed = 100,
  delayBetween = 2000,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[currentTextIndex];
    let timeout;

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, speed / 2);
      }
    } else {
      if (displayText === currentText) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delayBetween);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(
            currentText.slice(0, displayText.length + 1)
          );
        }, speed);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isDeleting, texts, speed, delayBetween]);

  return (
    <motion.div
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-[#F5C518] font-bold">
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="ml-1 inline-block w-1 h-6 bg-[#F5C518]"
        />
      </span>
    </motion.div>
  );
};

export default Typewriter;
