import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Finding duplicate instructors by name...');

  // 모든 강사를 이름별로 그룹화
  const instructors = await prisma.instructor.findMany({
    include: {
      subjects: {
        include: { subject: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  });

  const groupedByName = instructors.reduce((acc, instructor) => {
    if (!acc[instructor.name]) {
      acc[instructor.name] = [];
    }
    acc[instructor.name].push(instructor);
    return acc;
  }, {} as Record<string, typeof instructors>);

  // 중복된 이름 찾기
  const duplicates = Object.entries(groupedByName).filter(([_, instructors]) => instructors.length > 1);

  if (duplicates.length === 0) {
    console.log('✅ No duplicate instructors found.');
    return;
  }

  console.log(`Found ${duplicates.length} names with duplicates:`);
  for (const [name, instructorList] of duplicates) {
    console.log(`  - ${name}: ${instructorList.length} records`);
    for (const instructor of instructorList) {
      const subjectNames = instructor.subjects.map(s => s.subject.nameKo).join(', ') || 'No subjects';
      console.log(`    ID: ${instructor.id}, Subjects: ${subjectNames}`);
    }
  }

  console.log('\n🔄 Merging duplicates...');

  for (const [name, instructorList] of duplicates) {
    // 첫 번째 강사를 기준으로 병합 (가장 먼저 생성된 것)
    const primary = instructorList[0];
    const others = instructorList.slice(1);

    console.log(`\nMerging "${name}" - keeping ID: ${primary.id}`);

    // 다른 강사들의 전공을 primary에 추가
    for (const other of others) {
      for (const subjectRel of other.subjects) {
        // 이미 존재하는지 확인
        const exists = await prisma.instructorSubject.findUnique({
          where: {
            instructorId_subjectId: {
              instructorId: primary.id,
              subjectId: subjectRel.subjectId,
            },
          },
        });

        if (!exists) {
          await prisma.instructorSubject.create({
            data: {
              instructorId: primary.id,
              subjectId: subjectRel.subjectId,
              order: subjectRel.order,
            },
          });
          console.log(`  Added subject: ${subjectRel.subject.nameKo}`);
        }
      }

      // 다른 강사의 데이터 중 비어있지 않은 것이 있으면 primary에 병합
      const updates: Record<string, string> = {};
      if (!primary.intro && other.intro) updates.intro = other.intro;
      if (!primary.profile && other.profile) updates.profile = other.profile;
      if (!primary.curriculum && other.curriculum) updates.curriculum = other.curriculum;
      if (!primary.musicGenres && other.musicGenres) updates.musicGenres = other.musicGenres;
      if (!primary.recommendedAlbums && other.recommendedAlbums) updates.recommendedAlbums = other.recommendedAlbums;
      if (!primary.messageToStudents && other.messageToStudents) updates.messageToStudents = other.messageToStudents;
      if (!primary.videoUrl1 && other.videoUrl1) updates.videoUrl1 = other.videoUrl1;
      if (!primary.videoUrl2 && other.videoUrl2) updates.videoUrl2 = other.videoUrl2;
      if (!primary.image && other.image) updates.image = other.image;

      if (Object.keys(updates).length > 0) {
        await prisma.instructor.update({
          where: { id: primary.id },
          data: updates,
        });
        console.log(`  Merged fields: ${Object.keys(updates).join(', ')}`);
      }

      // 중복 강사 삭제
      await prisma.instructor.delete({
        where: { id: other.id },
      });
      console.log(`  Deleted duplicate ID: ${other.id}`);
    }
  }

  console.log('\n✅ Merge completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
