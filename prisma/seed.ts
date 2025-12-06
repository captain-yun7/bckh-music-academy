import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // 1. 관리자 계정 생성
  const hashedPassword = await bcrypt.hash('admin1234', 12);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@khmusic.co.kr' },
    update: {},
    create: {
      email: 'admin@khmusic.co.kr',
      password: hashedPassword,
      name: '관리자',
    },
  });
  console.log('✅ Admin created:', admin.email);

  // 2. 전공 분야 생성 (9개: 보컬, 작곡/화성학, 미디/전자음악, 싱어송라이터, 기타, 베이스, 드럼, 재즈피아노, 댄스)
  const subjects = [
    { name: 'Vocal', nameKo: '보컬', order: 1 },
    { name: 'Composing', nameKo: '작곡/화성학', order: 2 },
    { name: 'MIDI', nameKo: '미디/전자음악', order: 3 },
    { name: 'SingerSongwriter', nameKo: '싱어송라이터', order: 4 },
    { name: 'Guitar', nameKo: '기타', order: 5 },
    { name: 'Bass', nameKo: '베이스', order: 6 },
    { name: 'Drums', nameKo: '드럼', order: 7 },
    { name: 'JazzPiano', nameKo: '재즈피아노', order: 8 },
    { name: 'Dance', nameKo: '댄스', order: 9 },
  ];

  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: { name: subject.name },
      update: { nameKo: subject.nameKo, order: subject.order },
      create: subject,
    });
  }
  console.log('✅ Subjects created');

  // 3. 강사진 데이터 생성
  const subjectMap = await prisma.subject.findMany();
  const getSubjectId = (name: string) => subjectMap.find(s => s.name === name)?.id || '';

  const instructorsData = [
    // Vocal (보컬)
    { name: '하수지', subjectName: 'Vocal', image: '/images/lecturers/vocal_하수지.jpeg' },
    { name: '김수현', subjectName: 'Vocal', image: '/images/lecturers/vocal_김수현.jpeg' },
    { name: '김한울', subjectName: 'Vocal', image: '/images/lecturers/vocal_김한울.jpg' },
    { name: '이은지', subjectName: 'Vocal', image: '/images/lecturers/vocal_이은지.jpg' },
    { name: '전용일', subjectName: 'Vocal', image: '/images/lecturers/vocal_전용일.jpg' },
    { name: '홍연하', subjectName: 'Vocal', image: '/images/lecturers/vocal_홍연하.png' },
    { name: '홍효진', subjectName: 'Vocal', image: '/images/lecturers/vocal_홍효진.png' },
    // Composing (작곡/화성학)
    { name: '강혜민', subjectName: 'Composing', image: '/images/lecturers/composing_강혜민.jpg' },
    { name: '이재혁', subjectName: 'Composing', image: '/images/lecturers/composing_이재혁.jpg' },
    { name: '이은비', subjectName: 'Composing', image: '/images/lecturers/composing_이은비.jpg' },
    { name: '황진하', subjectName: 'Composing', image: '/images/lecturers/composing_황진하.jpg' },
    // MIDI (미디/전자음악)
    { name: '이재혁', subjectName: 'MIDI', image: '/images/lecturers/midi_이재혁.jpg' },
    { name: '조윤상', subjectName: 'MIDI', image: '/images/lecturers/midi_조윤상.jpg' },
    // SingerSongwriter (싱어송라이터) - 보컬+작곡 강사 중 겸임
    { name: '하수지', subjectName: 'SingerSongwriter', image: '/images/lecturers/vocal_하수지.jpeg' },
    { name: '강혜민', subjectName: 'SingerSongwriter', image: '/images/lecturers/composing_강혜민.jpg' },
    // Guitar (기타)
    { name: '노아(Noah)', subjectName: 'Guitar', image: '/images/lecturers/guitar_노아.jpg' },
    { name: '김영롱', subjectName: 'Guitar', image: '/images/lecturers/guitar_김영롱.jpg' },
    { name: '남윤찬', subjectName: 'Guitar', image: '/images/lecturers/guitar_남윤찬.jpg' },
    { name: '공석배', subjectName: 'Guitar', image: '/images/lecturers/guitar_공석배.jpg' },
    { name: '구자훈', subjectName: 'Guitar', image: '/images/lecturers/guitar_구자훈.png' },
    // Bass (베이스)
    { name: '현재천', subjectName: 'Bass', image: '/images/lecturers/bass_현재천.jpg' },
    { name: '신희주', subjectName: 'Bass', image: '/images/lecturers/bass_신희주.png' },
    // Drums (드럼)
    { name: '유종광', subjectName: 'Drums', image: '/images/lecturers/drums_유종광.jpeg' },
    // JazzPiano (재즈피아노) - 기존 Piano 강사들
    { name: '이민경', subjectName: 'JazzPiano', image: '/images/lecturers/piano_이민경.jpg' },
    { name: '이소정', subjectName: 'JazzPiano', image: '/images/lecturers/piano_이소정.jpg' },
    { name: '김하영', subjectName: 'JazzPiano', image: '/images/lecturers/piano_김하영.png' },
    { name: '황진하', subjectName: 'JazzPiano', image: '/images/lecturers/piano_황진하.jpg' },
    { name: '구자경', subjectName: 'JazzPiano', image: '/images/lecturers/piano_구자경.png' },
    { name: '박한빈', subjectName: 'JazzPiano', image: '/images/lecturers/piano_박한빈.jpeg' },
    // Dance (댄스)
    { name: '양지은', subjectName: 'Dance', image: '/images/lecturers/dance_양지은.jpeg' },
  ];

  for (let i = 0; i < instructorsData.length; i++) {
    const instructor = instructorsData[i];
    const subjectId = getSubjectId(instructor.subjectName);
    if (subjectId) {
      await prisma.instructor.create({
        data: {
          name: instructor.name,
          subjectId,
          image: instructor.image,
          isActive: true,
          order: i,
        },
      });
    }
  }
  console.log('✅ Instructors created');

  // 4. 배출 뮤지션 데이터 생성
  const musiciansData = [
    { name: '문수진', role: '싱어송라이터', achievement: '음원 발매 및 활발한 활동', image: '/images/pride/debut_moon.jpg' },
    { name: '포테이토', role: '아티스트', achievement: '음원 발매', image: '/images/pride/debut_potato.jpg' },
    { name: '리사', role: '아티스트', achievement: '활발한 음악 활동', image: '/images/pride/risa.jpg' },
  ];

  for (let i = 0; i < musiciansData.length; i++) {
    const musician = musiciansData[i];
    await prisma.musician.create({
      data: {
        name: musician.name,
        role: musician.role,
        achievement: musician.achievement,
        image: musician.image,
        isPublished: true,
        order: i,
      },
    });
  }
  console.log('✅ Musicians created');

  // 5. 샘플 공지사항 생성
  await prisma.notice.createMany({
    data: [
      {
        title: '[강사님 소개] 새로오신 Vocal 전용일 강사님을 소개합니다',
        content: '안녕하세요, 경희실용음악학원입니다.\n\n새롭게 합류하신 보컬 전용일 강사님을 소개합니다.\n풍부한 현장 경험과 체계적인 교육 방법으로 여러분의 음악적 성장을 도와드리겠습니다.',
        category: 'INSTRUCTOR',
        isPinned: true,
        isPublished: true,
      },
      {
        title: '2025년 입시 일정 안내',
        content: '2025년 실용음악과 입시 일정을 안내드립니다.\n\n자세한 내용은 학원으로 문의 바랍니다.',
        category: 'ADMISSION',
        isPinned: false,
        isPublished: true,
      },
    ],
  });
  console.log('✅ Notices created');

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
