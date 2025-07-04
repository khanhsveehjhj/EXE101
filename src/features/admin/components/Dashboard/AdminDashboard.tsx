import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  UsersIcon,
  BuildingOfficeIcon,
  CogIcon,
  ChartBarIcon,
  BellIcon,
  LifebuoyIcon,
  CreditCardIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
// Fix imports by using the feature exports
import {
  UserManagement,
  ClinicManagement,
  ServiceManagement,
  Analytics,
  NotificationCenter,
  SupportCenter,
  PackageManagement,
  DashboardOverview
} from '@/features/admin';
import AdminLayout from '../Layout/AdminLayout';

type AdminSection =
  | 'overview'
  | 'users'
  | 'clinics'
  | 'services'
  | 'analytics'
  | 'notifications'
  | 'support'
  | 'packages';

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<AdminSection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle URL-based navigation
  useEffect(() => {
    const path = location.pathname;
    if (path === '/admin/analytics') {
      setActiveSection('analytics');
    } else if (path === '/admin/users') {
      setActiveSection('users');
    } else if (path === '/admin/clinics') {
      setActiveSection('clinics');
    } else if (path === '/admin/services') {
      setActiveSection('services');
    } else if (path === '/admin/notifications') {
      setActiveSection('notifications');
    } else if (path === '/admin/support') {
      setActiveSection('support');
    } else if (path === '/admin/packages') {
      setActiveSection('packages');
    } else {
      setActiveSection('overview');
    }
  }, [location.pathname]);

  // Handle section change and update URL
  const handleSectionChange = (section: AdminSection) => {
    setActiveSection(section);
    if (section === 'overview') {
      navigate('/admin');
    } else {
      navigate(`/admin/${section}`);
    }
  };

  // The "unknown word" warnings are for non-English words (Vietnamese)
  // These can be safely ignored as they're just UI labels
  const menuItems = [
    { id: 'overview', label: 'Tổng quan', icon: HomeIcon },
    { id: 'users', label: 'Quản lý người dùng', icon: UsersIcon },
    { id: 'clinics', label: 'Quản lý phòng khám', icon: BuildingOfficeIcon },
    { id: 'services', label: 'Quản lý dịch vụ', icon: CogIcon },
    { id: 'analytics', label: 'Thống kê & Báo cáo', icon: ChartBarIcon },
    { id: 'notifications', label: 'Thông báo tự động', icon: BellIcon },
    { id: 'support', label: 'Hỗ trợ & SOP', icon: LifebuoyIcon },
    { id: 'packages', label: 'Gói dịch vụ', icon: CreditCardIcon },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'clinics':
        return <ClinicManagement />;
      case 'services':
        return <ServiceManagement />;
      case 'analytics':
        return <Analytics />;
      case 'notifications':
        return <NotificationCenter />;
      case 'support':
        return <SupportCenter />;
      case 'packages':
        return <PackageManagement />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <AdminLayout>
      <div className="flex min-h-full">
        {/* Sidebar for desktop */}
        <div className="hidden md:block w-64 bg-white shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
            <p className="text-sm text-gray-600">MEDVIET Platform</p>
          </div>
          <nav className="mt-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id as AdminSection)}
                  className={`w-full flex items-center px-6 py-3 text-left transition-colors ${activeSection === item.id
                    ? 'bg-primary text-white border-r-4 border-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
        {/* Hamburger for mobile */}
        <button className="md:hidden fixed top-20 left-4 z-50 bg-white rounded-full p-2 shadow-lg border border-gray-200" onClick={() => setSidebarOpen(true)}>
          <Bars3Icon className="w-7 h-7 text-primary" />
        </button>
        {/* Sidebar overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="w-64 bg-white shadow-lg h-full flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <span className="text-xl font-bold text-primary">Admin Panel</span>
                <button onClick={() => setSidebarOpen(false)}>
                  <XMarkIcon className="w-7 h-7 text-gray-500" />
                </button>
              </div>
              <nav className="mt-4 flex-1 flex flex-col gap-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { handleSectionChange(item.id as AdminSection); setSidebarOpen(false); }}
                      className={`w-full flex items-center px-6 py-4 text-lg text-left transition-colors rounded-lg mb-1 ${activeSection === item.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                      <Icon className="w-6 h-6 mr-3" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="flex-1 bg-black/30" onClick={() => setSidebarOpen(false)} />
          </div>
        )}
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
