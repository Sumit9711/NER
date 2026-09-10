import React from 'react';
import { AlertTriangle, Radio, ShieldAlert, ArrowRight, MapPin, Clock } from 'lucide-react';
import { RiskBadge } from './RiskBadge';

export const AlertCard = ({ alert, onAction }) => {
  const isCritical = alert.severity === 'CRITICAL';

  return (
    <div
      className={`p-4 sm:p-5 rounded-xl border-2 transition-all shadow-md flex flex-col justify-between gap-3 ${
        isCritical
          ? 'bg-red-950/70 border-red-600/90 hover:border-red-400'
          : 'bg-slate-800/95 border-amber-600/70 hover:border-amber-400'
      }`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
              {alert.id}
            </span>
            <RiskBadge level={alert.severity} size="normal" />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{alert.timestamp}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-black text-white leading-snug">
          {alert.title}
        </h3>

        {/* Corridor location */}
        <div className="mt-1.5 flex items-center gap-2 text-xs font-bold text-slate-300">
          <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{alert.state} &bull; <strong className="text-blue-300">{alert.corridor}</strong></span>
        </div>

        {/* Detail text */}
        <p className="mt-2.5 text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
          {alert.detail}
        </p>
      </div>

      {/* Footer / Action row */}
      <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between flex-wrap gap-3">
        <div className="text-xs font-bold text-amber-300 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-700 flex-1 min-w-[200px]">
          <span className="text-slate-400 uppercase font-black text-[10px] block">Directive:</span>
          <span className="truncate block">{alert.action}</span>
        </div>

        <button
          onClick={() => onAction && onAction(alert)}
          className="min-h-[40px] px-3.5 py-2 bg-blue-700 hover:bg-blue-600 border border-blue-500 rounded-lg text-white font-bold text-xs flex items-center gap-2 transition-all shadow shrink-0"
        >
          <span>Dispatch Detour</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
