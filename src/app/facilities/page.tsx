import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';

const facilities = [
  { title: '레코딩 스튜디오', image: '/images/facilities/facility01.jpg' },
  { title: '보컬 연습실', image: '/images/facilities/facility02.jpg' },
  { title: '피아노실', image: '/images/facilities/facility03.jpg' },
  { title: '기타 연습실', image: '/images/facilities/facility04.jpg' },
  { title: '드럼 연습실', image: '/images/facilities/facility05.jpg' },
  { title: '합주실', image: '/images/facilities/facility06.jpg' },
  { title: '미디 작업실', image: '/images/facilities/facility07.jpg' },
  { title: '댄스 연습실', image: '/images/facilities/facility08.jpg' },
  { title: '상담실', image: '/images/facilities/facility09.jpg' },
  { title: '휴게공간', image: '/images/facilities/facility10.jpg' },
  { title: '로비', image: '/images/facilities/facility11.jpg' },
  { title: '복도', image: '/images/facilities/facility12.jpg' },
  { title: '시설 13', image: '/images/facilities/facility13.jpg' },
  { title: '시설 14', image: '/images/facilities/facility14.jpg' },
  { title: '시설 15', image: '/images/facilities/facility15.jpg' },
  { title: '시설 16', image: '/images/facilities/facility16.jpg' },
];

export default function FacilitiesPage() {
  return (
    <SubPageLayout
      title="시설 사진"
      subtitle="최신 장비와 쾌적한 환경에서 음악에 집중하세요"
      bgImage="/images/facilities/facility01.jpg"
    >
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {facilities.map((item, index) => (
              <div
                key={index}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <p style={{ fontSize: '18px', fontWeight: 600, color: '#000' }}>
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
