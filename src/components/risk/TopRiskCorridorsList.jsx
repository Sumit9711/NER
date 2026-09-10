import React from 'react';
import { Route, AlertTriangle, ShieldAlert, ArrowRight, Clock, Truck, ChevronRight } from 'lucide-react';
import { TOP_RISK_CORRIDORS, getRiskTier } from '../../data/riskData';

export const TopRiskCorridorsList = ({ selectedCorridorId, onSelectCorridor }) => {
  return (
    <div className="bg-slate-900/90 border-2 border-slate-700 rounded-xl p-5 shadow-lg">
      <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <Route className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black text-white uppercase tracking-tight">
              Top Risk Corridors
            </h2>
          </div>
          <p className="text-xs font-semibold text-slate-300 mt-0.5">
            Ranked by multi-factor vulnerability score, rainfall saturation, and disruption probability
          </p>
        </div>
        <span className="text-xs font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-md border border-slate-700">
          Showing 7 Strategic Corridors
        </span>
      </div>

      <div className="space-y-3">
        {TOP_RISK_CORRIDORS.map((corridor, idx) => {
          const tier = getRiskTier(corridor.score);
          const isSelected = selectedCorridorId === corridor.code;

          return (
            <div
              key={corridor.id}
              onClick={() => onSelectCorridor(corridor)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelectCorridor(corridor)}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isSelected
                  ? 'bg-slate-800/90 border-blue-500 ring-2 ring-blue-500/30 shadow-md'
                  : 'bg-slate-800/40 border-slate-700/80 hover:bg-slate-800 hover:border-slate-600'
              }`}
            >
              {/* Left Info */}
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-black text-slate-300 shrink-0 mt-0.5">
                  #{idx + 1}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-black text-white tracking-wide">
                      {corridor.code}
                    </span>
                    <span className="text-xs text-slate-400 font-medium truncate">
                      • {corridor.name}
                    </span>
                    <span className="text-[11px] font-bold text-slate-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
                      {corridor.states}
                    </span>
                  </div>

                  <p className="text-xs text-amber-300/90 font-medium mt-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                    <span>{corridor.primaryHazard}</span>
                  </p>

                  <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-400 mt-2 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {corridor.delayImpact}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Truck className="w-3 h-3 text-slate-500" />
                      {corridor.activeConvoys} active convoys
                    </span>
                    <span>•</span>
                    <span className="text-slate-300 font-mono">
                      Rain: {corridor.rainfall}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Score & Action */}
              <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-700/60">
                <div className="text-right">
                  <div className="flex items-baseline justify-end gap-1">
                    <span className={`text-2xl font-black ${tier.text}`}>
                      {corridor.score}
                    </span>
                    <span className="text-xs font-bold text-slate-400">/ 100</span>
                  </div>
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider border ${tier.bg} ${tier.border} ${tier.text}`}>
                    {corridor.severity}
                  </span>
                </div>

                <div className={`p-2 rounded-lg border transition-colors ${
                  isSelected ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900 border-slate-700 text-slate-400'
                }`}>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
