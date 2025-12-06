import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get('subjectId');

  const where = subjectId ? { subjectId } : {};

  const instructors = await prisma.instructor.findMany({
    where,
    orderBy: [{ subject: { order: 'asc' } }, { order: 'asc' }],
    include: {
      subject: true,
    },
  });

  return NextResponse.json(instructors);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const data = await request.json();

  const instructor = await prisma.instructor.create({
    data: {
      name: data.name,
      subjectId: data.subjectId,
      image: data.image,
      bio: data.bio,
      career: data.career,
      isActive: data.isActive ?? true,
      order: data.order || 0,
    },
    include: {
      subject: true,
    },
  });

  return NextResponse.json(instructor);
}
