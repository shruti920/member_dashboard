# LearnHub - Production Setup Guide

## Project Overview
LearnHub is a comprehensive Learning Management System (LMS) with real-time 3D UI, Supabase backend, and email authentication.

## Technology Stack
- **Frontend**: Next.js 15 with React 19
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Email
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS v4

## Getting Started

### 1. Environment Variables
Create a `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Database Setup
Run the SQL migration to create all tables and RLS policies:

```bash
# Copy the SQL from scripts/setup-database.sql
# Paste it in your Supabase SQL Editor (Dashboard > SQL Editor > Create New Query)
```

Or use the Supabase CLI:
```bash
supabase db push
```

### 3. Create Demo User (Optional)
Sign up through the registration page or create manually in Supabase:
- Email: demo@example.com
- Password: demo123456

### 4. Install Dependencies
```bash
pnpm install
```

### 5. Run Development Server
```bash
pnpm dev
```

Visit `http://localhost:3000`

## Project Structure

```
app/
├── (auth)/                  # Authentication routes
│   ├── login/
│   └── register/
├── (dashboard)/             # Protected dashboard
│   ├── layout.js           # Dashboard sidebar
│   ├── admin/              # Admin panel
│   ├── mentor/             # Mentor panel
│   └── member/             # Member pages
├── api/                     # Backend API routes
│   ├── auth/
│   ├── tasks/
│   ├── submissions/
│   ├── leaderboard/
│   ├── doubts/
│   └── admin/
components/
├── 3d/                      # 3D UI Components
│   ├── SwipeCard.js        # Tinder-style cards
│   ├── FlipCard.js         # 3D flip cards
│   └── AnimatedBackground.js
lib/
├── supabase.js             # Supabase client & helpers
└── AuthContext.js          # Auth state management
scripts/
└── setup-database.sql      # Database schema
```

## Key Features

### Authentication
- Email-based sign up and login
- Session management with Supabase Auth
- Protected routes with role-based access (member, mentor, admin)

### 3D UI Components
- **SwipeCard**: Tinder-style task cards (drag right = accept, left = skip)
- **FlipCard**: 3D flip animation for learning materials
- **AnimatedBackground**: Particle effect background

### User Roles

#### Member
- View tasks (tasks-3d page with swipe cards)
- Submit solutions
- View learning materials (flip cards)
- Ask doubts to mentors
- Check leaderboard standings

#### Mentor
- Create and manage tasks
- Review submissions
- Answer student doubts
- Track student progress

#### Admin
- Manage users (change roles)
- Create competitions
- View analytics
- Oversee entire platform

### Database Schema

- **users**: User profiles with role (member, mentor, admin)
- **members**: Member-specific data (points, level, streak)
- **tasks**: Learning tasks created by mentors
- **submissions**: Task submissions with status tracking
- **doubts**: Q&A system with AI/mentor responses
- **materials**: Learning resources
- **competitions**: Competitive events
- **competition_participants**: Competition join tracking
- **leaderboard**: Rankings by points

### API Routes

All routes require authentication (check via Supabase Auth)

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/tasks` - Get tasks (filtered by category/difficulty)
- `POST /api/tasks` - Create task (mentor/admin only)
- `GET /api/submissions` - Get user submissions
- `POST /api/submissions` - Submit task
- `GET /api/leaderboard` - Get rankings
- `GET /api/doubts` - Get user doubts
- `POST /api/doubts` - Ask a doubt
- `GET /api/competitions` - Get active competitions
- `POST /api/competitions` - Create competition (admin only)
- `GET /api/admin/users` - Manage users (admin only)
- `PUT /api/admin/users` - Update user role (admin only)

## Deployment

### Deploy to Vercel
```bash
# Push to GitHub
git push origin main

# Vercel automatically deploys from GitHub
# Add environment variables in Vercel Dashboard > Settings > Environment Variables
```

### Environment Variables (Production)
Add these to your Vercel project:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL` (your production URL)

## Security Best Practices

✅ Implemented:
- Row Level Security (RLS) on all tables
- Email verification via Supabase
- Protected API routes with auth checks
- Role-based access control
- Input validation on all endpoints

## Troubleshooting

### "Missing Supabase credentials"
- Check `.env.local` has both NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
- Make sure variables are set in Vercel if deploying

### "RLS policy violation"
- Ensure user is authenticated
- Check user role matches endpoint requirements
- Verify RLS policies are created in Supabase

### 3D Cards not animating
- Ensure Three.js and @react-three/fiber are installed
- Check browser supports WebGL
- Try clearing browser cache

## Next Steps

1. **Setup Database**: Run `scripts/setup-database.sql` in Supabase
2. **Create Demo User**: Sign up via registration page
3. **Test Roles**: Update user role to `mentor` or `admin` in Supabase console
4. **Deploy**: Push to GitHub and deploy via Vercel

## Support
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Three.js Docs: https://threejs.org/docs
