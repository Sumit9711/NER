import React from 'react';
import { History, CheckCircle2, ShieldCheck, Clock, Layers } from 'lucide-react';
import { ALERT_HISTORY_LOGS } from '../../data/alertData';

export const AlertHistoryTable = () => {
  return (
    <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-5 shadow-lg space-y-3">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-blue-400" />
          <h3 className="text-sm font-black text-white uppercase tracking-wider">
            Alert Resolution & Acknowledgment History
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-semibold">
          Immutable Audit Log (Past 48 Hours)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950 border-b border-slate-800 text-[11px] font-black uppercase text-slate-400">
              <th className="p-3">Alert ID</th>
              <th className="p-3">Incident / Title</th>
              <th className="p-3">Corridor</th>
              <th className="p-3">Severity</th>
              <th className="p-3">Trigger Condition</th>
              <th className="p-3">Channels</th>
              <th className="p-3">Timeline (Created &rarr; Acked)</th>
              <th className="p-3">Action Taken</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-medium">
            {ALERT_HISTORY_LOGS.map((log) => (
              <tr key={log.alertId} className="hover:bg-slate-800/50 transition-colors">
                <td className="p-3 font-mono font-black text-cyan-400">
                  {log.alertId}
                </td>
                <td className="p-3 font-bold text-white max-w-[200px] truncate">
                  {log.title}
                </td>
                <td className="p-3 font-mono text-slate-300">
                  {log.corridor}
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    log.severity === 'CRITICAL'
                      ? 'bg-red-950 border border-red-500 text-red-200'
                      : log.severity === 'HIGH'
                      ? 'bg-amber-950 border border-amber-500 text-amber-200'
                      : 'bg-blue-950 border border-blue-500 text-blue-200'
                  }`}>
                    {log.severity}
                  </span>
                </td>
                <td className="p-3 text-slate-300">
                  {log.trigger}
                </td>
                <td className="p-3 font-mono text-[11px] text-slate-400">
                  {log.channels}
                </td>
                <td className="p-3">
                  <div className="text-slate-400 text-[11px]">
                    Created: <span className="text-slate-200">{log.created}</span>
                  </div>
                  <div className="text-emerald-400 text-[11px] font-bold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Acked: {log.acknowledged} by {log.acknowledgedBy}</span>
                  </div>
                </td>
                <td className="p-3 text-slate-300 text-[11px] max-w-xs">
                  {log.actionTaken}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
