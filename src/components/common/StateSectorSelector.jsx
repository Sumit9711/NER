import React from 'react';
import { MapPin } from 'lucide-react';
import { NER_STATES } from '../../data/nerCorridors';

export const StateSectorSelector = ({ selectedState, onSelectState }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="state-sector-select" className="text-xs font-bold text-slate-300 uppercase tracking-wider hidden sm:inline flex items-center gap-1">
        <MapPin className="w-3.5 h-3.5 text-blue-400" />
        Sector:
      </label>
      <div className="relative">
        <select
          id="state-sector-select"
          value={selectedState}
          onChange={(e) => onSelectState(e.target.value)}
          className="bg-slate-800 border-2 border-slate-600 text-white text-sm font-bold rounded-lg px-3 py-2 pr-8 focus:outline-none focus:border-blue-500 hover:border-slate-500 cursor-pointer shadow-sm"
          aria-label="Filter command center operational sector by North Eastern state"
        >
          {NER_STATES.map((st) => (
            <option key={st.id} value={st.id} className="bg-slate-900 text-white font-medium">
              {st.name} ({st.short})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
