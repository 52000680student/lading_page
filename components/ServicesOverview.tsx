"use client";

import { motion } from "framer-motion";
import { TestTube, Shield, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

const ServicesOverview: React.FC = () => {
  const serviceCategories = [
    {
      icon: <TestTube className="w-8 h-8" />,
      title: "Xét nghiệm thường quy",
      description:
        "Kiểm tra sức khỏe cơ bản với các xét nghiệm đường huyết, chức năng gan, thận, mỡ máu",
      features: [
        "Đường huyết",
        "Chức năng gan",
        "Chức năng thận",
        "Mỡ máu",
        "Gout",
      ],
      color: "blue",
      bgGradient: "from-blue-50 to-blue-100",
      iconBg: "bg-blue-500",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Xét nghiệm tầm soát",
      description:
        "Phát hiện sớm các bệnh lý với xét nghiệm tuyến giáp, tầm soát ung thư nam và nữ",
      features: [
        "Tuyến giáp",
        "Ung thư nam",
        "Ung thư nữ",
        "Tầm soát tổng quát",
      ],
      color: "green",
      bgGradient: "from-green-50 to-green-100",
      iconBg: "bg-green-500",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Lấy mẫu tại nhà",
      description:
        "Dịch vụ thuận tiện với nhân viên chuyên nghiệp, phục vụ 7h-17h mọi ngày",
      features: [
        "Đăng ký nhanh",
        "Phục vụ 7 ngày/tuần",
        "Nhân viên có chứng chỉ",
        "An toàn & tiện lợi",
      ],
      color: "red",
      bgGradient: "from-red-50 to-red-100",
      iconBg: "bg-red-500",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="chakra-heading-lg text-dark-grey mb-4">
            🧪 Dịch vụ xét nghiệm của chúng tôi
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cung cấp các dịch vụ xét nghiệm chuyên nghiệp, chính xác và thuận
            tiện
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${category.bgGradient} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div
                className={`${category.iconBg} text-white w-16 h-16 rounded-xl flex items-center justify-center mb-4`}
              >
                {category.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {category.title}
              </h3>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {category.description}
              </p>

              <div className="space-y-2">
                {category.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-current rounded-full opacity-60"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Khám phá chi tiết các dịch vụ
            </h3>
            <p className="text-gray-600 mb-6">
              Tìm hiểu thêm về từng loại xét nghiệm, quy trình thực hiện và các
              gói dịch vụ phù hợp với nhu cầu của bạn
            </p>
            <Link href="/services">
              <Button className="inline-flex items-center gap-2 text-lg px-8 py-3">
                Xem chi tiết dịch vụ
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesOverview;
