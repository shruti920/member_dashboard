'use client';

import { Trophy, Medal } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggeredList, FloatingParticles, CursorTrail, AnimatedCounter } from '@/components/animations';

const leaderboardData = [
  { rank: 1, name: 'Alice Johnson', score: 2450, streak: 21, badge: '🥇' },
  { rank: 2, name: 'Bob Smith', score: 2380, streak: 18, badge: '🥈' },
  { rank: 3, name: 'Carol Williams', score: 2320, streak: 15, badge: '🥉' },
  { rank: 4, name: 'John Doe', score: 1850, streak: 12, badge: '👤' },
  { rank: 5, name: 'Emma Davis', score: 1720, streak: 10, badge: '👤' },
  { rank: 6, name: 'Frank Miller', score: 1650, streak: 8, badge: '👤' },
  { rank: 7, name: 'Grace Wilson', score: 1580, streak: 7, badge: '👤' },
  { rank: 8, name: 'Henry Brown', score: 1420, streak: 5, badge: '👤' },
];

export default function LeaderboardPage() {
  return (
    <div className="relative space-y-6 bg-[#0F0F0F]">
      {/* Floating particles background */}
      <FloatingParticles count={20} />

      {/* Cursor trail */}
      <CursorTrail enabled={true} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <h1 className="text-4xl font-bold text-[#F5C518] mb-2 drop-shadow-lg">Global Leaderboard</h1>
        <p className="text-[#888888]">See how you rank against other learners</p>
      </motion.div>

      {/* Filter & Sort */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid md:grid-cols-3 gap-4 relative z-10"
      >
        <select className="px-4 py-2 border border-[#2A2A2A] rounded-lg bg-[#1A1A1A] text-[#FFFFFF] focus:outline-none focus:border-[#F5C518] focus:ring-2 focus:ring-[#F5C518]/30">
          <option>This Month</option>
          <option>Last Month</option>
          <option>All Time</option>
        </select>
        <select className="px-4 py-2 border border-[#2A2A2A] rounded-lg bg-[#1A1A1A] text-[#FFFFFF] focus:outline-none focus:border-[#F5C518] focus:ring-2 focus:ring-[#F5C518]/30">
          <option>All Skills</option>
          <option>DSA</option>
          <option>Frontend</option>
          <option>Backend</option>
        </select>
        <input
          type="search"
          placeholder="Search learner..."
          className="px-4 py-2 border border-[#2A2A2A] rounded-lg bg-[#1A1A1A] text-[#FFFFFF] placeholder-[#666666] focus:outline-none focus:border-[#F5C518] focus:ring-2 focus:ring-[#F5C518]/30"
        />
      </motion.div>

      {/* Your Rank Highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="card-primary p-6 bg-gradient-to-r from-[#F5C518]/10 to-[#C4A000]/10 border-2 border-[#F5C518] relative z-10"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[#888888] text-sm font-medium mb-1">Your Current Rank</p>
            <p className="text-4xl font-bold text-[#F5C518]">
              #<AnimatedCounter from={1} to={42} duration={2} />
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#888888] text-sm font-medium mb-1">Points</p>
            <p className="text-3xl font-bold text-[#F5C518]">
              <AnimatedCounter from={0} to={1850} duration={2} />
            </p>
          </div>
          <div className="text-right">
            <p className="text-[#888888] text-sm font-medium mb-1">Your Streak</p>
            <p className="text-3xl font-bold text-[#F5C518]">
              <AnimatedCounter from={0} to={12} duration={1.5} /> days 🔥
            </p>
          </div>
        </div>
      </motion.div>

      {/* Leaderboard Table with Staggered Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="card-primary overflow-hidden relative z-10"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A] bg-[#1A1A1A]">
                <th className="px-6 py-4 text-left font-bold text-[#F5C518]">Rank</th>
                <th className="px-6 py-4 text-left font-bold text-[#F5C518]">Name</th>
                <th className="px-6 py-4 text-center font-bold text-[#F5C518]">Score</th>
                <th className="px-6 py-4 text-center font-bold text-[#F5C518]">Streak</th>
                <th className="px-6 py-4 text-center font-bold text-[#F5C518]">Status</th>
              </tr>
            </thead>
            <tbody>
              <StaggeredList
                items={leaderboardData}
                delayPerItem={90}
                renderItem={(entry) => (
                  <tr
                    className={`border-b border-[#2A2A2A] hover:bg-[#1A1A1A] hover:border-[#F5C518]/30 transition-all ${
                      entry.rank <= 3 ? 'bg-[#F5C518]/5' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <motion.span
                          className="text-2xl"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        >
                          {entry.badge}
                        </motion.span>
                        <motion.span
                          className="font-bold text-[#F5C518] text-lg"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          {entry.rank}
                        </motion.span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#FFFFFF]">{entry.name}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <motion.span
                        className="inline-block bg-gradient-to-r from-[#F5C518] to-[#C4A000] text-[#000000] px-4 py-2 rounded-lg font-bold"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {entry.score}
                      </motion.span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <p className="font-medium text-[#F5C518]">{entry.streak} days</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {entry.rank <= 3 ? (
                        <motion.span
                          className="inline-block px-3 py-1 bg-[#F5C518] text-[#000000] rounded-full text-sm font-medium"
                          animate={{ boxShadow: ['0 0 0 0 rgba(245, 197, 24, 0.7)', '0 0 0 8px rgba(245, 197, 24, 0)'] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          Top 3 🏆
                        </motion.span>
                      ) : (
                        <span className="inline-block px-3 py-1 bg-[#2A2A2A] text-[#F5C518] rounded-full text-sm font-medium">
                          Active
                        </span>
                      )}
                    </td>
                  </tr>
                )}
              />
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Leaderboard Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-[#F5C518]/10 to-[#C4A000]/10 rounded-lg p-6 border border-[#F5C518]/30 relative z-10"
      >
        <h3 className="font-bold text-[#F5C518] mb-3">📊 Leaderboard Info</h3>
        <div className="grid md:grid-cols-2 gap-4 text-[#888888] text-sm">
          <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            ✓ Scores reset monthly to give everyone a fair chance
          </motion.p>
          <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.55 }}>
            ✓ Bonus points for consistent submissions every week
          </motion.p>
          <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
            ✓ Compete by skill level for specialized leaderboards
          </motion.p>
          <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.65 }}>
            ✓ Top 3 performers get badges and special recognition
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
