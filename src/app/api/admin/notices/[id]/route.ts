import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const notice = await prisma.notice.findUnique({
    where: { id },
  });

  if (!notice) {
    return NextResponse.json({ error: '공지사항을 찾을 수 없습니다.' }, { status: 404 });
  }

  return NextResponse.json(notice);
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

  const notice = await prisma.notice.update({
    where: { id },
    data: {
      title: data.title,
      content: data.content,
      category: data.category,
      isPinned: data.isPinned,
      isPublished: data.isPublished,
    },
  });

  return NextResponse.json(notice);
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

  await prisma.notice.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
