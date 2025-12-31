import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subjectSlug = searchParams.get('subject');

  const where = {
    isActive: true,
    ...(subjectSlug ? { subject: { name: subjectSlug } } : {}),
  };

  const instructors = await prisma.instructor.findMany({
    where,
    include: {
      subject: true,
    },
    orderBy: [
      { subject: { order: 'asc' } },
      { order: 'asc' },
    ],
  });

  return NextResponse.json(instructors);
}
