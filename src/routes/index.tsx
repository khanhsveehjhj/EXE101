import { Routes, Route, useLocation } from 'react-router-dom';
import Main from '@/pages/Main/Main';
import HospitalList from '@/pages/Hospitals/HospitalList';
import HospitalDetail from '@/pages/Hospitals/HospitalDetail';
import BookingFlow from '@/features/user/components/Booking/BookingFlow';
import UserDashboard from '@/features/user/components/Dashboard/UserDashboard';
import { AdminDashboard } from '@/features/admin';
import { DoctorDashboard } from '@/features/doctor';
import { ReceptionistDashboard } from '@/features/receptionist';

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Main key={location.state?.forceRemount || location.key} />} />
      <Route path="/hospitals" element={<HospitalList />} />
      <Route path="/hospital/:id" element={<HospitalDetail />} />
      <Route path="/booking" element={<BookingFlow />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="/doctor" element={<DoctorDashboard />} />
      <Route path="/doctor/*" element={<DoctorDashboard />} />
      <Route path="/receptionist" element={<ReceptionistDashboard />} />
      <Route path="/receptionist/*" element={<ReceptionistDashboard />} />
    </Routes>
  );
};

export default AppRoutes;
