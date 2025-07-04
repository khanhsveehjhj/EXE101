import { useState, useEffect } from 'react';
import {
    MagnifyingGlassIcon,
    UserGroupIcon,
    EyeIcon,
    PencilIcon,
    DocumentTextIcon,
    PhoneIcon,
    CalendarDaysIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';

interface Patient {
    id: string;
    name: string;
    phone: string;
    email?: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    address: string;
    lastVisit: string;
    totalVisits: number;
    status: 'active' | 'inactive';
}

const PatientManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    // Mock patients data
    const patients: Patient[] = [
        {
            id: '1',
            name: 'Nguyễn Văn A',
            phone: '0123456789',
            email: 'nguyenvana@email.com',
            dateOfBirth: '1985-03-15',
            gender: 'male',
            address: '123 Đường ABC, Quận 1, TP.HCM',
            lastVisit: '2024-06-15',
            totalVisits: 5,
            status: 'active'
        },
        {
            id: '2',
            name: 'Trần Thị B',
            phone: '0987654321',
            email: 'tranthib@email.com',
            dateOfBirth: '1990-07-22',
            gender: 'female',
            address: '456 Đường XYZ, Quận 2, TP.HCM',
            lastVisit: '2024-06-18',
            totalVisits: 3,
            status: 'active'
        },
        {
            id: '3',
            name: 'Lê Văn C',
            phone: '0369852147',
            dateOfBirth: '1978-11-08',
            gender: 'male',
            address: '789 Đường DEF, Quận 3, TP.HCM',
            lastVisit: '2024-05-20',
            totalVisits: 8,
            status: 'inactive'
        }
    ];

    const filteredPatients = patients.filter(patient => {
        const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.phone.includes(searchTerm);
        const matchesStatus = filterStatus === 'all' || patient.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getGenderLabel = (gender: string) => {
        switch (gender) {
            case 'male': return 'Nam';
            case 'female': return 'Nữ';
            case 'other': return 'Khác';
            default: return gender;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'inactive': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'active': return 'Đang điều trị';
            case 'inactive': return 'Không hoạt động';
            default: return status;
        }
    };

    const calculateAge = (dateOfBirth: string) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý bệnh nhân</h1>
                <Button className="bg-primary text-white">
                    Thêm bệnh nhân mới
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tìm kiếm bệnh nhân
                        </label>
                        <div className="relative">
                            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm theo tên hoặc số điện thoại..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Trạng thái
                        </label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="all">Tất cả</option>
                            <option value="active">Đang điều trị</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Patients List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Danh sách bệnh nhân
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        Tổng cộng: {filteredPatients.length} bệnh nhân
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bệnh nhân
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thông tin liên hệ
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tuổi/Giới tính
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Lần khám cuối
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Số lần khám
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                                                <span className="text-white font-medium text-sm">
                                                    {patient.name.charAt(0)}
                                                </span>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {patient.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    ID: {patient.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            <div className="flex items-center mb-1">
                                                <PhoneIcon className="w-4 h-4 mr-2 text-gray-400" />
                                                {patient.phone}
                                            </div>
                                            {patient.email && (
                                                <div className="text-gray-500">{patient.email}</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {calculateAge(patient.dateOfBirth)} tuổi / {getGenderLabel(patient.gender)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {new Date(patient.lastVisit).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {patient.totalVisits} lần
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                                            {getStatusLabel(patient.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                className="text-primary hover:text-primary-dark"
                                                title="Xem chi tiết"
                                            >
                                                <EyeIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="text-gray-600 hover:text-gray-800"
                                                title="Chỉnh sửa"
                                            >
                                                <PencilIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Hồ sơ bệnh án"
                                            >
                                                <DocumentTextIcon className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="text-green-600 hover:text-green-800"
                                                title="Đặt lịch hẹn"
                                            >
                                                <CalendarDaysIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPatients.length === 0 && (
                    <div className="p-12 text-center">
                        <UserGroupIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy bệnh nhân</h3>
                        <p className="text-gray-600">
                            {searchTerm ? 'Không có bệnh nhân nào phù hợp với từ khóa tìm kiếm.' : 'Chưa có bệnh nhân nào.'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientManagement;