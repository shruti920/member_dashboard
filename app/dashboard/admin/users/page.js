'use client';

import { Search, Edit, Trash2, Shield } from 'lucide-react';

const users = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'member',
    status: 'active',
    joined: '2024-01-15',
    submissions: 18,
  },
  {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'mentor',
    status: 'active',
    joined: '2023-11-20',
    submissions: 45,
  },
  {
    id: 3,
    name: 'Carol Williams',
    email: 'carol@example.com',
    role: 'member',
    status: 'active',
    joined: '2024-02-10',
    submissions: 15,
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david@example.com',
    role: 'member',
    status: 'inactive',
    joined: '2023-12-05',
    submissions: 8,
  },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-[#2d5016] mb-2">User Management</h1>
        <p className="text-[#5f6a57]">Manage platform users and their roles</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-[#8a9285]" size={20} />
          <input
            type="search"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]"
          />
        </div>
        <select className="px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
          <option>All Roles</option>
          <option>Member</option>
          <option>Mentor</option>
          <option>Admin</option>
        </select>
        <select className="px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="card-green overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e8ebe4] bg-[#f9faf8]">
                <th className="px-6 py-4 text-left font-bold text-[#2d5016]">Name</th>
                <th className="px-6 py-4 text-left font-bold text-[#2d5016]">Email</th>
                <th className="px-6 py-4 text-left font-bold text-[#2d5016]">Role</th>
                <th className="px-6 py-4 text-center font-bold text-[#2d5016]">Status</th>
                <th className="px-6 py-4 text-center font-bold text-[#2d5016]">Joined</th>
                <th className="px-6 py-4 text-center font-bold text-[#2d5016]">Submissions</th>
                <th className="px-6 py-4 text-center font-bold text-[#2d5016]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-[#e8ebe4] hover:bg-[#f9faf8] transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#2d5016]">{user.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[#5f6a57] text-sm">{user.email}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      {user.role === 'admin' && <Shield size={16} className="text-[#2d5016]" />}
                      <span className="text-[#2d5016] font-medium capitalize">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-[#5f6a57] text-sm">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 text-center text-[#2d5016] font-bold">
                    {user.submissions}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 hover:bg-[#e8ebe4] rounded-lg text-[#2d5016]" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 hover:bg-[#e8ebe4] rounded-lg text-red-600" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card-green p-6">
          <p className="text-[#8a9285] text-sm font-medium mb-2">Total Users</p>
          <p className="text-3xl font-bold text-[#2d5016]">2,847</p>
          <p className="text-green-600 text-sm mt-2">+145 this month</p>
        </div>
        <div className="card-green p-6">
          <p className="text-[#8a9285] text-sm font-medium mb-2">Active Mentors</p>
          <p className="text-3xl font-bold text-[#2d5016]">142</p>
          <p className="text-green-600 text-sm mt-2">+8 this month</p>
        </div>
        <div className="card-green p-6">
          <p className="text-[#8a9285] text-sm font-medium mb-2">Inactive Users</p>
          <p className="text-3xl font-bold text-[#2d5016]">324</p>
          <p className="text-yellow-600 text-sm mt-2">Inactive for 30+ days</p>
        </div>
      </div>
    </div>
  );
}
