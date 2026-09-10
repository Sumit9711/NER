import React from 'react';
import { AlertOctagon, Clock, Wrench, Shield, CheckCircle2, MapPin } from 'lucide-react';
import { RiskBadge } from './RiskBadge';
import { StatusBadge } from './StatusBadge';

export const IncidentCard = ({ incident }) => {
  return (
    <div className="p-4 sm:p-5 rounded-xl bg-slate-800/95 border-2 border-slate-700 shadow-md hover:border-slate-500 transition-all flex flex-col justify-between gap-3">
      <div>
        {/* Top bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
              {incident.id}
            </span>
            <RiskBadge level={incident.severity} size="normal" />
          </div>

          <StatusBadge status={incident.status} size="normal" />
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-black text-white leading-snug">
          {incident.title}
        </h3>

        {/* Location & Type */}
        <div className="mt-1.5 flex items-center gap-3 text-xs font-semibold text-slate-300 flex-wrap">
          <span className="flex items-center gap-1 text-white">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            {incident.state} &bull; <strong className="text-blue-300">{incident.corridor}</strong>
          </span>
          <span>&bull;</span>
          <span className="text-amber-300 font-bold">{incident.type}</span>
        </div>

        {/* Equipment / Team */}
        <div className="mt-2.5 p-2.5 bg-slate-900/90 rounded-lg border border-slate-700 text-xs text-slate-300 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-blue-400 shrink-0" />
          <span>Deployed: <strong className="text-slate-100">{incident.equipment}</strong></span>
        </div>
      </div>

      {/* Progress & Clearance ETA */}
      <div className="pt-2 border-t border-slate-700/80 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
          <span>Debris Clearance Progress</span>
          <span className="text-white">{incident.progress}%</span>
        </div>
        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${incident.progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <span>Reported: <strong className="text-slate-300">{incident.reported}</strong></span>
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            Clearance ETA: {incident.clearanceETA}
          </span>
        </div>
      </div>
    </div>
  );
};
