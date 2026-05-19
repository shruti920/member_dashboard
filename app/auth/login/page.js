'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading2, setLoading2] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user && profile) {
      // Route based on role
      if (profile.role === 'mentor') {
        router.push('/dashboard/mentor');
      } else if (profile.role === 'member') {
        router.push('/dashboard');
      } else {
        router.push('/dashboard/dashboard');
      }
    }
  }, [user, profile, loading, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading2(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      setLoading2(false);
      return;
    }

    try {
      // Use Supabase client directly for login
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        setError(signInError.message || 'Login failed');
        setLoading2(false);
        return;
      }

      if (data.user) {
        // Session is now stored in Supabase - wait for AuthContext to pick it up
        setLoading2(false);
        // The useEffect above will handle the redirect when user and profile state updates
      }
    } catch (err) {
      setError(err.message || 'An error occurred');
      setLoading2(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-[#2d5016] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
            <span className="font-bold text-2xl text-[#2d5016]">LearnHub</span>
          </div>
          <h1 className="text-3xl font-bold text-[#2d5016] mb-2">Welcome Back</h1>
          <p className="text-[#5f6a57]">Sign in to continue learning</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#2d5016] mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-2 border border-[#e8ebe4] rounded-lg bg-[#f9faf8] text-[#1a1e14] focus:outline-none focus:border-[#2d5016] focus:ring-2 focus:ring-[#2d5016]/20"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-[#2d5016]">Password</label>
              <Link href="#" className="text-xs text-[#2d5016] hover:text-[#5a7d3e]">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-[#e8ebe4] rounded-lg bg-[#f9faf8] text-[#1a1e14] focus:outline-none focus:border-[#2d5016] focus:ring-2 focus:ring-[#2d5016]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5f6a57]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-[#e8ebe4] cursor-pointer accent-[#2d5016]"
            />
            <label htmlFor="remember" className="text-sm text-[#5f6a57] cursor-pointer">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            disabled={loading2}
            className="w-full bg-[#2d5016] text-white py-2 rounded-lg font-medium hover:bg-[#1a2f0b] disabled:opacity-50 transition-colors mt-6"
          >
            {loading2 ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-[#e8ebe4]"></div>
          <span className="px-3 text-xs text-[#5f6a57]">OR</span>
          <div className="flex-1 border-t border-[#e8ebe4]"></div>
        </div>

        {/* Demo Credentials */}
        <div className="p-4 bg-[#f3f5f1] rounded-lg text-xs text-[#5f6a57] mb-6">
          <p className="font-medium text-[#2d5016] mb-2">Demo Credentials:</p>
          <p>Email: demo@example.com</p>
          <p>Password: demo123456</p>
        </div>

        {/* Footer */}
        <p className="text-center text-[#5f6a57]">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-[#2d5016] font-medium hover:text-[#5a7d3e]">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
