import React, { useState } from 'react';
import { BoardingHouse, BookingRequest } from '../types/staynest';
import {
  Building,
  Check,
  CheckCircle2,
  Clock,
  Crown,
  DollarSign,
  Droplets,
  Edit,
  Megaphone,
  MessageSquare,
  Percent,
  Plus,
  Shield,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
  X,
  CalendarCheck,
  Database,
  Terminal,
} from 'lucide-react';
import { SUPABASE_POSTGIS_SCHEMA_SQL } from '../services/supabaseArchitecture';

interface LandlordViewProps {
  houses: BoardingHouse[];
  bookings: BookingRequest[];
  onUpdateBookingStatus: (bookingId: string, status: 'confirmed' | 'declined') => void;
  onOpenChatWithStudent: (booking: BookingRequest) => void;
  onAddListing: (newHouse: BoardingHouse) => void;
  onUpdateHouse: (updatedHouse: BoardingHouse) => void;
}

export const LandlordView: React.FC<LandlordViewProps> = ({
  houses,
  bookings,
  onUpdateBookingStatus,
  onOpenChatWithStudent,
  onAddListing,
  onUpdateHouse,
}) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'inquiries' | 'verification' | 'subscription' | 'database'>('listings');
  const [showAddListingModal, setShowAddListingModal] = useState(false);
  const [editingHouse, setEditingHouse] = useState<BoardingHouse | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  const totalVacantSlots = houses.reduce(
    (acc, h) => acc + h.rooms.reduce((rAcc, r) => rAcc + r.availableSlots, 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Landlord Header Dashboard Strip */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-[#E5A93C]/40 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0F4A38] text-white dark:bg-[#E5A93C] dark:text-[#051F17] font-bold">
              Landlord Portal
            </span>
            <span className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">Bunawan Property Management</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-slate-50">
            Nanay Fritzcel's Property Hub
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
            Managing verified student accommodations near Agusan del Sur State University (ADSSU).
          </p>
        </div>

        <button
          onClick={() => setShowAddListingModal(true)}
          className="px-4 py-2.5 bg-[#0F4A38] hover:bg-emerald-800 text-white dark:bg-[#E5A93C] dark:hover:bg-[#F59E0B] dark:text-[#051F17] font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Boarding House</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Vacant Slots</span>
            <Users className="w-4 h-4 text-[#D97706] dark:text-[#E5A93C]" />
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-[#E5A93C]">{totalVacantSlots} Beds</div>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 font-medium">Ready for student occupancy</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Visit Inquiries</span>
            <CalendarCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-800 dark:text-emerald-300">{bookings.length} Pending</div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Active requests from ADSSU students</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Verification</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">100% Certified</div>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1">ADSSU & Barangay Endorsed</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Tools Plan</span>
            <Sparkles className="w-4 h-4 text-[#D97706] dark:text-[#E5A93C]" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 font-mono">Pro ₱49/mo</div>
          <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-1">Unlimited listings & direct chat</p>
        </div>
      </div>

      {/* Landlord Sub Tabs */}
      <div className="flex border-b border-slate-200 gap-1.5 sm:gap-2 pb-2 overflow-x-auto no-scrollbar text-xs font-bold">
        <button
          onClick={() => setActiveTab('listings')}
          className={`shrink-0 px-3 sm:px-4 py-2 rounded-xl transition-all ${
            activeTab === 'listings'
              ? 'bg-[#0F4A38] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          My Listed Properties ({houses.length})
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`shrink-0 px-3 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'inquiries'
              ? 'bg-[#0F4A38] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          <span>Student Bookings</span>
          {bookings.filter((b) => b.status === 'pending').length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px]">
              {bookings.filter((b) => b.status === 'pending').length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('verification')}
          className={`shrink-0 px-3 sm:px-4 py-2 rounded-xl transition-all ${
            activeTab === 'verification'
              ? 'bg-[#0F4A38] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          ADSSU Badges
        </button>
        <button
          onClick={() => setActiveTab('subscription')}
          className={`shrink-0 px-3 sm:px-4 py-2 rounded-xl transition-all ${
            activeTab === 'subscription'
              ? 'bg-[#0F4A38] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          Plans & Tools
        </button>
        <button
          onClick={() => setActiveTab('database')}
          className={`shrink-0 px-3 sm:px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
            activeTab === 'database'
              ? 'bg-[#0F4A38] text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>PostGIS Architecture</span>
        </button>
      </div>

      {/* Tab 1: Listings Management */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-slate-100">
              Active Boarding House Listings
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Changes reflect live on the Student Search Map
            </span>
          </div>

          <div className="space-y-4">
            {houses.map((house) => (
              <div
                key={house.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={house.images[0]}
                    alt={house.name}
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-emerald-700/60 shadow-xs"
                  />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-50">{house.name}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600/50 font-semibold">
                        {house.verificationLevel}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-300">{house.address}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300 pt-1">
                      <span className="text-[#0F4A38] dark:text-[#E5A93C] font-mono font-bold">
                        ₱{house.priceStart.toLocaleString()}/mo
                      </span>
                      <span>·</span>
                      <span className="text-cyan-700 dark:text-cyan-300 flex items-center gap-1 font-medium">
                        <Droplets className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        {house.waterSupply.status}
                      </span>
                      <span>·</span>
                      <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1 font-medium">
                        <Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        Curfew: {house.rules.curfew}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => setEditingHouse(house)}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 border border-slate-200 dark:border-emerald-700/60 text-xs font-bold text-slate-800 dark:text-[#E5A93C] flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Quick Edit Rules & Rates</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Inquiries & Ocular Visits */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-slate-100">
              Student Inquiries & Ocular Visits
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Incoming from verified ADSSU students
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="p-10 rounded-2xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 text-center text-slate-500 dark:text-slate-400 text-xs shadow-xs">
              No pending visit schedules at the moment.
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{booking.studentName}</span>
                      <span className="text-xs font-mono text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-700/60">
                        {booking.studentIdNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          booking.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600/50'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-600/50'
                        }`}
                      >
                        {booking.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Inquiring for: <strong className="text-slate-900 dark:text-slate-100">{booking.roomName}</strong> at {booking.houseName}
                    </p>

                    <div className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap gap-3">
                      <span>Preferred Visit: <strong className="text-slate-800 dark:text-slate-200">{booking.visitDate || booking.targetMoveInDate}</strong></span>
                      <span>Phone: <strong className="text-slate-800 dark:text-slate-200">{booking.studentPhone}</strong></span>
                      <span>Email: <strong className="text-slate-800 dark:text-slate-200">{booking.studentEmail}</strong></span>
                    </div>

                    {booking.notes && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">Student note: "{booking.notes}"</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => onUpdateBookingStatus(booking.id, 'confirmed')}
                          className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accept & Confirm</span>
                        </button>
                        <button
                          onClick={() => onUpdateBookingStatus(booking.id, 'declined')}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-rose-950 dark:hover:bg-rose-900 border border-slate-200 dark:border-rose-700/60 text-slate-700 dark:text-rose-300 font-bold text-xs transition-colors"
                        >
                          Decline
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => onOpenChatWithStudent(booking)}
                      className="px-3.5 py-2 rounded-xl bg-[#0F4A38] text-white dark:bg-[#E5A93C] dark:hover:bg-[#F59E0B] dark:text-[#051F17] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat Student</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: ADSSU Verification Badges */}
      {activeTab === 'verification' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 shadow-xs space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-slate-100">
                ADSSU & Barangay Verification Portal
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Solving safety and trust issues through verified university and barangay credentials.
              </p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Badge Active: ADSSU Verified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#08291F] border border-slate-200 dark:border-emerald-800 space-y-1.5">
              <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-bold uppercase">Requirement 1</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Barangay San Teodoro Permit</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">Clearance confirming safe residential status.</p>
              <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5" />
                <span>Verified & Approved</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#08291F] border border-slate-200 dark:border-emerald-800 space-y-1.5">
              <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-bold uppercase">Requirement 2</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">ADSSU Safety Inspection</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">Verified CCTV, perimeter lock, and emergency exit.</p>
              <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5" />
                <span>Passed (Score: 98/100)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#08291F] border border-slate-200 dark:border-emerald-800 space-y-1.5">
              <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-bold uppercase">Requirement 3</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Water & Flood Safety</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">Potable water testing and elevated foundation audit.</p>
              <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5" />
                <span>Certified Continuous 24/7</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Business Models & Subscription */}
      {activeTab === 'subscription' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#0F4A38] dark:text-[#E5A93C] uppercase tracking-wider">
              Business Models & Tools
            </span>
            <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-slate-100 mt-1">
              Three Revenue Streams That Grow Together with StayNest
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
              Transparent sustainability model for boarding house owners and the ADSSU ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Stream 1: Commission 5% */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#08291F] border border-slate-200 dark:border-emerald-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 dark:bg-[#E5A93C]/20 dark:text-[#E5A93C] flex items-center justify-center font-bold">
                <Percent className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">01 · REVENUE STREAM</span>
                <h4 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">Booking Commission</h4>
                <div className="text-2xl font-bold font-mono text-[#0F4A38] dark:text-[#E5A93C]">5% <span className="text-xs font-normal text-slate-500 dark:text-slate-400">per booking</span></div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Small performance-based fee from successful boarding house bookings or student referrals.
              </p>
              <div className="text-[11px] text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
                Example: On a ₱1,000 monthly room, fee is just ₱50 when a verified student moves in.
              </div>
            </div>

            {/* Stream 2: Subscription Plan */}
            <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-[#0C382A] border-2 border-[#0F4A38] dark:border-[#E5A93C] space-y-3 relative shadow-xs">
              <div className="absolute top-3 right-3 text-[10px] bg-[#0F4A38] text-white dark:bg-[#E5A93C] dark:text-[#051F17] font-bold px-2 py-0.5 rounded-full">
                Active Plan
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#0F4A38] text-white dark:bg-[#E5A93C] dark:text-[#051F17] flex items-center justify-center">
                <Crown className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-emerald-900 dark:text-amber-300 font-bold">02 · LANDLORD TOOLS</span>
                <h4 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">Subscription Plan</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono text-[#0F4A38] dark:text-[#E5A93C]">₱49</span>
                  <span className="text-xs text-slate-600 dark:text-slate-300">/mo</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">or ₱299 /yr</span>
                </div>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                Monthly or yearly plans for landlords who want unlimited listings, vacancy manager, and instant chat tools.
              </p>
              <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-200 pt-1">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 font-bold" />
                  <span>Unlimited boarding house listings</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 font-bold" />
                  <span>Direct student messaging & schedule manager</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 font-bold" />
                  <span>Priority pin highlight on ADSSU Map</span>
                </li>
              </ul>
            </div>

            {/* Stream 3: Local Advertising */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#08291F] border border-slate-200 dark:border-emerald-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-900 dark:bg-cyan-950 dark:text-cyan-300 flex items-center justify-center font-bold">
                <Megaphone className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">03 · LOCAL ECOSYSTEM</span>
                <h4 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-100">Local Advertising</h4>
                <div className="text-2xl font-bold font-mono text-cyan-800 dark:text-cyan-300">Future <span className="text-xs font-normal text-slate-500 dark:text-slate-400">stream</span></div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Future revenue from nearby Bunawan businesses (laundromats, carinderia eateries, tricycle terminal routes).
              </p>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                Helps students find cheap laundry and food near their selected boarding house.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Supabase & PostGIS Database Architecture */}
      {activeTab === 'database' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-[#06281E] border border-slate-200 dark:border-emerald-800/60 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-emerald-800/50">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-700/60">
                  PostgreSQL + PostGIS Extension
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">Row-Level Security & Realtime Ready</span>
              </div>
              <h3 className="font-serif font-bold text-2xl text-slate-900 dark:text-slate-100">
                Supabase Geospatial Database Schema
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                StayNest leverages Supabase (managed PostgreSQL) with PostGIS geography points to perform sub-millisecond distance queries from ADSSU Main Gate (8.1692° N, 126.0044° E).
              </p>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(SUPABASE_POSTGIS_SCHEMA_SQL);
                setCopiedSql(true);
                setTimeout(() => setCopiedSql(false), 3000);
              }}
              className="px-4 py-2 bg-[#0F4A38] hover:bg-emerald-800 text-white dark:bg-[#E5A93C] dark:hover:bg-[#F59E0B] dark:text-[#051F17] font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all shrink-0 self-start sm:self-auto"
            >
              <Terminal className="w-4 h-4" />
              <span>{copiedSql ? 'Copied SQL Script!' : 'Copy SQL Schema & PostGIS Function'}</span>
            </button>
          </div>

          {/* Architecture Pillar Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#08291F] border border-slate-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <Database className="w-4 h-4 text-[#0F4A38] dark:text-[#E5A93C]" />
                <span>PostGIS Spatial Index</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Spatial GIST index on <code className="text-emerald-700 dark:text-emerald-400 font-mono">GEOGRAPHY(POINT, 4326)</code> delivers millisecond filtering for the "Within 1 km of ADSSU" toggle.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#08291F] border border-slate-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-[#0F4A38] dark:text-[#E5A93C]" />
                <span>Row-Level Security (RLS)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                PostgreSQL policies enforce strict role isolation: students read verified listings, landlords only edit their owned boarding houses.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#08291F] border border-slate-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <MessageSquare className="w-4 h-4 text-[#0F4A38] dark:text-[#E5A93C]" />
                <span>Realtime Channels</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                WebSocket pub/sub broadcasts new chat messages and visit request confirmations instantly without polling.
              </p>
            </div>
          </div>

          {/* Interactive SQL Schema Viewer */}
          <div>
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                Schema Definition & Distance Function:
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Supabase SQL Editor Ready</span>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto border border-slate-800 max-h-80 leading-relaxed">
              <code>{SUPABASE_POSTGIS_SCHEMA_SQL}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Quick Edit Modal */}
      {editingHouse && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-[#072B20] border border-slate-200 dark:border-[#E5A93C] rounded-2xl p-6 space-y-4 text-slate-900 dark:text-slate-100 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-emerald-800">
              <h4 className="font-serif font-bold text-lg text-slate-900 dark:text-slate-50">Edit {editingHouse.name}</h4>
              <button onClick={() => setEditingHouse(null)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs text-slate-700 dark:text-slate-300 mb-1">Starting Price (₱/month):</label>
              <input
                type="number"
                value={editingHouse.priceStart}
                onChange={(e) =>
                  setEditingHouse({ ...editingHouse, priceStart: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800 rounded-lg text-xs text-slate-900 dark:text-slate-100 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-700 dark:text-slate-300 mb-1">Curfew Hours:</label>
              <input
                type="text"
                value={editingHouse.rules.curfew}
                onChange={(e) =>
                  setEditingHouse({
                    ...editingHouse,
                    rules: { ...editingHouse.rules, curfew: e.target.value },
                  })
                }
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800 rounded-lg text-xs text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200">
                <input
                  type="checkbox"
                  checked={editingHouse.waterSupply.is247}
                  onChange={(e) =>
                    setEditingHouse({
                      ...editingHouse,
                      waterSupply: {
                        ...editingHouse.waterSupply,
                        is247: e.target.checked,
                        status: e.target.checked ? '24/7 Continuous' : 'Scheduled (Morning/Night)',
                      },
                    })
                  }
                />
                <span>Water Supply is 24/7 Continuous</span>
              </label>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingHouse(null)}
                className="px-4 py-2 text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onUpdateHouse(editingHouse);
                  setEditingHouse(null);
                }}
                className="px-4 py-2 bg-[#0F4A38] text-white dark:bg-[#E5A93C] dark:text-[#051F17] font-bold text-xs rounded-lg hover:bg-emerald-800 dark:hover:bg-[#F59E0B]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Listing Modal */}
      {showAddListingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-lg bg-white dark:bg-[#072B20] border border-slate-200 dark:border-[#E5A93C] rounded-2xl p-6 space-y-4 text-slate-900 dark:text-slate-100 max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-emerald-800">
              <h4 className="font-serif font-bold text-xl text-slate-900 dark:text-slate-50">Add New Boarding House</h4>
              <button onClick={() => setShowAddListingModal(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name') as string;
                const price = Number(formData.get('price')) || 1000;
                const distance = Number(formData.get('distance')) || 0.8;
                const newHouse: BoardingHouse = {
                  id: `bh-${Date.now()}`,
                  name,
                  tagline: 'Brand new student accommodation verified for ADSSU students',
                  address: formData.get('address') as string,
                  barangay: 'San Teodoro, Bunawan',
                  coordinates: { lat: 8.0185, lng: 125.9945 },
                  distanceKm: distance,
                  walkMinutes: Math.round(distance * 11),
                  priceStart: price,
                  verified: true,
                  verificationLevel: 'Barangay Certified',
                  rating: 5.0,
                  reviewCount: 0,
                  genderPolicy: 'all',
                  waterSupply: {
                    status: '24/7 Continuous',
                    is247: true,
                    hasWaterTank: true,
                    description: 'Connected to elevated water tank reservoir.',
                  },
                  floodRisk: {
                    level: 'Low',
                    description: 'Elevated concrete foundation.',
                  },
                  security: {
                    hasCCTV: true,
                    hasSecurityGuard: false,
                    hasGatedPerimeter: true,
                    curfew: '10:00 PM',
                    curfewStrict: true,
                    details: 'Gated perimeter and CCTV at entrance.',
                  },
                  rules: {
                    curfew: '10:00 PM',
                    visitorsAllowed: 'Lobby only until 7 PM',
                    cookingAllowed: true,
                    petsAllowed: false,
                    laundryAllowed: true,
                    alcoholProhibited: true,
                  },
                  amenities: {
                    wifi: true,
                    studyArea: true,
                    individualMeter: true,
                    potableDrinkingWater: true,
                    kitchenArea: true,
                    laundrySpace: true,
                    motorcycleParking: true,
                    emergencyLight: true,
                  },
                  images: [
                    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
                  ],
                  contactPerson: 'Nanay Fritzcel Calo',
                  landlordId: 'landlord-1',
                  contactNumber: '+63 917 555 4321',
                  rooms: [
                    {
                      id: `r-${Date.now()}`,
                      name: 'Standard Bedspace',
                      type: 'bedspace',
                      priceMonthly: price,
                      totalSlots: 4,
                      availableSlots: 4,
                      depositRequired: 500,
                      description: 'Includes study desk, personal locker, and mattress.',
                    },
                  ],
                  reviews: [],
                };
                onAddListing(newHouse);
                setShowAddListingModal(false);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Boarding House Name:</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Bunawan Valley Student Dorm"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800 rounded-lg text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-1">Address in Bunawan:</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="e.g. Purok 2, San Teodoro, Bunawan"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800 rounded-lg text-slate-900 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Monthly Rate (₱):</label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={1000}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800 rounded-lg text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-1">Distance to ADSSU (km):</label>
                  <input
                    type="number"
                    step="0.1"
                    name="distance"
                    defaultValue={0.7}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800 rounded-lg text-slate-900 dark:text-slate-100 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddListingModal(false)}
                  className="px-4 py-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0F4A38] text-white dark:bg-[#E5A93C] dark:text-[#051F17] font-bold rounded-lg hover:bg-emerald-800 dark:hover:bg-[#F59E0B]"
                >
                  Publish Listing to StayNest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
