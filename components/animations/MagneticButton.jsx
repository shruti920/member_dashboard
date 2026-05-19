'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const MagneticButton = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  magneticRange = 40,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [magneticPosition, setMagneticPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!isHovered || !buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distance = Math.sqrt(
      Math.pow(mouseX - centerX, 2) + Math.pow(mouseY - centerY, 2)
    );

    if (distance < magneticRange) {
      setMagneticPosition({
        x: (mouseX - centerX) * 0.3,
        y: (mouseY - centerY) * 0.3,
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMagneticPosition({ x: 0, y: 0 });
  };

  const primaryClass =
    'bg-[#F5C518] text-[#000000] hover:bg-[#C4A000]';
  const secondaryClass =
    'bg-[#1A1A1A] text-[#F5C518] hover:bg-[#2A2A2A] border border-[#F5C518]';

  const variantClass = variant === 'primary' ? primaryClass : secondaryClass;

  return (
    <motion.button
      ref={buttonRef}
      className={`px-6 py-2 rounded-lg font-medium relative overflow-hidden transition-all ${variantClass} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: magneticPosition.x,
        y: magneticPosition.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
      }}
      onClick={onClick}
    >
      {/* Fill swipe effect on click */}
      <motion.div
        className="absolute inset-0 bg-[#F5C518] opacity-0"
        initial={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        style={{ originX: 0 }}
        transition={{ duration: 0.3 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

export default MagneticButton;
