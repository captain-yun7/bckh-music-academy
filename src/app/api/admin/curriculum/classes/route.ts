import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const classes = await prisma.curriculumClass.findMany({
    orderBy: { order: 'asc' },
    include: {
      majors: {
        orderBy: { order: 'asc' },
      },
    },
  });

  return NextResponse.json(classes);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const data = await request.json();

  const curriculumClass = await prisma.curriculumClass.create({
    data: {
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      intro: data.intro,
      bgImage: data.bgImage,
      benefits: data.benefits ? JSON.stringify(data.benefits) : null,
      universities: data.universities ? JSON.stringify(data.universities) : null,
      agencies: data.agencies ? JSON.stringify(data.agencies) : null,
      order: data.order || 0,
      isPublished: data.isPublished ?? true,
    },
    include: {
      majors: true,
    },
  });

  return NextResponse.json(curriculumClass);
}
