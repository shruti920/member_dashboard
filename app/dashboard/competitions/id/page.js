'use client';

import Link from 'next/link';
import { ArrowLeft, Trophy, Users, Calendar } from 'lucide-react';

export default function CompetitionDetailPage({ params }) {
  return (
    <div className="space-y-6">
      <Link href="/competitions" className="flex items-center gap-2 text-[#2d5016] hover:text-[#5a7d3e] font-medium">
        <ArrowLeft size={20} />
        Back to Competitions
      </Link>

      {/* Header */}
      <div className="card-green p-8">
        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-6">
          <div className="text-6xl">🏆</div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-[#2d5016] mb-2">React Masters 2024</h1>
            <p className="text-[#5f6a57] mb-4">Build advanced React applications with hooks and state management</p>
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
              🟢 Ongoing
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <p className="text-[#8a9285] text-sm font-medium mb-1">Duration</p>
            <div className="flex items-center gap-1 text-[#2d5016] font-bold">
              <Calendar size={18} />
              Apr 15 - Apr 30
            </div>
          </div>
          <div>
            <p className="text-[#8a9285] text-sm font-medium mb-1">Teams</p>
            <div className="flex items-center gap-1 text-[#2d5016] font-bold">
              <Users size={18} />
              45 / 100
            </div>
          </div>
          <div>
            <p className="text-[#8a9285] text-sm font-medium mb-1">Prize Pool</p>
            <p className="text-[#2d5016] font-bold">₹50,000</p>
          </div>
          <div>
            <p className="text-[#8a9285] text-sm font-medium mb-1">Max Team Size</p>
            <p className="text-[#2d5016] font-bold">4 Members</p>
          </div>
        </div>
      </div>

      {/* Tabs Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tasks */}
          <div className="card-green p-6">
            <h2 className="text-xl font-bold text-[#2d5016] mb-4">Competition Tasks</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Task 1: Build a Todo App',
                  points: 100,
                  submissions: 45,
                },
                {
                  title: 'Task 2: Advanced Form Handling',
                  points: 150,
                  submissions: 38,
                },
                {
                  title: 'Task 3: State Management Challenge',
                  points: 200,
                  submissions: 28,
                },
              ].map((task, i) => (
                <div key={i} className="p-4 bg-[#f9faf8] rounded-lg border border-[#e8ebe4]">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-[#2d5016]">{task.title}</p>
                      <p className="text-[#8a9285] text-sm mt-1">{task.submissions} team submissions</p>
                    </div>
                    <span className="px-3 py-1 bg-[#2d5016] text-white rounded-full text-sm font-bold">
                      {task.points} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="card-green p-6">
            <h2 className="text-xl font-bold text-[#2d5016] mb-4">About This Competition</h2>
            <p className="text-[#5f6a57] mb-4">
              React Masters is an exciting opportunity to showcase your advanced React skills. Build modern,
              performant applications using the latest React patterns and best practices.
            </p>
            <h3 className="font-bold text-[#2d5016] mb-2">Rules:</h3>
            <ul className="list-disc list-inside space-y-1 text-[#5f6a57] text-sm">
              <li>Teams of 2-4 members</li>
              <li>Complete all tasks within the deadline</li>
              <li>Code must be original and not plagiarized</li>
              <li>Judges will evaluate functionality, code quality, and innovation</li>
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Join Button */}
          <button className="btn-primary w-full py-3 font-bold">
            Join Competition
          </button>

          {/* Teams Joined */}
          <div className="card-green p-6">
            <h3 className="text-lg font-bold text-[#2d5016] mb-4">Teams Joined</h3>
            <div className="space-y-3">
              {[
                { name: 'Team CodeWizards', members: 3, score: 450 },
                { name: 'Team ReactPro', members: 4, score: 420 },
                { name: 'Team JavaScript', members: 2, score: 380 },
              ].map((team, i) => (
                <div key={i} className="p-3 bg-[#f9faf8] rounded-lg border border-[#e8ebe4]">
                  <p className="font-bold text-[#2d5016]">{team.name}</p>
                  <div className="flex justify-between text-[#8a9285] text-sm mt-1">
                    <span>{team.members} members</span>
                    <span className="font-bold text-[#2d5016]">{team.score} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress */}
          <div className="card-green p-6">
            <h3 className="text-lg font-bold text-[#2d5016] mb-4">Capacity</h3>
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <p className="text-[#8a9285] font-medium">45/100 Teams</p>
                <p className="text-[#2d5016] font-bold">45%</p>
              </div>
              <div className="w-full bg-[#e8ebe4] rounded-full h-3">
                <div className="bg-[#2d5016] h-3 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
            <p className="text-[#5f6a57] text-sm">55 spots remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
}
