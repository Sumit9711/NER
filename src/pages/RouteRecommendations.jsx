import React, { useRef, useState } from 'react';
import { Compass, GitFork, RefreshCw, Layers, ShieldCheck, MapPin, ArrowRight } from 'lucide-react';
import { RouteComparisonCard } from '../components/routes/RouteComparisonCard';
import { RoutingEngineArchPanel } from '../components/routes/RoutingEngineArchPanel';
import { RouteComparisonMap } from '../components/routes/RouteComparisonMap';
import { ROUTE_COMPARISON_DATA, ADDITIONAL_ROUTE_ALTERNATIVES } from '../data/routeRecommendationData';

export const RouteRecommendations = () => {
  const mapSectionRef = useRef(null);
  const [selectedRouteKey, setSelectedRouteKey] = useState('recommended');
  const [isRecalculating, setIsRecalculating] = useState(false);
  const [lastCalculated, setLastCalculated] = useState('10:45 AM IST');

  const scrollToMap = () => {
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST';
      setLastCalculated(timeStr);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="bg-slate-800/90 border-2 border-slate-700 rounded-xl p-5 shadow-md flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Compass className="w-6 h-6 text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Route Recommendations & Dynamic Rerouting
            </h1>
          </div>
          <p className="text-sm font-semibold text-slate-300 mt-1">
            Risk-adjusted corridor optimizer synthesizing OSRM road graph topology with real-time landslide, rainfall and delay telemetry
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRecalculate}
            disabled={isRecalculating}
            className="min-h-[42px] px-4 py-2.5 rounded-lg bg-cyan-700 hover:bg-cyan-600 border border-cyan-500 text-white text-xs font-black flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRecalculating ? 'animate-spin' : ''}`} />
            <span>{isRecalculating ? 'Recalculating Graph...' : 'Recalculate AI Detours'}</span>
          </button>

          <span className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono font-bold hidden sm:inline-block">
            Last Computed: {lastCalculated}
          </span>
        </div>
      </div>

      {/* 2. Route Comparison Interface */}
      <RouteComparisonCard
        data={ROUTE_COMPARISON_DATA}
        selectedRouteKey={selectedRouteKey}
        onSelectRoute={(key) => setSelectedRouteKey(key)}
        onFocusMap={scrollToMap}
      />

      {/* 3. Both Routes on GIS Map */}
      <div ref={mapSectionRef}>
        <RouteComparisonMap data={ROUTE_COMPARISON_DATA} />
      </div>

      {/* 4. Small Technical Explanation Panel: The Route Engine is NOT an LLM */}
      <RoutingEngineArchPanel />

      {/* 5. Additional Alternative Corridors Evaluated */}
      <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Other Active Corridors with Risk-Adjusted Detours
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-semibold">
            Network Telemetry Feed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ADDITIONAL_ROUTE_ALTERNATIVES.map((alt) => (
            <div
              key={alt.id}
              className="p-4 rounded-xl bg-slate-850 border border-slate-700 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-xs font-black text-cyan-300 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-700">
                    {alt.corridorCode}
                  </span>
                  <span className="text-xs font-black text-emerald-400">
                    Risk Reduced: {alt.originalRisk} &rarr; {alt.recommendedRisk}
                  </span>
                </div>
                <h4 className="text-sm font-black text-white">{alt.corridorName}</h4>
                <p className="text-xs text-slate-300 mt-1 font-medium">{alt.explanation}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-750 text-xs">
                <div>
                  <span className="text-slate-400 text-[11px] block">Original Mainline:</span>
                  <span className="font-bold text-red-400">{alt.originalDistance} ({alt.originalDelay})</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px] block">Safer Detour:</span>
                  <span className="font-bold text-emerald-400">{alt.recommendedDistance} ({alt.recommendedDelay})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
