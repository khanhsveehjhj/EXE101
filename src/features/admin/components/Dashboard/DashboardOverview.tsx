import { 
  UsersIcon, 
  BuildingOfficeIcon, 
  CalendarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const DashboardOverview = () => {
  const stats = [
    {
      title: 'Tổng người dùng',
      value: '12,543',
      change: '+12%',
      changeType: 'increase',
      icon: UsersIcon,
      color: 'bg-blue-500'
    },
    {
      title: 'Phòng khám đối tác',
      value: '156',
      change: '+8%',
      changeType: 'increase',
      icon: BuildingOfficeIcon,
      color: 'bg-green-500'
    },
    {
      title: 'Lịch hẹn hôm nay',
      value: '324',
      change: '+15%',
      changeType: 'increase',
      icon: CalendarIcon,
      color: 'bg-purple-500'
    },
    {
      title: 'Doanh thu tháng',
      value: '₫2.4M',
      change: '+23%',
      changeType: 'increase',
      icon: CurrencyDollarIcon,
      color: 'bg-yellow-500'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'user', message: 'Người dùng mới đăng ký: Nguyễn Văn A', time: '5 phút trước' },
    { id: 2, type: 'clinic', message: 'Phòng khám ABC cập nhật thông tin', time: '10 phút trước' },
    { id: 3, type: 'booking', message: '15 lịch hẹn mới được tạo', time: '15 phút trước' },
    { id: 4, type: 'payment', message: 'Thanh toán thành công: ₫150,000', time: '20 phút trước' },
    { id: 5, type: 'alert', message: 'Cảnh báo: Server load cao', time: '25 phút trước' }
  ];

  const alerts = [
    { id: 1, type: 'warning', message: 'Có 5 phòng khám chưa cập nhật lịch làm việc', priority: 'medium' },
    { id: 2, type: 'error', message: 'Lỗi thanh toán tại 3 giao dịch', priority: 'high' },
    { id: 3, type: 'info', message: '12 người dùng cần xác thực tài khoản', priority: 'low' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tổng quan hệ thống</h1>
        <p className="text-gray-600">Theo dõi hoạt động và hiệu suất của nền tảng</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} so với tháng trước
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Hoạt động gần đây</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Cảnh báo hệ thống</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-3 rounded-lg border-l-4 ${
                  alert.priority === 'high' ? 'border-red-500 bg-red-50' :
                  alert.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex items-start">
                    <ExclamationTriangleIcon className={`w-5 h-5 mt-0.5 ${
                      alert.priority === 'high' ? 'text-red-500' :
                      alert.priority === 'medium' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    <div className="ml-3">
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <p className={`text-xs ${
                        alert.priority === 'high' ? 'text-red-600' :
                        alert.priority === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`}>
                        Mức độ: {alert.priority === 'high' ? 'Cao' : alert.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Thao tác nhanh</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <UsersIcon className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Thêm người dùng mới</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <BuildingOfficeIcon className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Đăng ký phòng khám</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <ChartBarIcon className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-sm font-medium">Xem báo cáo chi tiết</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
