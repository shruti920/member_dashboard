'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

export default function ProtectedRoute({ children, requiredRole = null }) {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth/login');
      } else if (requiredRole && profile?.role !== requiredRole) {
        router.push('/dashboard');
      }
    }
  }, [user, profile, loading, requiredRole, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#e8ebe4] border-t-[#2d5016] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#5f6a57]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (requiredRole && profile?.role !== requiredRole) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-[#5f6a57] mb-4">You don&apos;t have access to this page.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-6 py-2 bg-[#2d5016] text-white rounded-lg hover:bg-[#1a2f0b]"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return children;
}

