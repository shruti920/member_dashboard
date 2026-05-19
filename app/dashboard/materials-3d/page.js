'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import FlipCard from '@/components/3d/FlipCard';
import { motion } from 'framer-motion';

const sampleMaterials = [
  {
    id: 1,
    front: {
      title: 'React Basics',
      description: 'Learn fundamental concepts',
    },
    back: {
      content: 'React is a JavaScript library for building user interfaces with reusable components and efficient state management.',
    },
  },
  {
    id: 2,
    front: {
      title: 'JavaScript Async',
      description: 'Master async operations',
    },
    back: {
      content: 'Async/await, promises, and callbacks are essential patterns for handling asynchronous operations in JavaScript.',
    },
  },
  {
    id: 3,
    front: {
      title: 'CSS Grid Layout',
      description: 'Modern layout techniques',
    },
    back: {
      content: 'CSS Grid provides a powerful two-dimensional layout system for creating complex responsive designs efficiently.',
    },
  },
  {
    id: 4,
    front: {
      title: 'TypeScript Types',
      description: 'Static type checking',
    },
    back: {
      content: 'TypeScript adds static typing to JavaScript, enabling better IDE support, error detection, and code maintainability.',
    },
  },
];

export default function Materials3DPage() {
  const { user } = useAuth();
  const [materials, setMaterials] = useState([]);
  const [flipped, setFlipped] = useState({});

  useEffect(() => {
    // Use sample materials (in production, fetch from API)
    setMaterials(sampleMaterials);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[#5f6a57]">Please log in to view materials</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-[#f9faf8] to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-[#2d5016] mb-2">Learning Materials</h1>
          <p className="text-[#5f6a57] text-lg">Click cards to reveal detailed content</p>
        </motion.div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {materials.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex justify-center"
            >
              <FlipCard
                front={material.front}
                back={material.back}
                onFlip={(isFlipped) => {
                  setFlipped((prev) => ({
                    ...prev,
                    [material.id]: isFlipped,
                  }));
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-[#e8ebe4] p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold text-[#2d5016] mb-6">Your Learning Progress</h2>
          <div className="space-y-4">
            {[
              { topic: 'React Fundamentals', progress: 80 },
              { topic: 'JavaScript Advanced', progress: 60 },
              { topic: 'CSS & Design Systems', progress: 45 },
              { topic: 'TypeScript', progress: 70 },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="min-w-40 text-[#2d5016] font-medium">{item.topic}</span>
                <div className="flex-1 h-2 bg-[#e8ebe4] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.progress}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    className="h-full bg-linear-to-r from-[#2d5016] to-[#5a7d3e] rounded-full"
                  />
                </div>
                <span className="text-[#5f6a57] font-medium min-w-12">{item.progress}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
