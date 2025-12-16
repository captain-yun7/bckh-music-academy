import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const where = category ? { category: category as 'ADMISSION_SUCCESS' | 'TRAINEE' | 'MUSICIAN_LECTURE' | 'PERFORMANCE' } : {};

  const videos = await prisma.video.findMany({
    where,
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json(videos);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const data = await request.json();

  const video = await prisma.video.create({
    data: {
      title: data.title,
      description: data.description,
      youtubeUrl: data.youtubeUrl,
      thumbnailUrl: data.thumbnailUrl,
      category: data.category,
      order: data.order || 0,
      isPublished: data.isPublished ?? true,
    },
  });

  return NextResponse.json(video);
}
