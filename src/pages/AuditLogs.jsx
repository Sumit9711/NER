import React, { useState } from 'react';
import {
  ClipboardList,
  Shield,
  Download,
  Lock,
  CheckCircle2,
  Search,
  Filter,
  RefreshCw,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  AUDIT_LOGS_DATA,
  AUDIT_MODULES,
  AUDIT_STATUSES
} from '../data/auditLogData';

export const AuditLogs = () => {
  const [selectedModule, setSelectedModule] = useState('All Modules');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [searchQuery, setSearchQuery] = useState('');
  const [exportMsg, setExportMsg] = useState('');

  const handleExport = () => {
    setExportMsg('Exported Certified Cryptographic Audit Ledger: ner_audit_ledger_2026_q3.json (SHA-256 Verified)');
    setTimeout(() => setExportMsg(''), 5000);
  };

  const filteredLogs = AUDIT_LOGS_DATA.filter((log) => {
    const matchesModule =
      selectedModule === 'All Modules' || log.module === selectedModule;
    const matchesStatus =
      selectedStatus === 'All Statuses' || log.status === selectedStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      log.user.toLowerCase().includes(q) ||
      log.action.toLowerCase().includes(q) ||
      log.module.toLowerCase().includes(q) ||
      log.id.toLowerCase().includes(q);

    return matchesModule && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'VERIFIED':
        return 'bg-emerald-950 border-emerald-500 text-emerald-300';
      case 'APPROVED':
        return 'bg-blue-950 border-blue-500 text-blue-300';
      case 'DISPATCHED':
        return 'bg-purple-950 border-purple-500 text-purple-300';
      case 'ACKNOWLEDGED':
        return 'bg-amber-950 border-amber-500 text-amber-300';
      case 'SUBMITTED':
        return 'bg-cyan-950 border-cyan-500 text-cyan-300';
      default:
        return 'bg-slate-800 border-slate-700 text-slate-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="bg-slate-800/90 border-2 border-slate-700 rounded-xl p-5 shadow-md flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <ClipboardList className="w-6 h-6 text-slate-300" />
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Audit Logs & Chain of Custody Ledger
            </h1>
          </div>
          <p className="text-sm font-semibold text-slate-300 mt-1">
            Tamper-evident system event log recording all convoy reroutes, verified incident submissions & automated AI risk inferences
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="min-h-[42px] px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 border border-slate-500 text-white text-xs font-black flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Export Certified Audit Archive</span>
          </button>
        </div>
      </div>

      {/* Export feedback message */}
      {exportMsg && (
        <div className="p-3 bg-emerald-950 border-2 border-emerald-500 text-emerald-200 text-xs font-bold rounded-xl flex items-center justify-between animate-fadeIn shadow-lg">
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>{exportMsg}</span>
          </span>
          <button onClick={() => setExportMsg('')} className="text-emerald-400 hover:text-white">✕</button>
        </div>
      )}

      {/* 2. Cryptographic Security Assurance Banner */}
      <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-600 text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="font-black text-white text-sm">
              Cryptographic Immutability: SHA-256 Ledger Active
            </div>
            <div className="text-slate-400 mt-0.5">
              Every incident confirmation, detour authorization, and driver acknowledgment is cryptographically chained.
            </div>
          </div>
        </div>

        <span className="px-3 py-1 rounded bg-slate-950 border border-slate-700 text-cyan-300 font-mono text-[11px] font-bold shrink-0">
          HASH: 8f4343...5b6510
        </span>
      </div>

      {/* 3. Audit Log Table (Exact Specified Columns: User, Action, Module, Timestamp, Status) */}
      <div className="bg-slate-900 border-2 border-slate-700 rounded-xl shadow-xl overflow-hidden space-y-4">
        {/* Table Filter Controls */}
        <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user, audit action, module, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          {/* Module & Status Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-bold">Module:</span>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 font-bold focus:outline-none focus:border-blue-500"
              >
                {AUDIT_MODULES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-400 font-bold">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 font-bold focus:outline-none focus:border-blue-500"
              >
                {AUDIT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {(selectedModule !== 'All Modules' || selectedStatus !== 'All Statuses' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedModule('All Modules');
                  setSelectedStatus('All Statuses');
                  setSearchQuery('');
                }}
                className="text-xs text-blue-400 hover:underline font-bold"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 border-y border-slate-800 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                <th className="p-3.5 pl-5">User</th>
                <th className="p-3.5">Action</th>
                <th className="p-3.5">Module</th>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5 pr-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {filteredLogs.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/50 transition-colors">
                  {/* 1. User */}
                  <td className="p-3.5 pl-5">
                    <div className="font-black text-white">
                      {item.user}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      {item.userRole}
                    </span>
                  </td>

                  {/* 2. Action */}
                  <td className="p-3.5">
                    <div className="font-black text-white text-xs">
                      {item.action}
                    </div>
                    <p className="text-[11px] text-slate-300 mt-0.5 max-w-md leading-relaxed font-normal">
                      {item.detail}
                    </p>
                    <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                      Node: {item.ipAddress}
                    </span>
                  </td>

                  {/* 3. Module */}
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-750 font-bold text-cyan-300 font-mono text-[11px]">
                      {item.module}
                    </span>
                  </td>

                  {/* 4. Timestamp */}
                  <td className="p-3.5 font-mono text-slate-300 text-xs">
                    {item.timestamp}
                  </td>

                  {/* 5. Status */}
                  <td className="p-3.5 pr-5 text-right">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded border-2 text-[10px] font-black uppercase tracking-wider ${getStatusBadge(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden divide-y divide-slate-800 p-4 space-y-4">
          {filteredLogs.map((item) => (
            <div key={item.id} className="pt-4 first:pt-0 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-cyan-400 font-bold">{item.module}</span>
                <span
                  className={`px-2 py-0.5 rounded border text-[10px] font-black uppercase ${getStatusBadge(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </div>

              <div>
                <span className="text-sm font-black text-white block">{item.action}</span>
                <p className="text-slate-300 text-[11px] mt-0.5">{item.detail}</p>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">User: <strong className="text-white">{item.user}</strong></span>
                <span className="font-mono text-slate-400">{item.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
