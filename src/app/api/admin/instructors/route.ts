import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get('subjectId');

  const where = subjectId
    ? { subjects: { some: { subjectId } } }
    : {};

  const instructors = await prisma.instructor.findMany({
    where,
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    include: {
      subjects: {
        include: {
          subject: true,
        },
        orderBy: { subject: { order: 'asc' } },
      },
    },
  });

  return NextResponse.json(instructors);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const data = await request.json();
  const subjectIds: string[] = data.subjectIds || [];

  const instructor = await prisma.instructor.create({
    data: {
      name: data.name,
      image: data.image,
      intro: data.intro,
      profile: data.profile,
      curriculum: data.curriculum,
      musicGenres: data.musicGenres,
      recommendedAlbums: data.recommendedAlbums,
      messageToStudents: data.messageToStudents,
      videoUrl1: data.videoUrl1,
      videoUrl2: data.videoUrl2,
      isActive: data.isActive ?? true,
      order: data.order || 0,
      subjects: {
        create: subjectIds.map((subjectId, index) => ({
          subjectId,
          order: index,
        })),
      },
    },
    include: {
      subjects: {
        include: {
          subject: true,
        },
      },
    },
  });

  return NextResponse.json(instructor);
}
