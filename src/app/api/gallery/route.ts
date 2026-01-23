import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');

    const where: { isPublished: boolean; category?: string } = {
      isPublished: true,
    };

    if (category) {
      where.category = category;
    }

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: { order: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        category: true,
        order: true,
      },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error('Failed to fetch gallery images:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 });
  }
}
