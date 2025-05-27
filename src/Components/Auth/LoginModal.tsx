import { useState } from "react";
import { useApp } from "@/Context/AppContext";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

import { PhoneIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { login, state } = useApp();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");

  const validatePhoneNumber = (phone: string) => {
    // Vietnamese phone number validation
    const phoneRegex = /^(\+84|84|0)(3|5|7|8|9)[0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const formatPhoneNumber = (phone: string) => {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');

    // Format as Vietnamese phone number
    if (cleaned.startsWith('84')) {
      return '+' + cleaned;
    } else if (cleaned.startsWith('0')) {
      return '+84' + cleaned.substring(1);
    } else if (cleaned.length === 9) {
      return '+84' + cleaned;
    }
    return phone;
  };

  const handleSendCode = async () => {
    setError("");

    if (!validatePhoneNumber(phoneNumber)) {
      setError("Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại Việt Nam.");
      return;
    }

    const formattedPhone = formatPhoneNumber(phoneNumber);
    setPhoneNumber(formattedPhone);

    // Simulate sending SMS
    console.log("Sending verification code to:", formattedPhone);
    setIsVerifying(true);
  };

  const handleVerify = async () => {
    setError("");

    if (verificationCode.length !== 6) {
      setError("Mã xác thực phải có 6 chữ số.");
      return;
    }

    try {
      const success = await login(phoneNumber, verificationCode);
      if (success) {
        onClose();
        setPhoneNumber("");
        setVerificationCode("");
        setIsVerifying(false);
      } else {
        setError("Mã xác thực không đúng. Vui lòng thử lại.");
      }
    } catch (error) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const handleBack = () => {
    setIsVerifying(false);
    setVerificationCode("");
    setError("");
  };



  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <h2 className="text-xl font-bold text-center mb-4">
          {isVerifying ? "Nhập mã xác thực" : "Nhập số điện thoại để nhận mã xác thực"}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {!isVerifying ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <PhoneIcon className="w-4 h-4 inline mr-1" />
                Số điện thoại *
              </label>
              <input
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="0987 654 321"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={state.auth.isLoading}
              />
            </div>

            <Button
              onClick={handleSendCode}
              disabled={!phoneNumber || state.auth.isLoading}
              className="w-full py-3 mb-4"
            >
              {state.auth.isLoading ? 'Đang gửi...' : 'Gửi mã xác thực'}
            </Button>

            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">
                Chúng tôi sẽ gửi mã xác thực 6 chữ số đến số điện thoại của bạn
              </p>
              <p className="text-xs text-blue-600">
                Demo: Nhập bất kỳ số điện thoại nào và mã xác thực 123456
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-4">
              <ShieldCheckIcon className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Mã xác thực đã được gửi đến
              </p>
              <p className="font-semibold text-gray-800">{phoneNumber}</p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mã xác thực (6 chữ số)
              </label>
              <input
                type="text"
                maxLength={6}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-center text-lg tracking-widest"
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                disabled={state.auth.isLoading}
                autoFocus
              />
            </div>

            <Button
              onClick={handleVerify}
              disabled={verificationCode.length !== 6 || state.auth.isLoading}
              className="w-full py-3 mb-3"
            >
              {state.auth.isLoading ? 'Đang xác thực...' : 'Xác nhận'}
            </Button>

            <div className="flex justify-center gap-4 text-sm">
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-800 transition-colors"
                disabled={state.auth.isLoading}
              >
                ← Quay lại
              </button>
              <button
                onClick={() => {
                  setVerificationCode('');
                  setError('');
                }}
                className="text-primary hover:text-primary-dark transition-colors"
                disabled={state.auth.isLoading}
              >
                Gửi lại mã
              </button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default LoginModal;

