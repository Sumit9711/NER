import React from 'react';
import { 
  GitFork, 
  Send, 
  Radio, 
  FileDown, 
  RefreshCw,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const QuickActionDeck = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-800/90 border-2 border-slate-700 rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between pb-3 border-b border-slate-700 mb-4">
        <h2 className="text-base font-black text-white uppercase tracking-wider">
          Command Tactical Actions
        </h2>
        <span className="text-xs text-slate-400 font-bold">
          Emergency Response Operations
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Button 1 */}
        <button
          onClick={() => navigate('/route-recommendations')}
          className="min-h-[48px] px-4 py-3 bg-blue-700 hover:bg-blue-600 border-2 border-blue-500 rounded-lg text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow hover:shadow-lg focus:ring-2 focus:ring-blue-400"
        >
          <GitFork className="w-5 h-5 text-blue-200" />
          <span>Reroute Blocked Convoys</span>
        </button>

        {/* Button 2 */}
        <button
          onClick={() => navigate('/alerts')}
          className="min-h-[48px] px-4 py-3 bg-red-800 hover:bg-red-700 border-2 border-red-500 rounded-lg text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow hover:shadow-lg focus:ring-2 focus:ring-red-400"
        >
          <Radio className="w-5 h-5 text-red-200 animate-pulse" />
          <span>Broadcast Urgent Hazard</span>
        </button>

        {/* Button 3 */}
        <button
          onClick={() => navigate('/deliveries')}
          className="min-h-[48px] px-4 py-3 bg-emerald-800 hover:bg-emerald-700 border-2 border-emerald-500 rounded-lg text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow hover:shadow-lg focus:ring-2 focus:ring-emerald-400"
        >
          <Send className="w-5 h-5 text-emerald-200" />
          <span>Dispatch Relief Escort</span>
        </button>

        {/* Button 4 */}
        <button
          onClick={() => navigate('/live-map')}
          className="min-h-[48px] px-4 py-3 bg-slate-700 hover:bg-slate-600 border-2 border-slate-500 rounded-lg text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow hover:shadow-lg focus:ring-2 focus:ring-slate-400"
        >
          <Eye className="w-5 h-5 text-slate-300" />
          <span>Open Full GIS Radar</span>
        </button>
      </div>
    </div>
  );
};
