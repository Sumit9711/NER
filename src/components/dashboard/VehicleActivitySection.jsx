import React from 'react';
import { Truck, Navigation, Clock, ShieldAlert, Activity, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const VehicleActivitySection = ({ vehicles }) => {
  return (
    <div className="bg-slate-800/90 border-2 border-slate-700 rounded-xl shadow-lg overflow-hidden space-y-3">
      <div className="p-4 sm:p-5 bg-slate-850 border-b-2 border-slate-700 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-950 border border-blue-600 text-blue-400">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
              Live Vehicle & Convoy Activity
            </h2>
            <p className="text-xs text-slate-300 font-medium">
              Real-time telemetry for priority relief, medical, food & fuel convoys
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-md bg-blue-950 border border-blue-700 text-blue-200 text-xs font-black uppercase">
          5 Monitored High-Priority Convoys
        </span>
      </div>

      <div className="p-4 space-y-3">
        {vehicles.map((v) => {
          const isMoving = v.status === 'MOVING';
          return (
            <div
              key={v.id}
              className="p-4 bg-slate-900/90 border-2 border-slate-700/80 rounded-xl hover:border-slate-500 transition-all space-y-2.5"
            >
              {/* Header row */}
              <div className="flex items-start justify-between flex-wrap gap-2">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-mono text-xs font-black bg-blue-950 border border-blue-600 text-blue-200 px-2.5 py-1 rounded">
                      {v.id}
                    </span>
                    <span className="font-black text-white text-sm sm:text-base">
                      {v.name}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                      isMoving ? 'bg-emerald-950 text-emerald-300 border border-emerald-600' : 'bg-amber-950 text-amber-300 border border-amber-600'
                    }`}>
                      {isMoving ? `MOVING (${v.speed})` : 'STATIONARY (HOLDING)'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-bold mt-1">
                    Cargo: <strong className="text-slate-100">{v.cargo}</strong>
                  </p>
                </div>

                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-xs text-slate-400 font-bold uppercase">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Est. Arrival</span>
                  </div>
                  <p className="text-sm font-black text-white">{v.eta}</p>
                  <p className="text-[11px] font-bold text-amber-400">{v.delay}</p>
                </div>
              </div>

              {/* Route & Escort details */}
              <div className="flex items-center gap-3 text-xs text-slate-300 flex-wrap">
                <span className="font-bold text-white">{v.origin}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="font-bold text-white">{v.destination}</span>
                <span>&bull;</span>
                <span>Corridor: <strong className="text-blue-300">{v.corridor}</strong></span>
                <span>&bull;</span>
                <span>Escort: <strong className="text-slate-200">{v.driver}</strong></span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span>Corridor Transit Progress</span>
                  <span className="text-slate-200">{v.progress}%</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isMoving ? 'bg-blue-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${v.progress}%` }}
                  />
                </div>
              </div>

              {/* Alert note */}
              {v.alert && (
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-amber-300 font-medium flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="leading-snug">{v.alert}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
