import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const subjects = await prisma.subject.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  });

  return NextResponse.json(subjects);
}
