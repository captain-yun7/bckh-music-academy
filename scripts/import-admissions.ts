import { PrismaClient } from '@prisma/client';
import { admissionsByYear } from '../src/data/admissions';

const prisma = new PrismaClient();

async function importAdmissions() {
  console.log('Starting admissions import...');

  let totalImported = 0;
  let totalSkipped = 0;

  for (const [yearStr, data] of Object.entries(admissionsByYear)) {
    const year = parseInt(yearStr);
    console.log(`\nProcessing ${year}...`);

    for (const student of data.students) {
      try {
        // Check if this admission already exists
        const existing = await prisma.admission.findFirst({
          where: {
            studentName: student.name,
            university: student.school,
            year: year,
          },
        });

        if (existing) {
          console.log(`  ⏭️  Skipped: ${student.name} - ${student.school} (already exists)`);
          totalSkipped++;
          continue;
        }

        // Create new admission
        await prisma.admission.create({
          data: {
            studentName: student.name,
            university: student.school,
            department: student.major,
            major: student.major,
            year: year,
            isEarlyAdmission: false,
            isPublished: true,
          },
        });

        console.log(`  ✅ Imported: ${student.name} - ${student.school}`);
        totalImported++;
      } catch (error) {
        console.error(`  ❌ Error importing ${student.name}:`, error);
      }
    }
  }

  console.log(`\n✨ Import complete!`);
  console.log(`   Imported: ${totalImported}`);
  console.log(`   Skipped: ${totalSkipped}`);
}

importAdmissions()
  .catch((error) => {
    console.error('Import failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
