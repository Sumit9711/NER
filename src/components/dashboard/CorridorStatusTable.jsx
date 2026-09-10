import React from 'react';
import { ShieldCheck, AlertTriangle, ExternalLink, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { STRATEGIC_CORRIDORS } from '../../data/nerCorridors';
import { getHazardLevelClass } from '../../utils/statusColors';

export const CorridorStatusTable = ({ selectedSector, onSelectCorridor }) => {
  const filteredCorridors = selectedSector === 'ALL'
    ? STRATEGIC_CORRIDORS
    : STRATEGIC_CORRIDORS.filter(c => 
        c.states.some(s => s.toLowerCase().includes(selectedSector.toLowerCase()))
      );

  return (
    <div className="bg-slate-800/90 border-2 border-slate-700 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          <h2 className="text-base font-black text-white uppercase tracking-wider">
            Strategic Lifeline Highway Corridor Status
          </h2>
        </div>
        <span className="text-xs font-bold text-slate-400">
          Showing {filteredCorridors.length} of {STRATEGIC_CORRIDORS.length} monitored corridors
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" aria-label="Highway Corridors Status">
          <thead>
            <tr className="bg-slate-900/90 border-b border-slate-700 text-xs font-black text-slate-300 uppercase tracking-wider">
              <th className="py-3.5 px-4">Highway Code & Axis</th>
              <th className="py-3.5 px-4">State(s)</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Hazard Level</th>
              <th className="py-3.5 px-4">Est. Delay</th>
              <th className="py-3.5 px-4">Active Convoys</th>
              <th className="py-3.5 px-4">Chokepoint / Recommended Alternate</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/60 text-sm">
            {filteredCorridors.map((corr) => (
              <tr key={corr.id} className="hover:bg-slate-750 transition-colors">
                {/* Highway Code & Axis */}
                <td className="py-4 px-4 font-bold text-white whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-900 border border-slate-600 px-2 py-1 rounded font-black text-blue-300">
                      {corr.code}
                    </span>
                    <span className="text-sm text-slate-100 font-bold">{corr.name}</span>
                  </div>
                </td>

                {/* States */}
                <td className="py-4 px-4 text-slate-300 font-medium">
                  {corr.states.join(', ')}
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  <StatusBadge status={corr.status} size="normal" />
                </td>

                {/* Hazard Level */}
                <td className="py-4 px-4">
                  <span className={`inline-block px-2.5 py-1 rounded text-xs border ${getHazardLevelClass(corr.hazardLevel)}`}>
                    {corr.hazardLevel}
                  </span>
                </td>

                {/* Est Delay */}
                <td className="py-4 px-4 font-bold whitespace-nowrap">
                  {corr.delayMinutes > 0 ? (
                    <span className="text-amber-400">+{corr.delayMinutes} mins</span>
                  ) : (
                    <span className="text-emerald-400">On Schedule</span>
                  )}
                </td>

                {/* Active Convoys */}
                <td className="py-4 px-4 font-bold text-slate-200">
                  <span className="bg-slate-900 px-2 py-1 rounded border border-slate-700">
                    {corr.activeConvoys} units
                  </span>
                </td>

                {/* Chokepoint & Alternate */}
                <td className="py-4 px-4 text-xs max-w-xs">
                  <div className="font-semibold text-slate-200">{corr.chokepoints}</div>
                  <div className="text-blue-300 font-medium mt-0.5 flex items-center gap-1">
                    <ArrowRight className="w-3 h-3 shrink-0" />
                    <span className="truncate">{corr.recommendedAlt}</span>
                  </div>
                </td>

                {/* Action Button */}
                <td className="py-4 px-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => onSelectCorridor && onSelectCorridor(corr)}
                    className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-600 border border-blue-500 text-white px-3 py-1.5 rounded text-xs font-bold transition-all shadow-sm"
                    title={`View detailed telemetry for ${corr.code}`}
                  >
                    <span>View Telemetry</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
