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

  const musician = await prisma.musician.update({
    where: { id },
    data: {
      name: data.name,
      role: data.role,
      achievement: data.achievement,
      image: data.image,
      snsUrl: data.snsUrl,
      isPublished: data.isPublished,
      order: data.order,
    },
  });

  return NextResponse.json(musician);
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

  await prisma.musician.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
