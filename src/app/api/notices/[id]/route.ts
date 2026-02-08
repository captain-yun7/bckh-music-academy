import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const notice = await prisma.notice.findUnique({
    where: { id },
  });

  if (!notice || !notice.isPublished) {
    return NextResponse.json({ error: '공지사항을 찾을 수 없습니다.' }, { status: 404 });
  }

  // 조회수 증가
  await prisma.notice.update({
    where: { id },
    data: { viewCount: { increment: 1 } },
  });

  return NextResponse.json(notice);
}
