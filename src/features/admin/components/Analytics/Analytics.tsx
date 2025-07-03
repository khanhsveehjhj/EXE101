import { useState } from 'react';
import {
  ChartBarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CalendarIcon,
  DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import {
  LineChart,
  Line,
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
import Button from '@/components/UI/Button';

const Analytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('bookings');

  // Get metrics based on selected period
  const getMetrics = () => {
    switch (selectedPeriod) {
      case '7days':
        return [
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
      case '30days':
        return [
          {
            id: 'bookings',
            title: 'Lịch hẹn',
            value: '5,150',
            change: '+18.7%',
            changeType: 'increase',
            description: 'So với tháng trước'
          },
          {
            id: 'revenue',
            title: 'Doanh thu',
            value: '₫95.4M',
            change: '+22.1%',
            changeType: 'increase',
            description: 'So với tháng trước'
          },
          {
            id: 'users',
            title: 'Người dùng mới',
            value: '1,645',
            change: '+28.3%',
            changeType: 'increase',
            description: 'So với tháng trước'
          },
          {
            id: 'clinics',
            title: 'Phòng khám mới',
            value: '45',
            change: '+12.5%',
            changeType: 'increase',
            description: 'So với tháng trước'
          }
        ];
      case '3months':
        return [
          {
            id: 'bookings',
            title: 'Lịch hẹn',
            value: '13,970',
            change: '+16.2%',
            changeType: 'increase',
            description: 'So với quý trước'
          },
          {
            id: 'revenue',
            title: 'Doanh thu',
            value: '₫286.3M',
            change: '+19.8%',
            changeType: 'increase',
            description: 'So với quý trước'
          },
          {
            id: 'users',
            title: 'Người dùng mới',
            value: '4,350',
            change: '+24.7%',
            changeType: 'increase',
            description: 'So với quý trước'
          },
          {
            id: 'clinics',
            title: 'Phòng khám mới',
            value: '128',
            change: '+8.9%',
            changeType: 'increase',
            description: 'So với quý trước'
          }
        ];
      case '1year':
        return [
          {
            id: 'bookings',
            title: 'Lịch hẹn',
            value: '69,500',
            change: '+14.3%',
            changeType: 'increase',
            description: 'So với năm trước'
          },
          {
            id: 'revenue',
            title: 'Doanh thu',
            value: '₫1.41B',
            change: '+17.6%',
            changeType: 'increase',
            description: 'So với năm trước'
          },
          {
            id: 'users',
            title: 'Người dùng mới',
            value: '22,110',
            change: '+21.4%',
            changeType: 'increase',
            description: 'So với năm trước'
          },
          {
            id: 'clinics',
            title: 'Phòng khám mới',
            value: '485',
            change: '+6.7%',
            changeType: 'increase',
            description: 'So với năm trước'
          }
        ];
      default:
        return [];
    }
  };

  const metrics = getMetrics();

  // Get clinic performance data based on selected period
  // Different time periods show different clinic performance patterns:
  // - Short term (7 days): Recent performance, some volatility
  // - Medium term (30 days): More stable rankings, emerging trends
  // - Long term (3 months, 1 year): Established leaders, consistent performers
  const getClinicsData = () => {
    switch (selectedPeriod) {
      case '7days':
        return [
          { name: 'Phòng khám ABC', bookings: 234, revenue: '₫2.1M', revenueValue: 2.1, growth: '+15%' },
          { name: 'Phòng khám XYZ', bookings: 189, revenue: '₫1.8M', revenueValue: 1.8, growth: '+12%' },
          { name: 'Phòng khám DEF', bookings: 156, revenue: '₫1.5M', revenueValue: 1.5, growth: '+8%' },
          { name: 'Phòng khám GHI', bookings: 134, revenue: '₫1.2M', revenueValue: 1.2, growth: '+5%' },
          { name: 'Phòng khám JKL', bookings: 98, revenue: '₫890K', revenueValue: 0.89, growth: '+3%' }
        ];
      case '30days':
        return [
          { name: 'Phòng khám XYZ', bookings: 892, revenue: '₫8.2M', revenueValue: 8.2, growth: '+18%' },
          { name: 'Phòng khám ABC', bookings: 756, revenue: '₫7.1M', revenueValue: 7.1, growth: '+22%' },
          { name: 'Trung tâm Y tế MNO', bookings: 645, revenue: '₫6.8M', revenueValue: 6.8, growth: '+25%' },
          { name: 'Phòng khám DEF', bookings: 523, revenue: '₫5.2M', revenueValue: 5.2, growth: '+14%' },
          { name: 'Phòng khám GHI', bookings: 467, revenue: '₫4.9M', revenueValue: 4.9, growth: '+11%' }
        ];
      case '3months':
        return [
          { name: 'Phòng khám XYZ', bookings: 2850, revenue: '₫28.5M', revenueValue: 28.5, growth: '+16%' },
          { name: 'Trung tâm Y tế MNO', bookings: 2340, revenue: '₫26.2M', revenueValue: 26.2, growth: '+21%' },
          { name: 'Phòng khám ABC', bookings: 2180, revenue: '₫24.8M', revenueValue: 24.8, growth: '+19%' },
          { name: 'Phòng khám Đa khoa PQR', bookings: 1920, revenue: '₫22.1M', revenueValue: 22.1, growth: '+13%' },
          { name: 'Phòng khám DEF', bookings: 1650, revenue: '₫18.9M', revenueValue: 18.9, growth: '+9%' }
        ];
      case '1year':
        return [
          { name: 'Phòng khám XYZ', bookings: 12400, revenue: '₫142M', revenueValue: 142, growth: '+14%' },
          { name: 'Trung tâm Y tế MNO', bookings: 11200, revenue: '₫128M', revenueValue: 128, growth: '+18%' },
          { name: 'Phòng khám Đa khoa PQR', bookings: 9800, revenue: '₫115M', revenueValue: 115, growth: '+12%' },
          { name: 'Phòng khám ABC', bookings: 8900, revenue: '₫98M', revenueValue: 98, growth: '+16%' },
          { name: 'Phòng khám Chuyên khoa STU', bookings: 7650, revenue: '₫89M', revenueValue: 89, growth: '+10%' }
        ];
      default:
        return [];
    }
  };

  const topClinics = getClinicsData();

  // Get services data based on selected period
  // Different time periods show different service usage patterns:
  // - Short term (7 days): More routine checkups and urgent care
  // - Medium term (30 days): Balanced mix with more specialized services
  // - Long term (3 months, 1 year): Chronic conditions and specialized care dominate
  const getServicesData = () => {
    switch (selectedPeriod) {
      case '7days':
        return [
          { name: 'Khám tổng quát', bookings: 456, percentage: 35 },
          { name: 'Tim mạch', bookings: 234, percentage: 18 },
          { name: 'Nha khoa', bookings: 189, percentage: 15 },
          { name: 'Da liễu', bookings: 156, percentage: 12 },
          { name: 'Mắt', bookings: 134, percentage: 10 },
          { name: 'Khác', bookings: 131, percentage: 10 }
        ];
      case '30days':
        return [
          { name: 'Khám tổng quát', bookings: 1850, percentage: 32 },
          { name: 'Tim mạch', bookings: 1200, percentage: 21 },
          { name: 'Nha khoa', bookings: 980, percentage: 17 },
          { name: 'Sản phụ khoa', bookings: 750, percentage: 13 },
          { name: 'Da liễu', bookings: 580, percentage: 10 },
          { name: 'Khác', bookings: 390, percentage: 7 }
        ];
      case '3months':
        return [
          { name: 'Tim mạch', bookings: 4200, percentage: 28 },
          { name: 'Khám tổng quát', bookings: 3800, percentage: 25 },
          { name: 'Sản phụ khoa', bookings: 2850, percentage: 19 },
          { name: 'Nha khoa', bookings: 2100, percentage: 14 },
          { name: 'Thần kinh', bookings: 1350, percentage: 9 },
          { name: 'Khác', bookings: 750, percentage: 5 }
        ];
      case '1year':
        return [
          { name: 'Tim mạch', bookings: 18500, percentage: 30 },
          { name: 'Sản phụ khoa', bookings: 14200, percentage: 23 },
          { name: 'Khám tổng quát', bookings: 12800, percentage: 21 },
          { name: 'Thần kinh', bookings: 7400, percentage: 12 },
          { name: 'Nội tiết', bookings: 5200, percentage: 8 },
          { name: 'Khác', bookings: 3700, percentage: 6 }
        ];
      default:
        return [];
    }
  };

  const topServices = getServicesData();

  const recentReports = [
    { id: 1, name: 'Báo cáo doanh thu tháng 6', date: '2024-06-19', type: 'revenue', status: 'completed' },
    { id: 2, name: 'Thống kê người dùng Q2', date: '2024-06-18', type: 'users', status: 'completed' },
    { id: 3, name: 'Phân tích hiệu suất phòng khám', date: '2024-06-17', type: 'performance', status: 'processing' },
    { id: 4, name: 'Báo cáo chất lượng dịch vụ', date: '2024-06-16', type: 'quality', status: 'completed' }
  ];

  // Chart data based on selected period
  const getChartData = () => {
    switch (selectedPeriod) {
      case '7days':
        return {
          bookings: [
            { name: 'T2', value: 120, previous: 100 },
            { name: 'T3', value: 150, previous: 120 },
            { name: 'T4', value: 180, previous: 140 },
            { name: 'T5', value: 220, previous: 180 },
            { name: 'T6', value: 200, previous: 190 },
            { name: 'T7', value: 280, previous: 220 },
            { name: 'CN', value: 250, previous: 200 }
          ],
          revenue: [
            { name: 'T2', value: 2.1, previous: 1.8 },
            { name: 'T3', value: 2.5, previous: 2.2 },
            { name: 'T4', value: 3.2, previous: 2.8 },
            { name: 'T5', value: 4.1, previous: 3.5 },
            { name: 'T6', value: 3.8, previous: 3.2 },
            { name: 'T7', value: 5.2, previous: 4.1 },
            { name: 'CN', value: 4.8, previous: 3.9 }
          ],
          users: [
            { name: 'T2', value: 45, previous: 38 },
            { name: 'T3', value: 52, previous: 45 },
            { name: 'T4', value: 61, previous: 52 },
            { name: 'T5', value: 78, previous: 65 },
            { name: 'T6', value: 69, previous: 58 },
            { name: 'T7', value: 85, previous: 72 },
            { name: 'CN', value: 92, previous: 78 }
          ]
        };
      case '30days':
        return {
          bookings: [
            { name: 'Tuần 1', value: 1200, previous: 1000 },
            { name: 'Tuần 2', value: 1450, previous: 1200 },
            { name: 'Tuần 3', value: 1680, previous: 1400 },
            { name: 'Tuần 4', value: 1820, previous: 1600 }
          ],
          revenue: [
            { name: 'Tuần 1', value: 18.5, previous: 15.2 },
            { name: 'Tuần 2', value: 22.3, previous: 18.8 },
            { name: 'Tuần 3', value: 25.7, previous: 21.4 },
            { name: 'Tuần 4', value: 28.9, previous: 24.6 }
          ],
          users: [
            { name: 'Tuần 1', value: 320, previous: 280 },
            { name: 'Tuần 2', value: 385, previous: 320 },
            { name: 'Tuần 3', value: 442, previous: 365 },
            { name: 'Tuần 4', value: 498, previous: 420 }
          ]
        };
      case '3months':
        return {
          bookings: [
            { name: 'Tháng 1', value: 4200, previous: 3800 },
            { name: 'Tháng 2', value: 4650, previous: 4100 },
            { name: 'Tháng 3', value: 5120, previous: 4500 }
          ],
          revenue: [
            { name: 'Tháng 1', value: 85.4, previous: 72.8 },
            { name: 'Tháng 2', value: 92.7, previous: 81.3 },
            { name: 'Tháng 3', value: 108.2, previous: 95.6 }
          ],
          users: [
            { name: 'Tháng 1', value: 1250, previous: 1100 },
            { name: 'Tháng 2', value: 1420, previous: 1250 },
            { name: 'Tháng 3', value: 1680, previous: 1450 }
          ]
        };
      case '1year':
        return {
          bookings: [
            { name: 'Q1', value: 14000, previous: 12500 },
            { name: 'Q2', value: 16200, previous: 14800 },
            { name: 'Q3', value: 18500, previous: 16900 },
            { name: 'Q4', value: 20800, previous: 18200 }
          ],
          revenue: [
            { name: 'Q1', value: 286.3, previous: 245.7 },
            { name: 'Q2', value: 324.8, previous: 289.4 },
            { name: 'Q3', value: 378.5, previous: 332.1 },
            { name: 'Q4', value: 425.2, previous: 378.9 }
          ],
          users: [
            { name: 'Q1', value: 4350, previous: 3800 },
            { name: 'Q2', value: 5120, previous: 4600 },
            { name: 'Q3', value: 5890, previous: 5200 },
            { name: 'Q4', value: 6750, previous: 5950 }
          ]
        };
      default:
        return {
          bookings: [],
          revenue: [],
          users: []
        };
    }
  };

  const chartData = getChartData();

  // Get previous period label based on selected period
  const getPreviousPeriodLabel = () => {
    switch (selectedPeriod) {
      case '7days':
        return 'Tuần trước';
      case '30days':
        return 'Tháng trước';
      case '3months':
        return 'Quý trước';
      case '1year':
        return 'Năm trước';
      default:
        return 'Kỳ trước';
    }
  };

  // Pie chart data for services
  const serviceChartData = topServices.map((service) => ({
    name: service.name,
    value: service.percentage,
    bookings: service.bookings
  }));

  // Colors for charts
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

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
                  <span className={`text-sm ${metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
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
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {serviceChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, _, props) => [
                      `${value}% (${props.payload.bookings} lịch hẹn)`,
                      'Tỷ lệ'
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {topServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-gray-900">{service.name}</span>
                  </div>
                  <span className="text-gray-600">{service.bookings} lịch hẹn</span>
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
              className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'bookings'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Lịch hẹn
            </button>
            <button
              onClick={() => setSelectedMetric('revenue')}
              className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'revenue'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Doanh thu
            </button>
            <button
              onClick={() => setSelectedMetric('users')}
              className={`px-3 py-1 text-sm rounded-md ${selectedMetric === 'users'
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              Người dùng
            </button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData[selectedMetric as keyof typeof chartData]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value, name) => [
                  selectedMetric === 'revenue' ? `₫${value}M` : value,
                  name === 'value' ? 'Hiện tại' : getPreviousPeriodLabel()
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                name="Hiện tại"
              />
              <Line
                type="monotone"
                dataKey="previous"
                stroke="#94A3B8"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#94A3B8', strokeWidth: 2, r: 3 }}
                name={getPreviousPeriodLabel()}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Clinic Performance Bar Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Hiệu suất phòng khám</h2>
          <p className="text-sm text-gray-600">So sánh doanh thu và số lượng lịch hẹn</p>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topClinics.slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip
                formatter={(value, name) => [
                  name === 'bookings' ? `${value} lịch hẹn` : `₫${value}M`,
                  name === 'bookings' ? 'Lịch hẹn' : 'Doanh thu'
                ]}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="bookings"
                fill="#3B82F6"
                name="Lịch hẹn"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="revenueValue"
                fill="#10B981"
                name="Doanh thu"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
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
                  <span className={`px-2 py-1 text-xs rounded-full ${report.status === 'completed'
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
