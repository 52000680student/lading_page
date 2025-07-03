'use client';

import { Award, HomeIcon, Shield, Stethoscope, Clock, Phone } from 'lucide-react';
import { Benefit } from '@/types';

const benefits: Benefit[] = [
  {
    id: '1',
    icon: 'Award',
    title: 'Phòng thí nghiệm được chứng nhận và công nhận',
    description: 'Tất cả các phòng thí nghiệm đối tác của chúng tôi đều được chứng nhận và công nhận quốc tế về tiêu chuẩn chất lượng cao nhất.',
  },
  {
    id: '2',
    icon: 'HomeIcon',
    title: 'Lấy mẫu tại nhà miễn phí',
    description: 'Tận hưởng sự tiện lợi của dịch vụ lấy mẫu chuyên nghiệp ngay tại nhà mà không mất thêm chi phí.',
  },
  {
    id: '3',
    icon: 'Shield',
    title: 'Kết quả an toàn và bảo mật',
    description: 'Dữ liệu sức khỏe của bạn được bảo vệ và đảm bảo quyền riêng tư hoàn toàn.',
  },
  {
    id: '4',
    icon: 'Stethoscope',
    title: 'Tư vấn y khoa chuyên gia',
    description: 'Tiếp cận các chuyên gia y tế có trình độ để giải thích kết quả và hướng dẫn về sức khỏe.',
  },
  {
    id: '5',
    icon: 'Clock',
    title: 'Thời gian xử lý xét nghiệm nhanh chóng',
    description: 'Nhận kết quả nhanh chóng với thời gian xử lý từ 24-48 giờ cho hầu hết các xét nghiệm.',
  },
  {
    id: '6',
    icon: 'Phone',
    title: 'Chăm sóc khách hàng 24/7',
    description: 'Đội ngũ hỗ trợ tận tâm của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn 24/7.',
  },
];

const getIcon = (iconName: string) => {
  const iconProps = { className: "w-6 h-6" };
  
  switch (iconName) {
    case 'Award':
      return <Award {...iconProps} />;
    case 'HomeIcon':
      return <HomeIcon {...iconProps} />;
    case 'Shield':
      return <Shield {...iconProps} />;
    case 'Stethoscope':
      return <Stethoscope {...iconProps} />;
    case 'Clock':
      return <Clock {...iconProps} />;
    case 'Phone':
      return <Phone {...iconProps} />;
    default:
      return <Award {...iconProps} />;
  }
};

const WhyChooseUsSection: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-light-blue">
      <div className="container">
        <h2 className="section-title">Lí do bạn nên chọn xét nghiệm tại MedNova?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.id}
              className="bg-white p-8 rounded-2xl flex items-start gap-6 shadow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                {getIcon(benefit.icon)}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-dark-grey">{benefit.title}</h3>
                <p className="text-medium-grey leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection; 