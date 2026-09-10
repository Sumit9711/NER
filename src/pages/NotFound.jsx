import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-red-950 border-2 border-red-600 text-red-400 flex items-center justify-center">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-black text-white">404 &bull; Command Sector Not Found</h1>
      <p className="text-sm font-semibold text-slate-300 max-w-md">
        The requested logistics intelligence route or sector does not exist in the Central NER Grid registry.
      </p>
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-600 text-white font-bold text-sm border border-blue-500 transition-all shadow"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Operational Command Center</span>
      </Link>
    </div>
  );
};
