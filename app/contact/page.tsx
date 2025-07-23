import { Metadata } from 'next';
import ContactSection from "@/components/ContactSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

export const metadata: Metadata = {
  title: 'Liên Hệ MedNova | Tư Vấn Xét Nghiệm Y Khoa Miễn Phí',
  description: 'Liên hệ với MedNova để được tư vấn miễn phí về các gói xét nghiệm y khoa. Đội ngũ chuyên gia sẵn sàng hỗ trợ 24/7. Đặt lịch lấy mẫu tại nhà ngay hôm nay.',
  keywords: ['liên hệ MedNova', 'tư vấn xét nghiệm', 'hỗ trợ khách hàng', 'đặt lịch xét nghiệm', 'tư vấn y khoa', 'hotline'],
  openGraph: {
    title: 'Liên Hệ MedNova | Tư Vấn Xét Nghiệm Y Khoa Miễn Phí',
    description: 'Liên hệ với MedNova để được tư vấn miễn phí về các gói xét nghiệm y khoa. Đội ngũ chuyên gia sẵn sàng hỗ trợ 24/7.',
    url: 'https://mednovanhatrang.com//contact',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mednovanhatrang.com//contact',
  },
};

export default function ContactPage() {
  return (
    <div className="pt-24">
      <ContactSection />
      <WhyChooseUsSection />
    </div>
  );
}
