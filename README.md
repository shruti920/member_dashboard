# LearnHub - Advanced Learning Management System

A production-ready Learning Management System (LMS) with real-time 3D UI, comprehensive backend, and email authentication. Built with Next.js 15, Supabase, and Three.js.

## ✨ Features

### 🎨 3D Interactive UI
- **Tinder-style Swipe Cards**: Drag right to accept tasks, left to skip - smooth 3D rotation and scaling animations
- **3D Flip Cards**: Click to reveal learning material content with 3D perspective flip animation
- **Animated Background**: Particle effect system with connecting lines creating a dynamic background
- **Smooth Animations**: Framer Motion for fluid transitions and micro-interactions

### 🔐 Authentication & Security
- **Email-based Authentication**: Sign up and login via Supabase Auth
- **Email Verification**: Confirmation emails sent automatically
- **Role-based Access Control**: Three user roles - Member, Mentor, and Admin
- **Session Management**: Secure session handling with automatic refresh
- **Row Level Security (RLS)**: Database-level security policies for each user role

### 📚 Learning Management
- **Task System**: Create, submit, and review learning tasks
- **Submission Tracking**: Track student submissions with status (pending, approved, rejected)
- **Points & Rewards**: Gamified learning with points, levels, and streaks
- **Learning Materials**: Curated content with difficulty levels
- **Doubt Resolution**: Q&A system with mentor and AI responses

### 🏆 Gamification & Competitions
- **Leaderboard**: Real-time rankings by points and performance
- **Competitions**: Create competitive events with prize pools
- **Badges & Achievements**: Recognize milestones and achievements
- **Streaks**: Continuous learning incentives

### 👥 User Management
- **Admin Dashboard**: Full user management with role assignment
- **Member Profiles**: Detailed profile with progress tracking
- **Mentor Tools**: Advanced task creation and submission review
- **Analytics**: Performance metrics and learning insights

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **React**: 19 with Server Components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with Email
- **3D Graphics**: Three.js + React Three Fiber
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+ and pnpm
- Supabase account (free tier available)
- Basic understanding of Next.js and React

## 🛠️ Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/learnhub.git
cd learnhub
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Configure Supabase

#### Option A: Using Existing Supabase Project
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or use existing one
3. Find your API credentials under Settings > API

#### Option B: Create New Project
```bash
npm install -g supabase
supabase init
supabase start
```

### 4. Set Up Environment Variables
Create `.env.local`:

```env
# Supabase API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Create Database Schema
Copy the SQL from `scripts/setup-database.sql`:

```sql
-- In Supabase Dashboard > SQL Editor > New Query
-- Paste entire contents of scripts/setup-database.sql
```

Or use CLI:
```bash
supabase db push
```

### 6. Create Demo User (Optional)
In Supabase Dashboard > Authentication > Users:
- Email: demo@example.com
- Password: demo123456

### 7. Start Development Server
```bash
pnpm dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
learnhub/
├── app/
│   ├── (auth)/                 # Authentication routes
│   │   ├── login/
│   │   ├── register/
│   │   └── callback/
│   ├── (dashboard)/            # Protected dashboard
│   │   ├── layout.js          # Dashboard sidebar & navigation
│   │   ├── dashboard/         # Main dashboard
│   │   ├── admin/             # Admin panel
│   │   │   ├── page.js       # Overview
│   │   │   ├── users/        # User management
│   │   │   ├── competitions/ # Competition management
│   │   │   └── analytics/    # Analytics & reports
│   │   ├── mentor/            # Mentor panel
│   │   │   ├── page.js       # Overview
│   │   │   ├── tasks/        # Manage tasks
│   │   │   ├── tasks/create/ # Create new task
│   │   │   ├── submissions/  # Review submissions
│   │   │   └── doubts/       # Answer doubts
│   │   ├── member/            # Member pages
│   │   │   ├── tasks/        # View available tasks
│   │   │   ├── tasks-3d/     # 3D swipe tasks
│   │   │   ├── submissions/  # Task submissions
│   │   │   └── profile/      # Member profile
│   │   ├── leaderboard/       # Rankings
│   │   ├── doubts/            # Q&A system
│   │   ├── materials/         # Learning resources
│   │   ├── materials-3d/      # 3D flip cards
│   │   └── competitions/      # Browse competitions
│   ├── api/                    # API routes
│   │   ├── auth/
│   │   │   ├── register/
│   │   │   ├── login/
│   │   │   └── logout/
│   │   ├── tasks/
│   │   ├── submissions/
│   │   ├── leaderboard/
│   │   ├── doubts/
│   │   ├── competitions/
│   │   └── admin/
│   │       └── users/
│   ├── layout.js              # Root layout
│   ├── page.js               # Landing page
│   └── globals.css           # Global styles
├── components/
│   ├── 3d/
│   │   ├── SwipeCard.js       # Tinder-style swipe card
│   │   ├── FlipCard.js        # 3D flip card
│   │   └── AnimatedBackground.js # Particle background
│   ├── ProtectedRoute.js       # Auth guard component
│   └── [other components]/
├── lib/
│   ├── supabase.js            # Supabase client & helpers
│   └── AuthContext.js         # Auth state management
├── public/                     # Static assets
├── scripts/
│   └── setup-database.sql     # Database schema
├── SETUP.md                    # Setup guide
├── README.md                   # This file
└── package.json
```

## 🔑 Key API Routes

All routes are protected with Supabase authentication.

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/callback` - OAuth callback

### Tasks
- `GET /api/tasks` - Get all tasks (queryable by category/difficulty)
- `POST /api/tasks` - Create task (mentor/admin only)
- `GET /api/tasks/[id]` - Get single task
- `PUT /api/tasks/[id]` - Update task (mentor/admin only)

### Submissions
- `GET /api/submissions?userId=...` - Get user submissions
- `POST /api/submissions` - Submit task
- `PUT /api/submissions/[id]` - Update submission status (mentor only)

### Leaderboard
- `GET /api/leaderboard?limit=100` - Get rankings

### Doubts
- `GET /api/doubts?userId=...` - Get user doubts
- `POST /api/doubts` - Ask a doubt
- `PUT /api/doubts/[id]` - Respond to doubt (mentor/admin only)

### Competitions
- `GET /api/competitions?status=active` - Get competitions
- `POST /api/competitions` - Create competition (admin only)
- `POST /api/competitions/[id]/join` - Join competition

### Admin
- `GET /api/admin/users?adminId=...` - List all users (admin only)
- `PUT /api/admin/users` - Update user role (admin only)

## 🎯 User Roles

### Member
- View and submit tasks
- Access learning materials
- Check leaderboard rankings
- Ask doubts to mentors
- Participate in competitions

### Mentor
- Create and manage tasks
- Review member submissions
- Answer member doubts
- View member progress

### Admin
- Manage all users
- Create competitions
- View analytics
- Oversee platform activity

## 🗄️ Database Schema

### Tables
- **users** - User profiles with authentication
- **members** - Member-specific data (points, level, streak)
- **tasks** - Learning tasks
- **submissions** - Task submissions with reviews
- **doubts** - Q&A system
- **materials** - Learning resources
- **competitions** - Competitive events
- **competition_participants** - Competition join tracking
- **leaderboard** - Performance rankings

All tables have Row Level Security (RLS) enabled for data privacy.

## 🔒 Security Features

✅ **Authentication**
- Supabase Auth with email verification
- Session management with automatic refresh
- Protected API routes with role checking

✅ **Database Security**
- Row Level Security (RLS) on all tables
- Role-based access policies
- Parameterized queries prevent SQL injection

✅ **Frontend Security**
- Protected routes with auth guards
- Secure session storage
- CORS configured properly

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
- Go to [Vercel Dashboard](https://vercel.com/dashboard)
- Click "New Project"
- Import your GitHub repository

3. **Configure Environment Variables**
In Vercel Project Settings > Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

4. **Deploy**
- Click "Deploy"
- Vercel automatically builds and deploys

### Deploy Database (if needed)
```bash
# Using Supabase CLI
supabase link --project-ref your-project-ref
supabase db push
```

## 📊 Performance Optimizations

- Next.js Image Optimization for fast loading
- Code splitting and lazy loading
- Database query optimization with indexes
- RLS policies for secure, efficient queries
- Caching strategies for static content

## 🐛 Troubleshooting

### "Missing Supabase credentials"
- Check `.env.local` has both required variables
- Ensure variables are set in Vercel if deployed

### "RLS policy violation"
- Ensure user is authenticated
- Check user role matches endpoint requirements
- Verify RLS policies are created in Supabase

### "3D Cards not working"
- Check browser supports WebGL
- Ensure Three.js and dependencies installed
- Try clearing browser cache

### "Email verification not working"
- Check Supabase email settings in Dashboard
- Verify email configuration under Authentication > Settings
- Check spam folder for verification email

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

## 💬 Support

For support, email support@learnhub.com or open an issue in the repository.

## 🌟 Roadmap

- [ ] Real-time notifications with Supabase Realtime
- [ ] AI-powered doubt resolution
- [ ] Video learning content
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Team-based competitions
- [ ] Certificate system
- [ ] Discussion forums

---

Built with ❤️ for learners everywhere.
