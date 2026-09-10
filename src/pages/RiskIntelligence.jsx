import React, { useState } from 'react';
import { Activity, ShieldAlert, Cpu, Route, Sparkles, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { RiskScoreMeter } from '../components/risk/RiskScoreMeter';
import { RiskDistributionChart } from '../components/risk/RiskDistributionChart';
import { TopRiskCorridorsList } from '../components/risk/TopRiskCorridorsList';
import { DetailedRiskCard } from '../components/risk/DetailedRiskCard';
import { REGIONAL_RISK_OVERVIEW, TOP_RISK_CORRIDORS } from '../data/riskData';

export const RiskIntelligence = () => {
  const [selectedCorridor, setSelectedCorridor] = useState(null);
  const [lastRefreshed, setLastRefreshed] = useState('10:45 AM');

  const handleRefresh = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setLastRefreshed(timeStr);
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Header */}
      <div className="bg-slate-800/90 border-2 border-slate-700 rounded-xl p-5 shadow-md flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-purple-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Route Disruption Risk Intelligence
            </h1>
          </div>
          <p className="text-sm font-semibold text-slate-300 mt-1">
            Explainable AI decision support for arterial highway vulnerability, rainfall saturation, and geological hazards across NER
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="min-h-[42px] px-3.5 py-2 rounded-lg bg-slate-750 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-black flex items-center gap-2 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
            <span>Sync Telemetry ({lastRefreshed})</span>
          </button>

          <span className="px-3.5 py-2 rounded-lg bg-purple-950 border border-purple-500 text-purple-300 text-xs font-black flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-300 animate-pulse" />
            <span>NER-TerrainNet v3.4</span>
          </span>
        </div>
      </div>

      {/* 2. REGIONAL RISK OVERVIEW (Top Section) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-black text-white uppercase tracking-wider">
              REGIONAL RISK OVERVIEW
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
            Monsoon Saturation & Slope Stability Synthesis
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Overall Risk Score Meter Card */}
          <div className="lg:col-span-5 flex flex-col">
            <RiskScoreMeter
              score={REGIONAL_RISK_OVERVIEW.overallScore}
              max={REGIONAL_RISK_OVERVIEW.maxScore}
              label="Overall Regional Risk Score"
              showScale={true}
              size="large"
            />
          </div>

          {/* Risk Distribution Chart Card */}
          <div className="lg:col-span-7 flex flex-col">
            <RiskDistributionChart distribution={REGIONAL_RISK_OVERVIEW.distribution} />
          </div>
        </div>
      </div>

      {/* 3. Main Operational Content Grid: TOP RISK CORRIDORS & DETAILED RISK CARD */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Top Risk Corridors List */}
        <div className="xl:col-span-5 space-y-4">
          <TopRiskCorridorsList
            selectedCorridorId={selectedCorridor ? selectedCorridor.code : 'NH-6'}
            onSelectCorridor={(corr) => setSelectedCorridor(corr)}
          />

          {selectedCorridor && (
            <div className="text-right">
              <button
                onClick={() => setSelectedCorridor(null)}
                className="text-xs font-black text-blue-400 hover:text-blue-300 underline underline-offset-2"
              >
                ← Reset to Default Corridor (NH-6)
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Detailed Risk Card */}
        <div className="xl:col-span-7">
          <DetailedRiskCard selectedCorridor={selectedCorridor} />
        </div>
      </div>
    </div>
  );
};
