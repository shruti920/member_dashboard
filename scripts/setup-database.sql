-- Create tables for LMS Platform

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'mentor', 'admin')),
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Members profile
CREATE TABLE IF NOT EXISTS public.members (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  points INT DEFAULT 0,
  level INT DEFAULT 1,
  total_submissions INT DEFAULT 0,
  completed_tasks INT DEFAULT 0,
  streak INT DEFAULT 0,
  last_submission_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  points INT DEFAULT 10,
  deadline TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Task submissions
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id UUID NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  submission_text TEXT,
  submission_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  feedback TEXT,
  points_earned INT DEFAULT 0,
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reviewed_at TIMESTAMP,
  reviewed_by UUID REFERENCES users(id),
  UNIQUE(task_id, user_id)
);

-- Doubts/Questions table
CREATE TABLE IF NOT EXISTS public.doubts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'answered', 'closed')),
  ai_response TEXT,
  mentor_response TEXT,
  responded_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP
);

-- Learning materials
CREATE TABLE IF NOT EXISTS public.materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  content_url TEXT,
  category TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Competitions
CREATE TABLE IF NOT EXISTS public.competitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP NOT NULL,
  end_date TIMESTAMP NOT NULL,
  prize_pool INT DEFAULT 0,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed')),
  created_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Competition participants
CREATE TABLE IF NOT EXISTS public.competition_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id UUID NOT NULL REFERENCES competitions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  score INT DEFAULT 0,
  rank INT,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(competition_id, user_id)
);

-- Leaderboard (materialized view for performance)
CREATE TABLE IF NOT EXISTS public.leaderboard (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rank INT,
  points INT,
  level INT,
  month TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doubts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competition_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
DROP POLICY IF EXISTS "Users can read public profile info" ON public.users;
DROP POLICY IF EXISTS "Users can create their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;

CREATE POLICY "Users can read public profile info" 
  ON public.users FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for members table
DROP POLICY IF EXISTS "Members can read all member profiles" ON public.members;
DROP POLICY IF EXISTS "Members can create their own profile" ON public.members;
DROP POLICY IF EXISTS "Members can update their own profile" ON public.members;

CREATE POLICY "Members can read all member profiles"
  ON public.members FOR SELECT
  USING (true);

CREATE POLICY "Members can create their own profile"
  ON public.members FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Members can update their own profile"
  ON public.members FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for tasks
DROP POLICY IF EXISTS "Anyone can read active tasks" ON public.tasks;
DROP POLICY IF EXISTS "Mentors and admins can create tasks" ON public.tasks;

CREATE POLICY "Anyone can read active tasks"
  ON public.tasks FOR SELECT
  USING (is_active = true);

CREATE POLICY "Mentors and admins can create tasks"
  ON public.tasks FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('mentor', 'admin')
    )
  );

-- RLS Policies for submissions
DROP POLICY IF EXISTS "Users can view their own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Users can create their own submissions" ON public.submissions;
DROP POLICY IF EXISTS "Mentors and admins can review submissions" ON public.submissions;

CREATE POLICY "Users can view their own submissions"
  ON public.submissions FOR SELECT
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role IN ('mentor', 'admin')
  ));

CREATE POLICY "Users can create their own submissions"
  ON public.submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Mentors and admins can review submissions"
  ON public.submissions FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role IN ('mentor', 'admin')
  ));

-- RLS Policies for doubts
DROP POLICY IF EXISTS "Users can view their own doubts" ON public.doubts;
DROP POLICY IF EXISTS "Users can create doubts" ON public.doubts;

CREATE POLICY "Users can view their own doubts"
  ON public.doubts FOR SELECT
  USING (auth.uid() = user_id OR EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role IN ('mentor', 'admin')
  ));

CREATE POLICY "Users can create doubts"
  ON public.doubts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for materials
DROP POLICY IF EXISTS "Anyone can read materials" ON public.materials;
DROP POLICY IF EXISTS "Mentors and admins can create materials" ON public.materials;

CREATE POLICY "Anyone can read materials"
  ON public.materials FOR SELECT
  USING (true);

CREATE POLICY "Mentors and admins can create materials"
  ON public.materials FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('mentor', 'admin')
    )
  );

-- RLS Policies for competitions
DROP POLICY IF EXISTS "Anyone can read competitions" ON public.competitions;
DROP POLICY IF EXISTS "Admins can manage competitions" ON public.competitions;

CREATE POLICY "Anyone can read competitions"
  ON public.competitions FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage competitions"
  ON public.competitions FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.users 
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- RLS Policies for competition participants
DROP POLICY IF EXISTS "Users can view participants" ON public.competition_participants;
DROP POLICY IF EXISTS "Users can join competitions" ON public.competition_participants;

CREATE POLICY "Users can view participants"
  ON public.competition_participants FOR SELECT
  USING (true);

CREATE POLICY "Users can join competitions"
  ON public.competition_participants FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for leaderboard
DROP POLICY IF EXISTS "Anyone can read leaderboard" ON public.leaderboard;

CREATE POLICY "Anyone can read leaderboard"
  ON public.leaderboard FOR SELECT
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_task_id ON public.submissions(task_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions(status);
CREATE INDEX IF NOT EXISTS idx_doubts_user_id ON public.doubts(user_id);
CREATE INDEX IF NOT EXISTS idx_doubts_status ON public.doubts(status);
CREATE INDEX IF NOT EXISTS idx_tasks_created_by ON public.tasks(created_by);
CREATE INDEX IF NOT EXISTS idx_competitions_status ON public.competitions(status);
CREATE INDEX IF NOT EXISTS idx_leaderboard_rank ON public.leaderboard(rank);
