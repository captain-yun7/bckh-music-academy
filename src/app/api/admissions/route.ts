import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get('year');

  const where = {
    isPublished: true,
    ...(year ? { year: parseInt(year) } : {}),
  };

  const admissions = await prisma.admission.findMany({
    where,
    orderBy: [
      { year: 'desc' },
      { order: 'asc' },
      { createdAt: 'desc' },
    ],
  });

  // 연도별로 그룹화 옵션
  const groupByYear = searchParams.get('groupByYear') === 'true';

  if (groupByYear) {
    const grouped = admissions.reduce((acc, admission) => {
      const year = admission.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(admission);
      return acc;
    }, {} as Record<number, typeof admissions>);

    return NextResponse.json(grouped);
  }

  return NextResponse.json(admissions);
}
