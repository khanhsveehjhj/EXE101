import { useState, useEffect } from 'react';
import {
    ExclamationTriangleIcon,
    CheckCircleIcon,
    LightBulbIcon,
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';

interface TimeSlot {
    time: string;
    available: boolean;
    conflictReason?: string;
    doctorId?: string;
    patientName?: string;
}

interface ScheduleConflict {
    type: 'appointment' | 'break' | 'meeting' | 'unavailable';
    time: string;
    duration: number;
    description: string;
}

interface SmartSuggestion {
    date: string;
    time: string;
    confidence: number;
    reason: string;
    alternativeSlots: { time: string; reason: string; }[];
}

interface SmartSchedulerProps {
    selectedDate: string;
    selectedDoctorId: string;
    appointmentDuration: number;
    onTimeSlotSelect: (date: string, time: string) => void;
    onConflictDetected: (conflicts: ScheduleConflict[]) => void;
}

interface DoctorSchedule {
    name: string;
    workingHours: { start: string; end: string };
    lunchBreak: { start: string; end: string };
    preferredSlotDuration: number;
    peakEfficiencyHours: string[];
    appointments: Array<{ time: string; duration: number; patientName: string }>;
}

const SmartScheduler = ({
    selectedDate,
    selectedDoctorId,
    appointmentDuration,
    onTimeSlotSelect,
}: SmartSchedulerProps) => {
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [conflicts] = useState<ScheduleConflict[]>([]);
    const [smartSuggestions, setSmartSuggestions] = useState<SmartSuggestion[]>([]);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Mock doctor schedules and preferences
    const doctorSchedules = {
        '1': {
            name: 'BS. Nguyễn Văn A',
            workingHours: { start: '08:00', end: '17:00' },
            lunchBreak: { start: '12:00', end: '13:30' },
            preferredSlotDuration: 30,
            peakEfficiencyHours: ['09:00-11:00', '14:00-16:00'],
            appointments: [
                { time: '09:00', duration: 30, patientName: 'Trần Thị B' },
                { time: '10:30', duration: 45, patientName: 'Lê Văn C' },
                { time: '15:00', duration: 30, patientName: 'Phạm Thị D' }
            ]
        },
        '2': {
            name: 'BS. Trần Thị E',
            workingHours: { start: '08:30', end: '16:30' },
            lunchBreak: { start: '12:30', end: '13:30' },
            preferredSlotDuration: 25,
            peakEfficiencyHours: ['08:30-10:30', '13:30-15:30'],
            appointments: [
                { time: '08:30', duration: 25, patientName: 'Hoàng Văn F' },
                { time: '14:00', duration: 30, patientName: 'Vũ Thị G' }
            ]
        }
    };

    // Generate time slots for the selected date and doctor
    useEffect(() => {
        generateTimeSlots();
        analyzeSchedulePatterns();
    }, [selectedDate, selectedDoctorId, appointmentDuration]);

    const generateTimeSlots = () => {
        const doctor = doctorSchedules[selectedDoctorId as keyof typeof doctorSchedules];
        if (!doctor) return;

        const slots: TimeSlot[] = [];
        const workStart = parseTime(doctor.workingHours.start);
        const workEnd = parseTime(doctor.workingHours.end);
        const lunchStart = parseTime(doctor.lunchBreak.start);
        const lunchEnd = parseTime(doctor.lunchBreak.end);

        // Generate 30-minute slots
        for (let time = workStart; time < workEnd; time += 30) {
            const timeStr = formatTime(time);

            // Skip lunch break
            if (time >= lunchStart && time < lunchEnd) {
                continue;
            }

            // Check for conflicts
            const conflict = checkTimeSlotConflict(timeStr, doctor);

            slots.push({
                time: timeStr,
                available: !conflict,
                conflictReason: conflict?.description,
                doctorId: selectedDoctorId,
                patientName: conflict?.type === 'appointment' ? getPatientNameForTime(timeStr, doctor) : undefined
            });
        }

        setTimeSlots(slots);
    };

    const parseTime = (timeStr: string): number => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    const formatTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    };

    const checkTimeSlotConflict = (time: string, doctor: DoctorSchedule): ScheduleConflict | null => {
        const timeMinutes = parseTime(time);
        const endTimeMinutes = timeMinutes + appointmentDuration;

        // Check existing appointments
        for (const appointment of doctor.appointments) {
            const aptStart = parseTime(appointment.time);
            const aptEnd = aptStart + appointment.duration;

            if (timeMinutes < aptEnd && endTimeMinutes > aptStart) {
                return {
                    type: 'appointment',
                    time: appointment.time,
                    duration: appointment.duration,
                    description: `Đã có lịch hẹn với ${appointment.patientName}`
                };
            }
        }

        // Check lunch break
        const lunchStart = parseTime(doctor.lunchBreak.start);
        const lunchEnd = parseTime(doctor.lunchBreak.end);

        if (timeMinutes < lunchEnd && endTimeMinutes > lunchStart) {
            return {
                type: 'break',
                time: doctor.lunchBreak.start,
                duration: lunchEnd - lunchStart,
                description: 'Giờ nghỉ trưa'
            };
        }

        return null;
    };

    const getPatientNameForTime = (time: string, doctor: DoctorSchedule): string | undefined => {
        const appointment = doctor.appointments.find(apt => apt.time === time);
        return appointment?.patientName;
    };

    const analyzeSchedulePatterns = async () => {
        setIsAnalyzing(true);

        // Simulate AI analysis delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const doctor = doctorSchedules[selectedDoctorId as keyof typeof doctorSchedules];
        if (!doctor) {
            setIsAnalyzing(false);
            return;
        }

        const suggestions: SmartSuggestion[] = [];
        const availableSlots = timeSlots.filter(slot => slot.available);

        // Analyze peak efficiency hours
        const peakHours = doctor.peakEfficiencyHours;
        const peakSlots = availableSlots.filter(slot => {
            return peakHours.some(peak => {
                const [start, end] = peak.split('-');
                const slotTime = parseTime(slot.time);
                return slotTime >= parseTime(start) && slotTime <= parseTime(end);
            });
        });

        if (peakSlots.length > 0) {
            const bestSlot = peakSlots[0];
            suggestions.push({
                date: selectedDate,
                time: bestSlot.time,
                confidence: 95,
                reason: 'Khung giờ hiệu suất cao của bác sĩ',
                alternativeSlots: peakSlots.slice(1, 3).map(slot => ({
                    time: slot.time,
                    reason: 'Khung giờ tốt'
                }))
            });
        }

        // Analyze appointment gaps
        const gapSlots = findOptimalGaps(availableSlots, doctor);
        if (gapSlots.length > 0) {
            suggestions.push({
                date: selectedDate,
                time: gapSlots[0].time,
                confidence: 85,
                reason: 'Tối ưu hóa khoảng trống trong lịch',
                alternativeSlots: gapSlots.slice(1, 3).map(slot => ({
                    time: slot.time,
                    reason: 'Giảm thời gian chờ'
                }))
            });
        }

        // Suggest next available slots
        if (availableSlots.length > 0) {
            suggestions.push({
                date: selectedDate,
                time: availableSlots[0].time,
                confidence: 70,
                reason: 'Khung giờ sớm nhất có sẵn',
                alternativeSlots: availableSlots.slice(1, 4).map(slot => ({
                    time: slot.time,
                    reason: 'Có sẵn'
                }))
            });
        }

        setSmartSuggestions(suggestions);
        setIsAnalyzing(false);
    };

    const findOptimalGaps = (availableSlots: TimeSlot[], doctor: DoctorSchedule): TimeSlot[] => {
        // Logic to find slots that minimize gaps between appointments
        const appointments = doctor.appointments.map(apt => parseTime(apt.time)).sort((a, b) => a - b);
        const optimalSlots: TimeSlot[] = [];

        for (const slot of availableSlots) {
            const slotTime = parseTime(slot.time);

            // Find the closest appointments before and after this slot
            const beforeApt = appointments.filter(apt => apt < slotTime).pop();
            const afterApt = appointments.find(apt => apt > slotTime);

            // Calculate gap efficiency
            let efficiency = 0;
            if (beforeApt && afterApt) {
                const totalGap = afterApt - beforeApt;
                const newGaps = (slotTime - beforeApt) + (afterApt - (slotTime + appointmentDuration));
                efficiency = 1 - (newGaps / totalGap);
            }

            if (efficiency > 0.7) {
                optimalSlots.push(slot);
            }
        }

        return optimalSlots.sort((a, b) => parseTime(a.time) - parseTime(b.time));
    };

    const handleTimeSlotClick = (time: string) => {
        const slot = timeSlots.find(s => s.time === time);
        if (!slot || !slot.available) return;

        setSelectedTime(time);
        onTimeSlotSelect(selectedDate, time);
    };

    const handleSuggestionSelect = (suggestion: SmartSuggestion) => {
        setSelectedTime(suggestion.time);
        onTimeSlotSelect(selectedDate, suggestion.time);
        setShowSuggestions(false);
    };

    const getSlotClassName = (slot: TimeSlot) => {
        if (!slot.available) {
            return 'bg-red-100 text-red-800 cursor-not-allowed';
        }
        if (slot.time === selectedTime) {
            return 'bg-primary text-white';
        }
        return 'bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer';
    };

    const doctor = doctorSchedules[selectedDoctorId as keyof typeof doctorSchedules];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium text-gray-900">Lịch trình thông minh</h3>
                    <p className="text-sm text-gray-600">
                        {doctor?.name} - {new Date(selectedDate).toLocaleDateString('vi-VN')}
                    </p>
                </div>
                <Button
                    onClick={() => setShowSuggestions(!showSuggestions)}
                    className="bg-blue-600 text-white hover:bg-blue-700 flex items-center space-x-2"
                >
                    <LightBulbIcon className="w-4 h-4" />
                    <span>Gợi ý thông minh</span>
                </Button>
            </div>

            {/* Smart Suggestions */}
            {showSuggestions && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <LightBulbIcon className="w-5 h-5 text-blue-600 mr-2" />
                        <h4 className="font-medium text-blue-900">Gợi ý lịch hẹn tối ưu</h4>
                    </div>

                    {isAnalyzing ? (
                        <div className="text-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                            <p className="text-sm text-blue-600 mt-2">Đang phân tích lịch trình...</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {smartSuggestions.map((suggestion, index) => (
                                <div key={index} className="bg-white rounded-lg p-4 border border-blue-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3">
                                                <span className="font-medium text-blue-900">{suggestion.time}</span>
                                                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                    {suggestion.confidence}% phù hợp
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">{suggestion.reason}</p>
                                            {suggestion.alternativeSlots.length > 0 && (
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <span className="text-xs text-gray-500">Thay thế:</span>
                                                    {suggestion.alternativeSlots.map((alt, altIndex) => (
                                                        <button
                                                            key={altIndex}
                                                            onClick={() => handleTimeSlotClick(alt.time)}
                                                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200"
                                                        >
                                                            {alt.time}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <Button
                                            onClick={() => handleSuggestionSelect(suggestion)}
                                            className="bg-blue-600 text-white hover:bg-blue-700 text-sm px-3 py-1"
                                        >
                                            Chọn
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Time Slots Grid */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h4 className="font-medium text-gray-900 mb-4">Khung giờ có sẵn</h4>
                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                    {timeSlots.map((slot) => (
                        <button
                            key={slot.time}
                            onClick={() => handleTimeSlotClick(slot.time)}
                            disabled={!slot.available}
                            className={`p-3 rounded-lg text-sm font-medium transition-colors ${getSlotClassName(slot)}`}
                            title={slot.conflictReason || 'Có sẵn'}
                        >
                            {slot.time}
                            {slot.patientName && (
                                <div className="text-xs mt-1 opacity-75">
                                    {slot.patientName}
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex items-center space-x-6 mt-4 text-sm">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-100 rounded mr-2"></div>
                        <span className="text-gray-600">Có sẵn</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-100 rounded mr-2"></div>
                        <span className="text-gray-600">Đã đặt</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-primary rounded mr-2"></div>
                        <span className="text-gray-600">Đã chọn</span>
                    </div>
                </div>
            </div>

            {/* Conflicts Warning */}
            {conflicts.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mr-2" />
                        <h4 className="font-medium text-red-900">Phát hiện xung đột</h4>
                    </div>
                    <div className="space-y-2">
                        {conflicts.map((conflict, index) => (
                            <div key={index} className="text-sm text-red-800">
                                {conflict.time}: {conflict.description}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Selected Time Confirmation */}
            {selectedTime && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <CheckCircleIcon className="w-5 h-5 text-green-600 mr-2" />
                            <span className="font-medium text-green-900">
                                Đã chọn: {selectedTime} ngày {new Date(selectedDate).toLocaleDateString('vi-VN')}
                            </span>
                        </div>
                        <span className="text-sm text-green-700">
                            Thời gian: {appointmentDuration} phút
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SmartScheduler;
