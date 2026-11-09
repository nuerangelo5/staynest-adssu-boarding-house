import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Check,
  Plus,
  Upload,
  X,
  GraduationCap,
  Phone,
  CheckCircle,
  CheckCircle2,
  MessageSquare,
  Clock,
  Camera,
  Image as ImageIcon,
  User,
  Home,
  MapPin,
  Mail,
  ShieldCheck,
  FileText,
  LogOut,
  Edit,
  AlertCircle,
  Award,
  ChevronRight,
  Bell,
  QrCode,
} from 'lucide-react';
import { RoomItem } from './FigmaLandlordViews';
import { CurrentUser } from '../../services/sessionManager';

// --- MODAL 1: EDIT VACANT ROOM DETAILS (Screenshot 004543) ---
export const FigmaEditVacantRoomModal: React.FC<{
  room: RoomItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: RoomItem) => void;
}> = ({ room, isOpen, onClose, onSave }) => {
  if (!isOpen || !room) return null;

  const [name, setName] = useState(room.name);
  const [type, setType] = useState(room.type);
  const [price, setPrice] = useState(room.price);
  const [roomPhoto, setRoomPhoto] = useState(room.image);
  const [inclusions, setInclusions] = useState<string[]>(room.inclusions);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const toggleInclusion = (inc: string) => {
    setInclusions((prev) =>
      prev.includes(inc) ? prev.filter((i) => i !== inc) : [...prev, inc]
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setRoomPhoto(url);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-lg mx-auto bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans max-h-[90vh] my-auto">
        {/* Green Top Header */}
        <div className="bg-[#053728] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={onClose}
              className="w-8.5 h-8.5 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-bold leading-tight truncate">Edit Room Details & Photo</h3>
              <p className="text-[10px] sm:text-xs text-emerald-200 truncate">
                {name} • Verified Boarding House (Landlord Hub)
              </p>
            </div>
          </div>
          <span className="px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-[#00875A] bg-emerald-50 border border-emerald-300 inline-flex items-center gap-1 shadow-2xs shrink-0">
            <Check className="w-3 h-3" /> VACANT
          </span>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Room Photo Editor */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase">
                ROOM PHOTO (LITRATO SA KWARTO)
              </label>
              <span className="text-[11px] text-emerald-700 font-semibold">Live Preview</span>
            </div>

            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-400 group shadow-sm bg-slate-100">
              <img
                src={roomPhoto}
                alt="Room Preview"
                className="w-full h-36 sm:h-44 object-cover"
              />
              <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center gap-2 p-3 text-center">
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="px-3.5 sm:px-4 py-2 rounded-xl bg-white text-emerald-900 font-extrabold text-xs shadow-lg hover:bg-emerald-50 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-[#00875A]" />
                  <span>Change Photo / Ilisi ang Litrato</span>
                </button>
                <span className="text-[10px] sm:text-[11px] text-white/90 drop-shadow-sm font-medium">
                  Tap to upload new photo from phone or computer
                </span>
              </div>
            </div>
          </div>

          {/* Room Name & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Room Name / Number
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Room Accommodation Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option>Bed space (4-Cap)</option>
                <option>Bed space (2-Cap)</option>
                <option>Single Bed Frame</option>
                <option>Bed spacer Deluxe</option>
                <option>Private Solo Room</option>
              </select>
            </div>
          </div>

          {/* Monthly Rent Rate */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-1">
              MONTHLY RENT RATE (PHP / BULAN)
            </label>
            <div className="flex items-center gap-2">
              <span className="px-3 py-2.5 rounded-xl bg-slate-100 border border-slate-300 text-sm font-bold text-slate-600">
                ₱
              </span>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. ₱1,200 / month"
                className="flex-1 px-4 py-2.5 rounded-xl border-2 border-emerald-500 bg-white text-sm sm:text-base font-bold text-[#00875A] focus:outline-none"
              />
            </div>
          </div>

          {/* Room Inclusions & Amenities */}
          <div>
            <label className="block text-xs font-bold tracking-wider text-slate-700 uppercase mb-2">
              ROOM INCLUSIONS & AMENITIES (APIL SA ABANG)
            </label>
            <div className="p-3 sm:p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-1.5">
              {[
                'Free High-Speed Wi-Fi',
                '24/7 Water Supply',
                'Study Desk & Chair Included',
                'Shared Comfort Room / Bath',
                'Own Private Comfort Room',
                'Submetered Electricity',
                '10 PM Curfew Compliance',
              ].map((item) => {
                const checked = inclusions.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInclusion(item)}
                    className="w-full flex items-center gap-2.5 text-left p-2 rounded-xl hover:bg-white transition-colors cursor-pointer select-none"
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs shrink-0 ${
                        checked ? 'bg-[#00875A] text-white' : 'border-2 border-slate-300 bg-white'
                      }`}
                    >
                      {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-xs text-slate-800 font-semibold">{item}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sticky Actions Footer */}
        <div className="p-3.5 sm:p-5 bg-white border-t border-slate-100 sticky bottom-0 z-10 shrink-0 space-y-2">
          <button
            type="button"
            onClick={() => {
              onSave({ ...room, name, type, price, inclusions, image: roomPhoto });
              onClose();
            }}
            className="w-full py-3.5 rounded-2xl bg-[#00875A] hover:bg-[#00704A] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>SAVE ROOM CHANGES</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 rounded-2xl border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-all cursor-pointer"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MODAL 2: TENANT PROFILE & DETAILS (Screenshot 004621) ---
export const FigmaTenantDetailModal: React.FC<{
  room: RoomItem | null;
  isOpen: boolean;
  onClose: () => void;
  onMessageTenant: (tenantName: string) => void;
  onMarkVacant: (roomId: string) => void;
}> = ({ room, isOpen, onClose, onMessageTenant, onMarkVacant }) => {
  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans max-h-[90vh] my-auto">
        {/* Green Top Header */}
        <div className="bg-[#053728] text-white p-4 flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h3 className="text-xs font-bold leading-tight">Tenant Profile & Details</h3>
            <p className="text-[10px] text-emerald-200">
              {room.name} • Fritzcel Boarding House
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Tenant Avatar & Header */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white flex justify-between items-start shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-emerald-400 bg-emerald-50 text-emerald-800 font-bold text-sm flex items-center justify-center">
                {room.tenant?.substring(0, 2).toUpperCase() || 'TN'}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-tight">
                  {room.tenant}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{room.course || 'ADSSU Student'}</span>
                </p>
                <p className="text-[10px] text-emerald-800 font-semibold mt-0.5 flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-emerald-700" />
                  <span>{room.phone || '+63 912 345 6789'}</span>
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold text-[#00875A] bg-emerald-100">
              ACTIVE
            </span>
          </div>

          {/* Monthly Rent Status */}
          <div className="p-3.5 rounded-2xl border border-emerald-300 bg-emerald-50/50 space-y-2 shadow-2xs">
            <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase block">
              MONTHLY RENT STATUS
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-[#00875A]">
                {room.price}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-emerald-200 flex justify-between items-center text-[10px]">
              <span className="text-slate-500 font-medium flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Due Date: {room.due || 'Every 28th of Month'}</span>
              </span>
              <span className="font-bold text-[#00875A] flex items-center gap-1">
                <span>PAID THIS MONTH</span>
                <CheckCircle className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Emergency & Guardian Details */}
          <div>
            <span className="text-[10px] font-bold tracking-wider text-slate-600 uppercase mb-1.5 block">
              EMERGENCY & GUARDIAN DETAILS
            </span>
            <div className="p-3.5 rounded-2xl border border-slate-200 bg-white space-y-2 text-xs shadow-2xs">
              <div className="flex justify-between">
                <span className="text-slate-400 text-[11px]">Guardian Name:</span>
                <span className="font-bold text-slate-800">
                  {room.guardianName || 'Mrs. Maria Ruiz (Mother)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-[11px]">Contact Number:</span>
                <span className="font-bold text-slate-800">
                  {room.guardianPhone || '+63 998 765 4321'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-[11px]">Home Address:</span>
                <span className="font-bold text-slate-800 text-right truncate max-w-[180px]">
                  {room.guardianAddress || 'Purok 2, San Francisco, ADS'}
                </span>
              </div>
            </div>
          </div>

          {/* Inclusions */}
          <div>
            <span className="text-[10px] font-bold tracking-wider text-slate-600 uppercase mb-1.5 block">
              ROOM INCLUSIONS & AMENITIES
            </span>
            <div className="p-3 rounded-2xl border border-slate-200 bg-white shadow-2xs">
              <ul className="text-xs text-slate-700 space-y-1">
                {room.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="text-emerald-600">●</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Uploaded ID Credentials & Enrollment Verification */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold tracking-wider text-slate-600 uppercase flex items-center gap-1">
                <FileText className="w-3 h-3 text-emerald-700" />
                <span>UPLOADED ID CREDENTIALS & ENROLLMENT</span>
              </span>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                <span>VERIFIED</span>
              </span>
            </div>
            <div className="p-3 rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-50/50 via-white to-slate-50 space-y-2.5 shadow-2xs">
              <div className="p-2.5 rounded-xl border border-dashed border-emerald-300 bg-white flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-lg bg-[#053728] text-white flex flex-col items-center justify-center p-1 shrink-0">
                    <GraduationCap className="w-4 h-4 text-emerald-300" />
                    <span className="text-[7px] font-black uppercase text-emerald-200">ADSSU</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-[11px] leading-tight">
                      ADSSU Validated Student ID (AY 2026–2027)
                    </h5>
                    <p className="text-[10px] font-mono text-emerald-800 font-semibold mt-0.5">
                      Student No: 2024-ADSSU-0492
                    </p>
                    <p className="text-[9px] text-slate-500 mt-0.5 flex items-center gap-1">
                      <Check className="w-2.5 h-2.5 text-[#00875A]" />
                      <span>Official Certificate of Registration (COR) on File</span>
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-[8px] font-extrabold text-[#00875A] bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                    <QrCode className="w-3 h-3 text-emerald-700" />
                    <span>REGISTRAR SEAL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => {
                onMessageTenant(room.tenant || 'Tenant');
                onClose();
              }}
              className="w-full py-3 rounded-2xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>MESSAGE TENANT DIRECTLY</span>
            </button>

            <button
              onClick={() => {
                if (confirm(`Mark ${room.name} as vacant? This will release current tenant.`)) {
                  onMarkVacant(room.id);
                  onClose();
                }
              }}
              className="w-full py-3 rounded-2xl border border-rose-300 bg-rose-50 text-rose-600 font-bold text-xs uppercase tracking-wider hover:bg-rose-100 transition-all active:scale-[0.98]"
            >
              MARK ROOM AS VACANT (TENANT MOVED OUT)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MODAL 3: ADD NEW ROOM (Screenshot 004611) ---
export const FigmaAddNewRoomModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAddRoom: (newRoom: RoomItem) => void;
}> = ({ isOpen, onClose, onAddRoom }) => {
  if (!isOpen) return null;

  const [roomName, setRoomName] = useState('Room 08');
  const [roomType, setRoomType] = useState('Bedspace (2-Bed Capacity)');
  const [monthlyRate, setMonthlyRate] = useState('₱1,500 / mo');
  const [maxCapacity, setMaxCapacity] = useState('2 Persons');
  const [amenities, setAmenities] = useState<string[]>([
    'Free Wi-Fi',
    '24/7 Water',
    'Bed Frame',
  ]);
  const [status, setStatus] = useState<'VACANT' | 'OCCUPIED'>('VACANT');
  const [roomImage, setRoomImage] = useState<string>(
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80'
  );
  const [roomImageUploaded, setRoomImageUploaded] = useState<boolean>(false);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const toggleAmenity = (name: string) => {
    setAmenities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setRoomImage(url);
      setRoomImageUploaded(true);
    }
  };

  const handleSave = () => {
    const newRoom: RoomItem = {
      id: `rm-${Date.now()}`,
      name: roomName,
      type: roomType,
      price: monthlyRate,
      status: status,
      inclusions: amenities,
      image: roomImage,
    };
    onAddRoom(newRoom);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans max-h-[90vh] my-auto">
        {/* Green Top Header */}
        <div className="bg-[#053728] text-white p-4 flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h3 className="text-xs font-bold leading-tight">Add New Room</h3>
            <p className="text-[10px] text-emerald-200">
              Fritzcel Boarding House • Room Setup
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-3.5">
          {/* Room Photo Upload Area */}
          <div>
            <label className="block text-[10px] font-bold tracking-wider text-slate-600 uppercase mb-1">
              ROOM PHOTO
            </label>

            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />

            {roomImageUploaded ? (
              <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-400 group shadow-xs">
                <img
                  src={roomImage}
                  alt="Uploaded Room Photo"
                  className="w-full h-36 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-xl bg-white text-emerald-900 font-bold text-xs shadow-md hover:bg-emerald-50 transition-colors"
                  >
                    Change Photo
                  </button>
                </div>
                <span className="absolute bottom-2 left-2 bg-[#00875A] text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
                  <Check className="w-3 h-3" /> Photo Attached
                </span>
              </div>
            ) : (
              <div
                onClick={() => photoInputRef.current?.click()}
                className="p-6 rounded-2xl border-2 border-dashed border-emerald-400 bg-emerald-50/30 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-emerald-50/60 transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-[#00875A] flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform shadow-xs">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#00875A]">
                  Tap to Select Room Photo from Device
                </span>
                <span className="text-[10px] text-slate-400">PNG, JPG, WebP up to 15MB</span>
              </div>
            )}
          </div>

          {/* Room Name */}
          <div>
            <label className="block text-[10px] font-bold tracking-wider text-slate-600 uppercase mb-1">
              ROOM NAME / NUMBER
            </label>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50"
            />
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-[10px] font-bold tracking-wider text-slate-600 uppercase mb-1">
              ROOM TYPE
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50"
            >
              <option>Bedspace (2-Bed Capacity)</option>
              <option>Bedspace (4-Bed Capacity)</option>
              <option>Private Solo Room</option>
              <option>Deluxe Private CR Room</option>
            </select>
          </div>

          {/* Rate and Capacity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold tracking-wider text-slate-600 uppercase mb-1">
                MONTHLY RATE (₱)
              </label>
              <input
                type="text"
                value={monthlyRate}
                onChange={(e) => setMonthlyRate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold tracking-wider text-slate-600 uppercase mb-1">
                MAX CAPACITY
              </label>
              <select
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50/50"
              >
                <option>1 Person</option>
                <option>2 Persons</option>
                <option>4 Persons</option>
              </select>
            </div>
          </div>

          {/* Inclusions & Amenities */}
          <div>
            <label className="block text-[10px] font-bold tracking-wider text-slate-600 uppercase mb-1.5">
              INCLUSIONS & AMENITIES
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Free Wi-Fi',
                '24/7 Water',
                'Bed Frame',
                'Study Desk',
                'Own CR',
                'Submetered',
              ].map((item) => {
                const checked = amenities.includes(item);
                return (
                  <button
                    key={item}
                    onClick={() => toggleAmenity(item)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      checked
                        ? 'bg-emerald-50 text-[#00875A] border border-emerald-400'
                        : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    {checked ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>{item}</span>
                      </span>
                    ) : (
                      `+ ${item}`
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Initial Status */}
          <div>
            <label className="block text-[10px] font-bold tracking-wider text-slate-600 uppercase mb-1.5">
              INITIAL STATUS
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setStatus('VACANT')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                  status === 'VACANT'
                    ? 'border-[#00875A] bg-emerald-50 text-[#00875A]'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#00875A]" />
                <span>Vacant (Available)</span>
              </button>

              <button
                onClick={() => setStatus('OCCUPIED')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                  status === 'OCCUPIED'
                    ? 'border-[#00875A] bg-emerald-50 text-[#00875A]'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>Occupied</span>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-2xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98] mt-2 cursor-pointer"
          >
            Save & Publish Room
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MODAL 4: FULL LANDLORD PROFILE & ACCREDITATION MODAL ---
export interface FigmaLandlordProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: CurrentUser | null;
  onUpdateProfile?: (updated: {
    name: string;
    subTitle: string;
    email: string;
    profilePhoto?: string;
    phone?: string;
    address?: string;
  }) => void;
  onLogout: () => void;
  roomsCount?: number;
  occupiedRoomsCount?: number;
}

export const FigmaLandlordProfileModal: React.FC<FigmaLandlordProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateProfile,
  onLogout,
  roomsCount = 6,
  occupiedRoomsCount = 2,
}) => {
  if (!isOpen || !currentUser) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name || 'Conrado Candari');
  const [houseName, setHouseName] = useState(currentUser.subTitle || 'Fritzcel Boarding House');
  const [email, setEmail] = useState(currentUser.email || 'owner@staynest.ph');
  const [phone, setPhone] = useState('+63 912 345 6789');
  const [address, setAddress] = useState('Purok 3, San Jose, Bunawan, Agusan del Sur');
  const [profilePhoto, setProfilePhoto] = useState<string | undefined>(currentUser.profilePhoto);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const photoInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || 'Conrado Candari');
      setHouseName(currentUser.subTitle || 'Fritzcel Boarding House');
      setEmail(currentUser.email || 'owner@staynest.ph');
      setProfilePhoto(currentUser.profilePhoto);
    }
  }, [isOpen, currentUser]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setProfilePhoto(url);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile({
        name,
        subTitle: houseName,
        email,
        phone,
        address,
        profilePhoto,
      });
    }
    setIsEditing(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-2 sm:p-4 overflow-y-auto animate-in fade-in">
      <div className="w-[92vw] max-w-lg mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto flex flex-col font-sans max-h-[85vh]">
        {/* Hidden Photo File Input */}
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />

        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#053728] via-[#094835] to-[#04281e] text-white p-6 relative overflow-hidden shrink-0">
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner">
                <Home className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold leading-tight">
                  Landlord Profile & Dormitory Information
                </h3>
                <p className="text-xs text-emerald-200 mt-0.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Municipality of Bunawan Accredited Operator · AY 2026–2027</span>
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-all active:scale-95 border border-white/20"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {showSuccessToast && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2.5 shadow-sm animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Your Landlord Profile and Boarding House credentials have been saved successfully!</span>
            </div>
          )}

          {/* Profile Card / Edit Form */}
          {!isEditing ? (
            <div className="p-6 rounded-[28px] bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/40 border border-emerald-200/80 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div
                  onClick={() => {
                    setIsEditing(true);
                    setTimeout(() => photoInputRef.current?.click(), 100);
                  }}
                  className="relative cursor-pointer group shrink-0 active:scale-95 transition-transform"
                  title="Click to Upload / Change Profile Picture"
                >
                  <div className="w-18 h-18 rounded-2xl border-2 border-[#E5A93C] p-0.5 flex items-center justify-center bg-white shadow-sm overflow-hidden">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt={name}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="w-full h-full rounded-2xl bg-emerald-700 text-white font-black text-xl flex items-center justify-center">
                        {currentUser.avatar || 'LL'}
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#00875A] border-2 border-white flex items-center justify-center text-white shadow-2xs">
                    <Camera className="w-3 h-3 text-white" />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-lg font-extrabold text-slate-900 leading-tight truncate">
                      {name}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-bold border border-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      <span>Verified Landlord</span>
                    </span>
                  </div>

                  <p className="text-xs text-[#00875A] font-bold mt-1 flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-[#00875A] shrink-0" />
                    <span>{houseName}</span>
                  </p>

                  <div className="mt-2 space-y-1 text-xs text-slate-600">
                    <p className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{address}</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <span className="flex items-center gap-1 font-mono text-[11px] text-slate-700 bg-white/80 px-2 py-0.5 rounded-md border border-slate-200">
                        <Phone className="w-3 h-3 text-emerald-700" />
                        {phone}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-700 bg-white/80 px-2 py-0.5 rounded-md border border-slate-200">
                        <Mail className="w-3 h-3 text-emerald-700" />
                        {email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-300 text-[#00875A] text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-auto active:scale-95"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            </div>
          ) : (
            /* Edit Form */
            <form onSubmit={handleSaveProfile} className="p-6 rounded-[28px] bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Edit Landlord & Dormitory Details
                </span>
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="text-xs text-[#00875A] font-bold hover:underline flex items-center gap-1"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Change Profile Photo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Owner Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00875A] text-xs font-medium bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Boarding House / Dorm Name</label>
                  <input
                    type="text"
                    value={houseName}
                    onChange={(e) => setHouseName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00875A] text-xs font-medium bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Mobile Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00875A] text-xs font-medium bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00875A] text-xs font-medium bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Complete Bunawan Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00875A] text-xs font-medium bg-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 text-xs font-bold hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold shadow-sm cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* Real-time Occupancy Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Total Rooms</span>
              <span className="text-xl font-black text-slate-900 block mt-0.5">{roomsCount}</span>
              <span className="text-[10px] text-slate-400">Inventory slots</span>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-2xs text-center">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block">Occupied</span>
              <span className="text-xl font-black text-emerald-900 block mt-0.5">{occupiedRoomsCount}</span>
              <span className="text-[10px] text-emerald-700">Enrolled students</span>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-2xs text-center">
              <span className="text-[10px] font-bold text-amber-800 uppercase block">Vacant</span>
              <span className="text-xl font-black text-amber-900 block mt-0.5">{roomsCount - occupiedRoomsCount}</span>
              <span className="text-[10px] text-amber-700">Ready to accept</span>
            </div>
          </div>

          {/* 4 LGU Bunawan Legal Compliance Documents Verified */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>4 Mandatory LGU Bunawan Compliance Credentials</span>
              </h5>
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                4 / 4 Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <span className="font-bold text-slate-800 block text-xs">1. Proof of Ownership Title</span>
                  <span className="text-[10px] text-slate-500">TCT No. T-48192 (Lot 412)</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <span className="font-bold text-slate-800 block text-xs">2. Mayor's Business Permit</span>
                  <span className="text-[10px] text-slate-500">Permit #2026-BNW-0491</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <span className="font-bold text-slate-800 block text-xs">3. Philippine National ID</span>
                  <span className="text-[10px] text-slate-500">Identity Verified</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-slate-200 flex items-center gap-2.5 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="min-w-0">
                  <span className="font-bold text-slate-800 block text-xs">4. BFP Fire Safety Inspection</span>
                  <span className="text-[10px] text-slate-500">FSIC No. R13-ADS-BNW-0082</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={onLogout}
              className="py-2.5 px-4 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold shadow-sm cursor-pointer transition-all active:scale-95"
            >
              Done & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
