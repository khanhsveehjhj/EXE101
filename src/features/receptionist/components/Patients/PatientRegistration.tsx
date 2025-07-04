import { useState, useEffect } from 'react';
import {
    UserIcon,
    MapPinIcon,
    IdentificationIcon,
    HeartIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';

interface PatientFormData {
    // Thông tin cá nhân
    fullName: string;
    dateOfBirth: string;
    gender: string;
    idNumber: string;
    phone: string;
    email: string;

    // Địa chỉ
    address: string;
    ward: string;
    district: string;
    city: string;

    // Thông tin y tế
    bloodType: string;
    allergies: string;
    medicalHistory: string;
    currentMedications: string;

    // Liên hệ khẩn cấp
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactRelation: string;

    // Bảo hiểm
    insuranceNumber: string;
    insuranceProvider: string;
    insuranceExpiry: string;
}

interface FormErrors {
    [key: string]: string;
}

interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string, formData: PatientFormData) => string | null;
}

// Helper component for input with error display - moved outside to prevent recreation
const InputWithError = ({
    field,
    label,
    type = 'text',
    required = false,
    placeholder = '',
    children,
    formData,
    errors,
    onInputChange,
    onInputBlur
}: {
    field: keyof PatientFormData;
    label: string;
    type?: string;
    required?: boolean;
    placeholder?: string;
    children?: React.ReactNode;
    formData: PatientFormData;
    errors: FormErrors;
    onInputChange: (field: keyof PatientFormData, value: string) => void;
    onInputBlur: (field: keyof PatientFormData, value: string) => void;
}) => (
    <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children || (
            <input
                type={type}
                value={formData[field]}
                onChange={(e) => onInputChange(field, e.target.value)}
                onBlur={(e) => onInputBlur(field, e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                placeholder={placeholder}
            />
        )}
        {errors[field] && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
                <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                {errors[field]}
            </p>
        )}
    </div>
);

const PatientRegistration = () => {
    const [formData, setFormData] = useState<PatientFormData>({
        fullName: '',
        dateOfBirth: '',
        gender: '',
        idNumber: '',
        phone: '',
        email: '',
        address: '',
        ward: '',
        district: '',
        city: '',
        bloodType: '',
        allergies: '',
        medicalHistory: '',
        currentMedications: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelation: '',
        insuranceNumber: '',
        insuranceProvider: '',
        insuranceExpiry: ''
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    // Validation rules for each field
    const validationRules: Record<keyof PatientFormData, ValidationRule> = {
        fullName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-ZÀ-ỹ\s]+$/
        },
        dateOfBirth: {
            required: true,
            custom: (value) => {
                if (!value) return 'Ngày sinh là bắt buộc';
                const birthDate = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                if (age < 0 || age > 120) return 'Ngày sinh không hợp lệ';
                return null;
            }
        },
        gender: { required: true },
        idNumber: {
            required: true,
            pattern: /^[0-9]{9,12}$/
        },
        phone: {
            required: true,
            pattern: /^[0-9]{10,11}$/
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        address: { required: true, minLength: 10, maxLength: 200 },
        ward: { required: true, minLength: 2, maxLength: 50 },
        district: { required: true, minLength: 2, maxLength: 50 },
        city: { required: true },
        bloodType: {},
        allergies: { maxLength: 500 },
        medicalHistory: { maxLength: 1000 },
        currentMedications: { maxLength: 1000 },
        emergencyContactName: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-ZÀ-ỹ\s]+$/
        },
        emergencyContactPhone: {
            required: true,
            pattern: /^[0-9]{10,11}$/
        },
        emergencyContactRelation: { required: true },
        insuranceNumber: {
            pattern: /^[A-Z0-9]{10,15}$/
        },
        insuranceProvider: {},
        insuranceExpiry: {
            custom: (value) => {
                if (!value) return null;
                const expiryDate = new Date(value);
                const today = new Date();
                if (expiryDate < today) return 'Thẻ bảo hiểm đã hết hạn';
                return null;
            }
        }
    };

    const validateField = (field: keyof PatientFormData, value: string): string | null => {
        const rules = validationRules[field];

        // Required validation
        if (rules.required && (!value || value.trim() === '')) {
            return `${getFieldLabel(field)} là bắt buộc`;
        }

        // Skip other validations if field is empty and not required
        if (!value || value.trim() === '') {
            return null;
        }

        // Min length validation
        if (rules.minLength && value.length < rules.minLength) {
            return `${getFieldLabel(field)} phải có ít nhất ${rules.minLength} ký tự`;
        }

        // Max length validation
        if (rules.maxLength && value.length > rules.maxLength) {
            return `${getFieldLabel(field)} không được vượt quá ${rules.maxLength} ký tự`;
        }

        // Pattern validation
        if (rules.pattern && !rules.pattern.test(value)) {
            return getPatternErrorMessage(field);
        }

        // Custom validation
        if (rules.custom) {
            return rules.custom(value, formData);
        }

        return null;
    };

    const getFieldLabel = (field: keyof PatientFormData): string => {
        const labels: Record<keyof PatientFormData, string> = {
            fullName: 'Họ và tên',
            dateOfBirth: 'Ngày sinh',
            gender: 'Giới tính',
            idNumber: 'CMND/CCCD',
            phone: 'Số điện thoại',
            email: 'Email',
            address: 'Địa chỉ',
            ward: 'Phường/Xã',
            district: 'Quận/Huyện',
            city: 'Tỉnh/Thành phố',
            bloodType: 'Nhóm máu',
            allergies: 'Dị ứng',
            medicalHistory: 'Tiền sử bệnh án',
            currentMedications: 'Thuốc đang sử dụng',
            emergencyContactName: 'Họ tên người liên hệ',
            emergencyContactPhone: 'Số điện thoại người liên hệ',
            emergencyContactRelation: 'Mối quan hệ',
            insuranceNumber: 'Số thẻ bảo hiểm',
            insuranceProvider: 'Nhà cung cấp bảo hiểm',
            insuranceExpiry: 'Ngày hết hạn bảo hiểm'
        };
        return labels[field];
    };

    const getPatternErrorMessage = (field: keyof PatientFormData): string => {
        const messages: Partial<Record<keyof PatientFormData, string>> = {
            fullName: 'Họ và tên chỉ được chứa chữ cái và khoảng trắng',
            idNumber: 'CMND/CCCD phải có 9-12 chữ số',
            phone: 'Số điện thoại phải có 10-11 chữ số',
            email: 'Email không đúng định dạng',
            emergencyContactName: 'Họ tên chỉ được chứa chữ cái và khoảng trắng',
            emergencyContactPhone: 'Số điện thoại phải có 10-11 chữ số',
            insuranceNumber: 'Số thẻ bảo hiểm phải có 10-15 ký tự (chữ và số)'
        };
        return messages[field] || `${getFieldLabel(field)} không đúng định dạng`;
    };

    const handleInputChange = (field: keyof PatientFormData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const handleInputBlur = (field: keyof PatientFormData, value: string) => {
        // Validate field when user leaves the input (onBlur)
        const error = validateField(field, value);
        if (error) {
            setErrors(prev => ({
                ...prev,
                [field]: error
            }));
        }
    };

    const validateStep = (step: number): boolean => {
        const stepFields: Record<number, (keyof PatientFormData)[]> = {
            1: ['fullName', 'dateOfBirth', 'gender', 'idNumber', 'phone'],
            2: ['address', 'ward', 'district', 'city'],
            3: [], // No required fields in step 3
            4: ['emergencyContactName', 'emergencyContactPhone', 'emergencyContactRelation'],
            5: [] // No required fields in step 5
        };

        const fieldsToValidate = stepFields[step] || [];
        const newErrors: FormErrors = {};
        let hasErrors = false;

        // Validate all fields in current step
        fieldsToValidate.forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                hasErrors = true;
            }
        });

        // Also validate email if provided (even though not required)
        if (step === 1 && formData.email) {
            const emailError = validateField('email', formData.email);
            if (emailError) {
                newErrors.email = emailError;
                hasErrors = true;
            }
        }

        // Validate insurance number if provided
        if (step === 5 && formData.insuranceNumber) {
            const insuranceError = validateField('insuranceNumber', formData.insuranceNumber);
            if (insuranceError) {
                newErrors.insuranceNumber = insuranceError;
                hasErrors = true;
            }
        }

        // Validate insurance expiry if provided
        if (step === 5 && formData.insuranceExpiry) {
            const expiryError = validateField('insuranceExpiry', formData.insuranceExpiry);
            if (expiryError) {
                newErrors.insuranceExpiry = expiryError;
                hasErrors = true;
            }
        }

        setErrors(newErrors);
        return !hasErrors;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentStep(prev => Math.max(1, prev - 1));
        // Clear errors when going back
        setErrors({});
    };

    const handleSubmit = async () => {
        // Validate all steps before submitting
        let allValid = true;
        for (let step = 1; step <= 5; step++) {
            if (!validateStep(step)) {
                allValid = false;
                // Go to first step with errors
                setCurrentStep(step);
                break;
            }
        }

        if (!allValid) {
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setShowSuccess(true);

        // Reset form after 3 seconds
        setTimeout(() => {
            setShowSuccess(false);
            setCurrentStep(1);
            setErrors({});
            setFormData({
                fullName: '',
                dateOfBirth: '',
                gender: '',
                idNumber: '',
                phone: '',
                email: '',
                address: '',
                ward: '',
                district: '',
                city: '',
                bloodType: '',
                allergies: '',
                medicalHistory: '',
                currentMedications: '',
                emergencyContactName: '',
                emergencyContactPhone: '',
                emergencyContactRelation: '',
                insuranceNumber: '',
                insuranceProvider: '',
                insuranceExpiry: ''
            });
        }, 3000);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const steps = [
        { id: 1, title: 'Thông tin cá nhân', icon: UserIcon },
        { id: 2, title: 'Địa chỉ liên hệ', icon: MapPinIcon },
        { id: 3, title: 'Thông tin y tế', icon: HeartIcon },
        { id: 4, title: 'Liên hệ khẩn cấp', icon: ExclamationTriangleIcon },
        { id: 5, title: 'Bảo hiểm y tế', icon: IdentificationIcon }
    ];

    if (showSuccess) {
        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-900">Đăng ký bệnh nhân</h1>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Đăng ký thành công!</h2>
                    <p className="text-gray-600 mb-6">
                        Thông tin bệnh nhân đã được lưu vào hệ thống. Mã bệnh nhân: <span className="font-mono font-bold text-blue-600">BN{Date.now().toString().slice(-6)}</span>
                    </p>
                    <div className="text-sm text-gray-500">
                        Đang chuyển về form đăng ký mới...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Đăng ký bệnh nhân</h1>
            </div>

            {/* Progress Steps */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 md:p-6">
                <div className="flex items-center justify-between gap-0.5 md:gap-4">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;

                        return (
                            <div key={step.id} className="flex items-center">
                                <div className={`flex items-center justify-center w-5 h-5 md:w-10 md:h-10 rounded-full border-2 transition-all duration-150 ${isActive ? 'border-blue-500 bg-blue-500 text-white' :
                                    isCompleted ? 'border-green-500 bg-green-500 text-white' :
                                        'border-gray-300 bg-white text-gray-400'
                                    }`}>
                                    {isCompleted ? (
                                        <CheckCircleIcon className="w-3.5 h-3.5 md:w-6 md:h-6" />
                                    ) : (
                                        <Icon className="w-3.5 h-3.5 md:w-5 md:h-5" />
                                    )}
                                </div>
                                <div className="ml-1 md:ml-3">
                                    <p className={`text-[10px] md:text-sm font-medium ${isActive ? 'text-blue-600' :
                                        isCompleted ? 'text-green-600' :
                                            'text-gray-500'
                                        }`}>
                                        {step.title}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className={`w-4 h-0.5 md:w-16 mx-1 md:mx-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Form Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin cá nhân</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputWithError
                                field="fullName"
                                label="Họ và tên"
                                required
                                placeholder="Nhập họ và tên đầy đủ"
                                formData={formData}
                                errors={errors}
                                onInputChange={handleInputChange}
                                onInputBlur={handleInputBlur}
                            />

                            <InputWithError
                                field="dateOfBirth"
                                label="Ngày sinh"
                                type="date"
                                required
                                formData={formData}
                                errors={errors}
                                onInputChange={handleInputChange}
                                onInputBlur={handleInputBlur}
                            />

                            <InputWithError
                                field="gender"
                                label="Giới tính"
                                required
                                formData={formData}
                                errors={errors}
                                onInputChange={handleInputChange}
                                onInputBlur={handleInputBlur}
                            >
                                <select
                                    value={formData.gender}
                                    onChange={(e) => handleInputChange('gender', e.target.value)}
                                    onBlur={(e) => handleInputBlur('gender', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.gender ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Chọn giới tính</option>
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                    <option value="other">Khác</option>
                                </select>
                            </InputWithError>

                            <InputWithError
                                field="idNumber"
                                label="CMND/CCCD"
                                required
                                placeholder="Nhập số CMND/CCCD"
                                formData={formData}
                                errors={errors}
                                onInputChange={handleInputChange}
                                onInputBlur={handleInputBlur}
                            />

                            <InputWithError
                                field="phone"
                                label="Số điện thoại"
                                type="tel"
                                required
                                placeholder="Nhập số điện thoại"
                                formData={formData}
                                errors={errors}
                                onInputChange={handleInputChange}
                                onInputBlur={handleInputBlur}
                            />

                            <InputWithError
                                field="email"
                                label="Email"
                                type="email"
                                placeholder="Nhập địa chỉ email"
                                formData={formData}
                                errors={errors}
                                onInputChange={handleInputChange}
                                onInputBlur={handleInputBlur}
                            />
                        </div>
                    </div>
                )}

                {currentStep === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Địa chỉ liên hệ</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <InputWithError
                                    field="address"
                                    label="Địa chỉ"
                                    required
                                    placeholder="Nhập địa chỉ chi tiết"
                                    formData={formData}
                                    errors={errors}
                                    onInputChange={handleInputChange}
                                    onInputBlur={handleInputBlur}
                                />
                            </div>

                            <InputWithError
                                field="ward"
                                label="Phường/Xã"
                                required
                                placeholder="Nhập phường/xã"
                                formData={formData}
                                errors={errors}
                                onInputChange={handleInputChange}
                                onInputBlur={handleInputBlur}
                            />

                            <InputWithError
                                field="district"
                                label="Quận/Huyện"
                                required
                                placeholder="Nhập quận/huyện"
                                formData={formData}
                                errors={errors}
                                onInputChange={handleInputChange}
                                onInputBlur={handleInputBlur}
                            />

                            <InputWithError
                                field="city"
                                label="Tỉnh/Thành phố"
                                required
                                formData={formData}
                                errors={errors}
                                onInputChange={handleInputChange}
                                onInputBlur={handleInputBlur}
                            >
                                <select
                                    value={formData.city}
                                    onChange={(e) => handleInputChange('city', e.target.value)}
                                    onBlur={(e) => handleInputBlur('city', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.city ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Chọn tỉnh/thành phố</option>
                                    <option value="hanoi">Hà Nội</option>
                                    <option value="hcm">TP. Hồ Chí Minh</option>
                                    <option value="danang">Đà Nẵng</option>
                                    <option value="haiphong">Hải Phòng</option>
                                    <option value="cantho">Cần Thơ</option>
                                </select>
                            </InputWithError>
                        </div>
                    </div>
                )}

                {currentStep === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin y tế</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nhóm máu
                                </label>
                                <select
                                    value={formData.bloodType}
                                    onChange={(e) => handleInputChange('bloodType', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Chọn nhóm máu</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Dị ứng
                                </label>
                                <input
                                    type="text"
                                    value={formData.allergies}
                                    onChange={(e) => handleInputChange('allergies', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Nhập các loại dị ứng (nếu có)"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tiền sử bệnh án
                                </label>
                                <textarea
                                    value={formData.medicalHistory}
                                    onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Nhập tiền sử bệnh án (nếu có)"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Thuốc đang sử dụng
                                </label>
                                <textarea
                                    value={formData.currentMedications}
                                    onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Nhập các loại thuốc đang sử dụng (nếu có)"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 4 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Liên hệ khẩn cấp</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Họ tên người liên hệ *
                                </label>
                                <input
                                    type="text"
                                    value={formData.emergencyContactName}
                                    onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                                    onBlur={(e) => handleInputBlur('emergencyContactName', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.emergencyContactName ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                        }`}
                                    placeholder="Nhập họ tên người liên hệ"
                                />
                                {errors.emergencyContactName && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                        {errors.emergencyContactName}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Số điện thoại *
                                </label>
                                <input
                                    type="tel"
                                    value={formData.emergencyContactPhone}
                                    onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                                    onBlur={(e) => handleInputBlur('emergencyContactPhone', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.emergencyContactPhone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                        }`}
                                    placeholder="Nhập số điện thoại"
                                />
                                {errors.emergencyContactPhone && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                        {errors.emergencyContactPhone}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Mối quan hệ *
                                </label>
                                <select
                                    value={formData.emergencyContactRelation}
                                    onChange={(e) => handleInputChange('emergencyContactRelation', e.target.value)}
                                    onBlur={(e) => handleInputBlur('emergencyContactRelation', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.emergencyContactRelation ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">Chọn mối quan hệ</option>
                                    <option value="parent">Cha/Mẹ</option>
                                    <option value="spouse">Vợ/Chồng</option>
                                    <option value="sibling">Anh/Chị/Em</option>
                                    <option value="child">Con</option>
                                    <option value="relative">Họ hàng</option>
                                    <option value="friend">Bạn bè</option>
                                    <option value="other">Khác</option>
                                </select>
                                {errors.emergencyContactRelation && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                        {errors.emergencyContactRelation}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {currentStep === 5 && (
                    <div className="space-y-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Bảo hiểm y tế</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Số thẻ bảo hiểm
                                </label>
                                <input
                                    type="text"
                                    value={formData.insuranceNumber}
                                    onChange={(e) => handleInputChange('insuranceNumber', e.target.value)}
                                    onBlur={(e) => handleInputBlur('insuranceNumber', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.insuranceNumber ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                        }`}
                                    placeholder="Nhập số thẻ bảo hiểm"
                                />
                                {errors.insuranceNumber && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                        {errors.insuranceNumber}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nhà cung cấp bảo hiểm
                                </label>
                                <select
                                    value={formData.insuranceProvider}
                                    onChange={(e) => handleInputChange('insuranceProvider', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Chọn nhà cung cấp</option>
                                    <option value="bhxh">BHXH Việt Nam</option>
                                    <option value="baolong">Bảo Long</option>
                                    <option value="baoviet">Bảo Việt</option>
                                    <option value="prudential">Prudential</option>
                                    <option value="other">Khác</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ngày hết hạn
                                </label>
                                <input
                                    type="date"
                                    value={formData.insuranceExpiry}
                                    onChange={(e) => handleInputChange('insuranceExpiry', e.target.value)}
                                    onBlur={(e) => handleInputBlur('insuranceExpiry', e.target.value)}
                                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.insuranceExpiry ? 'border-red-500 bg-red-50' : 'border-gray-300'
                                        }`}
                                />
                                {errors.insuranceExpiry && (
                                    <p className="mt-1 text-sm text-red-600 flex items-center">
                                        <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                                        {errors.insuranceExpiry}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t border-gray-200">
                    <Button
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Quay lại
                    </Button>

                    {currentStep < 5 ? (
                        <Button
                            onClick={handleNext}
                            className="bg-blue-500 text-white hover:bg-blue-600"
                        >
                            Tiếp theo
                        </Button>
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Đang xử lý...' : 'Hoàn thành đăng ký'}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PatientRegistration;