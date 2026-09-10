import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-100">
      {/* Top Govt Emblem Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-xs font-black text-slate-200 tracking-wider">
            GOVERNMENT OF INDIA &bull; NORTH EASTERN COUNCIL (NEC)
          </span>
        </div>
        <span className="text-xs text-slate-400 font-semibold hidden sm:inline">
          Official Emergency Logistics Portal
        </span>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/90 border-t border-slate-800 py-3 px-6 text-center text-xs text-slate-400 font-medium">
        Ministry of Development of North Eastern Region (MDoNER) &bull; Smart India Hackathon &bull; Restricted Government Portal
      </footer>
    </div>
  );
};
