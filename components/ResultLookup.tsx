'use client';

import { useState } from 'react';
import { Users, User } from 'lucide-react';
import Button from '@/components/ui/Button';
import PartnerLookup from '@/components/PartnerLookup';
import CustomerLookup from '@/components/CustomerLookup';

type UserType = 'partner' | 'customer' | null;

const ResultLookup: React.FC = () => {
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);

  const handleUserTypeSelect = (type: UserType) => {
    setSelectedUserType(type);
  };

  const handleBack = () => {
    setSelectedUserType(null);
  };

  if (selectedUserType === 'partner') {
    return <PartnerLookup onBack={handleBack} />;
  }

  if (selectedUserType === 'customer') {
    return <CustomerLookup onBack={handleBack} />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Partner Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Đối Tác
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Dành cho các đối tác, bệnh viện, phòng khám và cơ sở y tế. 
              Đăng nhập để truy cập hệ thống tra cứu.
            </p>
            <Button
              onClick={() => window.location.href = '/results/view'}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
            >
              Đăng Nhập Đối Tác
            </Button>
          </div>
        </div>

        {/* Customer Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Khách Hàng
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Dành cho khách hàng cá nhân. Tra cứu kết quả xét nghiệm 
              trực tiếp mà không cần đăng nhập.
            </p>
            <Button
              onClick={() => handleUserTypeSelect('customer')}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
            >
              Tra Cứu Kết Quả
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12 text-center">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Cần Hỗ Trợ?
          </h3>
          <p className="text-blue-700 mb-4">
            Nếu bạn gặp khó khăn trong việc tra cứu kết quả, vui lòng liên hệ với chúng tôi.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="tel:0366899966" 
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              📞 0843.179.579
            </a>
            <span className="text-blue-400">|</span>
            <a 
              href="mailto:support@mednova.vn" 
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              ✉️ support@mednova.vn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultLookup;
