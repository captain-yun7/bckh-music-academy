'use client';

import { useEffect } from 'react';
import Image from 'next/image';

interface Subject {
  id: string;
  name?: string;
  slug?: string;
  nameKo: string;
  nameEn?: string;
  order?: number;
}

interface InstructorSubject {
  id: string;
  subjectId: string;
  subject: Subject;
}

export interface InstructorData {
  id: string;
  name: string;
  subjects: InstructorSubject[];
  image: string | null;
  intro: string | null;
  profile: string | null;
  curriculum: string | null;
  musicGenres: string | null;
  recommendedAlbums: string | null;
  messageToStudents: string | null;
  videoUrl1: string | null;
  videoUrl2: string | null;
  // Optional fields from API
  isActive?: boolean;
  order?: number;
}

// YouTube URL에서 비디오 ID 추출
function getYouTubeVideoId(url: string): string | null {
  const vParam = url.match(/[?&]v=([^&\n?#]+)/);
  if (vParam) return vParam[1];

  const shortUrl = url.match(/youtu\.be\/([^&\n?#]+)/);
  if (shortUrl) return shortUrl[1];

  const embedUrl = url.match(/embed\/([^&\n?#]+)/);
  if (embedUrl) return embedUrl[1];

  return null;
}

interface InstructorModalProps {
  instructor: InstructorData | null;
  onClose: () => void;
}

export default function InstructorModal({ instructor, onClose }: InstructorModalProps) {
  useEffect(() => {
    if (instructor) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [instructor]);

  if (!instructor) return null;

  const hasVideo1 = instructor.videoUrl1 && getYouTubeVideoId(instructor.videoUrl1);
  const hasVideo2 = instructor.videoUrl2 && getYouTubeVideoId(instructor.videoUrl2);
  const hasAnyVideo = hasVideo1 || hasVideo2;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '40px 20px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#fff',
          borderRadius: '20px',
          maxWidth: '700px',
          width: '100%',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.1)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.2)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.1)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Header with image */}
        <div style={{
          padding: '32px',
          borderBottom: '1px solid #eee',
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          flexShrink: 0,
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            overflow: 'hidden',
            flexShrink: 0,
            border: '3px solid #ffc50a',
            backgroundColor: '#f5f5f5',
          }}>
            {instructor.image ? (
              <Image
                src={instructor.image}
                alt={instructor.name}
                width={100}
                height={100}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
              }}>
                👤
              </div>
            )}
          </div>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
              {instructor.subjects.map((s) => (
                <span
                  key={s.id}
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#ffc50a',
                    color: '#000',
                    padding: '4px 12px',
                    borderRadius: '100px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  {s.subject.nameKo}
                </span>
              ))}
            </div>
            <h3 style={{ fontSize: '28px', fontWeight: 700, color: '#000', marginBottom: '4px' }}>
              {instructor.name}
            </h3>
          </div>
        </div>

        {/* Content - 스크롤 가능 영역 */}
        <div style={{ padding: '32px', flex: 1, overflowY: 'auto' }}>
          {/* 자기소개 */}
          <div style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #eee' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffc50a',
              marginBottom: '12px',
              backgroundColor: '#fffbeb',
              padding: '8px 12px',
              borderRadius: '6px',
              display: 'inline-block',
            }}>
              · 자기소개
            </h4>
            <p style={{ fontSize: '15px', color: instructor.intro ? '#333' : '#999', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
              {instructor.intro || '등록된 자기소개가 없습니다.'}
            </p>
          </div>

          {/* 프로필 */}
          <div style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #eee' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffc50a',
              marginBottom: '12px',
              backgroundColor: '#fffbeb',
              padding: '8px 12px',
              borderRadius: '6px',
              display: 'inline-block',
            }}>
              · 프로필
            </h4>
            {instructor.profile ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {instructor.profile.split('\n').filter(line => line.trim()).map((line, index) => (
                  <li key={index} style={{
                    fontSize: '14px',
                    color: '#555',
                    lineHeight: 2,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                  }}>
                    <span style={{ color: '#ffc50a', marginTop: '2px' }}>•</span>
                    {line.replace(/^[-•]\s*/, '')}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ fontSize: '15px', color: '#999', lineHeight: 1.8 }}>등록된 프로필이 없습니다.</p>
            )}
          </div>

          {/* 커리큘럼 */}
          <div style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #eee' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffc50a',
              marginBottom: '12px',
              backgroundColor: '#fffbeb',
              padding: '8px 12px',
              borderRadius: '6px',
              display: 'inline-block',
            }}>
              · 커리큘럼
            </h4>
            {instructor.curriculum ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {instructor.curriculum.split('\n').filter(line => line.trim()).map((line, index) => (
                  <li key={index} style={{
                    fontSize: '14px',
                    color: '#555',
                    lineHeight: 2,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                  }}>
                    <span style={{ color: '#ffc50a', marginTop: '2px' }}>•</span>
                    {line.replace(/^[-•]\s*/, '')}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ fontSize: '15px', color: '#999', lineHeight: 1.8 }}>등록된 커리큘럼이 없습니다.</p>
            )}
          </div>

          {/* 추구하는 음악장르 */}
          <div style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #eee' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffc50a',
              marginBottom: '12px',
              backgroundColor: '#fffbeb',
              padding: '8px 12px',
              borderRadius: '6px',
              display: 'inline-block',
            }}>
              · 추구하는 음악장르
            </h4>
            <p style={{ fontSize: '15px', color: instructor.musicGenres ? '#333' : '#999', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
              {instructor.musicGenres || '등록된 음악장르가 없습니다.'}
            </p>
          </div>

          {/* 추천음반리스트 */}
          <div style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid #eee' }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffc50a',
              marginBottom: '12px',
              backgroundColor: '#fffbeb',
              padding: '8px 12px',
              borderRadius: '6px',
              display: 'inline-block',
            }}>
              · 추천음반리스트
            </h4>
            {instructor.recommendedAlbums ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {instructor.recommendedAlbums.split('\n').filter(line => line.trim()).map((line, index) => (
                  <li key={index} style={{
                    fontSize: '14px',
                    color: '#555',
                    lineHeight: 2,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                  }}>
                    <span style={{ color: '#ffc50a', marginTop: '2px' }}>•</span>
                    {line.replace(/^[-•]\s*/, '')}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ fontSize: '15px', color: '#999', lineHeight: 1.8 }}>등록된 추천음반이 없습니다.</p>
            )}
          </div>

          {/* 레슨생분들께 드리는 말씀 */}
          <div style={{
            padding: '24px',
            backgroundColor: '#111',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: '4px',
              backgroundColor: '#ffc50a',
            }} />
            <p style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffc50a',
              marginBottom: '12px',
            }}>
              · 레슨생분들께 드리는 말씀
            </p>
            <p style={{
              fontSize: '15px',
              color: instructor.messageToStudents ? '#fff' : '#666',
              lineHeight: 1.8,
              whiteSpace: 'pre-wrap',
            }}>
              {instructor.messageToStudents || '등록된 메시지가 없습니다.'}
            </p>
          </div>
        </div>

        {/* 영상 섹션 - 하단 고정 */}
        {hasAnyVideo && (
          <div style={{
            flexShrink: 0,
            padding: '20px 32px',
            backgroundColor: '#111',
            borderTop: '1px solid #333',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '16px',
              flexWrap: 'wrap',
            }}>
              {hasVideo1 && (
                <div style={{
                  width: '280px',
                  height: '158px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(instructor.videoUrl1!)}`}
                    title="영상 1"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
              {hasVideo2 && (
                <div style={{
                  width: '280px',
                  height: '158px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(instructor.videoUrl2!)}`}
                    title="영상 2"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
