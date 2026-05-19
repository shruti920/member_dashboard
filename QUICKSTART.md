# LearnHub - Quick Start Guide

## 🚀 Welcome to LearnHub!

A production-ready, full-stack Learning Management System built with Next.js, Supabase, and Three.js 3D animations.

---

## ⚡ 5-Minute Setup

### Step 1: Clone and Install
```bash
cd /vercel/share/v0-project
pnpm install
```

### Step 2: Setup Environment
Create `.env.local` and add:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

Get these from your Supabase project settings.

### Step 3: Setup Database
1. Go to your Supabase dashboard
2. Open SQL Editor
3. Copy-paste contents of `/scripts/setup-database.sql`
4. Click "Run"

### Step 4: Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📝 Demo Credentials

For testing (after database setup):
- **Email**: demo@example.com
- **Password**: demo123456
- **Role**: member

---

## 🎯 Key Pages

### Public Pages
- `/` - Landing page
- `/auth/login` - Login
- `/auth/register` - Sign up

### Member Pages (Logged In)
- `/dashboard` - Main dashboard
- `/member/tasks` - View tasks
- `/member/tasks-3d` - Interactive 3D task cards
- `/member/submissions` - Your submissions
- `/member/profile` - User profile
- `/leaderboard` - Global rankings
- `/doubts` - Ask questions (AI support)
- `/materials` - Learning resources
- `/materials-3d` - 3D material browser
- `/competitions` - Competitions

### Mentor Pages
- `/mentor` - Mentor dashboard
- `/mentor/tasks` - Create/manage tasks
- `/mentor/submissions` - Review submissions
- `/mentor/doubts` - Answer questions

### Admin Pages
- `/admin` - Admin dashboard
- `/admin/users` - Manage users & roles
- `/admin/competitions` - Manage competitions
- `/admin/analytics` - View analytics

---

## 🔐 Authentication Flow

1. **Register** - New user creates account with email
2. **Email Verification** - User confirms email (Supabase sends link)
3. **Login** - User logs in with email/password
4. **Session** - AuthContext manages session state
5. **Protected Routes** - User redirected if not authenticated

---

## 🎨 Design System

### Colors (Siege Green Theme)
- **Primary**: #2d5016 (Siege Green)
- **Light**: #5a7d3e
- **Dark**: #1a2f0b
- **Background**: #ffffff (White)
- **Text**: #1a1e14 (Dark Gray)

### 3D Components
- **SwipeCard** - Tinder-style swiping for tasks
- **FlipCard** - 3D flip cards for materials
- **AnimatedBackground** - Floating background
- **ParticleSystem** - Animated particle effects

---

## 📊 User Roles

### Member
- View and complete tasks
- Submit solutions
- Compete on leaderboard
- Ask questions
- Access learning materials

### Mentor
- Create and manage tasks
- Review student submissions
- Answer student questions
- Upload learning materials
- View student analytics

### Admin
- Manage all users (change roles)
- Create competitions
- View platform analytics
- Moderate content
- System management

---

## 🔗 API Routes

### Authentication
```
POST   /api/auth/register          - Create account
POST   /api/auth/login             - Login
GET    /api/auth/user              - Get user profile
```

### Tasks
```
GET    /api/tasks                  - List tasks
POST   /api/tasks                  - Create task (mentor)
PUT    /api/tasks/[id]             - Update task
```

### Submissions
```
GET    /api/submissions            - Get submissions
POST   /api/submissions            - Submit task
```

### Leaderboard
```
GET    /api/leaderboard            - Get rankings
```

### Other
```
GET    /api/competitions           - List competitions
GET    /api/doubts                 - Get Q&A
GET    /api/materials              - Get resources
GET    /api/admin/users            - Manage users
```

---

## 🧪 Testing the Application

### Test Admin Access
1. Change a user's role to 'admin' in Supabase
2. Login with that user
3. Visit `/admin` to see admin features

### Test 3D Features
- Go to `/member/tasks-3d` for swipe cards
- Go to `/materials-3d` for flip cards
- Check browser WebGL support if not working

### Test Email (Development)
- Supabase auto-confirms in dev mode
- In production, user must click email link

---

## 📁 Project Structure

```
/vercel/share/v0-project/
├── app/                          # Next.js app directory
│   ├── (auth)/                   # Auth pages (login, register)
│   ├── (dashboard)/              # Dashboard pages (private)
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── tasks/                # Task management
│   │   ├── submissions/          # Student submissions
│   │   ├── admin/                # Admin endpoints
│   │   └── ...
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Landing page
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── 3d/                       # 3D components (Three.js)
│   │   ├── SwipeCard.js          # Swipeable cards
│   │   ├── FlipCard.js           # 3D flip cards
│   │   ├── AnimatedBackground.js # Animated background
│   │   └── ParticleSystem.js     # Particle effects
│   ├── Navbar.js                 # Navigation bar
│   ├── ProtectedRoute.js         # Route protection
│   └── ...
├── lib/                          # Utilities
│   ├── supabase.js               # Supabase client
│   ├── AuthContext.js            # Auth context provider
│   ├── auth-utils.js             # Auth functions
│   ├── config.js                 # Configuration
│   └── utils.js                  # Helper functions
├── scripts/                      # Setup & automation
│   ├── setup-database.sql        # Database schema
│   └── test-setup.js             # Verify setup
├── public/                       # Static files
├── package.json                  # Dependencies
├── next.config.mjs               # Next.js config
├── tailwind.config.ts            # Tailwind config
├── SETUP.md                      # Setup guide
├── DEPLOYMENT.md                 # Deployment guide
├── README.md                     # Full documentation
└── QUICKSTART.md                 # This file
```

---

## 🚀 Deployment to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Import Project
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repo
4. Add environment variables
5. Deploy!

### Step 3: Monitor
- Check Vercel dashboard for deployment status
- Monitor function logs
- View analytics

---

## 🐛 Troubleshooting

### "Supabase connection failed"
→ Check `.env.local` has correct credentials

### "3D components not rendering"
→ Ensure WebGL is enabled in browser settings

### "Email not verifying"
→ Check Supabase email settings in dashboard

### "Routes not working"
→ Restart dev server: `pnpm dev`

### "Dependencies issue"
→ Clear cache and reinstall: `rm -rf node_modules && pnpm install`

---

## 📚 Next Steps

1. **Customize** - Update colors, fonts, copy
2. **Add Features** - Extend with new functionality
3. **Deploy** - Push to Vercel
4. **Monitor** - Track usage and errors
5. **Scale** - Add more servers/database replicas

---

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Three.js Docs](https://threejs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 💬 Support

For issues:
1. Check SETUP.md and DEPLOYMENT.md
2. Review error logs in browser console
3. Check Supabase dashboard for database issues
4. Contact support at support@learnhub.com

---

## 📄 License

MIT License - Free to use and modify

---

**Ready to launch? Run `pnpm dev` and start building!** 🎉
