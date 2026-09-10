import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Truck,
  AlertOctagon,
  Route,
  Package,
  ArrowRight,
  Command,
  CornerDownLeft
} from 'lucide-react';
import { searchGlobalIndex } from '../../data/globalSearchData';
import { useLanguage } from '../../hooks/useLanguage';

export const GlobalSearch = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Global shortcut listeners (Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName))) {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length > 0) {
      const matches = searchGlobalIndex(val);
      setResults(matches);
    } else {
      setResults([]);
    }
  };

  const handleSelectResult = (item) => {
    onClose();
    navigate(item.routePath);
  };

  if (!isOpen) return null;

  const getTypeBadge = (type) => {
    switch (type) {
      case 'VEHICLE':
        return 'bg-blue-950 text-blue-200 border-blue-500';
      case 'INCIDENT':
        return 'bg-red-950 text-red-200 border-red-500';
      case 'ROUTE':
        return 'bg-emerald-950 text-emerald-200 border-emerald-500';
      case 'DELIVERY':
        return 'bg-purple-950 text-purple-200 border-purple-500';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'VEHICLE':
        return <Truck className="w-4 h-4 text-blue-400" />;
      case 'INCIDENT':
        return <AlertOctagon className="w-4 h-4 text-red-400" />;
      case 'ROUTE':
        return <Route className="w-4 h-4 text-emerald-400" />;
      case 'DELIVERY':
        return <Package className="w-4 h-4 text-purple-400" />;
      default:
        return <Search className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border-2 border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b-2 border-slate-700 flex items-center gap-3 bg-slate-950">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search vehicle, incident, route or delivery..."
            value={query}
            onChange={handleSearch}
            className="flex-1 bg-transparent text-white placeholder-slate-400 text-sm sm:text-base font-bold focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-slate-850 border border-slate-750 rounded">
            ESC
          </kbd>
        </div>

        {/* Quick Suggestion Chips if query is empty */}
        {query.trim().length === 0 && (
          <div className="p-5 space-y-4">
            <div className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Quick Suggestions across NER Registry
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'MED-07 (Convoy)', query: 'MED-07' },
                { label: 'INC-1042 (Landslide)', query: 'INC-1042' },
                { label: 'NH-6 (Lifeline)', query: 'NH-6' },
                { label: 'DEL-8901 (Insulin)', query: 'DEL-8901' },
                { label: 'East Khasi Hills', query: 'East Khasi Hills' },
                { label: 'FOOD-12 (Grain)', query: 'FOOD-12' }
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => {
                    setQuery(chip.query);
                    setResults(searchGlobalIndex(chip.query));
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 transition-colors"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-slate-500 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span>Supports Universal IDs: Vehicle (MED-07), Incident (INC-1042), Corridor (NH-6), Delivery (DEL-8901)</span>
            </div>
          </div>
        )}

        {/* Search Results List */}
        {query.trim().length > 0 && (
          <div className="overflow-y-auto divide-y divide-slate-800 p-2">
            {results.length === 0 ? (
              <div className="p-8 text-center text-slate-400 space-y-2">
                <p className="text-sm font-bold text-slate-300">
                  No matching records found for "{query}"
                </p>
                <p className="text-xs text-slate-500">
                  Try searching by Vehicle (MED-07), Incident (INC-1042), Highway (NH-6), or Delivery (DEL-8901)
                </p>
              </div>
            ) : (
              results.map((item) => (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => handleSelectResult(item)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleSelectResult(item)}
                  className="p-3 rounded-xl hover:bg-slate-800/80 transition-colors cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 mt-0.5 shrink-0">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${getTypeBadge(item.type)}`}>
                          {item.type}
                        </span>
                        <span className="text-sm font-black text-white truncate group-hover:text-blue-300">
                          {item.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 truncate">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-slate-500 group-hover:text-blue-400 shrink-0 text-xs font-bold">
                    <span>Navigate</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono">Result Types:</span>
            <span className="text-blue-400 font-bold">VEHICLE</span> &bull;
            <span className="text-red-400 font-bold">INCIDENT</span> &bull;
            <span className="text-emerald-400 font-bold">ROUTE</span> &bull;
            <span className="text-purple-400 font-bold">DELIVERY</span>
          </div>
          <span className="hidden sm:inline">Click to jump directly to dossier</span>
        </div>
      </div>
    </div>
  );
};
