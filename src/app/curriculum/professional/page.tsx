'use client';

import CurriculumPageContent from '@/components/curriculum/CurriculumPageContent';

export default function ProfessionalCoursePage() {
  return (
    <CurriculumPageContent
      slug="professional"
      fallbackTitle="전문반"
      fallbackSubtitle="현역 뮤지션을 위한 심화 과정"
      fallbackBgImage="/images/main/main2.jpg"
    />
  );
}
