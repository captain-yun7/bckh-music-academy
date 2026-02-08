import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const curriculumClass = await prisma.curriculumClass.findUnique({
    where: {
      slug,
      isPublished: true,
    },
    include: {
      majors: {
        where: { isPublished: true },
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!curriculumClass) {
    return NextResponse.json({ error: '커리큘럼을 찾을 수 없습니다.' }, { status: 404 });
  }

  // Parse JSON fields
  const result = {
    ...curriculumClass,
    benefits: curriculumClass.benefits ? JSON.parse(curriculumClass.benefits) : [],
    universities: curriculumClass.universities ? JSON.parse(curriculumClass.universities) : [],
    agencies: curriculumClass.agencies ? JSON.parse(curriculumClass.agencies) : [],
    majors: curriculumClass.majors.map(major => ({
      ...major,
      curriculum: major.curriculum ? JSON.parse(major.curriculum) : [],
    })),
  };

  return NextResponse.json(result);
}
