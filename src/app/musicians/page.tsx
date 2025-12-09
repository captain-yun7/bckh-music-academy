import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';

const musicians = [
  {
    name: '문별',
    generation: '4기',
    role: '마마무 멤버',
    achievement: '마마무 활동중',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop',
    bio: '대한민국 대표 걸그룹 마마무의 멤버로 활동 중인 실력파 보컬리스트',
  },
  {
    name: '나다',
    generation: '3기',
    role: '래퍼 / 방송인',
    achievement: '와썹, 쇼미더머니3, 언프리티랩스타, 골때녀',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    bio: '다양한 방송 프로그램에서 활약하며 대중에게 친숙한 래퍼',
  },
  {
    name: '주대건',
    generation: '1기',
    role: '소리얼 멤버',
    achievement: '소리얼 활동',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop',
    bio: '경희실용음악학원 1기 출신으로 소리얼에서 활동',
  },
  {
    name: '이승아 (LEESA)',
    generation: '1기',
    role: '솔로 아티스트',
    achievement: 'LEESA 활동',
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=300&fit=crop',
    bio: '1기 출신으로 LEESA라는 이름으로 솔로 활동 중',
  },
  {
    name: '김남윤',
    generation: '3기',
    role: '웰던포테이토',
    achievement: '웰던포테이토 활동',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop',
    bio: '독특한 음악 색깔로 주목받는 아티스트',
  },
  {
    name: '신이삭 (신드럼)',
    generation: '5기',
    role: '세션 드러머',
    achievement: '소울딜리버리, 악뮤/에픽하이/잔나비 세션',
    image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=400&h=300&fit=crop',
    bio: '국내 정상급 아티스트들의 세션으로 활약하는 실력파 드러머',
  },
  {
    name: '이종훈',
    generation: '10기',
    role: '슈퍼밴드 출연',
    achievement: '슈퍼밴드, 케빈오와 애프터문',
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop',
    bio: 'JTBC 슈퍼밴드 출연으로 주목받은 뮤지션',
  },
  {
    name: '정지석 & 김홍비',
    generation: '10기',
    role: '지소쿠리클럽',
    achievement: '지소쿠리클럽, 헬로루키 대상',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop',
    bio: '헬로루키 대상 수상으로 실력을 인정받은 듀오',
  },
  {
    name: '김치호',
    generation: '10기',
    role: '밴드 멤버',
    achievement: '조매력, 어노잉박스 밴드',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop',
    bio: '조매력, 어노잉박스 밴드에서 활동 중',
  },
  {
    name: '김태인',
    generation: '10기',
    role: '재즈 뮤지션',
    achievement: '태인재즈맨 활동',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&h=300&fit=crop',
    bio: '재즈 신에서 활발히 활동하는 재즈 뮤지션',
  },
  {
    name: '김민규',
    generation: '12기',
    role: '세션 뮤지션',
    achievement: '서정밴드, 뎁트 세션',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=300&fit=crop',
    bio: '서정밴드와 뎁트의 세션으로 활동 중',
  },
  {
    name: '고석우',
    generation: '13기',
    role: 'KPOP 작곡가',
    achievement: '화사, 로시 등 곡 작업',
    image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=400&h=300&fit=crop',
    bio: '화사, 로시 등 유명 아티스트의 곡을 작업한 작곡가',
  },
  {
    name: '박진오',
    generation: '14기',
    role: '래퍼',
    achievement: '고등랩퍼, 언더나인틴, 쇼미더머니',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=300&fit=crop',
    bio: '고등랩퍼, 쇼미더머니 등 다수 오디션 프로그램 출연',
  },
];

export default function MusiciansPage() {
  return (
    <SubPageLayout
      title="배출 뮤지션"
      subtitle="경희실용음악학원을 거쳐 음악계에서 활동 중인 뮤지션들"
      bgImage="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1920&q=80"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              경희실용음악학원은 2007년 개원 이래<br />
              <strong style={{ color: '#ffc50a' }}>수많은 프로 뮤지션</strong>을 배출해왔습니다.<br />
              현재 국내 음악계에서 활발히 활동하는 졸업생들을 소개합니다.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container">
          {/* Musicians Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {musicians.map((musician, index) => (
              <div
                key={index}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: '#111',
                  transition: 'transform 0.3s ease',
                }}
              >
                <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                  <Image
                    src={musician.image}
                    alt={musician.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    backgroundColor: '#ffc50a',
                    color: '#000',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 700,
                  }}>
                    {musician.generation}
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <p style={{ fontSize: '22px', fontWeight: 700, color: '#fff', marginBottom: '6px' }}>
                    {musician.name}
                  </p>
                  <p style={{ fontSize: '14px', color: '#ffc50a', fontWeight: 600, marginBottom: '12px' }}>
                    {musician.role}
                  </p>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '10px', lineHeight: 1.6 }}>
                    {musician.bio}
                  </p>
                  <p style={{
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.4)',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '12px',
                    marginTop: '12px',
                  }}>
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
            padding: '60px 40px',
            backgroundColor: '#ffc50a',
            borderRadius: '20px',
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(48px, 8vw, 64px)', fontWeight: 700, color: '#000', lineHeight: 1 }}>
                18+
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(0,0,0,0.7)', marginTop: '12px' }}>
                Years of History
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(48px, 8vw, 64px)', fontWeight: 700, color: '#000', lineHeight: 1 }}>
                1000+
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(0,0,0,0.7)', marginTop: '12px' }}>
                합격생 배출
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(48px, 8vw, 64px)', fontWeight: 700, color: '#000', lineHeight: 1 }}>
                100+
              </p>
              <p style={{ fontSize: '16px', color: 'rgba(0,0,0,0.7)', marginTop: '12px' }}>
                프로 뮤지션 배출
              </p>
            </div>
          </div>
        </div>
      </section>
    </SubPageLayout>
  );
}
