import React from 'react';
import { Route, ArrowRight, ExternalLink } from 'lucide-react';
import { RiskBadge } from '../common/RiskBadge';
import { StatusBadge } from '../common/StatusBadge';

export const HighRiskCorridorsSection = ({ corridors, onSelectCorridor }) => {
  return (
    <div className="bg-slate-800/90 border-2 border-slate-700 rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 sm:p-5 bg-slate-850 border-b-2 border-slate-700 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-red-950 border border-red-600 text-red-400">
            <Route className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
              High-Risk Corridors & Chokepoints
            </h2>
            <p className="text-xs text-slate-300 font-medium">
              Vulnerability assessment, transit delays & AI alternate routes
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold">
          {corridors.length} Monitored Lifelines
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" aria-label="High-Risk Corridors Table">
          <thead>
            <tr className="bg-slate-900/90 border-b border-slate-700 text-xs font-black text-slate-300 uppercase tracking-wider">
              <th className="py-3 px-4">Highway & Axis</th>
              <th className="py-3 px-4">State(s)</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Risk Level</th>
              <th className="py-3 px-4">Est. Delay</th>
              <th className="py-3 px-4">Active Units</th>
              <th className="py-3 px-4">Detour Recommendation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/60 text-sm">
            {corridors.map((corr) => (
              <tr key={corr.id} className="hover:bg-slate-750 transition-colors">
                <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black bg-slate-900 border border-slate-600 text-blue-300 px-2 py-0.5 rounded">
                      {corr.code}
                    </span>
                    <span className="text-sm font-bold text-slate-100">{corr.name}</span>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-slate-300 font-medium whitespace-nowrap">
                  {corr.states}
                </td>

                <td className="py-3.5 px-4 whitespace-nowrap">
                  <StatusBadge status={corr.status} size="normal" />
                </td>

                <td className="py-3.5 px-4 whitespace-nowrap">
                  <RiskBadge level={corr.riskLevel} size="normal" />
                </td>

                <td className="py-3.5 px-4 font-black whitespace-nowrap">
                  <span className={corr.status === 'BLOCKED' ? 'text-red-400' : 'text-amber-400'}>
                    {corr.delay}
                  </span>
                </td>

                <td className="py-3.5 px-4 font-bold text-slate-200 whitespace-nowrap">
                  {corr.activeConvoys} convoys
                </td>

                <td className="py-3.5 px-4 text-xs font-medium text-slate-300 max-w-xs">
                  <div className="flex items-center gap-1.5 text-blue-300 font-bold truncate">
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 text-blue-400" />
                    <span>{corr.detour}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
