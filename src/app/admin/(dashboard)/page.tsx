import prisma from '@/lib/prisma';
import Link from 'next/link';

async function getStats() {
  const [
    instructorCount,
    noticeCount,
    admissionCount,
    musicianCount,
    galleryCount,
    videoCount,
    admissionGuideCount,
  ] = await Promise.all([
    prisma.instructor.count({ where: { isActive: true } }),
    prisma.notice.count({ where: { isPublished: true } }),
    prisma.admission.count({ where: { isPublished: true } }),
    prisma.musician.count({ where: { isPublished: true } }),
    prisma.galleryImage.count({ where: { isPublished: true } }),
    prisma.video.count({ where: { isPublished: true } }),
    prisma.admissionGuide.count({ where: { isPublished: true } }),
  ]);

  return {
    instructorCount,
    noticeCount,
    admissionCount,
    musicianCount,
    galleryCount,
    videoCount,
    admissionGuideCount,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  const statCards = [
    { label: '강사', value: stats.instructorCount, href: '/admin/instructors', color: '#3b82f6' },
    { label: '공지사항', value: stats.noticeCount, href: '/admin/notices', color: '#22c55e' },
    { label: '합격자', value: stats.admissionCount, href: '/admin/admissions', color: '#f59e0b' },
    { label: '배출 뮤지션', value: stats.musicianCount, href: '/admin/musicians', color: '#8b5cf6' },
    { label: '갤러리', value: stats.galleryCount, href: '/admin/gallery', color: '#06b6d4' },
    { label: '영상', value: stats.videoCount, href: '/admin/videos', color: '#dc2626' },
    { label: '입시요강', value: stats.admissionGuideCount, href: '/admin/admission-guides', color: '#0ea5e9' },
  ];

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
    </div>
  );
}
