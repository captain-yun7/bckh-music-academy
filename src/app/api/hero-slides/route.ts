import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const revalidate = false; // 무한 캐시, 관리자 수정 시 revalidatePath로 무효화

export async function GET() {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { isPublished: true },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        title: true,
        subtitle: true,
        imageUrl: true,
        buttonText: true,
        buttonLink: true,
        textPosition: true,
        textAlign: true,
      },
    });

    return NextResponse.json(slides);
  } catch {
    // If database is not available, return empty array
    return NextResponse.json([]);
  }
}
