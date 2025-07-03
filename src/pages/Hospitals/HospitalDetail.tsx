import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { Hospital, Doctor } from '@/services/Types';
import { mockDoctors } from '@/services/MockData';
import { 
  MapPinIcon, 
  PhoneIcon, 
  ClockIcon, 
  StarIcon,
  BuildingOfficeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';

const HospitalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, selectHospital } = useApp();
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [hospitalDoctors, setHospitalDoctors] = useState<Doctor[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'doctors' | 'services' | 'facilities'>('overview');

  useEffect(() => {
    if (id) {
      const foundHospital = state.hospitals.find(h => h.id === id);
      if (foundHospital) {
        setHospital(foundHospital);
        selectHospital(foundHospital);
        
        // Get doctors for this hospital
        const doctors = mockDoctors.filter(doctor => doctor.hospitalId === id);
        setHospitalDoctors(doctors);
      } else {
        navigate('/hospitals');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, state.hospitals, navigate]);

  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'auto'});
  }, []);           

  if (!hospital) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải thông tin phòng khám...</p>
        </div>
      </div>
    );
  }

  const handleBookAppointment = () => {
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-background py-8 mt-10">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{hospital.name}</h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <StarIcon className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-semibold">{hospital.rating}</span>
                <span className="text-gray-300">({hospital.totalReviews} đánh giá)</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPinIcon className="w-5 h-5" />
                <span>{hospital.district}, {hospital.city}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                {[
                  { id: 'overview', label: 'Tổng quan' },
                  { id: 'doctors', label: 'Bác sĩ' },
                  { id: 'services', label: 'Dịch vụ' },
                  { id: 'facilities', label: 'Cơ sở vật chất' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as 'overview' | 'doctors' | 'services' | 'facilities')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">Giới thiệu</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">{hospital.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Chuyên khoa</h3>
                      
                      <div className="space-y-2">
                        {hospital.specialties.map(specialty => (
                          <div key={specialty} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-gray-700">{specialty}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Giờ làm việc</h3>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <ClockIcon className="w-5 h-5 text-gray-400" />
                          
                          <span className="text-gray-700">
                            Thứ 2 - Thứ 6: {hospital.workingHours.weekdays}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <ClockIcon className="w-5 h-5 text-gray-400" />
                          
                          <span className="text-gray-700">
                            Thứ 7 - CN: {hospital.workingHours.weekends}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'doctors' && (
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">Đội ngũ bác sĩ</h2>
                  {hospitalDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {hospitalDoctors.map(doctor => (
                        <div key={doctor.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start gap-4">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />

                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                              <p className="text-primary text-sm">{doctor.specialty}</p>
                              <p className="text-gray-600 text-sm">{doctor.experience} năm kinh nghiệm</p>
                              
                              <div className="flex items-center gap-1 mt-1">
                                <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm">{doctor.rating}</span>
                              </div>
                              
                              <p className="text-sm text-gray-600 mt-1">
                                Phí khám: {doctor.consultationFee.toLocaleString('vi-VN')}đ
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Thông tin bác sĩ đang được cập nhật.</p>
                  )}
                </div>
              )}

              {activeTab === 'services' && (
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">Dịch vụ y tế</h2>
                  <p className="text-gray-500">Thông tin dịch vụ đang được cập nhật.</p>
                </div>
              )}

              {activeTab === 'facilities' && (
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-4">Cơ sở vật chất</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {hospital.facilities.map(facility => (
                      <div key={facility} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <BuildingOfficeIcon className="w-5 h-5 text-primary" />
                        <span className="text-gray-700">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold text-primary mb-4">Thông tin liên hệ</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-gray-700">{hospital.address}</p>
                    <p className="text-gray-700">{hospital.district}, {hospital.city}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-700">{hospital.phone}</p>
                </div>
                
                {hospital.email && (
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 text-gray-400">@</span>
                    <p className="text-gray-700">{hospital.email}</p>
                  </div>
                )}
              </div>

              <Button
                onClick={handleBookAppointment}
                className="w-full mb-4"
              >
                <CalendarIcon className="w-5 h-5 mr-2" />
                Đặt lịch khám
              </Button>

              <button
                onClick={() => navigate('/hospitals')}
                className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Quay lại danh sách
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDetail;
