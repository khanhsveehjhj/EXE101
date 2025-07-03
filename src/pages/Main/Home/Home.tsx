import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '@/store/AppContext';
import Button from '@/components/UI/Button';
import hero from '@/assets/Images/hero.png';
import DescNums from './DescNums';
import SectionWrapper from '../SectionWrapper';
import { useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useApp();

  const handleBookingClick = () => {
    if (state.auth.isAuthenticated) {
      navigate('/hospitals');
    } else {
      navigate('/hospitals'); // Will show login modal when trying to book
    }
  };

  useEffect(() => {
    if (location.state && location.state.forceReload) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.state]);


  return (
    <SectionWrapper id="home">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 text-center md:text-left">
        <div className="tracking-wider md:tracking-normal max-w-xs lg:max-w-xl">
          <h1 className="lg:text-7xl text-4xl font-bold">
            Nền tảng kết nối phòng khám hàng đầu
          </h1>
          <p className="text-lg md:text-base lg:text-xl my-10">
            Kết nối bạn với mạng lưới phòng khám tư nhân chất lượng cao.
            Đặt lịch khám dễ dàng, nhanh chóng và tiện lợi.
          </p>
          <Button onClick={handleBookingClick}>Tìm phòng khám và đặt lịch</Button>
        </div>
        <div className="max-w-xs md:max-w-none">
          <img src={hero} alt="hero" />
        </div>
      </div>
      <DescNums />
    </SectionWrapper>
  );
};

export default Home;
