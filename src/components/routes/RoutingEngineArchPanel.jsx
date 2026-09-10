import React from 'react';
import { Cpu, Network, ShieldAlert, Plus, HelpCircle, Layers, CheckCircle } from 'lucide-react';
import { ROUTE_COMPARISON_DATA } from '../../data/routeRecommendationData';

export const RoutingEngineArchPanel = () => {
  const { architecture } = ROUTE_COMPARISON_DATA;

  return (
    <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-5 shadow-lg space-y-4">
      {/* Header with explicit Non-LLM badge */}
      <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-cyan-400" />
          <h3 className="text-sm font-black text-white uppercase tracking-wider">
            Routing Engine Architecture & Mathematical Model
          </h3>
        </div>

        <span className="px-3 py-1 rounded bg-blue-950 border border-blue-500 text-blue-200 text-xs font-mono font-black">
          Deterministic Non-LLM Routing
        </span>
      </div>

      {/* Explicit User Warning & Governance */}
      <div className="p-3.5 rounded-lg bg-blue-950/60 border border-blue-500/60 flex items-start gap-3">
        <Network className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <div className="text-xs font-black uppercase text-blue-300 tracking-wide">
            IMPORTANT ARCHITECTURAL FOUNDATION:
          </div>
          <p className="text-sm font-bold text-white mt-0.5">
            {architecture.statement}
          </p>
        </div>
      </div>

      {/* Mathematical Conceptual Logic Formula */}
      <div className="bg-slate-950 border-2 border-slate-800 rounded-lg p-4 text-center">
        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Edge Cost Objective Function
        </div>
        <div className="font-mono text-base sm:text-lg font-black text-cyan-300 py-1 bg-slate-900/90 rounded border border-slate-800 inline-block px-5 shadow-inner">
          {architecture.formula}
        </div>
        <p className="text-xs text-slate-400 max-w-2xl mx-auto mt-2.5 font-medium">
          {architecture.formulaExplanation}
        </p>
      </div>

      {/* Dual Architecture Integration: OSRM + Risk Intelligence */}
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
          Integrated Pipeline:
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
          {/* Left Block: ROUTING ENGINE */}
          <div className="sm:col-span-5 bg-slate-850 border-2 border-cyan-600/70 rounded-xl p-4 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-cyan-400 uppercase tracking-wider">
                  ROUTING ENGINE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-700 text-cyan-300 font-bold">
                  GIS Layer
                </span>
              </div>
              <h4 className="text-sm font-black text-white">
                OSRM / OpenStreetMap
              </h4>
              <p className="text-xs text-slate-300 mt-1.5 font-medium">
                Calculates baseline shortest kinematic path, topological connectivity, bridges, and axle limits via Contraction Hierarchies.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-700/60 text-[11px] font-mono text-slate-400">
              Output: Free-flow travel_time (6h 45m)
            </div>
          </div>

          {/* Plus Sign */}
          <div className="sm:col-span-1 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-white font-black">
              <Plus className="w-5 h-5 text-amber-400" />
            </div>
          </div>

          {/* Right Block: RISK INTELLIGENCE */}
          <div className="sm:col-span-5 bg-slate-850 border-2 border-amber-600/70 rounded-xl p-4 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                  RISK INTELLIGENCE
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 border border-amber-700 text-amber-300 font-bold">
                  Telemetry Layer
                </span>
              </div>
              <h4 className="text-sm font-black text-white">
                Risk-adjusted route cost
              </h4>
              <p className="text-xs text-slate-300 mt-1.5 font-medium">
                Multiplies graph edge weights by real-time precipitation saturation, geological slope hazard, and verified landslide reports.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-700/60 text-[11px] font-mono text-slate-400">
              Penalty: NH-6 Mile 28 (+2.86) vs Bypass (0.34)
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Parameters Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
        {architecture.parameters.map((p, idx) => (
          <div key={idx} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
            <span className="text-[11px] font-bold text-slate-400 block truncate">
              {p.name}
            </span>
            <span className="font-mono font-black text-cyan-300 text-sm block mt-0.5">
              {p.value}
            </span>
            <span className="text-[10px] text-slate-300 block mt-0.5 truncate">
              {p.source}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
