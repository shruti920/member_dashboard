import { supabaseClient } from './supabase';

/**
 * Authenticate user with email and password
 */
export async function authenticateUser(email, password) {
  try {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return { success: true, user: data.user, session: data.session };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Register new user
 */
export async function registerUser(email, password, fullName) {
  try {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) throw error;

    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabaseClient
        .from('user_profiles')
        .insert([
          {
            user_id: data.user.id,
            full_name: fullName,
            email,
            role: 'member', // Default role
            created_at: new Date(),
          },
        ]);

      if (profileError) throw profileError;
    }

    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Logout user
 */
export async function logoutUser() {
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get current user session
 */
export async function getCurrentSession() {
  try {
    const {
      data: { session },
      error,
    } = await supabaseClient.auth.getSession();

    if (error) throw error;
    return { success: true, session };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Refresh authentication token
 */
export async function refreshToken() {
  try {
    const { data, error } = await supabaseClient.auth.refreshSession();
    if (error) throw error;
    return { success: true, session: data.session };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Reset password
 */
export async function resetPassword(email) {
  try {
    const { error } = await supabaseClient.auth.resetPasswordForEmail(email);
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId, updates) {
  try {
    const { data, error } = await supabaseClient
      .from('user_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, profile: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Get user profile
 */
export async function getUserProfile(userId) {
  try {
    const { data, error } = await supabaseClient
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return { success: true, profile: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated() {
  try {
    const {
      data: { session },
    } = await supabaseClient.auth.getSession();
    return session !== null;
  } catch {
    return false;
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback) {
  const {
    data: { subscription },
  } = supabaseClient.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });

  return subscription;
}

