'use client';

import { useState } from 'react';
import ResultLookup from '@/components/ResultLookup';

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
