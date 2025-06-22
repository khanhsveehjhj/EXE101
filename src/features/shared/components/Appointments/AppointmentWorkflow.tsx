import { useState } from 'react';
import {
    CheckCircleIcon,
    XCircleIcon,
    ClockIcon,
    ExclamationTriangleIcon,
    CalendarDaysIcon,
    UserIcon,
    PhoneIcon,
    DocumentTextIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';
import { AppointmentRequest, ConflictInfo, TimeSlotSuggestion } from '@/services/Types';
import Button from '@/components/UI/Button';

interface AppointmentWorkflowProps {
    appointment: AppointmentRequest;
    onApprove: (appointmentId: string, notes?: string) => void;
    onDecline: (appointmentId: string, reason: string) => void;
    onReschedule: (appointmentId: string, newDate: string, newTime: string) => void;
    onRequestMoreInfo: (appointmentId: string, questions: string[]) => void;
    conflicts?: ConflictInfo[];
    suggestedSlots?: TimeSlotSuggestion[];
    showActions?: boolean;
}

const AppointmentWorkflow: React.FC<AppointmentWorkflowProps> = ({
    appointment,
    onApprove,
    onDecline,
    onReschedule,
    conflicts = [],
    suggestedSlots = [],
    showActions = true
}) => {
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [showDeclineModal, setShowDeclineModal] = useState(false);
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [approvalNotes, setApprovalNotes] = useState('');
    const [declineReason, setDeclineReason] = useState('');
    const [selectedSlot, setSelectedSlot] = useState<TimeSlotSuggestion | null>(null);

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'urgent': return 'bg-red-500';
            case 'high': return 'bg-orange-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'text-yellow-600 bg-yellow-50';
            case 'approved': return 'text-green-600 bg-green-50';
            case 'declined': return 'text-red-600 bg-red-50';
            case 'confirmed': return 'text-blue-600 bg-blue-50';
            case 'completed': return 'text-gray-600 bg-gray-50';
            default: return 'text-gray-600 bg-gray-50';
        }
    };

    const handleApprove = () => {
        if (conflicts.length > 0) {
            setShowRescheduleModal(true);
        } else {
            setShowApprovalModal(true);
        }
    };

    const confirmApproval = () => {
        onApprove(appointment.id, approvalNotes);
        setShowApprovalModal(false);
        setApprovalNotes('');
    };

    const confirmDecline = () => {
        if (declineReason.trim()) {
            onDecline(appointment.id, declineReason);
            setShowDeclineModal(false);
            setDeclineReason('');
        }
    };

    const confirmReschedule = () => {
        if (selectedSlot) {
            onReschedule(appointment.id, selectedSlot.date, selectedSlot.time);
            setShowRescheduleModal(false);
            setSelectedSlot(null);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Appointment Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(appointment.priority)}`}></div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">{appointment.patientName}</h3>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status === 'pending' ? 'Chờ duyệt' :
                            appointment.status === 'approved' ? 'Đã duyệt' :
                                appointment.status === 'declined' ? 'Đã từ chối' :
                                    appointment.status === 'confirmed' ? 'Đã xác nhận' : 'Hoàn thành'}
                    </span>
                    <span className="text-xs text-gray-500">#{appointment.id.slice(-6)}</span>
                </div>
            </div>

            {/* Appointment Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <CalendarDaysIcon className="w-4 h-4" />
                        <span>{new Date(appointment.date).toLocaleDateString('vi-VN')} lúc {appointment.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <ClockIcon className="w-4 h-4" />
                        <span>{appointment.duration} phút</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <UserIcon className="w-4 h-4" />
                        <span>{appointment.doctorName}</span>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <PhoneIcon className="w-4 h-4" />
                        <span>{appointment.patientPhone}</span>
                    </div>
                    {appointment.patientEmail && (
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <DocumentTextIcon className="w-4 h-4" />
                            <span>{appointment.patientEmail}</span>
                        </div>
                    )}
                    <div className="text-sm text-gray-600">
                        <span className="font-medium">Nguồn:</span> {
                            appointment.bookingSource === 'online' ? 'Đặt lịch online' :
                                appointment.bookingSource === 'walk-in' ? 'Đến trực tiếp' :
                                    appointment.bookingSource === 'doctor-initiated' ? 'Bác sĩ tạo' : 'Lễ tân tạo'
                        }
                    </div>
                </div>
            </div>

            {/* Symptoms and Notes */}
            {appointment.symptoms && (
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Triệu chứng:</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{appointment.symptoms}</p>
                </div>
            )}

            {appointment.notes && (
                <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Ghi chú:</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{appointment.notes}</p>
                </div>
            )}

            {/* Conflicts Warning */}
            {conflicts.length > 0 && (
                <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                    <div className="flex items-center space-x-2 mb-2">
                        <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                        <h4 className="text-sm font-medium text-yellow-800">Phát hiện xung đột lịch</h4>
                    </div>
                    <div className="space-y-1">
                        {conflicts.map((conflict, index) => (
                            <p key={index} className="text-sm text-yellow-700">
                                • {conflict.description}
                            </p>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            {showActions && appointment.status === 'pending' && (
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                    <Button
                        onClick={() => setShowDeclineModal(true)}
                        className="text-red-600 border border-red-300 hover:bg-red-50"
                    >
                        <XCircleIcon className="w-4 h-4 mr-2" />
                        Từ chối
                    </Button>
                    <Button
                        onClick={handleApprove}
                        className="bg-green-600 hover:bg-green-700 text-white"
                    >
                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                        {conflicts.length > 0 ? 'Duyệt & Đổi lịch' : 'Duyệt'}
                    </Button>
                </div>
            )}

            {/* Approval Modal */}
            {showApprovalModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Duyệt lịch hẹn</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Ghi chú (tùy chọn)
                            </label>
                            <textarea
                                value={approvalNotes}
                                onChange={(e) => setApprovalNotes(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                rows={3}
                                placeholder="Thêm ghi chú cho lịch hẹn..."
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <Button
                                className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                                onClick={() => setShowApprovalModal(false)}
                            >
                                Hủy
                            </Button>
                            <Button
                                onClick={confirmApproval}
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                Xác nhận duyệt
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Decline Modal */}
            {showDeclineModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Từ chối lịch hẹn</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Lý do từ chối *
                            </label>
                            <textarea
                                value={declineReason}
                                onChange={(e) => setDeclineReason(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                rows={3}
                                placeholder="Nhập lý do từ chối..."
                                required
                            />
                        </div>
                        <div className="flex justify-end space-x-3">
                            <Button
                                className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                                onClick={() => setShowDeclineModal(false)}
                            >
                                Hủy
                            </Button>
                            <Button
                                onClick={confirmDecline}
                                className="bg-red-600 hover:bg-red-700 text-white"
                                disabled={!declineReason.trim()}
                            >
                                Xác nhận từ chối
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Reschedule Modal */}
            {showRescheduleModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Đổi lịch hẹn</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Lịch hẹn hiện tại có xung đột. Vui lòng chọn thời gian khác:
                        </p>

                        <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                            {suggestedSlots.map((slot, index) => (
                                <div
                                    key={index}
                                    className={`p-3 border rounded-md cursor-pointer transition-colors ${selectedSlot === slot
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => setSelectedSlot(slot)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {new Date(slot.date).toLocaleDateString('vi-VN')} lúc {slot.time}
                                            </p>
                                            <p className="text-sm text-gray-600">{slot.reason}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-medium text-green-600">
                                                {slot.confidence}% phù hợp
                                            </div>
                                            {slot.estimatedWaitTime && (
                                                <div className="text-xs text-gray-500">
                                                    Chờ ~{slot.estimatedWaitTime} phút
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Button
                                className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700"
                                onClick={() => setShowRescheduleModal(false)}
                            >
                                Hủy
                            </Button>
                            <Button
                                onClick={confirmReschedule}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                disabled={!selectedSlot}
                            >
                                <ArrowRightIcon className="w-4 h-4 mr-2" />
                                Đổi lịch
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentWorkflow;
