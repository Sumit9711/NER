import React, { useState } from 'react';
import { PackageCheck, Plus, RefreshCw, Layers } from 'lucide-react';
import { DeliveryStatsCards } from '../components/deliveries/DeliveryStatsCards';
import { DeliveryTable } from '../components/deliveries/DeliveryTable';
import { DELIVERY_STATS } from '../data/deliveryData';

export const Deliveries = () => {
  const [lastSync, setLastSync] = useState('10:45 AM');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="bg-slate-800/90 border-2 border-slate-700 rounded-xl p-5 shadow-md flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <PackageCheck className="w-6 h-6 text-emerald-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Essential Deliveries & Consignment Manifest
            </h1>
          </div>
          <p className="text-sm font-semibold text-slate-300 mt-1">
            Tracking multi-priority commodities: Medicines, Food, Agricultural Produce, and Bailey bridge construction materials
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSync}
            disabled={isSyncing}
            className="min-h-[42px] px-3.5 py-2 rounded-lg bg-slate-750 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-black flex items-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sync Manifest ({lastSync})</span>
          </button>

          <button
            onClick={() => alert('Opening New Delivery Manifest requisition wizard...')}
            className="min-h-[42px] px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 border border-emerald-500 text-white text-xs font-black flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>New Delivery Manifest</span>
          </button>
        </div>
      </div>

      {/* 2. Delivery Summary Stats Cards */}
      <DeliveryStatsCards stats={DELIVERY_STATS} />

      {/* 3. 9-Column Deliveries Table with Category & Priority Filters */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-white uppercase tracking-wider">
            Consignment Tracking Registry
          </h2>
          <span className="text-xs text-slate-400 font-semibold">
            All 8 NER Transit Sectors
          </span>
        </div>

        <DeliveryTable />
      </div>
    </div>
  );
};
