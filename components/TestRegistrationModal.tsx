"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

interface TestRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RegistrationFormData {
  fullName: string;
  phoneNumber: string;
  location: string;
  otherRequirements: string;
}

const TestRegistrationModal: React.FC<TestRegistrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: "",
    phoneNumber: "",
    location: "",
    otherRequirements: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.fullName || !formData.phoneNumber || !formData.location) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    // Handle form submission here
    console.log("Registration submitted:", formData);
    alert(
      "Đăng ký xét nghiệm thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất."
    );

    // Reset form and close modal
    setFormData({
      fullName: "",
      phoneNumber: "",
      location: "",
      otherRequirements: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="bg-primary-500 text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-2">Đăng ký xét nghiệm</h2>
            <p className="text-sm opacity-90">
              Hãy nhập thông tin của bạn để chúng tôi liên hệ tư vấn
            </p>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="space-y-4">
              {/* Full Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Nhập họ và tên đầy đủ"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Phone Number Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Nhập số điện thoại"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Location Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chọn địa điểm <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                    required
                  >
                    <option value="">Chọn địa điểm của bạn</option>
                    <option value="hanoi">Nha Trang</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Other Requirements Textarea */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yêu cầu khác (nếu có)
                </label>
                <textarea
                  name="otherRequirements"
                  placeholder="Nhập yêu cầu đặc biệt hoặc câu hỏi của bạn..."
                  value={formData.otherRequirements}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="text-xs text-gray-500 mt-4">
                <span className="text-red-500">*</span> Thông tin bắt buộc
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t bg-gray-50">
            <Button
              onClick={handleSubmit}
              className="w-full bg-primary-500 hover:bg-primary-600 text-lg py-3"
            >
              Gửi đăng ký
            </Button>

            {/* Hotline */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Hotline hỗ trợ:{" "}
                <span className="font-medium text-primary-500">
                  0843 179 579
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TestRegistrationModal;
