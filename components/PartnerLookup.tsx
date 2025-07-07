'use client';

import { useState } from 'react';
import { ArrowLeft, Search, Eye, EyeOff, User, Lock } from 'lucide-react';
import Button from '@/components/ui/Button';

interface PartnerLookupProps {
  onBack: () => void;
}

const PartnerLookup: React.FC<PartnerLookupProps> = ({ onBack }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [lookupValue, setLookupValue] = useState('');
  
  // Login form state
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginData.username.trim() || !loginData.password.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin đăng nhập');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Replace with actual login API call
      console.log('Partner login:', loginData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any credentials
      setIsLoggedIn(true);
      alert('Đăng nhập thành công!');
      
    } catch (error) {
      console.error('Login error:', error);
      alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!lookupValue.trim()) {
      alert('Vui lòng nhập mã tra cứu');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      console.log('Partner lookup for:', lookupValue);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just show an alert
      alert(`Đang tra cứu mã: ${lookupValue}\n(API chưa được triển khai)`);
      
    } catch (error) {
      console.error('Error during lookup:', error);
      alert('Có lỗi xảy ra trong quá trình tra cứu. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLookupValue('');
    setLoginData({ username: '', password: '' });
  };

  return (
    <div className="max-w-2xl mx-auto">
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
              <label 
                htmlFor="username" 
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Tên đăng nhập / Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  placeholder="Nhập tên đăng nhập hoặc email"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  disabled={isLoading}
                />
                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-semibold text-gray-700 mb-3"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  placeholder="Nhập mật khẩu"
                  className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  disabled={isLoading}
                />
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
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
        /* Lookup Form */
        <div className="space-y-6">
          {/* Welcome message */}
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <p className="text-blue-800">
                <span className="font-semibold">Chào mừng!</span> Bạn đã đăng nhập thành công.
              </p>
              <button
                onClick={handleLogout}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Đăng xuất
              </button>
            </div>
          </div>

          {/* Lookup form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <form onSubmit={handleLookup} className="space-y-6">
              <div>
                <label 
                  htmlFor="lookupCode" 
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  Mã Tra Cứu
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="lookupCode"
                    value={lookupValue}
                    onChange={(e) => setLookupValue(e.target.value)}
                    placeholder="Nhập mã tra cứu (ví dụ: PT2024001)"
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    disabled={isLoading}
                  />
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Mã tra cứu được cung cấp trong email hoặc tin nhắn SMS
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || !lookupValue.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Đang tra cứu...</span>
                  </span>
                ) : (
                  'Tra Cứu Kết Quả'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          {!isLoggedIn ? 'Hướng Dẫn Đăng Nhập' : 'Hướng Dẫn Tra Cứu'}
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
              <span>Mã tra cứu gồm 8-10 ký tự (chữ và số)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Kiểm tra email hoặc SMS để tìm mã tra cứu</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Kết quả sẽ hiển thị ngay sau khi tra cứu thành công</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default PartnerLookup;
