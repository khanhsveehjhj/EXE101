import { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  FunnelIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';
import AdminModal from '../UI/AdminModal';
import FormField, { Input, Select } from '../UI/FormField';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'patient' | 'doctor' | 'clinic_admin' | 'admin' | 'super_admin' | 'receptionist';
  status: 'active' | 'inactive' | 'suspended';
  registeredAt: string;
  lastLogin: string;
  totalBookings: number;
}

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  // Form state for adding new user
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

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Nguyễn Văn An',
      email: 'an.nguyen@email.com',
      phone: '+84987654321',
      role: 'patient',
      status: 'active',
      registeredAt: '2024-01-15',
      lastLogin: '2024-06-18',
      totalBookings: 5
    },
    {
      id: '2',
      name: 'Dr. Trần Thị Bình',
      email: 'binh.tran@clinic.com',
      phone: '+84912345678',
      role: 'doctor',
      status: 'active',
      registeredAt: '2024-02-20',
      lastLogin: '2024-06-19',
      totalBookings: 0
    },
    {
      id: '3',
      name: 'Lê Văn Cường',
      email: 'cuong.le@email.com',
      phone: '+84901234567',
      role: 'patient',
      status: 'inactive',
      registeredAt: '2024-03-10',
      lastLogin: '2024-05-15',
      totalBookings: 2
    },
    {
      id: '4',
      name: 'BS. Nguyễn Văn Minh',
      email: 'minh.nguyen@clinic.com',
      phone: '+84987654321',
      role: 'doctor',
      status: 'active',
      registeredAt: '2024-04-25',
      lastLogin: '2024-06-18',
      totalBookings: 10
    },
    {
      id: '5',
      name: 'Lê Thị Dung',
      email: 'dung.le@email.com',
      phone: '+84987654321',
      role: 'receptionist',
      status: 'active',
      registeredAt: '2024-06-10',
      lastLogin: '2024-06-18',
      totalBookings: 0
    },
    {
      id: '6',
      name: 'Admin Nguyễn',
      email: 'admin.nguyen@email.com',
      phone: '+84987654321',
      role: 'admin',
      status: 'active',
      registeredAt: '2024-06-10',
      lastLogin: '2024-06-18',
      totalBookings: 0
    },
    {
      id: '7',
      name: 'Nguyễn Thị Dung',
      email: 'dung.nguyen@email.com',
      phone: '+84987654321',
      role: 'patient',
      status: 'active',
      registeredAt: '2024-06-10',
      lastLogin: '2024-06-18',
      totalBookings: 0
    },
    {
      id: '8',
      name: 'Dr. Phạm Văn Nam',
      email: 'nam.pham@clinic.com',
      phone: '+84912345678',
      role: 'doctor',
      status: 'inactive',
      registeredAt: '2024-06-10',
      lastLogin: '2024-06-18',
      totalBookings: 4
    },
    {
      id: '9',
      name: 'Phòng khám XYZ',
      email: 'xyz.clinic@email.com',
      phone: '+84987654321',
      role: 'clinic_admin',
      status: 'active',
      registeredAt: '2024-06-10',
      lastLogin: '2024-06-18',
      totalBookings: 0
    },
    {
      id: '10',
      name: 'Admin',
      email: 'admin@email.com',
      phone: '+84987654321',
      role: 'admin',
      status: 'active',
      registeredAt: '2024-06-10',
      lastLogin: '2024-06-18',
      totalBookings: 3
    },
    {
      id: '11',
      name: 'Lê Thị Hoa',
      email: 'hoa.le@email.com',
      phone: '+84987654321',
      role: 'patient',
      status: 'inactive',
      registeredAt: '2024-06-10',
      lastLogin: '2024-06-18',
      totalBookings: 0
    },
    {
      id: '12',
      name: 'BS. Nguyễn Thị Oanh',
      email: 'oanh.nguyen@clinic.com',
      phone: '+84912345678',
      role: 'doctor',
      status: 'active',
      registeredAt: '2024-06-10',
      lastLogin: '2024-06-18',
      totalBookings: 2
    }

  ];

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'patient': return 'Bệnh nhân';
      case 'doctor': return 'Bác sĩ';
      case 'clinic_admin': return 'Quản lý phòng khám';
      case 'admin': return 'Quản trị viên';
      case 'receptionist': return 'Lễ tân';
      default: return role;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Hoạt động';
      case 'inactive': return 'Không hoạt động';
      case 'suspended': return 'Tạm khóa';
      default: return status;
    }
  };

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination calculations
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  // Calculate display range
  const displayStart = totalUsers === 0 ? 0 : startIndex + 1;
  const displayEnd = Math.min(endIndex, totalUsers);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterRole, filterStatus]);

  // Pagination handlers
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // Form handlers
  const handleInputChange = (field: string, value: string) => {
    setNewUser(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!newUser.name.trim()) {
      errors.name = 'Họ tên là bắt buộc';
    }

    if (!newUser.email.trim()) {
      errors.email = 'Email là bắt buộc';
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      errors.email = 'Email không hợp lệ';
    }

    if (!newUser.phone.trim()) {
      errors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^(\+84|0)[0-9]{9,10}$/.test(newUser.phone)) {
      errors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!newUser.role) {
      errors.role = 'Vai trò là bắt buộc';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Reset form and close modal
      setNewUser({
        name: '',
        email: '',
        phone: '',
        role: '',
        status: 'active',
        address: '',
        dateOfBirth: '',
        gender: ''
      });
      setFormErrors({});
      setShowAddModal(false);

      // Show success message (you can implement toast notification here)
      alert('Thêm người dùng thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi thêm người dùng!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      role: '',
      status: 'active',
      address: '',
      dateOfBirth: '',
      gender: ''
    });
    setFormErrors({});
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý người dùng</h1>
          <p className="text-gray-600">Quản lý tài khoản người dùng trên hệ thống</p>
        </div>

        <Button onClick={() => setShowAddModal(true)}>
          Thêm người dùng
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm người dùng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Role Filter */}
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="patient">Bệnh nhân</option>
            <option value="doctor">Bác sĩ</option>
            <option value="clinic_admin">Quản lý phòng khám</option>
            <option value="admin">Quản trị viên</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Không hoạt động</option>
            <option value="suspended">Tạm khóa</option>
          </select>

          {/* Advanced Filter Button */}
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <FunnelIcon className="w-4 h-4 mr-2" />
            Bộ lọc nâng cao
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Người dùng
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vai trò
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Đăng ký
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lần cuối đăng nhập
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lịch hẹn
                </th>

                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{getRoleLabel(user.role)}</span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {getStatusLabel(user.status)}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(user.registeredAt).toLocaleDateString('vi-VN')}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(user.lastLogin).toLocaleDateString('vi-VN')}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.totalBookings}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="w-4 h-4" />
                      </button>

                      <button className="text-green-600 hover:text-green-900">
                        <PencilIcon className="w-4 h-4" />
                      </button>

                      <button className="text-red-600 hover:text-red-900">
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="w-4 h-4 mr-1" />
              Trước
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
              <ChevronRightIcon className="w-4 h-4 ml-1" />
            </button>
          </div>

          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">{displayStart}</span> đến <span className="font-medium">{displayEnd}</span> trong tổng số <span className="font-medium">{totalUsers}</span> kết quả
              </p>
            </div>

            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                  <span className="sr-only">Trước</span>
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${page === currentPage
                      ? 'z-10 bg-primary border-primary text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                  <span className="sr-only">Sau</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <AdminModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        title="Thêm người dùng mới"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Họ và tên" required error={formErrors.name}>
              <Input
                value={newUser.name}
                onChange={(value) => handleInputChange('name', value)}
                placeholder="Nhập họ và tên"
                required
              />
            </FormField>

            <FormField label="Email" required error={formErrors.email}>
              <Input
                type="email"
                value={newUser.email}
                onChange={(value) => handleInputChange('email', value)}
                placeholder="Nhập địa chỉ email"
                required
              />
            </FormField>

            <FormField label="Số điện thoại" required error={formErrors.phone}>
              <Input
                value={newUser.phone}
                onChange={(value) => handleInputChange('phone', value)}
                placeholder="Nhập số điện thoại"
                required
              />
            </FormField>

            <FormField label="Vai trò" required error={formErrors.role}>
              <Select
                value={newUser.role}
                onChange={(value) => handleInputChange('role', value)}
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
                onChange={(value) => handleInputChange('gender', value)}
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
                onChange={(value) => handleInputChange('dateOfBirth', value)}
              />
            </FormField>
          </div>

          <FormField label="Địa chỉ">
            <Input
              value={newUser.address}
              onChange={(value) => handleInputChange('address', value)}
              placeholder="Nhập địa chỉ"
            />
          </FormField>

          <FormField label="Trạng thái">
            <Select
              value={newUser.status}
              onChange={(value) => handleInputChange('status', value)}
              options={[
                { value: 'active', label: 'Hoạt động' },
                { value: 'inactive', label: 'Không hoạt động' },
                { value: 'suspended', label: 'Tạm khóa' }
              ]}
            />
          </FormField>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              onClick={handleCloseModal}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Hủy
            </Button>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary-dark"
            >
              {isLoading ? 'Đang thêm...' : 'Thêm người dùng'}
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default UserManagement;
