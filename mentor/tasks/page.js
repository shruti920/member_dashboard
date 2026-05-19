'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const FloatingParticles = () => {
  const particles = Array.from({ length: 12 }, (_, i) => i);
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
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default function MentorTasks() {
  const tasks = [
    { id: 1, title: 'React Hooks Advanced', description: 'Master custom hooks and performance', difficulty: 'Hard', due: '2024-01-15', submissions: 8 },
    { id: 2, title: 'State Management', description: 'Explore Redux, Context API, and Zustand', difficulty: 'Medium', due: '2024-01-20', submissions: 12 },
    { id: 3, title: 'API Integration', description: 'REST APIs and error handling', difficulty: 'Medium', due: '2024-01-25', submissions: 5 },
    { id: 4, title: 'Database Design', description: 'SQL fundamentals and optimization', difficulty: 'Hard', due: '2024-02-01', submissions: 3 },
    { id: 5, title: 'Testing Strategies', description: 'Unit, Integration, E2E testing', difficulty: 'Medium', due: '2024-02-05', submissions: 7 },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-900 text-green-200';
      case 'Medium':
        return 'bg-yellow-900 text-[#F5C518]';
      case 'Hard':
        return 'bg-red-900 text-red-200';
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
        className="mb-8 flex justify-between items-center"
      >
        <div>
          <h1 className="text-4xl font-bold text-[#F5C518] mb-2">Tasks</h1>
          <p className="text-[#888888]">Manage and create tasks for students</p>
        </div>
        <Link href="/mentor/tasks/create">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#C4A000' }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#F5C518] text-[#0F0F0F] font-bold px-6 py-3 rounded-lg transition-all"
          >
            + Create Task
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6"
      >
        {tasks.map((task, idx) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02, borderColor: '#F5C518' }}
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6 hover:shadow-lg hover:shadow-[#F5C518]/20 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-[#F5C518]">{task.title}</h3>
                <p className="text-[#888888] text-sm mt-1">{task.description}</p>
              </div>
              <span className={\px-3 py-1 rounded-full text-xs font-semibold \\}>
                {task.difficulty}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-[#888888]">
              <span>Due: {task.due}</span>
              <span className="text-[#C4A000]">{task.submissions} submissions</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
