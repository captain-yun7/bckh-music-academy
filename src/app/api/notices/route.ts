import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');

  const where = {
    isPublished: true,
    ...(category ? { category: category as 'GENERAL' | 'ADMISSION' | 'EVENT' | 'INSTRUCTOR' } : {}),
  };

  const [notices, total] = await Promise.all([
    prisma.notice.findMany({
      where,
      orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        title: true,
        category: true,
        isPinned: true,
        viewCount: true,
        createdAt: true,
      },
    }),
    prisma.notice.count({ where }),
  ]);

  return NextResponse.json({
    notices,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  });
}
