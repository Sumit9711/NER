import React from 'react';
import { Truck, AlertCircle, CheckCircle2, Clock, ShieldAlert } from 'lucide-react';
import { ACTIVE_CONVOYS } from '../../data/mockDashboardData';
import { StatusBadge } from '../common/StatusBadge';

export const ConvoyTrackerMini = () => {
  return (
    <div className="bg-slate-800/90 border-2 border-slate-700 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-blue-400" />
          <h2 className="text-base font-black text-white uppercase tracking-wider">
            Critical Mission Convoy Telemetry
          </h2>
        </div>
        <span className="text-xs font-bold bg-blue-950 text-blue-300 border border-blue-700 px-2.5 py-1 rounded">
          {ACTIVE_CONVOYS.length} High-Priority In-Flight
        </span>
      </div>

      <div className="divide-y divide-slate-700/60">
        {ACTIVE_CONVOYS.map((convoy) => (
          <div key={convoy.id} className="p-4 hover:bg-slate-750 transition-colors">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-black text-blue-300 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded">
                    {convoy.id}
                  </span>
                  <span className="font-bold text-white text-sm">
                    {convoy.cargo} ({convoy.weight})
                  </span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    convoy.priority === 'EMERGENCY' || convoy.priority === 'CRITICAL'
                      ? 'bg-red-900 text-red-100 border border-red-500'
                      : 'bg-slate-700 text-slate-200'
                  }`}>
                    {convoy.priority} PRIORITY
                  </span>
                </div>

                <div className="mt-2 text-xs text-slate-300 flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-white">{convoy.origin}</span>
                  <span className="text-slate-500">&rarr;</span>
                  <span className="font-semibold text-white">{convoy.destination}</span>
                  <span className="text-slate-500">&bull;</span>
                  <span className="text-slate-300">Escort: <strong className="text-slate-200">{convoy.driver}</strong></span>
                  <span className="text-slate-500">&bull;</span>
                  <span className="text-slate-300">Corridor: <strong className="text-blue-300">{convoy.corridor}</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-bold uppercase">Estimated Arrival</p>
                  <p className="text-sm font-black text-white flex items-center justify-end gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {convoy.eta}
                  </p>
                </div>
                <StatusBadge status={convoy.status} size="normal" />
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Location: {convoy.currentLocation}</span>
                <span>{convoy.progressPct}% Complete</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    convoy.status === 'DELAYED'
                      ? 'bg-amber-500'
                      : convoy.status === 'REROUTING'
                      ? 'bg-purple-500'
                      : 'bg-blue-500'
                  }`}
                  style={{ width: `${convoy.progressPct}%` }}
                />
              </div>
            </div>

            {/* Alert note if any */}
            {convoy.alert && (
              <div className="mt-2.5 flex items-center gap-2 text-xs font-medium text-amber-200 bg-amber-950/60 border border-amber-800/80 px-2.5 py-1.5 rounded">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{convoy.alert}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
