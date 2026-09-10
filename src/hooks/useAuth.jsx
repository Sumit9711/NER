import React, { createContext, useContext, useState } from 'react';
import { authService, DEMO_ROLES } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());

  const login = (roleId, customEmail) => {
    const session = authService.login({ roleId, customEmail });
    setUser(session);
    return session;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const switchRole = (roleId) => {
    const session = authService.login({ roleId });
    setUser(session);
    return session;
  };

  const canAccessRoute = (routePath) => {
    return authService.canAccess(user, routePath);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole, canAccessRoute, demoRoles: DEMO_ROLES }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
