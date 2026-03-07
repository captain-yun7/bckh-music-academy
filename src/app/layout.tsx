import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import FloatingCTA from "@/components/FloatingCTA";

const GA_ID = "G-NZ3TPJKMQG";

export const metadata: Metadata = {
  title: {
    template: '%s | 부천경희실용음악학원',
    default: '부천경희실용음악학원'
  },
  description: "부천경희실용음악학원 - 전문 실용음악 교육기관. 보컬, 기타, 피아노, 드럼, 작곡 등 다양한 과정을 제공합니다.",
  keywords: ["실용음악", "음악학원", "보컬", "기타", "피아노", "드럼", "작곡", "부천", "경희"],
  authors: [{ name: "부천경희실용음악학원" }],
  creator: "부천경희실용음악학원",
  publisher: "부천경희실용음악학원",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: '부천경희실용음악학원',
    description: '부천경희실용음악학원 - 전문 실용음악 교육기관',
    url: '/',
    siteName: '부천경희실용음악학원',
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin=""
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="font-pretendard antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        {children}
        <FloatingCTA />
      </body>
    </html>
  );
}
