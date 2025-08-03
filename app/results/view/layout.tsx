import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tra Cứu Kết Quả Đối Tác | MedNova',
  description: 'Tra cứu kết quả xét nghiệm dành cho đối tác, bệnh viện và phòng khám tại MedNova.',
  keywords: ['tra cứu kết quả', 'đối tác', 'kết quả xét nghiệm', 'MedNova'],
  openGraph: {
    title: 'Tra Cứu Kết Quả Đối Tác | MedNova',
    description: 'Tra cứu kết quả xét nghiệm dành cho đối tác, bệnh viện và phòng khám tại MedNova.',
    url: 'https://mednovanhatrang.com/results/view',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mednovanhatrang.com/results/view',
  },
};

export default function PartnerResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}