import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subjectSlug = searchParams.get('subject');
  const forMainPage = searchParams.get('mainPage') === 'true';

  const where = {
    isActive: true,
    ...(subjectSlug ? { subjects: { some: { subject: { name: subjectSlug } } } } : {}),
    ...(forMainPage ? { mainPageOrder: { not: null } } : {}),
  };

  const instructors = await prisma.instructor.findMany({
    where,
    include: {
      subjects: {
        include: {
          subject: true,
        },
        orderBy: { subject: { order: 'asc' } },
      },
    },
    orderBy: forMainPage
      ? [{ mainPageOrder: 'asc' }]
      : [{ order: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json(instructors);
}
