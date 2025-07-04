import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { Booking } from '@/types';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useApp();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history' | 'profile'>('upcoming');
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!state.auth.isAuthenticated) {
      navigate('/');
      return;
    }

    // Load user bookings
    setUserBookings(state.bookings.filter(booking => booking.patientId === state.auth.user?.id));
  }, [state.auth.isAuthenticated, state.bookings, state.auth.user?.id, navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-blue-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Đã xác nhận';
      case 'pending':
        return 'Chờ xác nhận';
      case 'cancelled':
        return 'Đã hủy';
      case 'completed':
        return 'Đã hoàn thành';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      case 'completed':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const upcomingBookings = userBookings.filter(booking =>
    booking.status === 'confirmed' || booking.status === 'pending'
  );

  const pastBookings = userBookings.filter(booking =>
    booking.status === 'completed' || booking.status === 'cancelled'
  );

  // Thêm hàm hủy lịch
  const handleCancelBooking = (bookingId: string) => {
    dispatch({ type: 'UPDATE_BOOKING', payload: { id: bookingId, updates: { status: 'cancelled' } } });
    // Cập nhật localStorage
    const updatedBookings = state.bookings.map(b =>
      b.id === bookingId ? { ...b, status: 'cancelled' } : b
    );
    localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
    // Cập nhật lại danh sách booking hiển thị
    setUserBookings(updatedBookings.filter(booking => booking.patientId === state.auth.user?.id));
  };

  if (!state.auth.isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Xin chào, {state.auth.user?.name}!
          </h1>
          <p className="text-gray-600">Quản lý lịch khám và thông tin cá nhân của bạn</p>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'upcoming', label: 'Lịch sắp tới', count: upcomingBookings.length },
              { id: 'history', label: 'Lịch sử khám', count: pastBookings.length },
              { id: 'profile', label: 'Thông tin cá nhân' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'upcoming' | 'history' | 'profile')}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`px-2 py-1 text-xs rounded-full ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-lg">
          {/* Upcoming Appointments */}
          {activeTab === 'upcoming' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Lịch khám sắp tới</h2>
                <Button onClick={() => navigate('/hospitals')}>
                  Đặt lịch mới
                </Button>
              </div>

              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map(booking => {
                    const hospital = state.hospitals.find(h => h.id === booking.hospitalId);
                    return (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getStatusIcon(booking.status)}
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                                {getStatusText(booking.status)}
                              </span>
                            </div>

                            <h3 className="font-semibold text-gray-800 mb-1">{hospital?.name}</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{new Date(booking.date).toLocaleDateString('vi-VN')}</span>
                                <ClockIcon className="w-4 h-4 ml-2" />
                                <span>{booking.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <UserIcon className="w-4 h-4" />
                                <span>Bác sĩ: {booking.doctorId}</span>
                              </div>
                              {booking.symptoms && (
                                <p className="mt-2">
                                  <span className="font-medium">Triệu chứng:</span> {booking.symptoms}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => navigate(`/hospital/${booking.hospitalId}`)}
                              className="px-3 py-1 text-sm border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                            >
                              Xem chi tiết
                            </button>
                            {booking.status === 'pending' && (
                              <button
                                className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50 transition-colors"
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                Hủy lịch
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Chưa có lịch khám nào
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Đặt lịch khám với các phòng khám chất lượng cao
                  </p>
                  <Button onClick={() => navigate('/hospitals')}>
                    Đặt lịch ngay
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Appointment History */}
          {activeTab === 'history' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Lịch sử khám bệnh</h2>

              {pastBookings.length > 0 ? (
                <div className="space-y-4">
                  {pastBookings.map(booking => {
                    const hospital = state.hospitals.find(h => h.id === booking.hospitalId);
                    return (
                      <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getStatusIcon(booking.status)}
                              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                                {getStatusText(booking.status)}
                              </span>
                            </div>

                            <h3 className="font-semibold text-gray-800 mb-1">{hospital?.name}</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{new Date(booking.date).toLocaleDateString('vi-VN')}</span>
                                <ClockIcon className="w-4 h-4 ml-2" />
                                <span>{booking.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <UserIcon className="w-4 h-4" />
                                <span>Bác sĩ: {booking.doctorId}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right text-sm text-gray-500">
                            <p>Đặt lịch: {new Date(booking.createdAt).toLocaleDateString('vi-VN')}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ClockIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Chưa có lịch sử khám
                  </h3>
                  <p className="text-gray-500">
                    Lịch sử các cuộc khám sẽ hiển thị ở đây
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Profile */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Thông tin cá nhân</h2>

              <div className="max-w-md">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <UserIcon className="w-4 h-4 inline mr-1" />
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={state.auth.user?.name || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <PhoneIcon className="w-4 h-4 inline mr-1" />
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      value={state.auth.user?.phone || ''}
                      readOnly
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>

                  {state.auth.user?.email && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={state.auth.user.email}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500 mb-4">
                    Để cập nhật thông tin cá nhân, vui lòng liên hệ với chúng tôi.
                  </p>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
                    Liên hệ hỗ trợ
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
