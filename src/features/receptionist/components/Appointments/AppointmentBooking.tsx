import { useState } from 'react';
import {
    CalendarDaysIcon,
    ClockIcon,
    PhoneIcon,
    MagnifyingGlassIcon,
    PlusIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';
import useAppointments from '@/features/shared/hooks/useAppointments';
import { AppointmentRequest, ConflictInfo } from '@/services/Types';

interface AppointmentForm {
    patientName: string;
    patientPhone: string;
    patientEmail: string;
    doctorId: string;
    date: string;
    time: string;
    type: 'consultation' | 'follow-up' | 'emergency' | 'routine' | 'specialist';
    symptoms: string;
    notes: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    duration: number;
}

const AppointmentBooking = () => {
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [, setShowConflictWarning] = useState(false);
    const [, setConflictDetails] = useState<ConflictInfo[]>([]);
    const [formData, setFormData] = useState<AppointmentForm>({
        patientName: '',
        patientPhone: '',
        patientEmail: '',
        doctorId: '',
        date: '',
        time: '',
        type: 'consultation',
        symptoms: '',
        notes: '',
        priority: 'medium',
        duration: 30
    });

    // Use the shared appointments hook
    const {
        appointments,
        checkConflicts,
    } = useAppointments();

    // Mock data
    const doctors = [
        { id: 'doc-001', name: 'BS. Nguyễn Văn A', specialty: 'Nội khoa', available: true },
        { id: 'doc-002', name: 'BS. Trần Thị B', specialty: 'Ngoại khoa', available: true },
        { id: 'doc-003', name: 'BS. Lê Văn C', specialty: 'Tim mạch', available: false },
        { id: 'doc-004', name: 'BS. Phạm Thị D', specialty: 'Nhi khoa', available: true }
    ];

    const appointmentTypes = [
        { value: 'consultation', label: 'Khám tổng quát', duration: 30 },
        { value: 'follow-up', label: 'Tái khám', duration: 20 },
        { value: 'specialist', label: 'Khám chuyên khoa', duration: 45 },
        { value: 'emergency', label: 'Khám cấp cứu', duration: 60 },
        { value: 'routine', label: 'Khám định kỳ', duration: 30 }
    ];

    const timeSlots = [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
        '11:00', '11:30', '13:30', '14:00', '14:30', '15:00',
        '15:30', '16:00', '16:30', '17:00'
    ];

    // Filter appointments for today
    const filteredAppointments = appointments.filter(apt =>
        apt.date === selectedDate &&
        (searchTerm === '' ||
            apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            apt.patientPhone.includes(searchTerm))
    );

    const handleInputChange = (field: keyof AppointmentForm, value: string | number) => {
        setFormData(prev => {
            const newData = { ...prev, [field]: value };

            // Auto-set duration when appointment type changes
            if (field === 'type') {
                const selectedType = appointmentTypes.find(t => t.value === value);
                if (selectedType) {
                    newData.duration = selectedType.duration;
                }
            }

            return newData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check for conflicts before submitting
        const conflicts = checkConflicts(formData.date, formData.time, formData.duration, formData.doctorId);

        if (conflicts.length > 0) {
            setConflictDetails(conflicts);
            setShowConflictWarning(true);
            return;
        }

        // Create new appointment request
        const newAppointment: Partial<AppointmentRequest> = {
            id: `apt-${Date.now()}`,
            patientName: formData.patientName,
            patientPhone: formData.patientPhone,
            patientEmail: formData.patientEmail,
            doctorId: formData.doctorId,
            doctorName: doctors.find(d => d.id === formData.doctorId)?.name || '',
            date: formData.date,
            time: formData.time,
            duration: formData.duration,
            type: formData.type,
            status: 'pending',
            symptoms: formData.symptoms,
            notes: formData.notes,
            priority: formData.priority,
            bookingSource: 'receptionist',
            createdAt: new Date().toISOString()
        };

        console.log('Booking appointment:', newAppointment);

        // Reset form and close modal
        setShowForm(false);
        setFormData({
            patientName: '',
            patientPhone: '',
            patientEmail: '',
            doctorId: '',
            date: '',
            time: '',
            type: 'consultation',
            symptoms: '',
            notes: '',
            priority: 'medium',
            duration: 30
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Đặt lịch hẹn</h1>
                <Button
                    onClick={() => setShowForm(true)}
                    className="bg-primary text-white flex items-center space-x-2"
                >
                    <PlusIcon className="w-4 h-4" />
                    <span>Đặt lịch mới</span>
                </Button>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tìm kiếm lịch hẹn
                        </label>
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm theo tên bệnh nhân hoặc số điện thoại..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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
                </div>
            </div>

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
                        <div key={appointment.id} className="p-6 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                        <span className="text-white font-medium text-sm">
                                            {appointment.patientName.charAt(0)}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                                            <span className="flex items-center">
                                                <PhoneIcon className="w-4 h-4 mr-1" />
                                                {appointment.patientPhone}
                                            </span>
                                            <span className="flex items-center">
                                                <ClockIcon className="w-4 h-4 mr-1" />
                                                {appointment.time}
                                            </span>
                                            <span>{appointment.doctorName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {appointment.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                                    </span>
                                    <span className="text-sm text-gray-600">{appointment.type}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredAppointments.length === 0 && (
                    <div className="p-12 text-center">
                        <CalendarDaysIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Không có lịch hẹn</h3>
                        <p className="text-gray-600">Không có lịch hẹn nào cho ngày đã chọn.</p>
                    </div>
                )}
            </div>

            {/* Booking Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Đặt lịch hẹn mới</h2>
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ×
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Patient Information */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin bệnh nhân</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Họ tên bệnh nhân *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.patientName}
                                            onChange={(e) => handleInputChange('patientName', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Số điện thoại *
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.patientPhone}
                                            onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.patientEmail}
                                            onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Appointment Information */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Thông tin lịch hẹn</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bác sĩ *
                                        </label>
                                        <select
                                            required
                                            value={formData.doctorId}
                                            onChange={(e) => handleInputChange('doctorId', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="">Chọn bác sĩ</option>
                                            {doctors.filter(d => d.available).map(doctor => (
                                                <option key={doctor.id} value={doctor.id}>
                                                    {doctor.name} - {doctor.specialty}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Loại khám *
                                        </label>
                                        <select
                                            required
                                            value={formData.type}
                                            onChange={(e) => handleInputChange('type', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="">Chọn loại khám</option>
                                            {appointmentTypes.map(type => (
                                                <option key={type.value} value={type.value}>{type.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ngày khám *
                                        </label>
                                        <input
                                            type="date"
                                            required
                                            value={formData.date}
                                            onChange={(e) => handleInputChange('date', e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Giờ khám *
                                        </label>
                                        <select
                                            required
                                            value={formData.time}
                                            onChange={(e) => handleInputChange('time', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="">Chọn giờ khám</option>
                                            {timeSlots.map(time => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Triệu chứng *
                                        </label>
                                        <textarea
                                            required
                                            rows={3}
                                            value={formData.symptoms}
                                            onChange={(e) => handleInputChange('symptoms', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Mô tả triệu chứng của bệnh nhân..."
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ghi chú
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={formData.notes}
                                            onChange={(e) => handleInputChange('notes', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                            placeholder="Ghi chú thêm (nếu có)..."
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                                <Button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-primary text-white flex items-center space-x-2"
                                >
                                    <CheckCircleIcon className="w-4 h-4" />
                                    <span>Đặt lịch hẹn</span>
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentBooking;