import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    CalendarDaysIcon,
    UserGroupIcon,
    ClipboardDocumentListIcon,
    ChartBarIcon,
    HomeIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import ReceptionistLayout from '../Layout/ReceptionistLayout';
import DashboardOverview from './DashboardOverview';
import AppointmentBooking from '../Appointments/AppointmentBooking';
import PatientRegistration from '../Patients/PatientRegistration';
import CheckInOut from '../CheckIn/CheckInOut';
import Reports from '../Reports/Reports';

type ReceptionistSection =
    | 'overview'
    | 'appointments'
    | 'patients'
    | 'checkin'
    | 'reports';

const ReceptionistDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<ReceptionistSection>('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Handle URL-based navigation
    useEffect(() => {
        const path = location.pathname;
        if (path === '/receptionist/appointments') {
            setActiveSection('appointments');
        } else if (path === '/receptionist/patients') {
            setActiveSection('patients');
        } else if (path === '/receptionist/checkin') {
            setActiveSection('checkin');
        } else if (path === '/receptionist/reports') {
            setActiveSection('reports');
        } else {
            setActiveSection('overview');
        }
    }, [location.pathname]);

    // Handle section change and update URL
    const handleSectionChange = (section: ReceptionistSection) => {
        setActiveSection(section);
        if (section === 'overview') {
            navigate('/receptionist');
        } else {
            navigate(`/receptionist/${section}`);
        }
    };

    const menuItems = [
        { id: 'overview', label: 'Tổng quan', icon: HomeIcon },
        { id: 'appointments', label: 'Đặt lịch hẹn', icon: CalendarDaysIcon },
        { id: 'patients', label: 'Đăng ký bệnh nhân', icon: UserGroupIcon },
        { id: 'checkin', label: 'Check-in/out', icon: ClipboardDocumentListIcon },
        { id: 'reports', label: 'Báo cáo', icon: ChartBarIcon },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return <DashboardOverview />;
            case 'appointments':
                return <AppointmentBooking />;
            case 'patients':
                return <PatientRegistration />;
            case 'checkin':
                return <CheckInOut />;
            case 'reports':
                return <Reports />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <ReceptionistLayout>
            <div className="flex min-h-full">
                {/* Sidebar for desktop */}
                <div className="hidden md:block w-64 bg-white shadow-lg">
                    <div className="p-4 border-b border-gray-200">
                        <h1 className="text-base font-bold text-primary">Lễ tân</h1>
                        <p className="text-xs text-gray-600">MEDVIET Platform</p>
                    </div>
                    <nav className="mt-3">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleSectionChange(item.id as ReceptionistSection)}
                                    className={`w-full flex items-center px-3 py-2 text-left transition-colors text-sm gap-2 ${activeSection === item.id
                                        ? 'bg-primary text-white border-r-2 border-primary'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className="w-4 h-4 mr-1" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
                {/* Hamburger for mobile */}
                <button className="md:hidden fixed top-16 left-3 z-50 bg-white rounded-full p-1.5 shadow-lg border border-gray-200" onClick={() => setSidebarOpen(true)}>
                    <Bars3Icon className="w-6 h-6 text-primary" />
                </button>
                {/* Sidebar overlay for mobile */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-50 flex">
                        <div className="w-48 bg-white shadow-lg h-full flex flex-col">
                            <div className="flex items-center justify-between p-3 border-b border-gray-200">
                                <span className="text-base font-bold text-primary">Lễ tân</span>
                                <button onClick={() => setSidebarOpen(false)}>
                                    <XMarkIcon className="w-6 h-6 text-gray-500" />
                                </button>
                            </div>
                            <nav className="mt-2 flex-1 flex flex-col gap-1">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => { handleSectionChange(item.id as ReceptionistSection); setSidebarOpen(false); }}
                                            className={`w-full flex items-center px-3 py-2 text-sm text-left transition-colors rounded mb-1 gap-2 ${activeSection === item.id
                                                ? 'bg-primary text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4 mr-1" />
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
                    <div className="p-8">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </ReceptionistLayout>
    );
};

export default ReceptionistDashboard;