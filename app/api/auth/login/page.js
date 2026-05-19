'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const redirectByRole = (role) => {
    // Using router.push is better for Next.js SPA navigation than window.location
    if (role === 'mentor') {
      router.push('/dashboard/mentor');
    } else if (role === 'admin') {
      router.push('/dashboard/admin');
    } else {
      router.push('/dashboard/member');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      // 1. Sign in the user
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data?.user) {
        // 2. Fetch the user's role from your custom 'users' table
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('role')
          .eq('id', data.user.id)
          .single();

        // 3. Determine the role (Profile table first, then Metadata fallback)
        const userRole = userProfile?.role || data.user.user_metadata?.role;

        if (userRole) {
          redirectByRole(userRole);
        } else {
          // Default fallback if no role is found anywhere
          redirectByRole('member');
        }
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
    // Note: We don't setLoading(false) here on success because 
    // the page is about to redirect/unmount.
  };

  return (
    <div className="min-h-screen bg-[#f8faf6] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#2d5016] rounded-2xl mb-4 shadow-lg">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M4 22L10 10L16 16L20 8L24 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="10" r="2" fill="white" opacity="0.6"/>
              <circle cx="20" cy="8" r="2" fill="white" opacity="0.6"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#2d5016]">LearnHub</h1>
          <p className="text-[#5f6a57] mt-1 text-sm">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 rounded-2xl border border-[#e8ebe4] shadow-sm">
          
          {/* Error Alert */}
          {error && (
            <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm mb-6">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2d5016] mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] placeholder-[#8a9285] focus:outline-none focus:border-[#2d5016] focus:ring-1 focus:ring-[#2d5016] transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#2d5016]">
                  Password
                </label>
                <Link href="/forgot-password" size="sm" className="text-xs text-[#5f6a57] hover:text-[#2d5016] transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 pr-11 border border-[#e8ebe4] rounded-lg bg-white text-[#1a1e14] placeholder-[#8a9285] focus:outline-none focus:border-[#2d5016] focus:ring-1 focus:ring-[#2d5016] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a9285] hover:text-[#2d5016] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2d5016] text-white py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#234012] disabled:opacity-60 disabled:cursor-not-allowed transition-all mt-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e8ebe4]" />
            </div>
            <div className="relative flex justify-center text-xs text-[#8a9285] bg-white px-3 mx-auto w-fit">
              Don't have an account?
            </div>
          </div>

          <Link
            href="/register"
            className="w-full py-2.5 border border-[#e8ebe4] rounded-lg text-sm font-medium text-[#2d5016] flex items-center justify-center hover:bg-[#f8faf6] transition-colors"
          >
            Create Account
          </Link>
        </div>

        <p className="text-center text-xs text-[#8a9285] mt-6">
          By signing in, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-[#2d5016]">Terms</Link> and{' '}
          <Link href="/privacy" className="underline hover:text-[#2d5016]">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  );
}