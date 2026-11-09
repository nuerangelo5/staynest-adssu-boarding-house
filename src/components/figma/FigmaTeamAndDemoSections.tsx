import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  CheckCircle2,
  Search,
  ShieldCheck,
  GraduationCap,
  ChevronRight,
  Send,
  Check,
  Hand,
  ArrowRight,
  Footprints,
  X,
} from 'lucide-react';
import { StayNestEmblem } from './StayNestEmblem';

// ============================================================================
// DATA: 5-MEMBER ADSSU BSIT TEAM DOSSIER WITH REAL STUDIO HEADSHOTS
// ============================================================================
export interface TeamMember {
  name: string;
  role: string;
  category: string;
  photoUrl: string;
  bio: string;
  specialty: string;
  contributions: string[];
}

export const STAYNEST_TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Angelo Laureta Nuer',
    role: 'PROJECT LEAD',
    category: 'Leadership & Systems Architecture',
    photoUrl: '/assets/aistudio/angelo-removebg-preview_c0955bfd.png',
    specialty: 'System Architecture & Backend Infrastructure',
    bio: 'Lead architect steering StayNest from conceptualization to full implementation. Spearheads system architecture, backend infrastructure, and stakeholder coordination with ADSSU student affairs and local Bunawan operators.',
    contributions: [
      'Comprehensive system architecture & requirements engineering',
      'Backend infrastructure, database schemas & API workflows',
      'ADSSU official student credential integration standards',
    ],
  },
  {
    name: 'Conrado Candari',
    role: 'PRODUCT & UI/UX DESIGNER',
    category: 'Mobile Experience & Visual Design',
    photoUrl: '/assets/aistudio/conrado-removebg-preview_9d179723.png',
    specialty: 'Mobile Interface Design & Frontend UX',
    bio: 'Lead mobile interface and user experience designer. Crafted the responsive mobile app flows, student reservation journeys, and interactive design prototypes with deep emerald and gold aesthetics.',
    contributions: [
      'Mobile interface design & responsive application layouts',
      'Frontend user experience, intuitive navigation & micro-interactions',
      'Interactive prototyping & visual identity design system',
    ],
  },
  {
    name: 'Jolina Asuncion',
    role: 'FINANCE & BUSINESS DEVELOPMENT',
    category: 'Resource Management & Operations',
    photoUrl: '/assets/aistudio/jolina-removebg-preview_efe2723a.png',
    specialty: 'Resource Management & Financial Planning',
    bio: 'Oversees project resource allocation, financial modeling, and development sprint tracking. Formulated verified student accommodation pricing structures and development milestones.',
    contributions: [
      'Resource management & development milestone tracking',
      'Financial planning & student rental pricing benchmarks',
      'Project expenditure planning & timeline coordination',
    ],
  },
  {
    name: 'Mary Joy Doroteo',
    role: 'MARKETING & RESEARCH LEAD',
    category: 'Field Research & Stakeholder Outreach',
    photoUrl: '/assets/aistudio/mejoy-removebg-preview_e0f12c17.png',
    specialty: 'Stakeholder Research & Data Gathering',
    bio: 'Directs on-ground stakeholder research, gathering student housing demand surveys and boarding house data across Bunawan to ground StayNest in authentic student and landlord needs.',
    contributions: [
      'Stakeholder research with boarding house owners & campus leaders',
      'Student housing surveys & accommodation preference data',
      'On-ground field data gathering & safety benchmark analysis',
    ],
  },
  {
    name: 'Kean Ide',
    role: 'PROGRAMMER',
    category: 'Frontend Engineering & Logic Systems',
    photoUrl: '/assets/aistudio/kean-removebg-preview_066f0d13.png',
    specialty: 'Interactive Prototyping & Component Logic',
    bio: 'Software programmer specializing in transforming complex user flows and interactive Figma prototypes into production-grade frontend component logic and application systems.',
    contributions: [
      'Interactive prototyping & Figma design-to-code translation',
      'Component logic, reactive state & dynamic UI rendering',
      'Multi-role workflow systems (Student, Landlord, Admin)',
    ],
  },
];

// ============================================================================
// DATA: 4-STEP HOW IT WORKS WORKFLOW (MATCHING AGRIRENTA 4-CARD SCREEN FLOW)
// ============================================================================
export interface HowItWorksStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  description: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    stepNumber: 1,
    title: 'Search & Distance Filter',
    subtitle: 'Filter by walking distance, price, and barangay.',
    description:
      'Filter verified boarding houses within 1km walking distance of ADSSU Bunawan. Check 24/7 water, flood elevation, and Wi-Fi.',
  },
  {
    stepNumber: 2,
    title: 'Check Availability & Compliance',
    subtitle: 'View room rates, 360° photos, and LGU permits.',
    description:
      'Check solo vs bedspace room slots, monthly rates, and official Bunawan LGU Mayor’s Permit and BFP Fire Safety certificates.',
  },
  {
    stepNumber: 3,
    title: 'Chat Directly with Landlord',
    subtitle: 'Ask questions, curfew hours, and send request.',
    description:
      'Send direct messages to verified landlords like Conrado Candari with zero broker markups or middleman fees.',
  },
  {
    stepNumber: 4,
    title: 'Get Confirmed with Student ID',
    subtitle: 'Priority reservation locked with ADSSU student pass.',
    description:
      'The landlord confirms your reservation, and you receive an official StayNest digital move-in pass with your student ID.',
  },
];

// ============================================================================
// COMPONENT 1: CLEAN HORIZONTAL SCREEN DEMO (NO PAUSE/RESTART BUTTONS, NO EMOJIS)
// ============================================================================
export const StayNestHowItWorksDemo: React.FC<{
  onTryExplore?: () => void;
  onTryChat?: () => void;
  className?: string;
}> = ({ onTryExplore, onTryChat, className = '' }) => {
  const [activeCard, setActiveCard] = useState<number>(0);

  return (
    <section className={`w-full py-8 px-4 sm:px-8 bg-[#021811] text-white rounded-3xl border border-emerald-800/80 shadow-2xl my-4 relative overflow-hidden ${className}`}>
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1520px] mx-auto relative z-10">
        {/* Section Header (No emojis) */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#E5A93C] text-[11px] font-bold tracking-wider uppercase shadow-2xs">
            <span>System Guide</span>
          </div>

          <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EAA938] tracking-tight leading-tight">
            How It Works
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-[#E5A93C] to-emerald-400 rounded-full mt-2 mb-2.5 mx-auto sm:mx-0" />
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl font-normal leading-relaxed mx-auto sm:mx-0">
            From discovering accredited boarding houses near the ADSSU campus to a confirmed booking in four simple steps.
          </p>
        </div>

        {/* 4 Horizontal Cards with Real System Screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* CARD 1: SEARCH */}
          <div
            onClick={() => setActiveCard(0)}
            className={`p-5 rounded-3xl bg-[#04281D]/90 border transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl ${
              activeCard === 0
                ? 'border-[#E5A93C] ring-2 ring-[#E5A93C]/40 shadow-[#E5A93C]/10 translate-y-[-2px]'
                : 'border-emerald-800/80 hover:border-emerald-700/80'
            }`}
          >
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-7 h-7 rounded-full bg-[#00875A] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  1
                </span>
                <h3 className="font-bold text-white text-base sm:text-lg leading-tight">
                  Search & Distance
                </h3>
              </div>
              <p className="text-xs text-emerald-200/80 leading-relaxed mb-4 min-h-[36px]">
                Filter by walking distance to ADSSU gate, 24/7 water supply, and budget under ₱1,500.
              </p>
            </div>

            {/* Realistic Phone Display Mockup */}
            <div className="w-full bg-[#053728] rounded-2xl p-3 border border-emerald-800/80 shadow-inner space-y-2.5">
              <div className="flex items-center justify-between text-[10px] text-emerald-300 pb-1 border-b border-emerald-900/60">
                <span className="font-serif italic font-bold text-[#E5A93C]">StayNest</span>
                <span>Bunawan, ADS</span>
              </div>

              {/* Search Bar Input */}
              <div className="p-2 rounded-xl bg-white/10 border border-white/15 flex items-center gap-1.5 text-[11px] text-white">
                <Search className="w-3.5 h-3.5 text-[#E5A93C] shrink-0" />
                <span className="truncate">Walking distance to ADSSU</span>
              </div>

              {/* Filter Chips */}
              <div className="flex gap-1 overflow-x-auto text-[9px]">
                <span className="px-2 py-0.5 rounded-full bg-[#00875A] text-white font-bold flex items-center gap-1 shrink-0">
                  <Footprints className="w-2.5 h-2.5 text-amber-300" />
                  <span>Within 1 km</span>
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-emerald-200 shrink-0">
                  24/7 Water
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-emerald-200 shrink-0">
                  Low Flood
                </span>
              </div>

              {/* Result Preview Card */}
              <div className="p-2 rounded-xl bg-white text-slate-900 shadow-md space-y-1.5">
                <div className="h-16 rounded-lg overflow-hidden bg-slate-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80"
                    alt="Fritzcel Boarding House"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-black/70 backdrop-blur-xs text-white rounded text-[8px] font-bold">
                    ₱1,000 / mo
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold truncate">Fritzcel Boarding House</span>
                  <span className="text-emerald-700 font-extrabold shrink-0">0.7 km walk</span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: AVAILABILITY & COMPLIANCE */}
          <div
            onClick={() => setActiveCard(1)}
            className={`p-5 rounded-3xl bg-[#04281D]/90 border transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl ${
              activeCard === 1
                ? 'border-[#E5A93C] ring-2 ring-[#E5A93C]/40 shadow-[#E5A93C]/10 translate-y-[-2px]'
                : 'border-emerald-800/80 hover:border-emerald-700/80'
            }`}
          >
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-7 h-7 rounded-full bg-[#00875A] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  2
                </span>
                <h3 className="font-bold text-white text-base sm:text-lg leading-tight">
                  Check Availability
                </h3>
              </div>
              <p className="text-xs text-emerald-200/80 leading-relaxed mb-4 min-h-[36px]">
                View room vacancy, amenities, curfew policy, and verified LGU accreditation badges.
              </p>
            </div>

            {/* Realistic Phone Display Mockup */}
            <div className="w-full bg-[#053728] rounded-2xl p-3 border border-emerald-800/80 shadow-inner space-y-2">
              <div className="p-2 rounded-xl bg-white/10 border border-emerald-400/30 flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5 text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-bold">LGU Verified 2026</span>
                </div>
                <span className="text-[9px] text-[#E5A93C] font-mono">BFP Compliant</span>
              </div>

              {/* Room Slots Pill List */}
              <div className="space-y-1.5">
                <div className="p-2 rounded-xl bg-white text-slate-900 flex items-center justify-between text-[10px] shadow-2xs">
                  <div>
                    <span className="font-bold block">Room 02 · Bedspace</span>
                    <span className="text-[9px] text-slate-500">2 slots remaining</span>
                  </div>
                  <span className="font-bold text-[#00875A]">₱1,000</span>
                </div>

                <div className="p-2 rounded-xl bg-white text-slate-900 flex items-center justify-between text-[10px] shadow-2xs">
                  <div>
                    <span className="font-bold block">Room 05 · Solo Room</span>
                    <span className="text-[9px] text-amber-600 font-semibold">1 slot available</span>
                  </div>
                  <span className="font-bold text-[#00875A]">₱1,800</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-between text-[9px] text-emerald-300">
                <span>Curfew: 10:00 PM</span>
                <span>Free High-Speed Wi-Fi</span>
              </div>
            </div>
          </div>

          {/* CARD 3: CHAT DIRECTLY */}
          <div
            onClick={() => setActiveCard(2)}
            className={`p-5 rounded-3xl bg-[#04281D]/90 border transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl ${
              activeCard === 2
                ? 'border-[#E5A93C] ring-2 ring-[#E5A93C]/40 shadow-[#E5A93C]/10 translate-y-[-2px]'
                : 'border-emerald-800/80 hover:border-emerald-700/80'
            }`}
          >
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-7 h-7 rounded-full bg-[#00875A] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  3
                </span>
                <h3 className="font-bold text-white text-base sm:text-lg leading-tight">
                  Chat Directly
                </h3>
              </div>
              <p className="text-xs text-emerald-200/80 leading-relaxed mb-4 min-h-[36px]">
                Inquire directly with accredited owners without middleman or broker charges.
              </p>
            </div>

            {/* Realistic Phone Display Mockup */}
            <div className="w-full bg-[#053728] rounded-2xl p-3 border border-emerald-800/80 shadow-inner space-y-2">
              <div className="flex items-center gap-2 pb-1 border-b border-emerald-900/60">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                  C
                </div>
                <div className="leading-tight">
                  <span className="text-[10px] font-bold text-white block">Conrado Candari</span>
                  <span className="text-[8px] text-emerald-300">Verified Landlord · Active</span>
                </div>
              </div>

              {/* Realistic Chat Bubbles */}
              <div className="space-y-1.5 text-[9px]">
                <div className="p-2 rounded-xl bg-white/10 text-emerald-100 max-w-[85%]">
                  Hello po sir! May available bedspace pa po for 3rd year BSIT?
                </div>
                <div className="p-2 rounded-xl bg-[#00875A] text-white max-w-[85%] ml-auto shadow-xs">
                  Yes po! Room 2 is vacant and ready for ocular inspection.
                </div>
              </div>

              <div className="p-1.5 rounded-lg bg-white/10 border border-white/15 flex items-center justify-between text-[9px] text-emerald-200 px-2.5">
                <span>Reserve with ADSSU ID...</span>
                <Send className="w-2.5 h-2.5 text-[#E5A93C]" />
              </div>
            </div>
          </div>

          {/* CARD 4: GET CONFIRMED */}
          <div
            onClick={() => setActiveCard(3)}
            className={`p-5 rounded-3xl bg-[#04281D]/90 border transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl ${
              activeCard === 3
                ? 'border-[#E5A93C] ring-2 ring-[#E5A93C]/40 shadow-[#E5A93C]/10 translate-y-[-2px]'
                : 'border-emerald-800/80 hover:border-emerald-700/80'
            }`}
          >
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="w-7 h-7 rounded-full bg-[#00875A] text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  4
                </span>
                <h3 className="font-bold text-white text-base sm:text-lg leading-tight">
                  Get Confirmed
                </h3>
              </div>
              <p className="text-xs text-emerald-200/80 leading-relaxed mb-4 min-h-[36px]">
                The owner confirms your slot and issues your official StayNest voucher.
              </p>
            </div>

            {/* Realistic Phone Display Mockup */}
            <div className="w-full bg-[#053728] rounded-2xl p-3 border border-emerald-800/80 shadow-inner space-y-2 text-center">
              <div className="w-8 h-8 rounded-full bg-[#E5A93C] text-slate-950 mx-auto flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
              </div>

              <div className="leading-tight">
                <h5 className="text-[11px] font-bold text-white">Booking Confirmed!</h5>
                <span className="text-[8px] text-emerald-300">Official StayNest Pass #84920</span>
              </div>

              {/* Voucher Detail Box */}
              <div className="p-2 rounded-xl bg-white text-slate-900 text-left text-[9px] space-y-1 shadow-2xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Student:</span>
                  <span className="font-bold text-slate-800">Angelo Nuer (BSIT)</span>
                </div>
                <div className="flex justify-between border-t border-slate-100 pt-1">
                  <span className="text-slate-500">House:</span>
                  <span className="font-bold text-[#00875A]">Fritzcel (Room 02)</span>
                </div>
              </div>

              <div className="text-[8px] text-emerald-300/80">
                Guaranteed move-in for Academic Year 2026
              </div>
            </div>
          </div>
        </div>

        {/* Swipe instruction with hand icon */}
        <div className="mt-8 pt-4 flex items-center justify-center gap-2 text-xs text-emerald-300/90 font-medium">
          <Hand className="w-4 h-4 text-[#E5A93C] animate-pulse shrink-0" />
          <span>Scroll or swipe to see all 4 steps →</span>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// COMPONENT 2: CORPORATE TEAM CARDS (DEEP EMERALD STUDIO + GOLD ACCENT BAR)
// ============================================================================
export const StayNestOurTeamSection: React.FC<{
  onContactTeam?: () => void;
  className?: string;
  onSelectMember?: (member: TeamMember) => void;
}> = ({ onContactTeam, className = '', onSelectMember }) => {
  const [expandedMemberName, setExpandedMemberName] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const memberRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const activeMember = expandedMemberName
    ? STAYNEST_TEAM_MEMBERS.find((m) => m.name === expandedMemberName) || null
    : null;

  const toggleMemberInline = (member: TeamMember) => {
    setExpandedMemberName((prev) => {
      const next = prev === member.name ? null : member.name;
      return next;
    });
    if (onSelectMember) {
      onSelectMember(member);
    }
  };

  return (
    <section className={`w-full pt-12 pb-12 sm:pb-16 px-2 sm:px-4 relative overflow-hidden rounded-3xl ${className}`}>
      {/* Phigros-Style Pulsing Triangular Wireframe Mesh Background */}
      <div className="mesh-container">
        <div className="mesh-grid" />
        {/* Geometric Phigros rhythm game triangular polygon wireframe overlay */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-35 animate-[pulse-mesh_4.5s_ease-in-out_infinite]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="phigros-triangles-grid"
              width="90"
              height="155.88"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 45 0 L 0 77.94 L 90 77.94 Z M 0 77.94 L 45 155.88 L 90 77.94 Z"
                fill="none"
                stroke="rgba(229, 169, 60, 0.45)"
                strokeWidth="1.6"
              />
              <path
                d="M 0 0 L 90 155.88 M 90 0 L 0 155.88 M 0 77.94 L 90 77.94"
                stroke="rgba(16, 185, 129, 0.38)"
                strokeWidth="1.2"
              />
              <circle cx="45" cy="0" r="2.5" fill="rgba(229, 169, 60, 0.7)" />
              <circle cx="0" cy="77.94" r="2.5" fill="rgba(16, 185, 129, 0.7)" />
              <circle cx="90" cy="77.94" r="2.5" fill="rgba(16, 185, 129, 0.7)" />
              <circle cx="45" cy="155.88" r="2.5" fill="rgba(229, 169, 60, 0.7)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#phigros-triangles-grid)" />
        </svg>

        {/* Upward Energy Light-Beam Sweeps (Phigros Rhythm Energy Flow) */}
        <div className="mesh-beam" />
        <div className="mesh-beam-accent" />
      </div>

      {/* Atmospheric Radial Depth Overlays */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />

      <div className="max-w-[1520px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E5A93C]/15 border border-[#E5A93C]/40 text-[#E5A93C] text-[11px] font-bold tracking-wider uppercase mb-3 shadow-2xs">
            <GraduationCap className="w-3.5 h-3.5 text-[#E5A93C]" />
            <span>Agusan del Sur State University · Bunawan Campus</span>
          </div>

          <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-bold text-[#EAA938] tracking-tight mb-2 drop-shadow-[0_2px_12px_rgba(234,169,56,0.3)]">
            Our Team
          </h2>
          <div className="h-1 w-20 bg-[#E5A93C] rounded-full mx-auto mb-3 shadow-[0_0_8px_rgba(229,169,60,0.5)]" />

          <p className="font-serif italic text-lg sm:text-xl text-[#F4F7F2] font-normal leading-relaxed">
            Five members, one goal: a better way to find your stay.
          </p>
          <p className="text-xs sm:text-sm text-emerald-200/80 mt-1 max-w-xl mx-auto">
            3rd Year BSIT Students of ADSSU Bunawan designing modern off-campus housing with verified municipal compliance, clear pricing, and zero broker markups.
          </p>
        </div>

        {/* CONDITIONAL RENDERING: CLEAN FULL-WIDTH EXPANSION OR 5-CARD HORIZONTAL TRACK */}
        {activeMember ? (
          /* CLEAN FULL-WIDTH PROFILE EXPANSION (NO HANGING OR CLIPPED ADJACENT CARDS) */
          <div className="w-full max-w-4xl mx-auto pt-6 pb-8 px-2 sm:px-4 transition-all duration-300 ease-out animate-in fade-in zoom-in-95">
            {/* Quick Member Switcher Bar */}
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              {/* Member Switcher Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none max-w-full">
                {STAYNEST_TEAM_MEMBERS.map((m) => {
                  const isCurrent = m.name === activeMember.name;
                  return (
                    <button
                      key={m.name}
                      type="button"
                      onClick={() => {
                        setExpandedMemberName(m.name);
                        if (onSelectMember) onSelectMember(m);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 active:scale-95 ${
                        isCurrent
                          ? 'bg-[#E5A93C] text-slate-950 shadow-md ring-1 ring-[#E5A93C]'
                          : 'bg-white/10 hover:bg-white/20 text-emerald-200 border border-white/10 hover:text-white'
                      }`}
                    >
                      <span>{m.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Expanded Full-Width Card Container */}
            <div className="relative bg-gradient-to-b from-[#063b2c] via-[#04281D] to-[#01140e] border-2 border-[#E5A93C] rounded-2xl p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.65)] ring-2 ring-[#E5A93C]/40 transition-all duration-300 ease-out">
              {/* Top Gold Accent Stroke */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E5A93C] to-transparent transform -skew-y-1 rounded-t-2xl" />

              {/* Single Top Right Close Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedMemberName(null);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white text-xs font-bold transition-all cursor-pointer z-30 shadow-md active:scale-95"
                title="Close Profile"
              >
                ✕
              </button>

              {/* SIDE-BY-SIDE INLINE LAYOUT */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
                {/* Left: Portrait Column (Portrait photo inside modal box) */}
                <div className="w-full md:w-56 shrink-0 flex flex-col items-center text-center relative pt-2">
                  {/* Ambient Glow */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full bg-[#E5A93C]/15 blur-xl pointer-events-none" />

                  {/* Portrait Photo cleanly framed inside the modal box */}
                  <div className="w-36 h-40 sm:w-44 sm:h-48 rounded-2xl overflow-hidden bg-gradient-to-b from-black/50 to-black/30 border border-[#E5A93C]/40 p-2 shadow-[0_8px_24px_rgba(0,0,0,0.5)] relative z-10 flex items-center justify-center">
                    <img
                      src={activeMember.photoUrl}
                      alt={activeMember.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_6px_14px_rgba(0,0,0,0.65)]"
                    />
                  </div>

                  <h3 className="text-white font-bold text-lg tracking-wide mt-3">{activeMember.name}</h3>
                  <p className="text-[11px] text-[#D4AF37] font-semibold tracking-wider mt-1 uppercase max-w-[220px] leading-snug">{activeMember.role}</p>
                  <span className="text-[10px] text-emerald-300 font-mono mt-0.5">{activeMember.category}</span>
                </div>

                {/* Right: Profile Details Dossier Column */}
                <div className="flex-1 min-w-0 space-y-4 pt-2 md:pt-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-emerald-200">
                      BSIT 3rd Year · ADSSU Bunawan
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#E5A93C]/20 border border-[#E5A93C]/40 text-xs font-bold text-amber-300">
                      {activeMember.specialty}
                    </span>
                  </div>

                  {/* Core Focus & Architecture */}
                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2 shadow-inner">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5A93C] flex items-center gap-1.5">
                      <span>Core Focus & Architecture</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
                      {activeMember.bio}
                    </p>
                  </div>

                  {/* Key StayNest Contributions */}
                  {activeMember.contributions && activeMember.contributions.length > 0 && (
                    <div className="p-4 rounded-xl bg-[#04281D]/80 border border-emerald-700/60 space-y-2 shadow-sm">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                        <span>Key StayNest Contributions & Systems</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                        {activeMember.contributions.map((c, i) => (
                          <div key={i} className="flex items-start gap-2 bg-black/25 p-2 rounded-lg border border-white/5">
                            <span className="text-[#E5A93C] font-black shrink-0">✓</span>
                            <span className="leading-snug">{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 5 MEMBER TEAM CARDS (Horizontal Scrollable Row with zero hanging artifacts) */
          <div
            ref={scrollContainerRef}
            className="team-horizontal-scroll flex flex-nowrap items-stretch gap-6 sm:gap-7 pt-24 pb-8 px-4 scroll-smooth transform-gpu will-change-transform overscroll-x-contain animate-in fade-in duration-200"
          >
            {STAYNEST_TEAM_MEMBERS.map((member, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  memberRefs.current[member.name] = el;
                }}
                className="w-[260px] sm:w-[270px] shrink-0 relative group cursor-pointer transition-all duration-300 transform-gpu will-change-transform"
                onClick={() => toggleMemberInline(member)}
              >
                {/* Card Container with Rich Radial Studio Gradient */}
                <div className="h-full relative bg-gradient-to-b from-[#063b2c] via-[#04281D] to-[#01140e] border border-[#D4AF37]/30 hover:border-[#D4AF37]/70 rounded-2xl pt-24 pb-6 px-4 text-center shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(229,169,60,0.18)] flex flex-col justify-between">
                  {/* Ambient Glow behind portrait */}
                  <div className="absolute top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-[#D4AF37]/10 blur-xl pointer-events-none transition-all group-hover:bg-[#E5A93C]/20" />

                  {/* Diagonal Gold Accent Header Stroke */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transform -skew-y-2 rounded-t-2xl" />

                  {/* Head & Shoulders Breakout Image */}
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-44 z-30 pointer-events-none">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)] scale-110 origin-bottom transition-transform duration-300 group-hover:scale-115"
                    />
                  </div>

                  {/* Member Info */}
                  <div className="relative z-10 mt-2 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-white font-bold text-base tracking-wide truncate">{member.name}</h3>
                      <p className="text-[10px] sm:text-[11px] text-[#D4AF37] font-semibold tracking-wider mt-1 uppercase leading-tight min-h-[28px] flex items-center justify-center px-1">
                        {member.role}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMemberInline(member);
                      }}
                      className="mt-6 w-full py-2.5 text-xs font-bold rounded-xl border border-[#D4AF37]/40 bg-[#053728] hover:bg-[#074D38] text-white transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                    >
                      <span>View Profile</span>
                      <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ============================================================================
// COMPONENT 3: TEAM MEMBER DETAIL MODAL (MATCHING GRADIENT & BREAKOUT)
// ============================================================================
export const TeamMemberDetailModal: React.FC<{
  member: TeamMember | null;
  onClose: () => void;
}> = ({ member, onClose }) => {
  if (!member) return null;

  const modalContent = (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
      style={{ zIndex: 1000 }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-gradient-to-b from-[#04281D] to-[#01140e] border border-[#D4AF37]/40 rounded-2xl p-8 md:p-10 shadow-2xl overflow-visible my-auto text-white animate-in zoom-in-95 duration-200"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-[#053728] pb-4 mb-8">
          <div className="flex items-center gap-2.5">
            <StayNestEmblem size="sm" />
            <div>
              <h3 className="text-[#D4AF37] font-serif text-lg font-bold">StayNest Engineering Team</h3>
              <p className="text-xs text-gray-400">ADSSU Bunawan - BSIT 3rd Year Capstone Project</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#04281D] border border-[#D4AF37]/30 flex items-center justify-center text-white hover:bg-[#063829] transition-colors cursor-pointer text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Modal Body Grid (Big Portrait Left, Details Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-4">
          {/* Left Column: Big Prominent Breakout Portrait Card */}
          <div className="md:col-span-5 flex justify-center mt-12">
            <div className="relative w-full max-w-[320px] bg-gradient-to-b from-[#063b2c] via-[#04281D] to-[#01140e] border border-[#D4AF37]/30 rounded-2xl pt-28 pb-8 px-6 text-center shadow-2xl overflow-visible">
              {/* Slash Diagonal Gold Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent transform -skew-y-2 rounded-t-2xl" />

              {/* Large Head & Shoulders Breakout Image */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-56 z-30 pointer-events-none">
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_18px_28px_rgba(0,0,0,0.85)] scale-115 origin-bottom"
                />
              </div>

              {/* Clean Role Badge */}
              <div className="mt-4 relative z-10">
                <p className="text-xs text-[#D4AF37] font-semibold tracking-widest uppercase">{member.role}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Details, Role & Bio */}
          <div className="md:col-span-7 space-y-5">
            <div className="inline-block px-3 py-1 rounded-full bg-[#04281D] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase">
              {member.role}
            </div>

            <h2 className="text-4xl font-serif font-bold text-[#D4AF37]">{member.name}</h2>
            <p className="text-sm font-medium text-emerald-300">{member.category || 'Leadership & Systems Architecture'}</p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-full bg-[#04281D] border border-gray-700 text-xs text-gray-300">BSIT 3rd Year</span>
              <span className="px-3 py-1 rounded-full bg-[#04281D] border border-gray-700 text-xs text-gray-300">ADSSU Bunawan</span>
            </div>

            <div className="mt-4 bg-[#021811]/90 border border-[#D4AF37]/20 rounded-xl p-5 shadow-inner space-y-3">
              <div>
                <h4 className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">Core Focus & Responsibility</h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {member.bio}
                </p>
              </div>

              {member.contributions && member.contributions.length > 0 && (
                <div className="pt-2 border-t border-[#053728]">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Key Contributions to StayNest</h4>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    {member.contributions.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#D4AF37] font-bold">✓</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : modalContent;
};

// ============================================================================
// COMPONENT 4: UNIFIED "ABOUT" MODAL (HOW IT WORKS + OUR TEAM ALL IN ONE)
// ============================================================================
export const StayNestGuideAndTeamModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onTryExplore?: () => void;
}> = ({ isOpen, onClose, onTryExplore }) => {
  const teamSectionRef = useRef<HTMLDivElement | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-6xl max-h-[94vh] overflow-y-auto bg-gradient-to-b from-[#053728] via-[#032319] to-[#021811] border-2 border-[#E5A93C] rounded-3xl shadow-2xl relative text-white animate-in zoom-in-95 duration-200"
        >
          {/* Pulsing Triangular Mesh Background */}
          <div className="mesh-container">
            <div className="mesh-grid" />
          </div>

          {/* Sticky Unified Top Header (Clean text "About", no emojis) */}
          <div className="sticky top-0 z-30 p-3 sm:p-5 bg-[#032319]/95 backdrop-blur-md border-b border-emerald-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <StayNestEmblem size="sm" />
              <div>
                <h3 className="font-serif italic text-base sm:text-xl font-bold text-[#EAA938] leading-tight">
                  About StayNest
                </h3>
                <span className="text-[10px] text-emerald-300">
                  Agusan del Sur State University (Bunawan) · BSIT Capstone
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  teamSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#E5A93C] text-xs font-bold hidden sm:flex items-center gap-1.5 cursor-pointer border border-[#E5A93C]/40 transition-colors"
              >
                <span>Our Team</span>
                <ChevronRight className="w-3.5 h-3.5 rotate-90" />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-2 sm:p-6 space-y-8">
            {/* 1. How It Works (Screen Demo Flow) */}
            <StayNestHowItWorksDemo />

            {/* Divider */}
            <div
              ref={teamSectionRef}
              className="relative py-4 flex items-center justify-center"
            >
              <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E5A93C]/50 to-transparent" />
              <div className="relative px-4 py-1 rounded-full bg-[#032319] border border-[#E5A93C]/60 text-[#E5A93C] text-xs font-serif italic font-bold shadow-lg">
                <span>Our Team</span>
              </div>
            </div>

            {/* 2. Our Team (Deep Emerald Studio + Gold Accent Bar with Inline Reveal) */}
            <StayNestOurTeamSection />
          </div>
        </div>
      </div>
    </>
  );
};
