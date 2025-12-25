import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';

const courses = [
  {
    title: '입시반',
    desc: '4년제/2년제 대학 및 예술고 입시 준비',
    features: ['1:1 맞춤 레슨', '실기+이론 병행', '모의 오디션', '포트폴리오 제작'],
    image: '/images/curriculum/entrance.jpg',
  },
  {
    title: '오디션반',
    desc: '엔터테인먼트 오디션 준비 전문 과정',
    features: ['오디션 곡 선정', '무대 매너 훈련', '카메라 테스트', '피드백 코칭'],
    image: '/images/curriculum/info1.jpg',
  },
  {
    title: '전문반',
    desc: '프로 뮤지션을 위한 심화 과정',
    features: ['고급 테크닉', '음원 제작', '공연 기획', '저작권 교육'],
    image: '/images/curriculum/info3.jpg',
  },
  {
    title: '취미반',
    desc: '음악을 즐기고 싶은 모든 분들을 위한 과정',
    features: ['기초부터 시작', '원하는 곡 연습', '부담 없는 레슨', '발표회 참여'],
    image: '/images/curriculum/program.jpg',
  },
];

const subjects = [
  { name: 'VOCAL', desc: '보컬 트레이닝' },
  { name: 'PIANO', desc: '재즈/반주/클래식' },
  { name: 'GUITAR', desc: '일렉/어쿠스틱/클래식' },
  { name: 'BASS', desc: '일렉베이스/콘트라베이스' },
  { name: 'DRUMS', desc: '드럼/퍼커션/카혼' },
  { name: 'COMPOSING', desc: '화성학/편곡/작곡' },
  { name: 'MIDI/EMP', desc: 'DAW/프로듀싱/믹싱' },
  { name: 'DANCE', desc: 'K-POP/현대무용/안무' },
];

export default function CoursesPage() {
  return (
    <SubPageLayout
      title="교육과정"
      subtitle="체계적인 커리큘럼으로 음악의 꿈을 실현하세요"
      bgImage="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1920&q=80"
    >
      {/* Courses */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <p style={{ color: '#999', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
            CURRICULUM
          </p>
          <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#000', marginBottom: '48px' }}>
            과정별 안내
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {courses.map((course, index) => (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '40px',
                  padding: '40px',
                  backgroundColor: '#f8f8f8',
                  borderRadius: '16px',
                  alignItems: 'center',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/10', borderRadius: '12px', overflow: 'hidden' }}>
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#000', marginBottom: '12px' }}>
                    {course.title}
                  </h3>
                  <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>
                    {course.desc}
                  </p>
                  <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {course.features.map((feature, i) => (
                      <li key={i} style={{ fontSize: '14px', color: '#555', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '6px', height: '6px', backgroundColor: '#000', borderRadius: '50%' }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container">
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
            SUBJECTS
          </p>
          <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#fff', marginBottom: '48px' }}>
            전공 분야
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {subjects.map((subject, index) => (
              <div
                key={index}
                style={{
                  padding: '32px 24px',
                  backgroundColor: '#111',
                  borderRadius: '12px',
                  borderLeft: '4px solid #3b82f6',
                }}
              >
                <p style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                  {subject.name}
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>
                  {subject.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </SubPageLayout>
  );
}
