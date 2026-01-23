import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const program = await prisma.program.findUnique({
    where: { id },
  });

  if (!program) {
    return NextResponse.json({ error: '프로그램을 찾을 수 없습니다.' }, { status: 404 });
  }

  return NextResponse.json(program);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const { id } = await params;
  const data = await request.json();

  const program = await prisma.program.update({
    where: { id },
    data: {
      slug: data.slug,
      name: data.name,
      subtitle: data.subtitle,
      description: data.description,
      icon: data.icon,
      image: data.image,
      content: data.content ? JSON.stringify(data.content) : null,
      order: data.order,
      isPublished: data.isPublished,
    },
  });

  return NextResponse.json(program);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 });
  }

  const { id } = await params;

  await prisma.program.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
