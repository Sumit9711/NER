import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertOctagon,
  Filter,
  Search,
  RotateCcw,
  Eye,
  MapPin,
  Clock,
  User,
  Plus,
  Radio,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { incidentService } from '../services/incidentService';
import { INCIDENT_STATUSES, INCIDENT_TYPES } from '../data/incidentData';
import { NER_DISTRICTS } from '../data/mapData';
import { StatusBadge } from '../components/common/StatusBadge';
import { RiskBadge } from '../components/common/RiskBadge';

export const Incidents = () => {
  const navigate = useNavigate();

  // Filters State
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [filterDistrict, setFilterDistrict] = useState('All Districts');
  const [filterType, setFilterType] = useState('All Types');
  const [filterStatus, setFilterStatus] = useState('All Statuses');
  const [filterDate, setFilterDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch filtered incidents
  const incidents = incidentService.getIncidents({
    severity: filterSeverity,
    district: filterDistrict,
    incidentType: filterType,
    status: filterStatus,
    date: filterDate
  }).filter((inc) => {
    if (!searchTerm) return true;
    return (
      inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inc.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleResetFilters = () => {
    setFilterSeverity('ALL');
    setFilterDistrict('All Districts');
    setFilterType('All Types');
    setFilterStatus('All Statuses');
    setFilterDate('');
    setSearchTerm('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-slate-800/95 border-2 border-slate-700 rounded-xl p-5 shadow-lg flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-lg bg-red-950 border border-red-600 text-red-400">
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                Incident & Roadblock Command Registry
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-0.5">
                Official verified reports, field officer submissions, and structural blockage assessments across NER
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/field-reports')}
            className="min-h-[44px] px-4 py-2 bg-red-700 hover:bg-red-600 border-2 border-red-500 text-white rounded-lg text-xs sm:text-sm font-black flex items-center gap-2 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Submit New Ground Report</span>
          </button>
        </div>
      </div>

      {/* Multi-Filter Bar */}
      <div className="bg-slate-800/90 border-2 border-slate-700 rounded-xl p-4 shadow-md space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-700">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white">
            <Filter className="w-4 h-4 text-blue-400" />
            <span>Incident Filters ({incidents.length} matching)</span>
          </div>

          <button
            onClick={handleResetFilters}
            className="text-xs font-bold text-blue-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 text-xs">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-[11px] font-black uppercase text-slate-400 mb-1">
              Search Incident
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <Search className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="ID, location, reporter..."
                className="w-full pl-8 pr-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white font-medium focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* 1. Severity */}
          <div>
            <label className="block text-[11px] font-black uppercase text-slate-400 mb-1">
              Severity
            </label>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg text-white font-bold px-2.5 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Severities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MODERATE">Moderate</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          {/* 2. District */}
          <div>
            <label className="block text-[11px] font-black uppercase text-slate-400 mb-1">
              District
            </label>
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg text-white font-bold px-2.5 py-2 focus:outline-none focus:border-blue-500 truncate"
            >
              {NER_DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* 3. Incident Type */}
          <div>
            <label className="block text-[11px] font-black uppercase text-slate-400 mb-1">
              Incident Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg text-white font-bold px-2.5 py-2 focus:outline-none focus:border-blue-500 truncate"
            >
              {INCIDENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* 4. Status */}
          <div>
            <label className="block text-[11px] font-black uppercase text-slate-400 mb-1">
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg text-white font-bold px-2.5 py-2 focus:outline-none focus:border-blue-500"
            >
              {INCIDENT_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-slate-800/95 border-2 border-slate-700 rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" aria-label="Incidents Registry Table">
            <thead>
              <tr className="bg-slate-900 border-b-2 border-slate-700 text-xs font-black text-slate-300 uppercase tracking-wider">
                <th className="py-3.5 px-4">Incident ID</th>
                <th className="py-3.5 px-3">Type</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-3">Severity</th>
                <th className="py-3.5 px-4">Reported By</th>
                <th className="py-3.5 px-3">Reported At</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4">Risk Impact</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-xs font-semibold text-slate-200">
              {incidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-750 transition-colors">
                  {/* Incident ID */}
                  <td className="py-3.5 px-4 font-mono font-black text-red-300 whitespace-nowrap">
                    {inc.id}
                  </td>

                  {/* Type */}
                  <td className="py-3.5 px-3 font-bold text-white whitespace-nowrap">
                    {inc.type}
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-4 max-w-[200px]">
                    <span className="font-semibold text-white line-clamp-1" title={inc.location}>
                      {inc.location}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{inc.district}</span>
                  </td>

                  {/* Severity */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <RiskBadge level={inc.severity} size="normal" />
                  </td>

                  {/* Reported By */}
                  <td className="py-3.5 px-4 text-slate-200 font-medium max-w-[170px] truncate" title={inc.reportedBy}>
                    {inc.reportedBy}
                  </td>

                  {/* Reported At */}
                  <td className="py-3.5 px-3 whitespace-nowrap text-slate-300 font-bold">
                    {inc.reportedAt}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider border ${
                      inc.status === 'Verified'
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-300'
                        : inc.status === 'Under Review'
                        ? 'bg-amber-950 border-amber-500 text-amber-300'
                        : inc.status === 'Resolved'
                        ? 'bg-blue-950 border-blue-500 text-blue-300'
                        : inc.status === 'Rejected'
                        ? 'bg-slate-900 border-slate-700 text-slate-500'
                        : 'bg-red-950 border-red-500 text-red-300 animate-pulse'
                    }`}>
                      {inc.status}
                    </span>
                  </td>

                  {/* Risk Impact */}
                  <td className="py-3.5 px-4 text-xs font-semibold text-slate-300 max-w-[200px] truncate" title={inc.riskImpact}>
                    {inc.riskImpact}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/incidents/${inc.id}`)}
                      className="px-3 py-1.5 bg-blue-700 hover:bg-blue-600 border border-blue-500 rounded text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm mx-auto"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Dossier</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="block md:hidden space-y-4">
        {incidents.map((inc) => (
          <div
            key={inc.id}
            className="p-4 bg-slate-800/95 border-2 border-slate-700 rounded-xl shadow-md space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <span className="font-mono text-base font-black text-red-400">
                {inc.id}
              </span>
              <RiskBadge level={inc.severity} size="normal" />
            </div>

            <div className="space-y-1 text-xs">
              <p className="text-white font-black text-base">{inc.type} &bull; {inc.location}</p>
              <p className="text-slate-300">Reporter: <strong className="text-white">{inc.reportedBy}</strong></p>
              <p className="text-slate-300">Time: <strong className="text-white">{inc.reportedAt}</strong></p>
              <p className="text-slate-300">Impact: <strong className="text-amber-300">{inc.riskImpact}</strong></p>
              <div className="pt-1 flex items-center gap-2">
                <span className="text-slate-400 font-bold">Status:</span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-900 text-white border border-slate-700">
                  {inc.status}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700">
              <button
                onClick={() => navigate(`/incidents/${inc.id}`)}
                className="w-full py-2 bg-blue-700 hover:bg-blue-600 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-1.5"
              >
                <Eye className="w-4 h-4" />
                <span>Open Incident Dossier</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
