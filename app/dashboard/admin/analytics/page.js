'use client';

import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const performanceData = [
  { week: 'Week 1', avg: 68 },
  { week: 'Week 2', avg: 72 },
  { week: 'Week 3', avg: 75 },
  { week: 'Week 4', avg: 82 },
];

const skillData = [
  { skill: 'DSA', users: 850, percentage: 30 },
  { skill: 'Frontend', users: 950, percentage: 33 },
  { skill: 'Backend', users: 780, percentage: 27 },
  { skill: 'Testing', users: 290, percentage: 10 },
];

const COLORS = ['#2d5016', '#5a7d3e', '#3d4635', '#8a9285'];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#2d5016] mb-2">Analytics Dashboard</h1>
        <p className="text-[#5f6a57]">Monitor platform performance and user metrics</p>
      </div>

      {/* Date Range Selector */}
      <div className="flex gap-4">
        <select className="px-4 py-2 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] focus:outline-none focus:border-[#2d5016]">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Total Submissions', value: '5,847', change: '+12%' },
          { label: 'Avg Task Score', value: '81.5%', change: '+3.2%' },
          { label: 'Completion Rate', value: '78%', change: '+5%' },
          { label: 'User Growth', value: '+2.1%', change: '+0.3%' },
        ].map((metric, i) => (
          <div key={i} className="card-green p-6">
            <p className="text-[#8a9285] text-sm font-medium mb-2">{metric.label}</p>
            <p className="text-3xl font-bold text-[#2d5016] mb-2">{metric.value}</p>
            <p className="text-green-600 text-sm">{metric.change} compared to last period</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <div className="card-green p-6">
          <h2 className="text-xl font-bold text-[#2d5016] mb-4">Average Score Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid stroke="#e8ebe4" />
              <XAxis stroke="#8a9285" dataKey="week" />
              <YAxis stroke="#8a9285" />
              <Tooltip contentStyle={{ backgroundColor: '#f9faf8', border: '1px solid #e8ebe4' }} />
              <Line
                type="monotone"
                dataKey="avg"
                stroke="#2d5016"
                strokeWidth={2}
                dot={{ fill: '#2d5016' }}
                name="Average Score"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Distribution */}
        <div className="card-green p-6">
          <h2 className="text-xl font-bold text-[#2d5016] mb-4">Skill Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={skillData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ skill, percentage }) => `${skill} ${percentage}%`}
                outerRadius={80}
                fill="#2d5016"
                dataKey="percentage"
              >
                {skillData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skills Analytics */}
      <div className="card-green p-6">
        <h2 className="text-xl font-bold text-[#2d5016] mb-4">Skills Performance</h2>
        <div className="space-y-6">
          {skillData.map((skill, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-2">
                <p className="font-bold text-[#2d5016]">{skill.skill}</p>
                <p className="text-[#8a9285] text-sm">{skill.users} users</p>
              </div>
              <div className="w-full bg-[#e8ebe4] rounded-full h-3">
                <div
                  className="bg-[#2d5016] h-3 rounded-full"
                  style={{ width: `${skill.percentage * 3.33}%` }}
                />
              </div>
              <p className="text-[#5f6a57] text-sm mt-1">{skill.percentage}% of user focus</p>
            </div>
          ))}
        </div>
      </div>

      {/* Engagement Timeline */}
      <div className="card-green p-6">
        <h2 className="text-xl font-bold text-[#2d5016] mb-4">Daily Active Users</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { day: 'Mon', users: 1200 },
              { day: 'Tue', users: 1450 },
              { day: 'Wed', users: 1380 },
              { day: 'Thu', users: 1590 },
              { day: 'Fri', users: 1850 },
              { day: 'Sat', users: 1200 },
              { day: 'Sun', users: 850 },
            ]}
          >
            <CartesianGrid stroke="#e8ebe4" />
            <XAxis stroke="#8a9285" dataKey="day" />
            <YAxis stroke="#8a9285" />
            <Tooltip contentStyle={{ backgroundColor: '#f9faf8', border: '1px solid #e8ebe4' }} />
            <Bar dataKey="users" fill="#2d5016" name="Active Users" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Insights */}
      <div className="bg-[#f3f5f1] rounded-lg p-6 border border-[#2d5016]/20">
        <h3 className="font-bold text-[#2d5016] mb-3">📊 Key Insights</h3>
        <ul className="space-y-2 text-[#5f6a57] text-sm">
          <li>✓ Engagement is highest on Friday-Saturday</li>
          <li>✓ Frontend skills gaining popularity (+8% this month)</li>
          <li>✓ Average completion time is improving week-over-week</li>
          <li>✓ Top 20% of users account for 60% of submissions</li>
        </ul>
      </div>
    </div>
  );
}
