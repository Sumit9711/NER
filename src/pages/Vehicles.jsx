import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck,
  Search,
  Filter,
  Eye,
  Navigation,
  GitFork,
  X,
  AlertTriangle,
  Clock,
  Shield,
  MapPin,
  CheckCircle2,
  AlertOctagon
} from 'lucide-react';
import { dashboardService } from '../services/dashboardService';
import { StatusBadge } from '../components/common/StatusBadge';
import { RiskBadge } from '../components/common/RiskBadge';

export const Vehicles = () => {
  const navigate = useNavigate();
  const vehicles = dashboardService.getVehicles();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedRerouteVehicle, setSelectedRerouteVehicle] = useState(null);
  const [rerouteConfirmed, setRerouteConfirmed] = useState(false);

  // Filter logic
  const filteredVehicles = vehicles.filter((v) => {
    const matchesSearch =
      v.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.commodity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.currentLocation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenReroute = (v) => {
    setSelectedRerouteVehicle(v);
    setRerouteConfirmed(false);
  };

  const handleConfirmReroute = () => {
    setRerouteConfirmed(true);
    setTimeout(() => {
      setSelectedRerouteVehicle(null);
      setRerouteConfirmed(false);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-slate-800/95 border-2 border-slate-700 rounded-xl p-5 shadow-lg flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-lg bg-blue-900 border border-blue-500 text-blue-300">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                Vehicle & Relief Convoy Monitoring
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-0.5">
                Real-time tracking of active fleets, driver telemetry, axle loads, and dynamic reroute controls
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-lg bg-blue-950 border border-blue-600 text-blue-200 text-xs font-black uppercase">
            {filteredVehicles.length} Units Enroute
          </span>
        </div>
      </div>

      {/* Search and Quick Filters Bar */}
      <div className="bg-slate-800/90 border-2 border-slate-700 rounded-xl p-4 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Vehicle ID, driver, commodity, or location..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border-2 border-slate-600 text-white rounded-lg text-xs sm:text-sm font-medium focus:border-blue-500 focus:outline-none placeholder-slate-500"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs font-bold">
          {['ALL', 'MOVING', 'STATIONARY', 'DELAYED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 rounded-lg border transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-blue-700 border-blue-500 text-white shadow'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-750'
              }`}
            >
              {st === 'ALL' ? 'All Vehicles' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop Table View (Hidden on mobile < md) */}
      <div className="hidden md:block bg-slate-800/95 border-2 border-slate-700 rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" aria-label="Vehicles Monitoring Table">
            <thead>
              <tr className="bg-slate-900 border-b-2 border-slate-700 text-xs font-black text-slate-300 uppercase tracking-wider">
                <th className="py-3.5 px-4">Vehicle ID</th>
                <th className="py-3.5 px-3">Status</th>
                <th className="py-3.5 px-4">Driver</th>
                <th className="py-3.5 px-4">Commodity</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-3">Speed</th>
                <th className="py-3.5 px-3">ETA</th>
                <th className="py-3.5 px-3">Delay</th>
                <th className="py-3.5 px-3">Route Risk</th>
                <th className="py-3.5 px-3">Last Updated</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/60 text-xs font-semibold text-slate-200">
              {filteredVehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-750 transition-colors">
                  {/* 1. Vehicle ID */}
                  <td className="py-3.5 px-4 font-mono font-black text-blue-300 whitespace-nowrap">
                    {v.id}
                  </td>

                  {/* 2. Status */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <StatusBadge status={v.status} size="normal" />
                  </td>

                  {/* 3. Driver */}
                  <td className="py-3.5 px-4 text-white font-bold whitespace-nowrap">
                    {v.driver}
                  </td>

                  {/* 4. Commodity */}
                  <td className="py-3.5 px-4 max-w-[180px]">
                    <span className="font-medium text-slate-100 line-clamp-1" title={v.commodity}>
                      {v.commodity}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{v.weight}</span>
                  </td>

                  {/* 5. Location */}
                  <td className="py-3.5 px-4 max-w-[180px]">
                    <span className="text-white font-semibold line-clamp-1" title={v.currentLocation}>
                      {v.currentLocation}
                    </span>
                    <span className="text-[10px] text-blue-300 block">{v.corridor}</span>
                  </td>

                  {/* 6. Speed */}
                  <td className="py-3.5 px-3 whitespace-nowrap font-bold text-white">
                    {v.speed}
                  </td>

                  {/* 7. ETA */}
                  <td className="py-3.5 px-3 whitespace-nowrap font-bold text-white">
                    {v.eta}
                  </td>

                  {/* 8. Delay */}
                  <td className="py-3.5 px-3 whitespace-nowrap font-black">
                    <span className={v.delay.includes('+') ? 'text-amber-400' : 'text-emerald-400'}>
                      {v.delay}
                    </span>
                  </td>

                  {/* 9. Route Risk */}
                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <RiskBadge level={v.routeRisk} size="normal" />
                  </td>

                  {/* 10. Last Updated */}
                  <td className="py-3.5 px-3 whitespace-nowrap text-slate-400 text-[11px]">
                    {v.lastUpdated}
                  </td>

                  {/* 11. Actions */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => navigate(`/vehicles/${v.id}`)}
                        className="px-2.5 py-1.5 bg-blue-700 hover:bg-blue-600 border border-blue-500 rounded text-white font-bold text-xs flex items-center gap-1 transition-all shadow-sm"
                        title={`View detailed dossier for ${v.id}`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>

                      <button
                        onClick={() => navigate(`/live-map?vehicleId=${v.id}`)}
                        className="px-2.5 py-1.5 bg-slate-750 hover:bg-slate-700 border border-slate-600 rounded text-slate-200 hover:text-white font-bold text-xs flex items-center gap-1 transition-all"
                        title={`Track ${v.id} live on GIS Map`}
                      >
                        <Navigation className="w-3.5 h-3.5 text-blue-400" />
                        <span>Track</span>
                      </button>

                      <button
                        onClick={() => handleOpenReroute(v)}
                        className="px-2.5 py-1.5 bg-cyan-950 hover:bg-cyan-900 border border-cyan-600 rounded text-cyan-200 font-bold text-xs flex items-center gap-1 transition-all"
                        title={`Evaluate reroute recommendation for ${v.id}`}
                      >
                        <GitFork className="w-3.5 h-3.5 text-cyan-300" />
                        <span>Reroute</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards View (Displayed on screens < md) */}
      <div className="block md:hidden space-y-4">
        {filteredVehicles.map((v) => (
          <div
            key={v.id}
            className="p-4 bg-slate-800/95 border-2 border-slate-700 rounded-xl shadow-md space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-700">
              <span className="font-mono text-base font-black text-blue-300">
                {v.id}
              </span>
              <StatusBadge status={v.status} size="normal" />
            </div>

            <div className="space-y-1 text-xs">
              <p className="text-white font-black text-sm">{v.name}</p>
              <p className="text-slate-300">Driver: <strong className="text-white">{v.driver}</strong></p>
              <p className="text-slate-300">Payload: <strong className="text-white">{v.commodity}</strong> ({v.weight})</p>
              <p className="text-slate-300">Location: <strong className="text-blue-300">{v.currentLocation}</strong></p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/80 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Live Speed</span>
                <strong className="text-white text-sm">{v.speed}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Estimated Arrival</span>
                <strong className="text-white text-sm">{v.eta}</strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Expected Delay</span>
                <strong className={v.delay.includes('+') ? 'text-amber-400' : 'text-emerald-400'}>
                  {v.delay}
                </strong>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Route Risk</span>
                <RiskBadge level={v.routeRisk} size="normal" />
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700">
              <button
                onClick={() => navigate(`/vehicles/${v.id}`)}
                className="py-2 px-2 bg-blue-700 hover:bg-blue-600 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View</span>
              </button>
              <button
                onClick={() => navigate(`/live-map?vehicleId=${v.id}`)}
                className="py-2 px-2 bg-slate-900 hover:bg-slate-750 border border-slate-700 rounded-lg text-slate-200 font-bold text-xs flex items-center justify-center gap-1"
              >
                <Navigation className="w-3.5 h-3.5 text-blue-400" />
                <span>Track</span>
              </button>
              <button
                onClick={() => handleOpenReroute(v)}
                className="py-2 px-2 bg-cyan-950 border border-cyan-600 rounded-lg text-cyan-200 font-bold text-xs flex items-center justify-center gap-1"
              >
                <GitFork className="w-3.5 h-3.5 text-cyan-300" />
                <span>Reroute</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reroute Modal with Safety Governance Rules */}
      {selectedRerouteVehicle && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <GitFork className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-black text-white uppercase">
                  Dynamic Route Reroute Directive
                </h2>
              </div>
              <button
                onClick={() => setSelectedRerouteVehicle(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-slate-300">
                Target Convoy: <strong className="text-white text-sm">{selectedRerouteVehicle.id}</strong> ({selectedRerouteVehicle.name})
              </p>
              <p className="text-slate-300">
                Current Corridor: <strong className="text-amber-300">{selectedRerouteVehicle.corridor}</strong>
              </p>
              <p className="text-slate-300">
                Destination: <strong className="text-white">{selectedRerouteVehicle.destination}</strong>
              </p>
            </div>

            <div className="p-3.5 bg-cyan-950/70 border-2 border-cyan-600 rounded-lg text-xs space-y-1.5">
              <span className="font-black text-cyan-300 uppercase block">
                Recommended Alternate Corridor:
              </span>
              <p className="text-white font-bold text-sm">
                Medziphema Bypass &rarr; Niuland &rarr; Kohima East Link
              </p>
              <div className="pt-1 text-slate-300 flex items-center justify-between">
                <span>Estimated Added Distance: <strong>+48 km</strong></span>
                <span className="text-amber-300 font-bold">Added Delay: +35 mins</span>
              </div>
            </div>

            {/* Governance Safety Alert */}
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Shield className="w-4 h-4" />
                <span>Command Safety Protocol NEC-2026:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Automated algorithmic rerouting is not applied autonomously. The authorized officer must manually confirm and dispatch coordinates to the pilot escort.
              </p>
            </div>

            {rerouteConfirmed ? (
              <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-lg text-emerald-200 text-xs font-bold text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Reroute Directive Transmitted to Convoy Pilot Escort</span>
              </div>
            ) : (
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setSelectedRerouteVehicle(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmReroute}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 border border-cyan-400 text-white rounded-lg text-xs font-black flex items-center gap-1.5 shadow"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Transmit Reroute</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
