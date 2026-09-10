import React from 'react';
import { CloudRain, AlertTriangle, ShieldCheck, Mountain } from 'lucide-react';
import { TERRAIN_WEATHER_RADAR } from '../../data/mockDashboardData';
import { getHazardLevelClass } from '../../utils/statusColors';

export const WeatherRiskPanel = () => {
  return (
    <div className="bg-slate-800/90 border-2 border-slate-700 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-slate-850 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mountain className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-black text-white uppercase tracking-wider">
            Terrain Vulnerability & Weather Radar
          </h2>
        </div>
        <span className="text-xs font-bold text-amber-300 bg-amber-950 border border-amber-800 px-2.5 py-1 rounded">
          Precipitation Saturation Alert
        </span>
      </div>

      <div className="p-4 space-y-3">
        {TERRAIN_WEATHER_RADAR.map((item, idx) => (
          <div
            key={idx}
            className="p-3 bg-slate-900/80 rounded-lg border border-slate-700/80 flex items-center justify-between gap-4 flex-wrap"
          >
            <div className="min-w-0">
              <p className="font-bold text-white text-sm">
                {item.region}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-slate-300 flex-wrap">
                <span className="flex items-center gap-1 font-semibold text-blue-300">
                  <CloudRain className="w-3.5 h-3.5" />
                  {item.rainfallMm}
                </span>
                <span>&bull;</span>
                <span>Slope Stability: <strong className="text-slate-200">{item.slopeStability}</strong></span>
                <span>&bull;</span>
                <span className="text-amber-300 font-medium">{item.vulnerableBridges} bridges under watch</span>
              </div>
            </div>

            <div className="shrink-0">
              <span className={`px-2.5 py-1 rounded text-xs border ${getHazardLevelClass(item.riskLevel)}`}>
                {item.riskLevel.toUpperCase()} HAZARD
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
