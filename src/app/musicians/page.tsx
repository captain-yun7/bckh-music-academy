import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';

const musicians = [
  {
    name: '문수진',
    role: '싱어송라이터',
    achievement: '음원 발매 및 활발한 활동',
    image: '/images/pride/debut_moon.jpg',
    bio: '경희실용음악학원 출신으로 현재 싱어송라이터로 활동 중',
  },
  {
    name: '포테이토',
    role: '아티스트',
    achievement: '음원 발매',
    image: '/images/pride/debut_potato.jpg',
    bio: '독특한 음악 색깔로 주목받는 아티스트',
  },
  {
    name: '리사',
    role: '아티스트',
    achievement: '활발한 음악 활동',
    image: '/images/pride/risa.jpg',
    bio: '다양한 장르를 소화하는 실력파 뮤지션',
  },
  {
    name: '수강생 A',
    role: '프로 뮤지션',
    achievement: '데뷔 및 활동',
    image: '/images/pride/debut_a.jpg',
    bio: '현재 활발히 활동 중인 프로 뮤지션',
  },
  {
    name: '수강생 B',
    role: '프로 뮤지션',
    achievement: '데뷔 및 활동',
    image: '/images/pride/debut_b.jpg',
    bio: '현재 활발히 활동 중인 프로 뮤지션',
  },
  {
    name: '수강생 C',
    role: '프로 뮤지션',
    achievement: '데뷔 및 활동',
    image: '/images/pride/debut_c.jpg',
    bio: '현재 활발히 활동 중인 프로 뮤지션',
  },
];

export default function MusiciansPage() {
  return (
    <SubPageLayout
      title="배출 뮤지션"
      subtitle="경희실용음악학원을 거쳐 음악계에서 활동 중인 뮤지션들"
    >
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container">
          {/* Musicians Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>
            {musicians.map((musician, index) => (
              <div
                key={index}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#111',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                  <Image
                    src={musician.image}
                    alt={musician.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div style={{ padding: '32px' }}>
                  <p style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                    {musician.name}
                  </p>
                  <p style={{ fontSize: '14px', color: '#3b82f6', fontWeight: 600, marginBottom: '16px' }}>
                    {musician.role}
                  </p>
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
                    {musician.bio}
                  </p>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
                    {musician.achievement}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            marginTop: '100px',
            paddingTop: '60px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '64px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                25+
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
                Years of History
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '64px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                1000+
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
                합격생 배출
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '64px', fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                100+
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', marginTop: '12px' }}>
                프로 뮤지션 배출
              </p>
            </div>
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
