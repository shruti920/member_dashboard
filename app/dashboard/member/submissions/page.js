'use client';

import { CheckCircle, Clock } from 'lucide-react';

const submissions = [
  {
    id: 1,
    taskTitle: 'React Hooks Deep Dive',
    skill: 'Frontend',
    submittedAt: '2024-04-24 10:30 AM',
    score: 92,
    feedback: 'Great implementation! Your use of useContext is excellent.',
    status: 'reviewed',
  },
  {
    id: 2,
    taskTitle: 'REST API Development',
    skill: 'Backend',
    submittedAt: '2024-04-18 03:45 PM',
    score: 85,
    feedback: 'Good error handling. Consider adding request validation.',
    status: 'reviewed',
  },
  {
    id: 3,
    taskTitle: 'Unit Testing with Jest',
    skill: 'Testing',
    submittedAt: '2024-04-17 11:20 AM',
    score: 88,
    feedback: 'Excellent test coverage. Well-structured test suite.',
    status: 'reviewed',
  },
  {
    id: 4,
    taskTitle: 'Binary Search Trees Implementation',
    skill: 'DSA',
    submittedAt: '2024-04-16 09:15 AM',
    score: null,
    feedback: null,
    status: 'pending',
  },
];

export default function MemberSubmissionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#f5c18] mb-2">My Submissions</h1>
        <p className="text-[#5f6a57]">Track your submitted tasks and feedback</p>
      </div>

      {/* Submission Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Total Submissions', value: '12', color: 'bg-[#2d5016]' },
          { label: 'Average Score', value: '88.5', color: 'bg-[#5a7d3e]' },
          { label: 'Pending Review', value: '1', color: 'bg-[#3d4635]' },
        ].map((stat, i) => (
          <div key={i} className="card-green p-6">
            <p className="text-[#f9fff5] text-sm font-medium mb-2">{stat.label}</p>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-[#e0e3de]">{stat.value}</p>
              <div className={`${stat.color} w-12 h-12 rounded-lg`} />
            </div>
          </div>
        ))}
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.map((submission) => (
          <div key={submission.id} className="card-green p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold text-[#2d5016]">{submission.taskTitle}</h3>
                  {submission.status === 'reviewed' ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <Clock size={20} className="text-yellow-600" />
                  )}
                </div>
                <p className="text-[#8a9285] text-sm mb-3">
                  Submitted on {submission.submittedAt}
                </p>
                <div className="flex gap-2 items-center mb-3">
                  <span className="px-3 py-1 bg-[#f3f5f1] text-[#2d5016] text-xs font-medium rounded-full">
                    {submission.skill}
                  </span>
                </div>
                {submission.feedback && (
                  <div className="bg-[#f9faf8] p-4 rounded-lg border border-[#e8ebe4]">
                    <p className="text-sm font-medium text-[#2d5016] mb-1">Mentor Feedback</p>
                    <p className="text-[#5f6a57] text-sm">{submission.feedback}</p>
                  </div>
                )}
              </div>
              {submission.score && (
                <div className="text-right md:min-w-fit">
                  <p className="text-[#8a9285] text-sm font-medium mb-1">Score</p>
                  <p className="text-4xl font-bold text-[#2d5016]">{submission.score}</p>
                  <p className="text-[#8a9285] text-sm">out of 100</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
