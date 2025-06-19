import Logo from '@/assets/Images/favicon_transparent.png';
import NavBar from './NavBar';
import { useState, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SelectedPage } from '@/types';
import { useApp } from '@/store/AppContext';
import { LoginModal } from '@/features/user';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useApp();
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const flexBetween = 'flex items-center justify-between';
  const lastHashRef = useRef('');

  // Scroll detection
  useLayoutEffect(() => {
    const handleScroll = () => {
      setIsTopOfPage(window.scrollY === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect route-based pages (not homepage)
  useLayoutEffect(() => {
    if (location.pathname !== '/') {
      switch (true) {
        case location.pathname === '/':
          setSelectedPage(SelectedPage.Home);
          break;
        case location.pathname.startsWith('/hospitals'):
        case location.pathname.startsWith('/hospital'):
          setSelectedPage(SelectedPage.Hospitals);
          break;
        case location.pathname === '/booking':
          setSelectedPage(SelectedPage.Booking);
          break;
        case location.pathname === '/dashboard':
          setSelectedPage(SelectedPage.Hospitals);
          break;
        default:
          setSelectedPage(SelectedPage.Home);
      }
      lastHashRef.current = '';
    }
  }, [location.pathname]);

  // Detect hash-based anchors when on homepage
  useLayoutEffect(() => {
    if (location.pathname === '/') {
      const rawHash = window.location.hash.replace('#', '');
      const hash = rawHash || localStorage.getItem('lastSection') || '';

      switch (hash) {
        case 'services':
          setSelectedPage(SelectedPage.Services);
          break;
        case 'doctors':
          setSelectedPage(SelectedPage.Doctors);
          break;
        case 'reviews':
          setSelectedPage(SelectedPage.Reviews);
          break;
        case 'featured-hospitals':
          setSelectedPage(SelectedPage.Hospitals);
          break;
        default:
          setSelectedPage(SelectedPage.Home);
      }
    }
  }, [location.pathname]);


  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // Cleanup last section
  useLayoutEffect(() => {
    localStorage.removeItem('lastSection');
  }, []);

  return (
    <>
      <div
        className={`${flexBetween} ${isTopOfPage ? '' : 'bg-ocean-light'
          } transition fixed top-0 z-30 w-full p-2 md:px-8`}
      >
        <img
          className="w-10 sm:w-16 cursor-pointer"
          src={Logo}
          alt="Logo"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.history.replaceState(null, '', '/');
            } else {
              localStorage.setItem('homeScrollTo', 'home');
              navigate('/', { state: { forceReload: Date.now() } });
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
