import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import SuccessVideosSection from '@/components/SuccessVideosSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import PerformancesSection from '@/components/PerformancesSection';
import MusiciansSection from '@/components/MusiciansSection';
import AboutSection from '@/components/AboutSection';
import InstructorsSection from '@/components/InstructorsSection';
import CoursesSection from '@/components/CoursesSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      {/* Noise Overlay for texture */}
      <div className="noise-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main>
        {/* Hero - 다이나믹 텍스트 애니메이션 */}
        <HeroSection />

        {/* 합격생 동영상 - 히어로 바로 하단 */}
        <SuccessVideosSection />

        {/* 시설사진 */}
        <FacilitiesSection />

        {/* 공연사진 */}
        <PerformancesSection />

        {/* 배출뮤지션 */}
        <MusiciansSection />

        {/* 강사진 */}
        <InstructorsSection />

        {/* 합격 실적 */}
        <ReviewsSection />

        {/* 학원 소개 */}
        <AboutSection />

        {/* 교육과정 */}
        <CoursesSection />

        {/* Contact - 오시는길 */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
