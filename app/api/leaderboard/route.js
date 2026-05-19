import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit')) || 100;

    // Get top users by points
    const { data, error } = await supabase
      .from('members')
      .select('*, users(id, full_name, avatar_url, email)')
      .order('points', { ascending: false })
      .limit(limit);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Add rank to each entry
    const ranked = data.map((member, index) => ({
      ...member,
      rank: index + 1,
    }));

    return NextResponse.json(ranked);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

