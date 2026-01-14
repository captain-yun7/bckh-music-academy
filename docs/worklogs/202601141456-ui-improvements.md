# UI 개선 및 버그 수정

**작업일시**: 2026-01-14 14:56
**작업자**: Claude

## 요약

사용자 피드백에 따른 7가지 이슈 수정 및 개선

---

## 1. 영상 중복/누락 버그 수정

**문제**: 관리자에서 영상 2개 업로드 시 1개만 보이거나 같은 영상이 표시됨

**원인**: `playingVideo` 상태가 `youtubeId`(동영상 ID)로 비교되어 중복 URL 시 충돌

**수정 파일**:
- `src/components/SuccessVideosSection.tsx`
- `src/app/success-videos/page.tsx`

**해결**: `youtubeId` 대신 고유한 `video.id`로 상태 비교
```tsx
// Before
playingVideo === youtubeId

// After
playingVideo === video.id
```

---

## 2. 커리큘럼 모달 스크롤 문제 수정

**문제**: 커리큘럼 모달 내에서 스크롤 시 전체 화면이 스크롤됨

**수정 파일**: `src/app/admin/(dashboard)/curriculum/page.tsx`

**해결**: 모달이 열릴 때 `document.body.style.overflow = 'hidden'` 설정
```tsx
useEffect(() => {
  if (isClassModalOpen || isMajorModalOpen || isCurriculumModalOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  return () => {
    document.body.style.overflow = '';
  };
}, [isClassModalOpen, isMajorModalOpen, isCurriculumModalOpen]);
```

---

## 3. 메인화면 공지사항 섹션 추가

**신규 파일**: `src/components/NoticeSection.tsx`

**기능**:
- 최근 공지사항 5개 표시
- 카테고리별 색상 구분
- 고정 게시물 표시 (📌)
- 전체보기 링크

---

## 4. 로고 클릭 시 새로고침 문제 수정

**문제**: 메인화면에서 로고 클릭 시 새로고침 안됨

**원인**: Next.js Link는 같은 페이지 클릭 시 리렌더링 하지 않음

**수정 파일**: `src/components/Navigation.tsx`

**해결**: 메인 페이지에서 로고 클릭 시 강제 새로고침
```tsx
<Link
  href="/"
  onClick={(e) => {
    if (pathname === '/') {
      e.preventDefault();
      window.location.reload();
    }
  }}
>
```

---

## 5. 수강과정 3x3 레이아웃 변경

**수정 파일**: `src/components/CoursesSection.tsx`

**변경 전**: `repeat(auto-fit, minmax(280px, 1fr))`
**변경 후**: `repeat(3, 1fr)` (반응형 포함)

```css
.subject-grid {
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 1024px) {
  .subject-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .subject-grid { grid-template-columns: 1fr; }
}
```

---

## 6. 특별프로그램 메인 노출

**신규 파일**: `src/components/ProgramsSection.tsx`

**기능**:
- 5개 프로그램 아이콘 기반 카드 표시
- 각 프로그램 설명 및 상세 페이지 링크
- 전체보기 CTA 버튼

**프로그램**:
1. HT 프로그램 (Harmony Training)
2. 케이크콘서트 (Cake Concert)
3. 오픈스테이지 (Open Stage)
4. 수강생음반 (Student Album)
5. 정기오디션 (Regular Audition)

---

## 7. 장학생제도 메인 노출

**신규 파일**: `src/components/ScholarshipSection.tsx`

**기능**:
- 3가지 장학금 종류 한눈에 보기
- 할인율 강조 표시
- 상세 페이지 링크

**장학금**:
1. 입학장학 (10~50%)
2. 성적장학 (5~20%)
3. 상점장학 (최대 50%)

---

## 메인 페이지 섹션 순서 (변경 후)

1. Hero 슬라이드
2. 강사진
3. 합격생 동영상
4. 배출뮤지션
5. **수강과정** (3x3 레이아웃)
6. **특별프로그램** (신규)
7. **장학제도** (신규)
8. 시설사진
9. 공연사진
10. **공지사항** (신규)
11. 합격 실적
12. 오시는길

---

## 수정 파일 목록

| 파일 | 변경 내용 |
|-----|---------|
| `src/components/SuccessVideosSection.tsx` | 영상 상태 비교 수정 |
| `src/app/success-videos/page.tsx` | 영상 상태 비교 수정 |
| `src/app/admin/(dashboard)/curriculum/page.tsx` | 모달 스크롤 방지 |
| `src/components/Navigation.tsx` | 로고 클릭 새로고침 |
| `src/components/CoursesSection.tsx` | 3x3 그리드 레이아웃 |
| `src/app/page.tsx` | 신규 섹션 추가 |
| `src/components/NoticeSection.tsx` | 신규 |
| `src/components/ProgramsSection.tsx` | 신규 |
| `src/components/ScholarshipSection.tsx` | 신규 |
