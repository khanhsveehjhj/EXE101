import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import { Hospital } from '@/services/Types';
import { vietnameseCities } from '@/services/MockData';
import { MagnifyingGlassIcon, MapPinIcon, StarIcon, PhoneIcon } from '@heroicons/react/24/outline';
import Button from '@/components/UI/Button';

const HospitalList = () => {
  const navigate = useNavigate();
  const { state, searchHospitals, selectHospital } = useApp();
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    district: '',
    specialty: '',
    searchTerm: '',
  });

  // Scroll về đầu trang khi mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  // Get unique specialties from all hospitals
  const allSpecialties = Array.from(
    new Set(state.hospitals.flatMap(hospital => hospital.specialties))
  ).sort();

  // Get districts for selected city
  const availableDistricts = vietnameseCities.find(
    city => city.name === searchFilters.city
  )?.districts || [];

  useEffect(() => {
    const results = searchHospitals(searchFilters);
    setFilteredHospitals(results);
  }, [searchFilters, state.hospitals, searchHospitals]);

  const handleFilterChange = (key: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [key]: value,
      // Reset district when city changes
      ...(key === 'city' && { district: '' })
    }));
  };

  const handleHospitalSelect = (hospital: Hospital) => {
    selectHospital(hospital);
    navigate(`/hospital/${hospital.id}`);
  };

  const handleBookNow = (hospital: Hospital) => {
    selectHospital(hospital);
    navigate('/booking');
  };

  return (
    <div className="min-h-screen bg-background py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Tìm kiếm bệnh viện
          </h1>
          <p className="text-lg text-gray-600">
            Khám phá mạng lưới bệnh viện tư nhân chất lượng cao trên toàn quốc
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Term */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bệnh viện..."
                value={searchFilters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* City */}
            <select
              value={searchFilters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Tất cả thành phố</option>
              {vietnameseCities.map(city => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>

            {/* District */}
            <select
              value={searchFilters.district}
              onChange={(e) => handleFilterChange('district', e.target.value)}
              disabled={!searchFilters.city}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
            >
              <option value="">Tất cả quận/huyện</option>
              {availableDistricts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>

            {/* Specialty */}
            <select
              value={searchFilters.specialty}
              onChange={(e) => handleFilterChange('specialty', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Tất cả chuyên khoa</option>
              {allSpecialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Tìm thấy <span className="font-semibold text-primary">{filteredHospitals.length}</span> bệnh viện
          </p>
        </div>

        {/* Hospital Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHospitals.map(hospital => (
            <div key={hospital.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {/* Hospital Image */}
              <div className="h-48 bg-gray-200 relative">
                <img
                  src={hospital.image}
                  alt={hospital.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center gap-1">
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{hospital.rating}</span>
                  <span className="text-xs text-gray-500">({hospital.totalReviews})</span>
                </div>
              </div>

              {/* Hospital Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-2">{hospital.name}</h3>
                
                <div className="flex items-start gap-2 mb-3">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 text-sm">
                    {hospital.address}, {hospital.district}, {hospital.city}
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <p className="text-gray-600 text-sm">{hospital.phone}</p>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                  {hospital.description}
                </p>

                {/* Specialties */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Chuyên khoa:</p>
                  <div className="flex flex-wrap gap-2">
                    {hospital.specialties.slice(0, 3).map(specialty => (
                      <span
                        key={specialty}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                    {hospital.specialties.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{hospital.specialties.length - 3} khác
                      </span>
                    )}
                  </div>
                </div>

                {/* Working Hours */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Giờ làm việc:</span> {hospital.workingHours.weekdays}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleHospitalSelect(hospital)}
                    className="flex-1 px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                  >
                    Xem chi tiết
                  </button>
                  <Button
                    onClick={() => handleBookNow(hospital)}
                    className="flex-1"
                  >
                    Đặt lịch ngay
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredHospitals.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏥</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Không tìm thấy bệnh viện nào
            </h3>
            <p className="text-gray-500">
              Thử thay đổi bộ lọc tìm kiếm để có kết quả tốt hơn
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalList;
