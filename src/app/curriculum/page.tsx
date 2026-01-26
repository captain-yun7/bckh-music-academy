'use client';

import { useState, useEffect } from 'react';
import SubPageLayout from '@/components/SubPageLayout';
import Image from 'next/image';
import Link from 'next/link';

interface Benefit {
  title: string;
  desc: string;
}

interface CurriculumClass {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  intro: string | null;
  bgImage: string | null;
  benefits: (string | Benefit)[];
}

export default function CurriculumPage() {
  const [courses, setCourses] = useState<CurriculumClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/curriculum/classes');
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
        }
      } catch (error) {
        console.error('Failed to fetch curriculum classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <SubPageLayout
      title="커리큘럼"
      subtitle="목표에 맞는 맞춤형 교육 과정"
    >
      {/* Intro */}
      <section style={{ padding: '60px 0', backgroundColor: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.8 }}>
            입시, 오디션, 전문가 양성, 취미까지<br />
            각자의 목표에 맞는 체계적인 커리큘럼을 제공합니다.
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <section style={{ padding: '80px 0', backgroundColor: '#fff' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
              로딩 중...
            </div>
          ) : courses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#999' }}>
              등록된 커리큘럼이 없습니다.
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px',
            }}>
              {courses.map((course) => (
                <Link
                  key={course.id}
                  href={`/curriculum/${course.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <div style={{ position: 'relative', aspectRatio: '16/10', backgroundColor: '#f0f0f0' }}>
                      {course.bgImage ? (
                        <Image
                          src={course.bgImage}
                          alt={course.title}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          gap: '8px',
                          color: '#bbb',
                        }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <polyline points="21 15 16 10 5 21" />
                          </svg>
                          <span style={{ fontSize: '13px' }}>이미지 없음</span>
                        </div>
                      )}
                      {course.subtitle && (
                        <div style={{
                          position: 'absolute',
                          top: '16px',
                          left: '16px',
                          padding: '8px 16px',
                          backgroundColor: '#f59e0b',
                          color: '#fff',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: 600,
                        }}>
                          {course.subtitle}
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#000',
                        marginBottom: '12px',
                      }}>
                        {course.title}
                      </h3>
                      <p style={{
                        fontSize: '15px',
                        color: '#666',
                        lineHeight: 1.7,
                        marginBottom: '20px',
                      }}>
                        {course.intro}
                      </p>
                      {course.benefits && course.benefits.length > 0 && (
                        <div style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '8px',
                          marginBottom: '20px',
                        }}>
                          {course.benefits.map((benefit, i) => (
                            <span
                              key={i}
                              style={{
                                padding: '6px 12px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '6px',
                                fontSize: '13px',
                                color: '#555',
                              }}
                            >
                              {typeof benefit === 'string' ? benefit : benefit.title}
                            </span>
                          ))}
                        </div>
                      )}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        color: '#f59e0b',
                        fontSize: '14px',
                        fontWeight: 600,
                        marginTop: 'auto',
                      }}>
                        자세히 보기
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

    </SubPageLayout>
  );
}
