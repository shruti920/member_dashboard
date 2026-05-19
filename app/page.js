'use client';

import Link from 'next/link';
import { ArrowRight, Trophy, BookOpen, Users, Zap, Brain, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { FloatingParticles, CursorTrail, MagneticButton, Typewriter } from '@/components/animations';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0F0F0F]">
      {/* Floating particles background */}
      <FloatingParticles count={30} />

      {/* Cursor trail */}
      <CursorTrail enabled={true} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0F0F0F] border-b border-[#2A2A2A] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div className="flex items-center space-x-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="w-8 h-8 rounded-lg overflow-hidden">
                <img src="/logo.png" alt="WebnD Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-bold text-xl text-[#F5C518]">WebnD</span>
            </motion.div>
            <motion.div className="flex space-x-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Link href="/auth/login" className="text-[#888888] hover:text-[#F5C518] transition-colors">
                Login
              </Link>
              <MagneticButton variant="secondary">
                <Link href="/auth/register" className="flex items-center justify-center gap-2">
                  Sign Up
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            className="inline-block bg-[#F5C518]/10 border border-[#F5C518]/30 text-[#F5C518] px-4 py-2 rounded-full mb-6 text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            🚀 Master Your Skills Today
          </motion.div>
          <motion.h1
            className="text-5xl sm:text-6xl font-bold text-[#F5C518] mb-6 leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Learn, Compete, and <span className="text-[#C4A000]">Grow Together</span>
          </motion.h1>
          <motion.p
            className="text-xl text-[#888888] mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            A comprehensive platform for skill development with AI-powered learning, team competitions, and real-time performance tracking.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/auth/register">
              <MagneticButton variant="primary" className="flex items-center justify-center gap-2">
                Get Started <ArrowRight size={20} />
              </MagneticButton>
            </Link>
            <MagneticButton variant="secondary">
              Learn More
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A] z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center text-[#F5C518] mb-16 drop-shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Powerful Features for Learners
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BookOpen size={32} className="text-[#F5C518]" />,
                title: 'Weekly Tasks',
                description: 'Structured learning paths with clear objectives and submission deadlines'
              },
              {
                icon: <Brain size={32} className="text-[#F5C518]" />,
                title: 'AI Doubt System',
                description: 'Get instant AI-powered answers to your questions with mentor escalation'
              },
              {
                icon: <Trophy size={32} className="text-[#F5C518]" />,
                title: 'Competitions',
                description: 'Team-based competitions with real-time leaderboards and prizes'
              },
              {
                icon: <BarChart3 size={32} className="text-[#F5C518]" />,
                title: 'Performance Analytics',
                description: 'Track your progress with detailed insights and skill-wise breakdowns'
              },
              {
                icon: <Users size={32} className="text-[#F5C518]" />,
                title: 'Team Collaboration',
                description: 'Form teams, collaborate, and compete with your peers'
              },
              {
                icon: <Zap size={32} className="text-[#F5C518]" />,
                title: 'Gamification',
                description: 'Earn badges, streaks, and climb the global leaderboard'
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="card-primary p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, border: '1px solid #F5C518' }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-[#F5C518] mb-2">{feature.title}</h3>
                <p className="text-[#888888]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#F5C518] to-[#C4A000] z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-[#000000]">
            {[
              { number: '10K+', label: 'Active Learners' },
              { number: '500+', label: 'Courses & Tasks' },
              { number: '50+', label: 'Monthly Competitions' },
              { number: '95%', label: 'Success Rate' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div
                  className="text-4xl font-bold mb-2"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {stat.number}
                </motion.div>
                <p className="font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          className="max-w-4xl mx-auto bg-gradient-to-r from-[#F5C518]/10 to-[#C4A000]/10 border border-[#F5C518]/30 rounded-2xl p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-[#F5C518] mb-4 drop-shadow-lg">
            Ready to Start Learning?
          </h2>
          <p className="text-[#888888] mb-8">
            Join thousands of learners already making progress on WebnD
          </p>
          <Link href="/auth/register">
            <MagneticButton variant="primary">
              Sign Up Free Today
            </MagneticButton>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#000000] text-[#888888] py-12 px-4 border-t border-[#2A2A2A] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-[#F5C518] mb-4">WebnD</h3>
              <p className="text-sm">Empowering learners worldwide</p>
            </div>
            <div>
              <h4 className="font-bold text-[#F5C518] mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#F5C518] transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-[#F5C518] transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#F5C518] mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#F5C518] transition-colors">About</a></li>
                <li><a href="#" className="hover:text-[#F5C518] transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#F5C518] mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#F5C518] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#F5C518] transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#2A2A2A] pt-8 text-center text-sm">
            <p>&copy; 2024 WebnD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
