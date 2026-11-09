import React, { useState } from 'react';
import {
  Home,
  ShieldCheck,
  Crown,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Droplets,
  Clock,
  CheckCircle2,
  ArrowRight,
  Building,
  FileCheck2,
  Users,
  Edit,
} from 'lucide-react';

interface FigmaLandlordOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  landlordName?: string;
  houseName?: string;
}

export const FigmaLandlordOnboardingModal: React.FC<FigmaLandlordOnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  landlordName = 'Landlord',
  houseName = 'Boarding House',
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const firstName = landlordName ? landlordName.trim().split(' ')[0] : 'Landlord';

  const steps = [
    {
      id: 'step-manage',
      badge: 'Step 1 of 3 · Property Management',
      badgeBg: 'bg-emerald-100 text-[#00875A]',
      title: 'Manage Your Boarding House',
      subtitle: 'Easily update room availability, monthly rates, and showcase real Bunawan property photos and contact details.',
      gradientHeader: 'from-[#053728] via-[#00875A] to-emerald-700',
      icon: Home,
      cardColor: 'bg-emerald-50/70 border-emerald-200/80',
      illustration: (
        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-slate-900 border border-emerald-200 shadow-md p-3.5 flex flex-col justify-center gap-2.5">
          <div className="flex items-center justify-between text-xs text-white">
            <span className="font-bold flex items-center gap-1.5 text-emerald-300">
              <Building className="w-4 h-4 text-emerald-400" />
              <span className="truncate max-w-[200px]">{houseName}</span>
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-400/30">
              Live Listing
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-2.5 bg-white/95 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                <span>Room 01 - Solo</span>
                <span className="text-[#00875A]">₱1,200/mo</span>
              </div>
              <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                VACANT · Ready
              </span>
            </div>

            <div className="p-2.5 bg-white/95 rounded-xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                <span>Room 02 - Sharing</span>
                <span className="text-slate-600">₱1,000/mo</span>
              </div>
              <span className="inline-block px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-[9px] font-bold">
                OCCUPIED · Angelo N.
              </span>
            </div>
          </div>

          <div className="p-2 bg-emerald-950/60 rounded-xl border border-emerald-400/30 text-emerald-200 text-[10px] flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Edit className="w-3 h-3 text-amber-300" />
              <span>Tap 'Edit Photo & Price' anytime to update listings</span>
            </span>
            <span className="font-bold text-[#E5A93C]">Fast Sync</span>
          </div>
        </div>
      ),
      bulletPoints: [
        'Update room status between Vacant and Occupied in 1 click.',
        'Upload authentic photos of your Bunawan property & dorm rooms.',
        'Set custom monthly rates and inclusion badges (Wi-Fi, Water, Bed).',
      ],
    },
    {
      id: 'step-[#00875A]',
      badge: 'Step 2 of 3 · LGU & Safety Compliance',
      badgeBg: 'bg-amber-100 text-amber-800',
      title: 'LGU & Safety Verification',
      subtitle: 'Submit and track LGU Bunawan accreditation, BFP fire safety inspection permits, and verified water supply badges.',
      gradientHeader: 'from-amber-600 via-amber-700 to-[#053728]',
      icon: ShieldCheck,
      cardColor: 'bg-amber-50/70 border-amber-200/80',
      illustration: (
        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-500/10 via-emerald-500/10 to-teal-500/10 border border-amber-200 p-3.5 flex flex-col justify-center gap-2">
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-2.5 bg-white/95 rounded-xl border border-emerald-200 shadow-xs flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-[#00875A] flex items-center justify-center shrink-0">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-none">Mayor's Permit</p>
                <p className="text-[10px] text-emerald-700 font-mono mt-0.5">2026-BNW-0491</p>
              </div>
            </div>

            <div className="p-2.5 bg-white/95 rounded-xl border border-amber-200 shadow-xs flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-none">BFP Fire Cert</p>
                <p className="text-[10px] text-amber-800 mt-0.5">FSIC Inspected</p>
              </div>
            </div>

            <div className="p-2.5 bg-white/95 rounded-xl border border-blue-200 shadow-xs flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <Droplets className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-none">24/7 Water Badge</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Potable Supply</p>
              </div>
            </div>

            <div className="p-2.5 bg-white/95 rounded-xl border border-teal-200 shadow-xs flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-none">10 PM Curfew</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Gated Perimeter</p>
              </div>
            </div>
          </div>
        </div>
      ),
      bulletPoints: [
        'Submit digital copies of Title, Mayor Permit, PhilSys ID, and BFP FSIC.',
        'Track LGU Bunawan approval queue status live on your dashboard.',
        'Earn the official green Verified LGU Badge to build student trust.',
      ],
    },
    {
      id: 'step-gold',
      badge: 'Step 3 of 3 · Gold Tier & Student Inquiries',
      badgeBg: 'bg-teal-100 text-teal-800',
      title: 'Annual Gold Subscription & Tenants',
      subtitle: 'Activate the Landlord Annual Gold tier (₱299/yr) to pin listings to the top, feature properties on the map, and manage direct student reservation inquiries.',
      gradientHeader: 'from-amber-500 via-amber-600 to-[#053728]',
      icon: Crown,
      cardColor: 'bg-teal-50/70 border-teal-200/80',
      illustration: (
        <div className="relative w-full h-44 sm:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-amber-950 to-emerald-950 border border-amber-200/60 p-3.5 text-white flex flex-col justify-center space-y-2.5">
          <div className="flex items-center justify-between p-2.5 bg-amber-400/15 rounded-xl border border-amber-400/40 backdrop-blur-xs">
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400 fill-amber-400" />
              <div className="text-left">
                <p className="text-xs font-black text-amber-300 leading-none">Landlord Annual Gold</p>
                <p className="text-[10px] text-slate-300 mt-0.5">₱299 / 12 Months · 1-Tap GCash Checkout</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold text-[9px] uppercase">
              Pinned #1
            </span>
          </div>

          <div className="p-2.5 bg-white/10 rounded-xl border border-white/20 text-left space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-[#E5A93C] flex items-center gap-1">
                <Users className="w-3.5 h-3.5" /> Direct ADSSU Reservations
              </span>
              <span className="text-[9px] text-emerald-300 font-mono">0% Broker Fee</span>
            </div>
            <p className="text-xs text-slate-200 truncate">
              Angelo Nuer reserved Room 01 (Move-in pass generated)
            </p>
          </div>
        </div>
      ),
      bulletPoints: [
        'Pin your property to the top of ADSSU student search & interactive map.',
        'Receive direct student room reservations with 0% broker commission.',
        'View full student dossiers, COR verifications, and guardian contacts.',
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
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white font-bold text-sm shrink-0">
              <current.icon className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider block">
                Landlord Onboarding Guide
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                Welcome, {firstName}!
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
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
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
