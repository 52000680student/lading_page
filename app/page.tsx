import { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'MedNova - Trung Tâm Xét Nghiệm Y Khoa Chuyên Nghiệp | Lấy Mẫu Tại Nhà',
  description: 'MedNova cung cấp dịch vụ xét nghiệm y khoa chuyên nghiệp với phòng thí nghiệm chứng nhận quốc tế. Lấy mẫu tại nhà miễn phí, tư vấn chuyên gia 24/7, kết quả nhanh chóng và chính xác.',
  openGraph: {
    title: 'MedNova - Trung Tâm Xét Nghiệm Y Khoa Chuyên Nghiệp',
    description: 'Dịch vụ xét nghiệm y khoa chuyên nghiệp với lấy mẫu tại nhà miễn phí và tư vấn chuyên gia 24/7.',
    url: 'https://mednovanhatrang.com/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mednovanhatrang.com/',
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <CTASection />
    </main>
  );
} 