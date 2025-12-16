import prisma from '@/lib/prisma';
import Link from 'next/link';

async function getStats() {
  const [
    instructorCount,
    noticeCount,
    admissionCount,
    musicianCount,
    consultationCount,
    pendingConsultations,
    galleryCount,
    videoCount,
    admissionGuideCount,
  ] = await Promise.all([
    prisma.instructor.count({ where: { isActive: true } }),
    prisma.notice.count({ where: { isPublished: true } }),
    prisma.admission.count({ where: { isPublished: true } }),
    prisma.musician.count({ where: { isPublished: true } }),
    prisma.consultation.count(),
    prisma.consultation.count({ where: { status: 'PENDING' } }),
    prisma.galleryImage.count({ where: { isPublished: true } }),
    prisma.video.count({ where: { isPublished: true } }),
    prisma.admissionGuide.count({ where: { isPublished: true } }),
  ]);

  return {
    instructorCount,
    noticeCount,
    admissionCount,
    musicianCount,
    consultationCount,
    pendingConsultations,
    galleryCount,
    videoCount,
    admissionGuideCount,
  };
}

async function getRecentConsultations() {
  return prisma.consultation.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  });
}

export default async function AdminDashboardPage() {
  const stats = await getStats();
  const recentConsultations = await getRecentConsultations();

  const statCards = [
    { label: '강사', value: stats.instructorCount, href: '/admin/instructors', color: '#3b82f6' },
    { label: '공지사항', value: stats.noticeCount, href: '/admin/notices', color: '#22c55e' },
    { label: '합격자', value: stats.admissionCount, href: '/admin/admissions', color: '#f59e0b' },
    { label: '배출 뮤지션', value: stats.musicianCount, href: '/admin/musicians', color: '#8b5cf6' },
    { label: '갤러리', value: stats.galleryCount, href: '/admin/gallery', color: '#06b6d4' },
    { label: '영상', value: stats.videoCount, href: '/admin/videos', color: '#dc2626' },
    { label: '입시요강', value: stats.admissionGuideCount, href: '/admin/admission-guides', color: '#0ea5e9' },
    { label: '상담 신청', value: stats.consultationCount, href: '/admin/consultations', color: '#ec4899' },
    { label: '대기중 상담', value: stats.pendingConsultations, href: '/admin/consultations?status=PENDING', color: '#ef4444' },
  ];

  const statusLabels: Record<string, string> = {
    PENDING: '대기중',
    CONTACTED: '연락완료',
    SCHEDULED: '상담예약',
    COMPLETED: '상담완료',
    CANCELLED: '취소',
  };

  const statusColors: Record<string, string> = {
    PENDING: '#ef4444',
    CONTACTED: '#f59e0b',
    SCHEDULED: '#3b82f6',
    COMPLETED: '#22c55e',
    CANCELLED: '#6b7280',
  };

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px' }}>
        대시보드
      </h1>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
      }}>
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            style={{
              backgroundColor: '#fff',
              padding: '24px',
              borderRadius: '12px',
              textDecoration: 'none',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
              {card.label}
            </p>
            <p style={{ fontSize: '32px', fontWeight: 700, color: card.color }}>
              {card.value}
            </p>
          </Link>
        ))}
      </div>

      {/* Recent Consultations */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600 }}>최근 상담 신청</h2>
          <Link
            href="/admin/consultations"
            style={{ color: '#3b82f6', fontSize: '14px', textDecoration: 'none' }}
          >
            전체보기 →
          </Link>
        </div>

        {recentConsultations.length === 0 ? (
          <p style={{ color: '#999', textAlign: 'center', padding: '40px' }}>
            상담 신청이 없습니다.
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: '13px', fontWeight: 500 }}>이름</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: '13px', fontWeight: 500 }}>연락처</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: '13px', fontWeight: 500 }}>관심분야</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: '13px', fontWeight: 500 }}>상태</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#666', fontSize: '13px', fontWeight: 500 }}>신청일</th>
              </tr>
            </thead>
            <tbody>
              {recentConsultations.map((consultation) => (
                <tr key={consultation.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                  <td style={{ padding: '12px 8px', fontSize: '14px' }}>{consultation.name}</td>
                  <td style={{ padding: '12px 8px', fontSize: '14px' }}>{consultation.phone}</td>
                  <td style={{ padding: '12px 8px', fontSize: '14px' }}>{consultation.subject || '-'}</td>
                  <td style={{ padding: '12px 8px' }}>
                    <span style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 500,
                      backgroundColor: `${statusColors[consultation.status]}20`,
                      color: statusColors[consultation.status],
                    }}>
                      {statusLabels[consultation.status]}
                    </span>
                  </td>
                  <td style={{ padding: '12px 8px', fontSize: '14px', color: '#666' }}>
                    {new Date(consultation.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
