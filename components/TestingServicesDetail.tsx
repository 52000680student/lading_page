'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TestTube, Heart, Shield, Activity, Clock, Users, CheckCircle } from 'lucide-react';

interface TestingServicesDetailProps {
  isVisible: boolean;
}

const TestingServicesDetail: React.FC<TestingServicesDetailProps> = ({ isVisible }) => {
  const [activeTab, setActiveTab] = useState('routine');

  const tabs = [
    {
      id: 'routine',
      label: 'Xét nghiệm thường quy',
      icon: <TestTube className="w-5 h-5" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'screening',
      label: 'Xét nghiệm tầm soát',
      icon: <Shield className="w-5 h-5" />,
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 'home-service',
      label: 'Lấy mẫu tại nhà',
      icon: <Heart className="w-5 h-5" />,
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    }
  ];

  const testingServices = {
    routine: {
      title: 'Xét nghiệm thường quy',
      description: 'Các xét nghiệm cơ bản để đánh giá tình trạng sức khỏe tổng quát',
      services: [
        {
          name: 'Bộ xét nghiệm đường huyết',
          description: 'Kiểm tra mức đường trong máu, đánh giá nguy cơ tiểu đường',
          tests: ['Glucose', 'HbA1c', 'Insulin'],
          icon: <Activity className="w-6 h-6 text-blue-500" />
        },
        {
          name: 'Bộ chức năng gan (AST, ALT...)',
          description: 'Đánh giá tình trạng hoạt động của gan',
          tests: ['AST', 'ALT', 'Bilirubin', 'Albumin', 'GGT'],
          icon: <Activity className="w-6 h-6 text-green-500" />
        },
        {
          name: 'Bộ chức năng thận (URE, Crea...)',
          description: 'Kiểm tra khả năng lọc và hoạt động của thận',
          tests: ['Urea', 'Creatinine', 'BUN', 'Acid Uric'],
          icon: <Activity className="w-6 h-6 text-red-500" />
        },
        {
          name: 'Bộ mỡ máu',
          description: 'Đánh giá nguy cơ tim mạch thông qua các chỉ số lipid',
          tests: ['Cholesterol', 'Triglyceride', 'HDL-C', 'LDL-C'],
          icon: <Heart className="w-6 h-6 text-pink-500" />
        },
        {
          name: 'Bộ xét nghiệm Gout (Acid Uric...)',
          description: 'Chẩn đoán và theo dõi bệnh gout',
          tests: ['Acid Uric', 'CRP', 'ESR'],
          icon: <Activity className="w-6 h-6 text-orange-500" />
        }
      ]
    },
    screening: {
      title: 'Xét nghiệm tầm soát',
      description: 'Các xét nghiệm phát hiện sớm bệnh lý và nguy cơ sức khỏe',
      services: [
        {
          name: 'Tầm soát chức năng tuyến giáp (TSH, FT3, FT4...)',
          description: 'Đánh giá hoạt động của tuyến giáp',
          tests: ['TSH', 'FT3', 'FT4', 'Anti-TPO'],
          icon: <Shield className="w-6 h-6 text-purple-500" />
        },
        {
          name: 'Tầm soát ung thư nam (PSA, CEA, AFP...)',
          description: 'Phát hiện sớm các dấu hiệu ung thư ở nam giới',
          tests: ['PSA', 'CEA', 'AFP', 'CA 19-9'],
          icon: <Shield className="w-6 h-6 text-blue-600" />
        },
        {
          name: 'Tầm soát ung thư nữ (CA 125, CA 15-3, CA 72-4...)',
          description: 'Phát hiện sớm các dấu hiệu ung thư ở nữ giới',
          tests: ['CA 125', 'CA 15-3', 'CA 72-4', 'CEA'],
          icon: <Shield className="w-6 h-6 text-pink-600" />
        },
        {
          name: 'Tầm soát tổng quát',
          description: 'Bộ xét nghiệm toàn diện cho sức khỏe tổng thể',
          tests: ['CBC', 'CMP', 'Lipid Panel', 'Thyroid Panel'],
          icon: <Shield className="w-6 h-6 text-green-600" />
        }
      ]
    },
    'home-service': {
      title: 'Lấy mẫu xét nghiệm tại nhà',
      description: 'Dịch vụ thuận tiện và an toàn ngay tại nhà bạn',
      services: [
        {
          name: 'Đăng ký nhanh',
          description: 'Quy trình đăng ký đơn giản, nhanh chóng chỉ trong vài phút',
          features: ['Đăng ký online 24/7', 'Xác nhận ngay lập tức', 'Linh hoạt thời gian'],
          icon: <Clock className="w-6 h-6 text-green-500" />
        },
        {
          name: 'Thời gian phục vụ: 7h – 17h, tất cả các ngày',
          description: 'Phục vụ liên tục để phù hợp với lịch trình của bạn',
          features: ['Làm việc 7 ngày/tuần', 'Khung giờ rộng rãi', 'Bao gồm cuối tuần và lễ'],
          icon: <Clock className="w-6 h-6 text-blue-500" />
        },
        {
          name: 'Nhân viên chuyên môn có chứng chỉ hành nghề',
          description: 'Đội ngũ y tế được đào tạo bài bản và có kinh nghiệm',
          features: ['Chứng chỉ hành nghề hợp lệ', 'Đào tạo chuyên sâu', 'Kinh nghiệm nhiều năm'],
          icon: <Users className="w-6 h-6 text-purple-500" />
        }
      ]
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab.id
                  ? `${tab.color} border-current`
                  : 'text-gray-500 border-transparent hover:text-gray-700'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {testingServices[activeTab as keyof typeof testingServices].title}
            </h3>
            <p className="text-gray-600">
              {testingServices[activeTab as keyof typeof testingServices].description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testingServices[activeTab as keyof typeof testingServices].services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {service.name}
                    </h4>
                    <p className="text-gray-600 text-sm mb-3">
                      {service.description}
                    </p>
                    
                    {/* Tests or Features */}
                    <div className="space-y-1">
                      {(service as any).tests && (
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-2">Các xét nghiệm bao gồm:</p>
                          <div className="flex flex-wrap gap-1">
                            {(service as any).tests.map((test: string, testIndex: number) => (
                              <span
                                key={testIndex}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-white text-gray-700 border"
                              >
                                {test}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {(service as any).features && (
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-2">Đặc điểm nổi bật:</p>
                          <div className="space-y-1">
                            {(service as any).features.map((feature: string, featureIndex: number) => (
                              <div key={featureIndex} className="flex items-center gap-2">
                                <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                <span className="text-xs text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center">
            <div className="bg-primary-50 rounded-xl p-6">
              <h4 className="font-semibold text-primary-900 mb-2">
                Cần tư vấn chi tiết?
              </h4>
              <p className="text-primary-700 text-sm mb-4">
                Liên hệ với chúng tôi để được tư vấn cụ thể về các gói xét nghiệm phù hợp
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <span className="text-primary-600 font-medium">📞 Hotline: 0843 179 579</span>
                <span className="text-primary-600">📧 Email: info@mednova.vn</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TestingServicesDetail;
