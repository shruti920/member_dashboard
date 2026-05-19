# LearnHub - System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │         React Components (Client-Side)                │    │
│  │  ┌──────────────────────────────────────────────────┐ │    │
│  │  │  Landing Page  │ Auth Pages │ Dashboard Pages    │ │    │
│  │  └──────────────────────────────────────────────────┘ │    │
│  │  ┌──────────────────────────────────────────────────┐ │    │
│  │  │ 3D Components (Three.js + React Three Fiber)     │ │    │
│  │  │ - SwipeCard  │ FlipCard  │ AnimatedBackground   │ │    │
│  │  └──────────────────────────────────────────────────┘ │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              ↕
                    (HTTPS API Calls)
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER (Edge)                        │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │           API Routes (/api/*)                          │    │
│  │  ┌──────────────────────────────────────────────────┐ │    │
│  │  │ Auth      │ Tasks     │ Competitions             │ │    │
│  │  │ Doubts    │ Materials │ Leaderboard             │ │    │
│  │  │ Submissions│ Admin     │ Users                   │ │    │
│  │  └──────────────────────────────────────────────────┘ │    │
│  └────────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │        Server-Side Rendering (RSC)                     │    │
│  │        Authentication Middleware                       │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              ↕
                   (Supabase REST API)
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                       SUPABASE CLOUD                             │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │         PostgreSQL Database                           │    │
│  │  ┌──────────────────────────────────────────────────┐ │    │
│  │  │ profiles    │ tasks      │ submissions            │ │    │
│  │  │ materials   │ competitions│ leaderboards         │ │    │
│  │  │ doubts      │ competition_members│ RLS Policies  │ │    │
│  │  └──────────────────────────────────────────────────┘ │    │
│  └────────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │     Authentication (Supabase Auth)                     │    │
│  │  - Email/Password  │ Session Management               │    │
│  │  - JWT Tokens      │ Email Verification               │    │
│  └────────────────────────────────────────────────────────┘    │
│  ┌────────────────────────────────────────────────────────┐    │
│  │     Real-time Subscriptions                            │    │
│  │  - Live Leaderboard Updates                            │    │
│  │  - Notification System                                 │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### Authentication Flow
```
User Registration
└─> RegisterPage (Form Input)
    └─> POST /api/auth/register
        └─> Supabase Auth (Email Verification)
            └─> User Created in Database
                └─> Profile Created
                    └─> Redirect to Dashboard
```

### Task Submission Flow
```
View Task
└─> MemberTasks Page
    └─> Fetch /api/tasks
        └─> Query Database
            └─> Display Tasks
                └─> User Submits Solution
                    └─> POST /api/submissions
                        └─> Save to Database
                            └─> Update Leaderboard
                                └─> Notify Mentor
```

### 3D Card Interaction Flow
```
User Swipes Card
└─> SwipeCard Component Detects Gesture
    └─> Three.js Rotates Model
        └─> Framer Motion Animates Transform
            └─> Card Crosses Threshold
                └─> POST /api/tasks (Mark as Seen/Skip)
                    └─> Update User Progress
                        └─> Load Next Card
```

---

## Component Hierarchy

```
RootLayout (with AuthProvider, AnimatedBackground)
│
├── (auth) - Authentication Routes
│   ├── login/page.js
│   └── register/page.js
│
├── (dashboard) - Protected Dashboard Routes
│   ├── layout.js (with Navbar)
│   ├── dashboard/page.js (Main Dashboard)
│   │
│   ├── member/ (Member Pages)
│   │   ├── tasks/page.js
│   │   ├── tasks-3d/page.js
│   │   ├── submissions/page.js
│   │   └── profile/page.js
│   │
│   ├── mentor/ (Mentor Pages)
│   │   ├── page.js
│   │   ├── tasks/page.js
│   │   ├── tasks/create/page.js
│   │   ├── submissions/page.js
│   │   └── doubts/page.js
│   │
│   ├── admin/ (Admin Pages)
│   │   ├── page.js
│   │   ├── users/page.js
│   │   ├── competitions/page.js
│   │   └── analytics/page.js
│   │
│   ├── leaderboard/page.js
│   ├── doubts/page.js
│   ├── materials-3d/page.js
│   └── competitions/page.js
│
├── api/ - API Routes
│   ├── auth/
│   │   ├── register/route.js
│   │   ├── login/route.js
│   │   └── user/route.js
│   ├── tasks/route.js
│   ├── submissions/route.js
│   ├── competitions/route.js
│   ├── leaderboard/route.js
│   ├── doubts/route.js
│   ├── materials/route.js
│   └── admin/
│       ├── users/route.js
│       └── roles/route.js
│
└── page.js (Landing Page)
```

---

## State Management

### Global State (AuthContext)
```javascript
{
  user: {
    id,
    email,
    email_confirmed_at,
    user_metadata
  },
  profile: {
    full_name,
    role,        // 'member' | 'mentor' | 'admin'
    bio,
    avatar_url,
    points,
    rank
  },
  isLoading,
  isAuthenticated
}
```

### Component State
- Form inputs (React useState)
- UI toggles (modals, dropdowns)
- 3D animation state (Framer Motion)
- API loading states

### Server State
- Database queries
- Real-time subscriptions
- Session management (Supabase)

---

## Security Layers

### 1. Frontend
- Protected Routes (AuthContext check)
- Input Validation
- CSRF Tokens in Forms

### 2. API Routes
- Authentication Middleware
- Role-Based Access Control
- Request Validation

### 3. Database
- Row-Level Security (RLS)
- Role-Based Policies
- Encrypted Sensitive Data

### 4. Network
- HTTPS Only
- Secure Cookies
- JWT Token Validation

---

## Database Schema (Simplified)

```
┌─────────────────┐
│    profiles     │
├─────────────────┤
│ id (uuid)       │  ◄──────────┐
│ email           │             │
│ full_name       │             │
│ role            │             │
│ points          │             │
│ avatar_url      │             │
│ created_at      │             │
└─────────────────┘             │
         ▲                       │
         │                   ┌───────────────┐
         │                   │  tasks        │
         │                   ├───────────────┤
         │                   │ id            │
         │                   │ title         │
         │                   │ created_by ◄──┘
         │                   │ difficulty    │
         │                   │ deadline      │
         │                   │ points        │
         │                   └───────────────┘
         │                           △
         │                           │
         │                   ┌───────────────────┐
         │                   │  submissions      │
         │                   ├───────────────────┤
         │                   │ id                │
         │                   │ task_id ◄─────────┘
         │                   │ user_id ◄─────────┐
         │                   │ code              │
         │                   │ status            │
         │                   │ score             │
         │                   │ submitted_at      │
         │                   └───────────────────┘

┌──────────────────────┐
│  competitions        │
├──────────────────────┤
│ id                   │
│ title                │
│ start_date           │
│ end_date             │
│ max_teams            │
└──────────────────────┘
         │
         ├──→ competition_members
         │
         └──→ leaderboards

┌──────────────────────┐
│  materials           │
├──────────────────────┤
│ id                   │
│ title                │
│ content              │
│ category             │
│ difficulty           │
└──────────────────────┘

┌──────────────────────┐
│  doubts_questions    │
├──────────────────────┤
│ id                   │
│ user_id              │
│ question             │
│ answer               │
│ status               │
│ resolved_by          │
└──────────────────────┘
```

---

## 3D Component Architecture

### SwipeCard (Tinder-Style)
```
Input (Gesture Detection)
└─> Calculate Rotation & Translation
    └─> Three.js Canvas (Rendering)
        └─> Framer Motion (Animation)
            └─> Output (Card Dismissed/Kept)
```

### FlipCard (3D Flip)
```
Hover Detection
└─> Rotate X-Axis (3D Perspective)
    └─> Front Side ←→ Back Side
        └─> Display Content
```

### AnimatedBackground
```
Initialize Scene
└─> Create Floating Objects
    └─> Apply Physics
        └─> Continuous Render Loop
            └─> Update Particle Positions
```

---

## API Request/Response Pattern

### Standard Request
```javascript
POST /api/tasks
Content-Type: application/json
Authorization: Bearer {TOKEN}

{
  "page": 1,
  "limit": 10,
  "difficulty": "medium"
}
```

### Standard Response (Success)
```javascript
{
  "success": true,
  "data": [...],
  "message": "Tasks fetched successfully",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Standard Response (Error)
```javascript
{
  "success": false,
  "error": "UNAUTHORIZED",
  "message": "Authentication required",
  "statusCode": 401
}
```

---

## Deployment Architecture

### Development Environment
```
Local Machine
└─> Localhost:3000
    └─> Supabase Local Dev (optional)
```

### Production Environment
```
Vercel Edge Network
└─> Next.js App Router (SSR + API Routes)
    └─> Supabase Cloud PostgreSQL
        └─> Supabase Auth Service
            └─> Global CDN
```

### CI/CD Pipeline
```
Git Commit
└─> GitHub Repository
    └─> Vercel Webhook
        └─> Build & Test
            └─> Deploy to Production
                └─> Health Checks
                    └─> Monitor & Alert
```

---

## Performance Optimization

### Frontend
- Code Splitting (Next.js dynamic imports)
- Image Optimization (next/image)
- CSS Minification
- 3D Canvas optimization (LOD, culling)

### Backend
- Database Query Optimization (indexes)
- API Response Caching
- Rate Limiting
- Connection Pooling

### Network
- Gzip Compression
- Brotli Compression
- CDN Edge Caching
- HTTP/2 Server Push

---

## Monitoring & Logging

### Client-Side
- Browser Console (development)
- Error Tracking (Sentry integration ready)
- Performance Metrics (Web Vitals)
- User Interaction Tracking

### Server-Side
- Next.js Server Logs
- API Request Logging
- Error Logging
- Database Query Logs (Supabase dashboard)

### Alerts
- Error Rate Thresholds
- Performance Degradation
- Database Connection Issues
- Authentication Failures

---

## Scaling Strategy

### Horizontal Scaling
- Multiple Vercel deployments
- Load balancing
- Database read replicas
- Cache layers (Redis ready)

### Vertical Scaling
- Optimize database queries
- Implement caching
- Compress assets
- Optimize 3D rendering

### Database Scaling
- Partitioning large tables
- Archive old data
- Optimize indexes
- Connection pooling

---

## Security Best Practices Implemented

✅ Authentication
- Supabase Auth with JWT
- Email verification
- Secure password storage
- Session management

✅ Authorization
- Row-Level Security (RLS)
- Role-Based Access Control
- Resource-level permissions
- API endpoint protection

✅ Data Protection
- Encrypted sensitive data
- Secure cookies (HttpOnly, Secure)
- HTTPS only communication
- SQL injection prevention

✅ API Security
- Rate limiting
- CORS configuration
- Input validation
- Output sanitization

---

## Future Enhancement Opportunities

- Real-time collaboration (WebSockets)
- Advanced analytics dashboard
- AI-powered code review
- Mobile app (React Native)
- Advanced 3D visualization
- Blockchain integration (certificates)
- Payment system integration
- Advanced caching (Redis)
- Machine learning recommendations
- Social features (messaging, forums)

---

This architecture provides a solid foundation for a scalable, secure, and feature-rich Learning Management System!
