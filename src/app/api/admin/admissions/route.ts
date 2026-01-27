import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  const where = year ? { year: parseInt(year) } : {};

  const [admissions, total] = await Promise.all([
    prisma.admission.findMany({
      where,
      orderBy: [{ year: 'desc' }, { order: 'asc' }, { createdAt: 'desc' }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.admission.count({ where }),
  ]);

  return NextResponse.json({ admissions, total, page, totalPages: Math.ceil(total / limit) });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const data = await request.json();

  const admission = await prisma.admission.create({
    data: {
      studentName: data.studentName,
      university: data.university,
      department: data.department,
      year: data.year,
      major: data.major,
      isEarlyAdmission: data.isEarlyAdmission || false,
      photoUrl: data.photoUrl,
      testimonial: data.testimonial,
      isPublished: data.isPublished ?? true,
    },
  });

  return NextResponse.json(admission);
}
