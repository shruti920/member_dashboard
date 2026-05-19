'use client';

import { MessageCircle, Send, CheckCircle, Clock } from 'lucide-react';

const doubts = [
  {
    id: 1,
    question: 'How to optimize binary search tree operations?',
    category: 'DSA',
    status: 'resolved',
    aiResponse: 'To optimize BST operations, ensure balanced insertion. Consider AVL trees or Red-Black trees for O(log n) guarantee.',
    mentorReview: true,
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    question: 'What\'s the difference between useEffect and useLayoutEffect?',
    category: 'Frontend',
    status: 'resolved',
    aiResponse: 'useEffect runs after render, useLayoutEffect runs before browser paint. Use useLayoutEffect for DOM mutations.',
    mentorReview: true,
    timestamp: '1 day ago',
  },
  {
    id: 3,
    question: 'Best practices for API error handling?',
    category: 'Backend',
    status: 'pending',
    aiResponse: 'Use consistent error codes, provide meaningful messages, log errors securely, and implement retry logic.',
    mentorReview: false,
    timestamp: '3 days ago',
  },
];

export default function DoubtsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#2d5016] mb-2">Ask Your Doubts</h1>
        <p className="text-[#5f6a57]">Get instant AI answers with mentor escalation when needed</p>
      </div>

      {/* Ask New Doubt */}
      <div className="card-green p-6">
        <h2 className="text-xl font-bold text-[#2d5016] mb-4">Ask a New Question</h2>
        <div className="space-y-4">
          <select className="w-full px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
            <option>Select Category</option>
            <option>DSA</option>
            <option>Frontend</option>
            <option>Backend</option>
            <option>Testing</option>
          </select>
          <textarea
            placeholder="Ask your question here..."
            className="w-full px-4 py-3 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] placeholder-[#8a9285] focus:outline-none focus:border-[#2d5016] resize-none min-h-24"
          />
          <button className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
            <Send size={18} />
            Ask AI
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-4">
        <select className="px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
          <option>All Categories</option>
          <option>DSA</option>
          <option>Frontend</option>
          <option>Backend</option>
        </select>
        <select className="px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
          <option>All Status</option>
          <option>Resolved</option>
          <option>Pending Review</option>
        </select>
      </div>

      {/* Doubts List */}
      <div className="space-y-4">
        {doubts.map((doubt) => (
          <div key={doubt.id} className="card-green p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-3">
                  <MessageCircle size={20} className="text-[#2d5016] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#2d5016] mb-2">{doubt.question}</h3>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="inline-block px-3 py-1 bg-[#f3f5f1] text-[#2d5016] text-xs font-medium rounded-full">
                        {doubt.category}
                      </span>
                      <span className="text-[#8a9285] text-sm">{doubt.timestamp}</span>
                      {doubt.status === 'resolved' ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                          <CheckCircle size={14} />
                          Resolved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-xs font-medium border border-yellow-200">
                          <Clock size={14} />
                          Pending Review
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Response */}
            <div className="bg-[#f9faf8] border border-[#e8ebe4] rounded-lg p-4 mb-4">
              <p className="text-[#8a9285] text-xs font-bold uppercase mb-2">🤖 AI Response</p>
              <p className="text-[#1a1e14]">{doubt.aiResponse}</p>
            </div>

            {/* Mentor Review Status */}
            {doubt.status === 'resolved' && doubt.mentorReview && (
              <div className="bg-[#f3f5f1] border border-[#2d5016]/20 rounded-lg p-3 mb-4">
                <p className="text-[#2d5016] text-sm">
                  ✅ <strong>Mentor Reviewed:</strong> Sarah confirmed the AI response is accurate.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button className="btn-secondary px-4 py-2 text-sm flex-1 sm:flex-none">
                View Full Response
              </button>
              {doubt.status === 'pending' && (
                <button className="btn-secondary px-4 py-2 text-sm flex-1 sm:flex-none">
                  Request Mentor Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
