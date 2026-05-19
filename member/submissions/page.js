'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FloatingParticles = () => {
  const particles = Array.from({ length: 10 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: \gba(245, 197, 24, \)\,
            left: \\%\,
            top: \\%\,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default function MemberSubmissions() {
  const submissions = [
    { id: 1, task: 'React Hooks Advanced', status: 'submitted', score: 85, feedback: 'Good work' },
    { id: 2, task: 'State Management', status: 'reviewing', score: null, feedback: 'Under review' },
    { id: 3, task: 'API Integration', status: 'submitted', score: 92, feedback: 'Excellent' },
    { id: 4, task: 'Database Design', status: 'draft', score: null, feedback: 'Not yet submitted' },
    { id: 5, task: 'Performance Optimization', status: 'submitted', score: 78, feedback: 'Needs improvement' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-900 text-green-200';
      case 'reviewing':
        return 'bg-yellow-900 text-[#F5C518]';
      case 'draft':
        return 'bg-gray-700 text-[#888888]';
      default:
        return 'bg-gray-700 text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white p-8 relative">
      <FloatingParticles />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-[#F5C518] mb-2">My Submissions</h1>
        <p className="text-[#888888]">Track your task submissions and scores</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6"
      >
        {submissions.map((sub, idx) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02, borderColor: '#F5C518' }}
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6 hover:shadow-lg hover:shadow-[#F5C518]/20 transition-all"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-[#F5C518]">{sub.task}</h3>
                <p className="text-[#888888] text-sm mt-1">{sub.feedback}</p>
              </div>
              <span className={\px-3 py-1 rounded-full text-xs font-semibold \\}>
                {sub.status}
              </span>
            </div>
            {sub.score !== null ? (
              <div className="flex justify-between items-center">
                <span className="text-[#888888]">Your Score</span>
                <span className="text-2xl font-bold text-[#F5C518]">{sub.score}</span>
              </div>
            ) : (
              <div className="text-[#888888]">Awaiting feedback...</div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
