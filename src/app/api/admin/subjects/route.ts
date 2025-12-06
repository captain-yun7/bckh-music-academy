import { NextRequest, NextResponse } from 'next/server';
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

  const { name, nameKo, order } = await request.json();

  const subject = await prisma.subject.create({
    data: { name, nameKo, order: order || 0 },
  });

  return NextResponse.json(subject);
}
