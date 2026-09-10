import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  Key,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Check,
  Zap,
  Filter,
  Search
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { SYSTEM_ROLES, USERS_TABLE_DATA } from '../data/usersRolesData';

export const UsersRoles = () => {
  const { user, switchRole } = useAuth();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleSwitchUserRole = (roleId, officerName) => {
    switchRole(roleId);
    setFeedbackMsg(`Switched Active RBAC Session to "${officerName}". Sidebar navigation has been updated.`);
    setTimeout(() => setFeedbackMsg(''), 5000);
  };

  const filteredUsers = USERS_TABLE_DATA.filter((u) => {
    const matchesRole = roleFilter === 'ALL' || u.roleId === roleFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(q) ||
      u.role.toLowerCase().includes(q) ||
      u.district.toLowerCase().includes(q);
    return matchesRole && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-950 border-emerald-500 text-emerald-300';
      case 'ON_DUTY':
        return 'bg-blue-950 border-blue-500 text-blue-300';
      case 'IN_TRANSIT':
        return 'bg-amber-950 border-amber-500 text-amber-300';
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
            <Users className="w-6 h-6 text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Users & Role-Based Access Control (RBAC)
            </h1>
          </div>
          <p className="text-sm font-semibold text-slate-300 mt-1">
            Official government access tiers: Coordinator, District Authority, Field Officer, Emergency Response, Driver, and System Admin
          </p>
        </div>

        <button
          onClick={() => alert('Opening Secure Officer Provisioning Wizard (NIC 2FA Token)...')}
          className="min-h-[42px] px-4 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-600 border border-blue-500 text-white text-xs font-black flex items-center gap-2 transition-all shadow-md active:scale-95"
        >
          <UserPlus className="w-4 h-4" />
          <span>Provision New Officer Access</span>
        </button>
      </div>

      {/* Interactive Switch Role Feedback Banner */}
      {feedbackMsg && (
        <div className="p-3.5 rounded-xl bg-blue-950 border-2 border-blue-500 text-blue-200 text-xs font-bold flex items-center justify-between animate-fadeIn shadow-lg">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{feedbackMsg}</span>
          </span>
          <button onClick={() => setFeedbackMsg('')} className="text-blue-400 hover:text-white">✕</button>
        </div>
      )}

      {/* 2. Interactive Role Switcher Bar (Frontend RBAC Demonstration) */}
      <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-black text-white uppercase tracking-wider">
              Live RBAC Role Simulator (Click to switch view & observe sidebar filter)
            </h2>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            Active: <strong className="text-white">{user?.role}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {SYSTEM_ROLES.map((r) => {
            const isActive = user?.roleId === r.id || user?.role === r.name;
            return (
              <button
                key={r.id}
                onClick={() => handleSwitchUserRole(r.id, r.name)}
                className={`p-3 rounded-xl border-2 text-left transition-all flex flex-col justify-between ${
                  isActive
                    ? 'bg-blue-950/80 border-blue-500 ring-2 ring-blue-500/40 shadow-lg'
                    : 'bg-slate-800/60 border-slate-750 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="text-[10px] font-bold uppercase text-slate-400 truncate">
                    {r.category}
                  </div>
                  <div className="text-xs font-black text-white mt-1 leading-snug">
                    {r.name}
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">{r.allowedRoutes.length} modules</span>
                  {isActive && <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. User Table (Exact Specified Columns: Name, Role, District, Status, Last Active, Actions) */}
      <div className="bg-slate-900 border-2 border-slate-700 rounded-xl shadow-xl overflow-hidden space-y-4">
        {/* Table Controls */}
        <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search officer name, role, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-slate-400 font-bold">Filter Role:</span>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 font-bold focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Roles</option>
              {SYSTEM_ROLES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 border-y border-slate-800 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                <th className="p-3.5 pl-5">Name</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">District</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Last Active</th>
                <th className="p-3.5 pr-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {filteredUsers.map((u) => {
                const isCurrentUser = user?.id === u.roleId || user?.role === u.role;

                return (
                  <tr key={u.id} className="hover:bg-slate-800/50 transition-colors">
                    {/* 1. Name */}
                    <td className="p-3.5 pl-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-black text-xs border border-blue-400 shrink-0">
                          {u.avatarInitials}
                        </div>
                        <div>
                          <div className="font-black text-white text-sm">
                            {u.name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {u.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Role */}
                    <td className="p-3.5">
                      <span className="font-bold text-slate-200 block">
                        {u.role}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        2FA Token Verified
                      </span>
                    </td>

                    {/* 3. District */}
                    <td className="p-3.5">
                      <div className="text-slate-200 font-bold">
                        {u.district}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {u.state}
                      </span>
                    </td>

                    {/* 4. Status */}
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded border text-[10px] font-black uppercase ${getStatusBadge(
                          u.status
                        )}`}
                      >
                        {u.status.replace('_', ' ')}
                      </span>
                    </td>

                    {/* 5. Last Active */}
                    <td className="p-3.5 font-mono text-slate-300 text-xs">
                      {u.lastActive}
                    </td>

                    {/* 6. Actions */}
                    <td className="p-3.5 pr-5 text-right">
                      {isCurrentUser ? (
                        <span className="text-xs font-black text-blue-400 bg-blue-950 px-3 py-1.5 rounded-lg border border-blue-600 inline-block">
                          Active Session
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSwitchUserRole(u.roleId, u.name)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-blue-600 border border-slate-600 hover:border-blue-400 text-slate-200 hover:text-white text-xs font-bold transition-all"
                        >
                          Switch Role
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden divide-y divide-slate-800 p-4 space-y-4">
          {filteredUsers.map((u) => (
            <div key={u.id} className="pt-4 first:pt-0 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-blue-700 text-white font-bold flex items-center justify-center text-xs">
                    {u.avatarInitials}
                  </div>
                  <div>
                    <span className="font-black text-white">{u.name}</span>
                    <span className="text-[10px] text-slate-400 block">{u.email}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded border text-[10px] font-black uppercase ${getStatusBadge(u.status)}`}>
                  {u.status}
                </span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1">
                <div>
                  <span className="text-slate-400">Role: </span>
                  <strong className="text-white">{u.role}</strong>
                </div>
                <div>
                  <span className="text-slate-400">District: </span>
                  <span className="text-slate-300">{u.district}</span>
                </div>
                <div>
                  <span className="text-slate-400">Last Active: </span>
                  <span className="text-cyan-300 font-mono">{u.lastActive}</span>
                </div>
              </div>

              <button
                onClick={() => handleSwitchUserRole(u.roleId, u.name)}
                className="w-full py-2 bg-slate-800 hover:bg-blue-600 rounded text-xs font-bold text-white transition-colors"
              >
                Switch Role to {u.role}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
