// src/main.jsx
import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import PetListPage from './pages/PetListPage';
import PetDetailPage from './pages/PetDetailPage';
import ShelterListPage from './pages/ShelterListPage';
import ShelterDetailPage from './pages/ShelterDetailPage';
import AboutPage from './pages/AboutPage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import './index.css'
import PWABadge from './PWABadge';

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [selectedShelterId, setSelectedShelterId] = useState(null);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar near the top for better navigation access.
      if (currentScrollY <= 20) {
        setIsNavbarVisible(true);
      } else {
        setIsNavbarVisible(currentScrollY < lastScrollY.current);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigation = (page, id = null) => {
    setCurrentPage(page);
    setIsNavbarVisible(true);
    if (page === 'petDetail') {
      setSelectedPetId(id);
    } else if (page === 'shelterDetail') {
      setSelectedShelterId(id);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'pets':
        return <PetListPage onNavigate={handleNavigation} />;
      case 'petDetail':
        return <PetDetailPage petId={selectedPetId} onNavigate={handleNavigation} />;
      case 'shelters':
        return <ShelterListPage onNavigate={handleNavigation} />;
      case 'shelterDetail':
        return <ShelterDetailPage shelterId={selectedShelterId} onNavigate={handleNavigation} />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navbar */}
      <DesktopNavbar
        currentPage={currentPage}
        onNavigate={handleNavigation}
        isVisible={isNavbarVisible}
      />
      
      {/* Main Content */}
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>
      
      {/* Mobile Navbar */}
      <MobileNavbar
        currentPage={currentPage}
        onNavigate={handleNavigation}
        isVisible={isNavbarVisible}
      />

      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
)

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}