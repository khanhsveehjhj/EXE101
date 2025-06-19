import { useState } from 'react';
import {
  BellIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  PlayIcon,
  PauseIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';
import AdminModal from '../UI/AdminModal';
import FormField, { Input, Select, Textarea } from '../UI/FormField';
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
  const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state for adding new template
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    type: '',
    subject: '',
    content: '',
    trigger: '',
    status: 'active'
  });

  // Form state for adding new campaign
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: '',
    subject: '',
    content: '',
    targetAudience: '',
    scheduledAt: '',
    status: 'draft'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Dữ liệu xu hướng thông báo theo ngày (7 ngày qua)
  const notificationTrendData = [
    { day: 'T2', email: 2156, sms: 1890, push: 3245, total: 7291 },
    { day: 'T3', email: 2340, sms: 2120, push: 3580, total: 8040 },
    { day: 'T4', email: 2180, sms: 1950, push: 3420, total: 7550 },
    { day: 'T5', email: 2450, sms: 2280, push: 3680, total: 8410 },
    { day: 'T6', email: 2680, sms: 2450, push: 3920, total: 9050 },
    { day: 'T7', email: 2520, sms: 2180, push: 3750, total: 8450 },
    { day: 'CN', email: 1890, sms: 1650, push: 2980, total: 6520 }
  ];

  // Dữ liệu tỷ lệ thành công theo loại thông báo
  const successRateData = [
    { type: 'Email', rate: 96.8, sent: 16216, delivered: 15698 },
    { type: 'SMS', rate: 98.2, sent: 14520, delivered: 14259 },
    { type: 'Push', rate: 94.5, sent: 24575, delivered: 23223 }
  ];

  // Dữ liệu phân bố thông báo theo trigger
  const triggerDistributionData = [
    { name: 'Nhắc nhở lịch hẹn', value: 45, count: 24750, color: '#3B82F6' },
    { name: 'Xác nhận đặt lịch', value: 28, count: 15400, color: '#10B981' },
    { name: 'Nhắc nhở thanh toán', value: 18, count: 9900, color: '#F59E0B' },
    { name: 'Theo dõi sau khám', value: 9, count: 4950, color: '#EF4444' }
  ];

  // Dữ liệu hiệu suất theo giờ trong ngày
  const hourlyPerformanceData = [
    { hour: '6h', email: 120, sms: 80, push: 200 },
    { hour: '7h', email: 180, sms: 150, push: 320 },
    { hour: '8h', email: 250, sms: 220, push: 450 },
    { hour: '9h', email: 320, sms: 280, push: 520 },
    { hour: '10h', email: 380, sms: 340, push: 580 },
    { hour: '11h', email: 420, sms: 380, push: 620 },
    { hour: '12h', email: 350, sms: 320, push: 480 },
    { hour: '13h', email: 280, sms: 250, push: 420 },
    { hour: '14h', email: 320, sms: 290, push: 480 },
    { hour: '15h', email: 380, sms: 350, push: 550 },
    { hour: '16h', email: 420, sms: 380, push: 620 },
    { hour: '17h', email: 380, sms: 340, push: 580 },
    { hour: '18h', email: 320, sms: 280, push: 480 },
    { hour: '19h', email: 250, sms: 220, push: 380 },
    { hour: '20h', email: 180, sms: 150, push: 280 },
    { hour: '21h', email: 120, sms: 100, push: 200 }
  ];

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

  // Form handlers for template
  const handleTemplateInputChange = (field: string, value: string) => {
    setNewTemplate(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Form handlers for campaign
  const handleCampaignInputChange = (field: string, value: string) => {
    setNewCampaign(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateTemplateForm = () => {
    const errors: Record<string, string> = {};
    if (!newTemplate.name.trim()) errors.name = 'Tên template là bắt buộc';
    if (!newTemplate.type) errors.type = 'Loại thông báo là bắt buộc';
    if (!newTemplate.subject.trim()) errors.subject = 'Tiêu đề là bắt buộc';
    if (!newTemplate.content.trim()) errors.content = 'Nội dung là bắt buộc';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateCampaignForm = () => {
    const errors: Record<string, string> = {};
    if (!newCampaign.name.trim()) errors.name = 'Tên chiến dịch là bắt buộc';
    if (!newCampaign.type) errors.type = 'Loại thông báo là bắt buộc';
    if (!newCampaign.subject.trim()) errors.subject = 'Tiêu đề là bắt buộc';
    if (!newCampaign.content.trim()) errors.content = 'Nội dung là bắt buộc';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleTemplateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTemplateForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNewTemplate({ name: '', type: '', subject: '', content: '', trigger: '', status: 'active' });
      setFormErrors({});
      setShowAddTemplateModal(false);
      alert('Tạo template thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCampaignSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCampaignForm()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNewCampaign({ name: '', type: '', subject: '', content: '', targetAudience: '', scheduledAt: '', status: 'draft' });
      setFormErrors({});
      setShowAddCampaignModal(false);
      alert('Tạo chiến dịch thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra!');
    } finally {
      setIsLoading(false);
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

        <Button onClick={() => activeTab === 'templates' ? setShowAddTemplateModal(true) : setShowAddCampaignModal(true)}>
          {activeTab === 'templates' ? 'Tạo template mới' : activeTab === 'campaigns' ? 'Tạo chiến dịch mới' : 'Tạo thông báo mới'}
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
              className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
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
        <div className="space-y-6">
          {/* Notification Trend Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Notification Trend */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Xu hướng thông báo 7 ngày qua</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={notificationTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 12 }}
                      interval={0}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value.toLocaleString()} thông báo`,
                        name === 'email' ? 'Email' :
                          name === 'sms' ? 'SMS' :
                            name === 'push' ? 'Push' :
                              name === 'total' ? 'Tổng cộng' : name
                      ]}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="email" stroke="#3B82F6" strokeWidth={2} name="Email" />
                    <Line type="monotone" dataKey="sms" stroke="#10B981" strokeWidth={2} name="SMS" />
                    <Line type="monotone" dataKey="push" stroke="#F59E0B" strokeWidth={2} name="Push" />
                    <Line type="monotone" dataKey="total" stroke="#EF4444" strokeWidth={3} strokeDasharray="5 5" name="Tổng cộng" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Success Rate by Type */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tỷ lệ thành công theo loại</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={successRateData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis domain={[90, 100]} />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value}%`,
                        name === 'rate' ? 'Tỷ lệ thành công' : name
                      ]}
                    />
                    <Bar dataKey="rate" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Trigger Distribution and Hourly Performance */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trigger Distribution Pie Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Phân bố theo trigger</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={triggerDistributionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {triggerDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string, props: any) => [
                        `${value}% (${props.payload.count.toLocaleString()} thông báo)`,
                        'Tỷ lệ'
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Hourly Performance Area Chart */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Hiệu suất theo giờ trong ngày</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={hourlyPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="hour"
                      tick={{ fontSize: 11 }}
                      interval={1}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value.toLocaleString()} thông báo`,
                        name === 'email' ? 'Email' :
                          name === 'sms' ? 'SMS' :
                            name === 'push' ? 'Push' : name
                      ]}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="email"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.6}
                      name="Email"
                    />
                    <Area
                      type="monotone"
                      dataKey="sms"
                      stackId="1"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.6}
                      name="SMS"
                    />
                    <Area
                      type="monotone"
                      dataKey="push"
                      stackId="1"
                      stroke="#F59E0B"
                      fill="#F59E0B"
                      fillOpacity={0.6}
                      name="Push"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Detailed Performance Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Chi tiết hiệu suất thông báo</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đã gửi</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đã nhận</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tỷ lệ thành công</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trung bình/ngày</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {successRateData.map((item) => (
                    <tr key={item.type}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 rounded-lg mr-3">
                            {item.type === 'Email' && <EnvelopeIcon className="w-5 h-5 text-blue-600" />}
                            {item.type === 'SMS' && <DevicePhoneMobileIcon className="w-5 h-5 text-green-600" />}
                            {item.type === 'Push' && <BellIcon className="w-5 h-5 text-yellow-600" />}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{item.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.sent.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.delivered.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.rate >= 98 ? 'bg-green-100 text-green-800' :
                          item.rate >= 95 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                          {item.rate}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {Math.round(item.sent / 7).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Template Modal */}
      <AdminModal
        isOpen={showAddTemplateModal}
        onClose={() => setShowAddTemplateModal(false)}
        title="Tạo template thông báo mới"
        size="lg"
      >
        <form onSubmit={handleTemplateSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Tên template" required error={formErrors.name}>
              <Input
                value={newTemplate.name}
                onChange={(value) => handleTemplateInputChange('name', value)}
                placeholder="VD: Nhắc nhở lịch hẹn"
                required
              />
            </FormField>

            <FormField label="Loại thông báo" required error={formErrors.type}>
              <Select
                value={newTemplate.type}
                onChange={(value) => handleTemplateInputChange('type', value)}
                options={[
                  { value: 'email', label: 'Email' },
                  { value: 'sms', label: 'SMS' },
                  { value: 'push', label: 'Push Notification' }
                ]}
                placeholder="Chọn loại thông báo"
                required
              />
            </FormField>
          </div>

          <FormField label="Tiêu đề" required error={formErrors.subject}>
            <Input
              value={newTemplate.subject}
              onChange={(value) => handleTemplateInputChange('subject', value)}
              placeholder="Tiêu đề thông báo"
              required
            />
          </FormField>

          <FormField label="Nội dung" required error={formErrors.content}>
            <Textarea
              value={newTemplate.content}
              onChange={(value) => handleTemplateInputChange('content', value)}
              placeholder="Nội dung thông báo..."
              rows={4}
              required
            />
          </FormField>

          <FormField label="Trigger">
            <Select
              value={newTemplate.trigger}
              onChange={(value) => handleTemplateInputChange('trigger', value)}
              options={[
                { value: 'booking_reminder', label: 'Nhắc nhở lịch hẹn' },
                { value: 'booking_confirmation', label: 'Xác nhận đặt lịch' },
                { value: 'payment_reminder', label: 'Nhắc nhở thanh toán' },
                { value: 'follow_up', label: 'Theo dõi sau khám' }
              ]}
              placeholder="Chọn trigger"
            />
          </FormField>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              onClick={() => setShowAddTemplateModal(false)}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary-dark"
            >
              {isLoading ? 'Đang tạo...' : 'Tạo template'}
            </Button>
          </div>
        </form>
      </AdminModal>

      {/* Add Campaign Modal */}
      <AdminModal
        isOpen={showAddCampaignModal}
        onClose={() => setShowAddCampaignModal(false)}
        title="Tạo chiến dịch thông báo mới"
        size="lg"
      >
        <form onSubmit={handleCampaignSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Tên chiến dịch" required error={formErrors.name}>
              <Input
                value={newCampaign.name}
                onChange={(value) => handleCampaignInputChange('name', value)}
                placeholder="VD: Khuyến mãi tháng 12"
                required
              />
            </FormField>

            <FormField label="Loại thông báo" required error={formErrors.type}>
              <Select
                value={newCampaign.type}
                onChange={(value) => handleCampaignInputChange('type', value)}
                options={[
                  { value: 'email', label: 'Email' },
                  { value: 'sms', label: 'SMS' },
                  { value: 'push', label: 'Push Notification' }
                ]}
                placeholder="Chọn loại thông báo"
                required
              />
            </FormField>
          </div>

          <FormField label="Tiêu đề" required error={formErrors.subject}>
            <Input
              value={newCampaign.subject}
              onChange={(value) => handleCampaignInputChange('subject', value)}
              placeholder="Tiêu đề chiến dịch"
              required
            />
          </FormField>

          <FormField label="Nội dung" required error={formErrors.content}>
            <Textarea
              value={newCampaign.content}
              onChange={(value) => handleCampaignInputChange('content', value)}
              placeholder="Nội dung chiến dịch..."
              rows={4}
              required
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Đối tượng mục tiêu">
              <Select
                value={newCampaign.targetAudience}
                onChange={(value) => handleCampaignInputChange('targetAudience', value)}
                options={[
                  { value: 'all', label: 'Tất cả người dùng' },
                  { value: 'patients', label: 'Bệnh nhân' },
                  { value: 'doctors', label: 'Bác sĩ' },
                  { value: 'premium', label: 'Người dùng Premium' }
                ]}
                placeholder="Chọn đối tượng"
              />
            </FormField>

            <FormField label="Thời gian gửi">
              <Input
                type="datetime-local"
                value={newCampaign.scheduledAt}
                onChange={(value) => handleCampaignInputChange('scheduledAt', value)}
              />
            </FormField>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              onClick={() => setShowAddCampaignModal(false)}
              className="bg-gray-500 hover:bg-gray-600"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary-dark"
            >
              {isLoading ? 'Đang tạo...' : 'Tạo chiến dịch'}
            </Button>
          </div>
        </form>
      </AdminModal>
    </div>
  );
};

export default NotificationCenter;
