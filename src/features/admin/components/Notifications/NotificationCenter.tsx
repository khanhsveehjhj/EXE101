import { useState } from 'react';
import { 
  BellIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  PlusIcon,
  PlayIcon,
  PauseIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';

interface NotificationTemplate {
  id: string;
  name: string;
  type: 'sms' | 'email' | 'push';
  trigger: 'booking_reminder' | 'appointment_confirmation' | 'payment_reminder' | 'follow_up';
  status: 'active' | 'inactive';
  schedule: string;
  recipients: number;
  lastSent: string;
  successRate: number;
}

const NotificationCenter = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'campaigns' | 'analytics'>('templates');

  const templates: NotificationTemplate[] = [
    {
      id: '1',
      name: 'Nhắc nhở lịch hẹn - 24h trước',
      type: 'sms',
      trigger: 'booking_reminder',
      status: 'active',
      schedule: '24 giờ trước lịch hẹn',
      recipients: 1250,
      lastSent: '2024-06-19T10:30:00',
      successRate: 98.5
    },
    {
      id: '2',
      name: 'Xác nhận đặt lịch thành công',
      type: 'email',
      trigger: 'appointment_confirmation',
      status: 'active',
      schedule: 'Ngay sau khi đặt lịch',
      recipients: 890,
      lastSent: '2024-06-19T14:15:00',
      successRate: 95.2
    },
    {
      id: '3',
      name: 'Nhắc nhở thanh toán',
      type: 'push',
      trigger: 'payment_reminder',
      status: 'inactive',
      schedule: '2 giờ sau lịch hẹn',
      recipients: 0,
      lastSent: '2024-06-18T16:45:00',
      successRate: 87.3
    }
  ];

  const campaigns = [
    {
      id: '1',
      name: 'Khuyến mãi khám sức khỏe định kỳ',
      type: 'email',
      status: 'running',
      sent: 5420,
      opened: 2156,
      clicked: 432,
      startDate: '2024-06-15',
      endDate: '2024-06-30'
    },
    {
      id: '2',
      name: 'Thông báo dịch vụ mới',
      type: 'sms',
      status: 'completed',
      sent: 3200,
      opened: 3200,
      clicked: 0,
      startDate: '2024-06-10',
      endDate: '2024-06-12'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sms': return <DevicePhoneMobileIcon className="w-4 h-4" />;
      case 'email': return <EnvelopeIcon className="w-4 h-4" />;
      case 'push': return <BellIcon className="w-4 h-4" />;
      default: return <BellIcon className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sms': return 'bg-green-100 text-green-800';
      case 'email': return 'bg-blue-100 text-blue-800';
      case 'push': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trung tâm thông báo</h1>
          <p className="text-gray-600">Quản lý thông báo tự động qua SMS, Email và Push notification</p>
        </div>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Tạo thông báo mới
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <EnvelopeIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Email gửi hôm nay</p>
              <p className="text-2xl font-bold text-gray-900">2,156</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DevicePhoneMobileIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">SMS gửi hôm nay</p>
              <p className="text-2xl font-bold text-gray-900">1,890</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BellIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Push notification</p>
              <p className="text-2xl font-bold text-gray-900">3,245</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tỷ lệ thành công</p>
              <p className="text-2xl font-bold text-gray-900">96.8%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'templates', label: 'Mẫu thông báo' },
            { id: 'campaigns', label: 'Chiến dịch' },
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

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mẫu thông báo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Loại
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lịch trình
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người nhận
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tỷ lệ thành công
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {templates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{template.name}</div>
                      <div className="text-sm text-gray-500">
                        Gửi lần cuối: {new Date(template.lastSent).toLocaleString('vi-VN')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(template.type)}`}>
                        {getTypeIcon(template.type)}
                        <span className="ml-1">{template.type.toUpperCase()}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(template.status)}`}>
                        {template.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {template.schedule}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {template.recipients.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {template.successRate}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          {template.status === 'active' ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4" />}
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
        </div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(campaign.type)}`}>
                      {getTypeIcon(campaign.type)}
                      <span className="ml-1">{campaign.type.toUpperCase()}</span>
                    </span>
                    <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status === 'running' ? 'Đang chạy' : 'Hoàn thành'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{campaign.sent.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Đã gửi</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{campaign.opened.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Đã mở</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{campaign.clicked.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Đã click</p>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>
                  <ClockIcon className="w-4 h-4 inline mr-1" />
                  {new Date(campaign.startDate).toLocaleDateString('vi-VN')} - {new Date(campaign.endDate).toLocaleDateString('vi-VN')}
                </span>
                <span>
                  Tỷ lệ mở: {((campaign.opened / campaign.sent) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Phân tích hiệu suất thông báo</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BellIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Biểu đồ phân tích sẽ hiển thị ở đây</p>
              <p className="text-sm text-gray-400">Tích hợp với thư viện chart để hiển thị xu hướng</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;
