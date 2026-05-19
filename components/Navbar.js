'use client';

import { useAuth } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, LogOut, User, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlitchText, NotificationBellPing } from '@/components/animations';

export default function Navbar() {
  const { user, profile, signOut, loading } = useAuth();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);

  const handleLogout = async () => {
    await signOut();
    router.push('/auth/login');
  };

  if (!user || loading) return null;

  return (
    <nav className="sticky top-0 z-50 bg-[#0F0F0F] border-b border-[#2A2A2A] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with Glitch Effect */}
          <Link href="/dashboard" className="flex items-center space-x-2">
            <motion.div
              className="w-8 h-8 rounded-lg overflow-hidden"
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <img src="/logo.png" alt="WebnD Logo" className="w-full h-full object-cover" />
            </motion.div>
            <GlitchText text="WebnD" className="hidden sm:inline font-bold text-lg" trigger="hover" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {user && profile?.role === 'member' && (
              <>
                <NavLink href="/member/tasks">Tasks</NavLink>
                <NavLink href="/member/submissions">Submissions</NavLink>
              </>
            )}
            {user && (profile?.role === 'mentor' || profile?.role === 'admin') && (
              <>
                <NavLink href="/mentor">Mentor Panel</NavLink>
                <NavLink href="/mentor/tasks">Manage Tasks</NavLink>
              </>
            )}
            {user && profile?.role === 'admin' && (
              <>
                <NavLink href="/admin">Admin</NavLink>
                <NavLink href="/admin/users">Users</NavLink>
              </>
            )}
            <NavLink href="/leaderboard">Leaderboard</NavLink>
            <NavLink href="/doubts">Doubts</NavLink>
            <NavLink href="/materials">Materials</NavLink>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <NotificationBellPing
              hasNotification={hasNotification}
              onClick={() => setHasNotification(false)}
            />

            {/* User Avatar */}
            <div className="hidden sm:flex items-center space-x-3">
              <motion.div
                className="w-8 h-8 bg-gradient-to-br from-[#F5C518] to-[#C4A000] rounded-full flex items-center justify-center text-[#000000] text-sm font-bold"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {profile?.full_name?.charAt(0) || 'U'}
              </motion.div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-[#FFFFFF]">{profile?.full_name || 'User'}</p>
                <p className="text-xs text-[#888888] capitalize">{profile?.role || 'member'}</p>
              </div>
            </div>

            {/* Dropdown Menu */}
            <div className="relative group">
              <button className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors border border-[#2A2A2A]">
                <Settings size={20} className="text-[#F5C518]" />
              </button>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-0 w-48 bg-[#1A1A1A] rounded-lg shadow-lg border border-[#2A2A2A] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
              >
                <Link
                  href="/member/profile"
                  className="flex items-center space-x-2 px-4 py-3 text-[#F5C518] hover:bg-[#2A2A2A] first:rounded-t-lg transition-colors"
                >
                  <User size={16} />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 px-4 py-3 text-red-400 hover:bg-red-900/20 last:rounded-b-lg border-t border-[#2A2A2A] transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]"
            >
              {mobileMenuOpen ? (
                <X size={20} className="text-[#F5C518]" />
              ) : (
                <Menu size={20} className="text-[#F5C518]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#2A2A2A] py-4 space-y-2"
          >
            {user && profile?.role === 'member' && (
              <>
                <MobileNavLink href="/member/tasks">Tasks</MobileNavLink>
                <MobileNavLink href="/member/submissions">Submissions</MobileNavLink>
              </>
            )}
            {user && (profile?.role === 'mentor' || profile?.role === 'admin') && (
              <>
                <MobileNavLink href="/mentor">Mentor Panel</MobileNavLink>
                <MobileNavLink href="/mentor/tasks">Manage Tasks</MobileNavLink>
              </>
            )}
            {user && profile?.role === 'admin' && (
              <>
                <MobileNavLink href="/admin">Admin</MobileNavLink>
                <MobileNavLink href="/admin/users">Users</MobileNavLink>
              </>
            )}
            <MobileNavLink href="/leaderboard">Leaderboard</MobileNavLink>
            <MobileNavLink href="/doubts">Doubts</MobileNavLink>
            <MobileNavLink href="/materials">Materials</MobileNavLink>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
            >
              Logout
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-[#F5C518] hover:bg-[#1A1A1A] rounded-lg transition-colors border border-transparent hover:border-[#F5C518]/30"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="block px-4 py-2 text-[#F5C518] hover:bg-[#1A1A1A] rounded-lg transition-colors"
    >
      {children}
    </Link>
  );
}

