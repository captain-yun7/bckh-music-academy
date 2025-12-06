import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';

const performances = [
  {
    title: '케이크 콘서트',
    desc: '정기 발표회',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop',
  },
  {
    title: '버스킹 공연',
    desc: '야외 무대 경험',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&h=400&fit=crop',
  },
  {
    title: '졸업 공연',
    desc: '수료 기념 무대',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=600&h=400&fit=crop',
  },
  {
    title: '합동 공연',
    desc: '학원 연합 무대',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&h=400&fit=crop',
  },
  {
    title: '라이브 공연',
    desc: '클럽 라이브 무대',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop',
  },
  {
    title: '특별 공연',
    desc: '초청 이벤트',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop',
  },
];

export default function PerformancesPage() {
  return (
    <SubPageLayout
      title="공연 사진"
      subtitle="다양한 무대 경험을 통해 실전 감각을 키워갑니다"
    >
      <section style={{ padding: '80px 0', backgroundColor: '#111' }}>
        <div className="container">
          {/* Gallery Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            {performances.map((item, index) => (
              <div
                key={index}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#1a1a1a',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div style={{ padding: '24px' }}>
                  <p style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                    {item.title}
                  </p>
                  <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Info */}
          <div style={{ marginTop: '80px', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '24px' }}>
              정기적인 공연 기회를 통해 무대 경험을 쌓고, 실전 감각을 키워갑니다.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: '48px', fontWeight: 700, color: '#fff' }}>12+</p>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>연간 공연 횟수</p>
              </div>
              <div>
                <p style={{ fontSize: '48px', fontWeight: 700, color: '#fff' }}>케이크</p>
                <p style={{ color: 'rgba(255,255,255,0.5)' }}>정기 콘서트</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
