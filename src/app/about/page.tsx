import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';

const specialSystems = [
  {
    title: '최강 3인 멘토링',
    desc: '담당 강사 · 부강사 · 스텝강사가 함께 지도하여 체계적인 교육을 제공합니다.',
    image: '/images/about/intro_c.jpg',
  },
  {
    title: '16개 스텝수업',
    desc: '전공별 그룹 수업으로 체계적인 학습을 진행합니다.',
    image: '/images/about/intro_d.jpg',
  },
  {
    title: '레코딩 시스템',
    desc: '전문 녹음실에서 포트폴리오를 제작합니다.',
    image: '/images/about/intro_e.jpg',
  },
  {
    title: '케이크 콘서트',
    desc: '정기 공연을 통한 무대 경험을 축적합니다.',
    image: '/images/about/intro_f.jpg',
  },
];

export default function AboutPage() {
  return (
    <SubPageLayout
      title="학원 소개"
      subtitle="1999년 설립, 25년 전통의 경희실용음악학원"
      bgImage="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1920&q=80"
    >
      {/* Intro Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <p style={{ color: '#999', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                ABOUT ACADEMY
              </p>
              <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#000', marginBottom: '24px', lineHeight: 1.4 }}>
                체계적인 커리큘럼과<br />
                최강 멘토링 시스템
              </h2>
              <p style={{ fontSize: '17px', color: '#555', lineHeight: 1.9, marginBottom: '32px' }}>
                경희실용음악학원은 1999년 설립 이래 25년간 수많은 음대 합격생과 프로 뮤지션을 배출해왔습니다.
                체계적인 커리큘럼과 최강 3인 멘토링 시스템으로 학생 개개인의 잠재력을 최대한 이끌어냅니다.
              </p>
              <div style={{ display: 'flex', gap: '40px' }}>
                <div>
                  <p style={{ fontSize: '48px', fontWeight: 700, color: '#000' }}>25+</p>
                  <p style={{ fontSize: '14px', color: '#888' }}>Years</p>
                </div>
                <div>
                  <p style={{ fontSize: '48px', fontWeight: 700, color: '#000' }}>1000+</p>
                  <p style={{ fontSize: '14px', color: '#888' }}>합격생</p>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden' }}>
              <Image
                src="/images/about/intro_b.jpg"
                alt="경희실용음악학원"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Special System */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <p style={{ color: '#999', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
            SPECIAL SYSTEM
          </p>
          <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#000', marginBottom: '48px' }}>
            경희만의 특별 시스템
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {specialSystems.map((system, index) => (
              <div
                key={index}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                  <Image
                    src={system.image}
                    alt={system.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div style={{ padding: '24px' }}>
                  <p style={{ fontSize: '20px', fontWeight: 700, color: '#000', marginBottom: '12px' }}>
                    {system.title}
                  </p>
                  <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                    {system.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '12px' }}>주소</p>
              <p style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}>
                경기도 부천시 원미구 중동 1141-2
              </p>
            </div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '12px' }}>전화</p>
              <p style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}>
                032-321-8668
              </p>
            </div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '12px' }}>운영시간</p>
              <p style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}>
                평일 13:00 - 22:00<br />
                토요일 10:00 - 18:00
              </p>
            </div>
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
