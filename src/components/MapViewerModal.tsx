import React, { useState } from 'react';
import { BoardingHouse } from '../types/staynest';
import { InteractiveMap } from './InteractiveMap';
import {
  Footprints,
  Maximize2,
  Minimize2,
  X,
  ArrowRight,
  Navigation,
} from 'lucide-react';

interface MapViewerModalProps {
  house: BoardingHouse | null;
  isOpen: boolean;
  onClose: () => void;
  houses: BoardingHouse[];
  onSelectHouse: (house: BoardingHouse) => void;
  onOpenDetails: (house: BoardingHouse) => void;
  onSwitchToSplitView?: () => void;
  onSwitchToFullMap?: () => void;
}

export const MapViewerModal: React.FC<MapViewerModalProps> = ({
  house,
  isOpen,
  onClose,
  houses,
  onSelectHouse,
  onOpenDetails,
  onSwitchToSplitView,
  onSwitchToFullMap,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const touchStartY = React.useRef<number | null>(null);

  if (!isOpen || !house) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchEndY - touchStartY.current;
    // If swiped down by more than 70px, close the modal
    if (diff > 70) {
      onClose();
    }
    touchStartY.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-5 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative w-full ${
          isFullScreen
            ? 'h-[96vh] sm:h-[92vh] sm:max-w-7xl'
            : 'h-[80vh] sm:h-[530px] sm:max-w-2xl'
        } bg-white border-t sm:border border-[#E2E8F0] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[#0F172A] transition-all duration-300`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Touch Drag Handle Indicator */}
        <div
          className="sm:hidden pt-2.5 pb-2 flex flex-col items-center justify-center bg-white cursor-pointer select-none border-b border-slate-100"
          onClick={onClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          title="Tap or drag down to close"
        >
          <div className="w-12 h-1.5 bg-slate-300 rounded-full hover:bg-slate-400 transition-colors" />
          <span className="text-[10px] text-slate-400 mt-1 font-medium">Swipe down to close</span>
        </div>

        {/* Modal Top Header Bar */}
        <div className="px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-[#E2E8F0] bg-white flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-50 text-[#0F4A38] border border-emerald-200 flex items-center justify-center font-bold shrink-0">
              <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0F4A38]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 truncate">
                  {house.name}
                </h3>
                <span className="font-mono text-[11px] sm:text-xs font-bold text-[#0F4A38] bg-emerald-50 border border-emerald-200 px-1.5 sm:px-2 py-0.5 rounded-md shrink-0">
                  ₱{house.priceStart.toLocaleString()}/mo
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                {house.address}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Explicit Fullscreen Toggle */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-semibold text-slate-800 transition-colors shadow-2xs flex items-center gap-1.5"
              title={isFullScreen ? 'Return to compact mini map' : 'Expand to full interactive map'}
            >
              {isFullScreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 text-[#0F4A38]" />
                  <span className="hidden sm:inline">Mini Map</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 text-[#0F4A38]" />
                  <span className="hidden sm:inline">Fullscreen</span>
                </>
              )}
            </button>

            {/* View Full Details Button (Desktop Header) */}
            <button
              onClick={() => {
                onClose();
                onOpenDetails(house);
              }}
              className="hidden sm:flex px-3 py-1.5 rounded-xl bg-[#0F4A38] hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors items-center gap-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Easy Tap-to-Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center"
              aria-label="Close Mini Map"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mini Map Viewport Canvas */}
        <div className="flex-1 relative w-full h-full min-h-[300px]">
          <InteractiveMap
            houses={houses}
            selectedHouse={house}
            onSelectHouse={onSelectHouse}
            heightClass="h-full"
            isModal={true}
            isFullScreen={isFullScreen}
          />

          {/* Floating Action Banner with walking distance and mobile View Details button */}
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto z-[450] bg-white/95 backdrop-blur-md px-3 py-2 sm:px-3.5 sm:py-2 rounded-2xl sm:rounded-full border border-slate-200 shadow-xl flex items-center justify-between sm:justify-start gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#0F4A38] flex items-center justify-center font-bold shrink-0">
                <Footprints className="w-3.5 h-3.5 text-[#0F4A38]" />
              </div>
              <div className="flex items-center gap-1 text-slate-800 text-[11px] sm:text-xs min-w-0">
                <span className="font-bold font-mono text-[#0F4A38] shrink-0">{house.distanceKm} km</span>
                <span className="text-slate-400">·</span>
                <span className="text-emerald-800 font-semibold truncate">~{house.walkMinutes} min walk from ADSSU Gate</span>
              </div>
            </div>

            {/* Mobile-Only Direct Details Action */}
            <button
              onClick={() => {
                onClose();
                onOpenDetails(house);
              }}
              className="sm:hidden px-2.5 py-1 rounded-xl bg-[#0F4A38] hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors shrink-0 flex items-center gap-1"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
