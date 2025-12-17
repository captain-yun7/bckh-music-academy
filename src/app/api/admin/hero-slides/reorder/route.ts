import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const { updates } = await request.json();

  // Update order for each slide
  await Promise.all(
    updates.map((update: { id: string; order: number }) =>
      prisma.heroSlide.update({
        where: { id: update.id },
        data: { order: update.order },
      })
    )
  );

  return NextResponse.json({ success: true });
}
