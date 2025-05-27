import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './Context/AppContext';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Main from './Components/Main/Main';
import HospitalList from './Components/Hospitals/HospitalList';
import HospitalDetail from './Components/Hospitals/HospitalDetail';
import BookingFlow from './Components/Booking/BookingFlow';
import UserDashboard from './Components/Dashboard/UserDashboard';


function App() {
  return (
    <AppProvider>
      <Router>
        <div className="text-ocean-dark app min-w-[280px] min-h-screen bg-background">
          <Header />
          <main className="pt-20 min-h-screen">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/hospitals" element={<HospitalList />} />
              <Route path="/hospital/:id" element={<HospitalDetail />} />
              <Route path="/booking" element={<BookingFlow />} />
              <Route path="/dashboard" element={<UserDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
