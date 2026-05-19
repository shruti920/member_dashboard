/**
 * Application Configuration
 * Centralized configuration for the LearnHub platform
 */

export const config = {
  // Application
  app: {
    name: 'LearnHub',
    description: 'Master Your Skills - A comprehensive learning management system',
    version: '1.0.0',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // Supabase
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },

  // Authentication
  auth: {
    passwordMinLength: 8,
    emailVerificationRequired: true,
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
    tokenRefreshInterval: 60 * 60 * 1000, // 1 hour
  },

  // Roles
  roles: {
    MEMBER: 'member',
    MENTOR: 'mentor',
    ADMIN: 'admin',
  },

  // Task Configuration
  tasks: {
    maxSubmissions: 5,
    submissionDeadlineExtendable: true,
    difficultyLevels: ['beginner', 'intermediate', 'advanced'],
  },

  // Competitions
  competitions: {
    maxParticipants: 100,
    scoringSystem: 'points', // 'points' or 'rating'
    minParticipants: 2,
  },

  // Pagination
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },

  // Leaderboard
  leaderboard: {
    updateFrequency: 'daily', // 'realtime', 'daily', 'weekly'
    topUsersCount: 50,
  },

  // UI
  ui: {
    colors: {
      primary: '#2d5016', // Siege Green
      primaryLight: '#5a7d3e',
      primaryDark: '#1a2f0b',
      secondary: '#ffffff',
      accent: '#5a7d3e',
      danger: '#ef4444',
      warning: '#f59e0b',
      success: '#10b981',
    },
    animations: {
      enabled: true,
      duration: 300, // ms
      easing: 'ease-in-out',
    },
    3d: {
      enabled: true,
      particlesCount: 500,
      maxParticles: 1000,
    },
  },

  // Features
  features: {
    emailVerification: true,
    socialLogin: false,
    darkMode: false,
    notifications: true,
    analytics: true,
  },

  // API
  api: {
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // ms
  },

  // Content
  content: {
    maxUploadSize: 50 * 1024 * 1024, // 50 MB
    supportedImageFormats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    supportedDocFormats: ['pdf', 'doc', 'docx', 'txt', 'md'],
  },

  // Social
  social: {
    github: 'https://github.com/yourusername/learnhub',
    twitter: 'https://twitter.com/learnhub',
    linkedin: 'https://linkedin.com/company/learnhub',
  },

  // Email
  email: {
    from: process.env.NEXT_PUBLIC_EMAIL_FROM || 'noreply@learnhub.com',
    supportEmail: 'support@learnhub.com',
  },
};

// Get role permissions
export function getRolePermissions(role) {
  const permissions = {
    [config.roles.MEMBER]: {
      canViewTasks: true,
      canSubmitTasks: true,
      canViewLeaderboard: true,
      canAskDoubts: true,
      canViewMaterials: true,
      canCreateTasks: false,
      canReviewSubmissions: false,
      canManageUsers: false,
      canViewAnalytics: false,
    },
    [config.roles.MENTOR]: {
      canViewTasks: true,
      canSubmitTasks: true,
      canViewLeaderboard: true,
      canAskDoubts: true,
      canViewMaterials: true,
      canCreateTasks: true,
      canReviewSubmissions: true,
      canManageUsers: false,
      canViewAnalytics: true,
    },
    [config.roles.ADMIN]: {
      canViewTasks: true,
      canSubmitTasks: true,
      canViewLeaderboard: true,
      canAskDoubts: true,
      canViewMaterials: true,
      canCreateTasks: true,
      canReviewSubmissions: true,
      canManageUsers: true,
      canViewAnalytics: true,
    },
  };

  return permissions[role] || permissions[config.roles.MEMBER];
}

// Validate configuration
export function validateConfig() {
  const { url, anonKey, serviceRoleKey } = config.supabase;
  const errors = [];

  if (!url) errors.push('NEXT_PUBLIC_SUPABASE_URL is not set');
  if (!anonKey) errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  if (!serviceRoleKey) errors.push('SUPABASE_SERVICE_ROLE_KEY is not set');

  if (errors.length > 0) {
    console.error('Configuration errors:', errors);
    return false;
  }

  return true;
}

export default config;

