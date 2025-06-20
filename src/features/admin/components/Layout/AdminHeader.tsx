import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { useApp } from '@/store/AppContext';
import Logo from '@/assets/Images/favicon_transparent.png';

const AdminHeader = () => {
  const navigate = useNavigate();
  const { state, logout } = useApp();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll detection for blur effect (similar to main header)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const notifications = [
    { id: 1, message: '5 phòng khám mới đăng ký', time: '5 phút trước', type: 'info' },
    { id: 2, message: 'Lỗi thanh toán cần xử lý', time: '10 phút trước', type: 'error' },
    { id: 3, message: 'Báo cáo tháng đã sẵn sàng', time: '1 giờ trước', type: 'success' },
  ];

  return (
    <header className={`${isScrolled ? 'admin-header-glass-scrolled' : 'admin-header-glass-transparent'} fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b border-white/20 shadow-lg' : ''}`}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section - Logo & Title */}
        <div className="flex items-center space-x-4">
          <img
            src={Logo}
            alt="MEDVIET Admin"
            className="w-10 h-10 cursor-pointer"
            onClick={() => navigate('/admin')}
          />

          <div>
            <h1 className={`text-xl font-bold ${isScrolled ? 'text-white' : 'text-primary'}`}>MEDVIET Admin</h1>
            <p className={`text-sm ${isScrolled ? 'text-white/80' : 'text-primary/80'}`}>Hệ thống quản trị</p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <MagnifyingGlassIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isScrolled ? 'text-white/60' : 'text-primary/60'}`} />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className={`w-full pl-10 pr-4 py-2 ${isScrolled
                ? 'bg-white/10 border-white/20 text-white placeholder-white/60 focus:ring-white/30 focus:border-white/40 hover:bg-white/15'
                : 'bg-primary/10 border-primary/20 text-primary placeholder-primary/60 focus:ring-primary/30 focus:border-primary/40 hover:bg-primary/15'
                } border rounded-lg focus:outline-none focus:ring-2 backdrop-blur-sm transition-all duration-200`}
            />
          </div>
        </div>

        {/* Right Section - Actions & User */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`relative p-2 ${isScrolled
                ? 'text-white/80 hover:text-white hover:bg-white/10'
                : 'text-primary/80 hover:text-primary hover:bg-primary/10'
                } rounded-lg transition-colors`}
            >
              <BellIcon className="w-6 h-6" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Thông báo</h3>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${notification.type === 'error' ? 'bg-red-500' :
                          notification.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                          }`} />

                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <button className="w-full text-center text-sm text-primary hover:text-primary-dark">
                    Xem tất cả thông báo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Settings */}
          <button className={`p-2 ${isScrolled
            ? 'text-white/80 hover:text-white hover:bg-white/10'
            : 'text-primary/80 hover:text-primary hover:bg-primary/10'
            } rounded-lg transition-colors`}>
            <Cog6ToothIcon className="w-6 h-6" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center space-x-3 p-2 ${isScrolled
                ? 'text-white/80 hover:text-white hover:bg-white/10'
                : 'text-primary/80 hover:text-primary hover:bg-primary/10'
                } rounded-lg transition-colors`}
            >
              <UserCircleIcon className="w-8 h-8" />
              <div className="text-left hidden md:block">
                <p className={`text-sm font-medium ${isScrolled ? 'text-white' : 'text-primary'}`}>
                  {state.auth.user?.name || 'Admin User'}
                </p>

                <p className={`text-xs ${isScrolled ? 'text-white/60' : 'text-primary/60'}`}>Quản trị viên</p>
              </div>

              <ChevronDownIcon className="w-4 h-4" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    {state.auth.user?.name || 'Admin User'}
                  </p>

                  <p className="text-xs text-gray-500">admin@medviet.com</p>
                </div>

                <div className="py-2">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                    <UserCircleIcon className="w-4 h-4" />
                    <span>Hồ sơ cá nhân</span>
                  </button>

                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                    <Cog6ToothIcon className="w-4 h-4" />
                    <span>Cài đặt</span>
                  </button>

                  <hr className="my-2" />

                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <ArrowRightOnRectangleIcon className="w-4 h-4" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
