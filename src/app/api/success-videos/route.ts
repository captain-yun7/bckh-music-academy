import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      where: {
        isPublished: true,
        category: 'ADMISSION_SUCCESS',
      },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Failed to fetch success videos:', error);
    return NextResponse.json([], { status: 500 });
  }
}
