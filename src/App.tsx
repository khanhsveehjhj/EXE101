import { BrowserRouter as Router } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import Footer from './layouts/Footer/Footer';
import Header from './layouts/Header/Header';
import AppRoutes from './routes';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="text-ocean-dark app min-w-[280px] min-h-screen bg-background">
          <Header />
          <main className="pt-20 min-h-screen">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
