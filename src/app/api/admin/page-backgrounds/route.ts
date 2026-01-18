import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

async function checkAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  return !!payload;
}

// 페이지별 배경 이미지 목록 조회 (관리자용)
export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const settings = await prisma.siteSetting.findMany({
      where: {
        key: {
          startsWith: 'page_bg_',
        },
      },
    });

    // key에서 페이지 경로 추출하여 배열로 변환
    const backgrounds = settings.map((setting) => ({
      pagePath: setting.key.replace('page_bg_', '').replace(/_/g, '/'),
      imageUrl: setting.value,
      key: setting.key,
    }));

    return NextResponse.json(backgrounds);
  } catch (error) {
    console.error('Failed to fetch page backgrounds:', error);
    return NextResponse.json({ error: 'Failed to fetch page backgrounds' }, { status: 500 });
  }
}

// 페이지 배경 이미지 저장/수정
export async function POST(request: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { pagePath, imageUrl } = await request.json();

    if (!pagePath) {
      return NextResponse.json({ error: 'Page path is required' }, { status: 400 });
    }

    // 경로를 키로 변환 (슬래시를 언더스코어로)
    const key = 'page_bg_' + pagePath.replace(/\//g, '_');

    if (imageUrl) {
      // 이미지가 있으면 저장/수정
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value: imageUrl },
        create: {
          key,
          value: imageUrl,
          description: `Background image for ${pagePath} page`,
        },
      });
    } else {
      // 이미지가 없으면 삭제
      await prisma.siteSetting.deleteMany({
        where: { key },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to save page background:', error);
    return NextResponse.json({ error: 'Failed to save page background' }, { status: 500 });
  }
}
