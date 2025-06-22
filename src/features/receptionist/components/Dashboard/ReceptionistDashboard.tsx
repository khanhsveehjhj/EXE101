import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    CalendarDaysIcon,
    UserGroupIcon,
    ClipboardDocumentListIcon,
    ChartBarIcon,
    HomeIcon
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
                {/* Sidebar */}
                <div className="w-64 bg-white shadow-lg">
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="text-xl font-bold text-primary">Lễ tân</h1>
                        <p className="text-sm text-gray-600">MEDVIET Platform</p>
                    </div>

                    <nav className="mt-6">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleSectionChange(item.id as ReceptionistSection)}
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