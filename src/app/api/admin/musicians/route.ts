import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const musicians = await prisma.musician.findMany({
    orderBy: { order: 'asc' },
  });

  return NextResponse.json(musicians);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const data = await request.json();

  const musician = await prisma.musician.create({
    data: {
      name: data.name,
      role: data.role,
      achievement: data.achievement,
      image: data.image,
      snsUrl: data.snsUrl,
      isPublished: data.isPublished ?? true,
      order: data.order || 0,
    },
  });

  revalidatePath('/');
  revalidatePath('/api/musicians');

  return NextResponse.json(musician);
}
