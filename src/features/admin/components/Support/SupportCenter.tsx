import { useState } from 'react';
import { 
  LifebuoyIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'billing' | 'general' | 'urgent';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  requester: {
    name: string;
    email: string;
    role: 'patient' | 'clinic' | 'doctor';
  };
  assignee?: string;
  createdAt: string;
  updatedAt: string;
  responseTime?: number; // in hours
}

interface SOPDocument {
  id: string;
  title: string;
  category: string;
  description: string;
  lastUpdated: string;
  version: string;
  downloads: number;
}

const SupportCenter = () => {
  const [activeTab, setActiveTab] = useState<'tickets' | 'sop' | 'knowledge'>('tickets');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockTickets: SupportTicket[] = [
    {
      id: '1',
      title: 'Không thể đăng nhập vào hệ thống',
      description: 'Người dùng báo cáo không thể đăng nhập sau khi đổi mật khẩu',
      category: 'technical',
      priority: 'high',
      status: 'open',
      requester: {
        name: 'Nguyễn Văn A',
        email: 'a.nguyen@email.com',
        role: 'patient'
      },
      assignee: 'Admin Team',
      createdAt: '2024-06-19T09:30:00',
      updatedAt: '2024-06-19T10:15:00',
      responseTime: 0.75
    },
    {
      id: '2',
      title: 'Vấn đề thanh toán online',
      description: 'Phòng khám báo cáo lỗi khi xử lý thanh toán qua cổng payment',
      category: 'billing',
      priority: 'critical',
      status: 'in_progress',
      requester: {
        name: 'Phòng khám ABC',
        email: 'contact@abc-clinic.com',
        role: 'clinic'
      },
      assignee: 'Tech Support',
      createdAt: '2024-06-19T08:00:00',
      updatedAt: '2024-06-19T11:30:00',
      responseTime: 2
    }
  ];

  const mockSOPs: SOPDocument[] = [
    {
      id: '1',
      title: 'Quy trình xử lý khiếu nại người dùng',
      category: 'Customer Service',
      description: 'Hướng dẫn chi tiết cách xử lý các khiếu nại từ người dùng',
      lastUpdated: '2024-06-15',
      version: '2.1',
      downloads: 45
    },
    {
      id: '2',
      title: 'Quy trình onboarding phòng khám mới',
      category: 'Operations',
      description: 'Các bước cần thiết để đưa phòng khám mới vào hệ thống',
      lastUpdated: '2024-06-10',
      version: '1.5',
      downloads: 23
    },
    {
      id: '3',
      title: 'Xử lý sự cố kỹ thuật khẩn cấp',
      category: 'Technical',
      description: 'Quy trình ứng phó với các sự cố kỹ thuật nghiêm trọng',
      lastUpdated: '2024-06-08',
      version: '3.0',
      downloads: 67
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <ExclamationTriangleIcon className="w-4 h-4" />;
      case 'in_progress': return <ClockIcon className="w-4 h-4" />;
      case 'resolved': return <CheckCircleIcon className="w-4 h-4" />;
      case 'closed': return <CheckCircleIcon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trung tâm hỗ trợ</h1>
          <p className="text-gray-600">Quản lý hỗ trợ khách hàng và tài liệu SOP</p>
        </div>
        <Button>
          <PlusIcon className="w-4 h-4 mr-2" />
          Tạo ticket mới
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <LifebuoyIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tickets mở</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang xử lý</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đã giải quyết</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Thời gian phản hồi TB</p>
              <p className="text-2xl font-bold text-gray-900">2.5h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'tickets', label: 'Support Tickets', icon: LifebuoyIcon },
            { id: 'sop', label: 'SOP Documents', icon: DocumentTextIcon },
            { id: 'knowledge', label: 'Knowledge Base', icon: ChatBubbleLeftRightIcon }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Support Tickets Tab */}
      {activeTab === 'tickets' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm tickets..."
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
                <option value="open">Mở</option>
                <option value="in_progress">Đang xử lý</option>
                <option value="resolved">Đã giải quyết</option>
                <option value="closed">Đã đóng</option>
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Tất cả mức độ</option>
                <option value="critical">Khẩn cấp</option>
                <option value="high">Cao</option>
                <option value="medium">Trung bình</option>
                <option value="low">Thấp</option>
              </select>
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                <FunnelIcon className="w-4 h-4 mr-2" />
                Bộ lọc nâng cao
              </button>
            </div>
          </div>

          {/* Tickets List */}
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 mr-3">{ticket.title}</h3>
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{ticket.description}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span>Người yêu cầu: {ticket.requester.name}</span>
                      <span>Email: {ticket.requester.email}</span>
                      <span>Vai trò: {ticket.requester.role}</span>
                      {ticket.assignee && <span>Phụ trách: {ticket.assignee}</span>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(ticket.status)}
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Tạo: {new Date(ticket.createdAt).toLocaleString('vi-VN')}</span>
                  <span>Cập nhật: {new Date(ticket.updatedAt).toLocaleString('vi-VN')}</span>
                  {ticket.responseTime && (
                    <span>Thời gian phản hồi: {ticket.responseTime}h</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SOP Documents Tab */}
      {activeTab === 'sop' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockSOPs.map((sop) => (
            <div key={sop.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{sop.title}</h3>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full mb-2">
                    {sop.category}
                  </span>
                </div>
                <DocumentTextIcon className="w-6 h-6 text-gray-400" />
              </div>
              
              <p className="text-gray-600 mb-4">{sop.description}</p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Phiên bản:</span>
                  <span className="font-medium">v{sop.version}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cập nhật:</span>
                  <span>{new Date(sop.lastUpdated).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lượt tải:</span>
                  <span>{sop.downloads}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button className="w-full">
                  <DocumentTextIcon className="w-4 h-4 mr-2" />
                  Xem tài liệu
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Knowledge Base Tab */}
      {activeTab === 'knowledge' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Cơ sở tri thức</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <ChatBubbleLeftRightIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Cơ sở tri thức sẽ được phát triển</p>
              <p className="text-sm text-gray-400">FAQ, hướng dẫn sử dụng, và tài liệu hỗ trợ</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportCenter;
