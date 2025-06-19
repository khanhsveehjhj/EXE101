import { useState } from 'react';
import { 
  CreditCardIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
  XMarkIcon,
  StarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';

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
      price: { monthly: 299000, yearly: 2990000 },
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
      price: { monthly: 599000, yearly: 5990000 },
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
      price: { monthly: 1299000, yearly: 12990000 },
      features: [
        'Tất cả tính năng Premium',
        'Quản lý không giới hạn',
        'Dedicated support',
        'Custom development',
        'White-label solution',
        'Advanced analytics',
        'Multi-tenant architecture',
        'SLA guarantee'
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý gói dịch vụ</h1>
          <p className="text-gray-600">Quản lý các gói dịch vụ và pricing cho hệ thống</p>
        </div>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
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
          {[
            { id: 'packages', label: 'Gói dịch vụ' },
            { id: 'subscribers', label: 'Subscribers' },
            { id: 'analytics', label: 'Phân tích' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {mockPackages.map((pkg) => (
            <div key={pkg.id} className={`bg-white rounded-lg shadow-lg overflow-hidden ${
              pkg.popular ? 'ring-2 ring-primary' : ''
            }`}>
              {pkg.popular && (
                <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                  <StarIcon className="w-4 h-4 inline mr-1" />
                  Phổ biến nhất
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{pkg.name}</h3>
                    <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getTypeColor(pkg.type)}`}>
                      {pkg.type.toUpperCase()}
                    </span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pkg.status)}`}>
                    {pkg.status === 'active' ? 'Hoạt động' : pkg.status === 'inactive' ? 'Tạm dừng' : 'Nháp'}
                  </span>
                </div>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900">
                    {formatPrice(pkg.price.monthly)}
                    {pkg.price.monthly > 0 && <span className="text-lg font-normal text-gray-600">/tháng</span>}
                  </div>
                  {pkg.price.yearly > 0 && (
                    <div className="text-sm text-gray-600">
                      {formatPrice(pkg.price.yearly)}/năm (tiết kiệm {Math.round((1 - pkg.price.yearly / (pkg.price.monthly * 12)) * 100)}%)
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
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

                <div className="space-y-2 mb-6 text-sm text-gray-600">
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

                <div className="flex space-x-2">
                  <button className="flex-1 p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                    <PencilIcon className="w-4 h-4 mx-auto" />
                  </button>
                  <button className="flex-1 p-2 text-red-600 hover:bg-red-50 rounded-md">
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
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Phân bố subscribers theo gói</h2>
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
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Doanh thu theo gói</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Biểu đồ doanh thu</p>
                </div>
              </div>
            </div>

            {/* Growth Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tăng trưởng subscribers</h2>
              <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <UsersIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Biểu đồ tăng trưởng</p>
                </div>
              </div>
            </div>
          </div>

          {/* Package Performance */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Hiệu suất gói dịch vụ</h2>
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
    </div>
  );
};

export default PackageManagement;
