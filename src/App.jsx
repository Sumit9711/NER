import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { LanguageProvider } from './hooks/useLanguage';
import { MainLayout } from './layouts/MainLayout';
import { AuthLayout } from './layouts/AuthLayout';

// Pages
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { LiveMap } from './pages/LiveMap';
import { Vehicles } from './pages/Vehicles';
import { VehicleDetails } from './pages/VehicleDetails';
import { Incidents } from './pages/Incidents';
import { IncidentDetails } from './pages/IncidentDetails';
import { RiskIntelligence } from './pages/RiskIntelligence';
import { RouteRecommendations } from './pages/RouteRecommendations';
import { ETADelays } from './pages/ETADelays';
import { Alerts } from './pages/Alerts';
import { Deliveries } from './pages/Deliveries';
import { FieldReports } from './pages/FieldReports';
import { Analytics } from './pages/Analytics';
import { UsersRoles } from './pages/UsersRoles';
import { AuditLogs } from './pages/AuditLogs';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Authentication Portal */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Operational Command Center Layout */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/live-map" element={<LiveMap />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/vehicles/:id" element={<VehicleDetails />} />
              <Route path="/incidents" element={<Incidents />} />
              <Route path="/incidents/:id" element={<IncidentDetails />} />
              <Route path="/risk-intelligence" element={<RiskIntelligence />} />
              <Route path="/route-recommendations" element={<RouteRecommendations />} />
              <Route path="/eta-delays" element={<ETADelays />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/deliveries" element={<Deliveries />} />
              <Route path="/field-reports" element={<FieldReports />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/users-roles" element={<UsersRoles />} />
              <Route path="/audit-logs" element={<AuditLogs />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LanguageProvider>
  );
}
