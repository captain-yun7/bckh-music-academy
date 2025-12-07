import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 전공별 강사 데이터
const instructorsData: Record<string, {
  title: string;
  subtitle: string;
  instructors: { name: string; image: string; bio?: string }[];
}> = {
  'vocal': {
    title: '보컬',
    subtitle: '대중음악 보컬 전문 교육',
    instructors: [
      { name: '하수지', image: '/images/lecturers/vocal_하수지.jpeg' },
      { name: '김수현', image: '/images/lecturers/vocal_김수현.jpeg' },
      { name: '김한울', image: '/images/lecturers/vocal_김한울.jpg' },
      { name: '이은지', image: '/images/lecturers/vocal_이은지.jpg' },
      { name: '전용일', image: '/images/lecturers/vocal_전용일.jpg' },
      { name: '홍연하', image: '/images/lecturers/vocal_홍연하.png' },
      { name: '홍효진', image: '/images/lecturers/vocal_홍효진.png' },
    ],
  },
  'composing': {
    title: '작곡/화성학',
    subtitle: '작곡 및 화성학 이론 전문 교육',
    instructors: [
      { name: '강혜민', image: '/images/lecturers/composing_강혜민.jpg' },
      { name: '이재혁', image: '/images/lecturers/composing_이재혁.jpg' },
      { name: '이은비', image: '/images/lecturers/composing_이은비.jpg' },
      { name: '황진하', image: '/images/lecturers/composing_황진하.jpg' },
    ],
  },
  'midi': {
    title: '미디/전자음악',
    subtitle: 'MIDI 및 전자음악 프로덕션 교육',
    instructors: [
      { name: '이재혁', image: '/images/lecturers/midi_이재혁.jpg' },
      { name: '조윤상', image: '/images/lecturers/midi_조윤상.jpg' },
    ],
  },
  'singer-songwriter': {
    title: '싱어송라이터',
    subtitle: '보컬과 작곡을 겸비한 아티스트 양성',
    instructors: [
      { name: '하수지', image: '/images/lecturers/vocal_하수지.jpeg' },
      { name: '강혜민', image: '/images/lecturers/composing_강혜민.jpg' },
    ],
  },
  'guitar': {
    title: '기타',
    subtitle: '일렉기타, 어쿠스틱기타 전문 교육',
    instructors: [
      { name: '노아(Noah)', image: '/images/lecturers/guitar_노아.jpg' },
      { name: '김영롱', image: '/images/lecturers/guitar_김영롱.jpg' },
      { name: '남윤찬', image: '/images/lecturers/guitar_남윤찬.jpg' },
      { name: '공석배', image: '/images/lecturers/guitar_공석배.jpg' },
      { name: '구자훈', image: '/images/lecturers/guitar_구자훈.png' },
    ],
  },
  'bass': {
    title: '베이스',
    subtitle: '일렉베이스 전문 교육',
    instructors: [
      { name: '현재천', image: '/images/lecturers/bass_현재천.jpg' },
      { name: '신희주', image: '/images/lecturers/bass_신희주.png' },
    ],
  },
  'drums': {
    title: '드럼',
    subtitle: '드럼 전문 교육',
    instructors: [
      { name: '유종광', image: '/images/lecturers/drums_유종광.jpeg' },
    ],
  },
  'jazz-piano': {
    title: '재즈피아노',
    subtitle: '재즈피아노 및 건반 전문 교육',
    instructors: [
      { name: '이민경', image: '/images/lecturers/piano_이민경.jpg' },
      { name: '이소정', image: '/images/lecturers/piano_이소정.jpg' },
      { name: '김하영', image: '/images/lecturers/piano_김하영.png' },
      { name: '황진하', image: '/images/lecturers/piano_황진하.jpg' },
      { name: '구자경', image: '/images/lecturers/piano_구자경.png' },
      { name: '박한빈', image: '/images/lecturers/piano_박한빈.jpeg' },
    ],
  },
  'dance': {
    title: '댄스',
    subtitle: '무대 퍼포먼스 및 댄스 교육',
    instructors: [
      { name: '양지은', image: '/images/lecturers/dance_양지은.jpeg' },
    ],
  },
};

const subjectOrder = ['vocal', 'composing', 'midi', 'singer-songwriter', 'guitar', 'bass', 'drums', 'jazz-piano', 'dance'];

interface PageProps {
  params: Promise<{ subject: string }>;
}

export default async function InstructorSubjectPage({ params }: PageProps) {
  const { subject } = await params;
  const data = instructorsData[subject];

  if (!data) {
    notFound();
  }

  const currentIndex = subjectOrder.indexOf(subject);
  const prevSubject = currentIndex > 0 ? subjectOrder[currentIndex - 1] : null;
  const nextSubject = currentIndex < subjectOrder.length - 1 ? subjectOrder[currentIndex + 1] : null;

  return (
    <SubPageLayout
      title={data.title}
      subtitle={data.subtitle}
      bgImage="https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=1920&q=80"
    >
      {/* Breadcrumb */}
      <section style={{ padding: '24px 0', backgroundColor: '#f8f8f8', borderBottom: '1px solid #eee' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#666' }}>
            <Link href="/instructors" style={{ color: '#3b82f6', textDecoration: 'none' }}>
              강사진
            </Link>
            <span>/</span>
            <span style={{ color: '#000', fontWeight: 500 }}>{data.title}</span>
          </div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '32px',
          }}>
            {data.instructors.map((instructor, index) => (
              <div
                key={index}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#f8f8f8',
                  textAlign: 'center',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '1/1' }}>
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '24px' }}>
                  <p style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#000',
                    marginBottom: '8px',
                  }}>
                    {instructor.name}
                  </p>
                  <p style={{
                    fontSize: '14px',
                    color: '#3b82f6',
                    fontWeight: 500,
                  }}>
                    {data.title} 전공
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section style={{ padding: '40px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {prevSubject ? (
              <Link
                href={`/instructors/${prevSubject}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                {instructorsData[prevSubject].title}
              </Link>
            ) : (
              <div />
            )}

            <Link
              href="/instructors"
              style={{
                padding: '12px 24px',
                backgroundColor: '#000',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              전체 강사진 보기
            </Link>

            {nextSubject ? (
              <Link
                href={`/instructors/${nextSubject}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#333',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: 500,
                }}
              >
                {instructorsData[nextSubject].title}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}

export function generateStaticParams() {
  return subjectOrder.map((subject) => ({ subject }));
}
