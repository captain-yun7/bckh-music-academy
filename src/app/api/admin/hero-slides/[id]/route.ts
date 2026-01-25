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

  const slide = await prisma.heroSlide.update({
    where: { id },
    data: {
      title: data.title,
      subtitle: data.subtitle || null,
      imageUrl: data.imageUrl,
      buttonText: data.buttonText || null,
      buttonLink: data.buttonLink || null,
      textPosition: data.textPosition || 'left',
      textAlign: data.textAlign || 'left',
      order: data.order,
      isPublished: data.isPublished,
    },
  });

  revalidatePath('/');
  revalidatePath('/api/hero-slides');

  return NextResponse.json(slide);
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

  await prisma.heroSlide.delete({
    where: { id },
  });

  revalidatePath('/');
  revalidatePath('/api/hero-slides');

  return NextResponse.json({ success: true });
}
