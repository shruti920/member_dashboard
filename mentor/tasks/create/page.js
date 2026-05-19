'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CreateTask() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'Medium',
    dueDate: '',
    maxScore: 100,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task created:', formData);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-[#F5C518] mb-2">Create New Task</h1>
        <p className="text-[#888888]">Add a new task for your students</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-2xl mx-auto bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[#F5C518] font-semibold mb-2">Task Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:border-[#F5C518] outline-none transition-all"
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label className="block text-[#F5C518] font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:border-[#F5C518] outline-none transition-all"
              placeholder="Enter task description"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#F5C518] font-semibold mb-2">Difficulty</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:border-[#F5C518] outline-none transition-all"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-[#F5C518] font-semibold mb-2">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:border-[#F5C518] outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#F5C518] font-semibold mb-2">Max Score</label>
            <input
              type="number"
              name="maxScore"
              value={formData.maxScore}
              onChange={handleChange}
              className="w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-lg px-4 py-3 text-white focus:border-[#F5C518] outline-none transition-all"
              min="1"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: '#C4A000' }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="flex-1 bg-[#F5C518] text-[#0F0F0F] font-bold py-3 rounded-lg transition-all"
            >
              Create Task
            </motion.button>
            <Link href="/mentor/tasks" className="flex-1">
              <motion.button
                whileHover={{ scale: 1.05, borderColor: '#F5C518' }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="w-full border border-[#2A2A2A] text-[#F5C518] font-bold py-3 rounded-lg hover:bg-[#2A2A2A] transition-all"
              >
                Cancel
              </motion.button>
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
