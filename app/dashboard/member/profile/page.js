'use client';

import { Trophy, Award, Flame, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  XPShimmerBar,
  AnimatedCounter,
  FloatingParticles,
  CursorTrail,
  MagneticButton,
} from '@/components/animations';

const badges = [
  { name: 'Top Performer', icon: Trophy, color: 'bg-[#F5C518] text-[#000000]' },
  { name: 'Consistent Streak', icon: Flame, color: 'bg-[#C4A000] text-[#000000]' },
  { name: 'Fast Submitter', icon: Target, color: 'bg-[#FFF7B2] text-[#000000]' },
  { name: 'Expert Solver', icon: Award, color: 'bg-[#F5C518] text-[#000000]' },
];

export default function MemberProfilePage() {
  return (
    <div className="relative space-y-8 bg-[#0F0F0F]">
      {/* Floating particles background */}
      <FloatingParticles count={20} />

      {/* Cursor trail */}
      <CursorTrail enabled={true} />

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-primary p-8 relative z-10"
      >
        <div className="flex flex-col md:flex-row md:items-end gap-6">
          <motion.div
            className="w-24 h-24 bg-gradient-to-br from-[#F5C518] to-[#C4A000] rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <span className="text-4xl font-bold text-[#000000]">JD</span>
          </motion.div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-[#F5C518] mb-2 drop-shadow-lg">John Doe</h1>
            <p className="text-[#888888] mb-4">Member • Joined 3 months ago</p>
            <div className="flex flex-wrap gap-4">
              <div>
                <p className="text-[#666666] text-sm">Current Rank</p>
                <p className="text-2xl font-bold text-[#F5C518]">
                  #<AnimatedCounter from={1} to={42} duration={1.5} />
                </p>
              </div>
              <div>
                <p className="text-[#666666] text-sm">Total Points</p>
                <p className="text-2xl font-bold text-[#F5C518]">
                  <AnimatedCounter from={0} to={1850} duration={2} />
                </p>
              </div>
              <div>
                <p className="text-[#666666] text-sm">Current Streak</p>
                <p className="text-2xl font-bold text-[#F5C518]">
                  <AnimatedCounter from={0} to={12} duration={1.5} /> days
                </p>
              </div>
            </div>
          </div>
          <MagneticButton variant="primary" className="whitespace-nowrap">
            Edit Profile
          </MagneticButton>
        </div>
      </motion.div>

      {/* XP Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="card-primary p-6 relative z-10"
      >
        <XPShimmerBar current={1500} total={5000} showLabel={true} />
      </motion.div>

      {/* Performance Summary */}
      <div className="grid md:grid-cols-2 gap-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card-primary p-6"
        >
          <h2 className="text-xl font-bold text-[#F5C518] mb-4">Performance Summary</h2>
          <div className="space-y-4">
            {[
              { label: 'Completion Rate', value: 85, description: '17/20 tasks' },
              { label: 'Average Score', value: 88.5, description: 'Excellent!' },
              { label: 'Submission Quality', value: 92, description: 'On-time submissions' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.05 }}
              >
                <p className="text-[#888888] text-sm font-medium mb-2">{item.label}</p>
                <div className="w-full bg-[#1A1A1A] rounded-full h-3 overflow-hidden border border-[#2A2A2A]">
                  <motion.div
                    className="bg-gradient-to-r from-[#F5C518] to-[#C4A000] h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.05 }}
                  />
                </div>
                <p className="text-[#888888] text-sm mt-1">
                  {item.value}% - {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card-primary p-6"
        >
          <h2 className="text-xl font-bold text-[#F5C518] mb-4">Skill Distribution</h2>
          <div className="space-y-4">
            {[
              { skill: 'DSA', level: 75 },
              { skill: 'Frontend', level: 82 },
              { skill: 'Backend', level: 68 },
              { skill: 'Testing', level: 71 },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 + i * 0.05 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <p className="text-[#F5C518] font-medium">{item.skill}</p>
                  <p className="text-[#888888] text-sm">{item.level}%</p>
                </div>
                <div className="w-full bg-[#1A1A1A] rounded-full h-2 border border-[#2A2A2A] overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-[#F5C518] to-[#C4A000] h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${item.level}%` }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card-primary p-6 relative z-10"
      >
        <h2 className="text-xl font-bold text-[#F5C518] mb-4">Achievements</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {badges.map((badge, i) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={i}
                className={`${badge.color} p-6 rounded-lg text-center cursor-pointer relative overflow-hidden`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45 + i * 0.05 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Icon size={32} className="mx-auto mb-2 relative z-10" />
                <p className="font-medium text-sm relative z-10">{badge.name}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Personal Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card-primary p-6 relative z-10"
      >
        <h2 className="text-xl font-bold text-[#F5C518] mb-4">Personal Information</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { label: 'Full Name', value: 'John Doe' },
            { label: 'Email', value: 'john.doe@example.com' },
            { label: 'Member Since', value: 'January 15, 2024' },
            { label: 'Timezone', value: 'IST (UTC +5:30)' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 + i * 0.05 }}
            >
              <p className="text-[#888888] text-sm font-medium mb-1">{item.label}</p>
              <p className="text-[#F5C518] font-medium">{item.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
