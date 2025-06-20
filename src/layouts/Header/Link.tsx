import { SelectedPage } from '@/types';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '@/store/AppContext';

type Props = {
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  isTopOfPage: boolean;
};

const Link = ({ page, selectedPage, setSelectedPage, isTopOfPage }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  useApp();

  const pageMapping: { [key: string]: { page: SelectedPage; route?: string } } = {
    'Trang chủ': { page: SelectedPage.Home, route: '/' },
    'Bệnh viện': { page: SelectedPage.Hospitals, route: '/hospitals' },
    'Dịch vụ': { page: SelectedPage.Services },
    'Đặt lịch': { page: SelectedPage.Booking },
    'Bác sĩ': { page: SelectedPage.Doctors },
    'Đánh giá': { page: SelectedPage.Reviews },
  };

  const mappedData = pageMapping[page];
  const pageId = mappedData?.page || page.toLowerCase().replace(/\s+/g, '') as SelectedPage;

  const handleLinkClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // Trang chủ
    if (page === 'Trang chủ') {
      setSelectedPage(SelectedPage.Home);
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
      return;
    }

    // Dịch vụ, Bác sĩ, Đánh giá
    if (['Dịch vụ', 'Bác sĩ', 'Đánh giá'].includes(page)) {
      const sectionId = pageId;
      const selected = mappedData?.page;

      if (location.pathname === '/') {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.replaceState(null, '', `/#${sectionId}`);
          setSelectedPage(selected);
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.replaceState(null, '', `/#${sectionId}`);
            setSelectedPage(selected);
          }
        }, 100);
      }
      return;
    }

    // Bệnh viện
    if (page === 'Bệnh viện') {
      setSelectedPage(SelectedPage.Hospitals);
      if (location.pathname === '/') {
        const el = document.getElementById('featured-hospitals');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.replaceState(null, '', '/#featured-hospitals');
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById('featured-hospitals');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
            window.history.replaceState(null, '', '/#featured-hospitals');
          }
        }, 300);
      }
      return;
    }

    // Route-based page khác
    if (mappedData?.route) {
      setSelectedPage(mappedData.page);
      navigate(mappedData.route);
      return;
    }
  };

  const linkColors = isTopOfPage
    ? {
      active: 'text-primary border-b-2 mt-0.5 border-primary',
      inactive: 'text-primary',
      hover: 'hover:text-ocean-dark'
    }
    : {
      active: 'text-primary border-b-2 mt-0.5 border-primary',
      inactive: 'text-ocean-dark',
      hover: 'hover:text-primary'
    };

  return (
    <button
      className={`${String(selectedPage) === String(pageId)
        ? linkColors.active
        : linkColors.inactive
        } transition font-bold text-lg duration-500 ${linkColors.hover}`}
      onClick={handleLinkClick}
    >
      {page}
    </button>
  );
};

export default Link;
