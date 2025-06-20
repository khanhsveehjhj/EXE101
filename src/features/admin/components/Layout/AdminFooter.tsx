import {
  HeartIcon,
  ShieldCheckIcon,
  ClockIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  const systemInfo = [
    { label: 'Phiên bản', value: 'v2.1.0' },
    { label: 'Cập nhật cuối', value: '15/12/2024' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'Server', value: 'Online' }
  ];

  const quickLinks = [
    { label: 'Tài liệu API', href: '#' },
    { label: 'Hướng dẫn sử dụng', href: '#' },
    { label: 'Báo cáo lỗi', href: '#' },
    { label: 'Liên hệ hỗ trợ', href: '#' }
  ];

  const supportInfo = [
    { label: 'Hotline', value: '1900-1234' },
    { label: 'Email', value: 'admin@medviet.com' },
    { label: 'Thời gian hỗ trợ', value: '24/7' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* System Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Thông tin hệ thống
            </h3>

            <div className="space-y-3">
              {systemInfo.map((info, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{info.label}:</span>
                  <span className={`text-sm font-medium ${
                    info.label === 'Server' && info.value === 'Online' 
                      ? 'text-green-600' 
                      : 'text-gray-900'
                  }`}>
                    {info.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Liên kết nhanh
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Hỗ trợ kỹ thuật
            </h3>

            <div className="space-y-3">
              {supportInfo.map((info, index) => (
                <div key={index}>
                  <span className="text-sm text-gray-600">{info.label}:</span>
                  <p className="text-sm font-medium text-gray-900">{info.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Status & Security */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Trạng thái & Bảo mật
            </h3>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600">SSL Secured</span>
              </div>

              <div className="flex items-center space-x-2">
                <ClockIcon className="w-5 h-5 text-blue-500" />
                <span className="text-sm text-gray-600">Real-time Monitoring</span>
              </div>

              <div className="flex items-center space-x-2">
                <GlobeAltIcon className="w-5 h-5 text-purple-500" />
                <span className="text-sm text-gray-600">Global CDN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;
