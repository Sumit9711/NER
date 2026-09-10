import React from 'react';
import {
  Cpu,
  Zap,
  Radio,
  Users,
  Send,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  Clock,
  ShieldAlert,
  Smartphone,
  Bell,
  MessageSquare
} from 'lucide-react';
import { ALERT_ENGINE_CONFIG } from '../../data/alertData';

export const AlertEnginePanel = () => {
  const { primaryRule, rulesTable, statement, engineName } = ALERT_ENGINE_CONFIG;

  return (
    <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-5 sm:p-6 shadow-xl space-y-6">
      {/* 1. Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <Cpu className="w-5 h-5 text-purple-400" />
          <h2 className="text-lg font-black text-white uppercase tracking-tight">
            Deterministic Alert Engine & Escalation Pipeline
          </h2>
        </div>

        <span className="px-3 py-1 rounded bg-purple-950 border border-purple-500 text-purple-200 text-xs font-mono font-bold">
          {engineName}
        </span>
      </div>

      {/* 2. Core Rule Architecture Display (Exact User Specifications) */}
      <div className="bg-slate-950 border-2 border-slate-800 rounded-xl p-5 relative overflow-hidden">
        <div className="text-xs font-black uppercase tracking-wider text-purple-300 mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-purple-400" />
          <span>Active Primary Escalation Rule</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch">
          {/* 1. Trigger */}
          <div className="p-4 rounded-xl bg-slate-900 border-2 border-red-500/70 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-red-400 tracking-wider block mb-1">
                Trigger
              </span>
              <div className="font-mono text-base font-black text-white bg-slate-950 px-2.5 py-1.5 rounded border border-red-900/60 inline-block">
                {primaryRule.trigger}
              </div>
              <p className="text-[11px] text-slate-300 mt-2">
                Multi-factor hazard score computed from rainfall, slope shear, and sensor blockage.
              </p>
            </div>
            <span className="text-[10px] text-red-400 font-bold mt-2">
              Threshold: &gt; 80 / 100
            </span>
          </div>

          {/* 2. Action */}
          <div className="p-4 rounded-xl bg-slate-900 border-2 border-amber-500/70 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block mb-1">
                Action
              </span>
              <div className="font-mono text-base font-black text-amber-300 bg-slate-950 px-2.5 py-1.5 rounded border border-amber-900/60 inline-block">
                {primaryRule.action}
              </div>
              <p className="text-[11px] text-slate-300 mt-2">
                Immediate critical incident broadcast lock, convoy holding order, and reroute trigger.
              </p>
            </div>
            <span className="text-[10px] text-amber-400 font-bold mt-2">
              Execution: Zero-delay dispatch
            </span>
          </div>

          {/* 3. Recipients */}
          <div className="p-4 rounded-xl bg-slate-900 border-2 border-blue-500/70 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-blue-400 tracking-wider block mb-1">
                Recipients
              </span>
              <div className="space-y-1 mt-1">
                {primaryRule.recipients.map((rec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-950 px-2 py-1 rounded border border-slate-800"
                  >
                    <Users className="w-3 h-3 text-blue-400 shrink-0" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
            <span className="text-[10px] text-blue-400 font-bold mt-2">
              Audience: 3 Authorized Roles
            </span>
          </div>

          {/* 4. Channels */}
          <div className="p-4 rounded-xl bg-slate-900 border-2 border-emerald-500/70 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider block mb-1">
                Channels
              </span>
              <div className="space-y-1 mt-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                  <Bell className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>In-App (Central Command)</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                  <Smartphone className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Push (Driver Tablet)</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-slate-950 px-2 py-1 rounded border border-slate-800">
                  <MessageSquare className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>SMS (Disaster Cell Gateway)</span>
                </div>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold mt-2">
              Multi-cast Fallback Active
            </span>
          </div>
        </div>
      </div>

      {/* 3. Alert Lifecycle State Tracking: Created -> Sent -> Acknowledged */}
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>Alert Lifecycle State Progression</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {primaryRule.lifecycle.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-850 border-2 border-slate-700 rounded-xl p-4 relative"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase text-white tracking-wider flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">
                    {idx + 1}
                  </span>
                  <span>{step.step}</span>
                </span>
                <span className="font-mono text-xs font-bold text-cyan-300">
                  {step.time}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                {step.detail}
              </p>
              <div className="mt-3 pt-2 border-t border-slate-750 flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified State Transition</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Complete Deterministic Escalation Rules Table */}
      <div>
        <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
          Deterministic Escalation Rules Matrix (Zero Hallucination Ruleset)
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-[11px] font-black uppercase text-slate-400">
                <th className="p-3">Rule ID</th>
                <th className="p-3">Condition / Trigger</th>
                <th className="p-3">Action</th>
                <th className="p-3">Recipients</th>
                <th className="p-3">Channels</th>
                <th className="p-3">Escalation Window</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {rulesTable.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-800/50">
                  <td className="p-3 font-mono font-black text-cyan-400">
                    {rule.id}
                  </td>
                  <td className="p-3 font-bold text-white">
                    {rule.condition}
                  </td>
                  <td className="p-3 text-amber-300 font-semibold">
                    {rule.action}
                  </td>
                  <td className="p-3 text-slate-300">
                    {rule.recipients}
                  </td>
                  <td className="p-3 font-mono text-[11px] text-emerald-300">
                    {rule.channels}
                  </td>
                  <td className="p-3 text-slate-400">
                    {rule.escalationWindow}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
