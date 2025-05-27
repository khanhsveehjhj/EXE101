import Logo from '@/assets/Images/favicon_transparent.png';
import NavBar from './NavBar';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <div
        className={`${flexBetween} ${
          isTopOfPage ? '' : 'bg-ocean-light'
        } transition fixed top-0 z-30 w-full p-5 md:px-16`}
      >
        <img
          className="w-10 sm:w-20 cursor-pointer"
          src={Logo}
          alt="Logo"
          onClick={() => navigate('/')}
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
