import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const instructor = await prisma.instructor.findUnique({
    where: { id },
    include: { subject: true },
  });

  if (!instructor) {
    return NextResponse.json({ error: '강사를 찾을 수 없습니다.' }, { status: 404 });
  }

  return NextResponse.json(instructor);
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

  const instructor = await prisma.instructor.update({
    where: { id },
    data: {
      name: data.name,
      subjectId: data.subjectId,
      image: data.image,
      bio: data.bio,
      career: data.career,
      isActive: data.isActive,
      order: data.order,
    },
    include: { subject: true },
  });

  return NextResponse.json(instructor);
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

  await prisma.instructor.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
