import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

const scholarships = [
  {
    id: 'entrance',
    name: '입학장학',
    amount: '최대 50%',
    description: '입학 레벨 테스트 결과에 따른 장학금',
    color: '#3b82f6',
    criteria: ['레벨 테스트 성적 우수자', '타 학원 수료자 우대', '형제/자매 동시 등록 시'],
  },
  {
    id: 'merit',
    name: '성적장학',
    amount: '최대 30%',
    description: '재학 중 성적 우수자에게 지급',
    color: '#10b981',
    criteria: ['월별 레슨 성취도 평가', '정기 테스트 우수자', '출석률 100% 달성자'],
  },
];

export default function ScholarshipPage() {
  return (
    <SubPageLayout
      title="장학제도"
      subtitle="꿈을 향한 여정을 응원합니다"
      bgImage="https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=1920&q=80"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              경희실용음악학원은 열정 있는 학생들의 꿈을 응원합니다.<br />
              <strong>입학장학과 성적장학</strong>을 통해<br />
              경제적 부담 없이 음악에 집중할 수 있도록 지원합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Scholarship Cards */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '32px',
          }}>
            {scholarships.map((scholarship) => (
              <Link
                key={scholarship.id}
                href={`/scholarship/${scholarship.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  backgroundColor: '#fff',
                  borderRadius: '20px',
                  padding: '40px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                  transition: 'transform 0.3s ease',
                }}>
                  <div style={{
                    display: 'inline-block',
                    padding: '8px 16px',
                    backgroundColor: scholarship.color,
                    color: '#fff',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: 600,
                    marginBottom: '20px',
                  }}>
                    {scholarship.amount} 감면
                  </div>
                  <h3 style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#000',
                    marginBottom: '12px',
                  }}>
                    {scholarship.name}
                  </h3>
                  <p style={{
                    fontSize: '16px',
                    color: '#666',
                    marginBottom: '24px',
                  }}>
                    {scholarship.description}
                  </p>
                  <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                    <p style={{ fontSize: '13px', color: '#999', marginBottom: '12px' }}>지급 기준</p>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                      {scholarship.criteria.map((item, i) => (
                        <li
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '14px',
                            color: '#444',
                            marginBottom: '8px',
                          }}
                        >
                          <span style={{ color: scholarship.color }}>✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: scholarship.color,
                    fontSize: '14px',
                    fontWeight: 600,
                    marginTop: '24px',
                  }}>
                    자세히 보기
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
            장학금 신청 방법이 궁금하신가요?
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px' }}>
            무료 상담을 통해 장학금 혜택을 확인해보세요
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              padding: '16px 40px',
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            상담 신청하기
          </Link>
        </div>
      </section>
    </SubPageLayout>
  );
}
