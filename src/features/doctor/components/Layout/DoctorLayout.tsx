import { ReactNode, useEffect } from 'react';
import DoctorHeader from './DoctorHeader';
import DoctorFooter from './DoctorFooter';

interface DoctorLayoutProps {
    children: ReactNode;
}

const DoctorLayout = ({ children }: DoctorLayoutProps) => {
    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;

            if (!target.closest('.dropdown-container')) {
                // Close any open dropdowns
                const dropdowns = document.querySelectorAll('[data-dropdown]');
                dropdowns.forEach(dropdown => {
                    dropdown.classList.add('hidden');
                });
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <DoctorHeader />

            {/* Main Content Area */}
            <main className="flex-1 pt-20">
                {children}
            </main>

            <DoctorFooter />
        </div>
    );
};

export default DoctorLayout;