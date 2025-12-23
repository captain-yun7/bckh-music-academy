import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SuccessVideosSection from '@/components/SuccessVideosSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import PerformancesSection from '@/components/PerformancesSection';
import MusiciansSection from '@/components/MusiciansSection';
import InstructorsSection from '@/components/InstructorsSection';
import CoursesSection from '@/components/CoursesSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

export default function HomePage() {
  return (
    <>
      {/* Noise Overlay for texture */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero - 이미지 슬라이드 */}
        <HeroSection />

        {/* 강사진 - 최상위 */}
        <InstructorsSection />

        {/* 합격생 동영상 */}
        <SuccessVideosSection />

        {/* 커리큘럼 */}
        <CoursesSection />

        {/* 시설사진 */}
        <FacilitiesSection />

        {/* 공연사진 */}
        <PerformancesSection />

        {/* 배출뮤지션 */}
        <MusiciansSection />

        {/* 합격 실적 */}
        <ReviewsSection />

        {/* Contact - 오시는길 */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA Button */}
      <FloatingCTA />
    </>
  );
}
