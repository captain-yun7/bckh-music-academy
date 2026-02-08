import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const where: { isPublished: boolean; category?: 'ADMISSION_SUCCESS' | 'TRAINEE' | 'MUSICIAN_LECTURE' | 'PERFORMANCE' } = {
    isPublished: true,
  };

  if (category) {
    where.category = category as 'ADMISSION_SUCCESS' | 'TRAINEE' | 'MUSICIAN_LECTURE' | 'PERFORMANCE';
  }

  const videos = await prisma.video.findMany({
    where,
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      title: true,
      description: true,
      youtubeUrl: true,
      thumbnailUrl: true,
      category: true,
    },
  });

  return NextResponse.json(videos);
}
