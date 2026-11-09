import React from 'react';
import { UserRole } from '../types/staynest';
import { StayNestLogo } from './StayNestLogo';
import { UniversityBadges } from './UniversityBadges';
import {
  GraduationCap,
  Home,
  MessageSquare,
  Search,
  X,
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  unreadCount: number;
  onOpenChat: () => void;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  unreadCount,
  onOpenChat,
  searchQuery = '',
  onSearchQueryChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0F4A38] border-b border-[#0A3326] px-3 sm:px-6 py-2 sm:py-2.5 shadow-md text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Logo & University Badges */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="hidden sm:block">
            <StayNestLogo size="md" showTagline={true} lightText={true} />
          </div>
          <div className="sm:hidden">
            <StayNestLogo size="sm" showTagline={false} lightText={true} />
          </div>
          <div className="hidden xl:block border-l border-emerald-700/60 pl-3">
            <UniversityBadges compact={false} lightText={true} />
          </div>
        </div>

        {/* Zone 2: Desktop In-Header Search Bar */}
        {onSearchQueryChange && currentRole === 'student' && (
          <div className="relative max-w-sm w-full hidden md:block">
            <Search className="w-3.5 h-3.5 text-[#E5A93C] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Search boarding houses near ADSSU..."
              className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-[#093327] border border-emerald-600/60 text-xs text-white placeholder:text-emerald-200/60 focus:outline-none focus:border-[#E5A93C] focus:bg-[#06281E] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchQueryChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-300 hover:text-white"
                title="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* Zone 3: Primary Role Switcher (Student / Landlord) & Direct Chat */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <div className="flex items-center bg-[#082D22] p-0.5 sm:p-1 rounded-xl border border-emerald-700/60 shadow-inner">
            <button
              onClick={() => onRoleChange('student')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 sm:gap-1.5 ${
                currentRole === 'student'
                  ? 'bg-[#E5A93C] text-[#051F17] shadow-sm font-bold'
                  : 'text-white hover:text-[#E5A93C] hover:bg-emerald-800/40'
              }`}
              title="Student Mode"
            >
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-inherit shrink-0" />
              <span className="hidden min-[380px]:inline">Student</span>
            </button>
            <button
              onClick={() => onRoleChange('landlord')}
              className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 sm:gap-1.5 ${
                currentRole === 'landlord'
                  ? 'bg-[#E5A93C] text-[#051F17] shadow-sm font-bold'
                  : 'text-white hover:text-[#E5A93C] hover:bg-emerald-800/40'
              }`}
              title="Landlord Mode"
            >
              <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-inherit shrink-0" />
              <span className="hidden min-[380px]:inline">Landlord</span>
            </button>
          </div>

          {/* Direct Chat Trigger Button */}
          <button
            onClick={onOpenChat}
            className="relative p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#093327] hover:bg-emerald-800/80 text-white border border-emerald-600/60 text-xs font-bold flex items-center gap-1.5 sm:gap-2 transition-all shadow-xs shrink-0"
            title="Open In-App Direct Chat"
          >
            <MessageSquare className="w-4 h-4 text-[#E5A93C] shrink-0" />
            <span className="hidden md:inline">Direct Chat</span>
            {unreadCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse absolute -top-0.5 -right-0.5 sm:static"></span>
            )}
          </button>

          {/* Current Profile Badge */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-[#082D22] border border-emerald-700/60 text-left">
            <div className="w-6 h-6 rounded-full bg-[#E5A93C] text-[#051F17] font-bold text-xs flex items-center justify-center shadow-xs">
              {currentRole === 'student' ? 'AN' : 'FC'}
            </div>
            <div className="leading-tight">
              <span className="text-xs font-bold text-white block">
                {currentRole === 'student' ? 'Angelo Nuer' : 'Nanay Fritzcel'}
              </span>
              <span className="text-[10px] text-emerald-200 font-medium">
                {currentRole === 'student' ? 'ADSSU Student' : 'Verified Landlord'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Zone 4: Mobile Phone In-Header Search Row */}
      {onSearchQueryChange && currentRole === 'student' && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 pt-1.5 border-t border-emerald-800/40">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-[#E5A93C] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Search boarding houses near ADSSU..."
              className="w-full pl-8 pr-7 py-2 rounded-xl bg-[#082E22] border border-emerald-600/50 text-xs text-white placeholder:text-emerald-200/60 focus:outline-none focus:border-[#E5A93C] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchQueryChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-300 hover:text-white"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
