'use client';

import { BookOpen, CheckCircle, Clock, FileText } from 'lucide-react';

export default function MentorPanelPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#2d5016] mb-2">Mentor Dashboard</h1>
        <p className="text-[#5f6a57]">Manage tasks, review submissions, and guide learners</p>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Students Guided', value: '24', color: 'bg-[#2d5016]' },
          { label: 'Pending Reviews', value: '8', color: 'bg-[#5a7d3e]' },
          { label: 'Doubts Resolved', value: '156', color: 'bg-[#3d4635]' },
          { label: 'Avg Rating', value: '4.8/5', color: 'bg-[#2d5016]' },
        ].map((stat, i) => (
          <div key={i} className="card-green p-6">
            <p className="text-[#8a9285] text-sm font-medium mb-2">{stat.label}</p>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-[#2d5016]">{stat.value}</p>
              <div className={`${stat.color} w-12 h-12 rounded-lg`} />
            </div>
          </div>
        ))}
      </div>

      {/* Pending Submissions */}
      <div className="card-green p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#2d5016]">Pending Submissions</h2>
          <a href="#" className="text-[#2d5016] hover:text-[#5a7d3e] text-sm font-medium">
            View All →
          </a>
        </div>
        <div className="space-y-4">
          {[
            {
              student: 'Alice Johnson',
              task: 'Binary Search Trees',
              submittedAt: '2 hours ago',
              priority: 'high',
            },
            {
              student: 'Bob Smith',
              task: 'React Hooks Advanced',
              submittedAt: '5 hours ago',
              priority: 'normal',
            },
            {
              student: 'Carol Williams',
              task: 'REST API Design',
              submittedAt: '1 day ago',
              priority: 'high',
            },
          ].map((submission, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-[#f9faf8] rounded-lg border border-[#e8ebe4]">
              <div className="flex-1">
                <p className="font-bold text-[#2d5016]">{submission.student}</p>
                <p className="text-[#5f6a57] text-sm">{submission.task}</p>
                <p className="text-[#8a9285] text-xs mt-1">{submission.submittedAt}</p>
              </div>
              <div className="flex gap-2 items-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    submission.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {submission.priority.charAt(0).toUpperCase() + submission.priority.slice(1)}
                </span>
                <button className="btn-primary px-4 py-1 text-sm">Review</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Doubts Section */}
      <div className="card-green p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#2d5016]">Doubts Needing Review</h2>
          <a href="/mentor/doubts" className="text-[#2d5016] hover:text-[#5a7d3e] text-sm font-medium">
            View All →
          </a>
        </div>
        <div className="space-y-3">
          {[
            'How to optimize recursive algorithms?',
            'Best practices for component composition?',
            'Database indexing strategies?',
          ].map((doubt, i) => (
            <div key={i} className="p-3 bg-[#f9faf8] rounded-lg border border-[#e8ebe4]">
              <p className="text-[#2d5016] text-sm">{doubt}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-green p-6">
          <h3 className="text-lg font-bold text-[#2d5016] mb-4">Manage Content</h3>
          <div className="space-y-2">
            <button className="btn-primary w-full text-left py-2">+ Create New Task</button>
            <button className="btn-secondary w-full text-left py-2">Upload Materials</button>
            <button className="btn-secondary w-full text-left py-2">View My Tasks</button>
          </div>
        </div>
        <div className="card-green p-6">
          <h3 className="text-lg font-bold text-[#2d5016] mb-4">Review Work</h3>
          <div className="space-y-2">
            <button className="btn-primary w-full text-left py-2">Review Submissions</button>
            <button className="btn-secondary w-full text-left py-2">Answer Doubts</button>
            <button className="btn-secondary w-full text-left py-2">View Feedback History</button>
          </div>
        </div>
      </div>
    </div>
  );
}
