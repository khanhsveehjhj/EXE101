import { useState } from 'react';
import Button from '@/components/UI/Button';
import { CalendarIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';

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

const QuickBooking = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [showFullForm, setShowFullForm] = useState(false);

  const handleQuickBook = () => {
    if (selectedDepartment && selectedDate) {
      setShowFullForm(true);
    }
  };

  if (showFullForm) {
    // You can import and use the full BookingForm component here
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold text-center mb-4">Đặt lịch khám chi tiết</h3>
        <p className="text-center text-gray-600 mb-4">
          Vui lòng gọi <span className="font-bold text-primary">+84 (028) 3822-1234</span> 
          hoặc đến trực tiếp phòng khám để hoàn tất đặt lịch.
        </p>
        <div className="text-center">
          <Button onClick={() => setShowFullForm(false)}>
            Quay lại
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg p-6 text-white">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Đặt lịch khám nhanh</h3>
        <p className="text-blue-100">Chọn khoa và ngày khám để bắt đầu</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            <UserGroupIcon className="w-4 h-4 inline mr-1" />
            Chọn khoa khám
          </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full px-3 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <option value="">-- Chọn khoa --</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            <CalendarIcon className="w-4 h-4 inline mr-1" />
            Chọn ngày khám
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <div className="text-center pt-4">
          <button
            onClick={handleQuickBook}
            disabled={!selectedDepartment || !selectedDate}
            className="bg-white text-primary px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tiếp tục đặt lịch
          </button>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-blue-300">
        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <ClockIcon className="w-6 h-6 mx-auto mb-1" />
            <p>Dịch vụ 24/7</p>
          </div>
          <div>
            <UserGroupIcon className="w-6 h-6 mx-auto mb-1" />
            <p>Bác sĩ chuyên khoa</p>
          </div>
          <div>
            <CalendarIcon className="w-6 h-6 mx-auto mb-1" />
            <p>Đặt lịch linh hoạt</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickBooking;
