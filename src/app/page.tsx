export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary py-24 px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            부천경희실용음악학원
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            당신의 음악적 꿈을 현실로
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/courses"
              className="btn-primary bg-white text-primary hover:bg-gray-100"
            >
              과정 안내
            </a>
            <a
              href="/contact"
              className="btn-secondary border-white text-white hover:bg-white hover:text-primary"
            >
              상담 신청
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            왜 부천경희실용음악학원인가요?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">전문 커리큘럼</h3>
              <p className="text-text-secondary">
                체계적인 교육 과정으로 기초부터 전문가 수준까지
              </p>
            </div>
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">현직 전문 강사진</h3>
              <p className="text-text-secondary">
                현업에서 활동하는 전문 뮤지션들의 1:1 맞춤 레슨
              </p>
            </div>
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">최신 시설</h3>
              <p className="text-text-secondary">
                최신 장비와 쾌적한 연습 환경을 제공합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-text-secondary text-lg mb-8">
            무료 상담을 통해 나에게 맞는 과정을 찾아보세요
          </p>
          <a href="/contact" className="btn-primary">
            무료 상담 신청
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-dark text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">부천경희실용음악학원</h3>
            <p className="text-gray-400 mb-2">
              경기도 부천시 (상세 주소)
            </p>
            <p className="text-gray-400">
              전화: 032-XXX-XXXX
            </p>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; 2024 부천경희실용음악학원. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
