'use client';

import { CheckCircle, Clock } from 'lucide-react';

export default function MentorSubmissionsPage() {
  const submissions = [
    {
      id: 1,
      student: 'Alice Johnson',
      task: 'Binary Search Trees',
      submittedAt: '2024-04-24 10:30 AM',
      status: 'pending',
    },
    {
      id: 2,
      student: 'Bob Smith',
      task: 'React Hooks',
      submittedAt: '2024-04-23 03:45 PM',
      status: 'reviewed',
      score: 92,
    },
    {
      id: 3,
      student: 'Carol Williams',
      task: 'REST API',
      submittedAt: '2024-04-22 11:20 AM',
      status: 'reviewed',
      score: 88,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#2d5016] mb-2">Submissions</h1>
        <p className="text-[#5f6a57]">Review and grade student submissions</p>
      </div>

      {/* Filter */}
      <div className="flex gap-4">
        <select className="flex-1 px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
          <option>All Status</option>
          <option>Pending Review</option>
          <option>Reviewed</option>
        </select>
        <input
          type="search"
          placeholder="Search student..."
          className="flex-1 px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] placeholder-[#8a9285] focus:outline-none focus:border-[#2d5016]"
        />
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.map((submission) => (
          <div key={submission.id} className="card-green p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-[#2d5016]">{submission.student}</h3>
                  {submission.status === 'reviewed' ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <Clock size={20} className="text-yellow-600" />
                  )}
                </div>
                <p className="text-[#5f6a57] text-sm mb-2">{submission.task}</p>
                <p className="text-[#8a9285] text-xs">Submitted {submission.submittedAt}</p>
              </div>
              {submission.status === 'reviewed' && submission.score && (
                <div className="text-right">
                  <p className="text-[#8a9285] text-sm font-medium mb-1">Score</p>
                  <p className="text-3xl font-bold text-[#2d5016]">{submission.score}/100</p>
                </div>
              )}
              <button className="btn-primary px-6 py-2 whitespace-nowrap">
                {submission.status === 'pending' ? 'Review' : 'Edit Review'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card-green p-6">
          <p className="text-[#8a9285] text-sm font-medium mb-2">Total Submissions</p>
          <p className="text-3xl font-bold text-[#2d5016]">148</p>
        </div>
        <div className="card-green p-6">
          <p className="text-[#8a9285] text-sm font-medium mb-2">Pending Review</p>
          <p className="text-3xl font-bold text-[#2d5016]">12</p>
        </div>
        <div className="card-green p-6">
          <p className="text-[#8a9285] text-sm font-medium mb-2">Avg Review Time</p>
          <p className="text-3xl font-bold text-[#2d5016]">4.2 hrs</p>
        </div>
      </div>
    </div>
  );
}
