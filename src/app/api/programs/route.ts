import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const revalidate = false; // 무한 캐시, 관리자 수정 시 revalidatePath로 무효화

export async function GET() {
  const programs = await prisma.program.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
    select: {
      id: true,
      slug: true,
      name: true,
      subtitle: true,
      description: true,
      icon: true,
      image: true,
    },
  });

  return NextResponse.json(programs);
}
