'use client';

import CurriculumPageContent from '@/components/curriculum/CurriculumPageContent';

export default function AuditionCoursePage() {
  return (
    <CurriculumPageContent
      slug="audition"
      fallbackTitle="오디션반"
      fallbackSubtitle="연예 기획사 오디션을 위한 전문 트레이닝"
      fallbackBgImage="/images/main/main2.jpg"
    />
  );
}
