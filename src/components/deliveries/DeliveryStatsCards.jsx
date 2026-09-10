import React from 'react';
import { Package, ShieldAlert, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';
import { DELIVERY_STATS } from '../../data/deliveryData';

export const DeliveryStatsCards = ({ stats = DELIVERY_STATS }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Total Tonnage In-Transit */}
      <div className="bg-slate-900/90 border-2 border-slate-700 rounded-xl p-4 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Total In-Transit Tonnage
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-white">
              {stats.totalTonnageInTransit}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Across all 4 priority commodity streams
          </p>
        </div>
        <div className="p-3 rounded-lg bg-blue-950 border border-blue-600/50 text-blue-400">
          <Package className="w-6 h-6" />
        </div>
      </div>

      {/* 2. Critical Priority Requisitions */}
      <div className="bg-slate-900/90 border-2 border-slate-700 rounded-xl p-4 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Critical Priority Convoys
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-red-400">
              {stats.criticalPriorityCount}
            </span>
            <span className="text-xs text-red-300 font-semibold">convoys</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Life-saving medicines & emergency grain
          </p>
        </div>
        <div className="p-3 rounded-lg bg-red-950 border border-red-600/50 text-red-400">
          <ShieldAlert className="w-6 h-6" />
        </div>
      </div>

      {/* 3. High Priority Consignments */}
      <div className="bg-slate-900/90 border-2 border-slate-700 rounded-xl p-4 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            High Priority Consignments
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-amber-400">
              {stats.highPriorityCount}
            </span>
            <span className="text-xs text-amber-300 font-semibold">convoys</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Bailey bridges & POL fuel tankers
          </p>
        </div>
        <div className="p-3 rounded-lg bg-amber-950 border border-amber-600/50 text-amber-400">
          <AlertTriangle className="w-6 h-6" />
        </div>
      </div>

      {/* 4. On-Time Delivery Rate */}
      <div className="bg-slate-900/90 border-2 border-slate-700 rounded-xl p-4 shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Delivery Compliance Rate
          </span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-black text-emerald-400">
              {stats.onTimeDeliveryRate}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {stats.deliveredThisWeek} completed this week
          </p>
        </div>
        <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-600/50 text-emerald-400">
          <CheckCircle2 className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
