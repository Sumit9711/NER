import React from 'react';
import { StatusBadge } from './StatusBadge';

export const StatCard = ({
  title,
  value,
  unit,
  subtext,
  trend,
  status,
  icon: Icon,
  accentColor = 'blue'
}) => {
  const accentBorderMap = {
    blue: 'border-l-4 border-l-blue-500 border-slate-700/80 bg-slate-800/90',
    red: 'border-l-4 border-l-red-500 border-slate-700/80 bg-slate-800/90',
    emerald: 'border-l-4 border-l-emerald-500 border-slate-700/80 bg-slate-800/90',
    amber: 'border-l-4 border-l-amber-500 border-slate-700/80 bg-slate-800/90',
  };

  const iconBgMap = {
    blue: 'bg-blue-900/60 text-blue-300 border-blue-700/50',
    red: 'bg-red-900/60 text-red-300 border-red-700/50',
    emerald: 'bg-emerald-900/60 text-emerald-300 border-emerald-700/50',
    amber: 'bg-amber-900/60 text-amber-300 border-amber-700/50',
  };

  const cardBorder = accentBorderMap[accentColor] || accentBorderMap.blue;
  const iconStyle = iconBgMap[accentColor] || iconBgMap.blue;

  return (
    <div className={`p-5 rounded-lg border shadow-md flex flex-col justify-between transition-all ${cardBorder}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-slate-300">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl lg:text-4xl font-black tracking-tight text-white">
              {value}
            </span>
            {unit && (
              <span className="text-base font-semibold text-slate-300">
                {unit}
              </span>
            )}
          </div>
        </div>

        {Icon && (
          <div className={`p-3 rounded-lg border shrink-0 ${iconStyle}`} aria-hidden="true">
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between flex-wrap gap-2 text-sm">
        <span className="text-slate-300 font-medium">{subtext}</span>
        <div className="flex items-center gap-2">
          {trend && (
            <span className="font-semibold text-slate-200 bg-slate-700/70 px-2 py-0.5 rounded text-xs">
              {trend}
            </span>
          )}
          {status && <StatusBadge status={status} size="normal" />}
        </div>
      </div>
    </div>
  );
};
