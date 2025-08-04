import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đối Tác | MedNova',
  description: 'Hệ thống tra cứu kết quả xét nghiệm dành cho đối tác, bệnh viện và phòng khám tại MedNova.',
  keywords: ['đối tác', 'tra cứu kết quả', 'bệnh viện', 'phòng khám', 'MedNova'],
  openGraph: {
    title: 'Hệ Thống Đối Tác | MedNova',
    description: 'Hệ thống tra cứu kết quả xét nghiệm dành cho đối tác, bệnh viện và phòng khám tại MedNova.',
    url: 'https://mednovanhatrang.com/results/partner',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mednovanhatrang.com/results/partner',
  },
};

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}