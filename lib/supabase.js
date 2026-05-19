import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Log environment variable status for debugging
if (typeof window === 'undefined') {
  // Server side
  if (!supabaseUrl) console.error('Missing NEXT_PUBLIC_SUPABASE_URL');
  if (!supabaseAnonKey) console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Initialize with placeholder if credentials missing, will handle in functions
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Service role client for server-side operations (bypasses RLS)
export const supabaseAdmin = supabaseUrl && supabaseServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null;

const checkSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase is not configured. Please check your environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
};

// Auth functions
export const signUp = async (email, password, fullName) => {
  checkSupabase();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;
  return data;
};

export const signIn = async (email, password) => {
  checkSupabase();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  checkSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  checkSupabase();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
};

// Database functions
export const getUserProfile = async (userId) => {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const createUserProfile = async (userId, email, fullName, role = 'member') => {
  // Use admin client to bypass RLS during user creation
  const client = supabaseAdmin || supabase;
  
  const { data, error } = await client
    .from('users')
    .insert([
      {
        id: userId,
        email,
        full_name: fullName,
        role,
      },
    ])
    .select()
    .single();

  if (error) throw error;

  // Create member profile if role is member
  if (role === 'member') {
    await client.from('members').insert([{ id: userId }]);
  }

  return data;
};

export const getTasks = async (filters = {}) => {
  let query = supabase.from('tasks').select('*').eq('is_active', true);

  if (filters.category) {
    query = query.eq('category', filters.category);
  }
  if (filters.difficulty) {
    query = query.eq('difficulty', filters.difficulty);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getTaskById = async (taskId) => {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', taskId)
    .single();

  if (error) throw error;
  return data;
};

export const createTask = async (taskData) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert([taskData])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const submitTask = async (taskId, userId, submissionText, submissionUrl) => {
  const { data, error } = await supabase
    .from('submissions')
    .insert([
      {
        task_id: taskId,
        user_id: userId,
        submission_text: submissionText,
        submission_url: submissionUrl,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getSubmissions = async (userId) => {
  const { data, error } = await supabase
    .from('submissions')
    .select('*, tasks(*)')
    .eq('user_id', userId)
    .order('submitted_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getLeaderboard = async (limit = 100) => {
  const { data, error } = await supabase
    .from('leaderboard')
    .select('*, users(*)')
    .order('rank', { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data;
};

export const askDoubt = async (userId, title, description, category) => {
  const { data, error } = await supabase
    .from('doubts')
    .insert([
      {
        user_id: userId,
        title,
        description,
        category,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getDoubts = async (userId) => {
  const { data, error } = await supabase
    .from('doubts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const getMaterials = async (filters = {}) => {
  let query = supabase.from('materials').select('*');

  if (filters.category) {
    query = query.eq('category', filters.category);
  }
  if (filters.difficulty) {
    query = query.eq('difficulty', filters.difficulty);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getCompetitions = async (status = 'active') => {
  const { data, error } = await supabase
    .from('competitions')
    .select('*')
    .eq('status', status)
    .order('start_date', { ascending: true });

  if (error) throw error;
  return data;
};

export const getCompetitionById = async (competitionId) => {
  const { data, error } = await supabase
    .from('competitions')
    .select('*, competition_participants(*)')
    .eq('id', competitionId)
    .single();

  if (error) throw error;
  return data;
};

export const joinCompetition = async (competitionId, userId) => {
  const { data, error } = await supabase
    .from('competition_participants')
    .insert([
      {
        competition_id: competitionId,
        user_id: userId,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*, members(*)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateUserRole = async (userId, newRole) => {
  const { data, error } = await supabase
    .from('users')
    .update({ role: newRole })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

