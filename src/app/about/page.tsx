import SubPageLayout from '@/components/SubPageLayout';

const philosophies = [
  { num: '01', title: '솔직한 상담', desc: '솔직한 상담을 하는 학원입니다. 꼭 필요한 수업만 수강하시면 됩니다.' },
  { num: '02', title: '최고의 강사진', desc: '좋은 강사님을 모시기 위해 끊임없이 노력합니다.' },
  { num: '03', title: '원장 책임제', desc: '입시반은 처음부터 끝까지 원장님의 책임하에 관리, 교육됩니다.' },
  { num: '04', title: '기본기 중시', desc: '기본기를 가장 중요시 합니다.' },
  { num: '05', title: '실전 교육', desc: '실전 중심의 교육을 합니다.' },
  { num: '06', title: '트렌드 선도', desc: '트렌드와 흐름을 선도하는 교육을 합니다.' },
  { num: '07', title: '인성 교육', desc: '인성을 중요시 합니다.' },
  { num: '08', title: '신뢰와 약속', desc: '처음 품은 신념과 교육 철학을 잃지 않고 끝까지 함께 하겠습니다.' },
];

const ceoCareer = [
  '전, 백제예술대학교 실용음악과 미디/작편곡과 교수',
  '전, JASS(JAZZ SCHOOL & STUDIES) 작편곡과 강사',
  '전, 서울예술고등학교 작편곡 강사',
  '전, 모던K 실용음악학원, 부천실용음악학원 등 다수 학원 강사',
  '전, 사운드어바웃 엔터테인먼트 프로듀서/사운드개발',
  '전, SHOW M SOUND COMPANY 프로듀서',
  '재즈컴필레이션음반 "EUTERPE" 총괄 작/편곡 담당',
  '영화 SOMEDAY 다수의 OST 담당',
  '일본 오리콘/뮤타라 모바일 음원제작',
  '씨야, 가비엔제이 등 다수의 건반 세션',
  '경기문화재단 주최 시민문화축제 음악감독',
  '경기도지사 선거 메인테마송 작/편곡 음악감독',
];

export default function AboutPage() {
  return (
    <SubPageLayout
      title="학원 소개"
      subtitle="2007년 설립, 18년 전통의 경희실용음악학원"
      bgImage="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1920&q=80"
    >
      {/* Philosophy Section */}
      <section style={{ padding: '100px 0', backgroundColor: '#000' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{ color: '#ffc50a', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
              EDUCATION PHILOSOPHY
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: '#fff', marginBottom: '20px' }}>
              경희실용음악학원 교육철학 8가지
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {philosophies.map((item) => (
              <div
                key={item.num}
                style={{
                  padding: '32px',
                  backgroundColor: '#111',
                  borderRadius: '12px',
                  borderLeft: '4px solid #ffc50a',
                }}
              >
                <span style={{ fontSize: '32px', fontWeight: 700, color: '#ffc50a', display: 'block', marginBottom: '16px' }}>
                  {item.num}
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Promise Section */}
      <section style={{ padding: '100px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <p style={{ color: '#ffc50a', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                PROMISE
              </p>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, color: '#000' }}>
                약속합니다
              </h2>
            </div>

            <div style={{
              padding: '48px',
              backgroundColor: '#f8f8f8',
              borderRadius: '16px',
              borderLeft: '6px solid #ffc50a',
            }}>
              <p style={{ fontSize: '17px', color: '#333', lineHeight: 2, marginBottom: '24px' }}>
                오랜시간 대학강사, 예고, 아카데미, 수많은 특강과 입시 설명회 등에서
                음악을 꿈꾸는 많은 학생들을 만나고 가르쳤습니다.
              </p>
              <p style={{ fontSize: '17px', color: '#333', lineHeight: 2, marginBottom: '24px' }}>
                학생들의 고민은 무엇이며 또 부모님들의 고민은 무엇일지
                오랜시간 동안 현장에서 같이 고민했습니다.
              </p>
              <p style={{ fontSize: '17px', color: '#333', lineHeight: 2, marginBottom: '24px' }}>
                먼저, 그 길을 걸어온 사람으로 제가 알고 있는 지식과 정보, 노하우를 통해
                조금이라도 도움이 되고 싶었습니다.
              </p>
              <p style={{ fontSize: '17px', color: '#333', lineHeight: 2, marginBottom: '24px' }}>
                학생과 부모님이라면 <strong>믿고 다니고 싶은 학원</strong>.
                거짓없이 맞으면 맞다 아니면 아니다 하는 학원을 만들고 싶었습니다.
              </p>
              <p style={{ fontSize: '17px', color: '#333', lineHeight: 2, marginBottom: '32px' }}>
                짧지 않은 시간동안 많은 분들께서 저희의 뜻과 진심을 믿어주셔 여기까지 올 수 있었습니다.
                <strong> 믿음과 신뢰를 알기에 절대 처음 품은 신념과 교육 철학을 잃지 않고 끝까지 함께 하겠습니다.</strong>
              </p>
              <p style={{ fontSize: '16px', color: '#666', textAlign: 'right' }}>
                2007년 2월<br />
                <strong style={{ color: '#000', fontSize: '18px' }}>경희실용음악학원장 조중욱</strong> 올림
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CEO Profile Section */}
      <section style={{ padding: '100px 0', backgroundColor: '#111' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'start' }}>
            <div>
              <p style={{ color: '#ffc50a', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px' }}>
                CEO PROFILE
              </p>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 700, color: '#fff', marginBottom: '32px' }}>
                원장 프로필
              </h2>

              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
                  조중욱
                </h3>
                <p style={{ fontSize: '16px', color: '#ffc50a', fontWeight: 600 }}>
                  경희실용음악학원장 (Since 2007)
                </p>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
                  현, 티엠포뮤직 대표
                </p>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#ffc50a', marginBottom: '16px' }}>학력</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  <li style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px', paddingLeft: '16px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#ffc50a' }}>•</span>
                    경희대학교 포스트모던음악과 (실용음악작곡) 졸업
                  </li>
                  <li style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', paddingLeft: '16px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 0, color: '#ffc50a' }}>•</span>
                    JASS(JAZZ SCHOOL & STUDIES) 재즈피아노 전공 졸업
                  </li>
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#ffc50a', marginBottom: '16px' }}>입시생 지도 경력</h4>
                <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
                  서울예대 전용준, 경희대 허재훈(수석), 동아방송예대 이소연(차석) 등<br />
                  <strong style={{ color: '#ffc50a' }}>100여명의 주요대학 합격생 배출</strong>
                </p>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#ffc50a', marginBottom: '24px' }}>경력사항</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {ceoCareer.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.75)',
                      marginBottom: '12px',
                      paddingLeft: '20px',
                      position: 'relative',
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ position: 'absolute', left: 0, color: '#ffc50a' }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            <div>
              <p style={{ color: '#ffc50a', fontSize: '14px', marginBottom: '12px', fontWeight: 600 }}>주소</p>
              <p style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}>
                경기도 부천시 원미구 중동 1141-2
              </p>
            </div>
            <div>
              <p style={{ color: '#ffc50a', fontSize: '14px', marginBottom: '12px', fontWeight: 600 }}>전화</p>
              <p style={{ color: '#fff', fontSize: '18px', fontWeight: 500 }}>
                032-321-8668
              </p>
            </div>
            <div>
              <p style={{ color: '#ffc50a', fontSize: '14px', marginBottom: '12px', fontWeight: 600 }}>운영시간</p>
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
