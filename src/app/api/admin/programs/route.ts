import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const programs = await prisma.program.findMany({
    orderBy: { order: 'asc' },
  });

  return NextResponse.json(programs);
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const data = await request.json();

  const program = await prisma.program.create({
    data: {
      slug: data.slug,
      name: data.name,
      subtitle: data.subtitle,
      description: data.description,
      icon: data.icon,
      image: data.image,
      content: data.content ? JSON.stringify(data.content) : null,
      order: data.order || 0,
      isPublished: data.isPublished ?? true,
    },
  });

  return NextResponse.json(program);
}
