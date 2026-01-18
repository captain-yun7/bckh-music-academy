import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';
import Link from 'next/link';

const courses = [
  {
    id: 'admission',
    name: '입시반',
    subtitle: 'Admission Course',
    description: '실용음악 대학 진학을 목표로 하는 체계적인 입시 준비 과정',
    features: ['1:1 맞춤 레슨', '실기/이론 병행', '모의고사 진행', '입시 컨설팅'],
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
    color: '#f59e0b',
  },
  {
    id: 'audition',
    name: '오디션반',
    subtitle: 'Audition Course',
    description: '기획사 오디션, 방송 오디션 등 프로 데뷔를 위한 집중 과정',
    features: ['오디션 곡 선정', '무대 퍼포먼스', '카메라 테스트', '멘탈 관리'],
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800',
    color: '#f59e0b',
  },
  {
    id: 'professional',
    name: '전문반',
    subtitle: 'Professional Course',
    description: '프로 뮤지션, 세션맨을 목표로 하는 고급 전문 과정',
    features: ['고급 테크닉', '레코딩 실습', '세션 활동', '네트워킹'],
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
    color: '#f59e0b',
  },
  {
    id: 'hobby',
    name: '취미반',
    subtitle: 'Hobby Course',
    description: '음악을 취미로 즐기고 싶은 분들을 위한 편안한 레슨',
    features: ['자유로운 시간', '원하는 곡 레슨', '스트레스 해소', '소규모 발표회'],
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800',
    color: '#f59e0b',
  },
];

export default function CurriculumPage() {
  return (
    <SubPageLayout
      title="커리큘럼"
      subtitle="목표에 맞는 맞춤형 교육 과정"
    >
      {/* Intro */}
      <section style={{ padding: '60px 0', backgroundColor: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.8 }}>
            입시, 오디션, 전문가 양성, 취미까지<br />
            각자의 목표에 맞는 체계적인 커리큘럼을 제공합니다.
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px',
          }}>
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/curriculum/${course.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease',
                }}>
                  <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                    <Image
                      src={course.image}
                      alt={course.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      padding: '8px 16px',
                      backgroundColor: course.color,
                      color: '#fff',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 600,
                    }}>
                      {course.subtitle}
                    </div>
                  </div>
                  <div style={{ padding: '28px' }}>
                    <h3 style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: '#000',
                      marginBottom: '12px',
                    }}>
                      {course.name}
                    </h3>
                    <p style={{
                      fontSize: '15px',
                      color: '#666',
                      lineHeight: 1.7,
                      marginBottom: '20px',
                    }}>
                      {course.description}
                    </p>
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      marginBottom: '20px',
                    }}>
                      {course.features.map((feature, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '6px',
                            fontSize: '13px',
                            color: '#555',
                          }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: course.color,
                      fontSize: '14px',
                      fontWeight: 600,
                    }}>
                      자세히 보기
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </SubPageLayout>
  );
}
