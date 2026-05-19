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

const StaggeredList = ({ items }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      {items.map((item, idx) => (
        <motion.div key={idx} variants={itemVariants}>
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function MentorSubmissions() {
  const submissions = [
    { id: 1, student: 'Arjun Sharma', task: 'React Hooks Advanced', status: 'pending', date: '2 hours ago' },
    { id: 2, student: 'Priya Singh', task: 'State Management', status: 'approved', date: '1 day ago' },
    { id: 3, student: 'Rohan Patel', task: 'API Integration', status: 'pending', date: '5 hours ago' },
    { id: 4, student: 'Meera Gupta', task: 'Database Design', status: 'rejected', date: '2 days ago' },
    { id: 5, student: 'Vikas Kumar', task: 'Performance Optimization', status: 'approved', date: '3 days ago' },
    { id: 6, student: 'Sneha Reddy', task: 'Testing Strategies', status: 'pending', date: '1 hour ago' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-900 text-green-200';
      case 'pending':
        return 'bg-yellow-900 text-[#F5C518]';
      case 'rejected':
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
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-[#F5C518] mb-2">Submissions</h1>
        <p className="text-[#888888]">Review student submissions and provide feedback</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#2A2A2A] border-b border-[#2A2A2A]">
                <th className="px-6 py-4 text-left text-[#F5C518] font-semibold">Student</th>
                <th className="px-6 py-4 text-left text-[#F5C518] font-semibold">Task</th>
                <th className="px-6 py-4 text-left text-[#F5C518] font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-[#F5C518] font-semibold">Date</th>
                <th className="px-6 py-4 text-left text-[#F5C518] font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              <StaggeredList
                items={submissions.map((sub) => (
                  <motion.tr
                    key={sub.id}
                    whileHover={{ backgroundColor: '#1A2A1A' }}
                    className="border-b border-[#2A2A2A] hover:bg-[#2A2A2A] transition-all"
                  >
                    <td className="px-6 py-4 text-[#F5C518] font-medium">{sub.student}</td>
                    <td className="px-6 py-4 text-[#888888]">{sub.task}</td>
                    <td className="px-6 py-4">
                      <span className={\px-3 py-1 rounded-full text-xs font-semibold \\}>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#888888]">{sub.date}</td>
                    <td className="px-6 py-4">
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: '#F5C518' }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-[#C4A000] text-[#0F0F0F] rounded font-semibold text-sm transition-all"
                      >
                        Review
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              />
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
