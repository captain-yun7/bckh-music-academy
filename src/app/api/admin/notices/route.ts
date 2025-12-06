import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  const where = category ? { category: category as 'GENERAL' | 'ADMISSION' | 'EVENT' | 'INSTRUCTOR' } : {};

  const [notices, total] = await Promise.all([
    prisma.notice.findMany({
      where,
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.notice.count({ where }),
  ]);

  return NextResponse.json({ notices, total, page, totalPages: Math.ceil(total / limit) });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const data = await request.json();

  const notice = await prisma.notice.create({
    data: {
      title: data.title,
      content: data.content,
      category: data.category || 'GENERAL',
      isPinned: data.isPinned || false,
      isPublished: data.isPublished ?? true,
    },
  });

  return NextResponse.json(notice);
}
