import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const slides = await prisma.heroSlide.findMany({
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json(slides);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const data = await request.json();

  const slide = await prisma.heroSlide.create({
    data: {
      title: data.title,
      subtitle: data.subtitle || null,
      imageUrl: data.imageUrl,
      buttonText: data.buttonText || null,
      buttonLink: data.buttonLink || null,
      textPosition: data.textPosition || 'left',
      textAlign: data.textAlign || 'left',
      order: data.order || 0,
      isPublished: data.isPublished ?? true,
    },
  });

  revalidatePath('/');
  revalidatePath('/api/hero-slides');

  return NextResponse.json(slide);
}
