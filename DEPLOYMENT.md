# LearnHub - Deployment Guide

## Quick Start - Deploy to Vercel

### 1. Prerequisites
- Supabase account with database set up
- Vercel account
- Node.js 18+ installed locally
- Git repository

### 2. Deploy to Vercel

#### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial LearnHub commit"
git push origin main
```

#### Step 2: Import to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"

#### Step 3: Add Environment Variables
In the Vercel dashboard, go to Settings → Environment Variables and add:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

#### Step 4: Deploy
Click "Deploy" and wait for the build to complete.

---

## Local Development Setup

### 1. Clone and Install
```bash
git clone your-repo-url
cd learnhub
pnpm install
```

### 2. Setup Supabase

#### Create Tables:
1. Go to your Supabase project dashboard
2. Go to SQL Editor
3. Copy and paste the contents of `/scripts/setup-database.sql`
4. Click "Run"

Or use the SQL command directly:
```bash
psql -U postgres -h your-host.supabase.co -d postgres -f scripts/setup-database.sql
```

#### Setup RLS Policies:
Follow the SQL file to set up Row Level Security for authentication

### 3. Setup Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 4. Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Database Schema

### Tables
- **auth.users** - Supabase auth table (automatic)
- **user_profiles** - User profile data with roles (member, mentor, admin)
- **tasks** - Learning tasks created by mentors
- **submissions** - Student task submissions
- **competitions** - Competition events
- **leaderboard** - User rankings
- **materials** - Learning resources
- **doubts** - Q&A and support requests

### Authentication Flow
1. User registers via `/auth/register`
2. Supabase sends confirmation email
3. User confirms email to activate account
4. Login via `/auth/login`
5. Session stored in AuthContext
6. Protected routes check authentication

---

## User Roles & Permissions

### Member (Student)
- View tasks
- Submit tasks
- View leaderboard
- Ask doubts
- View materials
- Participate in competitions

### Mentor
- Create tasks
- Review submissions
- Answer student doubts
- Create/manage competitions
- Upload materials

### Admin
- Manage all users (change roles)
- View analytics
- Manage all competitions
- Manage all tasks
- View platform statistics

---

## API Routes Overview

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user profile

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task (mentor only)
- `GET /api/tasks/[id]` - Get task details
- `PUT /api/tasks/[id]` - Update task (mentor only)

### Submissions
- `GET /api/submissions` - Get user submissions
- `POST /api/submissions` - Submit task
- `GET /api/submissions/[id]` - Get submission details

### Leaderboard
- `GET /api/leaderboard` - Get global rankings

### Competitions
- `GET /api/competitions` - Get all competitions
- `POST /api/competitions` - Create competition (admin only)
- `GET /api/competitions/[id]` - Get competition details

### Materials
- `GET /api/materials` - Get learning materials
- `POST /api/materials` - Upload material (mentor only)

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users` - Update user role
- `GET /api/admin/analytics` - Get platform analytics

---

## 3D Components & Features

### SwipeCard Component
- Location: `/components/3d/SwipeCard.js`
- Used in: Tasks page with Tinder-style interaction
- Features: Drag to swipe, rotate on interaction

### FlipCard Component
- Location: `/components/3d/FlipCard.js`
- Used in: Materials page with 3D flip effect
- Features: Click to flip, 3D perspective

### AnimatedBackground
- Location: `/components/3d/AnimatedBackground.js`
- Features: Floating animated background with Three.js
- Used on: All pages for visual enhancement

### ParticleSystem
- Location: `/components/3d/ParticleSystem.js`
- Features: Animated particles with physics
- Optional: Can be added to specific pages

---

## Performance Optimization

### Image Optimization
- Use Next.js `Image` component
- Images are automatically optimized

### Code Splitting
- Page routes are automatically code-split
- Dynamic imports for 3D components

### Database Indexing
- Indexes are set up on common queries
- Check Supabase dashboard for query performance

### Caching
- Use SWR for client-side data fetching
- Server-side caching with revalidateTag

---

## Security Best Practices

### Implemented
- ✅ Supabase Auth with email verification
- ✅ Row Level Security (RLS) on all tables
- ✅ Protected API routes with token verification
- ✅ Secure session management
- ✅ Role-based access control

### Additional Recommendations
- Enable 2FA in Supabase
- Use HTTPS only
- Regular security audits
- Keep dependencies updated

---

## Troubleshooting

### Email Not Sending
- Check Supabase email settings
- Verify SMTP configuration
- Check spam folder

### 3D Components Not Rendering
- Ensure WebGL is enabled in browser
- Check browser console for errors
- Try disabling hardware acceleration if needed

### Database Connection Issues
- Verify connection string
- Check firewall settings
- Ensure Supabase is running

### Authentication Errors
- Clear browser cookies
- Check environment variables
- Verify token in localStorage

---

## Monitoring & Logs

### Vercel
- Check build logs in Vercel dashboard
- Monitor function execution time
- View error logs

### Supabase
- Monitor database performance
- View auth logs
- Check API usage

### Application
- Use console.log for debugging (remove in production)
- Set up error tracking with Sentry (optional)
- Monitor 3D performance with Chrome DevTools

---

## Support & Resources

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Three.js Docs**: https://threejs.org/docs
- **React Three Fiber**: https://docs.pmnd.rs/react-three-fiber

---

## Version History

- **v1.0.0** - Initial release
  - Basic auth system
  - Task management
  - 3D UI components
  - Admin panel
  - Leaderboard system

---

## License

MIT License - See LICENSE file for details
