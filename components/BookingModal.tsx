"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  User,
  Phone,
  Home,
  ChevronDown,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { TestPackage } from "@/types";
import labhouseData from "@/data/labhouse-data.json";
import { submitRegistration } from "@/utils/api";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage?: TestPackage | null;
}

interface BookingFormData {
  service: {
    packageId: string;
    packageName: string;
    price: number;
    quantity: number;
  };
  customer: {
    name: string;
    phone: string;
    address: string;
    specialRequests: string;
  };
  location: "home" | "center";
  timing: "asap" | "scheduled";
  scheduledDate?: string;
  scheduledTime?: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    service: {
      packageId: selectedPackage?.id || "",
      packageName: selectedPackage?.name || "",
      price: selectedPackage?.price || 0,
      quantity: 1,
    },
    customer: {
      name: "",
      phone: "",
      address: "",
      specialRequests: "",
    },
    location: "home",
    timing: "asap",
  });

  const handleClose = () => {
    if (!isSubmitting) {
      setIsSuccess(false);
      setCurrentStep(1);
      onClose();
    }
  };

  // Update form data when selectedPackage changes
  useEffect(() => {
    if (selectedPackage) {
      setFormData(prev => ({
        ...prev,
        service: {
          packageId: selectedPackage.id,
          packageName: selectedPackage.name,
          price: selectedPackage.price,
          quantity: prev.service.quantity, // Keep existing quantity
        },
      }));
    }
  }, [selectedPackage]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Validate that we have the required information
    if (!formData.customer.name || !formData.customer.phone) {
      alert("Vui lòng điền đầy đủ thông tin khách hàng.");
      return;
    }

    if (!formData.service.packageName && !selectedPackage?.name) {
      alert("Không tìm thấy thông tin gói xét nghiệm. Vui lòng thử lại.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare appointment time based on timing choice
      let appointmentTime = "";
      if (formData.timing === "scheduled" && formData.scheduledDate && formData.scheduledTime) {
        appointmentTime = `${formData.scheduledDate} ${formData.scheduledTime}`;
      } else {
        appointmentTime = "Càng sớm càng tốt";
      }

      // Prepare the registration data
      const registrationData = {
        name: formData.customer.name,
        testPackage: formData.service.packageName || selectedPackage?.name || "Gói xét nghiệm",
        phone: formData.customer.phone,
        address: formData.customer.address,
        appointmentTime: appointmentTime,
        otherRequirements: formData.customer.specialRequests,
      };

      // Debug logging
      console.log("Submitting booking data:", registrationData);
      console.log("Selected package:", selectedPackage);
      console.log("Form data service:", formData.service);

      const success = await submitRegistration(registrationData);

      if (success) {
        setIsSuccess(true);
        // Reset form after successful submission
        setFormData({
          service: {
            packageId: selectedPackage?.id || "",
            packageName: selectedPackage?.name || "",
            price: selectedPackage?.price || 0,
            quantity: 1,
          },
          customer: {
            name: "",
            phone: "",
            address: "",
            specialRequests: "",
          },
          location: "home",
          timing: "asap",
        });

        // Close modal after showing success message
        setTimeout(() => {
          setIsSuccess(false);
          setCurrentStep(1);
          onClose();
        }, 3000);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      alert("Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại sau.");
      console.error("Error submitting booking:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (section: keyof BookingFormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]:
        typeof prev[section] === "object"
          ? { ...prev[section], ...data }
          : data,
    }));
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
            <h2 className="text-xl font-bold mb-2">Đặt lịch xét nghiệm</h2>

            {/* Progress Bar */}
            {!isSuccess && (
              <>
                <div className="flex items-center gap-2 mt-4">
                  {Array.from({ length: totalSteps }, (_, i) => (
                    <div key={i} className="flex-1">
                      <div
                        className={`h-1 rounded-full transition-colors ${i + 1 <= currentStep ? "bg-white" : "bg-white/30"
                          }`}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm mt-2 opacity-90">
                  Bước {currentStep} / {totalSteps}
                </p>
              </>
            )}
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
                  <h3 className="text-lg font-semibold text-green-600 mb-2">Đặt lịch thành công!</h3>
                  <p className="text-gray-600">Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận lịch hẹn.</p>
                </div>
              </div>
            ) : (
              <>
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold mb-4">1. Gói dịch vụ</h3>

                    {(selectedPackage || formData.service.packageName) && (
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <img
                            src={selectedPackage?.icon || "/images/icons/default-test.svg"}
                            alt={selectedPackage?.name || formData.service.packageName}
                            className="w-12 h-12 rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm mb-1">
                              {selectedPackage?.name || formData.service.packageName}
                            </h4>
                            <p className="text-primary-500 font-bold">
                              {formatPrice(selectedPackage?.price || formData.service.price)} VND
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <span className="text-sm text-gray-600">Số lượng:</span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateFormData("service", {
                                  quantity: Math.max(
                                    1,
                                    formData.service.quantity - 1
                                  ),
                                })
                              }
                              className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="w-8 text-center">
                              {formData.service.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateFormData("service", {
                                  quantity: formData.service.quantity + 1,
                                })
                              }
                              className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4 pt-4 border-t">
                          <span className="font-medium">Tổng:</span>
                          <span className="font-bold text-primary-500">
                            {formatPrice(
                              (selectedPackage?.price || formData.service.price) * formData.service.quantity
                            )}{" "}
                            VND
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Show message if no package is selected */}
                    {!selectedPackage && !formData.service.packageName && (
                      <div className="border border-gray-200 rounded-lg p-4 text-center text-gray-500">
                        <p>Không có gói xét nghiệm nào được chọn</p>
                        <p className="text-sm mt-1">Vui lòng chọn gói xét nghiệm trước khi đặt lịch</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Customer Information */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold mb-4">
                      2. Người xét nghiệm
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chọn người xét nghiệm
                        </label>
                        <div className="relative">
                          <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white">
                            <option>Chọn người xét nghiệm</option>
                            <option>Tôi</option>
                            <option>Người thân</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Họ tên
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          placeholder="Nhập họ tên"
                          value={formData.customer.name}
                          onChange={(e) =>
                            updateFormData("customer", { name: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Số điện thoại
                        </label>
                        <input
                          type="tel"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          placeholder="Nhập số điện thoại"
                          value={formData.customer.phone}
                          onChange={(e) =>
                            updateFormData("customer", { phone: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Chọn địa điểm của bạn
                        </label>
                        <div className="relative">
                          <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white">
                            <option>Chọn địa điểm</option>
                            <option>Nhà riêng</option>
                            <option>Văn phòng</option>
                            <option>Khác</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Yêu cầu khác nếu có
                        </label>
                        <textarea
                          className="w-full p-3 border border-gray-300 rounded-lg h-20 resize-none"
                          placeholder="Nhập yêu cầu khác nếu có"
                          value={formData.customer.specialRequests}
                          onChange={(e) =>
                            updateFormData("customer", {
                              specialRequests: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Location */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold mb-4">
                      3. Địa điểm lấy mẫu
                    </h3>

                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="location"
                          value="home"
                          checked={formData.location === "home"}
                          onChange={(e) =>
                            updateFormData("location", e.target.value)
                          }
                          className="text-primary-500"
                        />
                        <MapPin className="w-5 h-5 text-primary-500" />
                        <div>
                          <div className="font-medium">Lấy mẫu tại nhà</div>
                          <div className="text-sm text-gray-600">
                            Nhập địa chỉ bạn muốn lấy mẫu
                          </div>
                        </div>
                      </label>

                      {formData.location === "home" && (
                        <div className="ml-8 space-y-2">
                          <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="Nhập địa chỉ chi tiết"
                            value={formData.customer.address}
                            onChange={(e) =>
                              updateFormData("customer", {
                                address: e.target.value,
                              })
                            }
                          />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Timing */}
                {currentStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-semibold mb-4">
                      4. Thời gian lấy mẫu
                    </h3>

                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="timing"
                          value="asap"
                          checked={formData.timing === "asap"}
                          onChange={(e) => updateFormData("timing", e.target.value)}
                          className="text-primary-500"
                        />
                        <Clock className="w-5 h-5 text-primary-500" />
                        <div>
                          <div className="font-medium">Càng sớm càng tốt</div>
                          <div className="text-sm text-gray-600">
                            Chúng tôi sẽ liên hệ để sắp xếp thời gian phù hợp
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="timing"
                          value="scheduled"
                          checked={formData.timing === "scheduled"}
                          onChange={(e) => updateFormData("timing", e.target.value)}
                          className="text-primary-500"
                        />
                        <Clock className="w-5 h-5 text-primary-500" />
                        <div>
                          <div className="font-medium">Chọn ngày giờ</div>
                          <div className="text-sm text-gray-600">
                            Chọn thời gian cụ thể bạn muốn lấy mẫu
                          </div>
                        </div>
                      </label>

                      {formData.timing === "scheduled" && (
                        <div className="ml-8 space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Ngày
                            </label>
                            <input
                              type="date"
                              className="w-full p-3 border border-gray-300 rounded-lg"
                              value={formData.scheduledDate || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  scheduledDate: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Giờ
                            </label>
                            <input
                              type="time"
                              className="w-full p-3 border border-gray-300 rounded-lg"
                              value={formData.scheduledTime || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  scheduledTime: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {!isSuccess && (
            <div className="p-6 border-t bg-gray-50">
              <div className="flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    onClick={handlePrevious}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
                    disabled={isSubmitting}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Quay lại
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    className="flex items-center gap-2"
                    disabled={isSubmitting}
                  >
                    Tiếp theo
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-primary-500 hover:bg-primary-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Đang xử lý...
                      </div>
                    ) : (
                      "Đặt lịch ngay"
                    )}
                  </Button>
                )}
              </div>

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

export default BookingModal;
