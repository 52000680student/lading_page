'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';

const ConditionalHeader: React.FC = () => {
  const pathname = usePathname();
  
  // Hide header on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return <Header />;
};

export default ConditionalHeader;