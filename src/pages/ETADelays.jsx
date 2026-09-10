import React, { useState } from 'react';
import {
  Timer,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Cpu,
  RefreshCw,
  Sparkles,
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { ETASummaryCards } from '../components/eta/ETASummaryCards';
import { ETAMonitoringTable } from '../components/eta/ETAMonitoringTable';
import { ETA_SUMMARY_METRICS, GOVERNANCE_NOTICE, ETA_VEHICLES_DATA } from '../data/etaDelaysData';

export const ETADelays = () => {
  const [lastRefreshed, setLastRefreshed] = useState('10:45 AM');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Target example vehicle
  const targetMed07 = ETA_VEHICLES_DATA.find((v) => v.id === 'MED-07');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="bg-slate-800/90 border-2 border-slate-700 rounded-xl p-5 shadow-md flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Timer className="w-6 h-6 text-amber-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ETA & Transit Delay Intelligence
            </h1>
          </div>
          <p className="text-sm font-semibold text-slate-300 mt-1">
            Predictive convoy turnaround telemetry calculating mountain grade deceleration, rain saturation, and checkpost queues
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="min-h-[42px] px-3.5 py-2 rounded-lg bg-slate-750 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-black flex items-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync Telemetry ({lastRefreshed})</span>
          </button>

          <span className="px-3 py-2 rounded-lg bg-amber-950 border border-amber-600 text-amber-300 text-xs font-black flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>Regional Avg Delay: {ETA_SUMMARY_METRICS.averageDelayDisplay}</span>
          </span>
        </div>
      </div>

      {/* 2. Mandatory AI Governance & Transparency Notice */}
      <div className="p-4 rounded-xl bg-purple-950/70 border-2 border-purple-500/70 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-800/80 pb-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-purple-900 border border-purple-400 text-purple-200 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-300" />
              <span>{GOVERNANCE_NOTICE.label}</span>
            </span>
            <span className="text-xs font-mono text-purple-300">
              Model: {ETA_SUMMARY_METRICS.modelVersion}
            </span>
          </div>
          <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{GOVERNANCE_NOTICE.statement}</span>
          </span>
        </div>

        <p className="text-xs text-purple-200 font-medium leading-relaxed">
          {GOVERNANCE_NOTICE.detailedDisclaimer}
        </p>
      </div>

      {/* 3. Fleet Delay Summary KPIs */}
      <ETASummaryCards metrics={ETA_SUMMARY_METRICS} />

      {/* 4. Spotlight Example Card: MED-07 (User Requested Exact Match) */}
      {targetMed07 && (
        <div className="bg-slate-900 border-2 border-blue-500 rounded-xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-600 text-white font-black text-[10px] px-3 py-1 rounded-bl-lg tracking-wider uppercase flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Primary Focus Vehicle</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg font-black text-white bg-blue-950 border-2 border-blue-500 px-3 py-1 rounded-lg">
                  {targetMed07.id}
                </span>
                <h3 className="text-lg font-black text-white">
                  {targetMed07.vehicleName}
                </h3>
              </div>
              <p className="text-xs text-slate-300">
                Driver: <strong className="text-white">{targetMed07.driver}</strong> &bull; Org: <strong className="text-white">{targetMed07.organization}</strong> &bull; Corridor: <strong className="text-cyan-400 font-mono">{targetMed07.corridor}</strong>
              </p>
              <p className="text-xs text-slate-400 font-medium">
                {targetMed07.notes}
              </p>
            </div>

            {/* Exact Values Requested by User */}
            <div className="grid grid-cols-3 gap-3 bg-slate-950/90 p-4 rounded-xl border border-slate-800 shrink-0">
              <div className="text-center px-2">
                <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                  Normal ETA
                </span>
                <span className="font-mono text-xl sm:text-2xl font-black text-slate-200 block mt-1">
                  {targetMed07.normalEta}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">Scheduled</span>
              </div>

              <div className="text-center px-2 border-x border-slate-800">
                <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                  Predicted ETA
                </span>
                <span className="font-mono text-xl sm:text-2xl font-black text-amber-400 block mt-1">
                  {targetMed07.predictedEta}
                </span>
                <span className="text-[10px] text-amber-300/80 font-semibold">Stochastic ETA</span>
              </div>

              <div className="text-center px-2">
                <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                  Expected Delay
                </span>
                <span className="font-mono text-xl sm:text-2xl font-black text-red-400 block mt-1">
                  {targetMed07.expectedDelay}
                </span>
                <span className="text-[10px] text-red-300/80 font-semibold">Variance</span>
              </div>
            </div>
          </div>

          {/* Reasons Pill Tags & Data Quality */}
          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase text-slate-400">
                Reasons:
              </span>
              {targetMed07.reasons.map((r, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-amber-950 border border-amber-500/70 text-amber-200 text-xs font-bold"
                >
                  {r}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold">Data Quality:</span>
              <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-600 text-emerald-300 font-black">
                {targetMed07.dataQuality}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Complete Fleet ETA Telemetry Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-white uppercase tracking-wider">
            All Monitored Convoys & Real-Time Delay Predictions
          </h2>
          <span className="text-xs text-slate-400 font-semibold">
            Auto-refreshed every 60s
          </span>
        </div>

        <ETAMonitoringTable />
      </div>
    </div>
  );
};
