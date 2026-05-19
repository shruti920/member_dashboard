'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CreateTaskPage() {
  return (
    <div className="space-y-6">
      <Link href="/mentor/tasks" className="flex items-center gap-2 text-[#2d5016] hover:text-[#5a7d3e] font-medium">
        <ArrowLeft size={20} />
        Back to Tasks
      </Link>

      <div>
        <h1 className="text-4xl font-bold text-[#2d5016] mb-2">Create New Task</h1>
        <p className="text-[#5f6a57]">Design a learning task for your students</p>
      </div>

      <form className="card-green p-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-[#2d5016] mb-2">Task Title</label>
          <input
            type="text"
            placeholder="e.g., Binary Search Trees Implementation"
            className="w-full px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] placeholder-[#8a9285] focus:outline-none focus:border-[#2d5016]"
          />
        </div>

        {/* Skill & Week */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#2d5016] mb-2">Skill Category</label>
            <select className="w-full px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
              <option>Select Skill</option>
              <option>DSA</option>
              <option>Frontend</option>
              <option>Backend</option>
              <option>Testing</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2d5016] mb-2">Week Number</label>
            <select className="w-full px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
              <option>Week 1</option>
              <option>Week 2</option>
              <option>Week 3</option>
              <option>Week 4</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#2d5016] mb-2">Task Description</label>
          <textarea
            placeholder="Describe the task requirements, objectives, and expected outcomes..."
            className="w-full px-4 py-3 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] placeholder-[#8a9285] focus:outline-none focus:border-[#2d5016] resize-none min-h-32"
          />
        </div>

        {/* Points & Deadline */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#2d5016] mb-2">Points</label>
            <input
              type="number"
              placeholder="100"
              className="w-full px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#2d5016] mb-2">Deadline</label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]"
            />
          </div>
        </div>

        {/* Sample Solution */}
        <div>
          <label className="block text-sm font-medium text-[#2d5016] mb-2">Sample Solution (Optional)</label>
          <textarea
            placeholder="Provide a reference solution for evaluating student submissions..."
            className="w-full px-4 py-3 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] placeholder-[#8a9285] focus:outline-none focus:border-[#2d5016] resize-none min-h-24 font-mono text-sm"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button type="submit" className="btn-primary px-6 py-2">
            Create Task
          </button>
          <Link href="/mentor/tasks" className="btn-secondary px-6 py-2">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
