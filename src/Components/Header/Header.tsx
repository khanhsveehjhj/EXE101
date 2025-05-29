import Logo from '@/assets/Images/favicon_transparent.png';
import NavBar from './NavBar';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SelectedPage } from '@/Components/Shared/Types';
import { useApp } from '@/Context/AppContext';
import LoginModal from '../Auth/LoginModal';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useApp();
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(
    SelectedPage.Home
  );
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const flexBetween = 'flex items-center justify-between';
  const lastHashRef = useRef('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateSelectedPage = () => {
      if (location.pathname !== '/') {
        // Đang ở route khác, dùng pathname như cũ
        if (location.pathname === '/') {
          setSelectedPage(SelectedPage.Home);
        } else if (location.pathname === '/hospitals') {
          setSelectedPage(SelectedPage.Hospitals);
        } else if (location.pathname === '/booking') {
          setSelectedPage(SelectedPage.Booking);
        } else if (location.pathname === '/dashboard') {
          setSelectedPage(SelectedPage.Hospitals);
        } else if (location.pathname.startsWith('/hospital/')) {
          setSelectedPage(SelectedPage.Hospitals);
        } else {
          setSelectedPage(SelectedPage.Home);
        }
        lastHashRef.current = '';
      } else {
        // Đang ở trang chủ, dùng hash nếu có
        const hash = window.location.hash.replace('#', '') || localStorage.getItem('lastSection') || '';
        if (hash) {
          lastHashRef.current = hash;
        }
        switch (hash || lastHashRef.current) {
          case 'services':
            setSelectedPage(SelectedPage.Services);
            break;
          case 'doctors':
            setSelectedPage(SelectedPage.Doctors);
            break;
          case 'reviews':
            setSelectedPage(SelectedPage.Reviews);
            break;
          default:
            setSelectedPage(SelectedPage.Home);
        }
      }
    };

    updateSelectedPage();
    window.addEventListener('hashchange', updateSelectedPage);
    return () => window.removeEventListener('hashchange', updateSelectedPage);
  }, [location.pathname]);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  useEffect(() => {
    localStorage.removeItem('lastSection');
  }, []);

  return (
    <>
      <div
        className={`${flexBetween} ${
          isTopOfPage ? '' : 'bg-ocean-light'
        } transition fixed top-0 z-30 w-full p-5 md:px-16`}
      >
        <img
          className="w-14 sm:w-28 cursor-pointer"
          src={Logo}
          alt="Logo"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.replaceState(null, '', '/');
            } else {
              localStorage.setItem('homeScrollTo', 'home');
              navigate('/');
            }
          }}
        />
        <NavBar
          flexBetween={flexBetween}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
          onLoginClick={handleOpenLoginModal}
          currentUser={state.auth.user}
        />
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};

export default Header;
