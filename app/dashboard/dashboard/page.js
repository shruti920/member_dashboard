'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, BookOpen, Zap, Sparkles, Code, Users } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { motion } from 'framer-motion';
import {
  CursorTrail,
  FloatingParticles,
  CardFlip,
  AnimatedCounter,
  MagneticButton,
  Typewriter,
  ConfettiCelebration,
} from '@/components/animations';

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const [memberData, setMemberData] = useState(null);
  const [performanceData, setPerformanceData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [stats, setStats] = useState({
    rank: 0,
    completionRate: 0,
    tasksDone: 0,
    streak: 0,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  // Fetch member data and statistics
  useEffect(() => {
    if (user && user.id) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setDataLoading(true);

      // Fetch member info from leaderboard
      const leaderboardRes = await fetch('/api/leaderboard');
      const leaderboardData = await leaderboardRes.json();
      const memberInLeaderboard = leaderboardData.find((m) => m.user_id === user.id);

      // Fetch user submissions
      const submissionsRes = await fetch(`/api/submissions?userId=${user.id}`);
      const submissionsData = await submissionsRes.json();

      // Process submissions for performance data (group by week)
      const performanceByWeek = processPerformanceData(submissionsData);
      setPerformanceData(performanceByWeek.length > 0 ? performanceByWeek : [{ week: 'No Data', score: 0 }]);

      // Process skills data from submissions
      const skillsData = processSkillsData(submissionsData);
      setSkillData(skillsData.length > 0 ? skillsData : [{ skill: 'No Data', proficiency: 0 }]);

      // Set recent activity from submissions
      const recentItems = submissionsData.slice(0, 4).map((sub, idx) => ({
        id: idx,
        title: 'Task Submitted',
        description: sub.tasks?.title || 'Task submission',
        time: formatTimeAgo(new Date(sub.submitted_at)),
      }));
      setRecentActivity(recentItems);

      // Calculate stats
      const completionRate = Math.round(
        (submissionsData.length / (submissionsData.length + 3)) * 100
      );
      setStats({
        rank: memberInLeaderboard?.rank || 'N/A',
        completionRate: completionRate,
        tasksDone: submissionsData.length,
        streak: calculateStreak(submissionsData),
      });

      setMemberData(memberInLeaderboard || {});
      setDataLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setDataLoading(false);
    }
  };

  const processPerformanceData = (submissions) => {
    if (!submissions || submissions.length === 0) return [];

    // Group submissions by week
    const weeks = {};
    submissions.forEach((sub) => {
      const date = new Date(sub.submitted_at);
      const weekNum = Math.ceil(date.getDate() / 7);
      const weekKey = `Week ${weekNum}`;

      if (!weeks[weekKey]) {
        weeks[weekKey] = { count: 0, totalScore: 0 };
      }
      weeks[weekKey].count += 1;
      weeks[weekKey].totalScore += sub.score || 0;
    });

    return Object.keys(weeks)
      .slice(-4)
      .map((week) => ({
        week,
        score: weeks[week].totalScore > 0 ? Math.round(weeks[week].totalScore / weeks[week].count) : weeks[week].count * 20,
      }));
  };

  const processSkillsData = (submissions) => {
    if (!submissions || submissions.length === 0) return [];

    // Group submissions by task category/skill
    const skills = {};
    submissions.forEach((sub) => {
      const skill = sub.tasks?.category || 'General';

      if (!skills[skill]) {
        skills[skill] = { count: 0, totalScore: 0 };
      }
      skills[skill].count += 1;
      skills[skill].totalScore += sub.score || 0;
    });

    return Object.keys(skills).map((skill) => ({
      skill,
      proficiency: skills[skill].totalScore > 0 ? Math.round(skills[skill].totalScore / skills[skill].count) : 70,
    }));
  };

  const calculateStreak = (submissions) => {
    if (!submissions || submissions.length === 0) return 0;

    let streak = 0;
    let lastDate = null;

    submissions
      .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
      .forEach((sub) => {
        const subDate = new Date(sub.submitted_at);
        subDate.setHours(0, 0, 0, 0);

        if (!lastDate) {
          lastDate = subDate;
          streak = 1;
        } else if (
          Math.floor((lastDate - subDate) / (1000 * 60 * 60 * 24)) <= 2
        ) {
          streak += 1;
          lastDate = subDate;
        } else {
          return;
        }
      });

    return streak;
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0F0F0F]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#F5C518] border-t-[#C4A000] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#888888]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const statItems = [
    {
      label: 'Current Rank',
      value: stats.rank,
      icon: Trophy,
      suffix: '',
      motivational: stats.rank !== 'N/A' && stats.rank <= 10 ? 'You\'re top 10%!' : 'Keep climbing!',
    },
    {
      label: 'Completion Rate',
      value: stats.completionRate,
      icon: TrendingUp,
      suffix: '%',
      motivational: 'Keep up the pace!',
    },
    {
      label: 'Tasks Done',
      value: stats.tasksDone,
      icon: BookOpen,
      suffix: '',
      motivational: 'Great progress!',
    },
    {
      label: 'Streak',
      value: stats.streak,
      icon: Zap,
      suffix: ' Days',
      motivational: stats.streak > 5 ? 'On fire! 🔥' : 'Build your streak!',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0F0F0F]">
      {/* Floating particles background */}
      <FloatingParticles count={25} />

      {/* Cursor trail */}
      <CursorTrail enabled={true} />

      {/* Confetti celebration trigger */}
      <ConfettiCelebration trigger={showConfetti} />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-[#F5C518] mb-3 drop-shadow-lg">
            Welcome Back, {profile?.full_name?.split(' ')[0] || 'Learner'}! 👋
          </h1>
          <motion.p
            className="text-[#C4A000] text-lg font-medium"
            animate={{ opacity: [0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Typewriter
              texts={['Build incredible things.', 'Design amazing experiences.', 'Lead the tech society.']}
              speed={80}
              delayBetween={3000}
            />
          </motion.p>
        </motion.div>

        {/* Quick Actions with Magnetic Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <Link href="/dashboard/member/tasks-3d">
            <MagneticButton variant="primary" className="w-full h-24 flex items-center justify-center">
              <div className="text-center">
                <Sparkles size={24} className="mb-2 mx-auto" />
                <p className="font-medium text-sm">Interactive Tasks</p>
              </div>
            </MagneticButton>
          </Link>
          <Link href="/dashboard/materials-3d">
            <MagneticButton variant="primary" className="w-full h-24 flex items-center justify-center">
              <div className="text-center">
                <Code size={24} className="mb-2 mx-auto" />
                <p className="font-medium text-sm">Learn 3D Materials</p>
              </div>
            </MagneticButton>
          </Link>
          <Link href="/dashboard/member/submissions">
            <MagneticButton variant="secondary" className="w-full h-24 flex items-center justify-center">
              <div className="text-center">
                <TrendingUp size={24} className="mb-2 mx-auto" />
                <p className="font-medium text-sm">My Submissions</p>
              </div>
            </MagneticButton>
          </Link>
          <Link href="/dashboard/leaderboard">
            <MagneticButton
              variant="secondary"
              className="w-full h-24 flex items-center justify-center"
              onClick={() => setShowConfetti(true)}
            >
              <div className="text-center">
                <Trophy size={24} className="mb-2 mx-auto" />
                <p className="font-medium text-sm">Leaderboard</p>
              </div>
            </MagneticButton>
          </Link>
        </motion.div>

        {/* Stats Cards with Flip and Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
        {statItems.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <CardFlip
                front={
                  <div className="text-center w-full h-32 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-between w-full px-4">
                      <div className="flex-1">
                        <p className="text-[#888888] text-xs font-medium mb-2">{stat.label}</p>
                        <p className="text-2xl font-bold text-[#F5C518]">
                          <AnimatedCounter value={stat.value} />
                          {stat.suffix}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-[#F5C518] to-[#C4A000] p-3 rounded-lg flex-shrink-0">
                        <Icon size={20} className="text-black" />
                      </div>
                    </div>
                  </div>
                }
                back={
                  <div className="text-center h-32 flex items-center justify-center">
                    <p className="text-sm font-bold text-black">{stat.motivational}</p>
                  </div>
                }
              />
            </motion.div>
          );
        })}
        </motion.div>

        {/* Charts Section - Side by Side */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24 mt-16">
          {/* Performance Trend */}
          <motion.div
            className="card-primary p-8 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-[#F5C518] mb-6">Performance Trend</h2>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid stroke="#2A2A2A" />
                  <XAxis stroke="#888888" dataKey="week" />
                  <YAxis stroke="#888888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A1A1A',
                      border: '1px solid #F5C518',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#F5C518"
                    strokeWidth={2}
                    dot={{ fill: '#F5C518' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Skill Proficiency */}
          <motion.div
            className="card-primary p-8 rounded-lg"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-[#F5C518] mb-6">Skill Proficiency</h2>
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid stroke="#2A2A2A" />
                  <XAxis stroke="#888888" dataKey="skill" />
                  <YAxis stroke="#888888" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1A1A1A',
                      border: '1px solid #F5C518',
                    }}
                  />
                  <Bar dataKey="proficiency" fill="#F5C518" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Spacing Divider */}
        <div className="h-16"></div>

        {/* Recent Activity and Recommendations */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12 mt-8">
          {/* Recent Activity - Larger on left */}
          <motion.div
            className="lg:col-span-2 card-primary p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-[#F5C518] mb-6">Recent Activity</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-start space-x-4 pb-4 border-b border-[#2A2A2A] last:border-b-0"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + activity.id * 0.05 }}
                  >
                    <div className="w-3 h-3 bg-[#F5C518] rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#F5C518]">{activity.title}</p>
                      <p className="text-[#888888] text-sm truncate">{activity.description}</p>
                      <p className="text-[#666666] text-xs mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-[#888888] text-center py-8">No recent activity yet. Start submitting tasks!</p>
              )}
            </div>
          </motion.div>

          {/* Recommendations - Sidebar */}
          <motion.div
            className="lg:col-span-1 bg-gradient-to-br from-[#F5C518]/10 to-[#C4A000]/10 rounded-lg p-6 border border-[#F5C518]/30 h-fit"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="font-bold text-[#F5C518] mb-4 text-lg">🎯 Recommendations</h3>
            <div className="space-y-3 text-sm">
              {stats.completionRate >= 80 && (
                <p className="text-[#888888]">
                  ✅ <strong className="text-[#F5C518]">Excellent!</strong> High completion rate.
                </p>
              )}
              {stats.completionRate < 60 && (
                <p className="text-[#888888]">
                  ⏰ <strong className="text-[#F5C518]">Catch Up:</strong> Submit more tasks.
                </p>
              )}
              {stats.streak >= 7 && (
                <p className="text-[#888888]">
                  🔥 <strong className="text-[#F5C518]">On Fire!</strong> {stats.streak}-day streak!
                </p>
              )}
              {skillData.length > 0 && (
                <p className="text-[#888888]">
                  📚 <strong className="text-[#F5C518]">Focus:</strong> {skillData[skillData.length - 1]?.skill || 'various areas'}
                </p>
              )}
              <p className="text-[#888888]">
                💡 <strong className="text-[#F5C518]">Pro Tip:</strong> Collaborate with peers!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}