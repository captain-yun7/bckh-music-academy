import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const where: Record<string, unknown> = {
    isPublished: true,
  };

  if (category) {
    where.category = category;
  }

  const guides = await prisma.admissionGuide.findMany({
    where,
    orderBy: [
      { year: 'desc' },
      { order: 'asc' },
      { createdAt: 'desc' },
    ],
  });

  return NextResponse.json(guides);
}
