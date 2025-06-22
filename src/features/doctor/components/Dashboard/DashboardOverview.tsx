import { useState, useEffect } from 'react';
import {
    CalendarDaysIcon,
    UserGroupIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    ChartBarIcon
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
        totalAppointments: 12,
        completedAppointments: 8,
        pendingAppointments: 3,
        cancelledAppointments: 1,
        totalPatients: 45,
        newPatients: 3
    };

    const upcomingAppointments = [
        {
            id: '1',
            patientName: 'Nguyễn Văn A',
            time: '14:00',
            type: 'Khám tổng quát',
            status: 'scheduled'
        },
        {
            id: '2',
            patientName: 'Trần Thị B',
            time: '14:30',
            type: 'Tái khám',
            status: 'scheduled'
        },
        {
            id: '3',
            patientName: 'Lê Văn C',
            time: '15:00',
            type: 'Khám chuyên khoa',
            status: 'scheduled'
        }
    ];

    const recentActivities = [
        {
            id: '1',
            action: 'Hoàn thành khám bệnh',
            patient: 'Phạm Thị D',
            time: '13:30',
            type: 'completed'
        },
        {
            id: '2',
            action: 'Cập nhật hồ sơ bệnh án',
            patient: 'Hoàng Văn E',
            time: '13:15',
            type: 'updated'
        },
        {
            id: '3',
            action: 'Kê đơn thuốc',
            patient: 'Vũ Thị F',
            time: '13:00',
            type: 'prescription'
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

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary to-ocean-dark text-white rounded-lg p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Chào mừng, Bác sĩ!</h1>
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
                            <p className="text-sm font-medium text-gray-600">Đã hoàn thành</p>
                            <p className="text-2xl font-bold text-gray-900">{todayStats.completedAppointments}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-yellow-100 rounded-lg">
                            <ClockIcon className="w-6 h-6 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Đang chờ</p>
                            <p className="text-2xl font-bold text-gray-900">{todayStats.pendingAppointments}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-lg">
                            <UserGroupIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Tổng bệnh nhân</p>
                            <p className="text-2xl font-bold text-gray-900">{todayStats.totalPatients}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Appointments */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">Lịch hẹn sắp tới</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {upcomingAppointments.map((appointment) => (
                                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                            <span className="text-white font-medium text-sm">
                                                {appointment.patientName.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{appointment.patientName}</p>
                                            <p className="text-sm text-gray-600">{appointment.type}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">{appointment.time}</p>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            Đã lên lịch
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4">
                            <button className="w-full text-center text-primary font-medium hover:underline">
                                Xem tất cả lịch hẹn
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
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'completed' ? 'bg-green-100' :
                                        activity.type === 'updated' ? 'bg-blue-100' : 'bg-orange-100'
                                        }`}>
                                        {activity.type === 'completed' && <CheckCircleIcon className="w-4 h-4 text-green-600" />}
                                        {activity.type === 'updated' && <ChartBarIcon className="w-4 h-4 text-blue-600" />}
                                        {activity.type === 'prescription' && <ExclamationTriangleIcon className="w-4 h-4 text-orange-600" />}
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
        </div>
    );
};

export default DashboardOverview;