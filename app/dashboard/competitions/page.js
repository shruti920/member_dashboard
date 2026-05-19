'use client';

import Link from 'next/link';
import { Trophy, Users, Calendar, Clock } from 'lucide-react';

const competitions = [
  {
    id: 1,
    name: 'React Masters 2024',
    description: 'Build advanced React applications with hooks and state management',
    status: 'ongoing',
    startDate: '2024-04-15',
    endDate: '2024-04-30',
    teamsJoined: 45,
    maxTeams: 100,
    prize: '₹50,000',
    image: '🏆',
  },
  {
    id: 2,
    name: 'DSA Championship',
    description: 'Solve complex algorithmic problems under time pressure',
    status: 'upcoming',
    startDate: '2024-05-01',
    endDate: '2024-05-15',
    teamsJoined: 23,
    maxTeams: 100,
    prize: '₹75,000',
    image: '🎯',
  },
  {
    id: 3,
    name: 'Full Stack Sprint',
    description: 'Build a complete full-stack application in one week',
    status: 'upcoming',
    startDate: '2024-05-20',
    endDate: '2024-05-27',
    teamsJoined: 0,
    maxTeams: 80,
    prize: '₹100,000',
    image: '⚡',
  },
  {
    id: 4,
    name: 'Web3 Innovation Challenge',
    description: 'Create innovative blockchain-based applications',
    status: 'completed',
    startDate: '2024-03-15',
    endDate: '2024-03-31',
    teamsJoined: 67,
    maxTeams: 100,
    prize: '₹60,000',
    image: '🚀',
    winner: 'Team CodeWizards',
  },
];

export default function CompetitionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#2d5016] mb-2">Competitions</h1>
        <p className="text-[#5f6a57]">Join team-based competitions and showcase your skills</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {['All', 'Ongoing', 'Upcoming', 'Completed'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              tab === 'All'
                ? 'bg-[#ede618] text-white'
                : 'bg-[#f3f5f1] text-[#2d5016] hover:bg-[#e8ebe4]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Competitions Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {competitions.map((comp) => (
          <div key={comp.id} className="card-green overflow-hidden flex flex-col">
            {/* Header with Image */}
            <div className="bg-[#f3f5f1] p-6 text-6xl text-center">
              {comp.image}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-bold text-[#2d5016]">{comp.name}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 ${
                    comp.status === 'ongoing'
                      ? 'bg-green-100 text-green-700'
                      : comp.status === 'upcoming'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {comp.status.charAt(0).toUpperCase() + comp.status.slice(1)}
                </span>
              </div>

              <p className="text-[#5f6a57] text-sm mb-4">{comp.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4 py-4 border-t border-b border-[#e8ebe4]">
                <div>
                  <p className="text-[#8a9285] text-xs font-medium mb-1">Duration</p>
                  <div className="flex items-center gap-1 text-[#2d5016] font-medium text-sm">
                    <Calendar size={14} />
                    {new Date(comp.startDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <p className="text-[#8a9285] text-xs font-medium mb-1">Teams</p>
                  <div className="flex items-center gap-1 text-[#2d5016] font-medium text-sm">
                    <Users size={14} />
                    {comp.teamsJoined}/{comp.maxTeams}
                  </div>
                </div>
                <div>
                  <p className="text-[#8a9285] text-xs font-medium mb-1">Prize Pool</p>
                  <p className="text-[#2d5016] font-bold text-sm">{comp.prize}</p>
                </div>
                {comp.winner && (
                  <div>
                    <p className="text-[#8a9285] text-xs font-medium mb-1">Winner</p>
                    <p className="text-[#2d5016] font-bold text-sm">🏆 {comp.winner}</p>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-[#8a9285] text-xs font-medium">Teams Joined</p>
                  <p className="text-[#2d5016] text-sm font-bold">
                    {Math.round((comp.teamsJoined / comp.maxTeams) * 100)}%
                  </p>
                </div>
                <div className="w-full bg-[#e8ebe4] rounded-full h-2">
                  <div
                    className="bg-[#2d5016] h-2 rounded-full"
                    style={{ width: `${(comp.teamsJoined / comp.maxTeams) * 100}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto">
                <Link
                  href={`/competitions/${comp.id}`}
                  className="btn-primary flex-1 text-center py-2 text-sm"
                >
                  View Details
                </Link>
                {comp.status !== 'completed' && (
                  <button className="btn-secondary flex-1 text-sm py-2">
                    {comp.status === 'ongoing' ? 'Join Now' : 'Notify Me'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Competition Info */}
      <div className="bg-[#f3f5f1] rounded-lg p-6 border border-[#2d5016]/20">
        <h3 className="font-bold text-[#2d5016] mb-3">🏁 How Competitions Work</h3>
        <div className="grid md:grid-cols-2 gap-4 text-[#5f6a57] text-sm">
          <p>✓ Form teams with 2-4 members and collaborate</p>
          <p>✓ Solve competition tasks to earn points</p>
          <p>✓ Real-time leaderboard shows team rankings</p>
          <p>✓ Top teams win prizes and special badges</p>
        </div>
      </div>
    </div>
  );
}
