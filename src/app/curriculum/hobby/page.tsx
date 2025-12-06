import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

const benefits = [
  { icon: '🎵', title: '원하는 곡 레슨', desc: '좋아하는 노래로 배우는 즐거운 레슨' },
  { icon: '⏰', title: '유연한 시간', desc: '직장인, 학생 모두 OK! 맞춤 스케줄' },
  { icon: '😊', title: '부담 없는 분위기', desc: '실력 상관없이 누구나 환영' },
  { icon: '🎤', title: '소규모 발표회', desc: '연습 성과를 발휘할 기회' },
];

export default function HobbyCoursePage() {
  return (
    <SubPageLayout
      title="취미반"
      subtitle="음악을 즐기는 가장 쉬운 방법"
      bgImage="/images/about/intro_c.jpg"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              노래가 좋아서, 악기가 배우고 싶어서<br />
              <strong>음악을 취미로 즐기고 싶은 모든 분</strong>을 위한 과정입니다.<br />
              부담 없이 시작하고, 음악과 함께하는 삶을 경험하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ fontSize: '32px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            취미반 장점
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
          }}>
            {benefits.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '40px 32px',
                  backgroundColor: '#fff',
                  borderRadius: '20px',
                  textAlign: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                }}
              >
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '20px' }}>
                  {item.icon}
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#000', marginBottom: '12px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section style={{ padding: '80px 0', backgroundColor: '#8b5cf6' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '32px' }}>
            수강 가능 과목
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
          }}>
            {['보컬', '기타', '피아노', '드럼', '베이스', '작곡', 'MIDI'].map((subject) => (
              <span
                key={subject}
                style={{
                  padding: '12px 28px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '30px',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 0', backgroundColor: '#fff' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '17px', color: '#666', marginBottom: '24px' }}>
            음악을 시작하기에 늦은 때는 없습니다
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#8b5cf6',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            취미반 상담 신청하기
          </Link>
        </div>
      </section>
    </SubPageLayout>
  );
}
