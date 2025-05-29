import { useNavigate } from 'react-router-dom';
import { useApp } from '@/Context/AppContext';
import Home from '@/Components/Main/Home/Home';
import Services from './Services/Services';
import Doctors from './Doctors/Doctors';
import Reviews from './Review/Reviews';
import SectionWrapper from './SectionWrapper';
import Button from '@/Components/UI/Button';
import {
  BuildingOfficeIcon,
  CalendarIcon,
  UserGroupIcon,
  StarIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { useEffect } from 'react';

const Main = () => {
  const navigate = useNavigate();
  const { state } = useApp();

  const handleFindHospitals = () => {
    navigate('/hospitals');
  };

  const handleBookAppointment = () => {
    navigate('/hospitals');
  };

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
          // Không xóa hash để giữ trạng thái url
        }, 400);
      }
    };

    // Gọi khi mount
    scrollToHash();

    // Lắng nghe sự kiện hashchange
    window.addEventListener('hashchange', scrollToHash);

    // Cleanup
    return () => window.removeEventListener('hashchange', scrollToHash);
  }, []);

  useEffect(() => {
    const sectionId = localStorage.getItem('homeScrollTo');
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.replaceState(null, '', '/');
        }
        localStorage.removeItem('homeScrollTo');
      }, 200);
    }
  }, []);

  return (
    <div className="m-auto max-w-[1250px] px-5 md:px-16">
      <Home />

      {/* Platform Features Section */}
      <SectionWrapper id="features">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Nền tảng kết nối bệnh viện hàng đầu
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kết nối bạn với mạng lưới bệnh viện tư nhân chất lượng cao trên toàn quốc.
            Đặt lịch khám dễ dàng, nhanh chóng và tiện lợi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <BuildingOfficeIcon className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {state.hospitals.length}+ Bệnh viện
            </h3>
            <p className="text-gray-600">
              Mạng lưới bệnh viện tư nhân chất lượng cao trên toàn quốc
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <UserGroupIcon className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">500+ Bác sĩ</h3>
            <p className="text-gray-600">
              Đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm và tận tâm
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-lg shadow-lg">
            <CalendarIcon className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Đặt lịch 24/7</h3>
            <p className="text-gray-600">
              Đặt lịch khám bệnh mọi lúc, mọi nơi với giao diện thân thiện
            </p>
          </div>
        </div>

        <div className="text-center">
          <Button onClick={handleFindHospitals} className="mr-4">
            Tìm bệnh viện
          </Button>
          <button
            onClick={handleBookAppointment}
            className="px-6 py-3 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
          >
            Đặt lịch ngay
          </button>
        </div>
      </SectionWrapper>

      {/* Featured Hospitals */}
      <SectionWrapper id="featured-hospitals">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-4">Bệnh viện nổi bật</h2>
          <p className="text-lg text-gray-600">
            Những bệnh viện được đánh giá cao nhất trong mạng lưới của chúng tôi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {state.hospitals.slice(0, 3).map(hospital => (
            <div key={hospital.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{hospital.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <MapPinIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{hospital.district}, {hospital.city}</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{hospital.rating}</span>
                  <span className="text-sm text-gray-500">({hospital.totalReviews} đánh giá)</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {hospital.specialties.slice(0, 2).map(specialty => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                  {hospital.specialties.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{hospital.specialties.length - 2}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => navigate(`/hospital/${hospital.id}`)}
                  className="w-full px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button onClick={handleFindHospitals}>
            Xem tất cả bệnh viện
          </Button>
        </div>
      </SectionWrapper>

      <Services />
      <Doctors />
      <Reviews />
    </div>
  );
};

export default Main;
