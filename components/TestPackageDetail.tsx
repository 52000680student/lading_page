"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, BarChart3, Users, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { TestPackage } from "@/types";
import BookingModal from "@/components/BookingModal";

// Import the data
import labhouseData from "@/data/labhouse-data.json";

const TestPackageDetail: React.FC = () => {
  const params = useParams();
  const [testPackage, setTestPackage] = useState<TestPackage | null>(null);
  const [relatedPackages, setRelatedPackages] = useState<TestPackage[]>([]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      // Find the test package by ID from all categories
      const allPackages = [
        ...labhouseData.testPackages.generalCheckup,
        ...labhouseData.testPackages.reproductiveHealth,
        ...labhouseData.testPackages.lifestyleHabits,
      ];

      const foundPackage = allPackages.find((pkg) => pkg.id === params.id);

      if (foundPackage) {
        // Ensure all required fields have default values
        const completePackage: TestPackage = {
          ...foundPackage,
          icon: foundPackage.icon || "/images/icons/default-test.svg",
          resultTime: foundPackage.resultTime || "Trong ngày",
        };

        setTestPackage(completePackage);

        // Find related packages from the same category
        const related = allPackages
          .filter(
            (pkg) =>
              pkg.category === foundPackage.category &&
              pkg.id !== foundPackage.id
          )
          .slice(0, 3)
          .map((pkg) => ({
            ...pkg,
            icon: pkg.icon || "/images/icons/default-test.svg",
            resultTime: pkg.resultTime || "Trong ngày",
          }));
        setRelatedPackages(related);
      }
    }
  }, [params.id]);

  const handleBookTest = () => {
    setIsBookingModalOpen(true);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  if (!testPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin gói xét nghiệm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container py-4">
          <Link
            href="/"
            className="inline-flex items-center text-primary-500 hover:text-primary-600 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Quay lại trang chủ
          </Link>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Trang chủ</span>
            <span>/</span>
            <span>{testPackage.category}</span>
            <span>/</span>
            <span className="text-primary-500">{testPackage.name}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Package Header */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={testPackage.icon}
                    alt={testPackage.name}
                    className="w-20 h-20 rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="chakra-heading-lg text-dark-grey mb-4">
                    {testPackage.name}
                  </h1>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary-500" />
                      <span className="text-sm text-gray-600">
                        Số lượng chỉ số:{" "}
                        <strong>{testPackage.indicators}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary-500" />
                      <span className="text-sm text-gray-600">
                        <strong>{testPackage.resultTime}</strong>
                      </span>
                    </div>
                    {(testPackage.gender || testPackage.targetGroup) && (
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary-500" />
                        <span className="text-sm text-gray-600">
                          <strong>
                            {testPackage.gender || testPackage.targetGroup}
                          </strong>
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-primary-500 mb-4">
                    {testPackage.originalPrice && (
                      <span className="text-lg text-gray-400 line-through mr-2">
                        {formatPrice(testPackage.originalPrice)} VND
                      </span>
                    )}
                    {formatPrice(testPackage.price)} VND
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Package Description */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="chakra-heading-md text-dark-grey mb-6">
                Mô tả gói xét nghiệm
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  {testPackage.name} là một gói xét nghiệm toàn diện được thiết
                  kế đặc biệt để
                  {testPackage.gender &&
                    ` dành cho ${testPackage.gender.toLowerCase()}`}
                  {testPackage.targetGroup &&
                    ` dành cho ${testPackage.targetGroup.toLowerCase()}`}
                  . Gói xét nghiệm bao gồm {testPackage.indicators} chỉ số quan
                  trọng giúp đánh giá tình trạng sức khỏe hiện tại của bạn.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Với công nghệ hiện đại và đội ngũ chuyên gia giàu kinh nghiệm,
                  chúng tôi cam kết mang đến kết quả chính xác{" "}
                  {testPackage.resultTime.toLowerCase()} để bạn có thể yên tâm
                  về tình trạng sức khỏe của mình.
                </p>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="chakra-heading-md text-dark-grey mb-6">
                Điểm nổi bật của gói xét nghiệm
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Lấy mẫu tại nhà
                    </h3>
                    <p className="text-sm text-gray-600">
                      Miễn phí lấy mẫu tại nhà, tiện lợi và an toàn
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Kết quả nhanh chóng
                    </h3>
                    <p className="text-sm text-gray-600">
                      Nhận kết quả {testPackage.resultTime.toLowerCase()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Chất lượng ISO
                    </h3>
                    <p className="text-sm text-gray-600">
                      Đạt chứng chỉ ISO 15189:2022
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Tư vấn chuyên môn
                    </h3>
                    <p className="text-sm text-gray-600">
                      Đội ngũ bác sĩ chuyên nghiệp tư vấn
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-sm mb-14"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-primary-500 mb-2">
                  {formatPrice(testPackage.price)} VND
                </div>
                {testPackage.originalPrice && (
                  <div className="text-lg text-gray-400 line-through">
                    {formatPrice(testPackage.originalPrice)} VND
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Số lượng chỉ số:</span>
                  <span className="font-medium">{testPackage.indicators}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Thời gian có kết quả:</span>
                  <span className="font-medium">{testPackage.resultTime}</span>
                </div>
                {testPackage.gender && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Giới tính:</span>
                    <span className="font-medium">{testPackage.gender}</span>
                  </div>
                )}
              </div>

              <Button
                onClick={handleBookTest}
                className="w-full text-lg py-4"
                size="large"
              >
                Đặt lịch xét nghiệm
              </Button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Hoặc gọi{" "}
                  <a
                    href="tel:18006271"
                    className="text-primary-500 font-medium"
                  >
                    0843 179 579
                  </a>{" "}
                  để được tư vấn
                </p>
              </div>
            </motion.div>

            {/* Related Packages */}
            {relatedPackages.length > 0 && (
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="chakra-heading-md text-dark-grey mb-4">
                  Gói xét nghiệm liên quan
                </h3>
                <div className="space-y-4">
                  {relatedPackages.map((pkg) => (
                    <Link
                      key={pkg.id}
                      href={`/test-package/${pkg.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={pkg.icon}
                          alt={pkg.name}
                          className="w-12 h-12 rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                            {pkg.name}
                          </h4>
                          <p className="text-primary-500 font-bold text-sm">
                            {formatPrice(pkg.price)} VND
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-white py-16">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="chakra-heading-lg text-dark-grey mb-4">
              4 bước để tự quản trị sức khỏe bản thân và gia đình
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {labhouseData.process.map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-50 rounded-full flex items-center justify-center">
                  <img src={step.icon} alt={step.title} className="w-8 h-8" />
                </div>
                <h3 className="chakra-heading-md text-dark-grey mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Advantages Section */}
      <div className="bg-gray-50 py-16">
        <div className="container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="chakra-heading-lg text-dark-grey mb-4">
              Lý do bạn nên xét nghiệm tại MedNova
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi cam kết mang đến cho bạn dịch vụ xét nghiệm chất lượng
              cao với nhiều ưu điểm vượt trội
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {labhouseData.advantages.map((advantage, index) => (
              <motion.div
                key={advantage.id}
                className="bg-white rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center">
                      <span className="text-primary-500 font-bold text-lg">
                        {advantage.order}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="w-12 h-12 mb-4">
                      <img
                        src={advantage.icon}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {advantage.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedPackage={testPackage}
      />
    </div>
  );
};

export default TestPackageDetail;
