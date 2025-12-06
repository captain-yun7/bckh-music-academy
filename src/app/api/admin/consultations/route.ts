import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  const where = status ? { status: status as 'PENDING' | 'CONTACTED' | 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' } : {};

  const [consultations, total] = await Promise.all([
    prisma.consultation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.consultation.count({ where }),
  ]);

  return NextResponse.json({ consultations, total, page, totalPages: Math.ceil(total / limit) });
}
