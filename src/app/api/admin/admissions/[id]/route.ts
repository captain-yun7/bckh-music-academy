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

  const admission = await prisma.admission.update({
    where: { id },
    data: {
      studentName: data.studentName,
      university: data.university,
      department: data.department,
      year: data.year,
      major: data.major,
      isEarlyAdmission: data.isEarlyAdmission,
      photoUrl: data.photoUrl,
      testimonial: data.testimonial,
      isPublished: data.isPublished,
    },
  });

  return NextResponse.json(admission);
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

  await prisma.admission.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
