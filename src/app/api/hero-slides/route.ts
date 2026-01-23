import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const revalidate = 60; // 60초마다 재검증

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isPublished: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        title: true,
        subtitle: true,
        imageUrl: true,
        buttonText: true,
        buttonLink: true,
        textPosition: true,
        textAlign: true,
      },
    });

    return NextResponse.json(slides, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch {
    // If database is not available, return empty array
    return NextResponse.json([]);
  }
}
