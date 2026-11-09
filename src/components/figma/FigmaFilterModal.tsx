import React, { useState } from 'react';
import { Check, X, SlidersHorizontal, BedDouble, Users, DoorClosed, CreditCard, MapPin, Bed } from 'lucide-react';

interface FigmaFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: {
    minPrice: number;
    maxPrice: number;
    distance: string;
    roomType: string;
    amenities: string[];
  }) => void;
}

export const FigmaFilterModal: React.FC<FigmaFilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
}) => {
  const [minRent, setMinRent] = useState(1000);
  const [maxRent, setMaxRent] = useState(3500);
  const [distance, setDistance] = useState('≤ 1 km');
  const [roomType, setRoomType] = useState('Bed spacer');
  const [amenities, setAmenities] = useState<string[]>(['Wi-Fi', 'Water included']);

  if (!isOpen) return null;

  const toggleAmenity = (name: string) => {
    setAmenities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const handleReset = () => {
    setMinRent(1000);
    setMaxRent(3500);
    setDistance('Any');
    setRoomType('Bed spacer');
    setAmenities(['Wi-Fi', 'Water included']);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-md animate-in fade-in p-0 sm:p-4">
      <div
        className="w-full max-w-lg liquid-glass rounded-t-[32px] sm:rounded-3xl p-6 sm:p-8 shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[90vh] overflow-y-auto border-2 border-white/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient liquid glow orb behind filter content */}
        <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />

        {/* Drag handle */}
        <div className="w-12 h-1.5 bg-slate-300/80 rounded-full mx-auto mb-4 sm:hidden" />

        {/* Header */}
        <div className="flex justify-between items-start mb-5 relative z-10">
          <div>
            <h3 className="text-xl font-bold text-[#053728] leading-tight font-serif italic">
              Filter Boarding Houses
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Narrow down choices around ADSSU Bunawan Campus
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors px-2 py-1 rounded-lg hover:bg-rose-50/50 cursor-pointer"
            >
              Reset All
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200/60 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-5 relative z-10">
          {/* Section 1: Affordability */}
          <div className="p-4 rounded-2xl liquid-glass-card space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                <CreditCard className="w-3.5 h-3.5 text-emerald-700" />
                <span>Affordability</span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono">PHP / month</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-2.5 rounded-xl liquid-glass-input">
                <span className="text-[10px] text-slate-500 block font-medium uppercase">Minimum rent</span>
                <span className="text-sm font-bold text-slate-900">₱{minRent.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-xl liquid-glass-input">
                <span className="text-[10px] text-slate-500 block font-medium uppercase">Maximum rent</span>
                <span className="text-sm font-bold text-slate-900">₱{maxRent.toLocaleString()}</span>
              </div>
            </div>

            {/* Range Slider Track */}
            <input
              type="range"
              min={500}
              max={5000}
              step={100}
              value={maxRent}
              onChange={(e) => setMaxRent(Number(e.target.value))}
              className="w-full accent-[#00875A] cursor-pointer h-2 bg-slate-200/80 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>₱500</span>
              <span>₱5,000+</span>
            </div>
          </div>

          {/* Section 2: Distance to campus */}
          <div className="p-4 rounded-2xl liquid-glass-card space-y-2.5">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>Distance to campus</span>
            </span>
            <div className="grid grid-cols-4 gap-2">
              {['Any', '≤ 500 m', '≤ 1 km', '≤ 2 km'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDistance(d)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer ${
                    distance === d
                      ? 'bg-[#00875A] text-white shadow-xs font-black'
                      : 'liquid-glass-pill text-slate-700 hover:bg-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Room type */}
          <div className="p-4 rounded-2xl liquid-glass-card space-y-2.5">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
              <Bed className="w-3.5 h-3.5 text-emerald-700" />
              <span>Room type</span>
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { name: 'Bed spacer', icon: BedDouble },
                { name: 'Shared room', icon: Users },
                { name: 'Private room', icon: DoorClosed },
              ].map((rt) => {
                const IconComp = rt.icon;
                const isActive = roomType === rt.name;
                return (
                  <button
                    key={rt.name}
                    onClick={() => setRoomType(rt.name)}
                    className={`p-3 rounded-2xl text-center transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                      isActive
                        ? 'bg-[#00875A] text-white shadow-xs border border-emerald-400 font-bold'
                        : 'liquid-glass-pill text-slate-700 hover:bg-white'
                    }`}
                  >
                    <IconComp className={`w-5 h-5 ${isActive ? 'text-white' : 'text-emerald-700'}`} />
                    <span className="text-[11px] font-bold">{rt.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: Amenities */}
          <div className="p-4 rounded-2xl liquid-glass-card space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
                <SlidersHorizontal className="w-3.5 h-3.5 text-emerald-700" />
                <span>Amenities</span>
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Select multiple</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'Wi-Fi', label: 'Wi-Fi' },
                { id: 'Private CR', label: 'Private CR' },
                { id: 'Water included', label: 'Water included' },
                { id: 'Cooking allowed', label: 'Cooking allowed' },
              ].map((amenity) => {
                const checked = amenities.includes(amenity.id);
                return (
                  <button
                    key={amenity.id}
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`p-2.5 rounded-xl text-left text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                      checked
                        ? 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-950 shadow-2xs'
                        : 'liquid-glass-pill text-slate-700 hover:bg-white'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                        checked ? 'bg-[#00875A] text-white' : 'border border-slate-300 bg-white/80'
                      }`}
                    >
                      {checked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span>{amenity.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => {
              onApply({ minPrice: minRent, maxPrice: maxRent, distance, roomType, amenities });
              onClose();
            }}
            className="w-full py-3.5 rounded-2xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs uppercase tracking-wider shadow-lg active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
