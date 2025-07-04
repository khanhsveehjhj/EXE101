import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/20/solid';
import { SelectedPage, User } from '@/types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/store/AppContext';

import useMediaQuery from '@/hooks/useMediaQuery';

import Links from './Links';
import Button from '@/components/UI/Button';
type Props = {
  flexBetween: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  onLoginClick: () => void;
  currentUser: User | null;
};

const NavBar = ({ flexBetween, selectedPage, setSelectedPage, onLoginClick, currentUser }: Props) => {
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const isAboveMediumScreens = useMediaQuery('(min-width: 900px)');
  const navigate = useNavigate();
  const { logout } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  console.log('NavBar selectedPage:', selectedPage);

  return (
    <nav>
      {isAboveMediumScreens && (
        <div className={`${flexBetween} lg:gap-28 gap-20`}>
          <div className={`${flexBetween} gap-16`}>
            <Links
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
          </div>
          {currentUser ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-ocean-dark hover:text-primary transition-colors"
              >
                <UserIcon className="w-5 h-5" />
                <span>{currentUser.name}</span>
              </button>
              <Button onClick={handleLogout}>Đăng xuất</Button>
            </div>
          ) : (
            <Button onClick={onLoginClick}>Đăng nhập</Button>
          )}
        </div>
      )}
      {!isAboveMediumScreens && (
        <button onClick={() => setIsMenuToggled((prev) => !prev)}>
          <Bars3Icon className="h-8 w-8" />
        </button>
      )}
      {/* MOBILE MENU MODAL */}
      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed right-0 top-0 z-40 w-[70vw] max-w-[270px] bg-ocean-light rounded-es-3xl rounded-ss-3xl shadow-2xl transition-transform duration-300 ease-in-out animate-slide-in flex flex-col max-h-fit py-2" style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'}}>
          {/* CLOSE ICON */}
          <div className="flex justify-end p-3 pr-4">
            <button onClick={() => setIsMenuToggled((prev) => !prev)} className="focus:outline-none">
              <XMarkIcon className="h-7 w-7 text-ocean-dark hover:text-primary transition-colors" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="flex flex-col items-start gap-4 px-5 pb-3 text-[1.05rem] font-medium w-full">
            <Links
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            {currentUser ? (
              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setIsMenuToggled(false);
                  }}
                  className="flex items-center gap-2 text-ocean-dark hover:text-primary transition-colors px-2 py-2 rounded-lg w-full text-base"
                >
                  <UserIcon className="w-5 h-5" />
                  <span>{currentUser.name}</span>
                </button>
                <Button onClick={handleLogout} className="w-full text-base py-2">Đăng xuất</Button>
              </div>
            ) : (
              <Button onClick={onLoginClick} className="w-full text-base py-2">Đăng nhập</Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
