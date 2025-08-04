import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Danh Sách Kết Quả Đối Tác | MedNova',
  description: 'Xem danh sách kết quả xét nghiệm của đối tác. Tra cứu và quản lý kết quả xét nghiệm một cách dễ dàng.',
  keywords: ['danh sách kết quả', 'đối tác', 'quản lý kết quả', 'xét nghiệm', 'MedNova'],
  openGraph: {
    title: 'Danh Sách Kết Quả Đối Tác | MedNova',
    description: 'Xem danh sách kết quả xét nghiệm của đối tác. Tra cứu và quản lý kết quả xét nghiệm một cách dễ dàng.',
    url: 'https://mednovanhatrang.com/results/partner/view',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mednovanhatrang.com/results/partner/view',
  },
};

export default function PartnerViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}