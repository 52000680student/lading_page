'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Search, Eye, EyeOff, User, Lock, Calendar, LogOut } from 'lucide-react';
import Button from '@/components/ui/Button';
import { saveToken, getValidToken, removeToken, getCompanyId } from '@/utils/auth';
import { loginPartner, fetchResults, formatDateForApi } from '@/utils/partnerApi';
import DetailedResultView from '@/components/DetailedResultView';

interface PartnerLookupProps {
  onBack: () => void;
}

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

const PartnerLookup: React.FC<PartnerLookupProps> = ({ onBack }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State for detailed view
  const [selectedResultId, setSelectedResultId] = useState<number | null>(null);
  const [showDetailedView, setShowDetailedView] = useState(false);

  // Constants for result states based on enum values
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
    // Map state numbers to Vietnamese display names
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

  // Convert API date format (yyyy/MM/dd) to input date format (yyyy-MM-dd)
  const convertApiDateToFormat = (apiDate: string): string => {
    if (!apiDate) return '';
    return apiDate.replace(/\//g, '-');
  };

  // State management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
  
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  // Initialize from URL params
  useEffect(() => {
    const search = searchParams.get('search');
    const start = searchParams.get('startDate');
    const end = searchParams.get('endDate');
    
    setSearchValue(search || '');
    
    // Convert URL dates from API format (yyyy/MM/dd) to input format (yyyy-MM-dd)
    const todayFormatted = convertApiDateToFormat(getTodayDate());
    setStartDate(start ? convertApiDateToFormat(decodeURIComponent(start)) : todayFormatted);
    setEndDate(end ? convertApiDateToFormat(decodeURIComponent(end)) : todayFormatted);
    
    setParamsInitialized(true);
  }, [searchParams]);

  // Check login status and load initial results
  useEffect(() => {
    if (!paramsInitialized) return;
    
    const token = getValidToken();
    if (token) {
      setIsLoggedIn(true);
      loadResults(1, true);
    }
  }, [paramsInitialized]);

  // Debounced search
  useEffect(() => {
    if (!isLoggedIn || !paramsInitialized) return;
    
    const timeoutId = setTimeout(() => {
      // Convert input dates to API format for URL and API calls
      const apiStartDate = convertApiDateToFormat(startDate);
      const apiEndDate = convertApiDateToFormat(endDate);
      
      updateUrlParams({ search: searchValue, startDate: apiStartDate, endDate: apiEndDate });
      loadResults(1, true);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchValue, isLoggedIn, paramsInitialized]);

  // Date change effect
  useEffect(() => {
    if (!isLoggedIn || !paramsInitialized) return;
    
    // Convert input dates to API format for URL and API calls
    const apiStartDate = convertApiDateToFormat(startDate);
    const apiEndDate = convertApiDateToFormat(endDate);
    
    updateUrlParams({ search: searchValue, startDate: apiStartDate, endDate: apiEndDate });
    loadResults(1, true);
  }, [startDate, endDate, isLoggedIn, paramsInitialized]);

  // Intersection observer for infinite scroll
  const lastResultElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoadingResults) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadResults(currentPage + 1, false);
      }
    });
    if (node) observerRef.current.observe(node);
  }, [isLoadingResults, hasMore, currentPage]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.username.trim() || !loginData.password.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin đăng nhập');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await loginPartner(loginData);
      saveToken(response);
      setIsLoggedIn(true);
      loadResults(1, true);
    } catch (error) {
      console.error('Login error:', error);
      alert('Mật khẩu hoặc tài khoản không đúng, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const loadResults = async (page: number, reset: boolean = false) => {
    const token = getValidToken();
    const companyId = getCompanyId();
    
    if (!token || !companyId) {
      handleLogout();
      return;
    }
    
    setIsLoadingResults(true);
    try {
      const params = {
        search: searchValue,
        page,
        size: 50,
        start: convertApiDateToFormat(startDate),
        end: convertApiDateToFormat(endDate),
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
  };

  const updateUrlParams = (params: { search?: string; startDate?: string; endDate?: string }) => {
    const url = new URL(window.location.href);
    
    if (params.search !== undefined) {
      if (params.search) {
        url.searchParams.set('search', params.search);
      } else {
        url.searchParams.delete('search');
      }
    }
    
    if (params.startDate) url.searchParams.set('startDate', params.startDate);
    if (params.endDate) url.searchParams.set('endDate', params.endDate);
    
    router.replace(url.pathname + url.search, { scroll: false });
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setResults([]);
    setCurrentPage(0);
    setHasMore(true);
    setSearchValue('');
    const today = convertApiDateToFormat(getTodayDate());
    setStartDate(today);
    setEndDate(today);
    setLoginData({ username: '', password: '' });
  };

  const handleResultClick = (resultId: number) => {
    setSelectedResultId(resultId);
    setShowDetailedView(true);
  };

  const handleBackToList = () => {
    setShowDetailedView(false);
    setSelectedResultId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  // Show detailed view if selected
  if (showDetailedView && selectedResultId) {
    return (
      <DetailedResultView
        resultId={selectedResultId} 
        onBack={handleBackToList}
        isCustomer={false} 
      />
    );
  }

  return (
    <div className={`mx-auto ${isLoggedIn ? 'max-w-6xl' : 'max-w-2xl'}`}>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Quay lại</span>
      </button>

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Tra Cứu Kết Quả - Đối Tác
        </h2>
        <p className="text-gray-600">
          {!isLoggedIn ? 'Đăng nhập để tra cứu kết quả xét nghiệm' : 'Nhập mã tra cứu để xem kết quả'}
        </p>
      </div>

      {!isLoggedIn ? (
        /* Login Form */
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Đăng Nhập Đối Tác</h3>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Tên đăng nhập
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  value={loginData.username}
                  onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Nhập tên đăng nhập"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Nhập mật khẩu"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !loginData.username.trim() || !loginData.password.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Đang đăng nhập...</span>
                </span>
              ) : (
                'Đăng Nhập'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Chưa có tài khoản đối tác?{' '}
              <a href="/contact" className="text-blue-600 hover:text-blue-800 font-semibold">
                Liên hệ đăng ký
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Quên mật khẩu?{' '}
              <button className="text-blue-600 hover:text-blue-800 font-semibold">
                Khôi phục
              </button>
            </p>
          </div>
        </div>
      ) : (
        /* Results Dashboard */
        <div className="flex flex-col space-y-4 h-[calc(100vh-120px)]">
          {/* Welcome message */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <p className="text-blue-800">
                <span className="font-semibold">Chào mừng!</span> Bạn đã đăng nhập thành công.
              </p>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Đăng xuất</span>
              </button>
            </div>
          </div>

          {/* Search and Filter Controls */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tìm kiếm
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tên bệnh nhân hoặc SID..."
                  />
                </div>
              </div>

              {/* Start Date */}
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* End Date */}
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
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex-1 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Danh Sách Kết Quả ({results.length} kết quả)
              </h3>
            </div>
            
            <div className="overflow-y-auto h-full">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-gray-600">Đang tải kết quả...</span>
                  </div>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {results.length === 0 && !isLoadingResults ? (
                    <div className="p-8 text-center text-gray-500">
                      <div className="text-4xl mb-4">🔍</div>
                      <p className="text-lg font-medium mb-2">Không tìm thấy kết quả</p>
                      <p className="text-sm">Thử thay đổi từ khóa tìm kiếm hoặc khoảng thời gian</p>
                    </div>
                  ) : (
                    results.map((result, index) => {
                      const isLast = index === results.length - 1;
                      const { displayName, colorClass } = getStatusInfo(result.state);
                      
                      return (
                        <div
                          key={result.id}
                          ref={isLast ? lastResultElementRef : null}
                          onClick={() => handleResultClick(result.id)}
                          className="p-6 hover:bg-gray-50 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3 mb-3">
                                <h4 className="text-lg font-semibold text-gray-900 truncate">
                                  {result.patientName}
                                </h4>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
                                  {(() => {
                                    const statusInfo = getStatusInfo(result.state);
                                    return (
                                      <>
                                        <span className="mr-1">{statusInfo.icon}</span>
                                        {statusInfo.displayName}
                                      </>
                                    );
                                  })()} 
                                </span>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                <div>
                                  <span className="font-medium">SID:</span> {result.sid}
                                </div>
                                <div>
                                  <span className="font-medium">Ngày sinh:</span> {formatDate(result.dob)}
                                </div>
                                <div>
                                  <span className="font-medium">Khoa:</span> {result.departmentName}
                                </div>
                                <div>
                                  <span className="font-medium">Ngày yêu cầu:</span> {formatDate(result.requestDate)}
                                </div>
                                <div>
                                  <span className="font-medium">Loại dịch vụ:</span> {result.serviceTypeName}
                                </div>
                                {result.address && (
                                  <div className="md:col-span-3">
                                    <span className="font-medium">Địa chỉ:</span> {result.address}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-blue-600 group-hover:text-blue-800 transition-colors">
                              <Eye className="w-5 h-5" />
                              <span className="text-sm font-medium">Xem chi tiết</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  
                  {isLoadingResults && (
                    <div className="p-6 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-600">Đang tải thêm kết quả...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          {!isLoggedIn ? 'Hướng Dẫn Đăng Nhập' : 'Hướng Dẫn Sử Dụng'}
        </h3>
        {!isLoggedIn ? (
          <ul className="text-blue-700 space-y-2">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Sử dụng tài khoản đối tác đã được cấp</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Nhập đúng mật khẩu để truy cập hệ thống</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Liên hệ hotline 0843.179.579 nếu cần hỗ trợ</span>
            </li>
          </ul>
        ) : (
          <ul className="text-blue-700 space-y-2">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Sử dụng ô tìm kiếm để tìm theo tên bệnh nhân hoặc mã SID</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Chọn khoảng thời gian để lọc kết quả theo ngày</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Cuộn xuống để tải thêm kết quả (tự động tải)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Phiên đăng nhập sẽ được lưu để sử dụng lần sau</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default PartnerLookup;
