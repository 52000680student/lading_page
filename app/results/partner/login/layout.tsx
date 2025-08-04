import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đăng Nhập Đối Tác | MedNova',
  description: 'Đăng nhập hệ thống tra cứu kết quả xét nghiệm dành cho đối tác, bệnh viện và phòng khám tại MedNova.',
  keywords: ['đăng nhập đối tác', 'tra cứu kết quả', 'bệnh viện', 'phòng khám', 'MedNova'],
  openGraph: {
    title: 'Đăng Nhập Đối Tác | MedNova',
    description: 'Đăng nhập hệ thống tra cứu kết quả xét nghiệm dành cho đối tác, bệnh viện và phòng khám tại MedNova.',
    url: 'https://mednovanhatrang.com/results/partner/login',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mednovanhatrang.com/results/partner/login',
  },
};

export default function PartnerLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}