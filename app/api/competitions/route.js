import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') || 'active';

    const { data, error } = await supabase
      .from('competitions')
      .select('*, competition_participants(count)')
      .eq('status', status)
      .order('start_date', { ascending: true });

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
    const { title, description, startDate, endDate, prizePool, createdBy } = await request.json();

    // Verify user is admin
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', createdBy)
      .single();

    if (!userData || userData.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only admins can create competitions' },
        { status: 403 }
      );
    }

    const { data, error } = await supabase
      .from('competitions')
      .insert([{
        title,
        description,
        start_date: startDate,
        end_date: endDate,
        prize_pool: prizePool || 0,
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

