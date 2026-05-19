'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Home,
  BookOpen,
  Trophy,
  Brain,
  Users,
  Zap,
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import { useAuth } from '@/lib/AuthContext';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  // Redirect based on role
  useEffect(() => {
    if (!loading && user) {
      if (user.role === 'mentor') {
        router.push('/dashboard/mentor');
      } else if (user.role === 'member') {
        router.push('/dashboard/dashboard');
      } else if (user.role === 'admin') {
        router.push('/dashboard/admin');
      }
    }
  }, [user, loading, router]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#e8ebe4] border-t-[#C4A000] rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-[#5f6a57]">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Prevent render if not logged in
  if (!user) return null;

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/dashboard/dashboard',
      icon: Home,
    },
    {
      label: 'My Tasks',
      href: '/dashboard/member/tasks',
      icon: BookOpen,
    },
    {
      label: 'My Submissions',
      href: '/dashboard/member/submissions',
      icon: Zap,
    },
    {
      label: 'Leaderboard',
      href: '/dashboard/leaderboard',
      icon: Trophy,
    },
    {
      label: 'Competitions',
      href: '/dashboard/competitions',
      icon: Users,
    },
    {
      label: 'AI Doubts',
      href: '/dashboard/doubts',
      icon: Brain,
    },
    {
      label: 'Materials',
      href: '/dashboard/materials',
      icon: BookOpen,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9faf8]">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'block' : 'hidden'
          } lg:block w-64 bg-white border-r border-[#e8ebe4] min-h-[calc(100vh-4rem)] p-6 fixed lg:relative z-30 lg:z-0`}
        >
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-[#5f6a57] hover:bg-[#f3f5f1] hover:text-[#2d5016] transition-colors"
                >
                  <Icon size={20} />

                  <span className="font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 w-full lg:w-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}