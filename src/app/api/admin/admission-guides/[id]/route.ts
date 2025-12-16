import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

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

  const guide = await prisma.admissionGuide.update({
    where: { id },
    data: {
      university: data.university,
      department: data.department,
      category: data.category,
      year: data.year,
      content: data.content,
      deadline: data.deadline,
      examDate: data.examDate,
      requirements: data.requirements,
      documents: data.documents,
      examContent: data.examContent,
      link: data.link,
      order: data.order,
      isPublished: data.isPublished,
    },
  });

  return NextResponse.json(guide);
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

  await prisma.admissionGuide.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
