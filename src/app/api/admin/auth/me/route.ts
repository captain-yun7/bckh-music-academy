import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ error: '인증되지 않았습니다.' }, { status: 401 });
  }

  return NextResponse.json({ admin: session });
}
