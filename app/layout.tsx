import './globals.css';
import { Metadata, Viewport } from 'next';
import ConditionalHeader from '@/components/ConditionalHeader';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export const metadata: Metadata = {
  metadataBase: new URL('https://mednovanhatrang.com/'),
  title: {
    default: 'Xét Nghiệm Y Khoa Chuyên Nghiệp | MedNova',
    template: '%s'
  },
  description: 'Nhận kết quả xét nghiệm chính xác từ sự thoải mái tại nhà với dịch vụ xét nghiệm y khoa chuyên nghiệp. Phòng thí nghiệm được chứng nhận quốc tế, tư vấn chuyên gia 24/7 và dịch vụ lấy mẫu tại nhà tiện lợi.',
  keywords: ['xét nghiệm y khoa', 'tầm soát sức khỏe', 'xét nghiệm tại nhà', 'xét nghiệm máu', 'tư vấn y khoa', 'MedNova', 'phòng thí nghiệm', 'chẩn đoán y khoa', 'xét nghiệm nhanh', 'kết quả chính xác'],
  authors: [{ name: 'MedNova', url: 'https://mednovanhatrang.com/' }],
  creator: 'MedNova Medical Center',
  publisher: 'MedNova',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://mednovanhatrang.com/',
    siteName: 'MedNova - Trung Tâm Xét Nghiệm Y Khoa',
    title: 'Xét Nghiệm Y Khoa Chuyên Nghiệp | MedNova',
    description: 'Dịch vụ xét nghiệm y khoa chuyên nghiệp với phòng thí nghiệm được chứng nhận quốc tế. Lấy mẫu tại nhà miễn phí, tư vấn chuyên gia 24/7, kết quả nhanh chóng và chính xác.',
    images: [
      {
        url: '/images/logos/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MedNova - Trung Tâm Xét Nghiệm Y Khoa Chuyên Nghiệp',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mednova_vn',
    creator: '@mednova_vn',
    title: 'Xét Nghiệm Y Khoa Chuyên Nghiệp | MedNova',
    description: 'Dịch vụ xét nghiệm y khoa chuyên nghiệp với lấy mẫu tại nhà miễn phí. Phòng thí nghiệm chứng nhận quốc tế, kết quả nhanh chính xác.',
    images: ['/images/logos/twitter-image.jpg'],
  },
  alternates: {
    canonical: 'https://mednovanhatrang.com/',
    languages: {
      'vi-VN': 'https://mednovanhatrang.com/',
      'en-US': 'https://mednovanhatrang.com//en',
    },
  },
  category: 'Medical Services',
  classification: 'Healthcare',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#f57a26" />
        <meta name="geo.region" content="VN" />
        <meta name="geo.country" content="Vietnam" />
        <meta name="geo.placename" content="Ho Chi Minh City" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "name": "MedNova",
              "alternateName": "MedNova Medical Center",
              "description": "Trung tâm xét nghiệm y khoa chuyên nghiệp với dịch vụ lấy mẫu tại nhà",
              "url": "https://mednovanhatrang.com/",
              "logo": "https://mednovanhatrang.com//images/logos/logo.png",
              "image": "https://mednovanhatrang.com//images/logos/logo.png",
              "telephone": "+84-123-456-789",
              "email": "info@mednova.vn",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Đường Y Tế",
                "addressLocality": "Quận 1",
                "addressRegion": "TP.HCM",
                "postalCode": "70000",
                "addressCountry": "VN"
              },
              "medicalSpecialty": [
                "Laboratory Medicine",
                "Pathology",
                "Clinical Chemistry",
                "Hematology"
              ],
              "serviceType": [
                "Medical Testing",
                "Laboratory Services",
                "Home Sample Collection",
                "Medical Consultation"
              ],
              "areaServed": {
                "@type": "Country",
                "name": "Vietnam"
              },
              "founder": {
                "@type": "Person",
                "name": "MedNova Team"
              },
              "foundingDate": "2020",
              "sameAs": [
                "https://facebook.com/mednova",
                "https://twitter.com/mednova_vn",
                "https://linkedin.com/company/mednova"
              ]
            })
          }}
        />
        
        {/* Structured Data - Medical Services */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": "Medical Laboratory Services",
              "provider": {
                "@type": "MedicalOrganization",
                "name": "MedNova"
              },
              "areaServed": {
                "@type": "Country",
                "name": "Vietnam"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Medical Testing Packages",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Gói Tầm Soát Sức Khỏe Tổng Quát",
                      "description": "Gói xét nghiệm sức khỏe tổng quát với nhiều chỉ số quan trọng"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Xét Nghiệm Tại Nhà",
                      "description": "Dịch vụ lấy mẫu xét nghiệm tại nhà tiện lợi"
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* Structured Data - WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "MedNova",
              "alternateName": "MedNova Medical Center",
              "url": "https://mednovanhatrang.com/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://mednovanhatrang.com//search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="font-lato antialiased bg-white text-dark-grey overflow-x-hidden">
        <ConditionalHeader />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}