import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const where = category ? { category: category as 'FACILITY' | 'PERFORMANCE' | 'EVENT' } : {};

  const images = await prisma.galleryImage.findMany({
    where,
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json(images);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const data = await request.json();

  const image = await prisma.galleryImage.create({
    data: {
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      category: data.category,
      order: data.order || 0,
      isPublished: data.isPublished ?? true,
    },
  });

  revalidatePath('/');
  revalidatePath('/api/gallery');

  return NextResponse.json(image);
}
