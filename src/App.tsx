import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import Footer from './layouts/Footer/Footer';
import Header from './layouts/Header/Header';
import AppRoutes from './routes';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isDoctorRoute = location.pathname.startsWith('/doctor');
  const isReceptionistRoute = location.pathname.startsWith('/receptionist');

  // For role-based dashboards, don't show the main header/footer
  if (isAdminRoute || isDoctorRoute || isReceptionistRoute) {
    return (
      <div className="text-ocean-dark app min-w-[280px] min-h-screen bg-background">
        <AppRoutes />
      </div>
    );
  }

  return (
    <div className="text-ocean-dark app min-w-[280px] min-h-screen bg-background">
      <Header />
      <main className="pt-20 min-h-screen">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
