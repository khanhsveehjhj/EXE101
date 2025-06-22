import { useState } from 'react';
import {
    ChartBarIcon,
    CurrencyDollarIcon,
    CalendarDaysIcon,
    UserGroupIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    ClockIcon,
    ExclamationTriangleIcon,
    StarIcon,
    DocumentChartBarIcon
} from '@heroicons/react/24/outline';
import {
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
    ResponsiveContainer,
    AreaChart,
    Area,
    ComposedChart
} from 'recharts';
import Button from '@/components/UI/Button';

interface ReportData {
    period: 'daily' | 'weekly' | 'monthly';
    startDate: string;
    endDate: string;
}

interface AnalyticsMetrics {
    revenue: {
        total: number;
        growth: number;
        trend: 'up' | 'down' | 'stable';
    };
    appointments: {
        total: number;
        completed: number;
        cancelled: number;
        noShow: number;
        completionRate: number;
    };
    patients: {
        total: number;
        new: number;
        returning: number;
        satisfaction: number;
    };
    performance: {
        averageWaitTime: number;
        averageConsultationTime: number;
        doctorUtilization: number;
        peakHours: string[];
    };
}

const ComprehensiveReports = () => {
    const [reportData, setReportData] = useState<ReportData>({
        period: 'monthly',
        startDate: '2024-06-01',
        endDate: '2024-06-30'
    });
    const [activeTab, setActiveTab] = useState<'overview' | 'revenue' | 'appointments' | 'patients' | 'performance'>('overview');

    // Mock analytics data
    const metrics: AnalyticsMetrics = {
        revenue: {
            total: 125000000, // 125 million VND
            growth: 12.5,
            trend: 'up'
        },
        appointments: {
            total: 450,
            completed: 380,
            cancelled: 45,
            noShow: 25,
            completionRate: 84.4
        },
        patients: {
            total: 320,
            new: 85,
            returning: 235,
            satisfaction: 4.6
        },
        performance: {
            averageWaitTime: 18, // minutes
            averageConsultationTime: 25, // minutes
            doctorUtilization: 78.5, // percentage
            peakHours: ['09:00-11:00', '14:00-16:00']
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(amount);
    };

    const formatPercentage = (value: number) => {
        return `${value.toFixed(1)}%`;
    };

    const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
        switch (trend) {
            case 'up':
                return <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />;
            case 'down':
                return <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />;
            default:
                return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
        }
    };

    const cancellationReasons = [
        { reason: 'Bệnh nhân hủy', count: 25, percentage: 55.6 },
        { reason: 'Bác sĩ bận', count: 12, percentage: 26.7 },
        { reason: 'Lý do y tế', count: 5, percentage: 11.1 },
        { reason: 'Khác', count: 3, percentage: 6.7 }
    ];

    const doctorPerformance = [
        { name: 'BS. Nguyễn Văn A', appointments: 85, satisfaction: 4.8, avgTime: 22 },
        { name: 'BS. Trần Thị B', appointments: 92, satisfaction: 4.6, avgTime: 28 },
        { name: 'BS. Lê Văn C', appointments: 78, satisfaction: 4.7, avgTime: 25 },
        { name: 'BS. Phạm Thị D', appointments: 65, satisfaction: 4.9, avgTime: 30 }
    ];

    // Chart data
    const revenueChartData = [
        { month: 'T1', revenue: 95, target: 100 },
        { month: 'T2', revenue: 108, target: 105 },
        { month: 'T3', revenue: 112, target: 110 },
        { month: 'T4', revenue: 118, target: 115 },
        { month: 'T5', revenue: 125, target: 120 },
        { month: 'T6', revenue: 135, target: 125 }
    ];

    const appointmentStatusData = [
        { name: 'Hoàn thành', value: 380, color: '#10B981' },
        { name: 'Đã hủy', value: 45, color: '#EF4444' },
        { name: 'Không đến', value: 25, color: '#6B7280' }
    ];

    const serviceRevenueData = [
        { name: 'Khám tổng quát', value: 45, color: '#3B82F6' },
        { name: 'Khám chuyên khoa', value: 38, color: '#10B981' },
        { name: 'Xét nghiệm', value: 25, color: '#F59E0B' },
        { name: 'Khác', value: 17, color: '#8B5CF6' }
    ];

    const dailyRevenueData = [
        { day: 'T2', revenue: 18, appointments: 45 },
        { day: 'T3', revenue: 22, appointments: 52 },
        { day: 'T4', revenue: 20, appointments: 48 },
        { day: 'T5', revenue: 25, appointments: 58 },
        { day: 'T6', revenue: 28, appointments: 62 },
        { day: 'T7', revenue: 15, appointments: 35 },
        { day: 'CN', revenue: 12, appointments: 28 }
    ];

    const patientSatisfactionData = [
        { category: 'Chất lượng khám', rating: 4.7 },
        { category: 'Thời gian chờ', rating: 4.2 },
        { category: 'Thái độ nhân viên', rating: 4.8 },
        { category: 'Cơ sở vật chất', rating: 4.5 },
        { category: 'Giá cả hợp lý', rating: 4.3 }
    ];

    const hourlyAppointmentData = [
        { hour: '8h', appointments: 12 },
        { hour: '9h', appointments: 18 },
        { hour: '10h', appointments: 25 },
        { hour: '11h', appointments: 22 },
        { hour: '14h', appointments: 28 },
        { hour: '15h', appointments: 32 },
        { hour: '16h', appointments: 26 },
        { hour: '17h', appointments: 15 }
    ];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Báo cáo & Thống kê</h1>
                <div className="flex items-center space-x-4">
                    <select
                        value={reportData.period}
                        onChange={(e) => setReportData(prev => ({ ...prev, period: e.target.value as any }))}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="daily">Hàng ngày</option>
                        <option value="weekly">Hàng tuần</option>
                        <option value="monthly">Hàng tháng</option>
                    </select>
                    <Button className="bg-primary text-white">
                        Xuất báo cáo
                    </Button>
                </div>
            </div>

            {/* Date Range */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Từ ngày
                        </label>
                        <input
                            type="date"
                            value={reportData.startDate}
                            onChange={(e) => setReportData(prev => ({ ...prev, startDate: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Đến ngày
                        </label>
                        <input
                            type="date"
                            value={reportData.endDate}
                            onChange={(e) => setReportData(prev => ({ ...prev, endDate: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div className="flex items-end">
                        <Button className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200">
                            Áp dụng bộ lọc
                        </Button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {[
                            { id: 'overview', label: 'Tổng quan', icon: ChartBarIcon },
                            { id: 'revenue', label: 'Doanh thu', icon: CurrencyDollarIcon },
                            { id: 'appointments', label: 'Lịch hẹn', icon: CalendarDaysIcon },
                            { id: 'patients', label: 'Bệnh nhân', icon: UserGroupIcon },
                            { id: 'performance', label: 'Hiệu suất', icon: DocumentChartBarIcon }
                        ].map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                        ? 'border-primary text-primary'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                        }`}
                                >
                                    <Icon className="w-5 h-5 mr-2" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="p-6">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            {/* Key Metrics */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-blue-100 text-sm">Tổng doanh thu</p>
                                            <p className="text-2xl font-bold">{formatCurrency(metrics.revenue.total)}</p>
                                        </div>
                                        <CurrencyDollarIcon className="w-8 h-8 text-blue-200" />
                                    </div>
                                    <div className="flex items-center mt-4">
                                        {getTrendIcon(metrics.revenue.trend)}
                                        <span className="ml-2 text-sm text-blue-100">
                                            +{formatPercentage(metrics.revenue.growth)} so với tháng trước
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-green-100 text-sm">Lịch hẹn hoàn thành</p>
                                            <p className="text-2xl font-bold">{metrics.appointments.completed}</p>
                                        </div>
                                        <CalendarDaysIcon className="w-8 h-8 text-green-200" />
                                    </div>
                                    <div className="flex items-center mt-4">
                                        <span className="text-sm text-green-100">
                                            Tỷ lệ: {formatPercentage(metrics.appointments.completionRate)}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-purple-100 text-sm">Tổng bệnh nhân</p>
                                            <p className="text-2xl font-bold">{metrics.patients.total}</p>
                                        </div>
                                        <UserGroupIcon className="w-8 h-8 text-purple-200" />
                                    </div>
                                    <div className="flex items-center mt-4">
                                        <span className="text-sm text-purple-100">
                                            {metrics.patients.new} bệnh nhân mới
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-orange-100 text-sm">Thời gian chờ TB</p>
                                            <p className="text-2xl font-bold">{metrics.performance.averageWaitTime}p</p>
                                        </div>
                                        <ClockIcon className="w-8 h-8 text-orange-200" />
                                    </div>
                                    <div className="flex items-center mt-4">
                                        <span className="text-sm text-orange-100">
                                            Mục tiêu: &lt;20 phút
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Charts */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Revenue Chart */}
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Xu hướng doanh thu 6 tháng</h3>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={revenueChartData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="month" />
                                                <YAxis />
                                                <Tooltip
                                                    formatter={(value: number, name: string) => [
                                                        `₫${value}M`,
                                                        name === 'revenue' ? 'Doanh thu' : 'Mục tiêu'
                                                    ]}
                                                />
                                                <Legend />
                                                <Area
                                                    type="monotone"
                                                    dataKey="revenue"
                                                    stroke="#3B82F6"
                                                    fill="#3B82F6"
                                                    fillOpacity={0.3}
                                                    name="Doanh thu"
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="target"
                                                    stroke="#EF4444"
                                                    strokeDasharray="5 5"
                                                    name="Mục tiêu"
                                                />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Appointment Status Chart */}
                                <div className="bg-white rounded-lg shadow p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Phân bố trạng thái lịch hẹn</h3>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={appointmentStatusData}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    label={({ name, value }) => `${name}: ${value}`}
                                                >
                                                    {appointmentStatusData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    formatter={(value: number) => [`${value} lịch hẹn`, 'Số lượng']}
                                                />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Revenue Tab */}
                    {activeTab === 'revenue' && (
                        <div className="space-y-6">
                            {/* Daily Revenue Chart */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Doanh thu hàng ngày trong tuần</h3>
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <ComposedChart data={dailyRevenueData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" />
                                            <YAxis yAxisId="left" orientation="left" />
                                            <YAxis yAxisId="right" orientation="right" />
                                            <Tooltip
                                                formatter={(value: number, name: string) => [
                                                    name === 'revenue' ? `₫${value}M` : `${value} lịch hẹn`,
                                                    name === 'revenue' ? 'Doanh thu' : 'Lịch hẹn'
                                                ]}
                                            />
                                            <Legend />
                                            <Bar
                                                yAxisId="left"
                                                dataKey="revenue"
                                                fill="#10B981"
                                                name="Doanh thu (triệu VNĐ)"
                                                radius={[4, 4, 0, 0]}
                                            />
                                            <Line
                                                yAxisId="right"
                                                type="monotone"
                                                dataKey="appointments"
                                                stroke="#3B82F6"
                                                strokeWidth={3}
                                                name="Số lịch hẹn"
                                            />
                                        </ComposedChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Doanh thu theo dịch vụ</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Khám tổng quát</span>
                                            <span className="font-medium">{formatCurrency(45000000)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Khám chuyên khoa</span>
                                            <span className="font-medium">{formatCurrency(38000000)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Xét nghiệm</span>
                                            <span className="font-medium">{formatCurrency(25000000)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Khác</span>
                                            <span className="font-medium">{formatCurrency(17000000)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Doanh thu theo dịch vụ</h3>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={serviceRevenueData}
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={80}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                    label={({ name, value }) => `${name}: ₫${value}M`}
                                                >
                                                    {serviceRevenueData.map((entry, index) => (
                                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                                    ))}
                                                </Pie>
                                                <Tooltip
                                                    formatter={(value: number) => [`₫${value}M`, 'Doanh thu']}
                                                />
                                                <Legend />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">So sánh kỳ trước</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Tháng này</span>
                                            <span className="font-medium text-green-600">+12.5%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Quý này</span>
                                            <span className="font-medium text-green-600">+8.3%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Năm nay</span>
                                            <span className="font-medium text-green-600">+15.7%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Appointments Tab */}
                    {activeTab === 'appointments' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Phân tích hủy lịch</h3>
                                    <div className="space-y-3">
                                        {cancellationReasons.map((reason, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                                                    <span className="text-gray-700">{reason.reason}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-medium">{reason.count}</span>
                                                    <span className="text-sm text-gray-500 ml-2">({formatPercentage(reason.percentage)})</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Lịch hẹn theo giờ trong ngày</h3>
                                    <div className="h-64">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={hourlyAppointmentData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="hour" />
                                                <YAxis />
                                                <Tooltip
                                                    formatter={(value: number) => [`${value} lịch hẹn`, 'Số lượng']}
                                                />
                                                <Bar
                                                    dataKey="appointments"
                                                    fill="#3B82F6"
                                                    radius={[4, 4, 0, 0]}
                                                />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                                        <div className="flex items-center">
                                            <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mr-2" />
                                            <span className="text-sm text-yellow-800">
                                                Khuyến nghị tăng nhân lực trong khung giờ 14h-16h
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Thống kê lịch hẹn</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <p className="text-2xl font-bold text-green-600">{metrics.appointments.completed}</p>
                                        <p className="text-sm text-green-700">Hoàn thành</p>
                                    </div>
                                    <div className="text-center p-4 bg-red-50 rounded-lg">
                                        <p className="text-2xl font-bold text-red-600">{metrics.appointments.cancelled}</p>
                                        <p className="text-sm text-red-700">Đã hủy</p>
                                    </div>
                                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                                        <p className="text-2xl font-bold text-gray-600">{metrics.appointments.noShow}</p>
                                        <p className="text-sm text-gray-700">Không đến</p>
                                    </div>
                                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <p className="text-2xl font-bold text-blue-600">{formatPercentage(metrics.appointments.completionRate)}</p>
                                        <p className="text-sm text-blue-700">Tỷ lệ hoàn thành</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Patients Tab */}
                    {activeTab === 'patients' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Đánh giá của bệnh nhân</h3>
                                    <div className="space-y-4">
                                        {patientSatisfactionData.map((feedback, index) => (
                                            <div key={index} className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-gray-700 text-sm">{feedback.category}</span>
                                                    <div className="flex items-center">
                                                        <div className="flex items-center mr-2">
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <StarIcon
                                                                    key={star}
                                                                    className={`w-4 h-4 ${star <= feedback.rating
                                                                        ? 'text-yellow-400 fill-current'
                                                                        : 'text-gray-300'
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="font-medium text-sm">{feedback.rating}</span>
                                                    </div>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${(feedback.rating / 5) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium text-green-900">Điểm trung bình</span>
                                            <div className="flex items-center">
                                                <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                                                <span className="ml-1 text-lg font-bold text-green-900">{metrics.patients.satisfaction}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Phân tích bệnh nhân</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                            <span className="text-blue-900">Bệnh nhân mới</span>
                                            <span className="font-bold text-blue-900">{metrics.patients.new}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                            <span className="text-purple-900">Bệnh nhân quay lại</span>
                                            <span className="font-bold text-purple-900">{metrics.patients.returning}</span>
                                        </div>
                                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                            <span className="text-green-900">Tỷ lệ quay lại</span>
                                            <span className="font-bold text-green-900">
                                                {formatPercentage((metrics.patients.returning / metrics.patients.total) * 100)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Performance Tab */}
                    {activeTab === 'performance' && (
                        <div className="space-y-6">
                            {/* Doctor Performance Cards */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-6">Hiệu suất bác sĩ</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {doctorPerformance.map((doctor, index) => (
                                        <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                                            <div className="text-center mb-4">
                                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                                    <span className="text-white font-bold text-lg">
                                                        {doctor.name.split(' ').pop()?.charAt(0)}
                                                    </span>
                                                </div>
                                                <h4 className="font-medium text-gray-900 text-sm">{doctor.name}</h4>
                                            </div>

                                            {/* Appointments */}
                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs text-gray-600">Lịch hẹn</span>
                                                    <span className="text-sm font-bold text-blue-600">{doctor.appointments}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${(doctor.appointments / 100) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Satisfaction */}
                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs text-gray-600">Đánh giá</span>
                                                    <div className="flex items-center">
                                                        <StarIcon className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                                                        <span className="text-sm font-bold text-yellow-600">{doctor.satisfaction}</span>
                                                    </div>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${(doctor.satisfaction / 5) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Average Time */}
                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-xs text-gray-600">Thời gian TB</span>
                                                    <span className="text-sm font-bold text-orange-600">{doctor.avgTime}p</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-orange-400 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${Math.min((doctor.avgTime / 40) * 100, 100)}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Performance Badge */}
                                            <div className="text-center">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${doctor.satisfaction >= 4.7 ? 'bg-green-100 text-green-800' :
                                                    doctor.satisfaction >= 4.5 ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }`}>
                                                    {doctor.satisfaction >= 4.7 ? 'Xuất sắc' :
                                                        doctor.satisfaction >= 4.5 ? 'Tốt' : 'Cần cải thiện'}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Thời gian chờ</h3>
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-orange-600">{metrics.performance.averageWaitTime}</p>
                                        <p className="text-sm text-gray-600">phút trung bình</p>
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Mục tiêu: &lt;20 phút</span>
                                            <span>{metrics.performance.averageWaitTime > 20 ? 'Chưa đạt' : 'Đạt mục tiêu'}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${metrics.performance.averageWaitTime > 20 ? 'bg-red-500' : 'bg-green-500'}`}
                                                style={{ width: `${Math.min((metrics.performance.averageWaitTime / 30) * 100, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Thời gian khám</h3>
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-blue-600">{metrics.performance.averageConsultationTime}</p>
                                        <p className="text-sm text-gray-600">phút trung bình</p>
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Khuyến nghị: 20-30 phút</span>
                                            <span>Phù hợp</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Tỷ lệ sử dụng</h3>
                                    <div className="text-center">
                                        <p className="text-3xl font-bold text-purple-600">{formatPercentage(metrics.performance.doctorUtilization)}</p>
                                        <p className="text-sm text-gray-600">công suất bác sĩ</p>
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                                            <span>Mục tiêu: 80-90%</span>
                                            <span>{metrics.performance.doctorUtilization >= 80 ? 'Đạt mục tiêu' : 'Chưa đạt'}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full ${metrics.performance.doctorUtilization >= 80 ? 'bg-green-500' : 'bg-yellow-500'}`}
                                                style={{ width: `${metrics.performance.doctorUtilization}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComprehensiveReports;
