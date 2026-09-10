import React from 'react';
import {
  Truck,
  AlertOctagon,
  Route,
  PackageCheck,
  BellRing,
  ClockAlert
} from 'lucide-react';

const ICON_MAP = {
  Truck,
  AlertOctagon,
  Route,
  PackageCheck,
  BellRing,
  ClockAlert
};

export const MetricCard = ({
  title,
  value,
  subtext,
  badgeText,
  badgeType = 'blue',
  trend,
  iconName = 'Truck',
  accentColor = 'blue'
}) => {
  const IconComponent = ICON_MAP[iconName] || Truck;

  // High-contrast, accessibility-first theme maps
  const accentBorderMap = {
    blue: 'border-l-4 border-l-blue-500 border-slate-700 bg-slate-800/95',
    red: 'border-l-4 border-l-red-500 border-slate-700 bg-slate-800/95',
    amber: 'border-l-4 border-l-amber-500 border-slate-700 bg-slate-800/95',
    emerald: 'border-l-4 border-l-emerald-500 border-slate-700 bg-slate-800/95',
  };

  const iconStyleMap = {
    blue: 'bg-blue-950/80 text-blue-300 border-blue-700/80',
    red: 'bg-red-950/80 text-red-300 border-red-700/80',
    amber: 'bg-amber-950/80 text-amber-300 border-amber-700/80',
    emerald: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80',
  };

  const badgeStyleMap = {
    blue: 'bg-blue-950 border border-blue-600 text-blue-200',
    red: 'bg-red-950 border border-red-600 text-red-200 font-black animate-pulse',
    amber: 'bg-amber-950 border border-amber-600 text-amber-200',
    emerald: 'bg-emerald-950 border border-emerald-600 text-emerald-200',
  };

  const cardBorder = accentBorderMap[accentColor] || accentBorderMap.blue;
  const iconStyle = iconStyleMap[accentColor] || iconStyleMap.blue;
  const badgeStyle = badgeStyleMap[badgeType] || badgeStyleMap.blue;

  return (
    <div
      tabIndex={0}
      className={`p-5 rounded-xl border shadow-lg flex flex-col justify-between transition-all hover:border-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 ${cardBorder}`}
    >
      {/* Card Header: Title and Icon */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-300">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {value}
            </span>
          </div>
        </div>

        <div className={`p-3 rounded-xl border shrink-0 ${iconStyle}`} aria-hidden="true">
          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
      </div>

      {/* Subtext and Badge row */}
      <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between flex-wrap gap-2 text-xs sm:text-sm">
        <span className="font-bold text-slate-200">
          {subtext}
        </span>

        {badgeText && (
          <span className={`px-2.5 py-1 rounded text-[11px] font-black uppercase tracking-wider ${badgeStyle}`}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
};
