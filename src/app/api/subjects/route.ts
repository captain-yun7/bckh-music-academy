import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const revalidate = false; // 무한 캐시, 관리자 수정 시 revalidatePath로 무효화

export async function GET() {
  const subjects = await prisma.subject.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
  });

  return NextResponse.json(subjects);
}
