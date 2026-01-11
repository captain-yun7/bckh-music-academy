import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const instructor = await prisma.instructor.findUnique({
    where: { id },
    include: {
      subjects: {
        include: {
          subject: true,
        },
        orderBy: { subject: { order: 'asc' } },
      },
    },
  });

  if (!instructor) {
    return NextResponse.json({ error: '강사를 찾을 수 없습니다.' }, { status: 404 });
  }

  return NextResponse.json(instructor);
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
  const subjectIds: string[] = data.subjectIds || [];

  // 기존 전공 관계 삭제 후 새로 생성
  await prisma.instructorSubject.deleteMany({
    where: { instructorId: id },
  });

  const instructor = await prisma.instructor.update({
    where: { id },
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
      isActive: data.isActive,
      order: data.order,
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const { id } = await params;

  await prisma.instructor.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
