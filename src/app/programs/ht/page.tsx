import SubPageLayout from '@/components/SubPageLayout';
import Link from 'next/link';

const schedule = [
  { time: '11:00~11:30', activity: '운동, 연습계획표 작성' },
  { time: '11:30~13:00', activity: '기본기 및 테크닉 연습' },
  { time: '13:00~14:00', activity: '점심식사' },
  { time: '14:00~17:00', activity: '개인과제 및 본연습' },
  { time: '17:00~18:00', activity: '과제발표 및 잼, 모의고사' },
  { time: '18:00~22:00', activity: '자율연습' },
];

const targetGroups = [
  {
    title: '중/고등학생',
    period: '방학 중 (썸머, 윈터)',
    desc: '방학 기간을 활용한 집중 트레이닝',
  },
  {
    title: '재수생',
    period: '상시 진행',
    desc: '입시 준비를 위한 상시 트레이닝',
  },
];

export default function HTPage() {
  return (
    <SubPageLayout
      title="HT 프로그램"
      subtitle="원장님 직강 - 집중 트레이닝 프로그램"
      bgImage="/images/programs/ht/photo01.jpg"
    >
      {/* Intro */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 20px',
              backgroundColor: '#ffc50a',
              color: '#000',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 700,
              marginBottom: '24px',
            }}>
              원장님 직강 프로그램
            </div>
            <p style={{ fontSize: '18px', color: '#333', lineHeight: 1.9 }}>
              HT(Hardcore Training) 프로그램은<br />
              <strong style={{ color: '#ffc50a' }}>원장님이 직접 지도</strong>하는<br />
              하루 종일 진행되는 집중 트레이닝 프로그램입니다.
            </p>
          </div>
        </div>
      </section>

      {/* Target Groups */}
      <section style={{ padding: '80px 0', backgroundColor: '#f8f8f8' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            대상 및 일정
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            {targetGroups.map((group, i) => (
              <div
                key={i}
                style={{
                  padding: '40px 32px',
                  backgroundColor: '#fff',
                  borderRadius: '16px',
                  textAlign: 'center',
                  border: '2px solid #ffc50a',
                }}
              >
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: '#000', marginBottom: '12px' }}>
                  {group.title}
                </h3>
                <p style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  backgroundColor: '#ffc50a',
                  color: '#000',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '16px',
                }}>
                  {group.period}
                </p>
                <p style={{ fontSize: '15px', color: '#666' }}>
                  {group.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Schedule */}
      <section style={{ padding: '80px 0', backgroundColor: '#000' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: '48px' }}>
            일일 시간표
          </h2>
          <div style={{
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#111',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
            {schedule.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '140px 1fr',
                  alignItems: 'center',
                  padding: '20px 24px',
                  borderBottom: i < schedule.length - 1 ? '1px solid #222' : 'none',
                }}
              >
                <span style={{
                  fontSize: '15px',
                  fontWeight: 600,
                  color: '#ffc50a',
                }}>
                  {item.time}
                </span>
                <span style={{
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.8)',
                }}>
                  {item.activity}
                </span>
              </div>
            ))}
          </div>
          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.5)',
            marginTop: '24px',
          }}>
            * 일정은 상황에 따라 조정될 수 있습니다
          </p>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <h2 style={{ fontSize: '28px', fontWeight: 700, textAlign: 'center', marginBottom: '48px' }}>
            프로그램 특징
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
          }}>
            {[
              { title: '원장 직강', desc: '원장님이 직접 지도하는 밀착 관리 시스템' },
              { title: '체계적 커리큘럼', desc: '기본기부터 실전까지 단계별 훈련' },
              { title: '실전 모의고사', desc: '매일 진행되는 과제발표와 모의고사' },
              { title: '자율연습 시간', desc: '저녁 시간 자율연습으로 복습 및 보완' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '32px',
                  backgroundColor: '#f8f8f8',
                  borderRadius: '16px',
                  borderLeft: '4px solid #ffc50a',
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: '#000' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#666', lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 0', backgroundColor: '#ffc50a' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: 'rgba(0,0,0,0.8)', marginBottom: '24px' }}>
            HT 프로그램 참여를 원하시면 상담을 신청해주세요
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
            HT 프로그램 신청
          </Link>
        </div>
      </section>
    </SubPageLayout>
  );
}
