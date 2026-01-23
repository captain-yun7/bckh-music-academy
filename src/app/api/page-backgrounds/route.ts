import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const revalidate = 60; // 60초마다 재검증

// 페이지별 배경 이미지 목록 조회 (공개)
export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: {
          startsWith: 'page_bg_',
        },
      },
    });

    // key에서 페이지 경로 추출하여 객체로 변환
    const backgrounds: Record<string, string> = {};
    settings.forEach((setting) => {
      const pagePath = setting.key.replace('page_bg_', '').replace(/_/g, '/');
      backgrounds[pagePath] = setting.value;
    });

    return NextResponse.json(backgrounds, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error) {
    console.error('Failed to fetch page backgrounds:', error);
    return NextResponse.json({ error: 'Failed to fetch page backgrounds' }, { status: 500 });
  }
}
