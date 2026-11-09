import React, { useState } from 'react';
import { BoardingHouse, Review } from '../types/staynest';
import {
  Check,
  CheckCircle2,
  Clock,
  Droplets,
  Heart,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  Shield,
  ShieldCheck,
  Star,
  Users,
  Waves,
  Wifi,
  X,
  Zap,
  CalendarCheck,
  Building2,
  Sparkles,
} from 'lucide-react';

interface HouseDetailModalProps {
  house: BoardingHouse;
  isOpen: boolean;
  onClose: () => void;
  onMessageLandlord: (house: BoardingHouse) => void;
  onBookVisit: (house: BoardingHouse) => void;
  onOpenMap?: (house: BoardingHouse) => void;
  isSaved: boolean;
  onToggleSave: (houseId: string) => void;
  onAddReview?: (houseId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

export const HouseDetailModal: React.FC<HouseDetailModalProps> = ({
  house,
  isOpen,
  onClose,
  onMessageLandlord,
  onBookVisit,
  onOpenMap,
  isSaved,
  onToggleSave,
  onAddReview,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [studentYear, setStudentYear] = useState('BS Information Technology · 3rd Year');

  if (!isOpen) return null;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !onAddReview) return;
    onAddReview(house.id, {
      studentName: 'Angelo Nuer',
      courseAndYear: studentYear,
      rating: newRating,
      comment: newComment.trim(),
      verifiedStudent: true,
    });
    setNewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#072B20] border border-slate-200 dark:border-[#E5A93C]/50 rounded-2xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="text-xs font-mono font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#0F4A38] text-white shrink-0">
              ₱{house.priceStart.toLocaleString()}/mo
            </span>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 truncate">
              <MapPin className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
              <span className="font-semibold text-slate-900 truncate">{house.distanceKm} km</span>
              <span className="text-slate-400">·</span>
              <span className="text-emerald-700 font-medium truncate">~{house.walkMinutes}m walk</span>
            </div>
            {onOpenMap && (
              <button
                onClick={() => onOpenMap(house)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#0F4A38] border border-emerald-200 text-xs font-semibold transition-colors shrink-0"
                title="View dynamic walking route on live map"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>View Route on Map</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(house.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isSaved
                  ? 'bg-rose-50 border-rose-300 text-rose-600 dark:bg-rose-950/60 dark:border-rose-600/50 dark:text-rose-400'
                  : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 dark:bg-emerald-950/60 dark:border-emerald-800/60 dark:text-slate-300 dark:hover:text-white'
              }`}
              title={isSaved ? 'Remove from Saved' : 'Save to Favorites'}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 dark:bg-emerald-950/60 dark:border-emerald-800/60 dark:text-slate-300 dark:hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-7 space-y-7 flex-1">
          {/* Header Title & Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                {house.name}
              </h2>
              {house.verified && (
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-900/80 dark:border-emerald-500/60 dark:text-emerald-200 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{house.verificationLevel}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-xs text-amber-700 bg-amber-50 dark:text-amber-300 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-600/40 px-2.5 py-0.5 rounded-full font-bold">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{house.rating}</span>
                <span className="text-amber-700/80 dark:text-amber-200/60 font-normal">({house.reviewCount} reviews)</span>
              </div>
              <div className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                {house.genderPolicy === 'female_only'
                  ? 'Female Only'
                  : house.genderPolicy === 'male_only'
                  ? 'Male Only'
                  : 'All Genders / Co-ed'}
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-emerald-200/80">{house.tagline}</p>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#0F4A38]" />
              <span>{house.address}</span>
            </p>

            {onOpenMap && (
              <button
                onClick={() => onOpenMap(house)}
                className="sm:hidden mt-2.5 w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0F4A38] border border-emerald-200 text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-[#0F4A38]" />
                <span>View Route on Map ({house.distanceKm} km · ~{house.walkMinutes}m walk)</span>
              </button>
            )}
          </div>

          {/* Photo Gallery with Thumbnails */}
          <div className="space-y-2">
            <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-emerald-800/40">
              <img
                src={house.images[activeImageIndex] || house.images[0]}
                alt={house.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-black/60 dark:bg-[#051F17]/90 px-3 py-1 rounded text-xs text-white font-medium border border-white/20 dark:border-emerald-700/50 backdrop-blur-sm">
                Photo {activeImageIndex + 1} of {house.images.length}
              </div>
            </div>

            {house.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {house.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#0F4A38] dark:border-[#E5A93C] ring-2 ring-[#0F4A38]/30 dark:ring-[#E5A93C]/40'
                        : 'border-slate-200 dark:border-emerald-900/60 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${house.name} ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5 Core Matchers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Water Supply */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0A3326] border border-slate-200 dark:border-emerald-800/50 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-950/80 border border-cyan-300 dark:border-cyan-500/40 flex items-center justify-center text-cyan-800 dark:text-cyan-300">
                    <Droplets className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-wider uppercase font-bold text-cyan-800 dark:text-cyan-300">
                      Water Reliability
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Water Supply Status</h4>
                  </div>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded font-bold flex items-center gap-1 ${
                    house.waterSupply.is247
                      ? 'bg-cyan-50 text-cyan-800 border border-cyan-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-600/50'
                      : 'bg-amber-50 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-600/50'
                  }`}
                >
                  <Check className="w-3 h-3 text-cyan-700 dark:text-emerald-400" />
                  <span>{house.waterSupply.status}</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {house.waterSupply.description}
              </p>
              {house.waterSupply.hasWaterTank && (
                <div className="text-[11px] text-cyan-900 dark:text-cyan-200/80 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                  <span>Equipped with backup overhead water tank reservoir.</span>
                </div>
              )}
            </div>

            {/* 2. Flood Risk Assessment */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0A3326] border border-slate-200 dark:border-emerald-800/50 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-center text-emerald-800 dark:text-emerald-300">
                    <Waves className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-wider uppercase font-bold text-emerald-800 dark:text-emerald-300">
                      Bunawan Weather
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Flood Risk Rating</h4>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-600/50 flex items-center gap-1">
                  <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>Flood Risk: {house.floodRisk.level}</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {house.floodRisk.description}
              </p>
              <div className="text-[11px] text-emerald-800 dark:text-emerald-200/80 flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Verified high-ground topography and safe road access.</span>
              </div>
            </div>

            {/* 3. Security & Safety */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0A3326] border border-slate-200 dark:border-emerald-800/50 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-[#E5A93C]/20 border border-amber-300 dark:border-[#E5A93C]/40 flex items-center justify-center text-amber-900 dark:text-[#E5A93C]">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-wider uppercase font-bold text-amber-900 dark:text-[#E5A93C]">
                      Safety & Trust
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Security Details</h4>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded font-bold bg-amber-50 text-amber-900 border border-amber-300 dark:bg-[#06281E] dark:text-[#E5A93C] dark:border-[#E5A93C]/50 flex items-center gap-1">
                  <Check className="w-3 h-3 text-amber-700 dark:text-[#E5A93C]" />
                  <span>CCTV + Guarded</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {house.security.details}
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-700 dark:text-slate-300">
                {house.security.hasCCTV && (
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-emerald-950/70 rounded border border-slate-200 dark:border-emerald-700/50">
                    Active CCTV
                  </span>
                )}
                {house.security.hasSecurityGuard && (
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-emerald-950/70 rounded border border-slate-200 dark:border-emerald-700/50">
                    Night Guard
                  </span>
                )}
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-emerald-950/70 rounded border border-slate-200 dark:border-emerald-700/50">
                  Curfew {house.security.curfew}
                </span>
              </div>
            </div>

            {/* 4. House Rules */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0A3326] border border-slate-200 dark:border-emerald-800/50 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-amber-950/80 border border-slate-300 dark:border-amber-500/40 flex items-center justify-center text-slate-700 dark:text-amber-300">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-wider uppercase font-bold text-slate-700 dark:text-amber-300">
                      Transparent Policies
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">House Rules & Terms</h4>
                  </div>
                </div>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                <li>· Curfew: <span className="text-slate-900 dark:text-slate-100 font-semibold">{house.rules.curfew}</span></li>
                <li>· Visitors: <span className="text-slate-900 dark:text-slate-100 font-semibold">{house.rules.visitorsAllowed}</span></li>
                <li>· Cooking: <span className="text-slate-900 dark:text-slate-100 font-semibold">{house.rules.cookingAllowed ? 'Allowed in shared kitchen' : 'No cooking'}</span></li>
                <li>· Pets: <span className="text-slate-900 dark:text-slate-100 font-semibold">{house.rules.petsAllowed ? 'Allowed' : 'Strictly no pets'}</span></li>
              </ul>
            </div>
          </div>

          {/* Available Rooms & Bedspaces */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0F4A38] dark:text-[#E5A93C]" />
              <span>Available Rooms & Bedspace Rates</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {house.rooms.map((room) => (
                <div
                  key={room.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{room.name}</span>
                      <span className="text-sm font-mono font-bold text-[#0F4A38] dark:text-[#E5A93C]">
                        ₱{room.priceMonthly.toLocaleString()}/mo
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mb-2 leading-relaxed">{room.description}</p>
                    <div className="text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        {room.availableSlots} of {room.totalSlots} slots vacant
                      </span>
                      <span>·</span>
                      <span className="text-slate-500 dark:text-slate-400 font-mono">Deposit: ₱{room.depositRequired}</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2">
                    {onOpenMap && (
                      <button
                        onClick={() => onOpenMap(house)}
                        className="py-2 px-3 bg-white hover:bg-slate-100 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-[#0F4A38] dark:text-[#E5A93C] text-xs font-semibold rounded-lg border border-slate-200 dark:border-emerald-700/60 transition-colors flex items-center justify-center gap-1 shadow-2xs"
                        title="View walking route from ADSSU to this room"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Map Route</span>
                      </button>
                    )}
                    <button
                      onClick={() => onBookVisit(house)}
                      className="flex-1 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-[#0F4A38] dark:bg-emerald-900/80 dark:hover:bg-emerald-800 dark:text-[#E5A93C] text-xs font-bold rounded-lg border border-emerald-200 dark:border-emerald-700/60 transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      <span>Reserve or Schedule Visit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Facility Checklist */}
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-3">Facility Checklist</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${house.amenities.wifi ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-700/50 text-slate-900 dark:text-slate-200' : 'opacity-40 border-slate-200'}`}>
                <Wifi className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>WiFi Internet</span>
              </div>
              <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${house.amenities.studyArea ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-700/50 text-slate-900 dark:text-slate-200' : 'opacity-40 border-slate-200'}`}>
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Study Area</span>
              </div>
              <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${house.amenities.individualMeter ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-700/50 text-slate-900 dark:text-slate-200' : 'opacity-40 border-slate-200'}`}>
                <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Individual Meter</span>
              </div>
              <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${house.amenities.potableDrinkingWater ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-700/50 text-slate-900 dark:text-slate-200' : 'opacity-40 border-slate-200'}`}>
                <Droplets className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Drinking Water</span>
              </div>
            </div>
          </div>

          {/* Student Reviews Section */}
          <div className="border-t border-slate-200 dark:border-emerald-800/40 pt-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Reviews from Verified ADSSU Students
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Real feedback from actual residents in Bunawan
                </p>
              </div>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-emerald-900/60 dark:border-emerald-700/60 text-[#0F4A38] dark:text-[#E5A93C] transition-colors"
              >
                {showReviewForm ? 'Cancel' : 'Write Student Review'}
              </button>
            </div>

            {/* Write Review Form */}
            {showReviewForm && (
              <form
                onSubmit={handleSubmitReview}
                className="mb-5 p-4 rounded-xl bg-slate-50 dark:bg-[#06281E] border border-slate-200 dark:border-[#E5A93C]/50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Rating:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 text-slate-300 hover:text-amber-500 transition-colors"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newRating
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">
                    Your Course & Year Level (at ADSSU):
                  </label>
                  <input
                    type="text"
                    value={studentYear}
                    onChange={(e) => setStudentYear(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800 rounded-lg text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#0F4A38] dark:focus:border-[#E5A93C]"
                    placeholder="e.g. BS Information Technology · 3rd Year"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">
                    Your Review (water, security, landlords, environment):
                  </label>
                  <textarea
                    rows={2}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share honest tips for fellow ADSSU students..."
                    className="w-full px-3 py-2 bg-white dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800 rounded-lg text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#0F4A38] dark:focus:border-[#E5A93C]"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#0F4A38] text-white dark:bg-[#E5A93C] dark:text-[#051F17] font-bold text-xs rounded-lg hover:bg-emerald-800 dark:hover:bg-[#F59E0B]"
                  >
                    Post ADSSU Review
                  </button>
                </div>
              </form>
            )}

            {/* Existing Reviews List */}
            <div className="space-y-3">
              {house.reviews.length === 0 ? (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#06281E]/60 text-center text-xs text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-emerald-900">
                  No reviews yet. Be the first verified ADSSU student to share your experience!
                </div>
              ) : (
                house.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3.5 rounded-xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-900/70 space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-slate-900 dark:text-slate-200">{rev.studentName}</span>
                        {rev.verifiedStudent && (
                          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">ADSSU Verified</span>
                        )}
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">· {rev.courseAndYear}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-amber-500">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < rev.rating
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-slate-300 dark:text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{rev.date}</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                      "{rev.comment}"
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-3.5 sm:p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
            <div className="text-left">
              <span className="text-[10px] text-slate-500 block">Landlord Contact</span>
              <span className="font-bold text-xs text-slate-900">{house.contactPerson}</span>
            </div>
            <a
              href={`tel:${house.contactNumber}`}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 flex items-center gap-1.5 hover:text-slate-900 shadow-2xs font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-700" />
              <span>{house.contactNumber}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => onMessageLandlord(house)}
              className="flex-1 sm:flex-initial px-3 sm:px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 sm:gap-2 shadow-2xs transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#0F4A38]" />
              <span className="sm:hidden">Message</span>
              <span className="hidden sm:inline">Message Landlord</span>
            </button>
            <button
              onClick={() => onBookVisit(house)}
              className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-xl bg-[#0F4A38] hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 sm:gap-2 shadow-xs transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              <span className="sm:hidden">Schedule Visit</span>
              <span className="hidden sm:inline">Schedule Visit / Reserve</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
