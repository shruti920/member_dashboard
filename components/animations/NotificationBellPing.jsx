'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

const NotificationBellPing = ({ hasNotification = false, onClick }) => {
  const [showPing, setShowPing] = useState(hasNotification);

  useEffect(() => {
    setShowPing(hasNotification);
    if (hasNotification) {
      // Auto-hide ping after 5 seconds
      const timer = setTimeout(() => setShowPing(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [hasNotification]);

  const bellVariants = {
    initial: { rotate: 0 },
    ring: {
      rotate: [0, -15, 15, -15, 15, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
  };

  const pingVariants = {
    initial: { scale: 1, opacity: 0 },
    animate: {
      scale: [1.2, 1.8],
      opacity: [1, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      className="relative inline-block cursor-pointer"
      onClick={onClick}
    >
      {/* Ping effect */}
      {showPing && (
        <motion.div
          className="absolute -top-1 -right-1 w-6 h-6 bg-[#F5C518] rounded-full"
          variants={pingVariants}
          initial="initial"
          animate="animate"
        />
      )}

      {/* Bell icon */}
      <motion.div
        variants={bellVariants}
        animate={showPing ? 'ring' : 'initial'}
        style={{ transformOrigin: 'top center' }}
      >
        <Bell className="w-6 h-6 text-[#F5C518]" />
      </motion.div>

      {/* Notification dot */}
      {showPing && (
        <motion.div
          className="absolute top-0 right-0 w-3 h-3 bg-[#F5C518] rounded-full"
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(245, 197, 24, 0.7)',
              '0 0 0 6px rgba(245, 197, 24, 0.3)',
              '0 0 0 0 rgba(245, 197, 24, 0)',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
};

export default NotificationBellPing;
