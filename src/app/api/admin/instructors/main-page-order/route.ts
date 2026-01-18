import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

// 메인페이지에 표시할 강사 목록 조회
export async function GET() {
  const instructors = await prisma.instructor.findMany({
    where: {
      isActive: true,
      mainPageOrder: { not: null },
    },
    include: {
      subjects: {
        include: { subject: true },
        orderBy: { subject: { order: 'asc' } },
      },
    },
    orderBy: { mainPageOrder: 'asc' },
  });

  return NextResponse.json(instructors);
}

// 메인페이지 순서 일괄 업데이트
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const { instructorIds } = await request.json();

  // 모든 강사의 mainPageOrder를 null로 초기화
  await prisma.instructor.updateMany({
    data: { mainPageOrder: null },
  });

  // 선택된 강사들에게 순서 부여
  for (let i = 0; i < instructorIds.length; i++) {
    await prisma.instructor.update({
      where: { id: instructorIds[i] },
      data: { mainPageOrder: i },
    });
  }

  return NextResponse.json({ success: true });
}
