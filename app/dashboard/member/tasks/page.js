'use client';

import Link from 'next/link';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: 'Binary Search Trees Implementation',
    description: 'Implement a complete BST with insertion, deletion, and traversal',
    skill: 'DSA',
    week: 'Week 4',
    deadline: '2024-04-28',
    status: 'pending',
    points: 100,
  },
  {
    id: 2,
    title: 'React Hooks Deep Dive',
    description: 'Build a complex form component using custom hooks',
    skill: 'Frontend',
    week: 'Week 4',
    deadline: '2024-04-25',
    status: 'submitted',
    points: 100,
    score: 92,
  },
  {
    id: 3,
    title: 'REST API Development',
    description: 'Create a RESTful API with authentication and error handling',
    skill: 'Backend',
    week: 'Week 3',
    deadline: '2024-04-18',
    status: 'completed',
    points: 100,
    score: 85,
  },
  {
    id: 4,
    title: 'Unit Testing with Jest',
    description: 'Write comprehensive unit tests for a utility library',
    skill: 'Testing',
    week: 'Week 3',
    deadline: '2024-04-18',
    status: 'submitted',
    points: 80,
    score: 88,
  },
];

export default function MemberTasksPage() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'submitted':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} />;
      case 'submitted':
        return <Clock size={16} />;
      case 'pending':
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#2d5016] mb-2">My Tasks</h1>
        <p className="text-[#5f6a57]">Complete weekly tasks and improve your skills</p>
      </div>

      {/* Filter & Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select className="flex-1 px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Submitted</option>
          <option>Completed</option>
        </select>
        <select className="flex-1 px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
          <option>All Skills</option>
          <option>DSA</option>
          <option>Frontend</option>
          <option>Backend</option>
          <option>Testing</option>
        </select>
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="card-green p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#2d5016] mb-2">{task.title}</h3>
                    <p className="text-[#5f6a57] mb-3">{task.description}</p>
                    <div className="flex flex-wrap gap-3 items-center">
                      <span className="inline-block px-3 py-1 bg-[#f3f5f1] text-[#2d5016] text-xs font-medium rounded-full">
                        {task.skill}
                      </span>
                      <span className="inline-block px-3 py-1 bg-[#f3f5f1] text-[#2d5016] text-xs font-medium rounded-full">
                        {task.week}
                      </span>
                      <span className="inline-block px-3 py-1 bg-[#f3f5f1] text-[#2d5016] text-xs font-medium rounded-full">
                        {task.points} pts
                      </span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 border rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusIcon(task.status)}
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between">
                {task.score && (
                  <div className="text-right mb-3">
                    <p className="text-[#8a9285] text-sm">Your Score</p>
                    <p className="text-2xl font-bold text-[#2d5016]">{task.score}/100</p>
                  </div>
                )}
                <Link
                  href={`#`}
                  className="btn-primary px-6 py-2 text-sm whitespace-nowrap"
                >
                  {task.status === 'pending' ? 'Submit Now' : 'View Details'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Example */}
      <div className="text-center py-8">
        <p className="text-[#8a9285]">Load more tasks</p>
      </div>
    </div>
  );
}
