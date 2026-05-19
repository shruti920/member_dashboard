import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');

    let query = supabase.from('tasks').select('*').eq('is_active', true);

    if (category) {
      query = query.eq('category', category);
    }
    if (difficulty) {
      query = query.eq('difficulty', difficulty);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { title, description, category, difficulty, points, deadline, createdBy } = await request.json();

    // Get user role to verify permission
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', createdBy)
      .single();

    if (!userData || !['mentor', 'admin'].includes(userData.role)) {
      return NextResponse.json(
        { error: 'Only mentors and admins can create tasks' },
        { status: 403 }
      );
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([{
        title,
        description,
        category,
        difficulty,
        points: points || 10,
        deadline,
        created_by: createdBy,
      }])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

