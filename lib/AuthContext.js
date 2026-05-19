'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, getUserProfile, createUserProfile, signOut as supabaseSignOut } from './supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        if (!supabase) {
          console.warn('Supabase not configured');
          setLoading(false);
          return;
        }
        
        const { data, error } = await supabase.auth.getUser();
        const user = data?.user;

        if (user) {
          setUser(user);
          const userProfile = await getUserProfile(user.id);
          setProfile(userProfile);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Subscribe to auth changes
    if (supabase) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          try {
            let userProfile = await getUserProfile(session.user.id);
            if (!userProfile) {
              userProfile = await createUserProfile(
                session.user.id,
                session.user.email,
                session.user.user_metadata?.full_name || session.user.email.split('@')[0]
              );
            }
            setProfile(userProfile);
          } catch (err) {
            console.error('Error fetching profile:', err);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
      });

      return () => {
        subscription?.unsubscribe();
      };
    }
  }, []);

  const value = {
    user,
    profile,
    loading,
    error,
    isAuthenticated: !!user,
    signOut: async () => {
      if (!supabase) {
        throw new Error('Supabase not configured');
      }
      return supabaseSignOut();
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

