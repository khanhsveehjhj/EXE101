import { useNavigate } from 'react-router-dom';
import { useApp } from '@/Context/AppContext';
import Button from '@/Components/UI/Button';
import hero from '@/assets/images/hero.png';
import DescNums from './DescNums';
import SectionWrapper from '../SectionWrapper';

const Home = () => {
  const navigate = useNavigate();
  const { state } = useApp();

  const handleBookingClick = () => {
    if (state.auth.isAuthenticated) {
      navigate('/hospitals');
    } else {
      navigate('/hospitals'); // Will show login modal when trying to book
    }
  };

  return (
    <SectionWrapper id="home">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 text-center md:text-left">
        <div className="tracking-wider md:tracking-normal max-w-xs lg:max-w-xl">
          <h1 className="lg:text-7xl text-4xl font-bold">
            Nền tảng kết nối bệnh viện hàng đầu
          </h1>
          <p className="text-lg md:text-base lg:text-xl my-10">
            Kết nối bạn với mạng lưới bệnh viện tư nhân chất lượng cao.
            Đặt lịch khám dễ dàng, nhanh chóng và tiện lợi.
          </p>
          <Button onClick={handleBookingClick}>Tìm bệnh viện và đặt lịch</Button>
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
