import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const curriculumClass = await prisma.curriculumClass.findUnique({
    where: { id },
    include: {
      majors: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!curriculumClass) {
    return NextResponse.json({ error: '커리큘럼을 찾을 수 없습니다.' }, { status: 404 });
  }

  return NextResponse.json(curriculumClass);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const { id } = await params;
  const data = await request.json();

  const curriculumClass = await prisma.curriculumClass.update({
    where: { id },
    data: {
      slug: data.slug,
      title: data.title,
      subtitle: data.subtitle,
      intro: data.intro,
      bgImage: data.bgImage,
      benefits: data.benefits !== undefined ? JSON.stringify(data.benefits) : undefined,
      universities: data.universities !== undefined ? JSON.stringify(data.universities) : undefined,
      agencies: data.agencies !== undefined ? JSON.stringify(data.agencies) : undefined,
      order: data.order,
      isPublished: data.isPublished,
    },
    include: {
      majors: true,
    },
  });

  return NextResponse.json(curriculumClass);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const { id } = await params;

  await prisma.curriculumClass.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
