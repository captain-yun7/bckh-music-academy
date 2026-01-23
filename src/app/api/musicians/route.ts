import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const revalidate = 60; // 60초마다 재검증

export async function GET() {
  const musicians = await prisma.musician.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  });

  return NextResponse.json(musicians, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  });
}
