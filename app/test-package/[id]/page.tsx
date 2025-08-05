import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TestPackageDetail from '@/components/TestPackageDetail';
import { getLabhouseDataServer } from '@/lib/data';

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = params;
  
  // Fetch data from API or fallback to static
  const labhouseData = await getLabhouseDataServer();
  
  // Find the test package by ID
  const allPackages = [
    ...labhouseData.testPackages.generalCheckup,
  ];
  
  const testPackage = allPackages.find(pkg => pkg.id === id);
  
  if (!testPackage) {
    return {
      title: 'Gói Xét Nghiệm Không Tìm Thấy | MedNova',
      description: 'Gói xét nghiệm bạn tìm kiếm không tồn tại.',
    };
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  // Generate SEO-optimized titles based on package type
  const generateOptimizedTitle = (pkg: any) => {
    const titleMap: { [key: string]: string } = {
      'general-female-basic': 'Tầm Soát Ung Thư Phụ Nữ | MedNova',
      'general-male-basic': 'Tầm Soát Ung Thư Nam Giới | MedNova',
      'premium-female': 'Xét Nghiệm Gan Mật Chuyên Sâu | MedNova',
      'premium-male': 'Xét Nghiệm Tổng Quát Cơ Bản | MedNova',
      'general-advanced': 'Xét Nghiệm Tổng Quát Nâng Cao | MedNova',
      'comprehensive-male': 'Xét Nghiệm Toàn Diện Nam Giới | MedNova',
      'comprehensive-female': 'Xét Nghiệm Toàn Diện Phụ Nữ | MedNova',
      'stroke-risk': 'Xét Nghiệm Nguy Cơ Đột Quỵ | MedNova',
    };
    
    return titleMap[pkg.id] || `${pkg.name} | MedNova`;
  };

  return {
    title: generateOptimizedTitle(testPackage),
    description: `Chi tiết gói xét nghiệm ${testPackage.name} với ${testPackage.indicators} chỉ số quan trọng. Giá: ${formatPrice(testPackage.price)} VND. Lấy mẫu tại nhà miễn phí, kết quả ${testPackage.resultTime}.`,
    keywords: [testPackage.name, 'gói xét nghiệm', testPackage.category, 'MedNova', 'xét nghiệm y khoa'],
    openGraph: {
      title: generateOptimizedTitle(testPackage),
      description: `Chi tiết gói xét nghiệm ${testPackage.name} với ${testPackage.indicators} chỉ số quan trọng. Giá: ${formatPrice(testPackage.price)} VND.`,
      url: `https://mednovanhatrang.com//test-package/${id}`,
      type: 'website',
      images: testPackage.image ? [testPackage.image] : undefined,
    },
    alternates: {
      canonical: `https://mednovanhatrang.com//test-package/${id}`,
    },
  };
}

export async function generateStaticParams() {
  const labhouseData = await getLabhouseDataServer();
  const allPackages = [
    ...labhouseData.testPackages.generalCheckup,
  ];
  
  return allPackages.map((pkg: any) => ({
    id: pkg.id,
  }));
}

export default function TestPackagePage() {
    return <TestPackageDetail />;
}
