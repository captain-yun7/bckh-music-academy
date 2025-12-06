import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';
import Link from 'next/link';

const programs = [
  {
    id: 'ht',
    name: 'HT 프로그램',
    subtitle: 'Harmony Training',
    description: '그룹 합주를 통한 실전 앙상블 훈련',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
  },
  {
    id: 'cake-concert',
    name: '케이크콘서트',
    subtitle: 'Cake Concert',
    description: '정기적으로 열리는 수강생 발표회',
    image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800',
  },
  {
    id: 'album',
    name: '수강생음반',
    subtitle: 'Student Album',
    description: '전문 스튜디오에서 나만의 음반 제작',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
  },
  {
    id: 'audition',
    name: '정기오디션',
    subtitle: 'Regular Audition',
    description: '기획사 관계자 초청 오디션 진행',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800',
  },
];

export default function ProgramsPage() {
  return (
    <SubPageLayout
      title="특별프로그램"
      subtitle="차별화된 경희만의 프로그램"
      bgImage="/images/about/intro_f.jpg"
    >
      {/* Intro */}
      <section style={{ padding: '60px 0', backgroundColor: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.8 }}>
            레슨만으로는 채울 수 없는 실전 경험과 무대 기회를<br />
            경희만의 특별 프로그램으로 제공합니다.
          </p>
        </div>
      </section>

      {/* Programs */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
          }}>
            {programs.map((program) => (
              <Link
                key={program.id}
                href={`/programs/${program.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#f8f8f8',
                  transition: 'transform 0.3s ease',
                }}>
                  <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                    <Image
                      src={program.image}
                      alt={program.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '20px',
                    }}>
                      <p style={{
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.8)',
                        letterSpacing: '0.1em',
                        marginBottom: '4px',
                      }}>
                        {program.subtitle}
                      </p>
                      <p style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        color: '#fff',
                      }}>
                        {program.name}
                      </p>
                    </div>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <p style={{
                      fontSize: '15px',
                      color: '#666',
                      marginBottom: '16px',
                      lineHeight: 1.6,
                    }}>
                      {program.description}
                    </p>
                    <span style={{
                      fontSize: '14px',
                      color: '#3b82f6',
                      fontWeight: 600,
                    }}>
                      자세히 보기 →
                    </span>
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
