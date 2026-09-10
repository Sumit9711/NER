import React from 'react';
import { Clock, Truck, AlertTriangle, Activity, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ETA_SUMMARY_METRICS } from '../../data/etaDelaysData';

export const ETASummaryCards = ({ metrics = ETA_SUMMARY_METRICS }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Average Delay */}
      <div className="bg-slate-900/90 border-2 border-slate-700 rounded-xl p-4 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Regional Average Delay
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-amber-400">
              {metrics.averageDelayDisplay}
            </span>
            <span className="text-xs text-slate-400 font-semibold">vs schedule</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Monsoon hill descent speed degradation
          </p>
        </div>
        <div className="p-3 rounded-lg bg-amber-950 border border-amber-600/50 text-amber-400">
          <Clock className="w-6 h-6" />
        </div>
      </div>

      {/* 2. Active Convoys In Transit */}
      <div className="bg-slate-900/90 border-2 border-slate-700 rounded-xl p-4 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Monitored Convoys
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-white">
              {metrics.activeConvoysCount}
            </span>
            <span className="text-xs text-slate-400 font-semibold">in transit</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            All 8 NER state disaster corridors
          </p>
        </div>
        <div className="p-3 rounded-lg bg-blue-950 border border-blue-600/50 text-blue-400">
          <Truck className="w-6 h-6" />
        </div>
      </div>

      {/* 3. High Delay Convoys */}
      <div className="bg-slate-900/90 border-2 border-slate-700 rounded-xl p-4 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Convoys Delayed
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-red-400">
              {metrics.delayedConvoysCount}
            </span>
            <span className="text-xs text-red-300 font-semibold">({metrics.criticalDelayCount} Critical)</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Delay &gt; 25 mins due to rockfall / rain
          </p>
        </div>
        <div className="p-3 rounded-lg bg-red-950 border border-red-600/50 text-red-400">
          <ShieldAlert className="w-6 h-6" />
        </div>
      </div>

      {/* 4. Sensor Telemetry Uptime */}
      <div className="bg-slate-900/90 border-2 border-slate-700 rounded-xl p-4 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Telemetry Quality
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-emerald-400">
              {metrics.telemetryUptime}
            </span>
            <span className="text-xs text-emerald-300 font-semibold">Active</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {metrics.modelVersion} Active Sync
          </p>
        </div>
        <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-600/50 text-emerald-400">
          <Activity className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
