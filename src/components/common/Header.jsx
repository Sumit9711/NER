import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  ShieldAlert, 
  Menu, 
  User, 
  LogOut, 
  Clock, 
  ChevronDown,
  Building2,
  Radio,
  Search,
  Globe,
  Command,
  Check
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';
import { StateSectorSelector } from './StateSectorSelector';
import { LanguageToggle } from './LanguageToggle';
import { GlobalSearch } from './GlobalSearch';
import { formatIndianDate, formatIndianTime } from '../../utils/formatters';

export const Header = ({ onToggleSidebar, selectedSector, onSelectSector }) => {
  const { user, logout, switchRole, demoRoles } = useAuth();
  const { t, language } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [alertsMenuOpen, setAlertsMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Keyboard shortcut Ctrl+K or / to open search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName))) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="bg-slate-900 border-b-2 border-slate-700 text-white sticky top-0 z-30 shadow-lg">
      {/* Topmost National Portal Authority Strip */}
      <div className="bg-slate-950 px-4 py-1 border-b border-slate-800 text-xs text-slate-300 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 font-bold tracking-wide text-slate-200">
            <span className="w-2 h-2 rounded-full bg-orange-500 inline-block"></span>
            <span className="w-2 h-2 rounded-full bg-white inline-block"></span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            <span>{t('header.govTitle', 'GOVERNMENT OF INDIA • NORTH EASTERN COUNCIL (NEC)')}</span>
          </div>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="hidden md:inline text-slate-400 font-medium">
            Ministry of Development of North Eastern Region (MDoNER)
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block"></span>
            <span className="hidden sm:inline">{t('header.satelliteActive', 'SECURE COMMAND SATELLITE LINK ACTIVE')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{formatIndianDate(currentTime)} • {formatIndianTime(currentTime)} IST</span>
          </div>
        </div>
      </div>

      {/* Main Command Center Header Bar */}
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Command Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 hover:text-white transition-colors focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle Command Navigation Menu"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="bg-blue-900 border-2 border-blue-500 p-2 rounded-lg text-blue-200 hidden sm:flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg md:text-xl font-black text-white tracking-tight leading-tight">
                  {t('header.portalTitle', 'NER LOGISTICS & ACCESSIBILITY INTELLIGENCE')}
                </h1>
                <span className="bg-blue-700/80 border border-blue-500 text-white text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider hidden lg:inline-block">
                  {t('header.centralCommand', 'CENTRAL COMMAND')}
                </span>
              </div>
              <p className="text-xs md:text-sm font-semibold text-slate-300 leading-none mt-0.5 hidden sm:block">
                {t('header.portalSubtitle', 'Disaster Relief & Lifeline Highway Intelligence • 8 North Eastern States')}
              </p>
            </div>
          </div>
        </div>

        {/* Center: Global Search Bar Trigger */}
        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full bg-slate-950 hover:bg-slate-850 border-2 border-slate-700 hover:border-slate-600 text-slate-400 hover:text-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold flex items-center justify-between gap-2 shadow-inner transition-all group"
            title="Click or press Ctrl+K to search"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="w-4 h-4 text-blue-400 group-hover:text-blue-300" />
              <span className="truncate">{t('header.searchPlaceholder', 'Search vehicle, incident, route or delivery...')}</span>
            </span>
            <kbd className="px-2 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-slate-850 border border-slate-700 rounded shrink-0">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Right: Search (mobile icon), Language Toggle, Sector Selector, Alerts & User Controls */}
        <div className="flex items-center gap-2.5">
          {/* Mobile search button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="md:hidden p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300"
            title="Search"
          >
            <Search className="w-4 h-4 text-blue-400" />
          </button>

          {/* Language Toggle (EN | हिन्दी) */}
          <LanguageToggle />

          {/* Sector Selector */}
          <StateSectorSelector
            selectedState={selectedSector}
            onSelectState={onSelectSector}
          />

          {/* Emergency Alert Indicator */}
          <div className="relative">
            <button
              onClick={() => setAlertsMenuOpen(!alertsMenuOpen)}
              className="flex items-center gap-2 bg-red-950/80 hover:bg-red-900 border-2 border-red-600 text-red-200 px-3 py-2 rounded-lg text-sm font-bold transition-all shadow-sm"
              title="Active Critical Alerts"
              aria-label="View Active Urgent Highway Blockades"
            >
              <ShieldAlert className="w-4 h-4 text-red-400" />
              <span className="hidden xl:inline">{t('header.hazardAlerts', 'HAZARD ALERTS')}</span>
              <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-black">
                3
              </span>
            </button>

            {alertsMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border-2 border-slate-700 rounded-lg shadow-2xl p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <span className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                    <Radio className="w-4 h-4 text-red-400 animate-pulse" />
                    Active Roadblocks & Hazards (3)
                  </span>
                  <span className="text-xs text-red-300 font-bold bg-red-950 px-2 py-0.5 rounded border border-red-700">
                    CRITICAL
                  </span>
                </div>
                <div className="mt-3 space-y-2.5 text-xs">
                  <div className="p-2.5 rounded bg-slate-800/90 border-l-4 border-l-red-500 border-slate-700">
                    <p className="font-bold text-white">NH-6 Mile 28 (East Khasi Hills)</p>
                    <p className="text-slate-300 mt-1">Landslide mud slurry 45m. Alternate detour active via Mawryngkneng.</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-800/90 border-l-4 border-l-red-500 border-slate-700">
                    <p className="font-bold text-white">NH-29 Chumukedima (Nagaland)</p>
                    <p className="text-slate-300 mt-1">Massive rockslide. Dual lane blocked. Niuland detour engaged.</p>
                  </div>
                  <div className="p-2.5 rounded bg-slate-800/90 border-l-4 border-l-amber-500 border-slate-700">
                    <p className="font-bold text-white">NH-10 Teesta Gorge (Sikkim)</p>
                    <p className="text-slate-300 mt-1">River surge waterlogging at 29th Mile. Heavy transport restricted.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors focus:ring-2 focus:ring-blue-500"
              aria-label="User Account and Role Selection"
            >
              <div className="w-8 h-8 rounded-md bg-blue-700 text-white flex items-center justify-center font-bold text-sm border border-blue-400">
                {user?.avatarInitials || 'GO'}
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-xs font-black text-white leading-tight">
                  {user?.name || 'Authorized Officer'}
                </p>
                <p className="text-[11px] text-blue-300 font-bold leading-tight">
                  {user?.badge || 'COMMAND LOG'}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-300" />
            </button>

            {roleMenuOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-slate-900 border-2 border-slate-700 rounded-xl shadow-2xl py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-700">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    {t('header.currentOperator', 'Current Operator')}
                  </p>
                  <p className="text-sm font-black text-white">{user?.name}</p>
                  <p className="text-xs text-blue-300 font-semibold">{user?.role}</p>
                  <p className="text-[11px] text-slate-400">{user?.agency}</p>
                </div>

                <div className="px-3 py-2 border-b border-slate-700">
                  <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                    {t('header.switchRole', 'Switch Government Role (Demo RBAC)')}
                  </p>
                  <div className="space-y-1 max-h-56 overflow-y-auto">
                    {demoRoles.map((r) => {
                      const isSelected = user?.id === r.id || user?.roleId === r.roleId;
                      return (
                        <button
                          key={r.id}
                          onClick={() => {
                            switchRole(r.roleId || r.id);
                            setRoleMenuOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-2 rounded-lg text-xs font-bold flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-blue-800 text-white shadow'
                              : 'text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className="truncate text-xs font-black">{r.role}</div>
                            <div className="text-[10px] text-slate-400 truncate">{r.name}</div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-1 px-2">
                  <button
                    onClick={() => {
                      logout();
                      setRoleMenuOpen(false);
                      window.location.href = '/login';
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-red-300 hover:bg-red-950/80 hover:text-red-200 rounded flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{t('header.signOut', 'Secure Sign Out')}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global Universal Search Modal */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};
