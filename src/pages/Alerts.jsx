import React, { useState } from 'react';
import { Bell, ShieldAlert, Radio, Filter, RefreshCw, Cpu, Layers } from 'lucide-react';
import { AlertCard } from '../components/alerts/AlertCard';
import { AlertEnginePanel } from '../components/alerts/AlertEnginePanel';
import { AlertHistoryTable } from '../components/alerts/AlertHistoryTable';
import { ALERT_TABS, ACTIVE_ALERTS_DATA } from '../data/alertData';

export const Alerts = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [alertsList, setAlertsList] = useState(ACTIVE_ALERTS_DATA);
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastMsg, setBroadcastMsg] = useState('');

  const handleAcknowledgeAlert = (id) => {
    setAlertsList((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: 'ACKNOWLEDGED',
              acknowledgedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST'
            }
          : a
      )
    );
  };

  const handleBroadcast = () => {
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastMsg('Emergency Broadcast Transmitted: Alert ALT-1042 dispatched to all 8 NER State Disaster Operations Cells.');
      setTimeout(() => setBroadcastMsg(''), 5000);
    }, 600);
  };

  const filteredAlerts = alertsList.filter((a) => {
    if (activeTab === 'All') return true;
    return a.severity.toLowerCase() === activeTab.toLowerCase();
  });

  const getTabCount = (tab) => {
    if (tab === 'All') return alertsList.length;
    return alertsList.filter((a) => a.severity.toLowerCase() === tab.toLowerCase()).length;
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="bg-slate-800/90 border-2 border-slate-700 rounded-xl p-5 shadow-md flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <Bell className="w-6 h-6 text-red-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Emergency Alerts & Alert Engine
            </h1>
          </div>
          <p className="text-sm font-semibold text-slate-300 mt-1">
            Deterministic hazard notifications, convoy detour broadcasts, and multi-channel escalation for NER logistics corridors
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleBroadcast}
            disabled={isBroadcasting}
            className="min-h-[42px] px-4 py-2 rounded-lg bg-red-700 hover:bg-red-600 border border-red-500 text-white text-xs font-black flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50"
          >
            <Radio className={`w-3.5 h-3.5 ${isBroadcasting ? 'animate-spin' : 'animate-pulse'}`} />
            <span>{isBroadcasting ? 'Broadcasting...' : 'Broadcast Emergency Notice'}</span>
          </button>
        </div>
      </div>

      {/* Broadcast confirmation toast if triggered */}
      {broadcastMsg && (
        <div className="p-3 bg-red-950 border-2 border-red-500 text-red-200 text-xs font-bold rounded-xl flex items-center justify-between animate-fadeIn">
          <span>{broadcastMsg}</span>
          <button onClick={() => setBroadcastMsg('')} className="text-red-400 hover:text-white">✕</button>
        </div>
      )}

      {/* 2. Filter Tabs: All, Critical, High, Medium, Low */}
      <div className="bg-slate-900/90 border-2 border-slate-700 rounded-xl p-3 shadow-md flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-black text-slate-300 uppercase tracking-wider">
            Severity Filter:
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {ALERT_TABS.map((tab) => {
            const count = getTabCount(tab);
            const isCurrent = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all flex items-center gap-2 ${
                  isCurrent
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    isCurrent ? 'bg-red-800 text-white' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Active Alerts Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-black text-white uppercase tracking-wider">
            Active Alerts Feed ({filteredAlerts.length})
          </h2>
          <span className="text-xs text-slate-400 font-semibold">
            Showing {activeTab} Priority Advisories
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onAcknowledge={handleAcknowledgeAlert}
            />
          ))}
        </div>
      </div>

      {/* 4. ALERT ENGINE Architecture Panel */}
      <AlertEnginePanel />

      {/* 5. Alert History Table */}
      <AlertHistoryTable />
    </div>
  );
};
