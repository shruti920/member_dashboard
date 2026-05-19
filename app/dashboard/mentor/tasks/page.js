'use client';

import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: 'Binary Search Trees Implementation',
    skill: 'DSA',
    week: 'Week 4',
    submissions: 42,
    avgScore: 82,
    status: 'active',
  },
  {
    id: 2,
    title: 'React Hooks Deep Dive',
    skill: 'Frontend',
    week: 'Week 4',
    submissions: 38,
    avgScore: 88,
    status: 'active',
  },
  {
    id: 3,
    title: 'REST API Development',
    skill: 'Backend',
    week: 'Week 3',
    submissions: 35,
    avgScore: 85,
    status: 'completed',
  },
];

export default function MentorTasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#2d5016] mb-2">My Tasks</h1>
          <p className="text-[#5f6a57]">Create and manage learning tasks for your students</p>
        </div>
        <Link href="/mentor/tasks/create" className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Create Task
        </Link>
      </div>

      {/* Filter */}
      <select className="px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
        <option>All Status</option>
        <option>Active</option>
        <option>Completed</option>
        <option>Archived</option>
      </select>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="card-green p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#2d5016] mb-2">{task.title}</h3>
                <div className="flex flex-wrap gap-2 items-center mb-3">
                  <span className="px-3 py-1 bg-[#f3f5f1] text-[#2d5016] text-xs font-medium rounded-full">
                    {task.skill}
                  </span>
                  <span className="px-3 py-1 bg-[#f3f5f1] text-[#2d5016] text-xs font-medium rounded-full">
                    {task.week}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      task.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[#8a9285] text-xs font-medium mb-1">Submissions</p>
                    <p className="text-[#2d5016] font-bold">{task.submissions}</p>
                  </div>
                  <div>
                    <p className="text-[#8a9285] text-xs font-medium mb-1">Avg Score</p>
                    <p className="text-[#2d5016] font-bold">{task.avgScore}%</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-[#e8ebe4] rounded-lg text-[#2d5016]" title="Edit">
                  <Edit size={20} />
                </button>
                <button className="p-2 hover:bg-[#e8ebe4] rounded-lg text-red-600" title="Delete">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
