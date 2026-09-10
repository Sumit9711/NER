import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Sidebar } from '../components/common/Sidebar';
import { AlertTicker } from '../components/common/AlertTicker';

export const MainLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedSector, setSelectedSector] = useState('ALL');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Urgent Emergency Alert Bar */}
      <AlertTicker />

      {/* Main Command Header */}
      <Header
        onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        selectedSector={selectedSector}
        onSelectSector={setSelectedSector}
      />

      {/* Body Area with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isOpen={mobileSidebarOpen}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Dynamic Page Content */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto bg-slate-900 p-4 sm:p-6 lg:p-8 focus:outline-none"
          tabIndex={-1}
        >
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet context={{ selectedSector }} />
          </div>
        </main>
      </div>
    </div>
  );
};
