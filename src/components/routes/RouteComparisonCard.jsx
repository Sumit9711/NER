import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Clock,
  Navigation,
  ArrowRight,
  CheckCircle2,
  MapPin,
  Compass,
  Zap,
  Check
} from 'lucide-react';
import { ROUTE_COMPARISON_DATA } from '../../data/routeRecommendationData';

export const RouteComparisonCard = ({
  data = ROUTE_COMPARISON_DATA,
  onSelectRoute,
  onFocusMap,
  selectedRouteKey = 'recommended'
}) => {
  const [activeRoute, setActiveRoute] = useState(selectedRouteKey);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleUseRecommended = () => {
    setActiveRoute('recommended');
    if (onSelectRoute) onSelectRoute('recommended');
    setFeedbackMessage('Recommended Route Active: Convoys diverted via Mawryngkneng-Umsning Bypass.');
    setTimeout(() => setFeedbackMessage(''), 5000);
  };

  const handleKeepOriginal = () => {
    setActiveRoute('original');
    if (onSelectRoute) onSelectRoute('original');
    setFeedbackMessage('Original Route Retained: High disruption warning remains active for Mile 28.');
    setTimeout(() => setFeedbackMessage(''), 5000);
  };

  const handleViewOnMap = () => {
    if (onFocusMap) onFocusMap();
  };

  return (
    <div className="bg-slate-900 border-2 border-slate-700 rounded-xl shadow-xl overflow-hidden">
      {/* 1. SAFER ALTERNATIVE Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b-2 border-emerald-500/50 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-lg bg-emerald-600 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
              <ShieldCheck className="w-4 h-4" />
              <span>{data.badge}</span>
            </span>
            <span className="text-sm font-black text-white">
              {data.corridorCode} : {data.corridorName}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>Guwahati Depot &rarr; Silchar Warehouse</span>
          </div>
        </div>

        {/* User-specified Explanation Box */}
        <div className="mt-3 p-3.5 rounded-lg bg-emerald-950/70 border-2 border-emerald-500/70 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-black text-emerald-200 tracking-wide">
              "{data.explanation}"
            </p>
            <p className="text-xs text-emerald-300/80 font-medium mt-0.5">
              {data.detailedSummary}
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Feedback Banner if user interacted */}
      {feedbackMessage && (
        <div className="bg-blue-950/90 border-b border-blue-500/60 px-5 py-2.5 flex items-center justify-between gap-3 text-xs text-blue-200 font-bold animate-fadeIn">
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-blue-400" />
            <span>{feedbackMessage}</span>
          </span>
          <button onClick={() => setFeedbackMessage('')} className="text-blue-400 hover:text-white text-xs">
            ✕
          </button>
        </div>
      )}

      {/* 2. Side-by-Side Route Comparison Grid */}
      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* ORIGINAL ROUTE CARD */}
          <div
            className={`rounded-xl border-2 p-5 transition-all relative flex flex-col justify-between ${
              activeRoute === 'original'
                ? 'bg-slate-850 border-red-500 ring-2 ring-red-500/30 shadow-lg'
                : 'bg-slate-900/80 border-slate-700/80 opacity-90 hover:opacity-100'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                  ORIGINAL ROUTE
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-red-950 border border-red-600 text-red-300">
                  {data.originalRoute.statusBadge}
                </span>
              </div>

              <h3 className="text-base font-black text-white mb-1">
                {data.originalRoute.name}
              </h3>
              <p className="text-xs text-red-300 font-medium mb-4 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>{data.originalRoute.hazardDetail}</span>
              </p>

              {/* Exact Specs Grid */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">
                    Distance
                  </span>
                  <span className="text-xl font-black text-white">
                    {data.originalRoute.distanceDisplay}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">
                    Travel Time
                  </span>
                  <span className="text-xl font-black text-white">
                    {data.originalRoute.travelTimeDisplay}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">
                    Risk
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-red-400">
                      {data.originalRoute.riskScore}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">/ 100</span>
                    <span className="ml-1 text-[10px] font-black text-red-400">
                      ({data.originalRoute.riskSeverity})
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">
                    Expected Delay
                  </span>
                  <span className="text-xl font-black text-red-400">
                    {data.originalRoute.expectedDelay}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Bottlenecks: <strong>Mile 28 (+110m), Khliehriat</strong>
              </span>
              {activeRoute === 'original' && (
                <span className="text-red-400 font-black flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Active in Navigation
                </span>
              )}
            </div>
          </div>

          {/* RECOMMENDED ROUTE CARD (SAFER ALTERNATIVE) */}
          <div
            className={`rounded-xl border-2 p-5 transition-all relative flex flex-col justify-between ${
              activeRoute === 'recommended'
                ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/40 shadow-xl'
                : 'bg-slate-900/80 border-slate-700/80 hover:border-emerald-600'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  RECOMMENDED ROUTE
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-black uppercase tracking-wider bg-emerald-950 border border-emerald-500 text-emerald-300">
                  {data.recommendedRoute.statusBadge}
                </span>
              </div>

              <h3 className="text-base font-black text-white mb-1">
                {data.recommendedRoute.name}
              </h3>
              <p className="text-xs text-emerald-300 font-medium mb-4 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{data.recommendedRoute.hazardDetail}</span>
              </p>

              {/* Exact Specs Grid */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-emerald-900/60">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">
                    Distance
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-white">
                      {data.recommendedRoute.distanceDisplay}
                    </span>
                    <span className="text-[11px] font-bold text-amber-300">
                      (+17 km)
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-emerald-900/60">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">
                    Travel Time
                  </span>
                  <span className="text-xl font-black text-white">
                    {data.recommendedRoute.travelTimeDisplay}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-emerald-900/60">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">
                    Risk
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-emerald-400">
                      {data.recommendedRoute.riskScore}
                    </span>
                    <span className="text-xs text-slate-500 font-bold">/ 100</span>
                    <span className="ml-1 text-[10px] font-black text-emerald-300">
                      (-52 pts)
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-emerald-900/60">
                  <span className="text-[11px] font-bold text-slate-400 block uppercase">
                    Expected Delay
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-black text-emerald-400">
                      {data.recommendedRoute.expectedDelay}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-300">
                      (-1h 45m saved)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-emerald-300 font-medium">
                Pavement: <strong>Reinforced 24 MT PWD Pavement</strong>
              </span>
              {activeRoute === 'recommended' && (
                <span className="text-emerald-400 font-black flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Active in Navigation
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 3. Action Buttons (Exact User-Specified Buttons) */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleUseRecommended}
              className="min-h-[44px] px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Use Recommended Route</span>
            </button>

            <button
              onClick={handleKeepOriginal}
              className="min-h-[44px] px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 hover:text-white font-bold text-sm flex items-center gap-2 transition-all active:scale-95"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Keep Original Route</span>
            </button>
          </div>

          <button
            onClick={handleViewOnMap}
            className="min-h-[44px] px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-600 border border-blue-500 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Compass className="w-4 h-4" />
            <span>View Route on Map</span>
          </button>
        </div>
      </div>
    </div>
  );
};
