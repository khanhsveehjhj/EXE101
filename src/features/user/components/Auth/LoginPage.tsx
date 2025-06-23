import LoginForm from './LoginForm';
import Logo from '@/assets/Images/favicon_transparent.png';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-ocean-light/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src={Logo}
              alt="365 Medihome Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">365 Medihome</h1>
          <p className="text-gray-600">Hệ thống quản lý bệnh viện</p>
        </div>

        {/* Login Form */}
        <LoginForm />

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 365 Medihome. Tất cả quyền được bảo lưu.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-primary transition-colors">Điều khoản sử dụng</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Chính sách bảo mật</a>
            <span>•</span>
            <a href="#" className="hover:text-primary transition-colors">Hỗ trợ</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
