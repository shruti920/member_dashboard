'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SwipeCard = ({ card, onSwipe, onPass }) => {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !ref.current) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    const rotation = deltaX * 0.1;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    ref.current.style.transform = `translateX(${deltaX}px) rotateY(${rotation}deg)`;
    ref.current.style.opacity = Math.max(0.5, 1 - distance / 200);
  };

  const handleMouseUp = (e) => {
    if (!isDragging || !ref.current) return;
    setIsDragging(false);

    const deltaX = e.clientX - dragStart.x;
    const distance = Math.abs(deltaX);

    if (distance > 100) {
      // Swipe detected
      const direction = deltaX > 0 ? 'right' : 'left';
      ref.current.style.transition = 'all 0.3s ease-out';

      if (direction === 'right') {
        ref.current.style.transform = 'translateX(500px) rotateY(20deg)';
        ref.current.style.opacity = '0';
        setTimeout(() => onSwipe(card), 300);
      } else {
        ref.current.style.transform = 'translateX(-500px) rotateY(-20deg)';
        ref.current.style.opacity = '0';
        setTimeout(() => onPass(card), 300);
      }
    } else {
      // Reset card
      ref.current.style.transition = 'all 0.3s ease-out';
      ref.current.style.transform = 'translateX(0) rotateY(0deg)';
      ref.current.style.opacity = '1';
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        if (isDragging) {
          handleMouseUp({ clientX: dragStart.x, clientY: dragStart.y });
        }
      }}
      className="absolute w-full h-full cursor-grab active:cursor-grabbing"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      <div
        className="w-full h-full bg-white rounded-2xl shadow-2xl p-8 border border-[#e8ebe4]"
        style={{
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#2d5016] mb-3">{card.title}</h3>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{card.description}</p>

            <div className="flex gap-2 mb-6 flex-wrap">
              <span className="px-3 py-1 bg-[#f3f5f1] text-[#2d5016] text-xs font-medium rounded-full">
                {card.category || 'General'}
              </span>
              <span className="px-3 py-1 bg-[#5a7d3e] text-white text-xs font-medium rounded-full">
                {card.difficulty || 'Medium'}
              </span>
              <span className="px-3 py-1 bg-[#f3f5f1] text-[#2d5016] text-xs font-medium rounded-full">
                {card.points || 10} pts
              </span>
            </div>

            {card.deadline && (
              <p className="text-xs text-gray-500">
                Deadline: {new Date(card.deadline).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="text-center text-xs text-gray-400 mt-6">
            Drag right to accept • Drag left to skip
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;

