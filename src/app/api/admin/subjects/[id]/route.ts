import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
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

  const subject = await prisma.subject.update({
    where: { id },
    data: {
      name: data.name,
      nameKo: data.nameKo,
      description: data.description,
      features: data.features ? JSON.stringify(data.features) : null,
      order: data.order,
      isPublished: data.isPublished,
    },
  });

  // 캐시 무효화
  revalidatePath('/');
  revalidatePath('/api/subjects');

  return NextResponse.json(subject);
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

  await prisma.subject.delete({
    where: { id },
  });

  // 캐시 무효화
  revalidatePath('/');
  revalidatePath('/api/subjects');

  return NextResponse.json({ success: true });
}
