import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const classId = searchParams.get('classId');

  const where = classId ? { classId } : {};

  const majors = await prisma.curriculumMajor.findMany({
    where,
    orderBy: { order: 'asc' },
    include: {
      class: true,
    },
  });

  return NextResponse.json(majors);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const data = await request.json();

  const major = await prisma.curriculumMajor.create({
    data: {
      classId: data.classId,
      name: data.name,
      icon: data.icon,
      description: data.description,
      curriculum: data.curriculum ? JSON.stringify(data.curriculum) : null,
      order: data.order || 0,
      isPublished: data.isPublished ?? true,
    },
    include: {
      class: true,
    },
  });

  return NextResponse.json(major);
}
