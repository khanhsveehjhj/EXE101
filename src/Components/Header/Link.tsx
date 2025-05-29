import { SelectedPage } from '@/Components/Shared/Types';
import { useNavigate, useLocation } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useApp } from '@/Context/AppContext';
import React from 'react';

type Props = {
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  isTopOfPage: boolean;
};

const Link = ({ page, selectedPage, setSelectedPage, isTopOfPage }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useApp();

  // Map Vietnamese navigation links to English page IDs and routes
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

  // Handler cho <button>
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setSelectedPage(pageId);

    // Trang chủ
    if (page === 'Trang chủ') {
      e.preventDefault();
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.replaceState(null, '', '/');
      } else {
        localStorage.setItem('homeScrollTo', 'home');
        navigate('/');
      }
      return;
    }

    // Bệnh viện
    if (page === 'Bệnh viện') {
      e.preventDefault();
      if (location.pathname === '/') {
        const el = document.getElementById('featured-hospitals');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        localStorage.setItem('homeScrollTo', 'featured-hospitals');
        navigate('/');
      }
      return;
    }

    // Dịch vụ, Bác sĩ, Đánh giá
    if (page === 'Dịch vụ' || page === 'Bác sĩ' || page === 'Đánh giá') {
      e.preventDefault();
      const sectionId = pageId;
      // Luôn lưu vào localStorage và chuyển về trang chủ
      localStorage.setItem('homeScrollTo', sectionId);
      navigate('/');
      return;
    }

    // Các route khác
    if (mappedData?.route) {
      navigate(mappedData.route);
      return;
    }

    // Nếu KHÔNG ở trang chủ, chuyển về trang chủ rồi scroll
    if (location.pathname !== '/') {
      e.preventDefault();
      localStorage.setItem('homeScrollTo', pageId);
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(pageId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.replaceState(null, '', '/');
        }
      }, 100);
    }
  };

  // Handler cho <AnchorLink>
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setSelectedPage(pageId);
    // ... logic cũ nếu cần ...
  };

  // Dynamic colors based on scroll position
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

  // For route-based pages, use button instead of AnchorLink
  if (
    mappedData?.route ||
    ["Dịch vụ", "Bác sĩ", "Đánh giá"].includes(page)
  ) {
    return (
      <button
        className={`${
          selectedPage === pageId
            ? linkColors.active
            : linkColors.inactive
        } transition font-bold text-lg duration-500 ${linkColors.hover}`}
        onClick={handleButtonClick}
      >
        {page}
      </button>
    );
  }

  // For anchor-based pages, use AnchorLink (chỉ cho các mục khác)
  return (
    <AnchorLink
      className={`${
        selectedPage === pageId
          ? linkColors.active
          : linkColors.inactive
      } transition font-bold text-lg duration-500 ${linkColors.hover}`}
      href={`#${pageId}`}
      onClick={handleLinkClick}
    >
      {page}
    </AnchorLink>
  );
};

export default Link;
