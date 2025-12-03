'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  '보컬',
  '피아노',
  '기타',
  '드럼',
  '작곡/편곡',
  'MIDI/프로듀싱',
  '기타(직접 입력)',
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section animation
      gsap.from('.contact-content', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      // Form animation
      gsap.from('.contact-form', {
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', course: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-bg-darker" />
      <div className="bg-gradient-blur gradient-purple absolute top-[-20%] left-[-10%] opacity-20" />
      <div className="bg-gradient-blur gradient-blue absolute bottom-[-20%] right-[-10%] opacity-20" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="contact-content">
            <p className="text-g-purple font-semibold mb-4 tracking-wider uppercase">
              Contact Us
            </p>
            <h2 className="section-title mb-6">
              지금 바로
              <br />
              <span className="gradient-text">무료 상담</span>을 신청하세요
            </h2>
            <p className="section-subtitle mb-8">
              전문 상담사가 여러분의 음악적 목표와 현재 수준을 파악하여
              최적의 커리큘럼을 설계해드립니다. 부담 없이 문의해주세요.
            </p>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl gradient-purple flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-text-muted text-sm">전화 문의</p>
                  <p className="text-xl font-semibold">032-123-4567</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl gradient-blue flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-text-muted text-sm">오시는 길</p>
                  <p className="font-semibold">경기도 부천시 원미구 중동로 123</p>
                  <p className="text-text-secondary text-sm">부천역 3번 출구 도보 5분</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl gradient-orange flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-text-muted text-sm">운영 시간</p>
                  <p className="font-semibold">평일 10:00 - 22:00</p>
                  <p className="text-text-secondary text-sm">주말 10:00 - 18:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="contact-form">
            <div className="glass rounded-3xl p-8 md:p-10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full gradient-purple mx-auto mb-6 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">상담 신청 완료!</h3>
                  <p className="text-text-secondary">
                    빠른 시일 내에 연락드리겠습니다.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold mb-6">무료 상담 신청</h3>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium mb-2">이름</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="홍길동"
                      className="w-full px-4 py-3 bg-bg-card border border-border-light rounded-xl focus:border-g-purple focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium mb-2">연락처</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="010-1234-5678"
                      className="w-full px-4 py-3 bg-bg-card border border-border-light rounded-xl focus:border-g-purple focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Course */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      관심 과정
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-bg-card border border-border-light rounded-xl focus:border-g-purple focus:outline-none transition-colors"
                    >
                      <option value="">선택해주세요</option>
                      {courses.map((course) => (
                        <option key={course} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      문의 내용 (선택)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="궁금한 점이나 상담 받고 싶은 내용을 적어주세요"
                      className="w-full px-4 py-3 bg-bg-card border border-border-light rounded-xl focus:border-g-purple focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn btn-primary btn-glow py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        처리 중...
                      </span>
                    ) : (
                      '무료 상담 신청하기'
                    )}
                  </button>

                  <p className="text-center text-text-muted text-sm">
                    상담 신청 시 개인정보 수집에 동의하는 것으로 간주됩니다.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
