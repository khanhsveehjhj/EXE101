import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, UserIcon, LockClosedIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';
import FormInput from '@/components/UI/FormInput';

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  general?: string;
}

const RegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Họ và tên phải có ít nhất 2 ký tự';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Định dạng email không hợp lệ';
      }
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else {
      const phoneRegex = /^(0|\+84)[3-9]\d{8}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Định dạng số điện thoại không hợp lệ';
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Vui lòng đồng ý với điều khoản sử dụng';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setIsSuccess(true);
      console.log('Đăng ký thành công:', formData);

      // Reset form after success
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false,
        });
      }, 3000);
    } catch (error) {
      setErrors({ general: 'Có lỗi xảy ra. Vui lòng thử lại sau.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
        <div className="text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">Đăng ký thành công!</h2>
          <p className="text-green-700 mb-4">
            Tài khoản của bạn đã được tạo thành công.
          </p>
          <p className="text-gray-600 text-sm">
            Vui lòng kiểm tra email để xác thực tài khoản.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-600 text-sm">{errors.general}</p>
          </div>
        )}

        {/* Full Name Input */}
        <FormInput
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          label="Họ và tên *"
          icon={<UserIcon className="w-4 h-4" />}
          placeholder="Nhập họ và tên đầy đủ"
          disabled={isLoading}
          error={errors.fullName}
        />

        {/* Email Input */}
        <FormInput
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          label="Email *"
          icon={<EnvelopeIcon className="w-4 h-4" />}
          placeholder="Nhập địa chỉ email"
          disabled={isLoading}
          error={errors.email}
        />

        {/* Phone Input */}
        <FormInput
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          label="Số điện thoại *"
          icon={<PhoneIcon className="w-4 h-4" />}
          placeholder="Nhập số điện thoại"
          disabled={isLoading}
          error={errors.phone}
        />

        {/* Password Input */}
        <FormInput
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          label="Mật khẩu *"
          icon={<LockClosedIcon className="w-4 h-4" />}
          placeholder="Nhập mật khẩu (ít nhất 8 ký tự)"
          disabled={isLoading}
          error={errors.password}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500 hover:text-primary transition-colors"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          }
        />

        {/* Confirm Password Input */}
        <FormInput
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          label="Xác nhận mật khẩu *"
          icon={<LockClosedIcon className="w-4 h-4" />}
          placeholder="Nhập lại mật khẩu"
          disabled={isLoading}
          error={errors.confirmPassword}
          rightElement={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-500 hover:text-primary transition-colors"
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          }
        />

        {/* Terms Agreement */}
        <div>
          <label className="flex items-start">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2 mt-1"
              disabled={isLoading}
            />
            <span className="ml-2 text-sm text-gray-700">
              Tôi đồng ý với{' '}
              <a href="#" className="text-primary hover:text-ocean-dark transition-colors">
                Điều khoản sử dụng
              </a>{' '}
              và{' '}
              <a href="#" className="text-primary hover:text-ocean-dark transition-colors">
                Chính sách bảo mật
              </a>{' '}
              của 365 Medihome *
            </span>
          </label>
          {errors.agreeToTerms && (
            <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
          )}
        </div>

        {/* Register Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 text-lg"
        >
          {isLoading ? 'Đang tạo tài khoản...' : 'Đăng ký'}
        </Button>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <button
              type="button"
              className="text-primary hover:text-ocean-dark transition-colors font-medium"
              disabled={isLoading}
            >
              Đăng nhập ngay
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
