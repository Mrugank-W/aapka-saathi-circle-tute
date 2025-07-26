import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingPage } from '@/components/LandingPage';
import { VendorLogin } from '@/components/VendorLogin';
import { VendorDashboard } from '@/components/VendorDashboard';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'vendor'>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleAppSelection = (app: 'vendor' | 'mfc') => {
    if (app === 'vendor') {
      setCurrentView('vendor');
    } else {
      navigate('/mfc');
    }
  };

  if (currentView === 'landing') {
    return <LandingPage onSelectApp={handleAppSelection} />;
  }

  if (currentView === 'vendor') {
    if (!isLoggedIn) {
      return <VendorLogin onLogin={() => setIsLoggedIn(true)} />;
    }
    return <VendorDashboard onLogout={() => {
      setIsLoggedIn(false);
      setCurrentView('landing');
    }} />;
  }

  return null;
};

export default Index;
