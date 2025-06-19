import { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);

  // Reset mode when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);



  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Đóng modal"
        tabIndex={-1}
      />

      <div
        className="relative w-full max-w-lg max-h-[95vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 z-20 bg-white rounded-full p-2 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200 border border-gray-200"
          aria-label="Đóng modal"
        >
          <XMarkIcon className="w-4 h-4 text-gray-500" />
        </button>

        {/* Modal Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Tab Navigation */}
          <div className="bg-gradient-to-r from-primary via-ocean-light to-cyan-500 px-6 py-5">
            <div className="flex space-x-1 bg-white/15 backdrop-blur-sm rounded-xl p-1.5">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                  mode === 'login'
                    ? 'bg-white text-primary shadow-md transform scale-[1.02]'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                Đăng nhập
              </button>
              <button
                onClick={() => setMode('register')}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                  mode === 'register'
                    ? 'bg-white text-primary shadow-md transform scale-[1.02]'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                Đăng ký
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white max-h-[80vh] overflow-y-auto">
            {mode === 'login' ? (
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h2 id="auth-modal-title" className="text-2xl sm:text-3xl font-bold text-primary mb-2">Đăng nhập nhanh</h2>
                  <p className="text-gray-600 text-sm sm:text-base">Xác thực bằng số điện thoại để truy cập dịch vụ</p>
                </div>
                <LoginForm />
              </div>
            ) : (
              <div className="p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h2 id="auth-modal-title" className="text-2xl sm:text-3xl font-bold text-primary mb-2">Đăng ký tài khoản</h2>
                  <p className="text-gray-600 text-sm sm:text-base">Tạo tài khoản để sử dụng dịch vụ của 365 Medihome</p>
                </div>
                <RegisterForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
