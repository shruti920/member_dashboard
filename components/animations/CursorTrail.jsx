'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorTrail = ({ enabled = true }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    if (!enabled) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });

      setTrail((prevTrail) => {
        const newTrail = [
          ...prevTrail,
          {
            id: Math.random(),
            x: clientX,
            y: clientY,
            timestamp: Date.now(),
          },
        ];

        // Keep only the last 15 trail points
        return newTrail.filter(
          (point) => Date.now() - point.timestamp < 500
        );
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [enabled]);

  return (
    <>
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed w-2 h-2 bg-[#F5C518] rounded-full pointer-events-none"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            left: point.x,
            top: point.y,
            boxShadow: '0 0 10px rgba(245, 197, 24, 0.6)',
          }}
        />
      ))}
    </>
  );
};

export default CursorTrail;
