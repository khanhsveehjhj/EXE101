import ComprehensiveReports from '@/features/shared/components/Analytics/ComprehensiveReports';
import { useEffect } from 'react';

const Reports = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return <ComprehensiveReports />;
};

export default Reports;