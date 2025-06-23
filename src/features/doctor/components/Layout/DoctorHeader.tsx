import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import {
    BellIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';
import Logo from '@/assets/Images/favicon_transparent.png';

const DoctorHeader = () => {
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
            title: 'Lịch hẹn mới',
            message: 'Bệnh nhân Nguyễn Văn A đã đặt lịch hẹn lúc 14:00',
            time: '5 phút trước',
            isRead: false
        },
        {
            id: '2',
            title: 'Nhắc nhở',
            message: 'Cuộc họp khoa sẽ bắt đầu trong 30 phút',
            time: '25 phút trước',
            isRead: false
        },
        {
            id: '3',
            title: 'Kết quả xét nghiệm',
            message: 'Kết quả xét nghiệm của bệnh nhân Trần Thị B đã có',
            time: '1 giờ trước',
            isRead: true
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
                                <p className="text-xs text-gray-500">Doctor Portal</p>
                            </div>
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
                                        {state.auth.user?.name || 'Bác sĩ'}
                                    </p>
                                    <p className="text-xs text-gray-500">Bác sĩ</p>
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
                                                navigate('/doctor/settings');
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

export default DoctorHeader;