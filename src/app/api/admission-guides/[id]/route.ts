import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const guide = await prisma.admissionGuide.findUnique({
    where: { id },
  });

  if (!guide) {
    return NextResponse.json(
      { error: '입시요강을 찾을 수 없습니다.' },
      { status: 404 }
    );
  }

  return NextResponse.json(guide);
}
