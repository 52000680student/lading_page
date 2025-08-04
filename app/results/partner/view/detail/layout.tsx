import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chi Tiết Kết Quả Xét Nghiệm | MedNova',
  description: 'Xem chi tiết kết quả xét nghiệm của bệnh nhân. Thông tin đầy đủ và chính xác từ phòng thí nghiệm MedNova.',
  keywords: ['chi tiết kết quả', 'kết quả xét nghiệm', 'báo cáo y khoa', 'MedNova'],
  openGraph: {
    title: 'Chi Tiết Kết Quả Xét Nghiệm | MedNova',
    description: 'Xem chi tiết kết quả xét nghiệm của bệnh nhân. Thông tin đầy đủ và chính xác từ phòng thí nghiệm MedNova.',
    url: 'https://mednovanhatrang.com/results/partner/view/detail',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mednovanhatrang.com/results/partner/view/detail',
  },
};

export default function PartnerDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}