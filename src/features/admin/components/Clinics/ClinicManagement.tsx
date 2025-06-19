import { useState } from 'react';
import { 
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MapPinIcon,
  PhoneIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';

interface Clinic {
  id: string;
  name: string;
  address: string;
  district: string;
  city: string;
  phone: string;
  email: string;
  status: 'active' | 'pending' | 'suspended';
  rating: number;
  totalReviews: number;
  specialties: string[];
  registeredAt: string;
  totalDoctors: number;
  totalBookings: number;
  revenue: number;
}

const ClinicManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCity, setFilterCity] = useState('all');

  const mockClinics: Clinic[] = [
    {
      id: '1',
      name: 'Phòng khám Đa khoa ABC',
      address: '123 Nguyễn Huệ, Quận 1',
      district: 'Quận 1',
      city: 'TP. Hồ Chí Minh',
      phone: '+84 28 3822 1234',
      email: 'contact@abc-clinic.com',
      status: 'active',
      rating: 4.8,
      totalReviews: 156,
      specialties: ['Tim mạch', 'Nha khoa', 'Da liễu'],
      registeredAt: '2024-01-15',
      totalDoctors: 12,
      totalBookings: 1250,
      revenue: 2500000
    },
    {
      id: '2',
      name: 'Bệnh viện XYZ',
      address: '456 Lê Lợi, Quận 3',
      district: 'Quận 3',
      city: 'TP. Hồ Chí Minh',
      phone: '+84 28 3933 5678',
      email: 'info@xyz-hospital.com',
      status: 'pending',
      rating: 4.5,
      totalReviews: 89,
      specialties: ['Nội khoa', 'Ngoại khoa', 'Sản phụ khoa'],
      registeredAt: '2024-06-10',
      totalDoctors: 8,
      totalBookings: 0,
      revenue: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Hoạt động';
      case 'pending': return 'Chờ duyệt';
      case 'suspended': return 'Tạm khóa';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircleIcon className="w-4 h-4 text-green-500" />;
      case 'pending': return <ClockIcon className="w-4 h-4 text-yellow-500" />;
      case 'suspended': return <XCircleIcon className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  const filteredClinics = mockClinics.filter(clinic => {
    const matchesSearch = clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         clinic.phone.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || clinic.status === filterStatus;
    const matchesCity = filterCity === 'all' || clinic.city === filterCity;
    
    return matchesSearch && matchesStatus && matchesCity;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý phòng khám</h1>
          <p className="text-gray-600">Quản lý các phòng khám đối tác trên hệ thống</p>
        </div>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Thêm phòng khám
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Chờ duyệt</p>
              <p className="text-2xl font-bold text-gray-900">1</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <PhoneIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng lịch hẹn</p>
              <p className="text-2xl font-bold text-gray-900">1,250</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPinIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng doanh thu</p>
              <p className="text-2xl font-bold text-gray-900">₫2.5M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm phòng khám..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="pending">Chờ duyệt</option>
            <option value="suspended">Tạm khóa</option>
          </select>
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Tất cả thành phố</option>
            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
          </select>
        </div>
      </div>

      {/* Clinics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClinics.map((clinic) => (
          <div key={clinic.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{clinic.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-1">
                    <MapPinIcon className="w-4 h-4 mr-1" />
                    {clinic.address}, {clinic.district}, {clinic.city}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <PhoneIcon className="w-4 h-4 mr-1" />
                    {clinic.phone}
                  </div>
                </div>
                <div className="flex items-center">
                  {getStatusIcon(clinic.status)}
                  <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(clinic.status)}`}>
                    {getStatusLabel(clinic.status)}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {clinic.specialties.slice(0, 3).map((specialty, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {specialty}
                  </span>
                ))}
                {clinic.specialties.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{clinic.specialties.length - 3}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Bác sĩ</p>
                  <p className="text-lg font-semibold text-gray-900">{clinic.totalDoctors}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Lịch hẹn</p>
                  <p className="text-lg font-semibold text-gray-900">{clinic.totalBookings}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Đánh giá</p>
                  <p className="text-lg font-semibold text-gray-900">{clinic.rating}/5</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Đăng ký: {new Date(clinic.registeredAt).toLocaleDateString('vi-VN')}
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                    <EyeIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-green-600 hover:bg-green-50 rounded-md">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-md">
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicManagement;
