import React from 'react';
import { AlertOctagon, Wrench, Shield } from 'lucide-react';
import { IncidentCard } from '../common/IncidentCard';

export const RecentIncidentsSection = ({ incidents }) => {
  return (
    <div className="bg-slate-800/90 border-2 border-slate-700 rounded-xl p-5 shadow-lg space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700 flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-amber-950 border border-amber-600 text-amber-400">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
              Recent Incidents & Roadblock Operations
            </h2>
            <p className="text-xs text-slate-300 font-medium">
              BRO Project Sewak, NDRF & State PWD active engineering interventions
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold">
          {incidents.length} Ground Interventions
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {incidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>
    </div>
  );
};
