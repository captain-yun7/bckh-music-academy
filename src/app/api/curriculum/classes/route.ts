import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const revalidate = 60;

export async function GET() {
  const classes = await prisma.curriculumClass.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
    select: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      intro: true,
      benefits: true,
    },
  });

  // Parse benefits JSON
  const result = classes.map((cls) => ({
    ...cls,
    benefits: cls.benefits ? JSON.parse(cls.benefits) : [],
  }));

  return NextResponse.json(result, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
    },
  });
}
