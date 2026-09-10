import React from 'react';
import { CloudRain, Wind, Eye, Thermometer, ShieldAlert } from 'lucide-react';
import { RiskBadge } from '../common/RiskBadge';

export const WeatherConditionsSection = ({ weather }) => {
  return (
    <div className="bg-slate-800/90 border-2 border-slate-700 rounded-xl shadow-lg overflow-hidden space-y-3">
      <div className="p-4 sm:p-5 bg-slate-850 border-b-2 border-slate-700 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-600 text-cyan-400">
            <CloudRain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
              Regional Weather & Hill Road Conditions
            </h2>
            <p className="text-xs text-slate-300 font-medium">
              IMD Doppler radar feeds & mountain pass visibility sensors
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-md bg-cyan-950 border border-cyan-700 text-cyan-200 text-xs font-black uppercase">
          8 NER Telemetry Stations
        </span>
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
        {weather.map((st, idx) => (
          <div
            key={idx}
            className="p-3.5 bg-slate-900/90 border-2 border-slate-700/80 rounded-xl space-y-2 hover:border-slate-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-xs font-bold text-blue-300 truncate">{st.state}</span>
                <RiskBadge level={st.risk} size="normal" />
              </div>
              <p className="text-sm font-black text-white leading-tight">{st.station}</p>
              <p className="text-xs text-amber-300 font-semibold mt-0.5">{st.condition}</p>
            </div>

            <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="font-bold text-white">{st.rainfallMm}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{st.visibility}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Thermometer className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>{st.temp}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{st.wind}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
