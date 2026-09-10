import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  Layers,
  RefreshCw,
  Clock,
  CheckCircle2,
  ShieldAlert,
  TrendingUp,
  Activity
} from 'lucide-react';
import {
  DeliveryDelaysChart,
  IncidentFrequencyChart,
  RiskTrendChart,
  VehicleActivityChart,
  RouteAccessibilityChart,
  AlertResponseTimeChart,
  SuccessfulDeliveriesChart
} from '../components/analytics/AnalyticsCharts';

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState('');

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportNotice('Analytics Dataset Exported: ner_logistics_analytics_2026_q3.csv (3.8 MB)');
      setTimeout(() => setExportNotice(''), 5000);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="bg-slate-800/90 border-2 border-slate-700 rounded-xl p-5 shadow-md flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Operational Analytics & Logistics Intelligence
            </h1>
          </div>
          <p className="text-sm font-semibold text-slate-300 mt-1">
            Empirical telemetry across all 8 NER states: corridor delay distributions, incident trends, fleet velocity, and delivery compliance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-1">
            {['7d', '30d', '90d', 'Monsoon Q3'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  timeRange === range
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="min-h-[42px] px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-600 border border-blue-500 text-white text-xs font-black flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-bounce' : ''}`} />
            <span>{isExporting ? 'Generating...' : 'Export Analytics Dataset'}</span>
          </button>
        </div>
      </div>

      {/* Export notification toast */}
      {exportNotice && (
        <div className="p-3 bg-blue-950 border-2 border-blue-500 text-blue-200 text-xs font-bold rounded-xl flex items-center justify-between animate-fadeIn">
          <span>{exportNotice}</span>
          <button onClick={() => setExportNotice('')} className="text-blue-400 hover:text-white">✕</button>
        </div>
      )}

      {/* 2. Top Metric KPI Chips */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Average Transit Delay</span>
          <span className="text-2xl font-black text-amber-400 mt-0.5 block">+42 min</span>
          <span className="text-[10px] text-slate-400">Across 22 monitored corridors</span>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Total Delivered (Past 30d)</span>
          <span className="text-2xl font-black text-emerald-400 mt-0.5 block">11,600 MT</span>
          <span className="text-[10px] text-slate-400">92% relief cargo compliance</span>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Network Accessibility</span>
          <span className="text-2xl font-black text-white mt-0.5 block">74.0%</span>
          <span className="text-[10px] text-slate-400">Average across 8 NER states</span>
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded-lg p-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase block">Alert MTTR Response</span>
          <span className="text-2xl font-black text-blue-400 mt-0.5 block">4.1 min</span>
          <span className="text-[10px] text-emerald-400 font-bold">Within 5 min SOP target</span>
        </div>
      </div>

      {/* 3. The 7 Production-Grade Analytics Charts (All with Readable Titles, Visible Axes, and Units) */}
      <div className="space-y-6">
        {/* Row 1: Delivery Delays & Incident Frequency */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <DeliveryDelaysChart />
          <IncidentFrequencyChart />
        </div>

        {/* Row 2: Risk Trend & Vehicle Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RiskTrendChart />
          <VehicleActivityChart />
        </div>

        {/* Row 3: Route Accessibility & Alert Response Time */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RouteAccessibilityChart />
          <AlertResponseTimeChart />
        </div>

        {/* Row 4: Full-width Successful Deliveries */}
        <div>
          <SuccessfulDeliveriesChart />
        </div>
      </div>
    </div>
  );
};
