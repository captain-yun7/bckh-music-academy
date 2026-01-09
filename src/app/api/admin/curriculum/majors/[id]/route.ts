import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const major = await prisma.curriculumMajor.findUnique({
    where: { id },
    include: {
      class: true,
    },
  });

  if (!major) {
    return NextResponse.json({ error: '전공을 찾을 수 없습니다.' }, { status: 404 });
  }

  return NextResponse.json(major);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const { id } = await params;
  const data = await request.json();

  const major = await prisma.curriculumMajor.update({
    where: { id },
    data: {
      classId: data.classId,
      name: data.name,
      icon: data.icon,
      description: data.description,
      curriculum: data.curriculum !== undefined ? JSON.stringify(data.curriculum) : undefined,
      order: data.order,
      isPublished: data.isPublished,
    },
    include: {
      class: true,
    },
  });

  return NextResponse.json(major);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const { id } = await params;

  await prisma.curriculumMajor.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
