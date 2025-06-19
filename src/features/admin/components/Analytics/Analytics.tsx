import { useState } from 'react';
import { 
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('bookings');

  const metrics = [
    {
      id: 'bookings',
      title: 'Lịch hẹn',
      value: '1,234',
      change: '+12.5%',
      changeType: 'increase',
      description: 'So với tuần trước'
    },
    {
      id: 'revenue',
      title: 'Doanh thu',
      value: '₫12.5M',
      change: '+8.3%',
      changeType: 'increase',
      description: 'So với tuần trước'
    },
    {
      id: 'users',
      title: 'Người dùng mới',
      value: '456',
      change: '+15.2%',
      changeType: 'increase',
      description: 'So với tuần trước'
    },
    {
      id: 'clinics',
      title: 'Phòng khám mới',
      value: '12',
      change: '-2.1%',
      changeType: 'decrease',
      description: 'So với tuần trước'
    }
  ];

  const topClinics = [
    { name: 'Phòng khám ABC', bookings: 234, revenue: '₫2.1M', growth: '+15%' },
    { name: 'Bệnh viện XYZ', bookings: 189, revenue: '₫1.8M', growth: '+12%' },
    { name: 'Phòng khám DEF', bookings: 156, revenue: '₫1.5M', growth: '+8%' },
    { name: 'Bệnh viện GHI', bookings: 134, revenue: '₫1.2M', growth: '+5%' },
    { name: 'Phòng khám JKL', bookings: 98, revenue: '₫890K', growth: '+3%' }
  ];

  const topServices = [
    { name: 'Khám tổng quát', bookings: 456, percentage: 35 },
    { name: 'Tim mạch', bookings: 234, percentage: 18 },
    { name: 'Nha khoa', bookings: 189, percentage: 15 },
    { name: 'Da liễu', bookings: 156, percentage: 12 },
    { name: 'Mắt', bookings: 134, percentage: 10 },
    { name: 'Khác', bookings: 131, percentage: 10 }
  ];

  const recentReports = [
    { id: 1, name: 'Báo cáo doanh thu tháng 6', date: '2024-06-19', type: 'revenue', status: 'completed' },
    { id: 2, name: 'Thống kê người dùng Q2', date: '2024-06-18', type: 'users', status: 'completed' },
    { id: 3, name: 'Phân tích hiệu suất phòng khám', date: '2024-06-17', type: 'performance', status: 'processing' },
    { id: 4, name: 'Báo cáo chất lượng dịch vụ', date: '2024-06-16', type: 'quality', status: 'completed' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Thống kê & Báo cáo</h1>
          <p className="text-gray-600">Phân tích dữ liệu và hiệu suất hệ thống</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="7days">7 ngày qua</option>
            <option value="30days">30 ngày qua</option>
            <option value="3months">3 tháng qua</option>
            <option value="1year">1 năm qua</option>
          </select>
          <Button>
            <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center mt-1">
                  {metric.changeType === 'increase' ? (
                    <ArrowTrendingUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowTrendingDownIcon className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm ${
                    metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">{metric.description}</span>
                </div>
              </div>
              <div className="p-3 bg-primary bg-opacity-10 rounded-full">
                <ChartBarIcon className="w-6 h-6 text-primary" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Clinics */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Phòng khám hiệu suất cao</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topClinics.map((clinic, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-medium text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{clinic.name}</p>
                      <p className="text-xs text-gray-500">{clinic.bookings} lịch hẹn</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{clinic.revenue}</p>
                    <p className="text-xs text-green-600">{clinic.growth}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Services */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Dịch vụ phổ biến</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <p className="text-sm font-medium text-gray-900">{service.name}</p>
                      <span className="text-sm text-gray-600">{service.bookings}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${service.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Biểu đồ xu hướng</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedMetric('bookings')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedMetric === 'bookings' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Lịch hẹn
            </button>
            <button
              onClick={() => setSelectedMetric('revenue')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedMetric === 'revenue' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Doanh thu
            </button>
            <button
              onClick={() => setSelectedMetric('users')}
              className={`px-3 py-1 text-sm rounded-md ${
                selectedMetric === 'users' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Người dùng
            </button>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Biểu đồ {selectedMetric} sẽ hiển thị ở đây</p>
            <p className="text-sm text-gray-400">Tích hợp với thư viện chart như Chart.js hoặc Recharts</p>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Báo cáo gần đây</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg mr-3">
                    <DocumentArrowDownIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{report.name}</p>
                    <p className="text-xs text-gray-500">
                      <CalendarIcon className="w-3 h-3 inline mr-1" />
                      {new Date(report.date).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    report.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
                  </span>
                  <button className="text-primary hover:text-primary-dark text-sm">
                    Tải xuống
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
