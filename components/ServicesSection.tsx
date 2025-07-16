"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, BarChart3 } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import BookingModal from "@/components/BookingModal";
import { TestPackage } from "@/types";
import labhouseData from "@/data/labhouse-data.json";

const ServicesSection = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackageForBooking, setSelectedPackageForBooking] =
    useState<TestPackage | null>(null);

  // Get featured test packages from different categories
  const featuredPackages: TestPackage[] = [
    ...labhouseData.testPackages.generalCheckup
      .filter((pkg) => pkg.featured)
      .slice(0, 6),
  ].slice(0, 6).map(pkg => ({
    ...pkg,
    icon: pkg.icon || "/images/icons/default-test.svg",
    resultTime: pkg.resultTime || "Trong ngày",
  }));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const handleBooking = (pkg: TestPackage) => {
    setSelectedPackageForBooking(pkg);
    setIsBookingModalOpen(true);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="chakra-heading-lg text-dark-grey mb-6">
            Gói Xét Nghiệm Chuyên Khoa
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Khám phá các gói xét nghiệm toàn diện, được thiết kế riêng cho từng
            nhu cầu sức khỏe của bạn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPackages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-primary-50 rounded-xl mb-6">
                {pkg.icon ? (
                  <img
                    src={pkg.icon}
                    alt={pkg.name}
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove(
                        "hidden"
                      );
                    }}
                  />
                ) : (
                  <BarChart3 className="w-8 h-8 text-primary-500" />
                )}
                <BarChart3 className="w-8 h-8 text-primary-500 hidden" />
              </div>

              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded-full mb-3">
                  {pkg.category}
                </span>
                <h3 className="chakra-heading-sm text-dark-grey mb-3 group-hover:text-primary-500 transition-colors">
                  {pkg.name}
                </h3>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BarChart3 className="w-4 h-4 text-primary-500" />
                  <span>{pkg.indicators} chỉ số</span>
                </div>
                {pkg.resultTime && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-primary-500" />
                    <span>{pkg.resultTime}</span>
                  </div>
                )}
                {pkg.gender && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Dành cho: </span>
                    {pkg.gender}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  {pkg.originalPrice && (
                    <span className="text-sm text-gray-400 line-through block">
                      {formatPrice(pkg.originalPrice)} VND
                    </span>
                  )}
                  <span className="text-xl font-bold text-primary-500">
                    {formatPrice(pkg.price)} VND
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 text-sm"
                    onClick={() => handleBooking(pkg)}
                  >
                    Đặt lịch
                  </Button>
                  <Link href={`/test-package/${pkg.id}`}>
                    <Button className="text-sm px-4">
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Button
            href="/services"
            size="large"
            className="flex items-center gap-2"
          >
            Xem Tất Cả Gói Xét Nghiệm
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>

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
    </section>
  );
};

export default ServicesSection;
