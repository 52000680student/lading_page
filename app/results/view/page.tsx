'use client';

import { Suspense } from 'react';
import PartnerLookup from '@/components/PartnerLookup';

export default function PartnerResultsPage() {
  const handleBack = () => {
    window.location.href = '/results';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <Suspense fallback={<div className="flex justify-center items-center py-12"><div className="text-lg text-gray-600">Đang tải...</div></div>}>
          <PartnerLookup onBack={handleBack} />
        </Suspense>
      </div>
    </div>
  );
}