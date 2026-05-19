'use client';

import { MessageCircle, CheckCircle } from 'lucide-react';

export default function MentorDoubtsPage() {
  const doubts = [
    {
      id: 1,
      student: 'Alice Johnson',
      question: 'How to optimize binary search tree operations?',
      category: 'DSA',
      aiResponse: true,
      needsReview: true,
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      student: 'Bob Smith',
      question: 'What\'s the difference between useEffect and useLayoutEffect?',
      category: 'Frontend',
      aiResponse: true,
      needsReview: false,
      timestamp: '1 day ago',
    },
    {
      id: 3,
      student: 'Carol Williams',
      question: 'Best practices for API error handling?',
      category: 'Backend',
      aiResponse: true,
      needsReview: true,
      timestamp: '3 days ago',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#2d5016] mb-2">Doubts</h1>
        <p className="text-[#5f6a57]">Review and confirm AI responses, or provide your expertise</p>
      </div>

      {/* Filter */}
      <div className="flex gap-4">
        <select className="flex-1 px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
          <option>All Categories</option>
          <option>DSA</option>
          <option>Frontend</option>
          <option>Backend</option>
        </select>
        <select className="flex-1 px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
          <option>Pending Review</option>
          <option>Reviewed</option>
          <option>All</option>
        </select>
      </div>

      {/* Doubts List */}
      <div className="space-y-4">
        {doubts.map((doubt) => (
          <div key={doubt.id} className="card-green p-6">
            <div className="mb-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold text-[#2d5016] mb-1">{doubt.student}</h3>
                  <p className="text-[#5f6a57]">{doubt.question}</p>
                </div>
                {doubt.needsReview && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium whitespace-nowrap ml-2">
                    Needs Review
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="px-3 py-1 bg-[#f3f5f1] text-[#2d5016] text-xs font-medium rounded-full">
                  {doubt.category}
                </span>
                <span className="text-[#8a9285] text-sm">{doubt.timestamp}</span>
              </div>
            </div>

            {doubt.aiResponse && (
              <div className="bg-[#f9faf8] border border-[#e8ebe4] rounded-lg p-4 mb-4">
                <p className="text-[#8a9285] text-xs font-bold uppercase mb-2">🤖 AI Response</p>
                <p className="text-[#1a1e14] text-sm">AI has provided an initial response. Please review for accuracy.</p>
              </div>
            )}

            <button className="btn-primary px-6 py-2">
              Review & Respond
            </button>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card-green p-6">
          <p className="text-[#8a9285] text-sm font-medium mb-2">Total Doubts</p>
          <p className="text-3xl font-bold text-[#2d5016]">87</p>
        </div>
        <div className="card-green p-6">
          <p className="text-[#8a9285] text-sm font-medium mb-2">Pending Review</p>
          <p className="text-3xl font-bold text-[#2d5016]">5</p>
        </div>
        <div className="card-green p-6">
          <p className="text-[#8a9285] text-sm font-medium mb-2">Resolved</p>
          <p className="text-3xl font-bold text-[#2d5016]">82</p>
        </div>
      </div>
    </div>
  );
}
