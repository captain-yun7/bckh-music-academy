import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const revalidate = 60; // 60초마다 재검증

export async function GET() {
  const subjects = await prisma.subject.findMany({
    orderBy: { order: 'asc' },
  });

  return NextResponse.json(subjects, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  });
}
