import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

const guides = [
  {
    id: 'university-4yr',
    name: '4년제대학',
    description: '서울대, 한양대, 경희대 등 4년제 실용음악과 입시 정보',
    icon: '🎓',
    color: '#3b82f6',
  },
  {
    id: 'university-2yr',
    name: '2,3년제대학',
    description: '서울예대, 호원대 등 전문대 실용음악과 입시 정보',
    icon: '🏫',
    color: '#10b981',
  },
  {
    id: 'art-highschool',
    name: '예술고등학교',
    description: '서울예고, 안양예고 등 예술고 입시 정보',
    icon: '🎵',
    color: '#f59e0b',
  },
  {
    id: 'graduate',
    name: '대학원/편입',
    description: '대학원 진학 및 편입 전형 정보',
    icon: '📚',
    color: '#8b5cf6',
  },
];

export default function AdmissionGuidePage() {
  return (
    <SubPageLayout
      title="입시요강"
      subtitle="대학별 입시 정보 안내"
      bgImage="/images/about/intro_a.jpg"
    >
      {/* Intro */}
      <section style={{ padding: '60px 0', backgroundColor: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.8 }}>
            4년제 대학, 전문대, 예술고, 대학원까지<br />
            실용음악 입시에 필요한 모든 정보를 안내합니다.
          </p>
        </div>
      </section>

      {/* Guide Cards */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {guides.map((guide) => (
              <Link
                key={guide.id}
                href={`/admission-guide/${guide.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  padding: '40px',
                  backgroundColor: '#f8f8f8',
                  borderRadius: '20px',
                  transition: 'transform 0.3s ease',
                  height: '100%',
                }}>
                  <span style={{ fontSize: '48px', display: 'block', marginBottom: '24px' }}>
                    {guide.icon}
                  </span>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#000',
                    marginBottom: '12px',
                  }}>
                    {guide.name}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: '#666',
                    lineHeight: 1.7,
                    marginBottom: '20px',
                  }}>
                    {guide.description}
                  </p>
                  <span style={{
                    fontSize: '14px',
                    color: guide.color,
                    fontWeight: 600,
                  }}>
                    자세히 보기 →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '16px' }}>
            입시 상담이 필요하신가요?
          </h2>
          <p style={{ fontSize: '17px', color: '#666', marginBottom: '32px' }}>
            25년 입시 노하우로 맞춤 컨설팅을 제공합니다
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            무료 입시 상담
          </Link>
        </div>
      </section>
    </SubPageLayout>
  );
}
