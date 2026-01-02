import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkYears() {
  const admissions = await prisma.admission.findMany({
    where: { isPublished: true },
    select: { year: true },
  });

  const years = Array.from(new Set(admissions.map(a => a.year))).sort((a, b) => b - a);

  console.log('연도별 데이터:');
  for (const year of years) {
    const count = admissions.filter(a => a.year === year).length;
    console.log(`${year}년: ${count}명`);
  }

  console.log(`\n총 ${admissions.length}명`);
}

checkYears()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
