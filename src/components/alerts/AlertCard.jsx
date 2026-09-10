import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertOctagon,
  AlertTriangle,
  AlertCircle,
  Clock,
  Truck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Route,
  Check
} from 'lucide-react';

export const AlertCard = ({ alert, onAcknowledge }) => {
  const [isAcked, setIsAcked] = useState(alert.status === 'ACKNOWLEDGED' || alert.status === 'RESOLVED');
  const [ackedTime, setAckedTime] = useState(alert.acknowledgedAt || null);

  const handleAck = () => {
    setIsAcked(true);
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' IST';
    setAckedTime(nowStr);
    if (onAcknowledge) onAcknowledge(alert.id);
  };

  const isCritical = alert.severity === 'CRITICAL';
  const isHigh = alert.severity === 'HIGH';

  const getBorderColor = () => {
    if (isCritical) return 'border-red-500 ring-2 ring-red-500/20';
    if (isHigh) return 'border-amber-500';
    if (alert.severity === 'MEDIUM') return 'border-yellow-500';
    return 'border-emerald-500';
  };

  const getSeverityBadgeClass = () => {
    if (isCritical) return 'bg-red-950 border-red-500 text-red-200 animate-pulse';
    if (isHigh) return 'bg-amber-950 border-amber-500 text-amber-200';
    if (alert.severity === 'MEDIUM') return 'bg-yellow-950 border-yellow-500 text-yellow-200';
    return 'bg-emerald-950 border-emerald-500 text-emerald-200';
  };

  return (
    <div className={`bg-slate-900 border-2 rounded-xl p-5 shadow-xl transition-all ${getBorderColor()}`}>
      {/* Top Header: Severity + Timestamp */}
      <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-md border-2 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${getSeverityBadgeClass()}`}>
            {isCritical ? <AlertOctagon className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>{alert.severity}</span>
          </span>
          <span className="font-mono text-xs text-slate-400 font-bold bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
            {alert.id}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>{alert.timestamp}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-black text-white mb-2 leading-snug">
        {alert.title}
      </h3>

      {/* Corridor location */}
      <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-3">
        <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <span className="font-semibold">{alert.corridor}</span>
      </div>

      {/* Grid: Affected Vehicle + Potential Delay */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/80 p-3.5 rounded-lg border border-slate-800 mb-3 text-xs">
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">
            Affected Vehicle
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono text-sm font-black text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-700">
              {alert.affectedVehicle}
            </span>
            <Link
              to={`/vehicles/${alert.affectedVehicle}`}
              className="text-[11px] text-blue-400 hover:underline flex items-center gap-0.5 font-bold"
            >
              <span>Dossier</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">
            Potential Delay
          </span>
          <div className="font-mono text-base font-black text-red-400 mt-0.5">
            {alert.potentialDelay}
          </div>
        </div>
      </div>

      {/* Recommended Action */}
      <div className="bg-slate-850 p-3 rounded-lg border border-slate-750 mb-4 text-xs">
        <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block mb-0.5">
          Recommended Action:
        </span>
        <p className="text-sm font-black text-white">
          {alert.recommendedAction}
        </p>
        {alert.recommendedRoute && (
          <p className="text-xs text-emerald-300 font-medium mt-1 flex items-center gap-1">
            <Route className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Assigned Corridor: <strong>{alert.recommendedRoute}</strong></span>
          </p>
        )}
      </div>

      {/* Trigger Source & Ack Status */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 mb-4 flex-wrap gap-2">
        <span>Trigger: <strong className="text-slate-300">{alert.triggerSource}</strong></span>
        {isAcked ? (
          <span className="text-emerald-400 font-black flex items-center gap-1 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Acknowledged ({ackedTime || alert.acknowledgedAt || 'Officer Active'})</span>
          </span>
        ) : (
          <span className="text-amber-400 font-bold bg-amber-950 px-2 py-0.5 rounded border border-amber-600">
            Awaiting Command Acknowledgment
          </span>
        )}
      </div>

      {/* 3 User-Specified Buttons: View Incident | View Route | Acknowledge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          {alert.incidentId && (
            <Link
              to={`/incidents/${alert.incidentId}`}
              className="min-h-[40px] px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-black flex items-center gap-1.5 transition-all active:scale-95"
            >
              <span>View Incident</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}

          <Link
            to="/route-recommendations"
            className="min-h-[40px] px-3.5 py-2 rounded-lg bg-cyan-750 hover:bg-cyan-600 border border-cyan-500 text-white text-xs font-black flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <Route className="w-3.5 h-3.5" />
            <span>View Route</span>
          </Link>
        </div>

        <button
          onClick={handleAck}
          disabled={isAcked}
          className={`min-h-[40px] px-4 py-2 rounded-lg text-xs font-black flex items-center gap-1.5 transition-all shadow active:scale-95 ${
            isAcked
              ? 'bg-emerald-950 border border-emerald-600 text-emerald-300 cursor-default'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          {isAcked ? <Check className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          <span>{isAcked ? 'Acknowledged' : 'Acknowledge'}</span>
        </button>
      </div>
    </div>
  );
};
