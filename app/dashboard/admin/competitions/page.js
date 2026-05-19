'use client';

import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const competitions = [
  {
    id: 1,
    name: 'React Masters 2024',
    status: 'ongoing',
    teams: 45,
    startDate: '2024-04-15',
    endDate: '2024-04-30',
    prize: '₹50,000',
  },
  {
    id: 2,
    name: 'DSA Championship',
    status: 'upcoming',
    teams: 23,
    startDate: '2024-05-01',
    endDate: '2024-05-15',
    prize: '₹75,000',
  },
  {
    id: 3,
    name: 'Full Stack Sprint',
    status: 'upcoming',
    teams: 0,
    startDate: '2024-05-20',
    endDate: '2024-05-27',
    prize: '₹100,000',
  },
];

export default function AdminCompetitionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#2d5016] mb-2">Competitions</h1>
          <p className="text-[#5f6a57]">Create and manage competitions</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Create Competition
        </button>
      </div>

      {/* Filter */}
      <select className="px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
        <option>All Competitions</option>
        <option>Ongoing</option>
        <option>Upcoming</option>
        <option>Completed</option>
      </select>

      {/* Competitions List */}
      <div className="space-y-4">
        {competitions.map((comp) => (
          <div key={comp.id} className="card-green p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-bold text-[#2d5016]">{comp.name}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      comp.status === 'ongoing'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {comp.status.charAt(0).toUpperCase() + comp.status.slice(1)}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-[#8a9285] text-xs font-medium mb-1">Teams</p>
                    <p className="text-[#2d5016] font-bold">{comp.teams}</p>
                  </div>
                  <div>
                    <p className="text-[#8a9285] text-xs font-medium mb-1">Start Date</p>
                    <p className="text-[#2d5016] font-bold">{comp.startDate}</p>
                  </div>
                  <div>
                    <p className="text-[#8a9285] text-xs font-medium mb-1">End Date</p>
                    <p className="text-[#2d5016] font-bold">{comp.endDate}</p>
                  </div>
                  <div>
                    <p className="text-[#8a9285] text-xs font-medium mb-1">Prize</p>
                    <p className="text-[#2d5016] font-bold">{comp.prize}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-[#e8ebe4] rounded-lg text-[#2d5016]" title="View">
                  <Eye size={20} />
                </button>
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

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card-green p-6">
          <p className="text-[#8a9285] text-sm font-medium mb-2">Total Competitions</p>
          <p className="text-3xl font-bold text-[#2d5016]">12</p>
          <p className="text-[#5f6a57] text-sm mt-2">3 ongoing, 2 upcoming</p>
        </div>
        <div className="card-green p-6">
          <p className="text-[#8a9285] text-sm font-medium mb-2">Total Participants</p>
          <p className="text-3xl font-bold text-[#2d5016]">384</p>
          <p className="text-[#5f6a57] text-sm mt-2">In active competitions</p>
        </div>
        <div className="card-green p-6">
          <p className="text-[#8a9285] text-sm font-medium mb-2">Prize Pool</p>
          <p className="text-3xl font-bold text-[#2d5016]">₹22.5L</p>
          <p className="text-[#5f6a57] text-sm mt-2">Total distributed</p>
        </div>
      </div>
    </div>
  );
}
