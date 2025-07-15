"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { submitRegistration } from "@/utils/api";

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSuccess(false);
      onClose();
    }
  };

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

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.fullName || !formData.phoneNumber || !formData.location) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await submitRegistration({
        name: formData.fullName,
        testPackage: "Đăng ký tư vấn",
        phone: formData.phoneNumber,
        address: formData.location,
        appointmentTime: "",
        otherRequirements: formData.otherRequirements,
      });

      if (success) {
        setIsSuccess(true);
        // Reset form after successful submission
        setFormData({
          fullName: "",
          phoneNumber: "",
          location: "",
          otherRequirements: "",
        });

        // Close modal after showing success message
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 2000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi gửi đăng ký. Vui lòng thử lại sau.");
      console.error("Error submitting registration:", error);
    } finally {
      setIsSubmitting(false);
    }
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
          onClick={handleClose}
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
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              disabled={isSubmitting}
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
            {isSuccess ? (
              <div className="text-center py-8">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Đăng ký thành công!</h3>
                  <p className="text-gray-600">Chúng tôi sẽ liên hệ với bạn sớm nhất.</p>
                </div>
              </div>
            ) : (
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>

                {/* Location Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa điểm <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Nhập địa điểm của bạn"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                    disabled={isSubmitting}
                  />
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
                    disabled={isSubmitting}
                  />
                </div>

                <div className="text-xs text-gray-500 mt-4">
                  <span className="text-red-500">*</span> Thông tin bắt buộc
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {!isSuccess && (
            <div className="p-6 border-t bg-gray-50">
              <Button
                onClick={handleSubmit}
                className="w-full bg-primary-500 hover:bg-primary-600 text-lg py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Đang gửi...
                  </div>
                ) : (
                  "Gửi đăng ký"
                )}
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
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TestRegistrationModal;
