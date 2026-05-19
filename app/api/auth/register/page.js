import { supabase, createUserProfile } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Check if supabase is properly initialized
    if (!supabase) {
      return NextResponse.json(
        { error: 'Supabase is not properly configured. Please check your environment variables.' },
        { status: 500 }
      );
    }

    const { email, password, fullName, role = 'member' } = await request.json();

    // Validate input
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate role
    if (!['member', 'mentor', 'admin'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    });

    if (authError) {
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      );
    }

    // Create user profile with the selected role
    if (authData.user) {
      await createUserProfile(authData.user.id, email, fullName, role);
    }

    return NextResponse.json({
      message: 'User registered successfully. Please check your email to confirm.',
      user: authData.user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

