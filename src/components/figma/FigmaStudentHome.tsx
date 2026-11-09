import React from 'react';
import {
  Compass,
  Heart,
  MapPin,
  MessageSquare,
  Search,
  SlidersHorizontal,
  Star,
  User,
  Map as MapIcon,
  ChevronRight,
  Eye,
  Navigation,
  Droplets,
  ShieldCheck,
  Wifi,
  Clock,
  Camera,
  Bed,
  Utensils,
  Wind,
  CheckCircle,
  Footprints,
  X,
  Sparkles,
  Users,
  Play,
  Crown,
} from 'lucide-react';
import { PropertyData } from './FigmaPropertyDetail';

interface FigmaStudentHomeProps {
  properties: PropertyData[];
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: PropertyData) => void;
  onOpenMap: () => void;
  onOpenFilter: () => void;
  onOpenTutorial?: () => void;
  onMessageLandlord: (property: PropertyData) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeChip: string;
  onChipChange: (chip: string) => void;
  onNavigateTab?: (tab: 'explore' | 'saved' | 'chat' | 'profile' | 'settings') => void;
}

const renderHighlightIcon = (label: string) => {
  if (label.includes('Water')) return <Droplets className="w-3 h-3 shrink-0" />;
  if (label.includes('Flood')) return <ShieldCheck className="w-3 h-3 shrink-0" />;
  if (label.includes('CCTV') || label.includes('Camera')) return <Camera className="w-3 h-3 shrink-0" />;
  if (label.includes('Wi-Fi') || label.includes('Wifi')) return <Wifi className="w-3 h-3 shrink-0" />;
  if (label.includes('Cook') || label.includes('Kitchen')) return <Utensils className="w-3 h-3 shrink-0" />;
  if (label.includes('Curfew')) return <Clock className="w-3 h-3 shrink-0" />;
  if (label.includes('Aircon') || label.includes('AC')) return <Wind className="w-3 h-3 shrink-0" />;
  return <CheckCircle className="w-3 h-3 shrink-0" />;
};

export const FigmaStudentHome: React.FC<FigmaStudentHomeProps> = ({
  properties,
  savedIds,
  onToggleSave,
  onSelectProperty,
  onOpenMap,
  onOpenFilter,
  onOpenTutorial,
  onMessageLandlord,
  searchQuery,
  onSearchChange,
  activeChip,
  onChipChange,
  onNavigateTab,
}) => {
  const chips = [
    'All Houses',
    'Under ₱1,500',
    'Within 1 km',
    '24/7 Water',
    'Low Flood',
    'Free Wi-Fi',
    'Curfew 10 PM',
  ];

  const filteredProperties = properties
    .filter((p) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.ownerName.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (activeChip === 'Under ₱1,500' && p.priceNum > 1500) return false;
      if (activeChip === 'Within 1 km') {
        const distNum = parseFloat(p.distance);
        if (!isNaN(distNum) && distNum > 1.0) return false;
        if (!p.distance.includes('0.') && !p.distance.includes('1.0') && !p.distance.includes('1 km') && !p.distance.includes('m')) return false;
      }
      if (activeChip === '24/7 Water' && !p.highlights.some((h) => h.label.toLowerCase().includes('24/7 water'))) return false;
      if (activeChip === 'Low Flood' && !p.highlights.some((h) => h.label.toLowerCase().includes('low flood'))) return false;
      if (activeChip === 'Free Wi-Fi' && !p.highlights.some((h) => h.label.toLowerCase().includes('free wi-fi') || h.label.toLowerCase().includes('free wifi'))) return false;
      if (activeChip === 'Curfew 10 PM' && !p.highlights.some((h) => h.label.toLowerCase().includes('curfew 10') || h.label.toLowerCase().includes('10:00 pm'))) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });

  return (
    <div className="w-full flex-1 flex flex-col font-sans select-none pb-16">
      {/* 1. STREAMLINED TOP CONTROL BAR (LIQUID GLASS EFFECT) */}
      <section className="bg-white/80 backdrop-blur-md border-b border-emerald-100/80 shadow-xs mb-4 sm:mb-6">
        <div className="max-w-[1720px] w-full mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 py-3 sm:py-3.5 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            {/* Search Input Bar */}
            <div className="w-full md:flex-1 max-w-2xl flex items-center gap-2.5 sm:gap-3 liquid-glass-input rounded-2xl px-3.5 sm:px-4 py-2 sm:py-2.5 transition-all">
              <Search className="w-4 h-4 text-emerald-800 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search boarding house name, street, or landlord in Bunawan..."
                className="w-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-500 bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Action Buttons: Filter & Satellite Map */}
            <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpenFilter}
                className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl liquid-glass-pill hover:bg-white text-slate-700 hover:text-emerald-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-95"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#00875A]" />
                <span>Filter Criteria</span>
              </button>

              <button
                type="button"
                onClick={onOpenMap}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <MapIcon className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span>Open Satellite Map</span>
              </button>
            </div>
          </div>

          {/* Quick Filter Chips Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 w-full">
            {chips.map((chip) => {
              const isActive = activeChip === chip || (chip === 'All Houses' && !activeChip);
              return (
                <button
                  key={chip}
                  onClick={() => onChipChange(chip === 'All Houses' ? '' : chip)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-[#00875A] text-white border border-emerald-400 shadow-xs'
                      : 'liquid-glass-pill text-slate-700 hover:bg-white/90 hover:text-slate-900'
                  }`}
                >
                  {chip === '24/7 Water' && <Droplets className="w-3 h-3 text-blue-400" />}
                  {chip === 'Low Flood' && <ShieldCheck className="w-3 h-3 text-emerald-400" />}
                  {chip === 'Free Wi-Fi' && <Wifi className="w-3 h-3 text-sky-400" />}
                  {chip === 'Within 1 km' && <Footprints className="w-3 h-3 text-amber-400" />}
                  <span>{chip}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. DIRECT ACCESS LISTINGS GRID SECTION */}
      <section className="max-w-[1720px] w-full mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 mt-3 sm:mt-6 space-y-4 sm:space-y-6">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-slate-200/80 pb-3">
          <div>
            <h2 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2 flex-wrap">
              <span>Verified Student Boarding Houses</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#00875A] text-xs font-bold">
                {filteredProperties.length} Available
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Accredited and inspected for ADSSU Bunawan students (Academic Year 2026–2027)
            </p>
          </div>

          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00875A] animate-pulse shrink-0" />
            <span>Zero Broker Markup · Direct Landlord Rates</span>
          </div>
        </div>

        {/* Improved Responsive Multi-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProperties.map((property) => {
            const isSaved = savedIds.includes(property.id);

            return (
              <div
                key={property.id}
                className="liquid-glass-card rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Photo & Badges */}
                <div
                  onClick={() => onSelectProperty(property)}
                  className="relative aspect-[16/10] bg-slate-900 overflow-hidden cursor-pointer"
                >
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

                  {/* LGU & BFP Verified Badge */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1.5 flex-wrap">
                    <div className="px-2.5 sm:px-3 py-1 rounded-full bg-[#00875A] text-white font-bold text-[10px] tracking-wide shadow-md flex items-center gap-1.5 backdrop-blur-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-white" />
                      <span>LGU VERIFIED</span>
                    </div>

                    {property.isFeatured && (
                      <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white font-black text-[10px] tracking-wide shadow-lg flex items-center gap-1 border border-amber-300/80 backdrop-blur-xs">
                        <Crown className="w-3.5 h-3.5 text-yellow-200 fill-yellow-200" />
                        <span>FEATURED</span>
                      </div>
                    )}
                  </div>

                  {/* Top-Right Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(property.id);
                    }}
                    className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white/95 text-rose-500 flex items-center justify-center shadow-md active:scale-90 transition-all cursor-pointer backdrop-blur-xs hover:bg-white"
                    title={isSaved ? 'Remove from Saved' : 'Save to Favorites'}
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isSaved ? 'fill-rose-500 text-rose-500' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {/* Price Tag Pill */}
                  <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-[#03241A]/90 backdrop-blur-md text-[#34D399] font-bold text-xs shadow-lg border border-[#E5A93C]/40">
                    <span className="text-white font-extrabold text-xs sm:text-sm">{property.price}</span>
                    <span className="text-[10px] text-slate-300 font-normal"> / month</span>
                  </div>

                  {/* Distance & Walking Time Pill */}
                  <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold flex items-center gap-1 sm:gap-1.5 shadow-md border border-white/20">
                    <Footprints className="w-3 h-3 text-[#E5A93C] shrink-0" />
                    <span>{property.distance} ({property.walkTime})</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5">
                  <div
                    onClick={() => onSelectProperty(property)}
                    className="cursor-pointer space-y-2"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-[#00875A] transition-colors">
                        {property.name}
                      </h3>
                      <div className="flex items-center text-xs font-bold text-amber-500 shrink-0 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline" />
                        <span className="ml-1 text-slate-800">{property.rating}</span>
                        <span className="text-[10px] text-slate-400 font-normal ml-1">
                          ({property.reviewsCount})
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{property.location}</span>
                    </p>

                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {property.description}
                    </p>
                  </div>

                  {/* Room Availability Pill */}
                  {property.roomOptions && property.roomOptions.length > 0 && (
                    <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between text-xs gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <Bed className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                        <span className="text-[11px] font-bold text-emerald-950 truncate">
                          {property.roomOptions[0].name}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#00875A] bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 shrink-0">
                        {property.roomOptions[0].slots}
                      </span>
                    </div>
                  )}

                  {/* Amenity Badges Row */}
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {property.highlights.slice(0, 4).map((h, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold shadow-2xs flex items-center gap-1"
                        style={{ backgroundColor: h.bg, color: h.text }}
                      >
                        {renderHighlightIcon(h.label)}
                        <span>{h.label}</span>
                      </span>
                    ))}
                  </div>

                  {/* Landlord Info Row */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100 gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                        {property.ownerAvatar}
                      </div>
                      <span className="font-semibold text-slate-700 truncate">{property.ownerName}</span>
                    </div>
                    <span className="text-emerald-700 text-[10px] font-medium shrink-0">
                      {property.replyTime}
                    </span>
                  </div>

                  {/* High Conversion Action Buttons */}
                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectProperty(property)}
                      className="py-2.5 px-2 sm:px-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-bold text-[11px] sm:text-xs uppercase tracking-wide transition-all cursor-pointer text-center flex items-center justify-center gap-1 sm:gap-1.5 active:scale-98 shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>View Rooms</span>
                    </button>

                    <button
                      onClick={() => onMessageLandlord(property)}
                      className="py-2.5 px-2 sm:px-3 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wide shadow-md active:scale-98 transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                      <span>Chat Owner</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
