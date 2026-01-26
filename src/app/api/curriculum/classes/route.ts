import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const revalidate = false; // 무한 캐시, 관리자 수정 시 revalidatePath로 무효화

export async function GET() {
  const classes = await prisma.curriculumClass.findMany({
    where: { isPublished: true },
    orderBy: { order: 'asc' },
    select: {
      id: true,
      slug: true,
      title: true,
      subtitle: true,
      intro: true,
      bgImage: true,
      benefits: true,
    },
  });

  // Parse benefits JSON
  const result = classes.map((cls) => ({
    ...cls,
    benefits: cls.benefits ? JSON.parse(cls.benefits) : [],
  }));

  return NextResponse.json(result);
}
