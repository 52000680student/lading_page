"use client";

import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";

const models = [
  { name: "Liên hệ", path: "contact" },
  { name: "Địa điểm", path: "location" },
  { name: "Gói xét nghiệm", path: "testpackage" },
  { name: "Danh mục xét nghiệm", path: "testcategory" },
  { name: "Quy trình", path: "process" },
  { name: "Ưu điểm", path: "advantage" },
  { name: "Điều hướng", path: "navigation" },
  { name: "Danh mục FAQ", path: "faqcategory" },
  { name: "Danh mục thông tin sức khỏe", path: "healthinfocategory" },
  { name: "Mạng xã hội", path: "socialmedia" },
  { name: "Trang pháp lý", path: "legalpage" },
  { name: "Hình ảnh", path: "images" },
  { name: "Dữ liệu ứng dụng", path: "appdata" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Mô hình dữ liệu
          </h2>
          <p className="text-gray-600">Quản lý các dữ liệu trong hệ thống</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {models.map((model) => (
            <Link
              key={model.path}
              href={`/admin/${model.path}`}
              className="group block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 shadow-md hover:shadow-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-200">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 7v10c0 2.21 1.79 4 4 4h8c2.21 0 4-1.79 4-4V7c0-2.21-1.79-4-4-4H8c-2.21 0-4 1.79-4 4z"
                    />
                  </svg>
                </div>
                <svg
                  className="w-4 h-4 text-blue-400 group-hover:text-blue-600 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors duration-200">
                {model.name}
              </h3>
              <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-200">
                Quản lý dữ liệu {model.name.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
