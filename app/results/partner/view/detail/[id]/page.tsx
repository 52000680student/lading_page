'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, LogOut } from 'lucide-react';
import { getValidToken, removeToken } from '@/utils/auth';
import DetailedResultView from '@/components/DetailedResultView';

export default function PartnerDetailPage() {
  const router = useRouter();
  const params = useParams();
  const resultId = params.id as string;

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
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with Back and Logout */}
          <div className="flex justify-between items-center mb-8">
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

          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Chi Tiết Kết Quả
            </h1>
            <p className="text-gray-600">
              Xem chi tiết kết quả xét nghiệm
            </p>
          </div>

          {/* Detailed Result View */}
          <DetailedResultView 
            resultId={parseInt(resultId)} 
            onBack={handleBack}
            showBackButton={false}
          />
        </div>
      </div>
    </div>
  );
}