import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, UserCheck, KeyRound, Building2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export const Login = () => {
  const navigate = useNavigate();
  const { login, demoRoles } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(demoRoles[0].id);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(selectedRole, email);
    navigate('/dashboard');
  };

  const handleQuickLogin = (roleId) => {
    login(roleId);
    navigate('/dashboard');
  };

  return (
    <div className="w-full max-w-xl bg-slate-900 border-2 border-slate-700 rounded-xl shadow-2xl overflow-hidden my-8">
      {/* Portal Header */}
      <div className="bg-slate-850 p-6 border-b-2 border-slate-700 text-center">
        <div className="mx-auto w-16 h-16 rounded-xl bg-blue-700 border-2 border-blue-400 flex items-center justify-center mb-3 shadow-lg">
          <Shield className="w-9 h-9 text-white" />
        </div>
        <div className="inline-block px-3 py-1 rounded bg-blue-950 border border-blue-600 text-blue-300 text-xs font-black uppercase tracking-widest mb-2">
          Ministry of DoNER &bull; Government of India
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          NER Emergency Logistics Intelligence Platform
        </h1>
        <p className="text-sm font-semibold text-slate-300 mt-1">
          Accessibility & Lifeline Supply Chain Command Center
        </p>
      </div>

      {/* Quick Demo Login Preset Buttons */}
      <div className="p-6 bg-slate-950/60 border-b border-slate-800">
        <p className="text-xs font-black uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
          <KeyRound className="w-4 h-4 text-blue-400" />
          Quick Access (Demo Roles for Evaluators)
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {demoRoles.map((role) => (
            <button
              key={role.id}
              type="button"
              onClick={() => handleQuickLogin(role.id)}
              className="p-3 rounded-lg border-2 border-slate-700 hover:border-blue-500 bg-slate-900 hover:bg-slate-850 text-left transition-all group focus:ring-2 focus:ring-blue-400"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black text-blue-400 uppercase tracking-wider">
                  {role.badge}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs font-black text-white mt-1 leading-snug">
                {role.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Manual Login Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-950 border border-red-600 text-red-200 text-sm font-bold">
            {error}
          </div>
        )}

        {/* Role Selector */}
        <div>
          <label htmlFor="auth-role" className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
            Select Operational Authorization Role
          </label>
          <select
            id="auth-role"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full bg-slate-800 border-2 border-slate-600 text-white rounded-lg px-4 py-2.5 text-sm font-bold focus:border-blue-500 focus:outline-none"
          >
            {demoRoles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.role} ({r.agency})
              </option>
            ))}
          </select>
        </div>

        {/* Email / Officer ID */}
        <div>
          <label htmlFor="auth-email" className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
            Government Email / NIC Service ID
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail className="w-4 h-4 text-slate-400" />
            </div>
            <input
              id="auth-email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. director.logistics@doner.gov.in"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border-2 border-slate-600 text-white rounded-lg text-sm font-medium focus:border-blue-500 focus:outline-none placeholder-slate-500"
            />
          </div>
        </div>

        {/* Passcode */}
        <div>
          <label htmlFor="auth-password" className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
            Security Passcode / OTP Token
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock className="w-4 h-4 text-slate-400" />
            </div>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secure passcode (or leave blank for demo)"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border-2 border-slate-600 text-white rounded-lg text-sm font-medium focus:border-blue-500 focus:outline-none placeholder-slate-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full min-h-[48px] bg-blue-700 hover:bg-blue-600 border-2 border-blue-500 text-white text-base font-black rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg focus:ring-4 focus:ring-blue-400 cursor-pointer mt-2"
        >
          <UserCheck className="w-5 h-5" />
          <span>Authenticate & Access Command Center</span>
        </button>
      </form>
    </div>
  );
};
