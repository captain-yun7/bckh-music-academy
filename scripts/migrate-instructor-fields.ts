import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateInstructorFields() {
  console.log('Starting instructor fields migration...');

  const instructors = await prisma.instructor.findMany({
    where: {
      OR: [
        { bio: { not: null } },
        { career: { not: null } },
      ],
    },
  });

  console.log(`Found ${instructors.length} instructors with data to migrate`);

  for (const instructor of instructors) {
    await prisma.instructor.update({
      where: { id: instructor.id },
      data: {
        intro: instructor.bio || null,
        profile: instructor.career || null,
      },
    });
    console.log(`Migrated: ${instructor.name}`);
  }

  console.log('Migration complete!');
}

migrateInstructorFields()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
