import React, { useState } from 'react';
import { BoardingHouse, BookingRequest } from '../types/staynest';
import { Calendar, Clock, MapPin, ShieldCheck, UserCheck, Users, X } from 'lucide-react';

interface BookVisitModalProps {
  house: BoardingHouse;
  isOpen: boolean;
  onClose: () => void;
  onSubmitBooking: (booking: Omit<BookingRequest, 'id' | 'createdAt' | 'status'>) => void;
}

export const BookVisitModal: React.FC<BookVisitModalProps> = ({
  house,
  isOpen,
  onClose,
  onSubmitBooking,
}) => {
  const [bookingType, setBookingType] = useState<'visit_schedule' | 'room_reservation'>('visit_schedule');
  const [selectedRoom, setSelectedRoom] = useState(house.rooms[0]?.name || 'Standard Bedspace');
  const [studentName, setStudentName] = useState('Angelo Nuer');
  const [studentEmail, setStudentEmail] = useState('nuerangelo6@gmail.com');
  const [studentPhone, setStudentPhone] = useState('+63 949 112 3456');
  const [studentIdNumber, setStudentIdNumber] = useState('ADSSU-2023-0189');
  const [visitDate, setVisitDate] = useState('2026-10-09');
  const [visitTime, setVisitTime] = useState('10:00 AM');
  const [targetMoveIn, setTargetMoveIn] = useState('2026-10-15');
  const [notes, setNotes] = useState('Looking forward to checking the room layout and 24/7 water supply.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitBooking({
      houseId: house.id,
      houseName: house.name,
      roomName: selectedRoom,
      studentName,
      studentEmail,
      studentPhone,
      studentIdNumber,
      targetMoveInDate: targetMoveIn,
      visitDate: `${visitDate} at ${visitTime}`,
      type: bookingType,
      notes,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg liquid-glass border-2 border-white/90 rounded-[32px] shadow-2xl p-6 sm:p-8 text-slate-900 animate-in fade-in zoom-in-95 overflow-hidden">
        {/* Ambient liquid glow orb */}
        <div className="absolute top-4 right-4 w-48 h-48 rounded-full bg-emerald-400/25 blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80 relative z-10">
          <div className="min-w-0 pr-2">
            <h3 className="text-lg sm:text-xl font-serif italic font-bold text-[#053728] truncate">
              {bookingType === 'visit_schedule' ? 'Schedule Ocular Visit' : 'Reserve Room Bedspace'}
            </h3>
            <p className="text-xs text-emerald-800 font-medium truncate">{house.name} · {house.distanceKm} km from ADSSU</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-600 hover:text-slate-900 bg-slate-200/70 border border-white/90 flex items-center justify-center shrink-0 cursor-pointer transition-all active:scale-95 shadow-xs"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Segmented Type Picker */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setBookingType('visit_schedule')}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                bookingType === 'visit_schedule'
                  ? 'bg-[#0F4A38] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>Ocular Visit</span>
            </button>
            <button
              type="button"
              onClick={() => setBookingType('room_reservation')}
              className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                bookingType === 'room_reservation'
                  ? 'bg-[#0F4A38] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span>Reserve Room</span>
            </button>
          </div>

          {/* Select Room */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Select Room Option:
            </label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800 rounded-lg text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-[#0F4A38] dark:focus:border-[#E5A93C]"
            >
              {house.rooms.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name} — ₱{r.priceMonthly.toLocaleString()}/mo ({r.availableSlots} vacant)
                </option>
              ))}
            </select>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Full Student Name:</label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800 rounded-lg text-xs text-slate-900 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">ADSSU Student ID:</label>
              <input
                type="text"
                required
                value={studentIdNumber}
                onChange={(e) => setStudentIdNumber(e.target.value)}
                placeholder="e.g. ADSSU-2023-XXXX"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800 rounded-lg text-xs text-slate-900 dark:text-slate-200 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Contact Phone:</label>
              <input
                type="tel"
                required
                value={studentPhone}
                onChange={(e) => setStudentPhone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800 rounded-lg text-xs text-slate-900 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">Email Address:</label>
              <input
                type="email"
                required
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800 rounded-lg text-xs text-slate-900 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Date Picker */}
          {bookingType === 'visit_schedule' ? (
            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800">
              <div>
                <label className="block text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold mb-1">
                  Preferred Visit Date:
                </label>
                <input
                  type="date"
                  required
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#08291F] border border-slate-200 dark:border-emerald-700 rounded text-xs text-slate-900 dark:text-slate-200 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold mb-1">
                  Time of Day:
                </label>
                <select
                  value={visitTime}
                  onChange={(e) => setVisitTime(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white dark:bg-[#08291F] border border-slate-200 dark:border-emerald-700 rounded text-xs text-slate-900 dark:text-slate-200"
                >
                  <option value="9:00 AM">9:00 AM (Morning)</option>
                  <option value="10:00 AM">10:00 AM (Morning)</option>
                  <option value="1:30 PM">1:30 PM (Afternoon)</option>
                  <option value="3:30 PM">3:30 PM (Afternoon)</option>
                  <option value="5:00 PM">5:00 PM (After Class)</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800">
              <label className="block text-[11px] text-emerald-800 dark:text-emerald-300 font-semibold mb-1">
                Target Move-In Date:
              </label>
              <input
                type="date"
                required
                value={targetMoveIn}
                onChange={(e) => setTargetMoveIn(e.target.value)}
                className="w-full px-3 py-1.5 bg-white dark:bg-[#08291F] border border-slate-200 dark:border-emerald-700 rounded text-xs text-slate-900 dark:text-slate-200 font-mono"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-1">
              Notes for Landlord ({house.contactPerson}):
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-[#051F17] border border-slate-200 dark:border-emerald-800 rounded-lg text-xs text-slate-900 dark:text-slate-200"
              placeholder="e.g. Bringing motorcycle, inquiry about study desk..."
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-3 rounded-2xl liquid-glass-btn-accent text-white font-extrabold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              Confirm Request to {house.contactPerson}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
