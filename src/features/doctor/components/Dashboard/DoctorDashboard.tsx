import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    CalendarDaysIcon,
    UserGroupIcon,
    DocumentTextIcon,
    ChartBarIcon,
    HomeIcon,
    UsersIcon,
    Bars3Icon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import DoctorLayout from '../Layout/DoctorLayout';
import DashboardOverview from './DashboardOverview';
import AppointmentManagement from '../Appointments/AppointmentManagement';
import PatientManagement from '../Patients/PatientManagement';
import MedicalRecords from '../Records/MedicalRecords';
import Analytics from '../Analytics/Analytics';
import ReceptionistManagement from '../Staff/ReceptionistManagement';

type DoctorSection =
    | 'overview'
    | 'appointments'
    | 'patients'
    | 'records'
    | 'analytics'
    | 'staff';

const DoctorDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<DoctorSection>('overview');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Handle URL-based navigation
    useEffect(() => {
        const path = location.pathname;
        if (path === '/doctor/appointments') {
            setActiveSection('appointments');
        } else if (path === '/doctor/patients') {
            setActiveSection('patients');
        } else if (path === '/doctor/records') {
            setActiveSection('records');
        } else if (path === '/doctor/staff') {
            setActiveSection('staff');
        } else if (path === '/doctor/analytics') {
            setActiveSection('analytics');
        } else {
            setActiveSection('overview');
        }
    }, [location.pathname]);

    // Handle section change and update URL
    const handleSectionChange = (section: DoctorSection) => {
        setActiveSection(section);
        if (section === 'overview') {
            navigate('/doctor');
        } else {
            navigate(`/doctor/${section}`);
        }
    };

    const menuItems = [
        { id: 'overview', label: 'Tổng quan', icon: HomeIcon },
        { id: 'appointments', label: 'Lịch hẹn', icon: CalendarDaysIcon },
        { id: 'patients', label: 'Bệnh nhân', icon: UserGroupIcon },
        { id: 'records', label: 'Hồ sơ bệnh án', icon: DocumentTextIcon },
        { id: 'staff', label: 'Quản lý lễ tân', icon: UsersIcon },
        { id: 'analytics', label: 'Thống kê', icon: ChartBarIcon },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return <DashboardOverview />;
            case 'appointments':
                return <AppointmentManagement />;
            case 'patients':
                return <PatientManagement />;
            case 'records':
                return <MedicalRecords />;
            case 'staff':
                return <ReceptionistManagement doctorId="doctor-1" />;
            case 'analytics':
                return <Analytics />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <DoctorLayout>
            <div className="flex min-h-full">
                {/* Sidebar for desktop */}
                <div className="hidden md:block w-64 bg-white shadow-lg">
                    <div className="p-4 border-b border-gray-200">
                        <h1 className="text-base font-bold text-primary">Bác sĩ</h1>
                        <p className="text-xs text-gray-600">MEDVIET Platform</p>
                    </div>
                    <nav className="mt-3">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleSectionChange(item.id as DoctorSection)}
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
                                <span className="text-base font-bold text-primary">Bác sĩ</span>
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
                                            onClick={() => { handleSectionChange(item.id as DoctorSection); setSidebarOpen(false); }}
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
                    <div className="p-4 sm:p-8">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </DoctorLayout>
    );
};

export default DoctorDashboard;