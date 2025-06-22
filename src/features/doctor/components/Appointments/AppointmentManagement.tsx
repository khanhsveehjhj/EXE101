import { useState } from 'react';
import {
    CalendarDaysIcon,
    ClockIcon,
    UserIcon,
    CheckCircleIcon,
    BellIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';
import AppointmentWorkflow from '@/features/shared/components/Appointments/AppointmentWorkflow';
import useAppointments from '@/features/shared/hooks/useAppointments';

const AppointmentManagement = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [selectedAppointments, setSelectedAppointments] = useState<string[]>([]);
    const [showBulkActions, setShowBulkActions] = useState(false);

    // Use the shared appointments hook
    const {
        appointments,
        loading,
        error,
        pendingCount,
        todayCount,
        approveAppointment,
        declineAppointment,
        rescheduleAppointment,
        checkConflicts,
        generateSuggestedSlots,
        bulkApprove,
        bulkDecline
    } = useAppointments();

    // Filter appointments based on current filters
    const filteredAppointments = appointments.filter(appointment => {
        const matchesDate = appointment.date === selectedDate;
        const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
        const matchesSearch = searchTerm === '' ||
            appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.patientPhone.includes(searchTerm) ||
            appointment.symptoms.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesDate && matchesStatus && matchesSearch;
    });

    // Handle appointment actions
    const handleApprove = async (appointmentId: string, notes?: string) => {
        try {
            await approveAppointment(appointmentId, notes);
        } catch (error) {
            console.error('Error approving appointment:', error);
        }
    };

    const handleDecline = async (appointmentId: string, reason: string) => {
        try {
            await declineAppointment(appointmentId, reason);
        } catch (error) {
            console.error('Error declining appointment:', error);
        }
    };

    const handleReschedule = async (appointmentId: string, newDate: string, newTime: string) => {
        try {
            await rescheduleAppointment(appointmentId, newDate, newTime);
        } catch (error) {
            console.error('Error rescheduling appointment:', error);
        }
    };

    const handleBulkApprove = async () => {
        if (selectedAppointments.length > 0) {
            try {
                await bulkApprove(selectedAppointments);
                setSelectedAppointments([]);
                setShowBulkActions(false);
            } catch (error) {
                console.error('Error bulk approving appointments:', error);
            }
        }
    };

    const handleBulkDecline = async (reason: string) => {
        if (selectedAppointments.length > 0) {
            try {
                await bulkDecline(selectedAppointments, reason);
                setSelectedAppointments([]);
                setShowBulkActions(false);
            } catch (error) {
                console.error('Error bulk declining appointments:', error);
            }
        }
    };

    const toggleAppointmentSelection = (appointmentId: string) => {
        setSelectedAppointments(prev =>
            prev.includes(appointmentId)
                ? prev.filter(id => id !== appointmentId)
                : [...prev, appointmentId]
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <p className="text-red-600">{error}</p>
                <Button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-red-600 text-white hover:bg-red-700"
                >
                    Thử lại
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý lịch hẹn</h1>
                    <p className="text-gray-600 mt-1">
                        Duyệt và quản lý các yêu cầu đặt lịch hẹn
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    {/* Notification Badge */}
                    <div className="relative">
                        <BellIcon className="w-6 h-6 text-gray-600" />
                        {pendingCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {pendingCount}
                            </span>
                        )}
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Danh sách
                        </button>
                        <button
                            onClick={() => setViewMode('calendar')}
                            className={`px-3 py-1 rounded ${viewMode === 'calendar' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            Lịch
                        </button>
                    </div>

                    <Button className="bg-primary text-white">
                        Thêm lịch hẹn mới
                    </Button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-orange-100 rounded-lg">
                            <ClockIcon className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Chờ duyệt</p>
                            <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <CalendarDaysIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Hôm nay</p>
                            <p className="text-2xl font-bold text-gray-900">{todayCount}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircleIcon className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Đã duyệt</p>
                            <p className="text-2xl font-bold text-gray-900">
                                {appointments.filter(apt => apt.status === 'approved').length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-gray-100 rounded-lg">
                            <UserIcon className="w-6 h-6 text-gray-600" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium text-gray-600">Tổng cộng</p>
                            <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tìm kiếm
                        </label>
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Tìm theo tên, SĐT, triệu chứng..."
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Ngày khám
                        </label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
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
                            <option value="pending">Chờ duyệt</option>
                            <option value="approved">Đã duyệt</option>
                            <option value="confirmed">Đã xác nhận</option>
                            <option value="in-progress">Đang khám</option>
                            <option value="completed">Hoàn thành</option>
                            <option value="cancelled">Đã hủy</option>
                            <option value="declined">Từ chối</option>
                        </select>
                    </div>

                    <div className="flex items-end space-x-2">
                        {selectedAppointments.length > 0 && (
                            <Button
                                onClick={() => setShowBulkActions(!showBulkActions)}
                                className="bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Thao tác hàng loạt ({selectedAppointments.length})
                            </Button>
                        )}
                        <Button
                            onClick={() => window.location.reload()}
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                        >
                            Làm mới
                        </Button>
                    </div>
                </div>
            </div>

            {/* Bulk Actions */}
            {showBulkActions && selectedAppointments.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <p className="text-blue-800 font-medium">
                            Đã chọn {selectedAppointments.length} lịch hẹn
                        </p>
                        <div className="flex space-x-2">
                            <Button
                                onClick={handleBulkApprove}
                                className="bg-green-600 text-white hover:bg-green-700"
                            >
                                Duyệt tất cả
                            </Button>
                            <Button
                                onClick={() => handleBulkDecline('Duyệt hàng loạt bị từ chối')}
                                className="bg-red-600 text-white hover:bg-red-700"
                            >
                                Từ chối tất cả
                            </Button>
                            <Button
                                onClick={() => {
                                    setSelectedAppointments([]);
                                    setShowBulkActions(false);
                                }}
                                className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                            >
                                Hủy chọn
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Appointments List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Lịch hẹn ngày {new Date(selectedDate).toLocaleDateString('vi-VN')}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Tổng cộng: {filteredAppointments.length} lịch hẹn
                    </p>
                </div>

                <div className="divide-y divide-gray-200">
                    {filteredAppointments.map((appointment) => (
                        <div key={appointment.id} className="p-6">
                            <div className="flex items-start space-x-4">
                                {/* Selection Checkbox */}
                                <input
                                    type="checkbox"
                                    checked={selectedAppointments.includes(appointment.id)}
                                    onChange={() => toggleAppointmentSelection(appointment.id)}
                                    className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />

                                {/* Appointment Workflow Component */}
                                <div className="flex-1">
                                    <AppointmentWorkflow
                                        appointment={appointment}
                                        onApprove={handleApprove}
                                        onDecline={handleDecline}
                                        onReschedule={handleReschedule}
                                        onRequestMoreInfo={(id, questions) => console.log('Request more info:', id, questions)}
                                        conflicts={checkConflicts(appointment.date, appointment.time, appointment.duration, appointment.id)}
                                        suggestedSlots={generateSuggestedSlots(appointment.date, appointment.duration, appointment.doctorId)}
                                        showActions={appointment.status === 'pending'}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredAppointments.length === 0 && (
                    <div className="p-12 text-center">
                        <CalendarDaysIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Không có lịch hẹn</h3>
                        <p className="text-gray-600">
                            {searchTerm || filterStatus !== 'all'
                                ? 'Không tìm thấy lịch hẹn phù hợp với bộ lọc.'
                                : 'Không có lịch hẹn nào cho ngày đã chọn.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppointmentManagement;