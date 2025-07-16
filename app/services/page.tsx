'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BarChart3, Clock, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import BookingModal from '@/components/BookingModal';
import TestingServicesDetail from '@/components/TestingServicesDetail';
import { TestPackage } from '@/types';
import labhouseData from '@/data/labhouse-data.json';

const ServicesPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGender, setSelectedGender] = useState('all');
    const [selectedAge, setSelectedAge] = useState('all');
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<TestPackage | null>(null);
    const [activeMainTab, setActiveMainTab] = useState('packages');

    // Get all test packages from different categories
    const allPackages = [
        ...labhouseData.testPackages.generalCheckup,
    ] as any[];

    // Filter packages based on criteria
    const filteredPackages = allPackages.filter(pkg => {
        const matchesCategory = selectedCategory === 'all' || pkg.category === selectedCategory;
        const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGender = selectedGender === 'all' ||
            pkg.gender?.toLowerCase() === selectedGender ||
            pkg.targetGroup?.toLowerCase().includes(selectedGender);

        return matchesCategory && matchesSearch && matchesGender;
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN').format(price);
    };

    const handleBooking = (pkg: TestPackage) => {
        setSelectedPackageForBooking(pkg);
        setIsBookingModalOpen(true);
    };

    const categories = [
        { id: 'all', name: 'Tất cả gói xét nghiệm' },
        { id: 'Kiểm tra tổng quát', name: 'Kiểm tra tổng quát' },
        { id: 'Cơ quan và triệu chứng', name: 'Cơ quan và triệu chứng' },
    ];

    const genderOptions = [
        { id: 'all', name: 'Tất cả' },
        { id: 'nam', name: 'Nam' },
        { id: 'nữ', name: 'Nữ' },
        { id: 'trẻ em', name: 'Trẻ em' },
    ];

    const ageOptions = [
        { id: 'all', name: 'Mọi độ tuổi' },
        { id: '0-2', name: '0 - 2 tuổi' },
        { id: '2-18', name: '2 - 18 tuổi' },
        { id: '19-29', name: '19 - 29 tuổi' },
        { id: '30-49', name: '30 - 49 tuổi' },
        { id: '50+', name: 'Từ 50 tuổi trở lên' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-24">
            {/* Header Section */}
            <div className="bg-white border-b">
                <div className="container py-8">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <Link href="/" className="hover:text-primary-500">Trang chủ</Link>
                        <span>{'>'}</span>
                        <span className="text-primary-500">Gói xét nghiệm</span>
                    </div>

                    <div className="bg-primary-500 text-white p-4 rounded-lg mb-6">
                        <p className="text-center font-medium">
                            MedNova có {allPackages.length} gói dịch vụ xét nghiệm phù hợp với nhu cầu của bạn
                        </p>
                    </div>

                    <h1 className="chakra-heading-lg text-dark-grey text-center">
                        GÓI XÉT NGHIỆM
                    </h1>
                </div>
            </div>

            {/* Main Tab Navigation */}
            <div className="bg-white border-b sticky top-24 z-40">
                <div className="container">
                    <div className="flex overflow-x-auto">
                        <button
                            onClick={() => setActiveMainTab('packages')}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeMainTab === 'packages'
                                    ? 'text-primary-500 border-primary-500'
                                    : 'text-gray-500 border-transparent hover:text-gray-700'
                            }`}
                        >
                            <BarChart3 className="w-5 h-5" />
                            Gói xét nghiệm
                        </button>
                        <button
                            onClick={() => setActiveMainTab('services')}
                            className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                                activeMainTab === 'services'
                                    ? 'text-primary-500 border-primary-500'
                                    : 'text-gray-500 border-transparent hover:text-gray-700'
                            }`}
                        >
                            <Users className="w-5 h-5" />
                            Chi tiết dịch vụ xét nghiệm
                        </button>
                    </div>
                </div>
            </div>

            <div className="container py-8">
                {/* Test Packages Tab Content */}
                {activeMainTab === 'packages' && (
                    <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h3 className="chakra-heading-sm text-dark-grey mb-6">Danh mục xét nghiệm</h3>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <ul className="space-y-2">
                                    {categories.map(category => (
                                        <li key={category.id}>
                                            <button
                                                onClick={() => setSelectedCategory(category.id)}
                                                className={`w-full text-left p-3 rounded-lg transition-colors ${selectedCategory === category.id
                                                    ? 'bg-primary-50 text-primary-600 border border-primary-200'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {category.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Gender Filter */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-3">Giới tính</h4>
                                <div className="space-y-2">
                                    {genderOptions.map(option => (
                                        <label key={option.id} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value={option.id}
                                                checked={selectedGender === option.id}
                                                onChange={(e) => setSelectedGender(e.target.value)}
                                                className="text-primary-500 focus:ring-primary-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{option.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Age Filter */}
                            <div className="mb-6">
                                <h4 className="font-semibold text-gray-900 mb-3">Độ tuổi</h4>
                                <div className="space-y-2">
                                    {ageOptions.map(option => (
                                        <label key={option.id} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="age"
                                                value={option.id}
                                                checked={selectedAge === option.id}
                                                onChange={(e) => setSelectedAge(e.target.value)}
                                                className="text-primary-500 focus:ring-primary-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">{option.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-3/4">
                        {/* Search Bar */}
                        <div className="mb-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm gói xét nghiệm..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Results */}
                        <div className="mb-6">
                            <p className="text-gray-600">
                                Hiển thị {filteredPackages.length} kết quả
                            </p>
                        </div>

                        {/* Package Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredPackages.map((pkg, index) => (
                                <motion.div
                                    key={pkg.id}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="flex-shrink-0">
                                            {pkg.icon ? (
                                                <img
                                                    src={pkg.icon}
                                                    alt={pkg.name}
                                                    className="w-12 h-12 object-contain"
                                                    onError={(e) => {
                                                        e.currentTarget.style.display = 'none';
                                                        e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                                    }}
                                                />
                                            ) : (
                                                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                                                    <BarChart3 className="w-6 h-6 text-primary-500" />
                                                </div>
                                            )}
                                            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center hidden">
                                                <BarChart3 className="w-6 h-6 text-primary-500" />
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="chakra-heading-sm text-dark-grey mb-2 line-clamp-2">
                                                {pkg.name}
                                            </h3>
                                            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-full mb-3">
                                                {pkg.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <BarChart3 className="w-4 h-4 text-primary-500" />
                                            <span>Số lượng chỉ số: {pkg.indicators}</span>
                                        </div>
                                        {pkg.resultTime && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Clock className="w-4 h-4 text-primary-500" />
                                                <span>{pkg.resultTime}</span>
                                            </div>
                                        )}
                                        {(pkg.gender || pkg.targetGroup) && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Users className="w-4 h-4 text-primary-500" />
                                                <span>{pkg.gender || pkg.targetGroup}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            {(pkg as any).originalPrice && (
                                                <span className="text-sm text-gray-400 line-through block">
                                                    {formatPrice((pkg as any).originalPrice)} VND
                                                </span>
                                            )}
                                            <span className="text-xl font-bold text-primary-500">
                                                {formatPrice(pkg.price)} VND
                                            </span>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                className="text-sm px-4 py-2"
                                                onClick={() => handleBooking(pkg)}
                                            >
                                                Đặt lịch xét nghiệm
                                            </Button>
                                            <Link href={`/test-package/${pkg.id}`}>
                                                <Button className="text-sm px-4 py-2">
                                                    <ArrowRight className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {filteredPackages.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-gray-500 text-lg">
                                    Không tìm thấy gói xét nghiệm phù hợp với tiêu chí tìm kiếm
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                )}

                {/* Testing Services Detail Tab Content */}
                {activeMainTab === 'services' && (
                    <TestingServicesDetail isVisible={true} />
                )}
            </div>

            {/* Booking Modal */}
            <BookingModal
                isOpen={isBookingModalOpen}
                onClose={() => {
                    setIsBookingModalOpen(false);
                    setSelectedPackageForBooking(null);
                }}
                selectedPackage={selectedPackageForBooking}
            />
        </div>
    );
};

export default ServicesPage;
