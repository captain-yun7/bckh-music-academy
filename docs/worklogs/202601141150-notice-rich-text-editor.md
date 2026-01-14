# 공지사항 Rich Text 에디터 구현

**작업일시**: 2026-01-14 11:50
**작업자**: Claude

## 개요

공지사항 편집 기능을 단순 textarea에서 이미지 삽입이 가능한 Rich Text 에디터로 업그레이드

## 변경 사항

### 1. TipTap 에디터 라이브러리 설치

```bash
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit @tiptap/extension-image \
  @tiptap/extension-link @tiptap/extension-placeholder @tiptap/extension-text-align \
  @tiptap/extension-underline
```

### 2. 신규 파일

#### `src/components/RichTextEditor.tsx`
- TipTap 기반 Rich Text 에디터 컴포넌트
- 지원 기능:
  - 텍스트 스타일: 굵게, 기울임, 밑줄, 취소선
  - 제목: H2, H3
  - 정렬: 왼쪽, 가운데, 오른쪽
  - 목록: 글머리 기호, 번호 매기기
  - 인용구
  - 링크 삽입
  - **이미지 업로드** (Cloudinary 연동)
  - 구분선
  - 실행 취소/다시 실행

### 3. 수정 파일

#### `src/app/admin/(dashboard)/notices/page.tsx`
- textarea를 RichTextEditor 컴포넌트로 교체
- 모달 너비 600px → 900px로 확대 (에디터 사용성 향상)
- dynamic import로 SSR 비활성화 (에디터는 클라이언트 전용)

#### `src/app/notice/[id]/page.tsx`
- 기존 `{notice.content}` 텍스트 출력 방식에서
- `dangerouslySetInnerHTML={{ __html: notice.content }}` HTML 렌더링으로 변경
- 스타일 추가: 제목, 목록, 인용구, 이미지, 링크 등 HTML 요소 스타일링

### 4. 기존 활용

- 이미지 업로드 API: `/api/admin/upload` (기존 Cloudinary 업로드 API 재사용)
- 업로드 파일은 `bckh-music-academy/general` 폴더에 저장

## 기술 스택

- **에디터**: TipTap (ProseMirror 기반)
- **이미지 저장소**: Cloudinary (기존 인프라 활용)
- **프레임워크**: Next.js 15 (App Router)

## 테스트 방법

1. 관리자 페이지 접속: `/admin/notices`
2. "공지 작성" 버튼 클릭
3. 에디터 툴바에서 이미지 아이콘 클릭 → 이미지 파일 선택
4. 작성 완료 후 공개 페이지 `/notice/[id]`에서 HTML 렌더링 확인

## 보안 고려사항

- 이미지 업로드는 관리자 인증 필수 (`/api/admin/upload`)
- 파일 타입 제한: JPG, PNG, GIF, WEBP만 허용
- 파일 크기 제한: 10MB 이하
- XSS: 에디터가 생성하는 HTML만 저장되므로 상대적으로 안전 (관리자만 작성 가능)
