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
    { name: '문별', role: '래퍼 / 싱어송라이터', achievement: '마마무 멤버, 솔로 활동', image: '/images/musicians/moonbyul.jpg' },
    { name: '나다', role: '래퍼 / 방송인', achievement: '쇼미더머니3, 언프리티랩스타', image: '/images/musicians/nada.jpg' },
    { name: '이종훈', role: '보컬 / 기타리스트', achievement: '슈퍼밴드, 케빈오와 애프터문', image: '/images/musicians/aftermoon.jpg' },
    { name: '웰던포테이토', role: '인디밴드', achievement: '인디씬 활동', image: '/images/musicians/weldonpotato.jpg' },
    { name: '리싸', role: 'R&B 아티스트', achievement: '솔로 활동', image: '/images/musicians/risa.jpg' },
    { name: '주대건', role: '보컬', achievement: '소리얼 멤버', image: '/images/musicians/soreal.jpg' },
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

  // 6. 합격자 동영상 데이터 생성
  const successVideosData = [
    // 2025학년도
    { title: '박은진 - 단국대학교 뉴뮤직학과 싱어송라이터전공', description: '여주대, 남서울대 중복합격', youtubeUrl: 'https://www.youtube.com/watch?v=uj73oS-QUi4', order: 1 },
    { title: '강은지 - 동덕여자대학교 피아노전공', description: '서경대예비3, 홍익대1차, 백석예대 중복합격', youtubeUrl: 'https://www.youtube.com/watch?v=fVqn5iH71ys', order: 2 },
    { title: '최영민 - 호원대학교 K-POP학과', description: '2025학년도 합격', youtubeUrl: 'https://www.youtube.com/watch?v=N-0NNbqGWFg', order: 3 },
    // 2024학년도
    { title: '차예서 - 호원대학교 K-POP학과', description: '2024학년도 합격', youtubeUrl: 'https://www.youtube.com/watch?v=zhsj2Wie4IU', order: 4 },
    { title: '문은솔 - 서서울생활과학고 실용음악과 보컬전공', description: '2024학년도 합격', youtubeUrl: 'https://www.youtube.com/watch?v=9nprqjZXgvY', order: 5 },
    { title: '송채원 - 서서울생활과학고 실용음악과 보컬전공', description: '2024학년도 합격', youtubeUrl: 'https://www.youtube.com/watch?v=TXANHRFiLWE', order: 6 },
    { title: '김미래 - 호원대학교 실용음악과 작곡전공', description: '2024학년도 합격', youtubeUrl: 'https://www.youtube.com/watch?v=zhfYSQb30Sw', order: 7 },
    { title: '최지혜 - 서울공연예술고 실용음악과 보컬전공', description: '2024학년도 합격', youtubeUrl: 'https://www.youtube.com/watch?v=kot7OFU_21c', order: 8 },
    { title: '이은비 - 동아방송예술대학교 실용음악과 작곡전공', description: '2024학년도 합격', youtubeUrl: 'https://www.youtube.com/watch?v=K34t03QNEgw', order: 9 },
    // 2023학년도
    { title: '김휘성 - 호원대학교 실용음악과 베이스전공', description: '2023학년도 합격', youtubeUrl: 'https://www.youtube.com/watch?v=6OYMnDDyf_M', order: 10 },
    { title: '이용환 - 서울공연예술고 실용음악과 기타전공', description: '2023학년도 합격', youtubeUrl: 'https://www.youtube.com/watch?v=-oHA9e6qHpA', order: 11 },
    // 2022학년도
    { title: '곽재민 - 서울실용음악고/서서울생활과학고 베이스전공', description: '서서울생활과학고등학교 중복합격', youtubeUrl: 'https://www.youtube.com/watch?v=EuQ7K3q6Kpg', order: 12 },
    { title: '이예린 - 호원대학교 실용음악과 재즈피아노전공', description: '수시합격', youtubeUrl: 'https://www.youtube.com/watch?v=fZK5iW8Krzo', order: 13 },
    { title: '이유진 - 호원대학교 실용음악과 작곡전공', description: '수시합격', youtubeUrl: 'https://www.youtube.com/watch?v=ru0dE2_K4oE', order: 14 },
    { title: '강은지 - 서울공연예술고 실용음악과 피아노전공', description: '2022학년도 합격', youtubeUrl: 'https://www.youtube.com/watch?v=VO1wviLxa5o', order: 15 },
    // 2020학년도
    { title: '김선경 - 호원대 실용음악과 재즈피아노전공', description: '정시합격', youtubeUrl: 'https://www.youtube.com/watch?v=dKhpy_hJQwg', order: 16 },
    // 2018학년도
    { title: '김영찬 - 경희대학교 포스트모던음악과 작곡전공', description: '수시합격', youtubeUrl: 'https://www.youtube.com/watch?v=X5aTWYYtspI', order: 17 },
  ];

  for (const video of successVideosData) {
    await prisma.video.create({
      data: {
        title: video.title,
        description: video.description,
        youtubeUrl: video.youtubeUrl,
        category: 'ADMISSION_SUCCESS',
        isPublished: true,
        order: video.order,
      },
    });
  }
  console.log('✅ Success videos created');

  // 7. 연도별 합격자 데이터 생성
  const admissionsData = [
    // 2025년
    { studentName: '곽*민', university: '서울예술대학교', department: '실용음악과', major: '베이스', year: 2025 },
    { studentName: '곽*민', university: '동아방송예술대학교', department: '실용음악과', major: '베이스', year: 2025 },
    { studentName: '강*지', university: '동덕여자대학교', department: '실용음악과', major: '피아노', year: 2025 },
    { studentName: '이*환', university: '서경대학교', department: '실용음악과', major: '기타', year: 2025 },
    { studentName: '이*진', university: '홍익대학교', department: '실용음악과', major: '기타', year: 2025 },
    { studentName: '곽*민', university: '한양대학교', department: '실용음악과', major: '베이스', year: 2025 },
    { studentName: '최*민', university: '호원대학교', department: '실용음악과', major: 'K-POP 보컬', year: 2025 },
    { studentName: '강*지', university: '백석예술대학교', department: '실용음악과', major: '피아노', year: 2025 },
    { studentName: '손*서', university: '백석예술대학교', department: '실용음악과', major: '베이스', year: 2025 },
    { studentName: '김*나', university: '백석예술대학교', department: '교회실용음악과', major: '피아노', year: 2025 },
    { studentName: '박*진', university: '여주대학교', department: '실용음악과', major: '싱어송라이터', year: 2025 },
    { studentName: '이*원', university: '여주대학교', department: '실용음악과', major: '기타', year: 2025 },
    { studentName: '손*서', university: '국제예술대학교', department: '실용음악과', major: '프로듀싱', year: 2025 },
    { studentName: '양*우', university: '국제예술대학교', department: '실용음악과', major: '프로듀싱', year: 2025 },
    { studentName: '이*원', university: '용인대학교', department: '실용음악과', major: '기타', year: 2025 },
    { studentName: '박*진', university: '정화예술대학교', department: '실용음악과', major: '싱어송라이터', year: 2025 },
    { studentName: '최*완', university: '정화예술대학교', department: '실용음악과', major: '기타', year: 2025 },
    { studentName: '천*영', university: '김포대학교', department: '실용음악과', major: '보컬', year: 2025 },
    { studentName: '김*빈', university: '재능대학교', department: '실용음악과', major: '보컬', year: 2025 },
    { studentName: '이*원', university: '청운대학교', department: '실용음악과', major: '기타', year: 2025 },
    // 2024년
    { studentName: '이*비', university: '동아방송예술대학교', department: '실용음악과', major: '작곡', year: 2024 },
    { studentName: '김*래', university: '호원대학교', department: '실용음악과', major: '작곡', year: 2024 },
    { studentName: '차*서', university: '호원대학교', department: '실용음악과', major: 'K-POP', year: 2024 },
    { studentName: '이*비', university: '홍익대학교', department: '실용음악과', major: '작곡', year: 2024 },
    { studentName: '김*래', university: '경희대학교', department: '포스트모던음악과', major: '작곡', year: 2024 },
    { studentName: '이*진', university: '백석예술대학교', department: '실용음악과', major: '피아노', year: 2024 },
    { studentName: '최*늘', university: '백석예술대학교', department: '교회실용음악과', major: '보컬', year: 2024 },
    { studentName: '허*진', university: '정화예술대학교', department: '실용음악과', major: '보컬', year: 2024 },
    { studentName: '나*성', university: '정화예술대학교', department: '실용음악과', major: '드럼', year: 2024 },
    { studentName: '최*은', university: '정화예술대학교', department: '실용음악과', major: '싱어송라이터', year: 2024 },
    { studentName: '차*서', university: '정화예술대학교', department: '실용음악과', major: '피아노', year: 2024 },
    { studentName: '김*빈', university: '서울신학대학교', department: '실용음악과', major: '피아노', year: 2024 },
    { studentName: '윤*연', university: '재능대학교', department: '실용음악과', major: '보컬', year: 2024 },
    { studentName: '이*진', university: '신안산대학교', department: '실용음악과', major: '피아노', year: 2024 },
    { studentName: '윤*연', university: '김포대학교', department: '실용음악과', major: '보컬', year: 2024 },
    { studentName: '박*현', university: '김포대학교', department: '실용음악과', major: '보컬', year: 2024 },
    { studentName: '이*진', university: 'KAC 한국예술원', department: '실용음악과', major: '피아노', year: 2024 },
    { studentName: '최*혜', university: '서울공연예술고등학교', department: '실용음악과', major: '보컬', year: 2024 },
    { studentName: '문*솔', university: '서서울생활과학고등학교', department: '실용음악과', major: '보컬', year: 2024 },
    { studentName: '송*원', university: '서서울생활과학고등학교', department: '실용음악과', major: '보컬', year: 2024 },
    // 2023년
    { studentName: '박*혁', university: '서울예술대학교', department: '실용음악과', major: '기타', year: 2023 },
    { studentName: '김*늬', university: '서울예술대학교', department: '실용음악과', major: '전자음악', year: 2023 },
    { studentName: '손*서', university: '동아방송예술대학교', department: '실용음악과', major: '드럼', year: 2023 },
    { studentName: '김*성', university: '동아방송예술대학교', department: '실용음악과', major: '베이스', year: 2023 },
    { studentName: '손*서', university: '호원대학교', department: '실용음악과', major: '드럼', year: 2023 },
    { studentName: '김*성', university: '호원대학교', department: '실용음악과', major: '베이스', year: 2023 },
    { studentName: '손*서', university: '명지전문대학교', department: '실용음악과', major: '드럼', year: 2023 },
    { studentName: '김*성', university: '성신여자대학교', department: '실용음악과', major: '재즈피아노', year: 2023 },
    { studentName: '김*성', university: '여주대학교', department: '실용음악과', major: '재즈피아노', year: 2023 },
    { studentName: '장*성', university: '여주대학교', department: '실용음악과', major: '기타', year: 2023 },
    { studentName: '이*현', university: '여주대학교', department: '실용음악과', major: '기타', year: 2023 },
    { studentName: '최*윤', university: '백석예술대학교', department: '실용음악과', major: '보컬', year: 2023 },
    { studentName: '김*찬', university: '백석예술대학교', department: '실용음악과', major: '기타', year: 2023 },
    { studentName: '장*성', university: '백석예술대학교', department: '실용음악과', major: '기타', year: 2023 },
    { studentName: '곽*현', university: '백석예술대학교', department: '실용음악과', major: '기타', year: 2023 },
    { studentName: '김*서', university: '국제예술대학교', department: '실용음악과', major: '기타', year: 2023 },
    { studentName: '손*호', university: '백제예술대학교', department: '실용음악과', major: '미디', year: 2023 },
    { studentName: '김*현', university: '수원여자대학교', department: '실용음악과', major: '재즈피아노', year: 2023 },
    { studentName: '김*민', university: '정화예술대학교', department: '실용음악과', major: '보컬', year: 2023 },
    { studentName: '장*기', university: '정화예술대학교', department: '실용음악과', major: '보컬', year: 2023 },
    { studentName: '김*늘', university: '정화예술대학교', department: '실용음악과', major: '보컬', year: 2023 },
    { studentName: '김*민', university: '정화예술대학교', department: '실용음악과', major: '미디', year: 2023 },
    { studentName: '김*서', university: '재능대학교', department: '실용음악과', major: '기타', year: 2023 },
    { studentName: '박*른', university: '재능대학교', department: '실용음악과', major: '보컬', year: 2023 },
    { studentName: '김*온', university: '재능대학교', department: '실용음악과', major: '드럼', year: 2023 },
    { studentName: '이*환', university: '서울공연예술고등학교', department: '실용음악과', major: '기타', year: 2023 },
    { studentName: '김*아', university: '서서울생활과학고등학교', department: '실용음악과', major: '베이스', year: 2023 },
    { studentName: '김*현', university: '금천문화예술정보학교', department: '실용음악과', major: '보컬', year: 2023 },
    { studentName: '이*빈', university: '서경대학교 위탁교육원', department: '실용음악과', major: '작곡', year: 2023 },
    // 2022년
    { studentName: '이*우', university: '서울예술대학교', department: '실용음악과', major: '기타', year: 2022 },
    { studentName: '정*영', university: '서울예술대학교', department: '실용음악과', major: '작곡', year: 2022 },
    { studentName: '이*린', university: '호원대학교', department: '실용음악과', major: '재즈피아노', year: 2022 },
    { studentName: '이*진', university: '호원대학교', department: '실용음악과', major: '작곡', year: 2022 },
    { studentName: '이*우', university: '호원대학교', department: '실용음악과', major: '기타', year: 2022 },
    { studentName: '조*영', university: '한양대학교', department: '실용음악과', major: '드럼', year: 2022 },
    { studentName: '김*민', university: '여주대학교', department: '실용음악과', major: '보컬', year: 2022 },
    { studentName: '김*원', university: '여주대학교', department: '실용음악과', major: '탑라이너', year: 2022 },
    { studentName: '이*진', university: '여주대학교', department: '실용음악과', major: '작곡', year: 2022 },
    { studentName: '백*경', university: '여주대학교', department: '실용음악과', major: '싱어송라이터', year: 2022 },
    { studentName: '황*진', university: '여주대학교', department: '실용음악과', major: '베이스', year: 2022 },
    { studentName: '권*빈', university: '백석예술대학교', department: '실용음악과', major: '보컬', year: 2022 },
    { studentName: '황*빛', university: '백석예술대학교', department: '실용음악과', major: '작곡', year: 2022 },
    { studentName: '김*성', university: '백석예술대학교', department: '실용음악과', major: '재즈피아노', year: 2022 },
    { studentName: '백*경', university: '백석예술대학교', department: '실용음악과', major: '싱어송라이터', year: 2022 },
    { studentName: '이*영', university: '백석예술대학교', department: '교회실용음악과', major: '보컬', year: 2022 },
    { studentName: '정*영', university: '용인대학교', department: '실용음악과', major: '작곡', year: 2022 },
    { studentName: '김*늬', university: '백제예술대학교', department: '실용음악과', major: '미디', year: 2022 },
    { studentName: '백*경', university: '백제예술대학교', department: '실용음악과', major: '싱어송라이터', year: 2022 },
    { studentName: '방*연', university: '백제예술대학교', department: '실용음악과', major: 'KPOP 보컬', year: 2022 },
    { studentName: '이*현', university: '정화예술대학교', department: '실용음악과', major: '기타', year: 2022 },
    { studentName: '김*원', university: '정화예술대학교', department: '실용음악과', major: '싱어송라이터', year: 2022 },
    { studentName: '박*석', university: '정화예술대학교', department: '실용음악과', major: '보컬', year: 2022 },
    { studentName: '권*빈', university: '정화예술대학교', department: '실용음악과', major: '보컬', year: 2022 },
    { studentName: '방*연', university: '동서울대학교', department: '실용음악과', major: 'KPOP', year: 2022 },
    { studentName: '정*영', university: '중부대학교', department: '실용음악과', major: '작곡', year: 2022 },
    { studentName: '이*우', university: '재능대학교', department: '실용음악과', major: '보컬', year: 2022 },
    { studentName: '강*지', university: '서울공연예술고등학교', department: '실용음악과', major: '피아노 수석', year: 2022 },
    { studentName: '곽*민', university: '서울실용음악고등학교', department: '실용음악과', major: '베이스', year: 2022 },
    { studentName: '곽*민', university: '서서울생활과학고등학교', department: '실용음악과', major: '베이스', year: 2022 },
    { studentName: '장*미', university: '서서울생활과학고등학교', department: '실용음악과', major: '피아노', year: 2022 },
    { studentName: '주*모', university: '아현산업정보학교', department: '실용음악과', major: '보컬', year: 2022 },
    // 2021년
    { studentName: '정원채', university: '서울예술대학교', department: '실용음악과', major: '드럼', year: 2021 },
    { studentName: '조은영', university: '서울예술대학교', department: '실용음악과', major: '드럼', year: 2021 },
    { studentName: '최광석', university: '동아방송예술대학교', department: '실용음악과', major: '보컬', year: 2021 },
    { studentName: '윤채원', university: '한양대학교', department: '실용음악과', major: '보컬', year: 2021 },
    { studentName: '오병진', university: '한양대학교', department: '실용음악과', major: '보컬', year: 2021 },
    { studentName: '박도영', university: '호원대학교', department: '실용음악과', major: '보컬', year: 2021 },
    { studentName: '최광석', university: '호원대학교', department: '실용음악과', major: '보컬', year: 2021 },
    { studentName: '이성근', university: '호원대학교', department: '실용음악과', major: '보컬', year: 2021 },
    { studentName: '이지은', university: '호원대학교', department: '실용음악과', major: '보컬', year: 2021 },
    { studentName: '최광석', university: '서경대학교', department: '실용음악과', major: '보컬', year: 2021 },
    { studentName: '이지은', university: '홍익대학교', department: '실용음악과', major: '보컬', year: 2021 },
    { studentName: '정원채', university: '경희대학교', department: '포스트모던음악과', major: '드럼', year: 2021 },
    { studentName: '박원', university: '단국대학교', department: '뉴뮤직과', major: '작곡', year: 2021 },
    { studentName: '송태웅', university: '백석예술대학교', department: '실용음악과', major: '뮤직테크놀로지', year: 2021 },
    { studentName: '박원', university: '백석예술대학교', department: '실용음악과', major: '싱어송라이터', year: 2021 },
    { studentName: '유시찬', university: '백석예술대학교', department: '교회실용음악과', major: '보컬', year: 2021 },
    { studentName: '김시원', university: '여주대학교', department: '실용음악과', major: '피아노', year: 2021 },
    { studentName: '양호준', university: '여주대학교', department: '실용음악과', major: '싱어송라이터', year: 2021 },
    { studentName: '정원채', university: '여주대학교', department: '실용음악과', major: '드럼', year: 2021 },
    { studentName: '조은영', university: '여주대학교', department: '실용음악과', major: '드럼', year: 2021 },
    { studentName: '유시찬', university: '백석대학교', department: '실용음악과', major: '보컬', year: 2021 },
    { studentName: '이유진', university: '호서대학교', department: '실용음악과', major: '작곡', year: 2021 },
    { studentName: '민예슬', university: '백제예술대학교', department: '실용음악과', major: '미디', year: 2021 },
    { studentName: '이유진', university: '수원여자대학교', department: '실용음악과', major: '작곡', year: 2021 },
    { studentName: '박원', university: '정화예술대학교', department: '실용음악과', major: '작곡', year: 2021 },
    { studentName: '김은실', university: '정화예술대학교', department: '실용음악과', major: '보컬', year: 2021 },
    { studentName: '민예슬', university: '정화예술대학교', department: '실용음악과', major: '미디', year: 2021 },
    { studentName: '김예진', university: '백석대학교 평생교육신학원', department: '실용음악과', major: '피아노', year: 2021 },
    // 2020년
    { studentName: '이은비', university: '동아방송예술대학', department: '실용음악과', major: '작곡', year: 2020 },
    { studentName: '정하영', university: '동아방송예술대학', department: '실용음악과', major: '작곡', year: 2020 },
    { studentName: '이은비', university: '한양대학교', department: '실용음악과', major: '작곡', year: 2020 },
    { studentName: '김선경', university: '호원대학교', department: '실용음악과', major: '피아노', year: 2020 },
    { studentName: '박도영', university: '서경대학교', department: '실용음악과', major: '보컬', year: 2020 },
    { studentName: '박원', university: '경희대학교', department: '포스트모던음악과', major: '작곡', year: 2020 },
    { studentName: '이은비', university: '홍익대학교', department: '실용음악과', major: '작곡', year: 2020 },
    { studentName: '박원', university: '홍익대학교', department: '실용음악과', major: '작곡', year: 2020 },
    { studentName: '박도영', university: '홍익대학교', department: '실용음악과', major: '보컬', year: 2020 },
    { studentName: '유현준', university: '백석예술대학교', department: '실용음악과', major: '베이스', year: 2020 },
    { studentName: '박도영', university: '백석예술대학교', department: '실용음악과', major: '싱어송라이터', year: 2020 },
    { studentName: '황인범', university: '백석예술대학교', department: '실용음악과', major: '싱어송라이터', year: 2020 },
    { studentName: '정하영', university: '백석예술대학교', department: '실용음악과', major: '작곡', year: 2020 },
    { studentName: '박민혁', university: '백석예술대학교', department: '실용음악과', major: '기타', year: 2020 },
    { studentName: '홍예서', university: '백석예술대학교', department: '교회실용음악과', major: '보컬', year: 2020 },
    { studentName: '신해찬', university: '여주대학교', department: '실용음악과', major: '뮤직프로덕션', year: 2020 },
    { studentName: '전민기', university: '백석대학교', department: '실용음악과', major: '제작프로듀서', year: 2020 },
    { studentName: '박지혜', university: '수원여자대학교', department: '실용음악과', major: '작곡', year: 2020 },
    { studentName: '조연우', university: '정화예술대학교', department: '실용음악과', major: '재즈피아노', year: 2020 },
    { studentName: '김지수', university: '정화예술대학교', department: '실용음악과', major: '재즈피아노', year: 2020 },
    { studentName: '조연우', university: '백제예술대학교', department: '실용음악과', major: '재즈피아노', year: 2020 },
    { studentName: '송영우', university: '용인대학교', department: '실용음악과', major: '보컬', year: 2020 },
    { studentName: '조연우', university: '동서울대학교', department: '실용음악과', major: '재즈피아노', year: 2020 },
    { studentName: '송영우', university: '서울신학대학교', department: '실용음악과', major: '보컬', year: 2020 },
    { studentName: '이종훈', university: '백석문화대학교', department: '실용음악과', major: '컴퓨터음악작곡', year: 2020 },
    { studentName: '황인범', university: '장안대학교', department: '실용음악과', major: '싱어송라이터', year: 2020 },
    { studentName: '강나연', university: '재능대학교', department: '실용음악과', major: '보컬', year: 2020 },
    { studentName: '박민혁', university: '청운대학교', department: '실용음악과', major: '기타', year: 2020 },
    { studentName: '송영우', university: '성결대학교', department: '현대실용음악과', major: '보컬', year: 2020 },
    { studentName: '조연우', university: '예원예술대학교', department: '실용음악과', major: '재즈피아노', year: 2020 },
    { studentName: '고동현', university: '서서울생활과학고등학교', department: '실용음악과', major: '드럼', year: 2020 },
    // 2019년
    { studentName: '임나은', university: '동아방송예술대학', department: '실용음악과', major: '보컬', year: 2019 },
    { studentName: '전현우', university: '명지전문대학', department: '실용음악과', major: '보컬', year: 2019 },
    { studentName: '김동혁', university: '백석예술대학', department: '실용음악과', major: '드럼', year: 2019 },
    { studentName: '김민규', university: '백석예술대학', department: '실용음악과', major: '드럼', year: 2019 },
    { studentName: '권아연', university: '백석예술대학', department: '실용음악과', major: '보컬', year: 2019 },
    { studentName: '조주현', university: '백석예술대학', department: '실용음악과', major: '뮤직테크놀로지', year: 2019 },
    { studentName: '김예진', university: '백석예술대학', department: '교회실용음악과', major: '피아노', year: 2019 },
    { studentName: '임나은', university: '국제예술대학', department: '실용음악과', major: '보컬', year: 2019 },
    { studentName: '육정근', university: '백제예술대학', department: '실용음악과', major: '작곡', year: 2019 },
    { studentName: '임나은', university: '한양여자대학', department: '실용음악과', major: '보컬', year: 2019 },
    { studentName: '육정근', university: '강동대학교', department: '실용음악과', major: '작곡', year: 2019 },
    { studentName: '박하은', university: '강동대학교', department: '실용음악과', major: '싱어송라이터', year: 2019 },
    { studentName: '임나은', university: '정화예술대학', department: '실용음악과', major: '보컬', year: 2019 },
    { studentName: '박원', university: '정화예술대학', department: '실용음악과', major: '작곡', year: 2019 },
    // 2018년
    { studentName: '장진우', university: '서울예술대학교', department: '실용음악과', major: '보컬', year: 2018 },
    { studentName: '신동규', university: '동아방송예술대학교', department: '실용음악과', major: '기타', year: 2018 },
    { studentName: '장진우', university: '동아방송예술대학교', department: '실용음악과', major: '보컬', year: 2018 },
    { studentName: '장진우', university: '한양대학교', department: '실용음악과', major: '보컬', year: 2018 },
    { studentName: '김영찬', university: '경희대학교', department: '포스트모던음악과', major: '작곡', year: 2018, isEarlyAdmission: true },
    { studentName: '유정은', university: '백석예술대학', department: '실용음악과', major: '보컬', year: 2018 },
    { studentName: '윤동현', university: '백석예술대학', department: '실용음악과', major: '보컬', year: 2018 },
    { studentName: '오동훈', university: '백석예술대학', department: '실용음악과', major: '기타', year: 2018 },
    { studentName: '박세웅', university: '백석예술대학', department: '실용음악과', major: '베이스', year: 2018 },
    { studentName: '한지훈', university: '백제예술대학', department: '실용음악과', major: '기타', year: 2018 },
    { studentName: '김홍빈', university: '서울신학대학', department: '실용음악과', major: '보컬', year: 2018 },
    { studentName: '서정훈', university: '호서대학교', department: '실용음악과', major: '기타', year: 2018 },
    { studentName: '정승철', university: '중부대학교', department: '실용음악과', major: '기타', year: 2018 },
    { studentName: '서정훈', university: '평택대학교', department: '실용음악과', major: '기타', year: 2018 },
    { studentName: '김혜진', university: '백석문화대학', department: '실용음악과', major: '미디', year: 2018 },
    { studentName: '윤동현', university: '정화예술대학', department: '실용음악과', major: '보컬', year: 2018 },
    { studentName: '서정훈', university: '신안산대학교', department: '실용음악과', major: '기타', year: 2018 },
    { studentName: '이상현', university: '추계예술대학', department: '실용음악과', major: '보컬', year: 2018 },
    // 2017년
    { studentName: '김태인', university: '서울예술대학', department: '실용음악과', major: '기타 (18살 조기입학)', year: 2017 },
    { studentName: '설다혜', university: '서울예술대학', department: '실용음악과', major: '재즈 바이올린', year: 2017 },
    { studentName: '유재은', university: '서울예술대학', department: '실용음악과', major: '작곡', year: 2017 },
    { studentName: '유정은', university: '한양대학교', department: '실용음악과', major: '보컬', year: 2017 },
    { studentName: '김홍비', university: '동아방송예술대학', department: '실용음악과', major: '베이스', year: 2017 },
    { studentName: '정지석', university: '동아방송예술대학', department: '실용음악과', major: '싱어송라이팅', year: 2017 },
    { studentName: '최연정', university: '동아방송예술대학', department: '실용음악과', major: '보컬', year: 2017 },
    { studentName: '이종훈', university: '호원대학교', department: '실용음악과', major: '베이스', year: 2017 },
    { studentName: '김홍비', university: '동덕여자대학교', department: '실용음악과', major: '베이스', year: 2017 },
    { studentName: '박은총', university: '동덕여자대학교', department: '실용음악과', major: '피아노', year: 2017 },
    { studentName: '유호정', university: '단국대학교', department: '실용음악과', major: '재즈바이올린', year: 2017 },
    { studentName: '설다혜', university: '경희대학교', department: '포스트모던음악과', major: '재즈바이올린', year: 2017 },
    { studentName: '설다혜', university: '성신여자대학교', department: '현대실용음악과', major: '재즈바이올린', year: 2017 },
    { studentName: '정종현', university: '여주대학교', department: '실용음악과', major: '기타', year: 2017 },
    { studentName: '정지석', university: '백석예술대학', department: '실용음악과', major: '싱어송라이팅', year: 2017 },
    { studentName: '설다혜', university: '백석예술대학', department: '실용음악과', major: '재즈바이올린', year: 2017 },
    { studentName: '김민주', university: '백석예술대학', department: '실용음악과', major: '피아노', year: 2017 },
    { studentName: '박세웅', university: '백석예술대학', department: '실용음악과', major: '베이스', year: 2017 },
    { studentName: '박찬영', university: '백석예술대학', department: '실용음악과', major: '드럼', year: 2017 },
    { studentName: '유호정', university: '백석대학교', department: '실용음악과', major: '재즈바이올린', year: 2017 },
    { studentName: '유재은', university: '수원여자대학', department: '실용음악과', major: '작곡', year: 2017 },
    { studentName: '최연정', university: '수원여자대학', department: '실용음악과', major: '보컬', year: 2017 },
    { studentName: '신승원', university: '청운대학교', department: '실용음악과', major: '드럼', year: 2017 },
    { studentName: '신승원', university: '백석문화대학', department: '실용음악과', major: '드럼', year: 2017 },
    { studentName: '박찬영', university: '국제예술대학', department: '실용음악과', major: '드럼', year: 2017 },
    { studentName: '최연정', university: '서경대 콘서바토리', department: '실용음악과', major: '보컬', year: 2017 },
    // 2016년
    { studentName: '김치호', university: '서울예술대학', department: '실용음악과', major: '드럼', year: 2016 },
    { studentName: '유승균', university: '서울예술대학', department: '실용음악과', major: '작곡', year: 2016 },
    { studentName: '김동현', university: '호원대학교', department: '실용음악과', major: '작곡', year: 2016 },
    { studentName: '유승균', university: '동아방송예술대학', department: '실용음악과', major: '작곡', year: 2016 },
    { studentName: '김치호', university: '경희대학교', department: '포스트모던음악과', major: '드럼', year: 2016 },
    { studentName: '이동현', university: '백석예술대학', department: '실용음악과', major: '작곡', year: 2016 },
    { studentName: '정철규', university: '백석예술대학', department: '실용음악과', major: '보컬', year: 2016 },
    { studentName: '장진우', university: '백석예술대학', department: '실용음악과', major: '싱어송라이터', year: 2016 },
    { studentName: '김치호', university: '백석예술대학', department: '실용음악과', major: '드럼', year: 2016 },
    { studentName: '박은총', university: '백석예술대학', department: '실용음악과', major: '피아노', year: 2016 },
    { studentName: '설다빛', university: '백석예술대학', department: '실용음악과', major: '피아노', year: 2016 },
    { studentName: '유상아', university: '수원여자대학', department: '실용음악과', major: '작곡', year: 2016 },
    { studentName: '신예원', university: '국제예술대학', department: '실용음악과', major: '작곡', year: 2016 },
    { studentName: '차윤서', university: '명지대학교', department: '실용무용과', major: '실용무용', year: 2016 },
  ];

  // isEarlyAdmission 기본값 설정
  const admissionsWithDefaults = admissionsData.map(a => ({
    ...a,
    isEarlyAdmission: a.isEarlyAdmission || false,
  }));

  for (const admission of admissionsWithDefaults) {
    await prisma.admission.create({
      data: {
        studentName: admission.studentName,
        university: admission.university,
        department: admission.department,
        major: admission.major,
        year: admission.year,
        isEarlyAdmission: admission.isEarlyAdmission,
        isPublished: true,
      },
    });
  }
  console.log('✅ Admissions created');

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
