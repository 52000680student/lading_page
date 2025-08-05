'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ArrowLeft, LogOut } from 'lucide-react';
import { getValidToken, removeToken } from '@/utils/auth';
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

export default function PartnerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const resultId = params.id as string;
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);

  // Extract patient info from search parameters
  useEffect(() => {
    const patientInfoParam = searchParams.get('patientInfo');
    if (patientInfoParam) {
      try {
        const decodedPatientInfo = JSON.parse(patientInfoParam) as PatientInfo;
        setPatientInfo(decodedPatientInfo);
      } catch (error) {
        console.error('Failed to parse patient info:', error);
      }
    }
  }, [searchParams]);

  // Check authentication
  useEffect(() => {
    const token = getValidToken();
    if (!token) {
      router.replace('/results/partner/login');
    }
  }, [router]);

  const handleBack = () => {
    router.push('/results/partner/view');
  };

  const handleLogout = () => {
    removeToken();
    router.push('/results/partner/login');
  };

  if (!resultId) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy kết quả</h1>
            <p className="text-gray-600 mb-8">ID kết quả không hợp lệ.</p>
            <button
              onClick={handleBack}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Quay lại danh sách
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header with Back and Logout - positioned absolutely */}
      <div className="fixed top-20 left-0 right-0 z-10 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Quay lại danh sách</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Đăng xuất</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Result View - full width like customer page */}
      <div className="pt-20">
        <DetailedResultView 
          resultId={parseInt(resultId)} 
          onBack={handleBack}
          showBackButton={false}
          patientInfo={patientInfo || undefined}
          isCustomer={false}
        />
      </div>
    </>
  );
}