import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock,
  AlertTriangle,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Database,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ETA_VEHICLES_DATA } from '../../data/etaDelaysData';

export const ETAMonitoringTable = ({ onSelectVehicle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');

  const filteredVehicles = ETA_VEHICLES_DATA.filter((v) => {
    const matchesSearch =
      v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.corridor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity =
      severityFilter === 'ALL' || v.severity === severityFilter;

    return matchesSearch && matchesSeverity;
  });

  const getDelayBadgeClass = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-950 border-red-600 text-red-200';
      case 'HIGH':
        return 'bg-amber-950 border-amber-600 text-amber-200';
      case 'MEDIUM':
        return 'bg-yellow-950 border-yellow-600 text-yellow-200';
      default:
        return 'bg-emerald-950 border-emerald-600 text-emerald-200';
    }
  };

  const getQualityBadgeClass = (level) => {
    switch (level) {
      case 'HIGH':
        return 'bg-emerald-950/80 border-emerald-600 text-emerald-300';
      case 'MODERATE':
        return 'bg-amber-950/80 border-amber-600 text-amber-300';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  return (
    <div className="bg-slate-900 border-2 border-slate-700 rounded-xl shadow-xl overflow-hidden">
      {/* Table Controls */}
      <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search vehicle ID (e.g. MED-07), driver, corridor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-semibold"
          />
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-300">Severity:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((s) => (
              <button
                key={s}
                onClick={() => setSeverityFilter(s)}
                className={`px-2.5 py-1 rounded text-xs font-black transition-all ${
                  severityFilter === s
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Table View (Hidden on mobile < md) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-black uppercase text-slate-400 tracking-wider">
              <th className="p-3.5 pl-5">Vehicle</th>
              <th className="p-3.5">Normal ETA</th>
              <th className="p-3.5">Predicted ETA</th>
              <th className="p-3.5">Expected Delay</th>
              <th className="p-3.5">Reason(s)</th>
              <th className="p-3.5">Data Quality</th>
              <th className="p-3.5 text-right pr-5">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-medium">
            {filteredVehicles.map((v) => {
              const isTargetMed07 = v.id === 'MED-07';

              return (
                <tr
                  key={v.id}
                  className={`hover:bg-slate-800/60 transition-colors ${
                    isTargetMed07 ? 'bg-blue-950/20' : ''
                  }`}
                >
                  {/* 1. Vehicle */}
                  <td className="p-3.5 pl-5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        {v.id}
                      </span>
                      {isTargetMed07 && (
                        <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-blue-900 text-blue-200 border border-blue-500">
                          Primary Target
                        </span>
                      )}
                    </div>
                    <div className="text-slate-300 font-bold mt-1 truncate max-w-[200px]">
                      {v.vehicleName}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5">
                      <span className="text-cyan-400 font-mono">{v.corridor}</span>
                      <span>&bull;</span>
                      <span className="truncate">{v.commodity}</span>
                    </div>
                  </td>

                  {/* 2. Normal ETA */}
                  <td className="p-3.5">
                    <div className="font-mono text-sm font-black text-slate-300">
                      {v.normalEta}
                    </div>
                    <span className="text-[10px] text-slate-400">Scheduled</span>
                  </td>

                  {/* 3. Predicted ETA */}
                  <td className="p-3.5">
                    <div className="font-mono text-sm font-black text-amber-300">
                      {v.predictedEta}
                    </div>
                    <span className="text-[10px] text-slate-400">AI Stochastic Model</span>
                  </td>

                  {/* 4. Expected Delay */}
                  <td className="p-3.5">
                    <span
                      className={`inline-block px-2.5 py-1 rounded border-2 font-mono text-xs font-black tracking-wide ${getDelayBadgeClass(
                        v.severity
                      )}`}
                    >
                      {v.expectedDelay}
                    </span>
                  </td>

                  {/* 5. Reasons */}
                  <td className="p-3.5 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {v.reasons.map((reason, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200 text-[11px] font-medium"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* 6. Data Quality */}
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold border ${getQualityBadgeClass(
                          v.dataQualityLevel
                        )}`}
                      >
                        <Database className="w-3 h-3 text-emerald-400" />
                        <span>{v.dataQuality}</span>
                      </span>
                    </div>
                  </td>

                  {/* 7. Action */}
                  <td className="p-3.5 text-right pr-5">
                    <Link
                      to={`/vehicles/${v.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-xs font-black transition-all shadow"
                    >
                      <span>Track</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View (Visible on screens < md) */}
      <div className="md:hidden divide-y divide-slate-800 p-4 space-y-4">
        {filteredVehicles.map((v) => (
          <div key={v.id} className="pt-4 first:pt-0 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-white bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
                  {v.id}
                </span>
                <span className="text-xs font-bold text-white truncate">
                  {v.vehicleName}
                </span>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded border font-mono text-xs font-black ${getDelayBadgeClass(
                  v.severity
                )}`}
              >
                {v.expectedDelay}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Normal ETA
                </span>
                <span className="font-mono font-black text-slate-300">
                  {v.normalEta}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">
                  Predicted ETA
                </span>
                <span className="font-mono font-black text-amber-400">
                  {v.predictedEta}
                </span>
              </div>
            </div>

            {/* Reasons */}
            <div>
              <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">
                Delay Reasons:
              </span>
              <div className="flex flex-wrap gap-1">
                {v.reasons.map((r, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 text-[11px]"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Quality */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                <Database className="w-3 h-3" />
                {v.dataQuality}
              </span>

              <Link
                to={`/vehicles/${v.id}`}
                className="text-blue-400 font-bold hover:underline flex items-center gap-1"
              >
                <span>Track Convoy</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
