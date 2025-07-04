import { useState, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';
import { Receptionist } from '@/services/Types';
import AddReceptionistModal from './AddReceptionistModal';

interface ReceptionistManagementProps {
  doctorId: string;
}

const ReceptionistManagement = ({ doctorId }: ReceptionistManagementProps) => {
  const [receptionists, setReceptionists] = useState<Receptionist[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedReceptionist, setSelectedReceptionist] = useState<Receptionist | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for receptionists
  const mockReceptionists: Receptionist[] = [
    {
      id: 'receptionist-1',
      name: 'Nguyễn Thị Mai',
      phone: '0987654321',
      email: 'mai.nguyen@email.com',
      dateOfBirth: '1995-05-15',
      gender: 'female',
      address: '123 Nguyễn Văn Cừ, Quận 1, TP.HCM',
      workingHours: {
        weekdays: '8:00 - 17:00',
        weekends: '8:00 - 12:00'
      },
      status: 'active',
      doctorId: doctorId,
      hospitalId: 'hospital-1',
      startDate: '2024-01-15',
      emergencyContact: {
        name: 'Nguyễn Văn Nam',
        phone: '0912345678',
        relationship: 'Anh trai'
      }
    },
    {
      id: 'receptionist-2',
      name: 'Trần Thị Lan',
      phone: '0976543210',
      email: 'lan.tran@email.com',
      dateOfBirth: '1992-08-20',
      gender: 'female',
      address: '456 Lê Lợi, Quận 3, TP.HCM',
      workingHours: {
        weekdays: '13:00 - 22:00',
        weekends: 'Nghỉ'
      },
      status: 'active',
      doctorId: doctorId,
      hospitalId: 'hospital-1',
      startDate: '2024-02-01',
      emergencyContact: {
        name: 'Trần Văn Hùng',
        phone: '0923456789',
        relationship: 'Chồng'
      }
    }
  ];

  useEffect(() => {
    // Load receptionists data
    setReceptionists(mockReceptionists);
  }, [doctorId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredReceptionists = receptionists.filter(receptionist =>
    receptionist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receptionist.phone.includes(searchTerm) ||
    receptionist.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddReceptionist = () => {
    setSelectedReceptionist(null);
    setShowAddModal(true);
  };

  const handleEditReceptionist = (receptionist: Receptionist) => {
    setSelectedReceptionist(receptionist);
    setShowAddModal(true);
  };

  const handleDeleteReceptionist = async (receptionistId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lễ tân này?')) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setReceptionists(prev => prev.filter(r => r.id !== receptionistId));
        alert('Xóa lễ tân thành công!');
      } catch (error) {
        alert('Có lỗi xảy ra khi xóa lễ tân!');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleToggleStatus = async (receptionistId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReceptionists(prev => prev.map(r =>
        r.id === receptionistId
          ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' }
          : r
      ));
      alert('Cập nhật trạng thái thành công!');
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật trạng thái!');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveReceptionist = async (receptionistData: Omit<Receptionist, 'id'>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (selectedReceptionist) {
        // Update existing receptionist
        setReceptionists(prev => prev.map(r =>
          r.id === selectedReceptionist.id
            ? { ...receptionistData, id: selectedReceptionist.id }
            : r
        ));
        alert('Cập nhật thông tin lễ tân thành công!');
      } else {
        // Add new receptionist
        const newReceptionist: Receptionist = {
          ...receptionistData,
          id: `receptionist-${Date.now()}`
        };
        setReceptionists(prev => [...prev, newReceptionist]);
        alert('Thêm lễ tân mới thành công!');
      }

      setShowAddModal(false);
      setSelectedReceptionist(null);
    } catch (error) {
      alert('Có lỗi xảy ra khi lưu thông tin lễ tân!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý lễ tân</h1>
          <p className="text-gray-600">Quản lý đội ngũ lễ tân cho phòng khám của bạn</p>
        </div>

        <Button
          onClick={handleAddReceptionist}
          className="bg-primary hover:bg-primary-dark flex items-center gap-2"
        >
          <UserPlusIcon className="w-5 h-5" />
          Thêm lễ tân
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, số điện thoại hoặc email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserPlusIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tổng số lễ tân</p>
              <p className="text-2xl font-bold text-gray-900">{receptionists.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UserPlusIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
              <p className="text-2xl font-bold text-gray-900">
                {receptionists.filter(r => r.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <UserPlusIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Tạm nghỉ</p>
              <p className="text-2xl font-bold text-gray-900">
                {receptionists.filter(r => r.status === 'inactive').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Receptionists Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thông tin lễ tân
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Liên hệ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giờ làm việc
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
              {filteredReceptionists.map((receptionist) => (
                <tr key={receptionist.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {receptionist.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Bắt đầu: {new Date(receptionist.startDate).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{receptionist.phone}</div>
                    <div className="text-sm text-gray-500">{receptionist.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      T2-T6: {receptionist.workingHours.weekdays}
                    </div>
                    <div className="text-sm text-gray-500">
                      T7-CN: {receptionist.workingHours.weekends}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${receptionist.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {receptionist.status === 'active' ? 'Hoạt động' : 'Tạm nghỉ'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditReceptionist(receptionist)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Chỉnh sửa"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(receptionist.id)}
                        className="text-yellow-600 hover:text-yellow-900"
                        title={receptionist.status === 'active' ? 'Tạm nghỉ' : 'Kích hoạt'}
                        disabled={isLoading}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteReceptionist(receptionist.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Xóa"
                        disabled={isLoading}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReceptionists.length === 0 && (
          <div className="text-center py-12">
            <UserPlusIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Chưa có lễ tân nào</h3>
            <p className="mt-1 text-sm text-gray-500">
              Bắt đầu bằng cách thêm lễ tân đầu tiên cho phòng khám của bạn.
            </p>
            <div className="mt-6">
              <Button
                onClick={handleAddReceptionist}
                className="bg-primary hover:bg-primary-dark"
              >
                <UserPlusIcon className="w-5 h-5 mr-2" />
                Thêm lễ tân
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Receptionist Modal */}
      <AddReceptionistModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setSelectedReceptionist(null);
        }}
        onSubmit={handleSaveReceptionist}
        editingReceptionist={selectedReceptionist}
        doctorId={doctorId}
        hospitalId="hospital-1" // This should come from the doctor's hospital
      />
    </div>
  );
};

export default ReceptionistManagement;
