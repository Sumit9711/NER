import React from 'react';
import { ShieldAlert, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { RISK_LEVEL_TIERS, getRiskTier } from '../../data/riskData';

export const RiskScoreMeter = ({ score = 64, max = 100, label = 'Route Disruption Risk', showScale = true, size = 'large' }) => {
  const tier = getRiskTier(score);
  const percentage = Math.min(Math.max((score / max) * 100, 0), 100);

  const getTierIcon = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return <ShieldAlert className="w-5 h-5 text-red-400 animate-pulse" />;
      case 'HIGH':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'MEDIUM':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getBadgeClasses = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-950 border-red-500 text-red-200';
      case 'HIGH':
        return 'bg-amber-950 border-amber-500 text-amber-200';
      case 'MEDIUM':
        return 'bg-yellow-950 border-yellow-500 text-yellow-200';
      default:
        return 'bg-emerald-950 border-emerald-500 text-emerald-200';
    }
  };

  const getProgressColor = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-gradient-to-r from-red-600 to-red-500';
      case 'HIGH':
        return 'bg-gradient-to-r from-amber-600 to-amber-500';
      case 'MEDIUM':
        return 'bg-gradient-to-r from-yellow-600 to-yellow-500';
      default:
        return 'bg-gradient-to-r from-emerald-600 to-emerald-500';
    }
  };

  return (
    <div className="bg-slate-900/90 border-2 border-slate-700 rounded-xl p-5 shadow-lg">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-black uppercase tracking-wider text-slate-300">
          {label}
        </span>
        <span className={`px-3 py-1 rounded-md border-2 font-black text-xs tracking-wider flex items-center gap-1.5 ${getBadgeClasses(tier.label)}`}>
          {getTierIcon(tier.label)}
          <span>{tier.label}</span>
        </span>
      </div>

      {/* Main Score Display */}
      <div className="flex items-baseline gap-2 mt-1">
        <span className={`font-black tracking-tight ${size === 'large' ? 'text-4xl sm:text-5xl' : 'text-3xl'} ${tier.text}`}>
          {score}
        </span>
        <span className="text-xl sm:text-2xl font-bold text-slate-400">
          / {max}
        </span>
      </div>

      {/* Visual Progress Meter */}
      <div className="mt-4">
        <div className="h-3.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700 p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getProgressColor(tier.label)}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* 4-Tier Scale Legend */}
      {showScale && (
        <div className="mt-4 pt-3 border-t border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Disruption Risk Scale Reference:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {RISK_LEVEL_TIERS.map((t) => {
              const isCurrent = t.label === tier.label;
              return (
                <div
                  key={t.label}
                  className={`px-2 py-1.5 rounded border text-center transition-all ${
                    isCurrent
                      ? `${t.bg} ${t.border} border-2 ring-2 ring-white/20`
                      : 'bg-slate-800/60 border-slate-700 opacity-60'
                  }`}
                >
                  <div className={`text-xs font-black ${t.text}`}>
                    {t.label}
                  </div>
                  <div className="text-[10px] font-mono text-slate-300">
                    {t.range}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
