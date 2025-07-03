import './globals.css';
import { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'MedNova - Trung Tâm Xét Nghiệm Y Khoa Chuyên Nghiệp',
  description: 'Nhận kết quả xét nghiệm chính xác từ sự thoải mái tại nhà với dịch vụ xét nghiệm y khoa chuyên nghiệp. Phòng thí nghiệm được chứng nhận, tư vấn chuyên gia và lấy mẫu tại nhà tiện lợi.',
  keywords: 'xét nghiệm y khoa, tầm soát sức khỏe, xét nghiệm tại nhà, xét nghiệm máu, tư vấn y khoa, MedNova',
  authors: [{ name: 'MedNova' }],
  robots: 'index, follow',
  openGraph: {
    title: 'MedNova - Trung Tâm Xét Nghiệm Y Khoa Chuyên Nghiệp',
    description: 'Dịch vụ xét nghiệm y khoa chuyên nghiệp với lấy mẫu tại nhà và tư vấn chuyên gia.',
    type: 'website',
    locale: 'vi_VN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MedNova - Trung Tâm Xét Nghiệm Y Khoa Chuyên Nghiệp',
    description: 'Dịch vụ xét nghiệm y khoa chuyên nghiệp với lấy mẫu tại nhà và tư vấn chuyên gia.',
  },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="font-lato antialiased bg-white text-dark-grey overflow-x-hidden">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
} 