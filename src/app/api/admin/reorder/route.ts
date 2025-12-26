import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { type, items } = await request.json();

    if (!type || !Array.isArray(items)) {
      return NextResponse.json(
        { error: '잘못된 요청입니다.' },
        { status: 400 }
      );
    }

    // Update order for each item
    const updates = items.map((item: { id: string; order: number }) => {
      switch (type) {
        case 'instructors':
          return prisma.instructor.update({
            where: { id: item.id },
            data: { order: item.order },
          });
        case 'musicians':
          return prisma.musician.update({
            where: { id: item.id },
            data: { order: item.order },
          });
        case 'videos':
          return prisma.video.update({
            where: { id: item.id },
            data: { order: item.order },
          });
        case 'gallery':
          return prisma.galleryImage.update({
            where: { id: item.id },
            data: { order: item.order },
          });
        default:
          throw new Error('지원하지 않는 타입입니다.');
      }
    });

    await prisma.$transaction(updates);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reorder error:', error);
    return NextResponse.json(
      { error: '순서 변경에 실패했습니다.' },
      { status: 500 }
    );
  }
}
