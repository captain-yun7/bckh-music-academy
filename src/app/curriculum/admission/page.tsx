'use client';

import CurriculumPageContent from '@/components/curriculum/CurriculumPageContent';

export default function AdmissionCoursePage() {
  return (
    <CurriculumPageContent
      slug="admission"
      fallbackTitle="입시반"
      fallbackSubtitle="실용음악 대학 합격을 위한 체계적인 준비"
      fallbackBgImage="/images/main/main2.jpg"
    />
  );
}
