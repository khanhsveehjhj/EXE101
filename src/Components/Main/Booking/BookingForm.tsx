import { useState } from 'react';
import Button from '@/Components/UI/Button';
import { CalendarIcon, ClockIcon, UserIcon, PhoneIcon } from '@heroicons/react/24/outline';

interface BookingData {
  fullName: string;
  phone: string;
  email: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  symptoms: string;
}

const departments = [
  { id: 'cardiology', name: 'Tim mạch' },
  { id: 'neurology', name: 'Thần kinh' },
  { id: 'orthopedics', name: 'Chấn thương chỉnh hình' },
  { id: 'surgery', name: 'Phẫu thuật' },
  { id: 'dentistry', name: 'Nha khoa' },
  { id: 'radiology', name: 'Chẩn đoán hình ảnh' },
  { id: 'urology', name: 'Tiết niệu' },
  { id: 'medicine', name: 'Nội khoa' },
];

const doctors = {
  cardiology: ['BS. Nguyễn Văn Minh', 'BS. Trần Thị Hoa'],
  neurology: ['BS. Phạm Thị Hương', 'BS. Lê Văn Đức'],
  orthopedics: ['BS. Hoàng Minh Tuấn', 'BS. Nguyễn Thị Lan'],
  surgery: ['BS. Lê Hoàng Nam', 'BS. Vũ Thị Mai'],
  dentistry: ['BS. Trần Thị Lan', 'BS. Nguyễn Văn Hải'],
  radiology: ['BS. Phạm Minh Khôi', 'BS. Lê Thị Nga'],
  urology: ['BS. Trần Văn Hùng', 'BS. Nguyễn Thị Linh'],
  medicine: ['BS. Hoàng Thị Thu', 'BS. Lê Minh Đức'],
};

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
];

const BookingForm = () => {
  const [bookingData, setBookingData] = useState<BookingData>({
    fullName: '',
    phone: '',
    email: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    symptoms: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value,
      // Reset doctor when department changes
      ...(name === 'department' && { doctor: '' })
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Booking data:', bookingData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setBookingData({
        fullName: '',
        phone: '',
        email: '',
        department: '',
        doctor: '',
        date: '',
        time: '',
        symptoms: '',
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-green-600 text-6xl mb-4">✓</div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Đặt lịch thành công!</h3>
        <p className="text-green-700">
          Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ để xác nhận lịch khám.
        </p>
      </div>
    );
  }

  const availableDoctors = bookingData.department ? doctors[bookingData.department as keyof typeof doctors] || [] : [];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-primary mb-2">Đặt lịch khám bệnh</h2>
        <p className="text-gray-600">Vui lòng điền thông tin để đặt lịch khám với bác sĩ chuyên khoa</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <UserIcon className="w-4 h-4 inline mr-1" />
              Họ và tên *
            </label>
            <input
              type="text"
              name="fullName"
              value={bookingData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nhập họ và tên"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <PhoneIcon className="w-4 h-4 inline mr-1" />
              Số điện thoại *
            </label>
            <input
              type="tel"
              name="phone"
              value={bookingData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Nhập số điện thoại"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={bookingData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Nhập email (tùy chọn)"
          />
        </div>

        {/* Department and Doctor Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Khoa khám *
            </label>
            <select
              name="department"
              value={bookingData.department}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Chọn khoa khám</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bác sĩ *
            </label>
            <select
              name="doctor"
              value={bookingData.doctor}
              onChange={handleInputChange}
              required
              disabled={!bookingData.department}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
            >
              <option value="">Chọn bác sĩ</option>
              {availableDoctors.map(doctor => (
                <option key={doctor} value={doctor}>{doctor}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Date and Time Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CalendarIcon className="w-4 h-4 inline mr-1" />
              Ngày khám *
            </label>
            <input
              type="date"
              name="date"
              value={bookingData.date}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <ClockIcon className="w-4 h-4 inline mr-1" />
              Giờ khám *
            </label>
            <select
              name="time"
              value={bookingData.time}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Chọn giờ khám</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Symptoms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Triệu chứng / Lý do khám
          </label>
          <textarea
            name="symptoms"
            value={bookingData.symptoms}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Mô tả triệu chứng hoặc lý do khám bệnh..."
          />
        </div>

        <div className="text-center">
          <Button type="submit">
            Xác nhận đặt lịch
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
