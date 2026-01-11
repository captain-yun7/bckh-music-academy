import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding hero slides...');

  // 기존 히어로 슬라이드 확인
  const existingSlides = await prisma.heroSlide.count();

  if (existingSlides > 0) {
    console.log(`⚠️ Already ${existingSlides} hero slides exist. Skipping...`);
    console.log('If you want to reset, delete existing slides first.');
    return;
  }

  // 히어로 슬라이드 데이터 생성
  const heroSlidesData = [
    { title: '', subtitle: null, imageUrl: '/images/main/main1.jpg', order: 0 },
    { title: '', subtitle: null, imageUrl: '/images/main/main2.jpg', order: 1 },
    { title: '', subtitle: null, imageUrl: '/images/main/main3.jpg', order: 2 },
    { title: '', subtitle: null, imageUrl: '/images/main/main4.jpg', order: 3 },
    { title: '', subtitle: null, imageUrl: '/images/main/main5.jpg', order: 4 },
  ];

  for (const slide of heroSlidesData) {
    await prisma.heroSlide.create({
      data: {
        title: slide.title,
        subtitle: slide.subtitle,
        imageUrl: slide.imageUrl,
        order: slide.order,
        isPublished: true,
      },
    });
  }
  console.log('✅ Hero slides created');

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
