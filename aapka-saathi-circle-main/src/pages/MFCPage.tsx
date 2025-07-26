import React, { useState } from 'react';
import { MFCLogin } from '@/components/MFCLogin';
import { ManagerDashboard } from '@/components/ManagerDashboard';
import { DriverDashboard } from '@/components/DriverDashboard';

const MFCPage = () => {
  const [userRole, setUserRole] = useState<'manager' | 'driver' | null>(null);

  const handleLogin = (role: 'manager' | 'driver') => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  if (!userRole) {
    return <MFCLogin onLogin={handleLogin} />;
  }

  if (userRole === 'manager') {
    return <ManagerDashboard onLogout={handleLogout} />;
  }

  return <DriverDashboard onLogout={handleLogout} />;
};

export default MFCPage;