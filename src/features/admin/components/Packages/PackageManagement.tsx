import { useState } from 'react';
import {
  CreditCardIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  StarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import AdminModal from '../UI/AdminModal';
import FormField, { Input, Select, Textarea } from '../UI/FormField';
import Button from '@/components/UI/Button';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ServicePackage {
  id: string;
  name: string;
  type: 'freemium' | 'basic' | 'premium' | 'enterprise';
  price: {
    monthly: number;
    yearly: number;
  };
  features: string[];
  limitations: {
    maxBookings: number;
    maxClinics: number;
    maxDoctors: number;
    supportLevel: 'basic' | 'priority' | '24/7';
  };
  status: 'active' | 'inactive' | 'draft';
  subscribers: number;
  revenue: number;
  createdAt: string;
  popular?: boolean;
}

const PackageManagement = () => {
  const [activeTab, setActiveTab] = useState<'packages' | 'subscribers' | 'analytics'>('packages');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state for adding new package
  const [newPackage, setNewPackage] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    features: '',
    maxBookings: '',
    maxDoctors: '',
    priority: 'normal',
    status: 'active'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Dữ liệu xu hướng doanh thu theo tháng
  const revenueData = [
    { month: 'T1', freemium: 0, basic: 45, premium: 85, enterprise: 120 },
    { month: 'T2', freemium: 0, basic: 52, premium: 92, enterprise: 135 },
    { month: 'T3', freemium: 0, basic: 48, premium: 88, enterprise: 142 },
    { month: 'T4', freemium: 0, basic: 58, premium: 95, enterprise: 158 },
    { month: 'T5', freemium: 0, basic: 65, premium: 102, enterprise: 165 },
    { month: 'T6', freemium: 0, basic: 72, premium: 108, enterprise: 178 },
    { month: 'T7', freemium: 0, basic: 68, premium: 115, enterprise: 185 },
    { month: 'T8', freemium: 0, basic: 75, premium: 122, enterprise: 192 },
    { month: 'T9', freemium: 0, basic: 82, premium: 128, enterprise: 205 },
    { month: 'T10', freemium: 0, basic: 89, premium: 135, enterprise: 218 },
    { month: 'T11', freemium: 0, basic: 95, premium: 142, enterprise: 225 },
    { month: 'T12', freemium: 0, basic: 102, premium: 148, enterprise: 238 }
  ];

  // Dữ liệu xu hướng subscribers theo tháng
  const subscribersData = [
    { month: 'T1', freemium: 980, basic: 320, premium: 85, enterprise: 15 },
    { month: 'T2', freemium: 1050, basic: 345, premium: 92, enterprise: 18 },
    { month: 'T3', freemium: 1120, basic: 368, premium: 98, enterprise: 19 },
    { month: 'T4', freemium: 1180, basic: 392, premium: 105, enterprise: 20 },
    { month: 'T5', freemium: 1220, basic: 415, premium: 112, enterprise: 21 },
    { month: 'T6', freemium: 1250, basic: 438, premium: 118, enterprise: 22 },
    { month: 'T7', freemium: 1280, basic: 452, premium: 125, enterprise: 23 },
    { month: 'T8', freemium: 1310, basic: 465, premium: 132, enterprise: 24 },
    { month: 'T9', freemium: 1340, basic: 478, premium: 138, enterprise: 25 },
    { month: 'T10', freemium: 1365, basic: 490, premium: 145, enterprise: 26 },
    { month: 'T11', freemium: 1385, basic: 502, premium: 151, enterprise: 27 },
    { month: 'T12', freemium: 1400, basic: 515, premium: 158, enterprise: 28 }
  ];

  // Dữ liệu phân bố subscribers hiện tại cho pie chart
  const currentSubscribersDistribution = [
    { name: 'Freemium', value: 1400, percentage: 67.3, color: '#8884d8' },
    { name: 'Basic', value: 515, percentage: 24.8, color: '#82ca9d' },
    { name: 'Premium', value: 158, percentage: 7.6, color: '#ffc658' },
    { name: 'Enterprise', value: 28, percentage: 1.3, color: '#ff7300' }
  ];

  // Dữ liệu subscribers chi tiết (mock data)
  const subscribersDetails = [
    { id: '1', name: 'Phòng khám ABC', email: 'abc@clinic.com', package: 'Premium', joinDate: '2024-01-15', status: 'active', revenue: 700000 },
    { id: '2', name: 'Phòng khám XYZ', email: 'xyz@hospital.com', package: 'Enterprise', joinDate: '2024-02-01', status: 'active', revenue: 1500000 },
    { id: '3', name: 'Phòng khám DEF', email: 'def@clinic.com', package: 'Basic', joinDate: '2024-02-15', status: 'active', revenue: 500000 },
    { id: '4', name: 'Phòng khám GHI', email: 'ghi@clinic.com', package: 'Premium', joinDate: '2024-03-01', status: 'inactive', revenue: 0 },
    { id: '5', name: 'Phòng khám JKL', email: 'jkl@clinic.com', package: 'Basic', joinDate: '2024-03-10', status: 'active', revenue: 500000 },
  ];



  const mockPackages: ServicePackage[] = [
    {
      id: '1',
      name: 'Freemium',
      type: 'freemium',
      price: { monthly: 0, yearly: 0 },
      features: [
        'Tối đa 10 lịch hẹn/tháng',
        'Quản lý thông tin cơ bản',
        'Hỗ trợ email',
        'Báo cáo cơ bản'
      ],
      limitations: {
        maxBookings: 10,
        maxClinics: 1,
        maxDoctors: 2,
        supportLevel: 'basic'
      },
      status: 'active',
      subscribers: 1250,
      revenue: 0,
      createdAt: '2024-01-01'
    },
    {
      id: '2',
      name: 'Basic',
      type: 'basic',
      price: { monthly: 500000, yearly: 4800000 },
      features: [
        'Tối đa 100 lịch hẹn/tháng',
        'Quản lý đầy đủ thông tin',
        'Hỗ trợ email & chat',
        'Báo cáo chi tiết',
        'Tích hợp thanh toán',
        'Thông báo SMS'
      ],
      limitations: {
        maxBookings: 100,
        maxClinics: 1,
        maxDoctors: 5,
        supportLevel: 'priority'
      },
      status: 'active',
      subscribers: 456,
      revenue: 136344000,
      createdAt: '2024-01-01'
    },
    {
      id: '3',
      name: 'Premium',
      type: 'premium',
      price: { monthly: 700000, yearly: 5800000 },
      features: [
        'Lịch hẹn không giới hạn',
        'Quản lý đa phòng khám',
        'Hỗ trợ 24/7',
        'Báo cáo nâng cao',
        'API tích hợp',
        'Thông báo đa kênh',
        'Tùy chỉnh giao diện',
        'Backup tự động'
      ],
      limitations: {
        maxBookings: -1, // unlimited
        maxClinics: 5,
        maxDoctors: 20,
        supportLevel: '24/7'
      },
      status: 'active',
      subscribers: 123,
      revenue: 73677000,
      createdAt: '2024-01-01',
      popular: true
    },
    {
      id: '4',
      name: 'Enterprise',
      type: 'enterprise',
      price: { monthly: 1500000, yearly: 9800000 },
      features: [
        'Tất cả tính năng Premium',
        'Quản lý không giới hạn',
        'Hỗ trợ chuyên nghiệp',
        'Phát triển theo yêu cầu',
        'Giải pháp nhãn trắng',
        'Phân tích nâng cao',
        'Kiến trúc đa người thuê',
        'Đảm bảo SLA'
      ],
      limitations: {
        maxBookings: -1,
        maxClinics: -1,
        maxDoctors: -1,
        supportLevel: '24/7'
      },
      status: 'active',
      subscribers: 23,
      revenue: 29877000,
      createdAt: '2024-01-01'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'freemium': return 'bg-gray-100 text-gray-800';
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'enterprise': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'Miễn phí';
    return `₫${price.toLocaleString()}`;
  };

  const totalRevenue = mockPackages.reduce((sum, pkg) => sum + pkg.revenue, 0);
  const totalSubscribers = mockPackages.reduce((sum, pkg) => sum + pkg.subscribers, 0);

  // Metrics cho subscribers
  const subscriberMetrics = {
    totalActive: subscribersDetails.filter(s => s.status === 'active').length,
    totalInactive: subscribersDetails.filter(s => s.status === 'inactive').length,
    newThisMonth: 12,
    churnRate: 2.3,
    avgRevenuePerUser: totalRevenue / totalSubscribers
  };

  // Form handlers
  const handleInputChange = (field: string, value: string) => {
    setNewPackage(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!newPackage.name.trim()) {
      errors.name = 'Tên gói là bắt buộc';
    }

    if (!newPackage.description.trim()) {
      errors.description = 'Mô tả là bắt buộc';
    }

    if (!newPackage.price.trim()) {
      errors.price = 'Giá là bắt buộc';
    } else if (isNaN(Number(newPackage.price)) || Number(newPackage.price) < 0) {
      errors.price = 'Giá phải là số hợp lệ';
    }

    if (!newPackage.duration.trim()) {
      errors.duration = 'Thời hạn là bắt buộc';
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
      setNewPackage({
        name: '',
        description: '',
        price: '',
        duration: '',
        features: '',
        maxBookings: '',
        maxDoctors: '',
        priority: 'normal',
        status: 'active'
      });
      setFormErrors({});
      setShowAddModal(false);

      // Show success message
      alert('Tạo gói dịch vụ thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi tạo gói dịch vụ!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setNewPackage({
      name: '',
      description: '',
      price: '',
      duration: '',
      features: '',
      maxBookings: '',
      maxDoctors: '',
      priority: 'normal',
      status: 'active'
    });
    setFormErrors({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý gói dịch vụ</h1>
          <p className="text-gray-600">Quản lý các gói dịch vụ và pricing cho hệ thống</p>
        </div>

        <Button onClick={() => setShowAddModal(true)}>
          Tạo gói mới
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCardIcon className="w-6 h-6 text-blue-600" />
            </div>

            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng gói</p>
              <p className="text-2xl font-bold text-gray-900">{mockPackages.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UsersIcon className="w-6 h-6 text-green-600" />
            </div>

            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{totalSubscribers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CurrencyDollarIcon className="w-6 h-6 text-purple-600" />
            </div>

            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Doanh thu tháng</p>
              <p className="text-2xl font-bold text-gray-900">₫{(totalRevenue / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-yellow-600" />
            </div>

            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">ARPU</p>
              <p className="text-2xl font-bold text-gray-900">₫{Math.round(totalRevenue / totalSubscribers).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {([
            { id: 'packages' as const, label: 'Gói dịch vụ' },
            { id: 'subscribers' as const, label: 'Subscribers' },
            { id: 'analytics' as const, label: 'Phân tích' }
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Packages Tab */}
      {activeTab === 'packages' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockPackages.map((pkg) => (
            <div key={pkg.id} className={`bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full ${pkg.popular ? 'ring-2 ring-primary' : ''
              }`}>
              {/* Popular Badge - Fixed Height Section */}
              <div className="h-10 flex items-center justify-center">
                {pkg.popular && (
                  <div className="bg-primary text-white text-center py-2 text-sm font-medium w-full">
                    <StarIcon className="w-4 h-4 inline mr-1" />
                    Phổ biến nhất
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                {/* Header Section - Fixed Height */}
                <div className="flex justify-between items-start mb-4 min-h-[60px]">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.name}</h3>

                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(pkg.type)}`}>
                      {pkg.type.toUpperCase()}
                    </span>
                  </div>

                  <span className={`px-2 py-1 text-xs font-semibold rounded-full flex-shrink-0 ml-2 ${getStatusColor(pkg.status)}`}>
                    {pkg.status === 'active' ? 'Hoạt động' : pkg.status === 'inactive' ? 'Tạm dừng' : 'Nháp'}
                  </span>
                </div>

                {/* Price Section - Fixed Height */}
                <div className="mb-6 min-h-[80px] flex flex-col justify-center">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatPrice(pkg.price.monthly)}
                    {pkg.price.monthly > 0 && <span className="text-lg font-normal text-gray-600">/tháng</span>}
                  </div>

                  {pkg.price.yearly > 0 && (
                    <div className="text-sm text-gray-600 mt-1">
                      {formatPrice(pkg.price.yearly)}/năm (tiết kiệm {Math.round((1 - pkg.price.yearly / (pkg.price.monthly * 12)) * 100)}%)
                    </div>
                  )}
                </div>

                {/* Features Section - Flexible Height */}
                <div className="mb-6 flex-1">
                  <div className="space-y-3 min-h-[120px]">
                    {pkg.features.slice(0, 4).map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckIcon className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}

                    {pkg.features.length > 4 && (
                      <div className="text-sm text-gray-500">
                        +{pkg.features.length - 4} tính năng khác
                      </div>
                    )}
                  </div>
                </div>

                {/* Metrics Section - Fixed Height */}
                <div className="space-y-2 mb-6 text-sm text-gray-600 min-h-[72px]">
                  <div className="flex justify-between">
                    <span>Subscribers:</span>
                    <span className="font-medium">{pkg.subscribers.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Doanh thu:</span>
                    <span className="font-medium">₫{(pkg.revenue / 1000000).toFixed(1)}M</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Lịch hẹn tối đa:</span>
                    <span className="font-medium">
                      {pkg.limitations.maxBookings === -1 ? 'Không giới hạn' : pkg.limitations.maxBookings}
                    </span>
                  </div>
                </div>

                {/* Action Buttons - Fixed at Bottom */}
                <div className="flex space-x-2 mt-auto">
                  <button className="flex-1 p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                    <PencilIcon className="w-4 h-4 mx-auto" />
                  </button>

                  <button className="flex-1 p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                    <TrashIcon className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subscribers Tab */}
      {activeTab === 'subscribers' && (
        <div className="space-y-6">
          {/* Subscriber Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Subscribers</p>
                  <p className="text-2xl font-bold text-gray-900">{subscriberMetrics.totalActive}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Inactive Subscribers</p>
                  <p className="text-2xl font-bold text-gray-900">{subscriberMetrics.totalInactive}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">New This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{subscriberMetrics.newThisMonth}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <ChartBarIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Churn Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{subscriberMetrics.churnRate}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Subscribers Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Distribution */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Phân bố subscribers hiện tại</h2>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentSubscribersDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {currentSubscribersDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value.toLocaleString()} người`, 'Subscribers']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Growth Trend */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Xu hướng tăng trưởng 12 tháng</h2>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={subscribersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value.toLocaleString()} người`,
                        name === 'freemium' ? 'Freemium' :
                          name === 'basic' ? 'Basic' :
                            name === 'premium' ? 'Premium' :
                              name === 'enterprise' ? 'Enterprise' : name
                      ]}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="freemium" stroke="#8884d8" strokeWidth={2} name="Freemium" />
                    <Line type="monotone" dataKey="basic" stroke="#82ca9d" strokeWidth={2} name="Basic" />
                    <Line type="monotone" dataKey="premium" stroke="#ffc658" strokeWidth={2} name="Premium" />
                    <Line type="monotone" dataKey="enterprise" stroke="#ff7300" strokeWidth={2} name="Enterprise" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Chi tiết subscribers theo gói</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {mockPackages.map((pkg) => {
                  const percentage = (pkg.subscribers / totalSubscribers) * 100;
                  return (
                    <div key={pkg.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-900">{pkg.name}</span>
                          <span className="text-sm text-gray-600">{pkg.subscribers.toLocaleString()} ({percentage.toFixed(1)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Subscribers Details Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Chi tiết subscribers</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gói</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tham gia</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doanh thu</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subscribersDetails.map((subscriber) => (
                    <tr key={subscriber.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{subscriber.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{subscriber.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${subscriber.package === 'Enterprise' ? 'bg-yellow-100 text-yellow-800' :
                          subscriber.package === 'Premium' ? 'bg-purple-100 text-purple-800' :
                            subscriber.package === 'Basic' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                          }`}>
                          {subscriber.package}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(subscriber.joinDate).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${subscriber.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                          {subscriber.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₫{subscriber.revenue.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Analytics Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₫{(totalRevenue / 1000000).toFixed(1)}M</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ChartBarIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                  <p className="text-2xl font-bold text-gray-900">+12.5%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">8.3%</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <CreditCardIcon className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">LTV/CAC Ratio</p>
                  <p className="text-2xl font-bold text-gray-900">3.2x</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Xu hướng doanh thu theo gói (triệu VNĐ)</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `₫${value}M`,
                        name === 'basic' ? 'Basic' :
                          name === 'premium' ? 'Premium' :
                            name === 'enterprise' ? 'Enterprise' : name
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="basic"
                      stroke="#82ca9d"
                      strokeWidth={2}
                      name="Basic"
                    />
                    <Line
                      type="monotone"
                      dataKey="premium"
                      stroke="#ffc658"
                      strokeWidth={2}
                      name="Premium"
                    />
                    <Line
                      type="monotone"
                      dataKey="enterprise"
                      stroke="#ff7300"
                      strokeWidth={2}
                      name="Enterprise"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Xu hướng tăng trưởng subscribers</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={subscribersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      interval={0}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value.toLocaleString()} người`,
                        name === 'freemium' ? 'Freemium' :
                          name === 'basic' ? 'Basic' :
                            name === 'premium' ? 'Premium' :
                              name === 'enterprise' ? 'Enterprise' : name
                      ]}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="freemium"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      name="Freemium"
                    />
                    <Area
                      type="monotone"
                      dataKey="basic"
                      stackId="1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      name="Basic"
                    />
                    <Area
                      type="monotone"
                      dataKey="premium"
                      stackId="1"
                      stroke="#ffc658"
                      fill="#ffc658"
                      name="Premium"
                    />
                    <Area
                      type="monotone"
                      dataKey="enterprise"
                      stackId="1"
                      stroke="#ff7300"
                      fill="#ff7300"
                      name="Enterprise"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Additional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subscribers Distribution Pie Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Phân bố subscribers hiện tại</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentSubscribersDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                    >
                      {currentSubscribersDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => [`${value.toLocaleString()} người`, 'Subscribers']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Package Comparison Bar Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">So sánh hiệu suất gói (tháng hiện tại)</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Freemium', subscribers: 1400, revenue: 0, arpu: 0 },
                    { name: 'Basic', subscribers: 515, revenue: 102, arpu: 198 },
                    { name: 'Premium', subscribers: 158, revenue: 148, arpu: 937 },
                    { name: 'Enterprise', subscribers: 28, revenue: 238, arpu: 8500 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        name === 'subscribers' ? `${value.toLocaleString()} người` :
                          name === 'revenue' ? `₫${value}M` :
                            name === 'arpu' ? `₫${value.toLocaleString()}` : value,
                        name === 'subscribers' ? 'Subscribers' :
                          name === 'revenue' ? 'Doanh thu' :
                            name === 'arpu' ? 'ARPU' : name
                      ]}
                    />
                    <Legend />
                    <Bar yAxisId="left" dataKey="subscribers" fill="#8884d8" name="Subscribers" />
                    <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Doanh thu (M)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Package Performance Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Hiệu suất chi tiết gói dịch vụ</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gói</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribers</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doanh thu</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ARPU</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockPackages.map((pkg) => (
                    <tr key={pkg.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">{pkg.name}</span>
                          {pkg.popular && <StarIcon className="w-4 h-4 text-yellow-400 ml-2" />}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {pkg.subscribers.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₫{(pkg.revenue / 1000000).toFixed(1)}M
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₫{pkg.subscribers > 0 ? Math.round(pkg.revenue / pkg.subscribers).toLocaleString() : '0'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(Math.random() * 15 + 5).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Package Modal */}
      <AdminModal
        isOpen={showAddModal}
        onClose={handleCloseModal}
        title="Tạo gói dịch vụ mới"
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Tên gói" required error={formErrors.name}>
              <Input
                value={newPackage.name}
                onChange={(value) => handleInputChange('name', value)}
                placeholder="VD: Premium Plan"
                required
              />
            </FormField>

            <FormField label="Giá (VNĐ/tháng)" required error={formErrors.price}>
              <Input
                type="number"
                value={newPackage.price}
                onChange={(value) => handleInputChange('price', value)}
                placeholder="VD: 299000"
                required
              />
            </FormField>

            <FormField label="Thời hạn" required error={formErrors.duration}>
              <Select
                value={newPackage.duration}
                onChange={(value) => handleInputChange('duration', value)}
                options={[
                  { value: '1', label: '1 tháng' },
                  { value: '3', label: '3 tháng' },
                  { value: '6', label: '6 tháng' },
                  { value: '12', label: '12 tháng' },
                  { value: 'unlimited', label: 'Không giới hạn' }
                ]}
                placeholder="Chọn thời hạn"
                required
              />
            </FormField>

            <FormField label="Ưu tiên">
              <Select
                value={newPackage.priority}
                onChange={(value) => handleInputChange('priority', value)}
                options={[
                  { value: 'low', label: 'Thấp' },
                  { value: 'normal', label: 'Bình thường' },
                  { value: 'high', label: 'Cao' },
                  { value: 'premium', label: 'Premium' }
                ]}
              />
            </FormField>

            <FormField label="Số lịch hẹn tối đa">
              <Input
                type="number"
                value={newPackage.maxBookings}
                onChange={(value) => handleInputChange('maxBookings', value)}
                placeholder="VD: 50 (để trống = không giới hạn)"
              />
            </FormField>

            <FormField label="Số bác sĩ tối đa">
              <Input
                type="number"
                value={newPackage.maxDoctors}
                onChange={(value) => handleInputChange('maxDoctors', value)}
                placeholder="VD: 5 (để trống = không giới hạn)"
              />
            </FormField>
          </div>

          <FormField label="Mô tả" required error={formErrors.description}>
            <Textarea
              value={newPackage.description}
              onChange={(value) => handleInputChange('description', value)}
              placeholder="Mô tả chi tiết về gói dịch vụ"
              rows={3}
              required
            />
          </FormField>

          <FormField label="Tính năng">
            <Textarea
              value={newPackage.features}
              onChange={(value) => handleInputChange('features', value)}
              placeholder="Liệt kê các tính năng, mỗi tính năng một dòng"
              rows={4}
            />
          </FormField>

          <FormField label="Trạng thái">
            <Select
              value={newPackage.status}
              onChange={(value) => handleInputChange('status', value)}
              options={[
                { value: 'active', label: 'Hoạt động' },
                { value: 'inactive', label: 'Tạm dừng' },
                { value: 'draft', label: 'Nháp' }
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
              {isLoading ? 'Đang tạo...' : 'Tạo gói dịch vụ'}
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default PackageManagement;
