# Route Configuration Guide

## Available Routes

### Public Routes (No Authentication Required)

- **Home Page**: `/` (src/app/page.js)
- **Login**: `/auth/login` (src/app/(auth)/login/page.js)
- **Register**: `/auth/register` (src/app/(auth)/register/page.js)

### Protected Routes (Authentication Required)

#### Member Routes

- **Dashboard**: `/dashboard` (src/app/(dashboard)/dashboard/page.js)
- **My Tasks**: `/member/tasks` (src/app/(dashboard)/member/tasks/page.js)
- **My Submissions**: `/member/submissions` (src/app/(dashboard)/member/submissions/page.js)
- **My Profile**: `/member/profile` (src/app/(dashboard)/member/profile/page.js)
- **Tasks 3D**: `/member/tasks-3d` (src/app/(dashboard)/member/tasks-3D/page.js)

#### General Routes

- **Leaderboard**: `/leaderboard` (src/app/(dashboard)/leaderboard/page.js)
- **Doubts/Help**: `/doubts` (src/app/(dashboard)/doubts/page.js)
- **Materials**: `/materials` (src/app/(dashboard)/materials/page.js)
- **Materials 3D**: `/materials-3d` (src/app/(dashboard)/materials-3d/page.js)
- **Competitions**: `/competitions` (src/app/(dashboard)/competitions/page.js)
- **Competition Details**: `/competitions/[id]` (src/app/(dashboard)/competitions/id/page.js)

#### Mentor Routes (Role-Based)

- **Mentor Panel**: `/mentor` (src/app/(dashboard)/mentor/page.js)
- **Manage Tasks**: `/mentor/tasks` (src/app/(dashboard)/mentor/tasks/page.js)
- **Create Task**: `/mentor/tasks/create` (src/app/(dashboard)/mentor/tasks/create/page.js)
- **Manage Doubts**: `/mentor/doubts` (src/app/(dashboard)/mentor/doubts/page.js)
- **Submissions**: `/mentor/submissions` (src/app/(dashboard)/mentor/submissions/page.js)

#### Admin Routes (Role-Based)

- **Admin Dashboard**: `/admin` (src/app/(dashboard)/admin/page.js)
- **Manage Users**: `/admin/users` (src/app/(dashboard)/admin/users/page.js)
- **Analytics**: `/admin/analytics` (src/app/(dashboard)/admin/analytics/page.js)
- **Competitions**: `/admin/competitions` (src/app/(dashboard)/admin/competitions/page.js)

### API Routes

- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/register` - User registration
- **GET** `/api/auth/user` - Current user info

### Error Pages

- **404 Not Found**: `/not-found` (src/app/not-found.js)
- **Error Page**: `/error` (src/app/error.js)

## Troubleshooting

### If you see "Page not found" for login:

1. Check that the URL is exactly `/auth/login` (not `/(auth)/login`)
2. Ensure the browser has cleared cache (Ctrl+Shift+Delete)
3. Check browser console for any error messages
4. Try building fresh: `npm run build`

### If links aren't working:

1. Verify the href paths match the routes listed above
2. Ensure you're using the correct Next.js Link component
3. Check that route groups (folders in parentheses) are formatted correctly

### Route Groups Explanation

- `(auth)` - Groups auth pages without affecting the URL
- `(dashboard)` - Groups dashboard pages without affecting the URL
- These don't add to the URL path, so `/auth/login` is the actual route
