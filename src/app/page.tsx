import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CoursesSection from '@/components/CoursesSection';
import InstructorsSection from '@/components/InstructorsSection';
import FacilitiesSection from '@/components/FacilitiesSection';
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

        {/* About - 학원 특징/강점 */}
        <AboutSection />

        {/* Courses - 과정 소개 */}
        <CoursesSection />

        {/* Instructors - 강사진 소개 */}
        <InstructorsSection />

        {/* Facilities - 시설 안내 */}
        <FacilitiesSection />

        {/* Reviews - 수강생 후기 */}
        <ReviewsSection />

        {/* Contact - 상담 신청 */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
