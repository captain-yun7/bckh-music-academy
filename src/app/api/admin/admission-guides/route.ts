import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const year = searchParams.get('year');

  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (year) where.year = parseInt(year);

  const guides = await prisma.admissionGuide.findMany({
    where,
    orderBy: [{ year: 'desc' }, { order: 'asc' }, { university: 'asc' }],
  });

  return NextResponse.json(guides);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const data = await request.json();

  const guide = await prisma.admissionGuide.create({
    data: {
      university: data.university,
      department: data.department,
      category: data.category,
      year: data.year,
      content: data.content,
      deadline: data.deadline,
      examDate: data.examDate,
      requirements: data.requirements,
      documents: data.documents,
      examContent: data.examContent,
      link: data.link,
      order: data.order || 0,
      isPublished: data.isPublished ?? true,
    },
  });

  return NextResponse.json(guide);
}
