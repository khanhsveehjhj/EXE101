import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import {
    BellIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    ChevronDownIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import Logo from '@/assets/Images/favicon_transparent.png';

const ReceptionistHeader = () => {
    const navigate = useNavigate();
    const { state, logout } = useApp();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const mockNotifications = [
        {
            id: '1',
            title: 'Bệnh nhân chờ check-in',
            message: 'Nguyễn Văn A đã đến và đang chờ check-in',
            time: '2 phút trước',
            isRead: false,
            type: 'checkin'
        },
        {
            id: '2',
            title: 'Lịch hẹn mới',
            message: 'Có lịch hẹn mới được đặt cho ngày mai',
            time: '15 phút trước',
            isRead: false,
            type: 'appointment'
        },
        {
            id: '3',
            title: 'Thanh toán hoàn tất',
            message: 'Bệnh nhân Trần Thị B đã hoàn tất thanh toán',
            time: '30 phút trước',
            isRead: true,
            type: 'payment'
        }
    ];

    const unreadCount = mockNotifications.filter(n => !n.isRead).length;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
            <div className="px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo and Title */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                <img
                                    src={Logo}
                                    alt="Logo"
                                    className="w-8 h-8 object-contain"
                                />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-primary">MEDVIET</h1>
                                <p className="text-xs text-gray-500">Reception Desk</p>
                            </div>
                        </div>
                    </div>

                    {/* Center - Quick Stats */}
                    <div className="hidden md:flex items-center space-x-6">
                        <div className="flex items-center space-x-2 text-sm">
                            <ClockIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-gray-600">
                                {new Date().toLocaleTimeString('vi-VN', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-600">Hàng đợi: </span>
                            <span className="font-semibold text-primary">5 người</span>
                        </div>
                        <div className="text-sm">
                            <span className="text-gray-600">Hôm nay: </span>
                            <span className="font-semibold text-green-600">23 lịch hẹn</span>
                        </div>
                    </div>

                    {/* Right side - Notifications and Profile */}
                    <div className="flex items-center space-x-4">
                        {/* Notifications */}
                        <div className="relative dropdown-container">
                            <button
                                onClick={() => setIsNotificationDropdownOpen(!isNotificationDropdownOpen)}
                                className="relative p-2 text-gray-600 hover:text-primary transition-colors"
                            >
                                <BellIcon className="w-6 h-6" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotificationDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                    <div className="p-4 border-b border-gray-200">
                                        <h3 className="font-semibold text-gray-900">Thông báo</h3>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {mockNotifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${!notification.isRead ? 'bg-blue-50' : ''
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-gray-900 text-sm">
                                                            {notification.title}
                                                        </h4>
                                                        <p className="text-gray-600 text-sm mt-1">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-gray-400 text-xs mt-2">
                                                            {notification.time}
                                                        </p>
                                                    </div>
                                                    {!notification.isRead && (
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-4 border-t border-gray-200">
                                        <button className="text-primary text-sm font-medium hover:underline">
                                            Xem tất cả thông báo
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile Dropdown */}
                        <div className="relative dropdown-container">
                            <button
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                <UserCircleIcon className="w-8 h-8 text-gray-600" />
                                <div className="text-left">
                                    <p className="text-sm font-medium text-gray-900">
                                        {state.auth.user?.name || 'Lễ tân'}
                                    </p>
                                    <p className="text-xs text-gray-500">Lễ tân</p>
                                </div>
                                <ChevronDownIcon className="w-4 h-4 text-gray-600" />
                            </button>

                            {/* Profile Dropdown Menu */}
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                    <div className="py-2">
                                        <button
                                            onClick={() => {
                                                setIsProfileDropdownOpen(false);
                                                navigate('/receptionist/settings');
                                            }}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <Cog6ToothIcon className="w-4 h-4 mr-3" />
                                            Cài đặt tài khoản
                                        </button>
                                        <hr className="my-2" />
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                                            Đăng xuất
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ReceptionistHeader;
