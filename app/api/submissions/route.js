import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('submissions')
      .select('*, tasks(*), users(full_name, avatar_url)')
      .eq('user_id', userId)
      .order('submitted_at', { ascending: false });

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
    const { taskId, userId, submissionText, submissionUrl } = await request.json();

    if (!taskId || !userId) {
      return NextResponse.json(
        { error: 'taskId and userId are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('submissions')
      .insert([{
        task_id: taskId,
        user_id: userId,
        submission_text: submissionText,
        submission_url: submissionUrl,
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

