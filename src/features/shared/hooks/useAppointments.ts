import { useState, useEffect, useCallback } from 'react';
import { AppointmentRequest, ConflictInfo, TimeSlotSuggestion, NotificationItem } from '@/services/Types';

interface UseAppointmentsReturn {
  appointments: AppointmentRequest[];
  loading: boolean;
  error: string | null;
  pendingCount: number;
  todayCount: number;
  // Actions
  approveAppointment: (appointmentId: string, notes?: string) => Promise<void>;
  declineAppointment: (appointmentId: string, reason: string) => Promise<void>;
  rescheduleAppointment: (appointmentId: string, newDate: string, newTime: string) => Promise<void>;
  updateAppointmentStatus: (appointmentId: string, status: AppointmentRequest['status']) => Promise<void>;
  checkConflicts: (date: string, time: string, duration: number, doctorId: string, excludeId?: string) => ConflictInfo[];
  generateSuggestedSlots: (originalDate: string, duration: number, doctorId: string) => TimeSlotSuggestion[];
  bulkApprove: (appointmentIds: string[]) => Promise<void>;
  bulkDecline: (appointmentIds: string[], reason: string) => Promise<void>;
  // Filters
  filterByStatus: (status: AppointmentRequest['status']) => AppointmentRequest[];
  filterByDate: (date: string) => AppointmentRequest[];
  filterByDoctor: (doctorId: string) => AppointmentRequest[];
  searchAppointments: (query: string) => AppointmentRequest[];
}

// Mock data for development
const mockAppointments: AppointmentRequest[] = [
  {
    id: 'apt-001',
    patientId: 'pat-001',
    patientName: 'Nguyễn Văn A',
    patientPhone: '0123456789',
    patientEmail: 'nguyenvana@email.com',
    doctorId: 'doc-001',
    doctorName: 'BS. Trần Thị B',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    duration: 30,
    type: 'consultation',
    status: 'pending',
    symptoms: 'Đau đầu, chóng mặt kéo dài 3 ngày',
    notes: 'Bệnh nhân có tiền sử cao huyết áp',
    priority: 'medium',
    bookingSource: 'online',
    createdAt: new Date().toISOString(),
    estimatedCost: 200000,
    insuranceCovered: true
  },
  {
    id: 'apt-002',
    patientId: 'pat-002',
    patientName: 'Trần Thị C',
    patientPhone: '0987654321',
    doctorId: 'doc-001',
    doctorName: 'BS. Trần Thị B',
    date: new Date().toISOString().split('T')[0],
    time: '09:30',
    duration: 45,
    type: 'follow-up',
    status: 'approved',
    symptoms: 'Tái khám sau phẫu thuật',
    priority: 'high',
    bookingSource: 'walk-in',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    approvedAt: new Date().toISOString(),
    estimatedCost: 150000
  },
  {
    id: 'apt-003',
    patientId: 'pat-003',
    patientName: 'Lê Văn D',
    patientPhone: '0369852147',
    doctorId: 'doc-002',
    doctorName: 'BS. Nguyễn Văn E',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '14:00',
    duration: 30,
    type: 'routine',
    status: 'pending',
    symptoms: 'Khám sức khỏe định kỳ',
    priority: 'low',
    bookingSource: 'online',
    createdAt: new Date().toISOString(),
    estimatedCost: 300000
  }
];

const useAppointments = (): UseAppointmentsReturn => {
  const [appointments, setAppointments] = useState<AppointmentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load appointments on mount
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Load from localStorage or use mock data
        const savedAppointments = localStorage.getItem('appointments');
        if (savedAppointments) {
          setAppointments(JSON.parse(savedAppointments));
        } else {
          setAppointments(mockAppointments);
          localStorage.setItem('appointments', JSON.stringify(mockAppointments));
        }
      } catch (err) {
        setError('Không thể tải danh sách lịch hẹn');
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  // Save to localStorage whenever appointments change
  useEffect(() => {
    if (appointments.length > 0) {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    }
  }, [appointments]);

  // Computed values
  const pendingCount = appointments.filter(apt => apt.status === 'pending').length;
  const todayCount = appointments.filter(apt => 
    apt.date === new Date().toISOString().split('T')[0]
  ).length;

  // Actions
  const approveAppointment = useCallback(async (appointmentId: string, notes?: string) => {
    try {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId 
          ? { 
              ...apt, 
              status: 'approved' as const,
              approvedAt: new Date().toISOString(),
              notes: notes ? `${apt.notes || ''}\n${notes}`.trim() : apt.notes
            }
          : apt
      ));
      
      // Create notification
      const notification: NotificationItem = {
        id: `notif-${Date.now()}`,
        type: 'appointment_approved',
        title: 'Lịch hẹn đã được duyệt',
        message: `Lịch hẹn #${appointmentId.slice(-6)} đã được duyệt thành công`,
        timestamp: new Date().toISOString(),
        read: false,
        priority: 'medium',
        relatedId: appointmentId
      };
      
      // Save notification (you can implement notification system later)
      console.log('Notification created:', notification);
      
    } catch (err) {
      setError('Không thể duyệt lịch hẹn');
    } finally {
      setLoading(false);
    }
  }, []);

  const declineAppointment = useCallback(async (appointmentId: string, reason: string) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId 
          ? { 
              ...apt, 
              status: 'declined' as const,
              declineReason: reason
            }
          : apt
      ));
    } catch (err) {
      setError('Không thể từ chối lịch hẹn');
    } finally {
      setLoading(false);
    }
  }, []);

  const rescheduleAppointment = useCallback(async (appointmentId: string, newDate: string, newTime: string) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId 
          ? { 
              ...apt,
              originalDate: apt.date,
              originalTime: apt.time,
              date: newDate,
              time: newTime,
              status: 'rescheduled' as const,
              rescheduleRequested: true
            }
          : apt
      ));
    } catch (err) {
      setError('Không thể đổi lịch hẹn');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAppointmentStatus = useCallback(async (appointmentId: string, status: AppointmentRequest['status']) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status } : apt
      ));
    } catch (err) {
      setError('Không thể cập nhật trạng thái');
    } finally {
      setLoading(false);
    }
  }, []);

  const checkConflicts = useCallback((date: string, time: string, duration: number, doctorId: string, excludeId?: string): ConflictInfo[] => {
    const conflicts: ConflictInfo[] = [];
    const appointmentStart = new Date(`${date}T${time}`);
    const appointmentEnd = new Date(appointmentStart.getTime() + duration * 60000);

    // Check for overlapping appointments
    const overlapping = appointments.filter(apt => {
      if (apt.id === excludeId || apt.doctorId !== doctorId || apt.status === 'cancelled') {
        return false;
      }
      
      const existingStart = new Date(`${apt.date}T${apt.time}`);
      const existingEnd = new Date(existingStart.getTime() + apt.duration * 60000);
      
      return (appointmentStart < existingEnd && appointmentEnd > existingStart);
    });

    overlapping.forEach(apt => {
      conflicts.push({
        type: 'appointment',
        conflictingAppointmentId: apt.id,
        description: `Trùng với lịch hẹn của ${apt.patientName} (${apt.time})`,
        severity: 'high'
      });
    });

    return conflicts;
  }, [appointments]);

  const generateSuggestedSlots = useCallback((originalDate: string, duration: number, doctorId: string): TimeSlotSuggestion[] => {
    const suggestions: TimeSlotSuggestion[] = [];
    const baseDate = new Date(originalDate);
    
    // Generate suggestions for the next 7 days
    for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + dayOffset);
      const dateStr = date.toISOString().split('T')[0];
      
      // Working hours: 8:00 - 17:00
      const timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', 
                        '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];
      
      timeSlots.forEach(time => {
        const conflicts = checkConflicts(dateStr, time, duration, doctorId);
        if (conflicts.length === 0) {
          suggestions.push({
            date: dateStr,
            time,
            confidence: dayOffset === 0 ? 95 : Math.max(60, 95 - dayOffset * 10),
            reason: dayOffset === 0 ? 'Cùng ngày, khung giờ trống' : `${dayOffset} ngày sau, khung giờ trống`,
            doctorAvailability: true,
            estimatedWaitTime: Math.floor(Math.random() * 15) + 5
          });
        }
      });
    }
    
    return suggestions.slice(0, 10); // Return top 10 suggestions
  }, [checkConflicts]);

  const bulkApprove = useCallback(async (appointmentIds: string[]) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAppointments(prev => prev.map(apt => 
        appointmentIds.includes(apt.id) 
          ? { ...apt, status: 'approved' as const, approvedAt: new Date().toISOString() }
          : apt
      ));
    } catch (err) {
      setError('Không thể duyệt hàng loạt');
    } finally {
      setLoading(false);
    }
  }, []);

  const bulkDecline = useCallback(async (appointmentIds: string[], reason: string) => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAppointments(prev => prev.map(apt => 
        appointmentIds.includes(apt.id) 
          ? { ...apt, status: 'declined' as const, declineReason: reason }
          : apt
      ));
    } catch (err) {
      setError('Không thể từ chối hàng loạt');
    } finally {
      setLoading(false);
    }
  }, []);

  // Filters
  const filterByStatus = useCallback((status: AppointmentRequest['status']) => {
    return appointments.filter(apt => apt.status === status);
  }, [appointments]);

  const filterByDate = useCallback((date: string) => {
    return appointments.filter(apt => apt.date === date);
  }, [appointments]);

  const filterByDoctor = useCallback((doctorId: string) => {
    return appointments.filter(apt => apt.doctorId === doctorId);
  }, [appointments]);

  const searchAppointments = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return appointments.filter(apt => 
      apt.patientName.toLowerCase().includes(lowercaseQuery) ||
      apt.patientPhone.includes(query) ||
      apt.symptoms.toLowerCase().includes(lowercaseQuery) ||
      apt.id.toLowerCase().includes(lowercaseQuery)
    );
  }, [appointments]);

  return {
    appointments,
    loading,
    error,
    pendingCount,
    todayCount,
    approveAppointment,
    declineAppointment,
    rescheduleAppointment,
    updateAppointmentStatus,
    checkConflicts,
    generateSuggestedSlots,
    bulkApprove,
    bulkDecline,
    filterByStatus,
    filterByDate,
    filterByDoctor,
    searchAppointments
  };
};

export default useAppointments;
