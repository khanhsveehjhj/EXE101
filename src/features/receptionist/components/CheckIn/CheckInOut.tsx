import { useState, useEffect } from 'react';
import {
    ClipboardDocumentListIcon,
    ClockIcon,
    UserIcon,
    PhoneIcon,
    CheckCircleIcon,
    XCircleIcon,
    BellIcon,
    QueueListIcon,
    CalendarDaysIcon,
    ArrowPathIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';
import RealTimeQueue from '@/features/shared/components/Queue/RealTimeQueue';
import useQueue from '@/features/shared/hooks/useQueue';

const CheckInOut = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'queue'>('list');

    // Use shared hooks
    const {
        queueItems,
        notifications,
        loading,
        updateQueueStatus,
        moveQueueItem,
        updateEstimatedCallTime,
        getQueueStats,
        clearNotifications,
        refreshQueue
    } = useQueue();

    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(timer);
    }, []);

    // Filter queue items based on search and status
    const filteredPatients = queueItems.filter(patient => {
        const matchesSearch = patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.patientPhone.includes(searchTerm);
        const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'bg-gray-100 text-gray-800';
            case 'arrived':
                return 'bg-blue-100 text-blue-800';
            case 'waiting':
                return 'bg-yellow-100 text-yellow-800';
            case 'in-consultation':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-purple-100 text-purple-800';
            case 'no-show':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'scheduled':
                return 'Đã lên lịch';
            case 'arrived':
                return 'Đã đến';
            case 'waiting':
                return 'Đang chờ';
            case 'in-consultation':
                return 'Đang khám';
            case 'completed':
                return 'Hoàn thành';
            case 'no-show':
                return 'Không đến';
            default:
                return status;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent':
                return 'bg-red-500';
            case 'high':
                return 'bg-orange-500';
            case 'medium':
                return 'bg-yellow-500';
            case 'low':
                return 'bg-green-500';
            default:
                return 'bg-gray-500';
        }
    };

    // Handler functions using shared hooks
    const handleCheckIn = (patientId: string) => {
        updateQueueStatus(patientId, 'arrived');
    };

    const handleCheckOut = (patientId: string) => {
        updateQueueStatus(patientId, 'completed');
    };

    const handleStartConsultation = (patientId: string) => {
        updateQueueStatus(patientId, 'in-consultation');
    };

    const handleMarkNoShow = (patientId: string) => {
        updateQueueStatus(patientId, 'no-show');
    };

    // Use queue stats from shared hook
    const queueStats = getQueueStats();

    // Calculate additional stats for compatibility
    const stats = {
        totalToday: queueStats.total,
        checkedIn: queueItems.filter(p => ['arrived', 'waiting', 'in-consultation', 'completed'].includes(p.status)).length,
        waiting: queueStats.waiting,
        inConsultation: queueStats.inConsultation,
        completed: queueItems.filter(p => p.status === 'completed').length,
        noShow: queueItems.filter(p => p.status === 'no-show').length
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="space-y-6">
            {/* Header with real-time stats */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Check-in / Check-out</h1>
                    <p className="text-sm text-gray-600 mt-1">
                        Thời gian hiện tại: {currentTime.toLocaleTimeString('vi-VN')}
                    </p>
                </div>

                <div className="flex items-center space-x-4">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative p-2 text-gray-600 hover:text-primary transition-colors"
                        >
                            <BellIcon className="w-6 h-6" />
                            {notifications.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {notifications.length}
                                </span>
                            )}
                        </button>

                        {showNotifications && notifications.length > 0 && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-900">Thông báo gần đây</h3>
                                </div>
                                <div className="max-h-60 overflow-y-auto">
                                    {notifications.slice(-5).map((notification, index) => (
                                        <div key={index} className="p-3 border-b border-gray-100">
                                            <p className="text-sm text-gray-700">{notification.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {new Date(notification.timestamp).toLocaleTimeString('vi-VN')}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-3">
                                    <button
                                        onClick={clearNotifications}
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Xóa tất cả
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-3">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === 'list'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Danh sách
                            </button>
                            <button
                                onClick={() => setViewMode('queue')}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${viewMode === 'queue'
                                    ? 'bg-white text-gray-900 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Hàng đợi
                            </button>
                        </div>

                        <Button
                            onClick={refreshQueue}
                            disabled={loading}
                            className="bg-primary text-white"
                        >
                            <ArrowPathIcon className="w-4 h-4 mr-2" />
                            {loading ? 'Đang tải...' : 'Làm mới dữ liệu'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Real-time Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <CalendarDaysIcon className="w-8 h-8 text-blue-600" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Tổng hôm nay</p>
                            <p className="text-xl font-bold text-gray-900">{stats.totalToday}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <CheckCircleIcon className="w-8 h-8 text-green-600" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Đã check-in</p>
                            <p className="text-xl font-bold text-gray-900">{stats.checkedIn}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <QueueListIcon className="w-8 h-8 text-yellow-600" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Đang chờ</p>
                            <p className="text-xl font-bold text-gray-900">{stats.waiting}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <UserIcon className="w-8 h-8 text-blue-600" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Đang khám</p>
                            <p className="text-xl font-bold text-gray-900">{stats.inConsultation}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <CheckCircleIcon className="w-8 h-8 text-purple-600" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Hoàn thành</p>
                            <p className="text-xl font-bold text-gray-900">{stats.completed}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                    <div className="flex items-center">
                        <XCircleIcon className="w-8 h-8 text-red-600" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-600">Không đến</p>
                            <p className="text-xl font-bold text-gray-900">{stats.noShow}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tìm kiếm bệnh nhân
                        </label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm theo tên hoặc số điện thoại..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Trạng thái
                        </label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="all">Tất cả</option>
                            <option value="scheduled">Đã lên lịch</option>
                            <option value="arrived">Đã đến</option>
                            <option value="waiting">Đang chờ</option>
                            <option value="in-consultation">Đang khám</option>
                            <option value="completed">Hoàn thành</option>
                            <option value="no-show">Không đến</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Patient List or Queue View */}
            {viewMode === 'queue' ? (
                <RealTimeQueue
                    queueItems={filteredPatients}
                    onUpdateStatus={updateQueueStatus}
                    onMoveUp={(id) => moveQueueItem(id, 'up')}
                    onMoveDown={(id) => moveQueueItem(id, 'down')}
                    onEstimateTime={updateEstimatedCallTime}
                    showActions={true}
                />
            ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Danh sách bệnh nhân hôm nay
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Tổng cộng: {filteredPatients.length} bệnh nhân
                        </p>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {filteredPatients.map((patient) => (
                            <div key={patient.id} className="p-6 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        {/* Priority Indicator */}
                                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(patient.priority)}`}></div>

                                        {/* Patient Info */}
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                                <span className="text-white font-medium">
                                                    {patient.patientName.charAt(0)}
                                                </span>
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <h3 className="font-medium text-gray-900">{patient.patientName}</h3>
                                                    {patient.queuePosition && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            Số thứ tự: {patient.queuePosition}
                                                        </span>
                                                    )}

                                                </div>
                                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                    <span className="flex items-center">
                                                        <PhoneIcon className="w-4 h-4 mr-1" />
                                                        {patient.patientPhone}
                                                    </span>
                                                    <span className="flex items-center">
                                                        <ClockIcon className="w-4 h-4 mr-1" />
                                                        Lịch hẹn: {patient.appointmentTime}
                                                    </span>
                                                    <span>BS: {patient.doctorName}</span>
                                                </div>
                                                <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                                    <span>{patient.type}</span>
                                                    <span>Dự kiến: {patient.estimatedDuration} phút</span>
                                                    {patient.checkInTime && (
                                                        <span>Check-in: {patient.checkInTime}</span>
                                                    )}
                                                    {patient.checkInTime && (() => {
                                                        const now = new Date();
                                                        const checkIn = new Date();
                                                        const [hours, minutes] = patient.checkInTime.split(':');
                                                        checkIn.setHours(parseInt(hours), parseInt(minutes), 0, 0);
                                                        const waitTime = Math.floor((now.getTime() - checkIn.getTime()) / (1000 * 60));

                                                        if (waitTime > 0) {
                                                            return (
                                                                <span className={`font-medium ${waitTime > 30 ? 'text-red-600' : 'text-yellow-600'}`}>
                                                                    Chờ: {waitTime} phút
                                                                </span>
                                                            );
                                                        }
                                                        return null;
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-4">
                                        {/* Status */}
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(patient.status)}`}>
                                            {getStatusLabel(patient.status)}
                                        </span>

                                        {/* Action Buttons */}
                                        <div className="flex items-center space-x-2">
                                            {patient.status === 'scheduled' && (
                                                <>
                                                    <Button
                                                        onClick={() => handleCheckIn(patient.id)}
                                                        className="bg-green-600 text-white hover:bg-green-700 text-sm px-3 py-1"
                                                    >
                                                        Check-in
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleMarkNoShow(patient.id)}
                                                        className="bg-red-600 text-white hover:bg-red-700 text-sm px-3 py-1"
                                                    >
                                                        Không đến
                                                    </Button>
                                                </>
                                            )}

                                            {(patient.status === 'arrived' || patient.status === 'waiting') && (
                                                <>
                                                    <Button
                                                        onClick={() => handleStartConsultation(patient.id)}
                                                        className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-3 py-1"
                                                    >
                                                        Bắt đầu khám
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleMarkNoShow(patient.id)}
                                                        className="bg-red-600 text-white hover:bg-red-700 text-sm px-3 py-1"
                                                    >
                                                        Không đến
                                                    </Button>
                                                </>
                                            )}

                                            {patient.status === 'in-consultation' && (
                                                <Button
                                                    onClick={() => handleCheckOut(patient.id)}
                                                    className="bg-purple-600 text-white hover:bg-purple-700 text-sm px-3 py-1"
                                                >
                                                    Check-out
                                                </Button>
                                            )}

                                            {patient.status === 'completed' && patient.checkOutTime && (
                                                <span className="text-sm text-gray-500">
                                                    Check-out: {patient.checkOutTime}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredPatients.length === 0 && (
                        <div className="p-12 text-center">
                            <ClipboardDocumentListIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Không có bệnh nhân</h3>
                            <p className="text-gray-600">
                                {searchTerm ? 'Không tìm thấy bệnh nhân phù hợp.' : 'Chưa có bệnh nhân nào hôm nay.'}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CheckInOut;