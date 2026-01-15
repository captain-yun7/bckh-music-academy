/**
 * Cloudinary 이미지 URL 최적화 유틸리티
 *
 * 사용자 경험을 위해:
 * 1. 적절한 크기로 리사이즈 (불필요한 다운로드 방지)
 * 2. 자동 포맷 변환 (WebP 지원 브라우저는 WebP로)
 * 3. 품질 자동 조절 (네트워크 상태에 맞춤)
 */

interface OptimizeOptions {
  width?: number;
  height?: number;
  quality?: 'auto' | 'auto:low' | 'auto:eco' | 'auto:good' | 'auto:best' | number;
  crop?: 'fill' | 'fit' | 'scale' | 'thumb' | 'face';
  gravity?: 'auto' | 'face' | 'center';
  blur?: number; // placeholder용 blur
}

/**
 * Cloudinary URL에 최적화 파라미터 추가
 */
export function optimizeCloudinaryUrl(url: string, options: OptimizeOptions = {}): string {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  const {
    width,
    height,
    quality = 'auto',
    crop = 'fill',
    gravity = 'auto',
    blur,
  } = options;

  // transformation 문자열 구성
  const transforms: string[] = [];

  if (width || height) {
    const dims = [];
    if (width) dims.push(`w_${width}`);
    if (height) dims.push(`h_${height}`);
    dims.push(`c_${crop}`);
    dims.push(`g_${gravity}`);
    transforms.push(dims.join(','));
  }

  transforms.push(`q_${quality}`);
  transforms.push('f_auto'); // 자동 포맷 (WebP/AVIF)

  if (blur) {
    transforms.push(`e_blur:${blur}`);
  }

  const transformation = transforms.join('/');

  // URL 패턴: https://res.cloudinary.com/[cloud]/image/upload/[existing]/[path]
  // 결과: https://res.cloudinary.com/[cloud]/image/upload/[transformation]/[path]
  return url.replace(
    /\/image\/upload\//,
    `/image/upload/${transformation}/`
  );
}

/**
 * 저화질 placeholder URL 생성 (blur 효과)
 */
export function getPlaceholderUrl(url: string): string {
  return optimizeCloudinaryUrl(url, {
    width: 20,
    height: 20,
    quality: 'auto:low',
    blur: 1000,
  });
}

/**
 * 프리셋 최적화 함수들
 */
export const imagePresets = {
  // 강사 카드 썸네일 (메인 페이지)
  instructorCard: (url: string) => optimizeCloudinaryUrl(url, {
    width: 400,
    height: 500,
    quality: 'auto:good',
    crop: 'fill',
    gravity: 'face',
  }),

  // 강사 모달 프로필
  instructorModal: (url: string) => optimizeCloudinaryUrl(url, {
    width: 200,
    height: 200,
    quality: 'auto:good',
    crop: 'fill',
    gravity: 'face',
  }),

  // 강사 상세 페이지
  instructorDetail: (url: string) => optimizeCloudinaryUrl(url, {
    width: 600,
    height: 600,
    quality: 'auto:good',
    crop: 'fill',
    gravity: 'face',
  }),

  // 갤러리 썸네일
  galleryThumb: (url: string) => optimizeCloudinaryUrl(url, {
    width: 400,
    height: 300,
    quality: 'auto:good',
  }),

  // 뮤지션 카드
  musicianCard: (url: string) => optimizeCloudinaryUrl(url, {
    width: 300,
    height: 300,
    quality: 'auto:good',
    crop: 'fill',
    gravity: 'face',
  }),

  // 히어로 슬라이드 (대형)
  heroSlide: (url: string) => optimizeCloudinaryUrl(url, {
    width: 1920,
    height: 1080,
    quality: 'auto:good',
  }),
};
