import { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  TagIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';
import AdminModal from '../UI/AdminModal';
import FormField, { Input, Select, Textarea } from '../UI/FormField';

interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: {
    min: number;
    max: number;
  };
  duration: number; // in minutes
  status: 'active' | 'inactive';
  totalProviders: number;
  totalBookings: number;
  rating: number;
  createdAt: string;
}

const ServiceManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state for adding new service
  const [newService, setNewService] = useState({
    name: '',
    category: '',
    description: '',
    minPrice: '',
    maxPrice: '',
    duration: '',
    status: 'active'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const mockServices: Service[] = [
    {
      id: '1',
      name: 'Khám tổng quát',
      category: 'Khám bệnh',
      description: 'Khám sức khỏe tổng quát, kiểm tra các chỉ số cơ bản',
      price: { min: 200000, max: 500000 },
      duration: 30,
      status: 'active',
      totalProviders: 45,
      totalBookings: 1250,
      rating: 4.8,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'Siêu âm tim',
      category: 'Chẩn đoán hình ảnh',
      description: 'Siêu âm tim để kiểm tra chức năng tim mạch',
      price: { min: 300000, max: 800000 },
      duration: 45,
      status: 'active',
      totalProviders: 23,
      totalBookings: 456,
      rating: 4.9,
      createdAt: '2024-02-20'
    },
    {
      id: '3',
      name: 'Tẩy trắng răng',
      category: 'Nha khoa',
      description: 'Dịch vụ tẩy trắng răng chuyên nghiệp',
      price: { min: 500000, max: 1500000 },
      duration: 60,
      status: 'inactive',
      totalProviders: 12,
      totalBookings: 234,
      rating: 4.6,
      createdAt: '2024-03-10'
    }
  ];

  const categories = [
    'Khám bệnh',
    'Chẩn đoán hình ảnh',
    'Nha khoa',
    'Da liễu',
    'Tim mạch',
    'Mắt',
    'Tai mũi họng',
    'Xét nghiệm'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: { min: number; max: number }) => {
    if (price.min === price.max) {
      return `₫${price.min.toLocaleString()}`;
    }
    return `₫${price.min.toLocaleString()} - ₫${price.max.toLocaleString()}`;
  };

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Form handlers
  const handleInputChange = (field: string, value: string) => {
    setNewService(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!newService.name.trim()) {
      errors.name = 'Tên dịch vụ là bắt buộc';
    }

    if (!newService.category) {
      errors.category = 'Danh mục là bắt buộc';
    }

    if (!newService.description.trim()) {
      errors.description = 'Mô tả là bắt buộc';
    }

    if (!newService.minPrice.trim()) {
      errors.minPrice = 'Giá tối thiểu là bắt buộc';
    } else if (isNaN(Number(newService.minPrice)) || Number(newService.minPrice) < 0) {
      errors.minPrice = 'Giá tối thiểu phải là số hợp lệ';
    }

    if (!newService.maxPrice.trim()) {
      errors.maxPrice = 'Giá tối đa là bắt buộc';
    } else if (isNaN(Number(newService.maxPrice)) || Number(newService.maxPrice) < 0) {
      errors.maxPrice = 'Giá tối đa phải là số hợp lệ';
    } else if (Number(newService.maxPrice) < Number(newService.minPrice)) {
      errors.maxPrice = 'Giá tối đa phải lớn hơn giá tối thiểu';
    }

    if (!newService.duration.trim()) {
      errors.duration = 'Thời gian là bắt buộc';
    } else if (isNaN(Number(newService.duration)) || Number(newService.duration) <= 0) {
      errors.duration = 'Thời gian phải là số dương';
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
      setNewService({
        name: '',
        category: '',
        description: '',
        minPrice: '',
        maxPrice: '',
        duration: '',
        status: 'active'
      });
      setFormErrors({});
      setShowAddModal(false);

      // Show success message
      alert('Thêm dịch vụ thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi thêm dịch vụ!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewService({
      name: '',
      category: '',
      description: '',
      minPrice: '',
      maxPrice: '',
      duration: '',
      status: 'active'
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
          <h1 className="text-3xl font-bold text-gray-900">Quản lý dịch vụ</h1>
          <p className="text-gray-600">Quản lý các dịch vụ y tế trên hệ thống</p>
        </div>

        <Button onClick={() => setShowAddModal(true)}>
          Thêm dịch vụ mới
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TagIcon className="w-6 h-6 text-blue-600" />
            </div>

            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng dịch vụ</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TagIcon className="w-6 h-6 text-green-600" />
            </div>

            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CurrencyDollarIcon className="w-6 h-6 text-purple-600" />
            </div>

            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng lượt đặt</p>
              <p className="text-2xl font-bold text-gray-900">1,940</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TagIcon className="w-6 h-6 text-yellow-600" />
            </div>

            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đánh giá TB</p>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
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
              placeholder="Tìm kiếm dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Hoạt động</option>
            <option value="inactive">Tạm dừng</option>
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.name}</h3>
                  
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-2">
                    {service.category}
                  </span>
                </div>

                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                  {service.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{service.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Giá:</span>
                  <span className="text-sm font-medium text-gray-900">{formatPrice(service.price)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Thời gian:</span>
                  <span className="text-sm font-medium text-gray-900">{service.duration} phút</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Nhà cung cấp:</span>
                  <span className="text-sm font-medium text-gray-900">{service.totalProviders}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Lượt đặt:</span>
                  <span className="text-sm font-medium text-gray-900">{service.totalBookings}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Đánh giá:</span>
                  <span className="text-sm font-medium text-gray-900">{service.rating}/5</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Tạo: {new Date(service.createdAt).toLocaleDateString('vi-VN')}
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

      {/* Popular Services */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Dịch vụ phổ biến</h2>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {mockServices
              .sort((a, b) => b.totalBookings - a.totalBookings)
              .map((service, index) => (
                <div key={service.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-primary">{index + 1}</span>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900">{service.name}</p>
                      <p className="text-xs text-gray-500">{service.category}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{service.totalBookings} lượt</p>
                    <p className="text-xs text-gray-500">{service.rating}/5 ⭐</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Add Service Modal */}
      <AdminModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        title="Thêm dịch vụ mới"
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Tên dịch vụ" required error={formErrors.name}>
              <Input
                value={newService.name}
                onChange={(value) => handleInputChange('name', value)}
                placeholder="VD: Khám tổng quát"
                required
              />
            </FormField>

            <FormField label="Danh mục" required error={formErrors.category}>
              <Select
                value={newService.category}
                onChange={(value) => handleInputChange('category', value)}
                options={[
                  { value: 'Khám tổng quát', label: 'Khám tổng quát' },
                  { value: 'Chuyên khoa', label: 'Chuyên khoa' },
                  { value: 'Xét nghiệm', label: 'Xét nghiệm' },
                  { value: 'Chẩn đoán hình ảnh', label: 'Chẩn đoán hình ảnh' },
                  { value: 'Phẫu thuật', label: 'Phẫu thuật' },
                  { value: 'Vật lý trị liệu', label: 'Vật lý trị liệu' }
                ]}
                placeholder="Chọn danh mục"
                required
              />
            </FormField>

            <FormField label="Giá tối thiểu (VNĐ)" required error={formErrors.minPrice}>
              <Input
                type="number"
                value={newService.minPrice}
                onChange={(value) => handleInputChange('minPrice', value)}
                placeholder="VD: 200000"
                required
              />
            </FormField>

            <FormField label="Giá tối đa (VNĐ)" required error={formErrors.maxPrice}>
              <Input
                type="number"
                value={newService.maxPrice}
                onChange={(value) => handleInputChange('maxPrice', value)}
                placeholder="VD: 500000"
                required
              />
            </FormField>

            <FormField label="Thời gian (phút)" required error={formErrors.duration}>
              <Input
                type="number"
                value={newService.duration}
                onChange={(value) => handleInputChange('duration', value)}
                placeholder="VD: 30"
                required
              />
            </FormField>

            <FormField label="Trạng thái">
              <Select
                value={newService.status}
                onChange={(value) => handleInputChange('status', value)}
                options={[
                  { value: 'active', label: 'Hoạt động' },
                  { value: 'inactive', label: 'Tạm dừng' }
                ]}
              />
            </FormField>
          </div>

          <FormField label="Mô tả dịch vụ" required error={formErrors.description}>
            <Textarea
              value={newService.description}
              onChange={(value) => handleInputChange('description', value)}
              placeholder="Mô tả chi tiết về dịch vụ..."
              rows={4}
              required
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
              {isLoading ? 'Đang thêm...' : 'Thêm dịch vụ'}
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default ServiceManagement;
