import { Metadata } from 'next';
import ServicesPageContent from './ServicesPageContent';

export const metadata: Metadata = {
  title: 'Dịch Vụ Xét Nghiệm Y Khoa | Gói Tầm Soát Sức Khỏe | MedNova',
  description: 'Khám phá các gói xét nghiệm y khoa chuyên nghiệp tại MedNova. Tầm soát sức khỏe tổng quát, xét nghiệm nam khoa, phụ khoa với phòng thí nghiệm chứng nhận quốc tế. Lấy mẫu tại nhà miễn phí.',
  keywords: ['gói xét nghiệm', 'tầm soát sức khỏe', 'xét nghiệm tổng quát', 'xét nghiệm nam khoa', 'xét nghiệm phụ khoa', 'xét nghiệm chuyên khoa', 'MedNova'],
  openGraph: {
    title: 'Dịch Vụ Xét Nghiệm Y Khoa | Gói Tầm Soát Sức Khỏe | MedNova',
    description: 'Khám phá các gói xét nghiệm y khoa chuyên nghiệp tại MedNova. Tầm soát sức khỏe tổng quát với phòng thí nghiệm chứng nhận quốc tế.',
    url: 'https://mednovanhatrang.com//services',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mednovanhatrang.com//services',
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
