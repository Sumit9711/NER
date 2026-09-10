import React, { useState } from 'react';
import { AlertTriangle, ChevronRight, X, Radio } from 'lucide-react';
import { RECENT_EMERGENCY_ALERTS } from '../../data/mockDashboardData';

export const AlertTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !RECENT_EMERGENCY_ALERTS.length) return null;

  const currentAlert = RECENT_EMERGENCY_ALERTS[currentIndex];

  const nextAlert = () => {
    setCurrentIndex((prev) => (prev + 1) % RECENT_EMERGENCY_ALERTS.length);
  };

  return (
    <div
      role="region"
      aria-label="Active Disaster and Chokepoint Alerts"
      className="bg-red-950 border-b-2 border-red-600 px-4 py-2.5 text-white flex items-center justify-between gap-4 shadow-inner"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="flex items-center gap-2 bg-red-600 px-2.5 py-1 rounded text-xs font-black tracking-wider uppercase shrink-0 text-white animate-pulse">
          <Radio className="w-4 h-4" />
          <span>NER URGENT ALERT</span>
        </div>

        <div className="flex items-center gap-2 text-sm font-semibold truncate">
          <span className="bg-red-900/80 border border-red-700 px-2 py-0.5 rounded text-xs text-red-200 shrink-0">
            {currentAlert.state} - {currentAlert.corridor}
          </span>
          <span className="text-red-100 font-bold">
            {currentAlert.title}:
          </span>
          <span className="text-slate-200 hidden md:inline truncate">
            {currentAlert.description}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={nextAlert}
          className="flex items-center gap-1 text-xs font-bold text-red-200 hover:text-white bg-red-900/60 hover:bg-red-800 border border-red-700 px-2.5 py-1.5 rounded transition-colors"
          title="Cycle to next active alert"
        >
          <span>Next Alert ({currentIndex + 1}/{RECENT_EMERGENCY_ALERTS.length})</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => setDismissed(true)}
          className="p-1 rounded text-red-300 hover:text-white hover:bg-red-800 transition-colors"
          aria-label="Dismiss alert ticker banner"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
