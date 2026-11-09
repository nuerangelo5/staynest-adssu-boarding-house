import React, { useState } from 'react';
import {
  MapPin,
  ShieldCheck,
  Calendar,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Droplets,
  Clock,
  Footprints,
  Compass,
  CheckCircle2,
  ArrowRight,
  Eye,
  School,
  Wallet,
  SlidersHorizontal,
} from 'lucide-react';

interface FigmaOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  studentName?: string;
}

export const FigmaOnboardingModal: React.FC<FigmaOnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  studentName = 'Angelo',
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const firstName = studentName ? studentName.trim().split(' ')[0] : 'Angelo';

  const steps = [
    {
      id: 'step-map',
      badge: 'Step 1 of 3 · Spatial Map Discovery',
      badgeBg: 'bg-emerald-100 text-[#00875A]',
      title: `Welcome to StayNest, ${firstName}!`,
      subtitle:
        'Find verified, safe, and affordable student boarding houses near ADSSU Bunawan with real walking and tricycle travel times instantly.',
      gradientHeader: 'from-emerald-500 via-teal-600 to-[#00875A]',
      icon: MapPin,
      cardColor: 'bg-emerald-50/70 border-emerald-200/80',
      illustration: (
        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-slate-900 border border-emerald-200 shadow-md flex items-center justify-center p-3">
          {/* Simulated Satellite Map BG */}
          <div className="absolute inset-0 bg-[radial-gradient(#00875A_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
          
          <div className="relative z-10 w-full max-w-sm space-y-2.5 text-left">
            {/* Campus Tag */}
            <div className="px-3 py-1.5 rounded-xl bg-[#053728] text-white border border-[#E5A93C]/80 shadow-lg flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold">
                <School className="w-3.5 h-3.5 text-[#E5A93C]" />
                <span className="truncate">ADSSU Bunawan Campus Gate</span>
              </div>
              <span className="text-[10px] text-[#E5A93C] font-mono">8.1692° N</span>
            </div>

            {/* Simulated Marker Items */}
            <div className="p-2.5 rounded-xl bg-white/95 shadow-md border border-slate-200 text-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span className="truncate">Jiomer Dalayap Boarding House</span>
                <span className="text-[#00875A] shrink-0">₱1,200/mo</span>
              </div>
              <div className="flex flex-wrap items-center gap-1 text-[10px]">
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold border border-emerald-200 flex items-center gap-1">
                  <span>🚶</span>
                  <span>7 min walk</span>
                </span>
                <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 font-bold border border-amber-200 flex items-center gap-1">
                  <span>🛺</span>
                  <span>2–3 min trike</span>
                </span>
                <span className="text-slate-500 truncate ml-auto">Purok 8, Poblacion</span>
              </div>
            </div>
          </div>
        </div>
      ),
      bulletPoints: [
        'Interactive spatial map centered squarely on ADSSU Main Gate.',
        'Real-time walking & tricycle commute time estimates for every property.',
        'Filter by price range, bedspace type, and proximity to campus.',
      ],
    },
    {
      id: 'step-safety',
      badge: 'Step 2 of 3 · Custom Housing Filters',
      badgeBg: 'bg-amber-100 text-amber-800',
      title: 'Filter for Your Satisfaction',
      subtitle: 'Easily sort boarding houses based on what matters most to you.',
      gradientHeader: 'from-amber-500 via-amber-600 to-[#B45309]',
      icon: SlidersHorizontal,
      cardColor: 'bg-amber-50/70 border-amber-200/80',
      illustration: (
        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-amber-200 p-3.5 flex flex-col justify-center gap-2">
          <div className="grid grid-cols-2 gap-2 text-left">
            {/* Filter Card 1: Budget Friendly */}
            <div className="p-2.5 bg-white/95 rounded-xl border border-emerald-200 shadow-xs flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#00875A] flex items-center justify-center shrink-0">
                <Wallet className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-none">Budget Friendly</p>
                <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">Fits monthly allowance</p>
              </div>
            </div>

            {/* Filter Card 2: Safe & Secure */}
            <div className="p-2.5 bg-white/95 rounded-xl border border-amber-200 shadow-xs flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-none">Safe & Secure</p>
                <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">Gated 10 PM curfew</p>
              </div>
            </div>

            {/* Filter Card 3: Walking Distance */}
            <div className="p-2.5 bg-white/95 rounded-xl border border-blue-200 shadow-xs flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Footprints className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-none">Walking Distance</p>
                <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">Minutes to ADSSU gate</p>
              </div>
            </div>

            {/* Filter Card 4: Essential Amenities */}
            <div className="p-2.5 bg-white/95 rounded-xl border border-teal-200 shadow-xs flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-none">Essential Amenities</p>
                <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">24/7 Water & Wi-Fi</p>
              </div>
            </div>
          </div>
        </div>
      ),
      bulletPoints: [
        'Budget Friendly: Find rooms that fit your exact monthly allowance.',
        'Safe & Secure: Gated entry with trusted 10 PM student curfew rules.',
        'Walking Distance: Choose how close you want to be to the ADSSU gate.',
        'Essential Amenities: Filter by reliable water supply, Wi-Fi, and study spaces.',
      ],
    },
    {
      id: 'step-booking',
      badge: 'Step 3 of 3 · Direct Bookings & Ocular Tours',
      badgeBg: 'bg-teal-100 text-teal-800',
      title: 'Schedule Ocular Visits & Chat Landlords',
      subtitle: 'Connect directly with authenticated landlords without broker markups.',
      gradientHeader: 'from-teal-600 via-emerald-600 to-[#00875A]',
      icon: Calendar,
      cardColor: 'bg-teal-50/70 border-teal-200/80',
      illustration: (
        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 border border-teal-200 p-4 text-white flex flex-col justify-center space-y-3">
          <div className="p-3 bg-white/10 rounded-xl border border-white/20 backdrop-blur-xs text-left space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[#E5A93C] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Direct Chat & Booking
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[9px] font-mono">Verified Landlord</span>
            </div>
            <p className="text-xs text-slate-200">
              "Ma'ayong buntag! Available pa ang Room 01 for 2nd Semester?"
            </p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="px-3 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md flex items-center gap-1.5 flex-1 justify-center">
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Ocular Tour</span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md flex items-center gap-1.5 flex-1 justify-center">
              <Eye className="w-3.5 h-3.5 text-[#00875A]" />
              <span>View Property</span>
            </div>
          </div>
        </div>
      ),
      bulletPoints: [
        'Chat directly with verified local landlords like Jiomer, Elizabeth & Rhejie.',
        'Schedule free in-person campus ocular tours before reserving.',
        'Reserve bedspaces online with transparent 0% student fee guarantee.',
      ],
    },
  ];

  const current = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200 font-sans">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header Bar */}
        <div className={`p-4 sm:p-5 bg-gradient-to-r ${current.gradientHeader} text-white flex items-center justify-between transition-colors duration-300 shrink-0`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white font-bold text-sm">
              <current.icon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider block">
                Student Onboarding Guide
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                Quick Student Walkthrough
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer active:scale-95"
            title="Close Tutorial"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-left">
          {/* Step Badge */}
          <div className="flex items-center justify-between gap-2">
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${current.badgeBg}`}>
              {current.badge}
            </span>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {steps.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStep(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === currentStep
                      ? 'w-6 bg-[#00875A]'
                      : 'w-2 bg-slate-200 hover:bg-slate-300'
                  }`}
                  title={`Go to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Title & Subtitle */}
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {current.title}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {current.subtitle}
            </p>
          </div>

          {/* Visual Illustration Component */}
          {current.illustration}

          {/* Key Feature Bullet Points */}
          <div className={`p-3.5 rounded-2xl border ${current.cardColor} space-y-2`}>
            {current.bulletPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-[#00875A] shrink-0 mt-0.5" />
                <span className="leading-snug">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          {currentStep > 0 ? (
            <button
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs shadow-2xs transition-all cursor-pointer flex items-center gap-1 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl text-slate-400 hover:text-slate-600 font-bold text-xs transition-colors cursor-pointer"
            >
              Skip Intro
            </button>
          )}

          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ml-auto"
          >
            <span>{currentStep === steps.length - 1 ? 'Get Started Now' : 'Next Step'}</span>
            {currentStep === steps.length - 1 ? (
              <ArrowRight className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
