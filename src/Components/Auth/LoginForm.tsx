import { useState, useEffect } from 'react';
import { PhoneIcon, CheckCircleIcon, ArrowLeftIcon, ClockIcon } from '@heroicons/react/24/outline';
import Button from '@/Components/UI/Button';
import FormInput from '@/Components/UI/FormInput';

interface PhoneAuthData {
  phoneNumber: string;
  otpCode: string;
}

interface FormErrors {
  phoneNumber?: string;
  otpCode?: string;
  general?: string;
}

type AuthStep = 'phone' | 'otp' | 'success';

const LoginForm = () => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('phone');
  const [formData, setFormData] = useState<PhoneAuthData>({
    phoneNumber: '',
    otpCode: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && currentStep === 'otp') {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, currentStep]);

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^(0[3-9]\d{8}|\+84[3-9]\d{8})$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateOTP = (otp: string): boolean => {
    return /^\d{6}$/.test(otp);
  };

  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');

    // Format Vietnamese phone number
    if (digits.startsWith('84')) {
      return `+84 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
    } else if (digits.startsWith('0')) {
      return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    }
    return phone;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      // Format phone number as user types
      const formatted = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear specific field error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhoneNumber(formData.phoneNumber)) {
      setErrors({ phoneNumber: 'Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng.' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Move to OTP step
      setCurrentStep('otp');
      setCountdown(60); // 60 seconds countdown
      setCanResend(false);

      console.log('OTP sent to:', formData.phoneNumber);
    } catch (error) {
      console.error('Send OTP error:', error);
      setErrors({ general: 'Không thể gửi mã xác thực. Vui lòng thử lại.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateOTP(formData.otpCode)) {
      setErrors({ otpCode: 'Mã xác thực phải có 6 chữ số.' });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock verification logic (demo code: 123456)
      if (formData.otpCode === '123456' || formData.phoneNumber === '0123 456 789') {
        setCurrentStep('success');
        console.log('Đăng nhập thành công:', formData);

        // Reset form after success
        setTimeout(() => {
          setCurrentStep('phone');
          setFormData({ phoneNumber: '', otpCode: '' });
        }, 3000);
      } else {
        setErrors({ otpCode: 'Mã xác thực không chính xác. Vui lòng thử lại.' });
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      setErrors({ general: 'Có lỗi xảy ra. Vui lòng thử lại.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate resending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));

      setCountdown(60);
      setCanResend(false);
      console.log('OTP resent to:', formData.phoneNumber);
    } catch (error) {
      console.error('Resend OTP error:', error);
      setErrors({ general: 'Không thể gửi lại mã xác thực. Vui lòng thử lại.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setCurrentStep('phone');
    setFormData(prev => ({ ...prev, otpCode: '' }));
    setErrors({});
    setCountdown(0);
    setCanResend(false);
  };

  // Success Screen
  if (currentStep === 'success') {
    return (
      <div className="text-center py-8 px-6">
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Đăng nhập thành công!</h3>
          <p className="text-gray-600">Chào mừng bạn đến với 365 Medihome</p>
        </div>
        <div className="animate-pulse">
          <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-pulse"></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  // Phone Number Step
  if (currentStep === 'phone') {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
            <PhoneIcon className="w-6 h-6 text-primary" />
          </div>
          <p className="text-gray-600 text-sm">Nhập số điện thoại để nhận mã xác thực</p>
        </div>

        <form onSubmit={handlePhoneSubmit} className="space-y-5">
          {/* General Error Message */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Phone Number Input */}
          <FormInput
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            label="Số điện thoại *"
            icon={<PhoneIcon className="w-4 h-4" />}
            placeholder="0123 456 789"
            disabled={isLoading}
            error={errors.phoneNumber}
            className="text-center"
          />

          {/* Send OTP Button */}
          <Button
            type="submit"
            disabled={isLoading || !formData.phoneNumber.trim()}
            className="w-full py-3 text-base font-medium"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang gửi mã...
              </div>
            ) : (
              'Gửi mã xác thực'
            )}
          </Button>

          {/* Demo Info */}
          <div className="text-center">
            <p className="text-xs text-gray-500">Demo: 0123 456 789</p>
          </div>
        </form>
      </div>
    );
  }

  // OTP Verification Step
  if (currentStep === 'otp') {
    return (
      <div className="space-y-6">
        <div className="text-center mb-6">
          <button
            onClick={handleBackToPhone}
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Quay lại
          </button>

          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
            <CheckCircleIcon className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nhập mã xác thực</h3>
          <p className="text-gray-600 text-sm">
            Mã xác thực đã được gửi đến<br />
            <span className="font-medium text-gray-900">{formData.phoneNumber}</span>
          </p>
        </div>

        <form onSubmit={handleOTPSubmit} className="space-y-5">
          {/* General Error Message */}
          {errors.general && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          {/* OTP Input */}
          <FormInput
            type="text"
            name="otpCode"
            value={formData.otpCode}
            onChange={handleInputChange}
            label="Mã xác thực (6 chữ số) *"
            placeholder="123456"
            disabled={isLoading}
            error={errors.otpCode}
            className="text-center text-lg tracking-widest"
            maxLength={6}
          />

          {/* Verify Button */}
          <Button
            type="submit"
            disabled={isLoading || formData.otpCode.length !== 6}
            className="w-full py-3 text-base font-medium"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang xác thực...
              </div>
            ) : (
              'Xác thực'
            )}
          </Button>

          {/* Resend OTP */}
          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-sm text-gray-500">
                Gửi lại mã sau {countdown}s
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Gửi lại mã xác thực
              </button>
            )}
          </div>

          {/* Demo Info */}
          <div className="text-center">
            <p className="text-xs text-gray-500">Demo OTP: 123456</p>
          </div>
        </form>
      </div>
    );
  }

  return null;
};

export default LoginForm;
