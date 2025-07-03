'use client';

import { motion } from 'framer-motion';
import labhouseData from '@/data/labhouse-data.json';

const HowItWorksSection: React.FC = () => {
  const processSteps = labhouseData.process;

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="chakra-heading-lg text-dark-grey mb-6">
            Quy trình xét nghiệm đơn giản
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chỉ với 4 bước đơn giản, bạn có thể hoàn thành xét nghiệm và nhận được kết quả chính xác
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.step}
              className="text-center relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto bg-primary-50 border-4 border-primary-500 rounded-full flex items-center justify-center relative z-10">
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg z-20">
                  {step.step}
                </div>

                {/* Connection Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-8 h-0.5 bg-primary-200 z-0"></div>
                )}
              </div>

              <h3 className="chakra-heading-sm text-dark-grey mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 mb-6">
            Sẵn sàng bắt đầu hành trình chăm sóc sức khỏe của bạn?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors">
              Đăng ký ngay
            </button>
            <button className="border border-primary-500 text-primary-500 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
              Tư vấn miễn phí
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 