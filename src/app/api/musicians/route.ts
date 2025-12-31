import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const musicians = await prisma.musician.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  });

  return NextResponse.json(musicians);
}
