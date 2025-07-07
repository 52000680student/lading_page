'use client';

import { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import Button from '@/components/ui/Button';

interface CustomerLookupProps {
  onBack: () => void;
}

const CustomerLookup: React.FC<CustomerLookupProps> = ({ onBack }) => {
  const [lookupValue, setLookupValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!lookupValue.trim()) {
      alert('Vui lòng nhập mã tra cứu');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      console.log('Customer lookup for:', lookupValue);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just show an alert
      alert(`Đang tra cứu mã: ${lookupValue}\n(API chưa được triển khai)`);
      
    } catch (error) {
      console.error('Error during lookup:', error);
      alert('Có lỗi xảy ra trong quá trình tra cứu. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-green-600 hover:text-green-800 mb-8 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Quay lại</span>
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Tra Cứu Kết Quả - Khách Hàng
        </h2>
        <p className="text-gray-600">
          Nhập mã tra cứu để xem kết quả xét nghiệm
        </p>
      </div>

      {/* Lookup Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="lookupCode" 
              className="block text-sm font-semibold text-gray-700 mb-3"
            >
              Mã Tra Cứu
            </label>
            <div className="relative">
              <input
                type="text"
                id="lookupCode"
                value={lookupValue}
                onChange={(e) => setLookupValue(e.target.value)}
                placeholder="Nhập mã tra cứu (ví dụ: KH2024001)"
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                disabled={isLoading}
              />
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Mã tra cứu được cung cấp trong email hoặc tin nhắn SMS
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading || !lookupValue.trim()}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
          >
            {isLoading ? (
              <span className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Đang tra cứu...</span>
              </span>
            ) : (
              'Tra Cứu Kết Quả'
            )}
          </button>
        </form>
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-200">
        <h3 className="text-lg font-semibold text-green-900 mb-3">
          Hướng Dẫn Tra Cứu
        </h3>
        <ul className="text-green-700 space-y-2">
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">•</span>
            <span>Mã tra cứu gồm 8-10 ký tự (chữ và số)</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">•</span>
            <span>Kiểm tra email hoặc SMS để tìm mã tra cứu</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">•</span>
            <span>Kết quả sẽ hiển thị ngay sau khi tra cứu thành công</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-green-600 mt-1">•</span>
            <span>Liên hệ hotline 0843.179.579 nếu cần hỗ trợ</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerLookup;
