import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';
import Image from 'next/image';

const galleries = [
  {
    title: '공연 사진',
    description: '다양한 무대 경험을 통해 실전 감각을 키워갑니다.',
    href: '/gallery/performances',
    image: '/images/performances/performance01.jpg',
  },
  {
    title: '시설 사진',
    description: '최신 장비와 쾌적한 환경에서 음악에만 집중할 수 있습니다.',
    href: '/gallery/facilities',
    image: '/images/facilities/facility01.jpg',
  },
];

export default function GalleryPage() {
  return (
    <SubPageLayout
      title="갤러리"
      subtitle="경희실용음악학원의 공연과 시설을 사진으로 만나보세요"
      bgImage="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1920&q=80"
    >
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
            {galleries.map((gallery, index) => (
              <Link
                key={index}
                href={gallery.href}
                style={{
                  display: 'block',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundColor: '#000',
                  textDecoration: 'none',
                  transition: 'transform 0.3s ease',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                  <Image
                    src={gallery.image}
                    alt={gallery.title}
                    fill
                    style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)',
                  }} />
                  <div style={{
                    position: 'absolute',
                    bottom: '32px',
                    left: '32px',
                    right: '32px',
                  }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                      {gallery.title}
                    </h2>
                    <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                      {gallery.description}
                    </p>
                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ffc50a', fontWeight: 600 }}>
                      자세히 보기
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
