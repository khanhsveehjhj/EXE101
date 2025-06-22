import { useState } from 'react';
import {
    DocumentTextIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    FunnelIcon,
    EyeIcon,
    PencilIcon,
    UserIcon,
    PrinterIcon,
    DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';

// Interfaces
interface Patient {
    id: string;
    name: string;
    age: number;
    gender: 'male' | 'female';
    phone: string;
    email: string;
    address: string;
    bloodType: string;
    allergies: string[];
    emergencyContact: {
        name: string;
        phone: string;
        relationship: string;
    };
}

interface MedicalRecord {
    id: string;
    patientId: string;
    patient: Patient;
    visitDate: string;
    chiefComplaint: string;
    symptoms: string[];
    vitalSigns: {
        temperature: number;
        bloodPressure: string;
        heartRate: number;
        respiratoryRate: number;
        weight: number;
        height: number;
    };
    diagnosis: string;
    treatment: string;
    medications: Medication[];
    notes: string;
    followUpDate?: string;
    status: 'active' | 'completed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}

interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    instructions: string;
}

const MedicalRecords = () => {
    const [activeTab, setActiveTab] = useState<'records' | 'patients'>('records');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
    const [, setShowRecordModal] = useState(false);
    const [, setShowPatientModal] = useState(false);
    const [, setSelectedRecord] = useState<MedicalRecord | null>(null);
    const [, setSelectedPatient] = useState<Patient | null>(null);
    const [, setIsCreatingRecord] = useState(false);

    // Form states
    const [, setNewRecord] = useState({
        patientId: '',
        chiefComplaint: '',
        symptoms: '',
        temperature: '',
        bloodPressure: '',
        heartRate: '',
        respiratoryRate: '',
        weight: '',
        height: '',
        diagnosis: '',
        treatment: '',
        medications: '',
        notes: '',
        followUpDate: ''
    });

    // Mock data
    const mockPatients: Patient[] = [
        {
            id: '1',
            name: 'Nguyễn Văn An',
            age: 35,
            gender: 'male',
            phone: '0901234567',
            email: 'nguyenvanan@email.com',
            address: '123 Đường ABC, Quận 1, TP.HCM',
            bloodType: 'O+',
            allergies: ['Penicillin', 'Peanuts'],
            emergencyContact: {
                name: 'Nguyễn Thị Bình',
                phone: '0907654321',
                relationship: 'Vợ'
            }
        },
        {
            id: '2',
            name: 'Trần Thị Bình',
            age: 28,
            gender: 'female',
            phone: '0912345678',
            email: 'tranthibinh@email.com',
            address: '456 Đường DEF, Quận 3, TP.HCM',
            bloodType: 'A+',
            allergies: ['Shellfish'],
            emergencyContact: {
                name: 'Trần Văn Cường',
                phone: '0908765432',
                relationship: 'Chồng'
            }
        },
        {
            id: '3',
            name: 'Lê Minh Cường',
            age: 42,
            gender: 'male',
            phone: '0923456789',
            email: 'leminhcuong@email.com',
            address: '789 Đường GHI, Quận 7, TP.HCM',
            bloodType: 'B+',
            allergies: [],
            emergencyContact: {
                name: 'Lê Thị Dung',
                phone: '0909876543',
                relationship: 'Vợ'
            }
        }
    ];

    const mockRecords: MedicalRecord[] = [
        {
            id: '1',
            patientId: '1',
            patient: mockPatients[0],
            visitDate: '2024-12-21',
            chiefComplaint: 'Đau đầu và sốt',
            symptoms: ['Đau đầu', 'Sốt', 'Mệt mỏi'],
            vitalSigns: {
                temperature: 38.5,
                bloodPressure: '120/80',
                heartRate: 85,
                respiratoryRate: 18,
                weight: 70,
                height: 175
            },
            diagnosis: 'Cảm cúm thông thường',
            treatment: 'Nghỉ ngơi, uống nhiều nước, thuốc hạ sốt',
            medications: [
                {
                    id: '1',
                    name: 'Paracetamol',
                    dosage: '500mg',
                    frequency: '3 lần/ngày',
                    duration: '5 ngày',
                    instructions: 'Uống sau ăn'
                }
            ],
            notes: 'Bệnh nhân cần theo dõi thêm 3 ngày',
            followUpDate: '2024-12-24',
            status: 'active',
            createdAt: '2024-12-21T09:00:00Z',
            updatedAt: '2024-12-21T09:00:00Z'
        },
        {
            id: '2',
            patientId: '2',
            patient: mockPatients[1],
            visitDate: '2024-12-20',
            chiefComplaint: 'Đau bụng và buồn nôn',
            symptoms: ['Đau bụng', 'Buồn nôn', 'Chóng mặt'],
            vitalSigns: {
                temperature: 37.2,
                bloodPressure: '110/70',
                heartRate: 78,
                respiratoryRate: 16,
                weight: 55,
                height: 160
            },
            diagnosis: 'Viêm dạ dày cấp',
            treatment: 'Ăn nhẹ, tránh thức ăn cay nóng',
            medications: [
                {
                    id: '2',
                    name: 'Omeprazole',
                    dosage: '20mg',
                    frequency: '2 lần/ngày',
                    duration: '7 ngày',
                    instructions: 'Uống trước ăn 30 phút'
                }
            ],
            notes: 'Tái khám sau 1 tuần nếu không cải thiện',
            status: 'completed',
            createdAt: '2024-12-20T14:30:00Z',
            updatedAt: '2024-12-20T14:30:00Z'
        }
    ];

    // Helper functions
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active':
                return 'Đang điều trị';
            case 'completed':
                return 'Hoàn thành';
            case 'cancelled':
                return 'Đã hủy';
            default:
                return 'Không xác định';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const filteredRecords = mockRecords.filter(record => {
        const matchesSearch = record.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
            record.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === 'all' || record.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hồ sơ bệnh án</h1>
                    <p className="text-gray-600">Quản lý hồ sơ bệnh án và chẩn đoán</p>
                </div>
                <div className="flex space-x-3">
                    <button
                        onClick={() => setShowPatientModal(true)}
                        className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <UserIcon className="w-5 h-5 mr-2" />
                        Thêm bệnh nhân
                    </button>
                    <button
                        onClick={() => setShowRecordModal(true)}
                        className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Tạo hồ sơ mới
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-200">
                    <nav className="flex space-x-8 px-6">
                        {[
                            { id: 'records', label: 'Hồ sơ bệnh án', icon: DocumentTextIcon },
                            { id: 'patients', label: 'Danh sách bệnh nhân', icon: UserIcon }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as 'records' | 'patients')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${activeTab === tab.id
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5 mr-2" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Tab Content */}
                {activeTab === 'records' && (
                    <div className="p-6">
                        {/* Search and Filter Controls */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                {/* Search */}
                                <div className="relative">
                                    <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm bệnh nhân, chẩn đoán..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full sm:w-80"
                                    />
                                </div>

                                {/* Filter */}
                                <div className="relative">
                                    <FunnelIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'completed' | 'cancelled')}
                                        className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                                    >
                                        <option value="all">Tất cả trạng thái</option>
                                        <option value="active">Đang điều trị</option>
                                        <option value="completed">Hoàn thành</option>
                                        <option value="cancelled">Đã hủy</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="flex items-center px-3 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                                    <PrinterIcon className="w-4 h-4 mr-2" />
                                    In báo cáo
                                </button>
                                <button className="flex items-center px-3 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50">
                                    <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
                                    Xuất Excel
                                </button>
                            </div>
                        </div>

                        {/* Records Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Bệnh nhân
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ngày khám
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Triệu chứng chính
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Chẩn đoán
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Trạng thái
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tái khám
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredRecords.map((record) => (
                                        <tr key={record.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                            <UserIcon className="h-6 w-6 text-gray-600" />
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{record.patient.name}</div>
                                                        <div className="text-sm text-gray-500">{record.patient.age} tuổi • {record.patient.gender === 'male' ? 'Nam' : 'Nữ'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {formatDate(record.visitDate)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {record.chiefComplaint}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {record.diagnosis}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                                                    {getStatusText(record.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {record.followUpDate ? formatDate(record.followUpDate) : '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => {
                                                            setSelectedRecord(record);
                                                            setShowRecordModal(true);
                                                        }}
                                                        className="text-blue-600 hover:text-blue-900"
                                                    >
                                                        <EyeIcon className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-green-600 hover:text-green-900">
                                                        <PencilIcon className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-gray-600 hover:text-gray-900">
                                                        <PrinterIcon className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredRecords.length === 0 && (
                            <div className="text-center py-12">
                                <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Không có hồ sơ nào</h3>
                                <p className="text-gray-600">Chưa có hồ sơ bệnh án nào được tạo.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* Patients Tab */}
                {activeTab === 'patients' && (
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mockPatients.map((patient) => (
                                <div key={patient.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-center mb-4">
                                        <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
                                            <UserIcon className="h-8 w-8 text-gray-600" />
                                        </div>
                                        <div className="ml-4">
                                            <h3 className="text-lg font-medium text-gray-900">{patient.name}</h3>
                                            <p className="text-sm text-gray-500">{patient.age} tuổi • {patient.gender === 'male' ? 'Nam' : 'Nữ'}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Điện thoại:</span>
                                            <span className="text-gray-900">{patient.phone}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Nhóm máu:</span>
                                            <span className="text-gray-900">{patient.bloodType}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Dị ứng:</span>
                                            <span className="text-gray-900">
                                                {patient.allergies.length > 0 ? patient.allergies.join(', ') : 'Không'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex space-x-2">
                                        <button
                                            onClick={() => {
                                                setSelectedPatient(patient);
                                                setShowPatientModal(true);
                                            }}
                                            className="flex-1 px-3 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary/90"
                                        >
                                            Xem chi tiết
                                        </button>
                                        <button
                                            onClick={() => {
                                                setNewRecord(prev => ({ ...prev, patientId: patient.id }));
                                                setIsCreatingRecord(true);
                                                setShowRecordModal(true);
                                            }}
                                            className="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                                        >
                                            Tạo hồ sơ
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {mockPatients.length === 0 && (
                            <div className="text-center py-12">
                                <UserIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có bệnh nhân nào</h3>
                                <p className="text-gray-600">Thêm bệnh nhân mới để bắt đầu tạo hồ sơ bệnh án.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MedicalRecords;