import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const subjects = await prisma.subject.findMany({
    orderBy: { order: 'asc' },
    include: {
      _count: {
        select: { instructors: true },
      },
    },
  });

  return NextResponse.json(subjects);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const data = await request.json();

  const subject = await prisma.subject.create({
    data: {
      name: data.name,
      nameKo: data.nameKo,
      description: data.description,
      features: data.features ? JSON.stringify(data.features) : null,
      order: data.order || 0,
      isPublished: data.isPublished ?? true,
    },
  });

  // 캐시 무효화
  revalidatePath('/');
  revalidatePath('/api/subjects');

  return NextResponse.json(subject);
}
