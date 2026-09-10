import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Package,
  Truck,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import {
  DELIVERIES_DATA,
  DELIVERY_CATEGORIES,
  DELIVERY_PRIORITIES,
  DELIVERY_STATUSES
} from '../../data/deliveryData';

export const DeliveryTable = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDeliveries = DELIVERIES_DATA.filter((d) => {
    const matchesCategory =
      selectedCategory === 'All Categories' || d.category === selectedCategory;

    const matchesPriority =
      selectedPriority === 'All Priorities' || d.priority === selectedPriority;

    const matchesStatus =
      selectedStatus === 'All Statuses' || d.status === selectedStatus;

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      d.deliveryId.toLowerCase().includes(query) ||
      d.vehicle.toLowerCase().includes(query) ||
      d.commodity.toLowerCase().includes(query) ||
      d.origin.toLowerCase().includes(query) ||
      d.destination.toLowerCase().includes(query);

    return matchesCategory && matchesPriority && matchesStatus && matchesSearch;
  });

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'CRITICAL':
        return 'bg-red-950 border-red-500 text-red-200';
      case 'HIGH':
        return 'bg-amber-950 border-amber-500 text-amber-200';
      default:
        return 'bg-blue-950 border-blue-500 text-blue-200';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-emerald-950 border-emerald-500 text-emerald-200';
      case 'DELAYED':
        return 'bg-red-950 border-red-500 text-red-200';
      case 'PENDING_CLEARANCE':
        return 'bg-amber-950 border-amber-500 text-amber-200';
      default:
        return 'bg-blue-950 border-blue-500 text-blue-200';
    }
  };

  return (
    <div className="bg-slate-900 border-2 border-slate-700 rounded-xl shadow-xl overflow-hidden space-y-4">
      {/* Category Tabs */}
      <div className="p-4 bg-slate-800/90 border-b border-slate-700 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-300">
            Commodity Category:
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {DELIVERY_CATEGORIES.map((cat) => {
            const isCurrent = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                  isCurrent
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-750'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Controls & Search */}
      <div className="px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-[240px] max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search delivery ID, commodity, origin, destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 font-semibold"
          />
        </div>

        {/* Priority & Status Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-bold">Priority:</span>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 font-bold focus:outline-none focus:border-emerald-500"
            >
              {DELIVERY_PRIORITIES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-bold">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 font-bold focus:outline-none focus:border-emerald-500"
            >
              {DELIVERY_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {(selectedCategory !== 'All Categories' || selectedPriority !== 'All Priorities' || selectedStatus !== 'All Statuses' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('All Categories');
                setSelectedPriority('All Priorities');
                setSelectedStatus('All Statuses');
                setSearchQuery('');
              }}
              className="text-xs text-blue-400 hover:underline font-bold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table View (9 User-Specified Columns) */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-950 border-y border-slate-800 text-[11px] font-black uppercase text-slate-400 tracking-wider">
              <th className="p-3 pl-5">Delivery ID</th>
              <th className="p-3">Vehicle</th>
              <th className="p-3">Commodity</th>
              <th className="p-3">Origin</th>
              <th className="p-3">Destination</th>
              <th className="p-3">Status</th>
              <th className="p-3">ETA</th>
              <th className="p-3">Delay</th>
              <th className="p-3 pr-5 text-right">Priority</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-medium">
            {filteredDeliveries.map((d) => (
              <tr key={d.deliveryId} className="hover:bg-slate-800/50 transition-colors">
                {/* 1. Delivery ID */}
                <td className="p-3 pl-5 font-mono font-black text-cyan-300">
                  {d.deliveryId}
                </td>

                {/* 2. Vehicle */}
                <td className="p-3">
                  <Link
                    to={`/vehicles/${d.vehicle}`}
                    className="font-mono font-black text-white hover:text-blue-400 flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 w-fit"
                  >
                    <span>{d.vehicle}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                  </Link>
                </td>

                {/* 3. Commodity */}
                <td className="p-3">
                  <div className="font-bold text-white truncate max-w-[190px]">
                    {d.commodity}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {d.category} ({d.weight})
                  </span>
                </td>

                {/* 4. Origin */}
                <td className="p-3 text-slate-300 truncate max-w-[150px]">
                  {d.origin}
                </td>

                {/* 5. Destination */}
                <td className="p-3 text-slate-300 truncate max-w-[150px]">
                  {d.destination}
                </td>

                {/* 6. Status */}
                <td className="p-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded border text-[10px] font-black uppercase ${getStatusBadge(
                      d.status
                    )}`}
                  >
                    {d.status.replace('_', ' ')}
                  </span>
                </td>

                {/* 7. ETA */}
                <td className="p-3 font-mono font-bold text-slate-200">
                  {d.eta}
                </td>

                {/* 8. Delay */}
                <td className="p-3">
                  <span
                    className={`font-mono text-xs font-black ${
                      d.delayMinutes > 60
                        ? 'text-red-400'
                        : d.delayMinutes > 0
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  >
                    {d.delay}
                  </span>
                </td>

                {/* 9. Priority */}
                <td className="p-3 pr-5 text-right">
                  <span
                    className={`inline-block px-2.5 py-1 rounded border-2 text-[10px] font-black uppercase tracking-wider ${getPriorityBadge(
                      d.priority
                    )}`}
                  >
                    {d.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards View (Visible on screens < lg) */}
      <div className="lg:hidden divide-y divide-slate-800 p-4 space-y-4">
        {filteredDeliveries.map((d) => (
          <div key={d.deliveryId} className="pt-4 first:pt-0 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {d.deliveryId}
                </span>
                <Link
                  to={`/vehicles/${d.vehicle}`}
                  className="font-mono text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700"
                >
                  {d.vehicle}
                </Link>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded border text-[10px] font-black uppercase ${getPriorityBadge(
                  d.priority
                )}`}
              >
                {d.priority}
              </span>
            </div>

            <div>
              <div className="font-black text-white text-sm">
                {d.commodity}
              </div>
              <div className="text-xs text-slate-400">
                {d.category} &bull; {d.weight}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Origin
                </span>
                <span className="text-slate-200 truncate block">
                  {d.origin}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Destination
                </span>
                <span className="text-slate-200 truncate block">
                  {d.destination}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  ETA / Delay
                </span>
                <div className="flex items-baseline gap-1.5 font-mono">
                  <span className="text-slate-200 font-bold">{d.eta}</span>
                  <span
                    className={`font-black ${
                      d.delayMinutes > 60 ? 'text-red-400' : 'text-amber-400'
                    }`}
                  >
                    ({d.delay})
                  </span>
                </div>
              </div>

              <span
                className={`px-2 py-0.5 rounded border text-[10px] font-black uppercase ${getStatusBadge(
                  d.status
                )}`}
              >
                {d.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
