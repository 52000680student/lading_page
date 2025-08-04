'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search } from 'lucide-react';
import DetailedResultView from '@/components/DetailedResultView';

interface PatientInfo {
  fullName: string;
  address: string;
  sid: string;
  phoneNumber: string;
  requestDate: string;
  dateOfBirth: string;
  gender: string;
}

interface ApiResponse {
  resultId: number;
  familyName: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  email: string;
}

export default function CustomerResultsPage() {
  const router = useRouter();
  const [lookupValue, setLookupValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [selectedResultId, setSelectedResultId] = useState<number | null>(null);
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!lookupValue.trim()) {
      alert('Vui lòng nhập mã tra cứu');
      return;
    }

    setIsLoading(true);
    
    try {
      const cipherLookupValue = btoa(lookupValue);
      // Make API call to get result data
      const response = await fetch(`${baseUrl}/api/la/v1/results-landing-page/${encodeURIComponent(cipherLookupValue)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Không tìm thấy kết quả với mã tra cứu này');
      }

      const data: ApiResponse = await response.json();
      
      // Extract PatientInfo from response
      const extractedPatientInfo: PatientInfo = {
        fullName: data.familyName,
        address: '', // Not provided in API response
        sid: '', // Not provided in API response
        phoneNumber: data.phoneNumber,
        requestDate: '', // Not provided in API response
        dateOfBirth: data.dateOfBirth,
        gender: data.gender
      };
      
      setSelectedResultId(data.resultId);
      setPatientInfo(extractedPatientInfo);
      setShowDetailedView(true);
      
    } catch (error) {
      console.error('Error during lookup:', error);
      alert(error instanceof Error ? error.message : 'Có lỗi xảy ra trong quá trình tra cứu. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/results');
  };

  const handleBackToList = () => {
    setShowDetailedView(false);
    setSelectedResultId(null);
    setPatientInfo(null);
  };

  if (showDetailedView && selectedResultId) {
    return (
      <DetailedResultView
        resultId={selectedResultId}
        onBack={handleBackToList}
        showBackButton={true}
        patientInfo={patientInfo || undefined}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-green-600 hover:text-green-800 mb-8 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Quay lại</span>
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Tra Cứu Kết Quả - Khách Hàng
            </h1>
            <p className="text-gray-600">
              Nhập mã tra cứu để xem kết quả xét nghiệm của bạn
            </p>
          </div>

          {/* Lookup Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Tra Cứu Kết Quả</h2>
              <p className="text-gray-600 mt-2">
                Nhập mã tra cứu được cung cấp khi bạn thực hiện xét nghiệm
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="lookupCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Mã tra cứu
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="lookupCode"
                    value={lookupValue}
                    onChange={(e) => setLookupValue(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Nhập mã tra cứu (ví dụ: ABC123456)"
                    disabled={isLoading}
                    required
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Mã tra cứu thường có dạng chữ và số, được in trên phiếu xét nghiệm của bạn
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

            {/* Help Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Cần Hỗ Trợ?
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Mã tra cứu được cung cấp khi bạn hoàn thành xét nghiệm</p>
                <p>• Nếu không tìm thấy mã tra cứu, vui lòng liên hệ với chúng tôi</p>
                <p>• Kết quả thường có sẵn sau 24-48 giờ kể từ khi lấy mẫu</p>
              </div>
              
              <div className="flex justify-center space-x-4 mt-4">
                <a 
                  href="tel:0843179579" 
                  className="text-green-600 hover:text-green-800 font-semibold"
                >
                  📞 0843.179.579
                </a>
                <span className="text-gray-400">|</span>
                <a 
                  href="mailto:support@mednova.vn" 
                  className="text-green-600 hover:text-green-800 font-semibold"
                >
                  ✉️ support@mednova.vn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}