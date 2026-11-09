import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  Star,
  CheckCircle,
  CheckCircle2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Bed,
  Users,
  Sparkles,
  Droplets,
  Wifi,
  Camera,
  Clock,
  Utensils,
  Wind,
  MapPin,
  Footprints,
  Calendar,
  FileText,
  KeyRound,
} from 'lucide-react';

export interface GalleryPhoto {
  url: string;
  caption: string;
  category: 'Room' | 'Bedspace' | 'Study' | 'Bathroom' | 'Kitchen' | 'Exterior';
}

export interface RoomOption {
  id: string;
  name: string;
  type: string;
  price: string;
  priceNum: number;
  slots: string;
  image: string;
  description: string;
  features: string[];
}

export interface PropertyData {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  location: string;
  distance: string;
  walkTime: string;
  trikeTime?: string;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery?: GalleryPhoto[];
  roomOptions?: RoomOption[];
  ownerName: string;
  ownerRole: string;
  ownerAvatar: string;
  replyTime: string;
  phone: string;
  highlights: { label: string; icon: string; bg: string; text: string }[];
  description: string;
  isFeatured?: boolean;
}

export interface BookingTransaction {
  id: string;
  transactionCode: string;
  studentName: string;
  studentId: string;
  studentEmail?: string;
  studentPhone?: string;
  houseName: string;
  landlordName: string;
  roomName: string;
  monthlyRent: number;
  platformCommission: number; // 5% platform fee
  landlordPayout: number;     // 95% net to landlord
  paymentStatus: 'CLEARED' | 'PENDING' | 'REMITTED';
  paymentMethod: 'GCash' | 'Cash on Campus' | 'Bank Transfer';
  moveInDate: string;
  voucherCode: string;
  createdDate: string;
  notes?: string;
  receiptUrl?: string;
}

interface FigmaPropertyDetailProps {
  property: PropertyData;
  onBack: () => void;
  onChatLandlord: (property: PropertyData) => void;
  onCallOwner?: (phone: string) => void;
  onConfirmBooking?: (booking: BookingTransaction) => void;
}

export const FigmaPropertyDetail: React.FC<FigmaPropertyDetailProps> = ({
  property,
  onBack,
  onChatLandlord,
  onCallOwner,
  onConfirmBooking,
}) => {
  // Gallery navigation state
  const photos: GalleryPhoto[] = property.gallery && property.gallery.length > 0
    ? property.gallery
    : [
        {
          url: property.image,
          caption: 'Main Student Bedroom Interior',
          category: 'Room',
        },
      ];

  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isOcularVisitOpen, setIsOcularVisitOpen] = useState(false);
  const [visitDate, setVisitDate] = useState('2026-10-30');
  const [visitTime, setVisitTime] = useState('10:00 AM');
  const [visitConfirmed, setVisitConfirmed] = useState(false);

  // Direct Student Room Booking & Reservation State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<RoomOption | null>(null);
  const [bookingMoveInDate, setBookingMoveInDate] = useState('2026-11-01');
  const [bookingDuration, setBookingDuration] = useState('1 Semester (5 Months)');
  const [bookingStudentNotes, setBookingStudentNotes] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'GCash' | 'Cash on Campus' | 'Bank Transfer'>('GCash');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingVoucherCode, setBookingVoucherCode] = useState('SN-2026-9482');

  const currentPhoto = photos[activePhotoIndex] || photos[0];

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#F7F9F7] flex flex-col justify-between select-none overflow-y-auto">
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-between bg-white sm:my-6 sm:rounded-[36px] sm:shadow-2xl overflow-hidden border border-slate-200/80">
        {/* Top Hero Image Header Carousel with Compact Responsive Photo Frame */}
        <div className="relative w-full h-56 sm:h-72 bg-slate-900 shrink-0 group overflow-hidden sm:rounded-t-[36px]">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption || property.name}
            className="w-full h-56 sm:h-72 object-cover cursor-pointer"
            onClick={() => setIsLightboxOpen(true)}
          />

          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 px-3 py-1.5 rounded-full bg-black/60 text-white flex items-center gap-1.5 backdrop-blur-xs hover:bg-black/80 active:scale-95 transition-all z-10 font-bold text-xs cursor-pointer shadow-md"
            title="Go back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Listings</span>
          </button>

          {/* LGU Verified Badge */}
          <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#00875A] text-white text-[10px] sm:text-[11px] font-bold shadow-md z-10">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>LGU VERIFIED ADSSU DORM</span>
          </div>

          {/* Left & Right Photo Carousel Arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={handlePrevPhoto}
                className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs active:scale-90 transition-all z-10 cursor-pointer"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                onClick={handleNextPhoto}
                className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs active:scale-90 transition-all z-10 cursor-pointer"
                aria-label="Next photo"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* Bottom Floating Bar: Category + Caption + Photo Counter */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none z-10">
            <div className="flex items-center gap-2 pointer-events-auto">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-600/90 text-white text-[10px] sm:text-[11px] font-bold backdrop-blur-xs shadow-xs">
                {currentPhoto.category === 'Room' ? 'Student Room' : currentPhoto.category === 'Bedspace' ? 'Bedspace' : currentPhoto.category === 'Study' ? 'Study Desk' : currentPhoto.category === 'Bathroom' ? 'Bathroom CR' : currentPhoto.category === 'Kitchen' ? 'Kitchen' : 'Exterior'}
              </span>
              <span className="text-[11px] sm:text-xs text-white/95 font-medium drop-shadow-md truncate max-w-[180px] sm:max-w-[280px]">
                {currentPhoto.caption}
              </span>
            </div>

            <button
              onClick={() => setIsLightboxOpen(true)}
              className="pointer-events-auto px-2.5 sm:px-3 py-1 rounded-full bg-black/60 hover:bg-black/80 text-white text-[11px] sm:text-xs font-bold backdrop-blur-xs flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-md"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{activePhotoIndex + 1}/{photos.length} Photos</span>
              <Maximize2 className="w-3 h-3 opacity-90 ml-1 hidden sm:inline" />
            </button>
          </div>
        </div>

        {/* Main Content Sheet */}
        <div className="bg-white p-4 sm:p-8 flex-1 flex flex-col justify-between">
        <div className="space-y-3.5 sm:space-y-4">
          {/* Title & Price Row */}
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight truncate sm:whitespace-normal">
                {property.name}
              </h1>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 flex-wrap">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="truncate max-w-[200px] sm:max-w-none">{property.location}</span>
                <span className="text-amber-500 font-bold ml-1 flex items-center gap-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{property.rating}</span>
                </span>
                <span className="text-slate-400">({property.reviewsCount} Reviews)</span>
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-base sm:text-lg font-bold text-[#00875A] block leading-tight">
                {property.price}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">/mo</span>
            </div>
          </div>

          {/* Walking Distance Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F0FDF4] border border-[#DCFCE7] text-xs font-semibold text-[#166534]">
            <Footprints className="w-3.5 h-3.5 text-emerald-700" />
            <span>{property.distance} away from ADSSU Main Gate ({property.walkTime})</span>
          </div>

          {/* Above-the-Fold Primary Quick Actions (Visible Immediately on Mobile) */}
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <button
              onClick={() => {
                const defaultRoom = property.roomOptions?.[0] || {
                  id: 'rm-default',
                  name: `${property.name} Available Slot`,
                  type: 'Student Accommodation',
                  price: property.price,
                  priceNum: property.priceNum,
                  slots: 'Available Slot',
                  image: property.image,
                  description: property.description,
                  features: ['24/7 Water', 'Accredited'],
                };
                setSelectedRoomForBooking(defaultRoom);
                setBookingConfirmed(false);
                setBookingVoucherCode(`SN-2026-${Math.floor(10000 + Math.random() * 90000)}`);
                setIsBookingModalOpen(true);
              }}
              className="py-2.5 sm:py-3 px-3 rounded-xl sm:rounded-2xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all cursor-pointer whitespace-nowrap"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
              <span>BOOK / RESERVE ROOM</span>
            </button>

            <button
              onClick={() => onChatLandlord(property)}
              className="py-2.5 sm:py-3 px-3 rounded-xl sm:rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer shadow-xs whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-[#00875A] shrink-0" />
              <span>Chat Landlord</span>
            </button>
          </div>

          {/* Photo Gallery Thumbnails (Clickable) */}
          {photos.length > 1 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11px] font-bold tracking-wider text-slate-700 uppercase">
                  ROOM & DORM PHOTOS ({photos.length})
                </h3>
                <span className="text-[10px] text-emerald-700 font-bold">Tap to view</span>
              </div>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {photos.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      idx === activePhotoIndex
                        ? 'border-[#00875A] scale-95 shadow-sm'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={p.url}
                      alt={p.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 text-[8px] text-white font-bold px-1 py-0.5 truncate text-center">
                      {p.category}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Available Room Options with Direct Booking */}
          {property.roomOptions && property.roomOptions.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-[11px] font-bold tracking-wider text-slate-700 uppercase">
                  AVAILABLE ROOM TYPES & SLOTS
                </h3>
                <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Direct Student Booking Enabled
                </span>
              </div>
              <div className="space-y-2.5">
                {property.roomOptions.map((room) => (
                  <div
                    key={room.id}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-[#F8FAFC] flex flex-col sm:flex-row gap-3 items-start sm:items-center hover:border-emerald-400 transition-all shadow-2xs"
                  >
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full sm:w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {room.name}
                        </h4>
                        <span className="text-sm font-extrabold text-[#00875A] shrink-0">
                          {room.price}/mo
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100 text-emerald-800">
                          {room.slots}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {room.type}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600 line-clamp-1 mt-1">
                        {room.description}
                      </p>
                    </div>

                    {/* Book Room Button on each room */}
                    <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRoomForBooking(room);
                          setBookingConfirmed(false);
                          setBookingVoucherCode(`SN-2026-${Math.floor(10000 + Math.random() * 90000)}`);
                          setIsBookingModalOpen(true);
                        }}
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                        <span>Book / Reserve</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights Grid */}
          <div>
            <h3 className="text-[11px] font-bold tracking-wider text-slate-700 uppercase mb-2">
              ROOM & FACILITIES HIGHLIGHTS
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {property.highlights.map((h, i) => {
                const getIcon = (label: string) => {
                  if (label.includes('Water')) return <Droplets className="w-3.5 h-3.5 shrink-0" />;
                  if (label.includes('Flood')) return <ShieldCheck className="w-3.5 h-3.5 shrink-0" />;
                  if (label.includes('CCTV') || label.includes('Camera')) return <Camera className="w-3.5 h-3.5 shrink-0" />;
                  if (label.includes('Wi-Fi') || label.includes('Wifi')) return <Wifi className="w-3.5 h-3.5 shrink-0" />;
                  if (label.includes('Cook') || label.includes('Kitchen')) return <Utensils className="w-3.5 h-3.5 shrink-0" />;
                  if (label.includes('Curfew')) return <Clock className="w-3.5 h-3.5 shrink-0" />;
                  if (label.includes('Aircon') || label.includes('AC')) return <Wind className="w-3.5 h-3.5 shrink-0" />;
                  return <CheckCircle className="w-3.5 h-3.5 shrink-0" />;
                };

                return (
                  <div
                    key={i}
                    className="p-2 rounded-xl text-center text-[10px] font-bold border border-slate-100 flex items-center justify-center gap-1.5 shadow-2xs"
                    style={{ backgroundColor: h.bg, color: h.text }}
                  >
                    {getIcon(h.label)}
                    <span className="truncate">{h.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Landlord Card */}
          <div>
            <h3 className="text-[11px] font-bold tracking-wider text-slate-700 uppercase mb-2">
              PROPERTY OWNER / LANDLORD
            </h3>
            <div className="p-3.5 rounded-2xl border border-slate-200 bg-[#F8FAFC] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#00875A] text-white font-bold text-sm flex items-center justify-center shadow-xs">
                  {property.ownerAvatar}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    {property.ownerName}
                  </h4>
                  <p className="text-[11px] text-slate-500">{property.ownerRole}</p>
                  <div className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>VERIFIED LANDLORD</span>
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">
                {property.replyTime}
              </span>
            </div>
          </div>

          {/* About House */}
          <div>
            <h3 className="text-[11px] font-bold tracking-wider text-slate-700 uppercase mb-1.5">
              ABOUT THIS HOUSE
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {property.description}
            </p>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="pt-5 mt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            onClick={() => {
              const defaultRoom = property.roomOptions?.[0] || {
                id: 'rm-default',
                name: `${property.name} Available Slot`,
                type: 'Student Accommodation',
                price: property.price,
                priceNum: property.priceNum,
                slots: 'Available Slot',
                image: property.image,
                description: property.description,
                features: ['24/7 Water', 'Accredited'],
              };
              setSelectedRoomForBooking(defaultRoom);
              setBookingConfirmed(false);
              setBookingVoucherCode(`SN-2026-${Math.floor(10000 + Math.random() * 90000)}`);
              setIsBookingModalOpen(true);
            }}
            className="flex-1 w-full py-3.5 px-4 rounded-2xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span>BOOK / RESERVE ROOM</span>
          </button>

          <button
            onClick={() => onChatLandlord(property)}
            className="w-full sm:w-auto px-4 py-3.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#00875A]" />
            <span>Chat Landlord</span>
          </button>

          <button
            onClick={() => {
              setVisitConfirmed(false);
              setIsOcularVisitOpen(true);
            }}
            className="w-full sm:w-auto px-4 py-3.5 rounded-2xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-[#00875A] text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-all cursor-pointer shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Ocular Visit</span>
          </button>
        </div>
      </div>
      </div>

      {/* Ocular Visit Scheduler Modal */}
      {isOcularVisitOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-800 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-[#00875A] flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Schedule Ocular Visit</h3>
                  <p className="text-[11px] text-slate-500">{property.name}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOcularVisitOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {visitConfirmed ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#00875A] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Ocular Visit Requested!</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your visit has been scheduled for <strong>{visitDate}</strong> at <strong>{visitTime}</strong> with Landlord <strong>{property.ownerName}</strong>. You will receive an SMS reminder.
                </p>
                <button
                  onClick={() => setIsOcularVisitOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#00875A] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-3.5">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Select Preferred Visit Date
                  </label>
                  <input
                    type="date"
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#00875A]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Preferred Time Window
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['9:00 AM', '1:30 PM', '4:30 PM'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setVisitTime(slot)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          visitTime === slot
                            ? 'bg-emerald-50 border-[#00875A] text-[#00875A]'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 text-[11px] text-slate-600 border border-slate-100 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#00875A] shrink-0 mt-0.5" />
                  <span>
                    Ocular visits are completely free. Landlords will show you the rooms, study desks, and private sub-meters without any commitment.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setVisitConfirmed(true)}
                  className="w-full py-3 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Confirm Ocular Visit Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Direct Student Room Booking & Reservation Modal */}
      {/* Direct Student Room Booking & Reservation Modal (Clear Liquid Glassmorphism) */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-[92vw] max-w-lg max-h-[82vh] rounded-[28px] sm:rounded-[32px] text-slate-900 bg-white border-2 border-white/90 shadow-[0_24px_60px_rgba(5,55,40,0.25)] my-auto flex flex-col overflow-hidden">
            {/* Ambient liquid glow orb */}
            <div className="absolute top-4 right-4 w-48 h-48 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />

            {/* Header (Pinned Top) */}
            <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3 sm:px-6 sm:py-4 shrink-0 bg-white z-10">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#00875A]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-lg text-[#053728] leading-tight font-serif italic tracking-wide truncate">
                    {bookingConfirmed ? 'Move-In Reservation Pass' : 'Reserve Room / Bedspace'}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-600 font-medium truncate max-w-[200px] sm:max-w-xs">
                    {property.name} · Landlord {property.ownerName}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsBookingModalOpen(false)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-all active:scale-95 shadow-xs shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {bookingConfirmed ? (
              /* Booking Voucher View with 5% Commission Breakdown */
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 relative z-10">
                <div className="text-center space-y-1.5">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-[#00875A] flex items-center justify-center mx-auto shadow-md">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h4 className="font-bold text-[#053728] text-base sm:text-lg font-serif italic">
                    Official StayNest Digital Move-In Pass
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed max-w-sm mx-auto font-normal">
                    Your reservation slot has been locked for 48 hours. Show this pass upon arrival or message Landlord <strong>{property.ownerName}</strong> to finalize contract signing.
                  </p>
                </div>

                {/* Digital Move-In Pass Voucher */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#053728] via-[#04281D] to-[#01140e] text-white border-2 border-[#E5A93C] shadow-2xl space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-emerald-700/60 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-serif italic font-bold text-sm sm:text-base text-[#EAA938]">StayNest Pass</span>
                      <span className="text-[9px] sm:text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded-full text-emerald-200 border border-emerald-600/50 font-bold">
                        Official AY 2026
                      </span>
                    </div>
                    <span className="font-mono text-[11px] sm:text-xs font-bold text-[#E5A93C] bg-black/40 px-2 py-0.5 rounded border border-[#E5A93C]/40">
                      {bookingVoucherCode}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-emerald-300/80 block uppercase font-bold">Boarding House</span>
                      <span className="font-bold truncate block text-white text-[11px] sm:text-xs">{property.name}</span>
                    </div>
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-emerald-300/80 block uppercase font-bold">Selected Room</span>
                      <span className="font-bold text-amber-300 truncate block text-[11px] sm:text-xs">
                        {selectedRoomForBooking?.name || 'Standard Room'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-emerald-300/80 block uppercase font-bold">Monthly Rate</span>
                      <span className="font-bold text-emerald-200 block text-[11px] sm:text-xs">
                        {selectedRoomForBooking?.price || property.price}/month
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] sm:text-[10px] text-emerald-300/80 block uppercase font-bold">Target Move-In</span>
                      <span className="font-bold text-white block text-[11px] sm:text-xs">{bookingMoveInDate}</span>
                    </div>
                  </div>

                  {/* 5% Commission Ledger Breakdown */}
                  <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-700/70 text-[10px] sm:text-[11px] space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>Monthly Rent:</span>
                      <span className="font-mono text-white">₱{(selectedRoomForBooking?.priceNum || property.priceNum || 1000).toLocaleString()}.00</span>
                    </div>
                    <div className="flex justify-between text-emerald-300">
                      <span>StayNest Platform Fee (5%):</span>
                      <span className="font-mono text-[#EAA938]">₱{Math.round((selectedRoomForBooking?.priceNum || property.priceNum || 1000) * 0.05).toLocaleString()}.00</span>
                    </div>
                    <div className="flex justify-between text-slate-300 border-t border-emerald-800/80 pt-1">
                      <span>Net Landlord Remittance (95%):</span>
                      <span className="font-mono text-emerald-200">₱{((selectedRoomForBooking?.priceNum || property.priceNum || 1000) - Math.round((selectedRoomForBooking?.priceNum || property.priceNum || 1000) * 0.05)).toLocaleString()}.00</span>
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-400 pt-0.5">
                      <span>Payment Method:</span>
                      <span className="text-[#EAA938] font-bold">{selectedPaymentMethod}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-emerald-700/60 flex items-center justify-between text-[10px] sm:text-[11px] text-emerald-200">
                    <span>Tenant: Angelo Nuer (2024-0192-B)</span>
                    <span className="text-[#E5A93C] font-extrabold">Official LGU Reservation</span>
                  </div>
                </div>

                <div className="sticky bottom-0 bg-white pt-3 pb-2 border-t border-slate-100 flex flex-col sm:flex-row gap-2 z-10">
                  <button
                    type="button"
                    onClick={() => {
                      setIsBookingModalOpen(false);
                      onChatLandlord(property);
                    }}
                    className="flex-1 py-3 sm:py-3.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <MessageSquare className="w-4 h-4 text-amber-300" />
                    <span>Message Landlord About Booking</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(false)}
                    className="px-6 py-3 sm:py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-all cursor-pointer shadow-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Reservation Form: Scrollable Body & Sticky CTA Footer */
              <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3">
                  {/* Compact Property Preview Card */}
                  <div className="p-3 rounded-2xl liquid-glass-card border border-emerald-200/80 flex items-center justify-between gap-2.5 shadow-2xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={selectedRoomForBooking?.image || property.image}
                        alt="Room Preview"
                        className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover shrink-0 border border-emerald-300 shadow-xs"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-900 block truncate">
                          {selectedRoomForBooking?.name || `${property.name} Slot`}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-slate-600 block truncate">
                          {selectedRoomForBooking?.type || 'Student Accommodation'} · {selectedRoomForBooking?.slots || '1 slot available'}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs sm:text-sm font-bold text-[#00875A] block">
                        {selectedRoomForBooking?.price || property.price}
                      </span>
                      <span className="text-[9px] text-slate-500">per month</span>
                    </div>
                  </div>

                  {/* Compact 5% Platform Commission Calculation Box */}
                  {(() => {
                    const rent = selectedRoomForBooking?.priceNum || property.priceNum || 1000;
                    const commission = Math.round(rent * 0.05);
                    const netPayout = rent - commission;
                    return (
                      <div className="p-3 rounded-2xl bg-emerald-50/90 border border-emerald-200/90 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between font-bold text-[#053728] border-b border-emerald-200/80 pb-1">
                          <span className="flex items-center gap-1.5 text-[11px] sm:text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00875A] shrink-0" />
                            <span>5% Platform Commission Calculation</span>
                          </span>
                          <span className="text-[9px] sm:text-[10px] bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
                            Transparent
                          </span>
                        </div>
                        <div className="space-y-0.5 text-[10px] sm:text-[11px]">
                          <div className="flex justify-between text-slate-700">
                            <span>Monthly Room Rent:</span>
                            <span className="font-semibold text-slate-900">₱{rent.toLocaleString()}.00</span>
                          </div>
                          <div className="flex justify-between text-emerald-800">
                            <span>StayNest Service & Safety Fee (5%):</span>
                            <span className="font-bold text-emerald-700">- ₱{commission.toLocaleString()}.00</span>
                          </div>
                          <div className="flex justify-between text-slate-800 border-t border-emerald-200/80 pt-0.5 font-bold">
                            <span>Landlord Net Remittance (95%):</span>
                            <span className="text-[#053728]">₱{netPayout.toLocaleString()}.00</span>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Move In Date */}
                  <div>
                    <label className="text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Target Move-In Date
                    </label>
                    <input
                      type="date"
                      value={bookingMoveInDate}
                      onChange={(e) => setBookingMoveInDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl liquid-glass-input text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#00875A] transition-all"
                    />
                  </div>

                  {/* Lease Duration & Payment Method Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Stay Period
                      </label>
                      <select
                        value={bookingDuration}
                        onChange={(e) => setBookingDuration(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl liquid-glass-input text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#00875A] transition-all"
                      >
                        <option value="1 Semester (5 Months)">1 Semester (5 Mos)</option>
                        <option value="Full Academic Year (10 Months)">Full Year (10 Mos)</option>
                        <option value="Summer Term (2 Months)">Summer Term (2 Mos)</option>
                        <option value="Monthly Rolling">Monthly Rolling</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                        Payment Mode
                      </label>
                      <select
                        value={selectedPaymentMethod}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl liquid-glass-input text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#00875A] transition-all"
                      >
                        <option value="GCash">GCash Deposit</option>
                        <option value="Cash on Campus">Cash on Campus</option>
                        <option value="Bank Transfer">Bank Transfer (BDO)</option>
                      </select>
                    </div>
                  </div>

                  {/* Student Note */}
                  <div>
                    <label className="text-[10px] sm:text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      Message for Landlord (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={bookingStudentNotes}
                      onChange={(e) => setBookingStudentNotes(e.target.value)}
                      placeholder="e.g. 3rd Year BSIT student. Inquiring if I can bring a personal study desk..."
                      className="w-full px-3.5 py-2 rounded-xl liquid-glass-input text-xs text-slate-900 placeholder:text-slate-400 resize-none focus:outline-none focus:border-[#00875A] transition-all"
                    />
                  </div>

                  {/* Consumer Protection Notice */}
                  <div className="p-2.5 rounded-xl bg-amber-50/90 border border-amber-200 text-[10px] sm:text-[11px] text-amber-950 flex items-start gap-2 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      <strong>Zero Broker Markup Guarantee:</strong> Free reservation hold for 48 hours with ADSSU student credentials.
                    </span>
                  </div>
                </div>

                {/* Sticky Action Footer */}
                <div className="sticky bottom-0 bg-white border-t border-slate-100 px-3.5 py-3 sm:px-6 sm:py-3.5 pt-3 pb-2.5 shrink-0 z-20 shadow-lg">
                  <button
                    type="button"
                    onClick={() => {
                      const rent = selectedRoomForBooking?.priceNum || property.priceNum || 1000;
                      const commission = Math.round(rent * 0.05);
                      const netPayout = rent - commission;
                      const code = `TX-2026-${Math.floor(10000 + Math.random() * 90000)}`;
                      const voucher = `SN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                      setBookingVoucherCode(voucher);

                      const newBooking: BookingTransaction = {
                        id: `tx-${Date.now()}`,
                        transactionCode: code,
                        studentName: 'Angelo Nuer',
                        studentId: '2024-0192-B',
                        studentEmail: 'anuer@adssu.edu.ph',
                        studentPhone: '+63 912 345 6789',
                        houseName: property.name,
                        landlordName: property.ownerName,
                        roomName: selectedRoomForBooking?.name || `${property.name} Slot`,
                        monthlyRent: rent,
                        platformCommission: commission,
                        landlordPayout: netPayout,
                        paymentStatus: 'CLEARED',
                        paymentMethod: selectedPaymentMethod,
                        moveInDate: bookingMoveInDate,
                        voucherCode: voucher,
                        createdDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                        notes: bookingStudentNotes,
                      };

                      onConfirmBooking?.(newBooking);
                      setBookingConfirmed(true);
                    }}
                    className="w-full py-3 sm:py-3.5 rounded-2xl bg-[#00875A] hover:bg-[#00704A] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4.5 h-4.5 text-amber-300" />
                    <span>Confirm Reservation & Generate Pass</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Fullscreen Photo Lightbox Modal */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between text-white pt-2">
            <div>
              <p className="text-xs font-bold text-emerald-400">
                {currentPhoto.category} Photo ({activePhotoIndex + 1} of {photos.length})
              </p>
              <h4 className="text-sm font-semibold">{currentPhoto.caption}</h4>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 active:scale-90 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Main Photo */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex-1 flex items-center justify-center py-4"
          >
            <img
              src={currentPhoto.url}
              alt={currentPhoto.caption}
              className="max-h-[70vh] max-w-full rounded-2xl object-contain shadow-2xl"
            />

            {photos.length > 1 && (
              <>
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 active:scale-90"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 active:scale-90"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Thumbnails */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-2 overflow-x-auto py-2"
          >
            {photos.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIndex(idx)}
                className={`w-14 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  idx === activePhotoIndex
                    ? 'border-emerald-400 scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
