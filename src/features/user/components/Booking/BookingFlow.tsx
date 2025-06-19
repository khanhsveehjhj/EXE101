import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { Hospital, Doctor, Booking } from '@/types';
import { mockDoctors } from '@/services/MockData';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';

interface BookingData {
  hospitalId: string;
  doctorId: string;
  date: string;
  time: string;
  symptoms: string;
  patientName: string;
  patientPhone: string;
}

const BookingFlow = () => {
  const navigate = useNavigate();
  const { state, createBooking } = useApp();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(state.selectedHospital);
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
  const [bookingData, setBookingData] = useState<BookingData>({
    hospitalId: state.selectedHospital?.id || '',
    doctorId: '',
    date: '',
    time: '',
    symptoms: '',
    patientName: state.auth.user?.name || '',
    patientPhone: state.auth.user?.phone || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!state.auth.isAuthenticated) {
      navigate('/');
      return;
    }

    // If no hospital selected, redirect to hospital list
    if (!selectedHospital) {
      navigate('/hospitals');
      return;
    }

    // Load doctors for selected hospital
    const doctors = mockDoctors.filter(doctor => doctor.hospitalId === selectedHospital.id);
    setAvailableDoctors(doctors);
  }, [state.auth.isAuthenticated, selectedHospital, navigate]);

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value,
    }));
  };



  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitBooking = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const booking: Omit<Booking, 'id' | 'createdAt'> = {
      patientId: state.auth.user!.id,
      hospitalId: bookingData.hospitalId,
      doctorId: bookingData.doctorId,
      date: bookingData.date,
      time: bookingData.time,
      status: 'pending',
      symptoms: bookingData.symptoms,
    };

    createBooking(booking);
    setIsSubmitting(false);
    setBookingSuccess(true);
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Đặt lịch thành công!</h2>
          <p className="text-gray-600 mb-6">
            Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận lịch khám.
          </p>
          <div className="space-y-3">
            <Button onClick={() => navigate('/dashboard')} className="w-full">
              Xem lịch khám của tôi
            </Button>
            <button
              onClick={() => navigate('/hospitals')}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Đặt lịch khác
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep
                    ? 'bg-primary text-white'
                    : 'bg-gray-300 text-gray-600'
                    }`}
                >
                  {step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 ${step < currentStep ? 'bg-primary' : 'bg-gray-300'
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Bước {currentStep} / 4: {
                  currentStep === 1 ? 'Chọn bệnh viện' :
                    currentStep === 2 ? 'Chọn bác sĩ' :
                      currentStep === 3 ? 'Chọn thời gian' :
                        'Xác nhận thông tin'
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Step 1: Select Hospital */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Chọn bệnh viện</h2>
              {selectedHospital ? (
                <div className="border border-primary rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedHospital.image}
                      alt={selectedHospital.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary">{selectedHospital.name}</h3>
                      <p className="text-gray-600 text-sm">{selectedHospital.address}, {selectedHospital.district}</p>
                      <p className="text-gray-600 text-sm">{selectedHospital.phone}</p>
                    </div>
                    <button
                      onClick={() => navigate('/hospitals')}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Thay đổi
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <BuildingOfficeIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Vui lòng chọn bệnh viện trước khi đặt lịch</p>
                  <Button onClick={() => navigate('/hospitals')}>
                    Chọn bệnh viện
                  </Button>
                </div>
              )}

              {selectedHospital && (
                <div className="flex justify-end">
                  <Button onClick={handleNextStep}>
                    Tiếp tục
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Select Doctor */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Chọn bác sĩ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {availableDoctors.map(doctor => (
                  <div
                    key={doctor.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${bookingData.doctorId === doctor.id
                      ? 'border-primary bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                      }`}
                    onClick={() => handleInputChange('doctorId', doctor.id)}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                        <p className="text-primary text-sm">{doctor.specialty}</p>
                        <p className="text-gray-600 text-sm">{doctor.experience} năm kinh nghiệm</p>
                        <p className="text-sm text-gray-600">
                          Phí khám: {doctor.consultationFee.toLocaleString('vi-VN')}đ
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handlePrevStep}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Quay lại
                </button>
                <Button
                  onClick={handleNextStep}
                  disabled={!bookingData.doctorId}
                >
                  Tiếp tục
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Select Date & Time */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Chọn thời gian khám</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CalendarIcon className="w-4 h-4 inline mr-1" />
                    Ngày khám *
                  </label>
                  <input
                    type="date"
                    value={bookingData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <ClockIcon className="w-4 h-4 inline mr-1" />
                    Giờ khám *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(time => (
                      <button
                        key={time}
                        onClick={() => handleInputChange('time', time)}
                        className={`px-3 py-2 text-sm border rounded-md transition-colors ${bookingData.time === time
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300 hover:border-gray-400'
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Triệu chứng / Lý do khám
                </label>
                <textarea
                  value={bookingData.symptoms}
                  onChange={(e) => handleInputChange('symptoms', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Mô tả triệu chứng hoặc lý do khám bệnh..."
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handlePrevStep}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Quay lại
                </button>
                <Button
                  onClick={handleNextStep}
                  disabled={!bookingData.date || !bookingData.time}
                >
                  Tiếp tục
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirm Booking */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Xác nhận thông tin đặt lịch</h2>

              {/* Patient Info */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Thông tin bệnh nhân</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <UserIcon className="w-4 h-4 inline mr-1" />
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      value={bookingData.patientName}
                      onChange={(e) => handleInputChange('patientName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <PhoneIcon className="w-4 h-4 inline mr-1" />
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      value={bookingData.patientPhone}
                      onChange={(e) => handleInputChange('patientPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Tóm tắt lịch khám</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Bệnh viện:</span> {selectedHospital?.name}</p>
                  <p><span className="font-medium">Bác sĩ:</span> {availableDoctors.find(d => d.id === bookingData.doctorId)?.name}</p>
                  <p><span className="font-medium">Chuyên khoa:</span> {availableDoctors.find(d => d.id === bookingData.doctorId)?.specialty}</p>
                  <p><span className="font-medium">Ngày khám:</span> {new Date(bookingData.date).toLocaleDateString('vi-VN')}</p>
                  <p><span className="font-medium">Giờ khám:</span> {bookingData.time}</p>
                  {bookingData.symptoms && (
                    <p><span className="font-medium">Triệu chứng:</span> {bookingData.symptoms}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handlePrevStep}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                >
                  Quay lại
                </button>
                <Button
                  onClick={handleSubmitBooking}
                  disabled={isSubmitting || !bookingData.patientName || !bookingData.patientPhone}
                >
                  {isSubmitting ? 'Đang xử lý...' : 'Xác nhận đặt lịch'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;
