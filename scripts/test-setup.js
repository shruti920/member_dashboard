/**
 * Test Setup Script
 * Verifies that the application is properly configured
 * Run with: node scripts/test-setup.js
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
];

console.log('🧪 LearnHub Setup Test\n');

// Check environment variables
console.log('📋 Checking environment variables...');
let envValid = true;

requiredEnvVars.forEach((envVar) => {
  const value = process.env[envVar];
  if (value) {
    const maskedValue = value.substring(0, 10) + '...';
    console.log(`  ✅ ${envVar}: ${maskedValue}`);
  } else {
    console.log(`  ❌ ${envVar}: NOT SET`);
    envValid = false;
  }
});

if (!envValid) {
  console.log('\n⚠️  Some environment variables are missing!');
  console.log('\nTo fix, create a .env.local file with:');
  console.log('  NEXT_PUBLIC_SUPABASE_URL=https://xhoxclrfuturoornssop.supabase.co');
  console.log('  NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_3kTVhqJBUmrF04XHSfjXyQ__NCvOJLj');
  console.log('  SUPABASE_SERVICE_ROLE_KEY=your_key\n');
  process.exit(1);
}

// Check required dependencies
console.log('\n📦 Checking dependencies...');
const dependencies = [
  '@supabase/supabase-js',
  'three',
  '@react-three/fiber',
  '@react-three/drei',
  'framer-motion',
  'next',
  'react',
];

dependencies.forEach((dep) => {
  try {
    require.resolve(dep);
    console.log(`  ✅ ${dep}`);
  } catch (e) {
    console.log(`  ❌ ${dep}: NOT INSTALLED`);
  }
});

console.log('\n✨ Setup looks good! You can now run:');
console.log('  pnpm dev\n');

