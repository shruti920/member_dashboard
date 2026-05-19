'use client';

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, BookOpen, Trophy, TrendingUp } from 'lucide-react';

const activityData = [
  { day: 'Mon', submissions: 45, tasks: 52 },
  { day: 'Tue', submissions: 52, tasks: 48 },
  { day: 'Wed', submissions: 48, tasks: 61 },
  { day: 'Thu', submissions: 61, tasks: 55 },
  { day: 'Fri', submissions: 55, tasks: 67 },
  { day: 'Sat', submissions: 67, tasks: 72 },
  { day: 'Sun', submissions: 72, tasks: 45 },
];

const engagementData = [
  { week: 'Week 1', engagement: 65 },
  { week: 'Week 2', engagement: 72 },
  { week: 'Week 3', engagement: 78 },
  { week: 'Week 4', engagement: 85 },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#2d5016] mb-2">Admin Dashboard</h1>
        <p className="text-[#5f6a57]">Monitor platform metrics and manage learning content</p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          {
            label: 'Total Users',
            value: '2,847',
            icon: Users,
            color: 'bg-[#2d5016]',
            change: '+12%',
          },
          {
            label: 'Active Tasks',
            value: '48',
            icon: BookOpen,
            color: 'bg-[#5a7d3e]',
            change: '+4',
          },
          {
            label: 'Competitions',
            value: '8',
            icon: Trophy,
            color: 'bg-[#3d4635]',
            change: '+2',
          },
          {
            label: 'Avg Completion',
            value: '78%',
            icon: TrendingUp,
            color: 'bg-[#2d5016]',
            change: '+5%',
          },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="card-green p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#8a9285] text-sm font-medium mb-2">{kpi.label}</p>
                  <p className="text-3xl font-bold text-[#2d5016]">{kpi.value}</p>
                  <p className="text-green-600 text-sm mt-2">{kpi.change} this month</p>
                </div>
                <div className={`${kpi.color} p-3 rounded-lg`}>
                  <Icon size={24} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="card-green p-6">
          <h2 className="text-xl font-bold text-[#2d5016] mb-4">Weekly Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid stroke="#e8ebe4" />
              <XAxis stroke="#8a9285" dataKey="day" />
              <YAxis stroke="#8a9285" />
              <Tooltip contentStyle={{ backgroundColor: '#f9faf8', border: '1px solid #e8ebe4' }} />
              <Bar dataKey="submissions" fill="#2d5016" name="Submissions" />
              <Bar dataKey="tasks" fill="#5a7d3e" name="Tasks Assigned" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Trend */}
        <div className="card-green p-6">
          <h2 className="text-xl font-bold text-[#2d5016] mb-4">User Engagement Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData}>
              <CartesianGrid stroke="#e8ebe4" />
              <XAxis stroke="#8a9285" dataKey="week" />
              <YAxis stroke="#8a9285" />
              <Tooltip contentStyle={{ backgroundColor: '#f9faf8', border: '1px solid #e8ebe4' }} />
              <Line type="monotone" dataKey="engagement" stroke="#2d5016" strokeWidth={2} dot={{ fill: '#2d5016' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="card-green p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#2d5016]">Recent Tasks</h2>
          <a href="#" className="text-[#2d5016] hover:text-[#5a7d3e] text-sm font-medium">
            View All →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e8ebe4]">
                <th className="text-left px-4 py-3 font-bold text-[#2d5016]">Task Title</th>
                <th className="text-left px-4 py-3 font-bold text-[#2d5016]">Skill</th>
                <th className="text-center px-4 py-3 font-bold text-[#2d5016]">Submissions</th>
                <th className="text-center px-4 py-3 font-bold text-[#2d5016]">Avg Score</th>
                <th className="text-center px-4 py-3 font-bold text-[#2d5016]">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: 'Binary Trees', skill: 'DSA', submissions: 42, avg: 82, status: 'Active' },
                { title: 'React Hooks', skill: 'Frontend', submissions: 38, avg: 88, status: 'Active' },
                { title: 'REST API', skill: 'Backend', submissions: 35, avg: 85, status: 'Active' },
              ].map((task, i) => (
                <tr key={i} className="border-b border-[#e8ebe4] hover:bg-[#f9faf8]">
                  <td className="px-4 py-3 text-[#2d5016] font-medium">{task.title}</td>
                  <td className="px-4 py-3 text-[#5f6a57]">{task.skill}</td>
                  <td className="px-4 py-3 text-center text-[#2d5016] font-bold">{task.submissions}</td>
                  <td className="px-4 py-3 text-center text-[#2d5016] font-bold">{task.avg}%</td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card-green p-6">
          <h3 className="text-lg font-bold text-[#2d5016] mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="btn-primary w-full text-left py-2">+ Create New Task</button>
            <button className="btn-primary w-full text-left py-2">+ Start Competition</button>
            <button className="btn-secondary w-full text-left py-2">Manage Users</button>
            <button className="btn-secondary w-full text-left py-2">View Analytics</button>
          </div>
        </div>

        <div className="card-green p-6">
          <h3 className="text-lg font-bold text-[#2d5016] mb-4">Platform Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-[#2d5016] font-medium">Database</p>
                <p className="text-green-600 text-sm font-bold">Optimal</p>
              </div>
              <div className="w-full bg-[#e8ebe4] rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '95%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-[#2d5016] font-medium">API Response</p>
                <p className="text-green-600 text-sm font-bold">Fast</p>
              </div>
              <div className="w-full bg-[#e8ebe4] rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
