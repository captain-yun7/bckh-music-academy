import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const videos = await prisma.video.findMany({
    where: {
      isPublished: true,
      category: 'ADMISSION_SUCCESS',
    },
    orderBy: { order: 'asc' },
  });

  return NextResponse.json(videos);
}
