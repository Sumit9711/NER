import React from 'react';
import { BellRing, ShieldAlert, Radio } from 'lucide-react';
import { AlertCard } from '../common/AlertCard';

export const CriticalAlertsSection = ({ alerts, onAction }) => {
  return (
    <div className="bg-slate-800/90 border-2 border-slate-700 rounded-xl p-5 shadow-lg space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-red-950 border border-red-600 text-red-400">
            <BellRing className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
              Critical Alerts Requiring Attention
            </h2>
            <p className="text-xs text-slate-300 font-medium">
              Immediate hazard notifications impacting life-safety and essential logistics
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-md bg-red-950 border border-red-600 text-red-200 text-xs font-black uppercase tracking-wider">
          {alerts.length} ACTIVE DIRECTIVES
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {alerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} onAction={onAction} />
        ))}
      </div>
    </div>
  );
};
