'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import SwipeCard from '@/components/3d/SwipeCard';
import { motion } from 'framer-motion';

export default function Tasks3DPage() {
  const { user, profile } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [accepted, setAccepted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('/api/tasks');
        const data = await response.json();
        setTasks(data || []);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleSwipe = (card) => {
    setAccepted([...accepted, card]);
    setCurrentIndex(currentIndex + 1);
  };

  const handlePass = (card) => {
    setCurrentIndex(currentIndex + 1);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[#5f6a57]">Please log in to view tasks</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#e8ebe4] border-t-[#2d5016] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#5f6a57]">Loading tasks...</p>
        </div>
      </div>
    );
  }

  const currentTask = tasks[currentIndex];

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#f9faf8] to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#2d5016] mb-2">Interactive Tasks</h1>
          <p className="text-[#5f6a57]">Drag right to accept, left to skip</p>
          <div className="mt-4 flex justify-center gap-2">
            <span className="px-4 py-2 bg-[#2d5016] text-white rounded-full text-sm font-medium">
              {currentIndex + 1}/{tasks.length}
            </span>
            <span className="px-4 py-2 bg-[#5a7d3e] text-white rounded-full text-sm font-medium">
              {accepted.length} Accepted
            </span>
          </div>
        </div>

        {/* Card Area */}
        {currentTask ? (
          <div className="relative h-96 mb-12">
            <SwipeCard
              card={currentTask}
              onSwipe={handleSwipe}
              onPass={handlePass}
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-white rounded-2xl border border-[#e8ebe4] shadow-sm"
          >
            <div className="mb-4 text-5xl">🎉</div>
            <h2 className="text-2xl font-bold text-[#2d5016] mb-2">All Done!</h2>
            <p className="text-[#5f6a57] mb-6">You&apos;ve reviewed all available tasks</p>
            <button
              onClick={() => setCurrentIndex(0)}
              className="px-6 py-2 bg-[#2d5016] text-white rounded-lg font-medium hover:bg-[#1a2f0b]"
            >
              Review Again
            </button>
          </motion.div>
        )}

        {/* Accepted Tasks */}
        {accepted.length > 0 && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-[#2d5016] mb-4">Your Accepted Tasks</h3>
            <div className="grid gap-3">
              {accepted.map((task) => (
                <div
                  key={task.id}
                  className="p-4 bg-white border-l-4 border-[#5a7d3e] rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <h4 className="font-medium text-[#2d5016]">{task.title}</h4>
                  <p className="text-sm text-[#5f6a57] mt-1">{task.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
