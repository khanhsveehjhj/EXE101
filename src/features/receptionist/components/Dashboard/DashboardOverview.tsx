import { useState, useEffect } from 'react';
import {
    CalendarDaysIcon,
    UserGroupIcon,
    CreditCardIcon,
    QueueListIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

const DashboardOverview = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Mock data for dashboard
    const todayStats = {
        totalAppointments: 23,
        checkedInPatients: 18,
        waitingPatients: 5,
        completedPayments: 15,
        totalRevenue: 125000000,
        newRegistrations: 4
    };

    const queueData = [
        {
            id: '1',
            patientName: 'Nguyễn Văn A',
            appointmentTime: '14:00',
            status: 'waiting',
            waitTime: '15 phút'
        },
        {
            id: '2',
            patientName: 'Trần Thị B',
            appointmentTime: '14:15',
            status: 'in-progress',
            waitTime: '0 phút'
        },
        {
            id: '3',
            patientName: 'Lê Văn C',
            appointmentTime: '14:30',
            status: 'waiting',
            waitTime: '5 phút'
        },
        {
            id: '4',
            patientName: 'Phạm Thị D',
            appointmentTime: '14:45',
            status: 'scheduled',
            waitTime: '-'
        }
    ];

    const recentActivities = [
        {
            id: '1',
            action: 'Check-in hoàn tất',
            patient: 'Hoàng Văn E',
            time: '13:45',
            type: 'checkin'
        },
        {
            id: '2',
            action: 'Thanh toán thành công',
            patient: 'Vũ Thị F',
            time: '13:30',
            type: 'payment'
        },
        {
            id: '3',
            action: 'Đăng ký bệnh nhân mới',
            patient: 'Đỗ Văn G',
            time: '13:15',
            type: 'registration'
        },
        {
            id: '4',
            action: 'Đặt lịch hẹn',
            patient: 'Bùi Thị H',
            time: '13:00',
            type: 'appointment'
        }
    ];

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const getQueueStatusColor = (status: string) => {
        switch (status) {
            case 'waiting':
                return 'bg-yellow-100 text-yellow-800';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800';
            case 'scheduled':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getQueueStatusLabel = (status: string) => {
        switch (status) {
            case 'waiting':
                return 'Đang chờ';
            case 'in-progress':
                return 'Đang khám';
            case 'scheduled':
                return 'Đã lên lịch';
            default:
                return status;
        }
    };

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary to-ocean-dark text-white rounded-lg p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Chào mừng, Lễ tân!</h1>
                        <p className="text-blue-100">
                            {formatDate(currentTime)} - {formatTime(currentTime)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-blue-100 text-sm">Hôm nay</p>
                        <p className="text-2xl font-bold">{todayStats.totalAppointments} lịch hẹn</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-lg">
                            <CalendarDaysIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Lịch hẹn hôm nay</p>
                            <p className="text-2xl font-bold text-gray-900">{todayStats.totalAppointments}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-lg">
                            <CheckCircleIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Đã check-in</p>
                            <p className="text-2xl font-bold text-gray-900">{todayStats.checkedInPatients}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <QueueListIcon className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Đang chờ</p>
                            <p className="text-2xl font-bold text-gray-900">{todayStats.waitingPatients}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <CreditCardIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Doanh thu</p>
                            <p className="text-lg font-bold text-gray-900">{formatCurrency(todayStats.totalRevenue)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Queue Management */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">Hàng đợi hiện tại</h2>
                            <span className="text-sm text-gray-500">{queueData.length} bệnh nhân</span>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {queueData.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                            <span className="text-white font-medium text-sm">
                                                {item.patientName.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{item.patientName}</p>
                                            <p className="text-sm text-gray-600">Lịch hẹn: {item.appointmentTime}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getQueueStatusColor(item.status)}`}>
                                            {getQueueStatusLabel(item.status)}
                                        </span>
                                        <p className="text-xs text-gray-500 mt-1">Chờ: {item.waitTime}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <button className="w-full text-center text-primary font-medium hover:underline">
                                Xem toàn bộ hàng đợi
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-start space-x-3">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'checkin' ? 'bg-green-100' :
                                        activity.type === 'payment' ? 'bg-blue-100' :
                                            activity.type === 'registration' ? 'bg-purple-100' : 'bg-orange-100'
                                        }`}>
                                        {activity.type === 'checkin' && <CheckCircleIcon className="w-4 h-4 text-green-600" />}
                                        {activity.type === 'payment' && <CreditCardIcon className="w-4 h-4 text-blue-600" />}
                                        {activity.type === 'registration' && <UserGroupIcon className="w-4 h-4 text-purple-600" />}
                                        {activity.type === 'appointment' && <CalendarDaysIcon className="w-4 h-4 text-orange-600" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                        <p className="text-sm text-gray-600">Bệnh nhân: {activity.patient}</p>
                                        <p className="text-xs text-gray-400">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <button className="w-full text-center text-primary font-medium hover:underline">
                                Xem tất cả hoạt động
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <CalendarDaysIcon className="w-8 h-8 text-blue-600 mb-2" />
                        <span className="text-sm font-medium text-blue-900">Đặt lịch hẹn</span>
                    </button>
                    <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                        <UserGroupIcon className="w-8 h-8 text-green-600 mb-2" />
                        <span className="text-sm font-medium text-green-900">Đăng ký BN</span>
                    </button>
                    <button className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                        <CheckCircleIcon className="w-8 h-8 text-yellow-600 mb-2" />
                        <span className="text-sm font-medium text-yellow-900">Check-in</span>
                    </button>
                    <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                        <CreditCardIcon className="w-8 h-8 text-purple-600 mb-2" />
                        <span className="text-sm font-medium text-purple-900">Thanh toán</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;