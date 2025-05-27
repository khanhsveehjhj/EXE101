import { SelectedPage } from '@/Components/Shared/Types';
import { useNavigate, useLocation } from 'react-router-dom';
import AnchorLink from 'react-anchor-link-smooth-scroll';

type Props = {
  page: string;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
  isTopOfPage: boolean;
};

const Link = ({ page, selectedPage, setSelectedPage, isTopOfPage }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleLinkClick = () => {
    setSelectedPage(pageId);

    // If it's a route-based page, navigate to it
    if (mappedData?.route) {
      navigate(mappedData.route);
    }
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
  if (mappedData?.route) {
    return (
      <button
        className={`${
          selectedPage === pageId
            ? linkColors.active
            : linkColors.inactive
        } transition font-bold text-lg duration-500 ${linkColors.hover}`}
        onClick={handleLinkClick}
      >
        {page}
      </button>
    );
  }

  // For anchor-based pages, use AnchorLink
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
