'use client';

import { useState, useEffect } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';

// 페이지 목록 (SubPageLayout을 사용하는 모든 페이지)
const PAGE_LIST = [
  { path: '/about', name: '학원소개' },
  { path: '/instructors', name: '강사진' },
  { path: '/admissions', name: '연도별 합격자' },
  { path: '/notice', name: '공지사항' },
  { path: '/curriculum', name: '커리큘럼' },
  { path: '/courses', name: '과정안내' },
  { path: '/admission-guide', name: '입시요강' },
  { path: '/scholarship', name: '장학제도' },
  { path: '/musicians', name: '배출 뮤지션' },
  { path: '/gallery', name: '갤러리' },
  { path: '/gallery/facilities', name: '갤러리 - 시설' },
  { path: '/gallery/performances', name: '갤러리 - 공연' },
  { path: '/facilities', name: '시설안내' },
  { path: '/contact', name: '오시는길' },
  { path: '/videos', name: '영상' },
  { path: '/performances', name: '공연' },
  { path: '/success-videos', name: '합격영상' },
  { path: '/programs', name: '프로그램' },
  { path: '/programs/audition', name: '프로그램 - 오디션' },
  { path: '/programs/open-stage', name: '프로그램 - 오픈스테이지' },
  { path: '/programs/cake-concert', name: '프로그램 - 케이크콘서트' },
  { path: '/programs/ht', name: '프로그램 - HT' },
  { path: '/programs/album', name: '프로그램 - 앨범' },
];

interface BackgroundItem {
  pagePath: string;
  imageUrl: string;
  key: string;
}

export default function PageBackgroundsPage() {
  const [backgrounds, setBackgrounds] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [savingPath, setSavingPath] = useState<string | null>(null);

  useEffect(() => {
    fetchBackgrounds();
  }, []);

  const fetchBackgrounds = async () => {
    try {
      const res = await fetch('/api/admin/page-backgrounds');
      if (res.ok) {
        const data: BackgroundItem[] = await res.json();
        const bgMap: Record<string, string> = {};
        data.forEach((item) => {
          bgMap[item.pagePath] = item.imageUrl;
        });
        setBackgrounds(bgMap);
      }
    } catch (error) {
      console.error('Failed to fetch backgrounds:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = async (pagePath: string, imageUrl: string) => {
    setSavingPath(pagePath);

    try {
      const res = await fetch('/api/admin/page-backgrounds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pagePath, imageUrl }),
      });

      if (res.ok) {
        setBackgrounds((prev) => {
          const newBg = { ...prev };
          if (imageUrl) {
            newBg[pagePath] = imageUrl;
          } else {
            delete newBg[pagePath];
          }
          return newBg;
        });
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to save background:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setSavingPath(null);
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#999' }}>
        로딩중...
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '8px' }}>
          페이지 배경 이미지 관리
        </h1>
        <p style={{ fontSize: '14px', color: '#666' }}>
          각 페이지의 상단 히어로 영역에 표시될 배경 이미지를 설정합니다. 이미지가 없으면 검정 배경이 표시됩니다.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '24px',
        }}
      >
        {PAGE_LIST.map((page) => (
          <div
            key={page.path}
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>
                {page.name}
              </h3>
              <p style={{ fontSize: '12px', color: '#999' }}>{page.path}</p>
            </div>

            <div style={{ position: 'relative' }}>
              {savingPath === page.path && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                    borderRadius: '8px',
                  }}
                >
                  <span style={{ fontSize: '13px', color: '#666' }}>저장 중...</span>
                </div>
              )}
              <ImageUpload
                value={backgrounds[page.path] || ''}
                onChange={(url) => handleImageChange(page.path, url)}
                folder="page-backgrounds"
                aspectRatio="16/9"
                placeholder="배경 이미지 업로드"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
