'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Search, Calendar, LogOut } from 'lucide-react';
import Button from '@/components/ui/Button';
import { getValidToken, removeToken, getCompanyId } from '@/utils/auth';
import { fetchResults, formatDateForApi } from '@/utils/partnerApi';

interface ResultItem {
  id: number;
  createdDate: string;
  sid: string;
  companyId: number;
  requestDate: string;
  patientName: string;
  dob: string;
  departmentName: string;
  stateName: string;
  address: string;
  serviceTypeName: string;
  subState: number;
  state: number;
}

export default function PartnerViewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Constants for result states
  const STATUS_DISPLAY = {
    'Nháp': { color: 'text-gray-600 bg-gray-50', icon: '📝' },
    'Đã tiếp nhận': { color: 'text-blue-600 bg-blue-50', icon: '📥' },
    'Đã hủy': { color: 'text-red-600 bg-red-50', icon: '❌' },
    'Đã lấy mẫu': { color: 'text-green-600 bg-green-50', icon: '🧪' },
    'Đã giao': { color: 'text-purple-600 bg-purple-50', icon: '🚚' },
    'Đã nhận': { color: 'text-blue-600 bg-blue-50', icon: '📥' },
    'Tạm dừng': { color: 'text-yellow-600 bg-yellow-50', icon: '⏸️' },
    'RDS': { color: 'text-orange-600 bg-orange-50', icon: '🔄' },
    'Đang p.tích': { color: 'text-indigo-600 bg-indigo-50', icon: '⚙️' },
    'Đã có KQ': { color: 'text-teal-600 bg-teal-50', icon: '📊' },
    'Đã X.nhận': { color: 'text-emerald-600 bg-emerald-50', icon: '✅' },
    'Đã phê duyệt': { color: 'text-emerald-600 bg-emerald-50', icon: '✅' },
    'Đang gửi KQ': { color: 'text-cyan-600 bg-cyan-50', icon: '📤' },
    'Đã ký số': { color: 'text-violet-600 bg-violet-50', icon: '✍️' },
    'Đã gửi KQ': { color: 'text-green-700 bg-green-100', icon: '📧' }
  };

  const getStatusInfo = (state: number) => {
    const stateMapping: { [key: number]: string } = {
      0: "Nháp",
      1: "Đã tiếp nhận",
      2: "Đã hủy",
      3: "Đã lấy mẫu",
      4: "Đã giao",
      5: "Đã nhận",
      6: "Tạm dừng",
      61: "RDS",
      7: "Đang p.tích",
      8: "Đã có KQ",
      9: "Đã X.nhận",
      90: "Đã phê duyệt",
      93: "Đang gửi KQ",
      95: "Đã ký số",
      99: "Đã gửi KQ"
    };
    
    const displayName = stateMapping[state] || "Không xác định";
    const displayInfo = STATUS_DISPLAY[displayName as keyof typeof STATUS_DISPLAY];
    
    return {
      displayName,
      colorClass: displayInfo?.color || 'text-gray-600 bg-gray-50',
      icon: displayInfo?.icon || '📋'
    };
  };

  const getTodayDate = () => {
    const today = new Date();
    return formatDateForApi(today);
  };

  const convertApiDateToFormat = (apiDate: string): string => {
    if (!apiDate) return '';
    return apiDate.replace(/\//g, '-');
  };

  // State management
  const [searchValue, setSearchValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [results, setResults] = useState<ResultItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [paramsInitialized, setParamsInitialized] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastResultRef = useRef<HTMLDivElement | null>(null);

  // Check authentication
  useEffect(() => {
    const token = getValidToken();
    if (!token) {
      router.replace('/results/partner/login');
    }
  }, [router]);

  // Initialize from URL params
  useEffect(() => {
    const search = searchParams.get('search');
    const start = searchParams.get('startDate');
    const end = searchParams.get('endDate');
    
    setSearchValue(search || '');
    
    const todayFormatted = convertApiDateToFormat(getTodayDate());
    setStartDate(start ? convertApiDateToFormat(decodeURIComponent(start)) : todayFormatted);
    setEndDate(end ? convertApiDateToFormat(decodeURIComponent(end)) : todayFormatted);
    
    setParamsInitialized(true);
  }, [searchParams]);

  // Load initial results
  useEffect(() => {
    if (!paramsInitialized) return;
    loadResults(1, true);
  }, [paramsInitialized]);

  // Debounced search
  useEffect(() => {
    if (!paramsInitialized) return;
    
    const timeoutId = setTimeout(() => {
      loadResults(1, true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue, startDate, endDate, paramsInitialized]);

  const loadResults = useCallback(async (page: number, reset: boolean = false) => {
    if (isLoadingResults) return;
    
    const token = getValidToken();
    const companyId = getCompanyId();
    
    if (!token || !companyId) {
      router.replace('/results/partner/login');
      return;
    }
    
    setIsLoadingResults(true);
    try {
      const searchDate = startDate ? startDate.replace(/-/g, '/') : getTodayDate();
      const endSearchDate = endDate ? endDate.replace(/-/g, '/') : getTodayDate();
      
      const params = {
        search: searchValue.trim(),
        page,
        size: 20,
        start: searchDate,
        end: endSearchDate,
        companyId
      };
      
      const response = await fetchResults(params, token);
      
      if (reset) {
        setResults(response.data);
        setCurrentPage(1);
      } else {
        setResults(prev => [...prev, ...response.data]);
        setCurrentPage(page);
      }
      
      setHasMore(!response.last);
    } catch (error) {
      console.error('Error loading results:', error);
      if (error instanceof Error && error.message === 'Token expired') {
        handleLogout();
      } else {
        alert('Có lỗi xảy ra khi tải kết quả. Vui lòng thử lại.');
      }
    } finally {
      setIsLoadingResults(false);
    }
  }, [searchValue, startDate, endDate, isLoadingResults, router]);

  // Infinite scroll
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingResults) {
          loadResults(currentPage + 1, false);
        }
      },
      { threshold: 0.1 }
    );

    if (lastResultRef.current) {
      observerRef.current.observe(lastResultRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, isLoadingResults, currentPage, loadResults]);

  const handleLogout = () => {
    removeToken();
    router.push('/results/partner/login');
  };

  const handleBack = () => {
    router.push('/results');
  };

  const handleResultClick = (result: ResultItem) => {
    // Create PatientInfo object from ResultItem
    const patientInfo = {
      fullName: result.patientName,
      address: result.address,
      sid: result.sid,
      phoneNumber: '', // Not available in ResultItem, will be empty
      requestDate: formatDate(result.requestDate),
      dateOfBirth: formatDate(result.dob),
      gender: '' // Not available in ResultItem, will be empty
    };
    
    // Encode patient info as URL search params
    const searchParams = new URLSearchParams({
      patientInfo: JSON.stringify(patientInfo)
    });
    
    router.push(`/results/partner/view/detail/${result.id}?${searchParams.toString()}`);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header with Back and Logout */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={handleBack}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Quay lại</span>
            </button>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Đăng xuất</span>
            </button>
          </div>

          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Tra Cứu Kết Quả - Đối Tác
            </h1>
            <p className="text-gray-600">
              Nhập mã tra cứu để xem kết quả
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mã tra cứu
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Nhập mã tra cứu, tên bệnh nhân..."
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Từ ngày
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Đến ngày
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {results.length === 0 && !isLoadingResults ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy kết quả</h3>
                <p className="text-gray-600">Vui lòng thử lại với từ khóa khác hoặc điều chỉnh khoảng thời gian tìm kiếm.</p>
              </div>
            ) : (
              results.map((result, index) => {
                const statusInfo = getStatusInfo(result.state);
                const isLast = index === results.length - 1;
                
                return (
                  <div
                    key={result.id}
                    ref={isLast ? lastResultRef : null}
                    onClick={() => handleResultClick(result)}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{result.sid}</h3>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.colorClass}`}>
                            <span className="mr-1">{statusInfo.icon}</span>
                            {statusInfo.displayName}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-1">
                          <span className="font-medium">Bệnh nhân:</span> {result.patientName}
                        </p>
                        <p className="text-gray-600 mb-1">
                          <span className="font-medium">Ngày sinh:</span> {formatDate(result.dob)}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Dịch vụ:</span> {result.serviceTypeName}
                        </p>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>Ngày tạo: {formatDate(result.createdDate)}</p>
                        <p>Ngày yêu cầu: {formatDate(result.requestDate)}</p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-3">
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>{result.departmentName}</span>
                        <span>{result.address}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            
            {isLoadingResults && (
              <div className="text-center py-8">
                <div className="inline-flex items-center space-x-2 text-blue-600">
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang tải...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}