import { ReactNode, useEffect } from 'react';
import ReceptionistHeader from './ReceptionistHeader';
import ReceptionistFooter from './ReceptionistFooter';

interface ReceptionistLayoutProps {
    children: ReactNode;
}

const ReceptionistLayout = ({ children }: ReceptionistLayoutProps) => {
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
            <ReceptionistHeader />

            {/* Main Content Area */}
            <main className="flex-1 pt-20">
                {children}
            </main>

            <ReceptionistFooter />
        </div>
    );
};

export default ReceptionistLayout;
