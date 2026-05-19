# LearnHub - Quick Reference Guide

## 🚀 Quick Start (30 seconds)

1. **View your app** - Click the Preview button to see the landing page
2. **Test login** - Use demo@example.com / demo123456
3. **Explore 3D** - Navigate to "Interactive Tasks" to see swipe cards
4. **Check admin** - Login as admin to manage users and competitions

---

## 📍 Key URLs

| Feature | URL | Note |
|---------|-----|------|
| **Landing Page** | `/` | Public, marketing |
| **Login** | `/auth/login` | Demo creds available |
| **Register** | `/auth/register` | Email verification required |
| **Dashboard** | `/dashboard` | Protected, members only |
| **Tasks (3D)** | `/member/tasks-3d` | Swipeable cards |
| **Materials (3D)** | `/materials-3d` | Flippable cards |
| **Leaderboard** | `/leaderboard` | Real-time rankings |
| **Competitions** | `/competitions` | Team challenges |
| **AI Doubts** | `/doubts` | Question resolution |
| **Admin Panel** | `/admin` | Admin only |

---

## 🔐 Test Accounts

### Member Account
```
Email: member@example.com
Password: member123456
Role: member
```

### Mentor Account
```
Email: mentor@example.com
Password: mentor123456
Role: mentor
```

### Admin Account
```
Email: admin@example.com
Password: admin123456
Role: admin
```

---

## 📁 Important Files

### Configuration
- `lib/config.js` - App configuration & settings
- `lib/supabase.js` - Supabase client setup
- `next.config.mjs` - Next.js configuration

### Authentication
- `lib/AuthContext.js` - Auth state management
- `lib/auth-utils.js` - Auth utility functions
- `app/(auth)/login/page.js` - Login page
- `app/(auth)/register/page.js` - Registration page

### API Endpoints
- `app/api/auth/register/route.js` - User registration
- `app/api/tasks/route.js` - Task management
- `app/api/submissions/route.js` - Submission handling
- `app/api/leaderboard/route.js` - Rankings

### 3D Components
- `components/3d/SwipeCard.js` - Swipeable cards
- `components/3d/FlipCard.js` - Flippable cards
- `components/3d/AnimatedBackground.js` - Background
- `components/3d/ParticleSystem.js` - Particles

### Documentation
- `README.md` - Project overview
- `SETUP.md` - Setup instructions
- `DEPLOYMENT.md` - Deployment guide
- `ARCHITECTURE.md` - System architecture
- `BUILD_SUMMARY.md` - Build details

---

## 🔌 Environment Variables

Required for production:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email Service (optional)
SENDGRID_API_KEY=your-api-key
RESEND_API_KEY=your-api-key

# App Config
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_API_RATE_LIMIT=100
```

Check `lib/config.js` for all available options.

---

## 🗄️ Database Tables

```sql
CREATE TABLE profiles (
  id uuid PRIMARY KEY,
  email text UNIQUE NOT NULL,
  full_name text,
  role text DEFAULT 'member', -- 'member' | 'mentor' | 'admin'
  bio text,
  avatar_url text,
  points integer DEFAULT 0,
  created_at timestamp DEFAULT now()
);

CREATE TABLE tasks (
  id uuid PRIMARY KEY,
  title text NOT NULL,
  description text,
  difficulty text, -- 'easy' | 'medium' | 'hard'
  points integer,
  deadline timestamp,
  created_by uuid REFERENCES profiles(id),
  created_at timestamp DEFAULT now()
);

CREATE TABLE submissions (
  id uuid PRIMARY KEY,
  task_id uuid REFERENCES tasks(id),
  user_id uuid REFERENCES profiles(id),
  code text,
  status text DEFAULT 'pending', -- 'pending' | 'reviewed' | 'approved'
  score integer,
  submitted_at timestamp DEFAULT now()
);

CREATE TABLE competitions (
  id uuid PRIMARY KEY,
  title text NOT NULL,
  start_date timestamp,
  end_date timestamp,
  max_teams integer,
  created_at timestamp DEFAULT now()
);

CREATE TABLE leaderboards (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  rank integer,
  total_points integer,
  last_updated timestamp DEFAULT now()
);

CREATE TABLE doubts_questions (
  id uuid PRIMARY KEY,
  user_id uuid REFERENCES profiles(id),
  question text NOT NULL,
  answer text,
  resolved_by uuid REFERENCES profiles(id),
  status text DEFAULT 'open', -- 'open' | 'answered' | 'resolved'
  created_at timestamp DEFAULT now()
);

CREATE TABLE materials (
  id uuid PRIMARY KEY,
  title text NOT NULL,
  content text,
  category text,
  difficulty text,
  created_by uuid REFERENCES profiles(id),
  created_at timestamp DEFAULT now()
);
```

---

## 📡 API Endpoints Quick Reference

### Authentication
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/user
```

### Tasks & Learning
```
GET  /api/tasks
POST /api/tasks
GET  /api/materials
POST /api/submissions
```

### Social & Gamification
```
GET  /api/leaderboard
GET  /api/competitions
POST /api/competitions
GET  /api/doubts
POST /api/doubts
```

### Admin
```
GET  /api/admin/users
PUT  /api/admin/users/:id
POST /api/admin/roles
DELETE /api/admin/users/:id
```

### Response Format
```javascript
{
  success: true,
  data: {...},
  message: "Success message",
  timestamp: "2024-01-15T10:30:00Z"
}
```

---

## 🎨 Design System

### Colors
| Purpose | Color | Hex |
|---------|-------|-----|
| Primary | Siege Green | `#2d5016` |
| Light | Light Green | `#5a7d3e` |
| Dark | Dark Green | `#1a2f0b` |
| Background | White | `#ffffff` |
| Light BG | Off-white | `#f9faf8` |
| Border | Light Gray | `#e8ebe4` |
| Text | Dark Gray | `#1a1e14` |

### Typography
- **Font Family**: Geist, Geist Mono
- **Headings**: Bold, Siege Green
- **Body**: Regular, Dark Gray
- **Code**: Monospace

### Components
- `.btn-primary` - Green button
- `.btn-secondary` - White button with border
- `.card-green` - Card with border
- `.text-muted` - Muted text color

---

## 🛠️ Common Commands

```bash
# Development
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run linter

# Database
pnpm db:setup     # Initialize database
pnpm db:seed      # Seed test data
pnpm db:reset     # Reset database (dev only)

# Testing
pnpm test         # Run tests
pnpm test:watch   # Watch mode
```

---

## 🔒 Security Checklist

- [x] Supabase authentication enabled
- [x] Row-Level Security (RLS) on all tables
- [x] Password hashing implemented
- [x] Email verification required
- [x] HTTPS forced in production
- [x] CORS properly configured
- [x] Rate limiting on APIs
- [x] Input validation on all forms

---

## 📊 Role-Based Features

### Member
- View tasks & materials
- Submit solutions
- View leaderboard
- Ask doubts
- Join competitions

### Mentor
- Create & grade tasks
- Answer doubts
- Review submissions
- Manage materials
- Create competitions

### Admin
- User management
- Role assignment
- System configuration
- Analytics & reporting
- Competition management

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find module" | Run `pnpm install` |
| Auth not working | Check Supabase env vars |
| 3D animations stutter | Reduce particle count in config |
| Database errors | Run `pnpm db:setup` |
| Login fails | Verify email in Supabase |

See `SETUP.md` for detailed troubleshooting.

---

## 📈 Performance Tips

- Enable image optimization in `next.config.mjs`
- Use dynamic imports for heavy 3D components
- Implement caching headers in API routes
- Optimize database queries (add indexes)
- Use CDN for static assets
- Monitor Core Web Vitals

---

## 🌐 Deployment Checklist

- [ ] Set environment variables in Vercel
- [ ] Enable auto-deployments from GitHub
- [ ] Configure custom domain
- [ ] Set up email service (SendGrid/Resend)
- [ ] Enable error tracking (Sentry)
- [ ] Configure backups
- [ ] Set up monitoring & alerts
- [ ] Test production deployment

See `DEPLOYMENT.md` for full checklist.

---

## 📞 Getting Help

1. **Setup Issues** → Check `SETUP.md`
2. **Architecture Questions** → See `ARCHITECTURE.md`
3. **API Documentation** → Check `BUILD_SUMMARY.md`
4. **Deployment Help** → See `DEPLOYMENT.md`
5. **Code Examples** → Check specific route files in `/app`

---

## 🎓 Next Steps

1. **Customize branding** - Update logo, colors, and text
2. **Add more features** - Build on the existing API
3. **Invite users** - Send invitations and test
4. **Collect feedback** - Gather user feedback
5. **Iterate** - Improve based on usage

---

## ✨ What You Have

✅ Full-stack LMS with Supabase backend  
✅ 3D interactive UI with Three.js  
✅ Real-time authentication system  
✅ Role-based access control  
✅ API endpoints for all features  
✅ Complete documentation  
✅ Production-ready deployment  

**You're ready to launch!** 🚀
