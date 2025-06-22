import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    CalendarDaysIcon,
    UserGroupIcon,
    DocumentTextIcon,
    ChartBarIcon,
    HomeIcon
} from '@heroicons/react/24/outline';
import DoctorLayout from '../Layout/DoctorLayout';
import DashboardOverview from './DashboardOverview';
import AppointmentManagement from '../Appointments/AppointmentManagement';
import PatientManagement from '../Patients/PatientManagement';
import MedicalRecords from '../Records/MedicalRecords';
import Analytics from '../Analytics/Analytics';

type DoctorSection =
    | 'overview'
    | 'appointments'
    | 'patients'
    | 'records'
    | 'analytics';

const DoctorDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState<DoctorSection>('overview');

    // Handle URL-based navigation
    useEffect(() => {
        const path = location.pathname;
        if (path === '/doctor/appointments') {
            setActiveSection('appointments');
        } else if (path === '/doctor/patients') {
            setActiveSection('patients');
        } else if (path === '/doctor/records') {
            setActiveSection('records');
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
            case 'analytics':
                return <Analytics />;
            default:
                return <DashboardOverview />;
        }
    };

    return (
        <DoctorLayout>
            <div className="flex min-h-full">
                {/* Sidebar */}
                <div className="w-64 bg-white shadow-lg">
                    <div className="p-6 border-b border-gray-200">
                        <h1 className="text-xl font-bold text-primary">Bác sĩ</h1>
                        <p className="text-sm text-gray-600">MEDVIET Platform</p>
                    </div>

                    <nav className="mt-6">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleSectionChange(item.id as DoctorSection)}
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
        </DoctorLayout>
    );
};

export default DoctorDashboard;