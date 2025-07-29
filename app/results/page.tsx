import { Metadata } from 'next';
import ResultLookup from '@/components/ResultLookup';

export const metadata: Metadata = {
  title: 'Tra Cứu Kết Quả Xét Nghiệm | MedNova',
  description: 'Tra cứu kết quả xét nghiệm nhanh chóng và bảo mật tại MedNova. Nhập thông tin để xem kết quả xét nghiệm của bạn một cách dễ dàng.',
  keywords: ['tra cứu kết quả', 'kết quả xét nghiệm', 'MedNova', 'xem kết quả'],
  openGraph: {
    title: 'Tra Cứu Kết Quả Xét Nghiệm | MedNova',
    description: 'Tra cứu kết quả xét nghiệm nhanh chóng và bảo mật tại MedNova.',
    url: 'https://mednovanhatrang.com//results',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mednovanhatrang.com//results',
  },
};

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tra Cứu Kết Quả Xét Nghiệm
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nhập thông tin để tra cứu kết quả xét nghiệm của bạn. Chọn loại tài khoản phù hợp để tiếp tục.
          </p>
        </div>
        
        <ResultLookup />
      </div>
    </div>
  );
}
