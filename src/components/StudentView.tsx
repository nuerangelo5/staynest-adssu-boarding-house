import React, { useState, useMemo } from 'react';
import { BoardingHouse, BookingRequest } from '../types/staynest';
import { InteractiveMap } from './InteractiveMap';
import { MapViewerModal } from './MapViewerModal';
import {
  Calendar,
  CalendarCheck,
  Check,
  Compass,
  Droplets,
  GraduationCap,
  Heart,
  LayoutGrid,
  Map,
  MapPin,
  MessageSquare,
  Navigation,
  Search,
  Shield,
  ShieldCheck,
  Star,
  Users,
  Waves,
  Wifi,
  X,
  Split,
  Footprints,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface StudentViewProps {
  houses: BoardingHouse[];
  savedHouseIds: string[];
  bookings: BookingRequest[];
  onSelectHouse: (house: BoardingHouse) => void;
  onToggleSave: (houseId: string) => void;
  onMessageLandlord: (house: BoardingHouse) => void;
  onBookVisit: (house: BoardingHouse) => void;
  searchQuery?: string;
  onSearchQueryChange?: (q: string) => void;
}

export const StudentView: React.FC<StudentViewProps> = ({
  houses,
  savedHouseIds,
  bookings,
  onSelectHouse,
  onToggleSave,
  onMessageLandlord,
  onBookVisit,
  searchQuery: propSearchQuery,
  onSearchQueryChange,
}) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'saved' | 'my_visits'>('browse');
  // Requirement 1: Default to clean, uncluttered 'cards' grid view (no persistent static map clutter)
  const [viewMode, setViewMode] = useState<'cards' | 'split' | 'map'>('cards');
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const searchQuery = propSearchQuery !== undefined ? propSearchQuery : localSearchQuery;
  const setSearchQuery = onSearchQueryChange || setLocalSearchQuery;
  const [selectedHouseForMap, setSelectedHouseForMap] = useState<BoardingHouse | null>(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Smart Filters
  const [under1500, setUnder1500] = useState(false);
  const [within1km, setWithin1km] = useState(false);
  const [selectedGender, setSelectedGender] = useState<'all' | 'female_only' | 'male_only'>('all');
  const [water247Only, setWater247Only] = useState(false);
  const [lowFloodOnly, setLowFloodOnly] = useState(false);
  const [cctvOnly, setCctvOnly] = useState(false);
  const [wifiOnly, setWifiOnly] = useState(false);

  // Filter Logic
  const filteredHouses = useMemo(() => {
    return houses.filter((h) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matches =
          h.name.toLowerCase().includes(query) ||
          h.barangay.toLowerCase().includes(query) ||
          h.address.toLowerCase().includes(query) ||
          h.contactPerson.toLowerCase().includes(query);
        if (!matches) return false;
      }

      if (under1500 && h.priceStart > 1500) return false;
      if (within1km && h.distanceKm > 1.0) return false;
      if (selectedGender !== 'all' && h.genderPolicy !== selectedGender) return false;
      if (water247Only && !h.waterSupply.is247) return false;
      if (lowFloodOnly && h.floodRisk.level !== 'Low') return false;
      if (cctvOnly && !h.security.hasCCTV) return false;
      if (wifiOnly && !h.amenities.wifi) return false;

      return true;
    });
  }, [
    houses,
    searchQuery,
    under1500,
    within1km,
    selectedGender,
    water247Only,
    lowFloodOnly,
    cctvOnly,
    wifiOnly,
  ]);

  const savedHouses = useMemo(() => {
    return houses.filter((h) => savedHouseIds.includes(h.id));
  }, [houses, savedHouseIds]);

  const clearFilters = () => {
    setSearchQuery('');
    setUnder1500(false);
    setWithin1km(false);
    setSelectedGender('all');
    setWater247Only(false);
    setLowFloodOnly(false);
    setCctvOnly(false);
    setWifiOnly(false);
  };

  const hasActiveFilters =
    under1500 ||
    within1km ||
    selectedGender !== 'all' ||
    water247Only ||
    lowFloodOnly ||
    cctvOnly ||
    wifiOnly ||
    Boolean(searchQuery);

  // Trigger Dynamic Map on Card Click
  const handleOpenMapForHouse = (house: BoardingHouse) => {
    setSelectedHouseForMap(house);
    if (viewMode === 'cards') {
      setIsMapModalOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Student Top Bar: Tabs & View Mode Switcher */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar w-full md:w-auto pb-0.5">
          <button
            onClick={() => setActiveTab('browse')}
            className={`shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'browse'
                ? 'bg-[#0F4A38] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <span className="sm:hidden">Explore ({houses.length})</span>
            <span className="hidden sm:inline">Explore Boarding Houses ({houses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'bg-[#0F4A38] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Saved ({savedHouseIds.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('my_visits')}
            className={`shrink-0 px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'my_visits'
                ? 'bg-[#0F4A38] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span className="sm:hidden">Visits ({bookings.length})</span>
            <span className="hidden sm:inline">My Visit Bookings ({bookings.length})</span>
          </button>
        </div>

        {/* View Switcher Controls (Cards Default, Split, Full Map) */}
        {activeTab === 'browse' && (
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs shadow-xs self-start md:self-auto shrink-0">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'cards'
                  ? 'bg-slate-100 text-[#0F4A38] font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid Cards View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => {
                if (!selectedHouseForMap && filteredHouses.length > 0) {
                  setSelectedHouseForMap(filteredHouses[0]);
                }
                setViewMode('split');
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'split'
                  ? 'bg-slate-100 text-[#0F4A38] font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Split View (Cards + Map)"
            >
              <Split className="w-3.5 h-3.5" />
              <span>Split</span>
            </button>
            <button
              onClick={() => {
                if (!selectedHouseForMap && filteredHouses.length > 0) {
                  setSelectedHouseForMap(filteredHouses[0]);
                }
                setViewMode('map');
              }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'map'
                  ? 'bg-slate-100 text-[#0F4A38] font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Full Map View"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Full Map</span>
            </button>
          </div>
        )}
      </div>

      {activeTab === 'browse' && (
        <>
          {/* Search & Smart Filters Bar */}
          <div className="bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
            {/* Top Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-emerald-700 dark:text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search boarding houses near ADSSU (e.g. San Teodoro, Fritzcel, Highway, Uno)..."
                className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-[#08291F] border border-slate-200 dark:border-emerald-700/60 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#0F4A38] dark:focus:border-[#E5A93C] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Collapsible Filter Header */}
            <div className="flex sm:hidden items-center justify-between pt-0.5">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors shadow-2xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#0F4A38]" />
                <span>
                  Filters{' '}
                  {[under1500, within1km, selectedGender !== 'all', water247Only, lowFloodOnly, cctvOnly, wifiOnly].filter(Boolean).length > 0
                    ? `(${[under1500, within1km, selectedGender !== 'all', water247Only, lowFloodOnly, cctvOnly, wifiOnly].filter(Boolean).length} active)`
                    : ''}
                </span>
                {isMobileFilterOpen ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-2 py-1 text-slate-500 hover:text-slate-900 text-xs underline"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Smart Filter Buttons */}
            <div className={`${isMobileFilterOpen ? 'flex' : 'hidden sm:flex'} flex-wrap items-center gap-2 pt-1 text-xs`}>
              <span className="text-[11px] font-bold text-[#0F4A38] uppercase tracking-wider mr-1 hidden sm:inline">
                Quick Filters:
              </span>

              {/* 1. Under ₱1,500 */}
              <button
                onClick={() => setUnder1500(!under1500)}
                className={`px-3 py-1.5 rounded-lg font-bold border transition-all flex items-center gap-1.5 ${
                  under1500
                    ? 'bg-[#0F4A38] text-white border-[#0F4A38] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
              >
                <span>Under ₱1,500</span>
                {under1500 && <Check className="w-3.5 h-3.5" />}
              </button>

              {/* 2. Within 1 km */}
              <button
                onClick={() => setWithin1km(!within1km)}
                className={`px-3 py-1.5 rounded-lg font-bold border transition-all flex items-center gap-1.5 ${
                  within1km
                    ? 'bg-[#0F4A38] text-white border-[#0F4A38] shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                }`}
              >
                <span>Within 1 km</span>
                {within1km && <Check className="w-3.5 h-3.5" />}
              </button>

              {/* 3. Gender Segment */}
              <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
                <button
                  onClick={() => setSelectedGender('all')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    selectedGender === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Genders
                </button>
                <button
                  onClick={() => setSelectedGender('female_only')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    selectedGender === 'female_only'
                      ? 'bg-[#0F4A38] text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Female Only
                </button>
                <button
                  onClick={() => setSelectedGender('male_only')}
                  className={`px-2.5 py-1 rounded text-xs font-semibold ${
                    selectedGender === 'male_only'
                      ? 'bg-[#0F4A38] text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Male Only
                </button>
              </div>

              {/* 4. 24/7 Water Supply Matcher */}
              <button
                onClick={() => setWater247Only(!water247Only)}
                className={`px-3 py-1.5 rounded-lg font-semibold border transition-all flex items-center gap-1.5 ${
                  water247Only
                    ? 'bg-cyan-700 text-white border-cyan-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-cyan-500'
                }`}
              >
                <Droplets className="w-3.5 h-3.5 text-cyan-500" />
                <span>24/7 Water Only</span>
              </button>

              {/* 5. Low Flood Risk */}
              <button
                onClick={() => setLowFloodOnly(!lowFloodOnly)}
                className={`px-3 py-1.5 rounded-lg font-semibold border transition-all flex items-center gap-1.5 ${
                  lowFloodOnly
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500'
                }`}
              >
                <Waves className="w-3.5 h-3.5 text-emerald-600" />
                <span>Low Flood Risk</span>
              </button>

              {/* 6. CCTV & Security */}
              <button
                onClick={() => setCctvOnly(!cctvOnly)}
                className={`px-3 py-1.5 rounded-lg font-semibold border transition-all flex items-center gap-1.5 ${
                  cctvOnly
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>CCTV Guarded</span>
              </button>

              {/* 7. WiFi */}
              <button
                onClick={() => setWifiOnly(!wifiOnly)}
                className={`px-3 py-1.5 rounded-lg font-semibold border transition-all flex items-center gap-1.5 ${
                  wifiOnly
                    ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                <span>WiFi</span>
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-2.5 py-1 text-slate-500 hover:text-slate-900 text-xs underline ml-auto hidden sm:inline"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Result Count and Active Radius Indicator */}
          <div className="flex items-center justify-between gap-2 text-xs text-slate-600 px-1">
            <div className="flex items-center gap-2 min-w-0">
              <span className="truncate">
                Showing <strong className="text-[#0F4A38] font-mono">{filteredHouses.length}</strong> boarding houses
              </span>
              <span className="hidden md:inline text-slate-300">·</span>
              <span className="hidden md:inline text-emerald-800 font-medium">
                ADSSU Gate (8.1692° N, 126.0044° E)
              </span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-rose-600 hover:text-rose-700 underline font-semibold shrink-0"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Dynamic Content Views */}
          {viewMode === 'map' ? (
            /* Full Map View */
            <div className="space-y-4">
              <InteractiveMap
                houses={filteredHouses}
                selectedHouse={selectedHouseForMap}
                onSelectHouse={(h) => {
                  setSelectedHouseForMap(h);
                  onSelectHouse(h);
                }}
                radiusFilterKm={within1km ? 1.0 : undefined}
                heightClass="h-[650px]"
                onSwitchViewMode={(m) => setViewMode(m)}
              />
            </div>
          ) : viewMode === 'split' ? (
            /* Split View */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left: Cards List */}
              <div className="lg:col-span-7 space-y-4">
                {filteredHouses.length === 0 ? (
                  <div className="p-10 rounded-2xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 text-center space-y-3 shadow-xs">
                    <p className="text-slate-800 dark:text-slate-200 font-bold text-base">No boarding houses matched your filters.</p>
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 bg-[#0F4A38] text-white dark:bg-[#E5A93C] dark:text-[#051F17] font-bold text-xs rounded-xl"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  filteredHouses.map((house) => (
                    <BoardingHouseCard
                      key={house.id}
                      house={house}
                      isSelected={selectedHouseForMap?.id === house.id}
                      isSaved={savedHouseIds.includes(house.id)}
                      onSelectCard={() => {
                        setSelectedHouseForMap(house);
                        onSelectHouse(house);
                      }}
                      onOpenMap={() => setSelectedHouseForMap(house)}
                      onToggleSave={() => onToggleSave(house.id)}
                      onMessageLandlord={() => onMessageLandlord(house)}
                      onBookVisit={() => onBookVisit(house)}
                    />
                  ))
                )}
              </div>

              {/* Right: Sticky Map */}
              <div className="lg:col-span-5 sticky top-24">
                <InteractiveMap
                  houses={filteredHouses}
                  selectedHouse={selectedHouseForMap}
                  onSelectHouse={(h) => {
                    setSelectedHouseForMap(h);
                    onSelectHouse(h);
                  }}
                  radiusFilterKm={within1km ? 1.0 : undefined}
                  heightClass="h-[600px]"
                  onClose={() => setViewMode('cards')}
                  onSwitchViewMode={(m) => setViewMode(m)}
                />
              </div>
            </div>
          ) : (
            /* Requirement 1: DEFAULT CLEAN GRID VIEW (NO CLUTTERING STATIC MAP) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredHouses.length === 0 ? (
                <div className="col-span-full p-12 rounded-2xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 text-center space-y-3 shadow-xs">
                  <p className="text-slate-800 dark:text-slate-200 font-bold text-base">No boarding houses found matching your filters.</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Try adjusting your price or distance filters to see more accommodations in Bunawan.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-[#0F4A38] text-white dark:bg-[#E5A93C] dark:text-[#051F17] font-bold text-xs rounded-xl shadow-xs"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                filteredHouses.map((house) => (
                  <BoardingHouseCard
                    key={house.id}
                    house={house}
                    isSelected={selectedHouseForMap?.id === house.id}
                    isSaved={savedHouseIds.includes(house.id)}
                    onSelectCard={() => handleOpenMapForHouse(house)}
                    onOpenMap={() => handleOpenMapForHouse(house)}
                    onOpenDetails={() => onSelectHouse(house)}
                    onToggleSave={() => onToggleSave(house.id)}
                    onMessageLandlord={() => onMessageLandlord(house)}
                    onBookVisit={() => onBookVisit(house)}
                  />
                ))
              )}
            </div>
          )}
        </>
      )}

      {/* Dynamic Map Modal (Triggered on Card Click) */}
      <MapViewerModal
        house={selectedHouseForMap}
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        houses={filteredHouses}
        onSelectHouse={(h) => {
          setSelectedHouseForMap(h);
        }}
        onOpenDetails={(h) => {
          setIsMapModalOpen(false);
          onSelectHouse(h);
        }}
        onSwitchToSplitView={() => {
          setIsMapModalOpen(false);
          setViewMode('split');
        }}
        onSwitchToFullMap={() => {
          setIsMapModalOpen(false);
          setViewMode('map');
        }}
      />

      {/* Saved Houses Tab */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-slate-100">
              Your Bookmarked Boarding Houses
            </h3>
            <span className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
              {savedHouses.length} saved for ADSSU semester
            </span>
          </div>

          {savedHouses.length === 0 ? (
            <div className="p-12 rounded-2xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 text-center space-y-3 shadow-xs">
              <Heart className="w-10 h-10 text-slate-300 dark:text-emerald-600 mx-auto" />
              <p className="text-slate-800 dark:text-slate-200 font-bold text-base">You haven't saved any boarding houses yet.</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click the heart icon on any boarding house card to save it to your comparison list.
              </p>
              <button
                onClick={() => setActiveTab('browse')}
                className="px-4 py-2 bg-[#0F4A38] text-white dark:bg-[#E5A93C] dark:text-[#051F17] font-bold text-xs rounded-xl"
              >
                Browse ADSSU Listings
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedHouses.map((house) => (
                <BoardingHouseCard
                  key={house.id}
                  house={house}
                  isSelected={false}
                  isSaved={true}
                  onSelectCard={() => handleOpenMapForHouse(house)}
                  onOpenMap={() => handleOpenMapForHouse(house)}
                  onOpenDetails={() => onSelectHouse(house)}
                  onToggleSave={() => onToggleSave(house.id)}
                  onMessageLandlord={() => onMessageLandlord(house)}
                  onBookVisit={() => onBookVisit(house)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* My Visit Bookings Tab */}
      {activeTab === 'my_visits' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-slate-100">
              Scheduled Physical Visits & Reservations
            </h3>
            <span className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
              Coordinated via StayNest Bunawan
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 rounded-2xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 text-center space-y-3 shadow-xs">
              <CalendarCheck className="w-10 h-10 text-slate-300 dark:text-emerald-600 mx-auto" />
              <p className="text-slate-800 dark:text-slate-200 font-bold text-base">No visit schedules requested yet.</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Found a boarding house you like? Click "Schedule Visit" to arrange an ocular inspection with the landlord!
              </p>
              <button
                onClick={() => setActiveTab('browse')}
                className="px-4 py-2 bg-[#0F4A38] text-white dark:bg-[#E5A93C] dark:text-[#051F17] font-bold text-xs rounded-xl"
              >
                Find Boarding Houses
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">
                        {b.houseName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600/50'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-600/50'
                        }`}
                      >
                        {b.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-800 dark:text-emerald-300">
                      Room: <span className="font-semibold text-slate-900 dark:text-slate-200">{b.roomName}</span> · {b.type === 'visit_schedule' ? 'Ocular Physical Visit' : 'Bedspace Reservation'}
                    </p>
                    <div className="text-xs text-slate-600 dark:text-slate-400 flex flex-wrap gap-4 pt-1">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Date: <strong className="text-slate-800 dark:text-slate-200">{b.visitDate || b.targetMoveInDate}</strong></span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                        <span>Student ID: <strong className="text-slate-800 dark:text-slate-200">{b.studentIdNumber}</strong></span>
                      </span>
                    </div>
                    {b.notes && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic pt-1">Note: "{b.notes}"</p>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-end gap-2 shrink-0">
                    <span className="text-[11px] text-slate-400">Submitted on {b.createdAt}</span>
                    <button
                      onClick={() => {
                        const h = houses.find((item) => item.id === b.houseId);
                        if (h) onMessageLandlord(h);
                      }}
                      className="px-3.5 py-1.5 bg-[#0F4A38] text-white dark:bg-[#E5A93C] dark:text-[#051F17] font-bold text-xs rounded-lg hover:bg-emerald-800 dark:hover:bg-[#F59E0B] flex items-center gap-1.5 shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Message Landlord</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

interface BoardingHouseCardProps {
  house: BoardingHouse;
  isSelected: boolean;
  isSaved: boolean;
  onSelectCard: () => void;
  onOpenMap: () => void;
  onOpenDetails?: () => void;
  onToggleSave: () => void;
  onMessageLandlord: () => void;
  onBookVisit: () => void;
}

const BoardingHouseCard: React.FC<BoardingHouseCardProps> = ({
  house,
  isSelected,
  isSaved,
  onSelectCard,
  onOpenMap,
  onOpenDetails,
  onToggleSave,
  onMessageLandlord,
  onBookVisit,
}) => {
  return (
    <div
      onClick={onSelectCard}
      className={`group cursor-pointer rounded-2xl bg-white dark:bg-[#06281E] border transition-all duration-200 overflow-hidden flex flex-col justify-between hover:shadow-lg ${
        isSelected
          ? 'border-[#0F4A38] dark:border-[#E5A93C] ring-2 ring-[#0F4A38]/30 dark:ring-[#E5A93C]/40 shadow-md bg-emerald-50/10 dark:bg-[#083024]'
          : 'border-[#E2E8F0] dark:border-emerald-800/60 hover:border-slate-300 dark:hover:border-[#E5A93C]/60 shadow-xs'
      }`}
    >
      <div>
        {/* Card Image Banner */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
          <img
            src={house.images[0]}
            alt={house.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Top badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-[#0F4A38] text-white dark:bg-[#E5A93C] dark:text-[#051F17] font-mono font-bold text-xs shadow-md">
              ₱{house.priceStart.toLocaleString()}/mo
            </span>
            {house.verified && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-900/90 border border-emerald-500/70 text-emerald-100 text-[10px] font-bold backdrop-blur-sm flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-300" />
                <span>Verified</span>
              </span>
            )}
          </div>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave();
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors ${
              isSaved
                ? 'bg-rose-50 text-rose-600 border border-rose-300 dark:bg-rose-950/90 dark:text-rose-400 dark:border-rose-500/60'
                : 'bg-black/30 text-white hover:bg-black/50'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Bottom Walk Time Overlay with "View Route" trigger */}
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-white bg-black/65 dark:bg-[#051F17]/85 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/20 dark:border-emerald-800/50">
            <span className="font-bold text-[#FDE047] dark:text-[#E5A93C] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {house.distanceKm} km from ADSSU
            </span>
            <span className="text-emerald-300 font-semibold flex items-center gap-1">
              <Footprints className="w-3 h-3" />
              <span>~{house.walkMinutes} min walk</span>
            </span>
          </div>
        </div>

        {/* Card Content Area */}
        <div className="p-4 sm:p-5 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#0F172A] dark:text-slate-50 group-hover:text-[#0F4A38] dark:group-hover:text-[#E5A93C] transition-colors">
                {house.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">{house.address}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-600/40 shrink-0 font-bold">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{house.rating}</span>
              <span className="text-[10px] font-normal text-amber-600/80 dark:text-amber-200/60">({house.reviewCount})</span>
            </div>
          </div>

          {/* Matcher Checkpoints - 2x2 Clean Responsive Grid */}
          <div className="grid grid-cols-2 gap-1.5 pt-2 text-[11px] sm:text-xs border-t border-slate-100">
            {/* Water Supply */}
            <div className="flex items-center gap-1.5 text-slate-600 min-w-0">
              <Check className="w-3.5 h-3.5 text-cyan-600 shrink-0 font-bold" />
              <span className="truncate font-medium">{house.waterSupply.is247 ? '24/7 Water' : house.waterSupply.status}</span>
            </div>

            {/* Flood Risk */}
            <div className="flex items-center gap-1.5 text-slate-600 min-w-0">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 font-bold" />
              <span className="truncate font-medium">{house.floodRisk.level} Flood Risk</span>
            </div>

            {/* Security */}
            <div className="flex items-center gap-1.5 text-slate-600 min-w-0">
              <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 font-bold" />
              <span className="truncate font-medium">{house.security.hasCCTV ? 'CCTV Guarded' : 'Gated Perimeter'}</span>
            </div>

            {/* Rules */}
            <div className="flex items-center gap-1.5 text-slate-600 min-w-0">
              <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 font-bold" />
              <span className="truncate font-medium">Curfew {house.rules.curfew.split(' ')[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions: Responsive Action Toolbar + Primary Schedule Button */}
      <div className="p-3 sm:p-3.5 bg-slate-50 border-t border-slate-100 space-y-2">
        {/* Row 1: 3-button quick action bar */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenMap();
            }}
            className="py-2 px-1.5 sm:px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-[#0F4A38] text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
            title="Open Interactive Mini Map with Route from ADSSU Gate"
          >
            <Navigation className="w-3.5 h-3.5 text-[#0F4A38] shrink-0" />
            <span className="truncate">Route</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onOpenDetails) onOpenDetails();
            }}
            className="py-2 px-1.5 sm:px-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
            title="View Full Photos, Reviews & Room Rates"
          >
            <Compass className="w-3.5 h-3.5 text-[#0F4A38] shrink-0" />
            <span className="truncate">Details</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onMessageLandlord();
            }}
            className="py-2 px-1.5 sm:px-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1 transition-colors shadow-2xs"
            title="Direct Chat with Landlord"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#0F4A38] shrink-0" />
            <span className="truncate">Chat</span>
          </button>
        </div>

        {/* Row 2: Full-width Primary Visit Booking Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookVisit();
          }}
          className="w-full py-2.5 px-3 rounded-xl bg-[#0F4A38] hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <CalendarCheck className="w-4 h-4 shrink-0" />
          <span>Schedule Ocular Visit</span>
        </button>
      </div>
    </div>
  );
};
