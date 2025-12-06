import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // 필수 필드 검증
    if (!data.name || !data.phone) {
      return NextResponse.json(
        { error: '이름과 연락처는 필수입니다.' },
        { status: 400 }
      );
    }

    const consultation = await prisma.consultation.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        age: data.age || null,
        gender: data.gender || null,
        subject: data.subject || null,
        purpose: data.purpose || null,
        message: data.message || null,
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, id: consultation.id });
  } catch (error) {
    console.error('Consultation error:', error);
    return NextResponse.json(
      { error: '상담 신청 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
