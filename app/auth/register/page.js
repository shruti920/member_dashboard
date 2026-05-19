'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { motion } from 'framer-motion';
import { FloatingParticles, CursorTrail, MagneticButton, Typewriter } from '@/components/animations';

export default function RegisterPage() {
  const router = useRouter();
  const { user, profile, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user && profile) {
      // Route based on role
      if (profile.role === 'mentor') {
        router.push('/dashboard/mentor');
      } else if (profile.role === 'admin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/dashboard');
      }
    }
  }, [user, profile, loading, router]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'member', // Default role
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

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
    setIsSubmitting(true);
    setError('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('All fields are required');
      setIsSubmitting(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: `${formData.firstName} ${formData.lastName}`,
          role: formData.role,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Registration failed');
        setIsSubmitting(false);
        return;
      }

      // Show success message
      alert('Registration successful! Please check your email to verify your account.');
      
      // Redirect to login page to sign in
      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    } catch (err) {
      setError(err.message || 'An error occurred');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0F0F0F]">
      {/* Floating particles background */}
      <FloatingParticles count={30} />

      {/* Cursor trail */}
      <CursorTrail enabled={true} />
      
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-[#F5C518] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-2xl">L</span>
            </div>
            <span className="font-bold text-2xl text-[#F5C518]">LearnHub</span>
          </div>
          <h1 className="text-3xl font-bold text-[#F5C518] mb-2">Create Account</h1>
          <p className="text-[#C4A000]">Join thousands of learners on LearnHub</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-[#F5C518] mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full px-4 py-2 border border-[#2A2A2A] rounded-lg bg-[#1A1A1A] text-white focus:outline-none focus:border-[#F5C518] focus:ring-2 focus:ring-[#F5C518]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#F5C518] mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full px-4 py-2 border border-[#2A2A2A] rounded-lg bg-[#1A1A1A] text-white focus:outline-none focus:border-[#F5C518] focus:ring-2 focus:ring-[#F5C518]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F5C518] mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full px-4 py-2 border border-[#2A2A2A] rounded-lg bg-[#1A1A1A] text-white focus:outline-none focus:border-[#F5C518] focus:ring-2 focus:ring-[#F5C518]/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F5C518] mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-[#2A2A2A] rounded-lg bg-[#1A1A1A] text-white focus:outline-none focus:border-[#F5C518] focus:ring-2 focus:ring-[#F5C518]/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#C4A000]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
{/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-[#F5C518] mb-3">
              I am a
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'member' })}
                className={`p-4 rounded-lg border-2 transition-all font-medium ${
                  formData.role === 'member'
                    ? 'border-[#F5C518] bg-[#F5C518] text-black'
                    : 'border-[#2A2A2A] bg-[#1A1A1A] text-[#F5C518] hover:border-[#F5C518]'
                }`}
              >
                👨‍🎓 Member
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'mentor' })}
                className={`p-4 rounded-lg border-2 transition-all font-medium ${
                  formData.role === 'mentor'
                    ? 'border-[#F5C518] bg-[#F5C518] text-black'
                    : 'border-[#2A2A2A] bg-[#1A1A1A] text-[#F5C518] hover:border-[#F5C518]'
                }`}
              >
                👨‍🏫 Mentor
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#F5C518] mb-2">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-[#2A2A2A] rounded-lg bg-[#1A1A1A] text-white focus:outline-none focus:border-[#F5C518] focus:ring-2 focus:ring-[#F5C518]/20"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#F5C518] text-black py-2 rounded-lg font-medium hover:bg-[#C4A000] disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[#C4A000] mt-6">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-[#F5C518] font-medium hover:text-[#C4A000]">
            Sign In
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
}
