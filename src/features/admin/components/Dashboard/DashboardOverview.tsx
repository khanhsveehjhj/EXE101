import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UsersIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import AdminModal from '../UI/AdminModal';
import FormField, { Input, Select, Textarea } from '../UI/FormField';

const DashboardOverview = () => {
  const navigate = useNavigate();

  // Modal states
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddClinicModal, setShowAddClinicModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states for User
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: 'active',
    address: '',
    dateOfBirth: '',
    gender: ''
  });

  // Form states for Clinic
  const [newClinic, setNewClinic] = useState({
    name: '',
    address: '',
    district: '',
    city: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    specialties: '',
    operatingHours: '',
    status: 'pending'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const stats = [
    {
      title: 'Tổng người dùng',
      value: '12,543',
      change: '+12%',
      changeType: 'increase',
      icon: UsersIcon,
      color: 'bg-blue-500'
    },
    {
      title: 'Phòng khám đối tác',
      value: '156',
      change: '+8%',
      changeType: 'increase',
      icon: BuildingOfficeIcon,
      color: 'bg-green-500'
    },
    {
      title: 'Lịch hẹn hôm nay',
      value: '324',
      change: '+15%',
      changeType: 'increase',
      icon: CalendarIcon,
      color: 'bg-purple-500'
    },
    {
      title: 'Doanh thu tháng',
      value: '₫2.4M',
      change: '+23%',
      changeType: 'increase',
      icon: CurrencyDollarIcon,
      color: 'bg-yellow-500'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'user', message: 'Người dùng mới đăng ký: Nguyễn Văn A', time: '5 phút trước' },
    { id: 2, type: 'clinic', message: 'Phòng khám ABC cập nhật thông tin', time: '10 phút trước' },
    { id: 3, type: 'booking', message: '15 lịch hẹn mới được tạo', time: '15 phút trước' },
    { id: 4, type: 'payment', message: 'Thanh toán thành công: ₫150,000', time: '20 phút trước' },
    { id: 5, type: 'alert', message: 'Cảnh báo: Server load cao', time: '25 phút trước' }
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'Có 5 phòng khám chưa cập nhật lịch làm việc', priority: 'medium' },
    { id: 2, type: 'error', message: 'Lỗi thanh toán tại 3 giao dịch', priority: 'high' },
    { id: 3, type: 'info', message: '12 người dùng cần xác thực tài khoản', priority: 'low' }
  ];

  // Form handlers for User
  const handleUserInputChange = (field: string, value: string) => {
    setNewUser(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Form handlers for Clinic
  const handleClinicInputChange = (field: string, value: string) => {
    setNewClinic(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Validation functions
  const validateUserForm = () => {
    const errors: Record<string, string> = {};
    if (!newUser.name.trim()) errors.name = 'Họ và tên là bắt buộc';
    if (!newUser.email.trim()) errors.email = 'Email là bắt buộc';
    else if (!/\S+@\S+\.\S+/.test(newUser.email)) errors.email = 'Email không hợp lệ';
    if (!newUser.phone.trim()) errors.phone = 'Số điện thoại là bắt buộc';
    else if (!/^(\+84|0)[0-9]{9,10}$/.test(newUser.phone)) errors.phone = 'Số điện thoại không hợp lệ';
    if (!newUser.role) errors.role = 'Vai trò là bắt buộc';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateClinicForm = () => {
    const errors: Record<string, string> = {};
    if (!newClinic.name.trim()) errors.name = 'Tên phòng khám là bắt buộc';
    if (!newClinic.address.trim()) errors.address = 'Địa chỉ là bắt buộc';
    if (!newClinic.phone.trim()) errors.phone = 'Số điện thoại là bắt buộc';
    else if (!/^(\+84|0)[0-9]{9,10}$/.test(newClinic.phone)) errors.phone = 'Số điện thoại không hợp lệ';
    if (!newClinic.email.trim()) errors.email = 'Email là bắt buộc';
    else if (!/\S+@\S+\.\S+/.test(newClinic.email)) errors.email = 'Email không hợp lệ';
    if (!newClinic.city) errors.city = 'Thành phố là bắt buộc';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submit handlers
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateUserForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNewUser({ name: '', email: '', phone: '', role: '', status: 'active', address: '', dateOfBirth: '', gender: '' });
      setFormErrors({});
      setShowAddUserModal(false);
      alert('Thêm người dùng thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi thêm người dùng!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClinicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateClinicForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNewClinic({ name: '', address: '', district: '', city: '', phone: '', email: '', website: '', description: '', specialties: '', operatingHours: '', status: 'pending' });
      setFormErrors({});
      setShowAddClinicModal(false);
      alert('Thêm phòng khám thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi thêm phòng khám!');
    } finally {
      setIsLoading(false);
    }
  };

  // Button click handlers
  const handleAddUser = () => setShowAddUserModal(true);
  const handleAddClinic = () => setShowAddClinicModal(true);
  const handleViewAnalytics = () => navigate('/admin/analytics');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tổng quan hệ thống</h1>
        <p className="text-gray-600">Theo dõi hoạt động và hiệu suất của nền tảng</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>

                  <p className={`text-sm ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                    {stat.change} so với tháng trước
                  </p>
                </div>

                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h2>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  </div>

                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Cảnh báo hệ thống</h2>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${alert.priority === 'high' ? 'border-red-500 bg-red-50' :
                  alert.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}>
                  <div className="flex items-start">
                    <ExclamationTriangleIcon className={`w-5 h-5 mt-0.5 ${alert.priority === 'high' ? 'text-red-500' :
                      alert.priority === 'medium' ? 'text-yellow-500' :
                        'text-blue-500'
                      }`} />

                    <div className="ml-3">
                      <p className="text-sm text-gray-900">{alert.message}</p>

                      <p className={`text-xs ${alert.priority === 'high' ? 'text-red-600' :
                        alert.priority === 'medium' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`}>
                        Mức độ: {alert.priority === 'high' ? 'Cao' : alert.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleAddUser}
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <UsersIcon className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Thêm người dùng mới</p>
          </button>

          <button
            onClick={handleAddClinic}
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BuildingOfficeIcon className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Đăng ký phòng khám</p>
          </button>

          <button
            onClick={handleViewAnalytics}
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ChartBarIcon className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Xem báo cáo chi tiết</p>
          </button>
        </div>
      </div>

      {/* Add User Modal */}
      <AdminModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        title="Thêm người dùng mới"
        size="lg"
      >
        <form onSubmit={handleUserSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Họ và tên" required error={formErrors.name}>
              <Input
                value={newUser.name}
                onChange={(value) => handleUserInputChange('name', value)}
                placeholder="Nhập họ và tên"
                required
              />
            </FormField>

            <FormField label="Email" required error={formErrors.email}>
              <Input
                type="email"
                value={newUser.email}
                onChange={(value) => handleUserInputChange('email', value)}
                placeholder="Nhập địa chỉ email"
                required
              />
            </FormField>

            <FormField label="Số điện thoại" required error={formErrors.phone}>
              <Input
                value={newUser.phone}
                onChange={(value) => handleUserInputChange('phone', value)}
                placeholder="Nhập số điện thoại"
                required
              />
            </FormField>

            <FormField label="Vai trò" required error={formErrors.role}>
              <Select
                value={newUser.role}
                onChange={(value) => handleUserInputChange('role', value)}
                options={[
                  { value: 'patient', label: 'Bệnh nhân' },
                  { value: 'doctor', label: 'Bác sĩ' },
                  { value: 'clinic_admin', label: 'Quản lý phòng khám' },
                  { value: 'receptionist', label: 'Lễ tân' },
                  { value: 'admin', label: 'Quản trị viên' }
                ]}
                placeholder="Chọn vai trò"
                required
              />
            </FormField>

            <FormField label="Giới tính">
              <Select
                value={newUser.gender}
                onChange={(value) => handleUserInputChange('gender', value)}
                options={[
                  { value: 'male', label: 'Nam' },
                  { value: 'female', label: 'Nữ' },
                  { value: 'other', label: 'Khác' }
                ]}
                placeholder="Chọn giới tính"
              />
            </FormField>

            <FormField label="Ngày sinh">
              <Input
                type="date"
                value={newUser.dateOfBirth}
                onChange={(value) => handleUserInputChange('dateOfBirth', value)}
              />
            </FormField>
          </div>

          <FormField label="Địa chỉ">
            <Input
              value={newUser.address}
              onChange={(value) => handleUserInputChange('address', value)}
              placeholder="Nhập địa chỉ"
            />
          </FormField>

          <FormField label="Trạng thái">
            <Select
              value={newUser.status}
              onChange={(value) => handleUserInputChange('status', value)}
              options={[
                { value: 'active', label: 'Hoạt động' },
                { value: 'inactive', label: 'Không hoạt động' },
                { value: 'suspended', label: 'Tạm khóa' }
              ]}
            />
          </FormField>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddUserModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {isLoading ? 'Đang thêm...' : 'Thêm người dùng'}
            </button>
          </div>
        </form>
      </AdminModal>

      {/* Add Clinic Modal */}
      <AdminModal
        isOpen={showAddClinicModal}
        onClose={() => setShowAddClinicModal(false)}
        title="Thêm phòng khám mới"
        size="xl"
      >
        <form onSubmit={handleClinicSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Tên phòng khám" required error={formErrors.name}>
              <Input
                value={newClinic.name}
                onChange={(value) => handleClinicInputChange('name', value)}
                placeholder="Nhập tên phòng khám"
                required
              />
            </FormField>

            <FormField label="Email" required error={formErrors.email}>
              <Input
                type="email"
                value={newClinic.email}
                onChange={(value) => handleClinicInputChange('email', value)}
                placeholder="Nhập địa chỉ email"
                required
              />
            </FormField>

            <FormField label="Số điện thoại" required error={formErrors.phone}>
              <Input
                value={newClinic.phone}
                onChange={(value) => handleClinicInputChange('phone', value)}
                placeholder="Nhập số điện thoại"
                required
              />
            </FormField>

            <FormField label="Website">
              <Input
                value={newClinic.website}
                onChange={(value) => handleClinicInputChange('website', value)}
                placeholder="Nhập website (tùy chọn)"
              />
            </FormField>

            <FormField label="Thành phố" required error={formErrors.city}>
              <Select
                value={newClinic.city}
                onChange={(value) => handleClinicInputChange('city', value)}
                options={[
                  { value: 'TP. Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
                  { value: 'Hà Nội', label: 'Hà Nội' },
                  { value: 'Đà Nẵng', label: 'Đà Nẵng' },
                  { value: 'Cần Thơ', label: 'Cần Thơ' },
                  { value: 'Hải Phòng', label: 'Hải Phòng' }
                ]}
                placeholder="Chọn thành phố"
                required
              />
            </FormField>

            <FormField label="Quận/Huyện">
              <Input
                value={newClinic.district}
                onChange={(value) => handleClinicInputChange('district', value)}
                placeholder="Nhập quận/huyện"
              />
            </FormField>
          </div>

          <FormField label="Địa chỉ" required error={formErrors.address}>
            <Input
              value={newClinic.address}
              onChange={(value) => handleClinicInputChange('address', value)}
              placeholder="Nhập địa chỉ chi tiết"
              required
            />
          </FormField>

          <FormField label="Mô tả">
            <Textarea
              value={newClinic.description}
              onChange={(value) => handleClinicInputChange('description', value)}
              placeholder="Mô tả về phòng khám"
              rows={3}
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Chuyên khoa">
              <Input
                value={newClinic.specialties}
                onChange={(value) => handleClinicInputChange('specialties', value)}
                placeholder="VD: Tim mạch, Nha khoa, Da liễu"
              />
            </FormField>

            <FormField label="Giờ hoạt động">
              <Input
                value={newClinic.operatingHours}
                onChange={(value) => handleClinicInputChange('operatingHours', value)}
                placeholder="VD: 8:00 - 17:00"
              />
            </FormField>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowAddClinicModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {isLoading ? 'Đang thêm...' : 'Thêm phòng khám'}
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default DashboardOverview;
