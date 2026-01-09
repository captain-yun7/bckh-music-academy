'use client';

import CurriculumPageContent from '@/components/curriculum/CurriculumPageContent';

export default function HobbyCoursePage() {
  return (
    <CurriculumPageContent
      slug="hobby"
      fallbackTitle="취미반"
      fallbackSubtitle="음악을 즐기고 싶은 분들을 위한 맞춤 레슨"
      fallbackBgImage="/images/main/main2.jpg"
    />
  );
}
