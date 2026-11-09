import React, { useState } from 'react';
import {
  Bell,
  Check,
  CheckCircle2,
  Clock,
  Compass,
  Droplets,
  Edit3,
  GraduationCap,
  Heart,
  Home,
  Lock,
  Mail,
  MapPin,
  Moon,
  Phone,
  Save,
  Shield,
  ShieldCheck,
  Sliders,
  Smartphone,
  Sparkles,
  User,
  Utensils,
  Wifi,
  Wind,
  X,
} from 'lucide-react';
import { CurrentUser } from '../../services/sessionManager';

interface FigmaStudentSettingsProps {
  onBackToExplore?: () => void;
  onShowToast: (msg: string) => void;
  currentUser?: CurrentUser | null;
  onUpdateProfile?: (updated: {
    name?: string;
    email?: string;
    studentId?: string;
    subTitle?: string;
    profilePhoto?: string;
  }) => void;
}

export const FigmaStudentSettings: React.FC<FigmaStudentSettingsProps> = ({
  onBackToExplore,
  onShowToast,
  currentUser,
  onUpdateProfile,
}) => {
  // 1. Accommodation Preferences
  const [maxBudget, setMaxBudget] = useState('1500');
  const [maxDistance, setMaxDistance] = useState('1km');
  const [roomTypePref, setRoomTypePref] = useState('any');
  const [amenities, setAmenities] = useState<string[]>([
    'Free High-Speed Wi-Fi',
    '24/7 Water Supply',
    'Low Flood Zone',
  ]);

  // 2. Notification Preferences
  const [smsVacantAlerts, setSmsVacantAlerts] = useState(true);
  const [smsChatAlerts, setSmsChatAlerts] = useState(true);
  const [curfewReminder, setCurfewReminder] = useState(true);

  // 3. Privacy & Display
  const [anonymousReviews, setAnonymousReviews] = useState(false);

  // 4. Contact & Emergency Details
  const [studentPhone, setStudentPhone] = useState('+63 912 345 6789');
  const [guardianName, setGuardianName] = useState('Mrs. Maria Ruiz');
  const [guardianPhone, setGuardianPhone] = useState('+63 998 765 4321');

  // 5. Dynamic Student Profile & Credentials State
  const [isEditingCredentials, setIsEditingCredentials] = useState(false);
  const [credName, setCredName] = useState(currentUser?.name || 'Angelo Nuer');
  const [credEmail, setCredEmail] = useState(currentUser?.email || 'anuer@adssu.edu.ph');
  const [credStudentId, setCredStudentId] = useState(currentUser?.studentId || '2024-0192-B');
  const [credSubTitle, setCredSubTitle] = useState(currentUser?.subTitle || 'BSIT - 3rd Year');

  React.useEffect(() => {
    if (currentUser) {
      setCredName(currentUser.name);
      setCredEmail(currentUser.email);
      setCredStudentId(currentUser.studentId || '2024-0192-B');
      setCredSubTitle(currentUser.subTitle || 'BSIT - 3rd Year');
    }
  }, [currentUser]);

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile({
        name: credName,
        email: credEmail,
        studentId: credStudentId,
        subTitle: credSubTitle,
      });
    }
    setIsEditingCredentials(false);
    onShowToast('Nabag-o na ang imong Student Credentials sa StayNest!');
  };

  const [savedSuccess, setSavedSuccess] = useState(false);

  const toggleAmenity = (item: string) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  };

  const handleSave = () => {
    setSavedSuccess(true);
    onShowToast('Student housing preferences & alert settings saved successfully!');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6 font-sans select-none">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Student Housing Settings & Preferences
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#00875A] text-xs font-bold border border-emerald-300">
              ADSSU Student
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure your boarding house search criteria, SMS notifications, and student verification info.
          </p>
        </div>

        {onBackToExplore && (
          <button
            onClick={onBackToExplore}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all self-start sm:self-auto cursor-pointer"
          >
            ← Back to Explore
          </button>
        )}
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>All student settings have been updated and synced with ADSSU StayNest.</span>
        </div>
      )}

      {/* Grid of Setting Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Search & Housing Criteria */}
        <div className="lg:col-span-2 space-y-6">
          {/* Card 1: Boarding House Search Preferences */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#00875A]" />
                <span>Housing Match Preferences</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-medium">Automatic Filter Sync</span>
            </div>

            <div className="space-y-4">
              {/* Budget Ceiling */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Maximum Target Monthly Rent
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { val: '1000', label: '₱1,000 / mo' },
                    { val: '1500', label: '₱1,500 / mo' },
                    { val: '2000', label: '₱2,000 / mo' },
                    { val: '3000', label: 'Up to ₱3,000' },
                  ].map((b) => (
                    <button
                      key={b.val}
                      type="button"
                      onClick={() => setMaxBudget(b.val)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        maxBudget === b.val
                          ? 'bg-[#00875A] text-white border-[#00875A] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Distance Preference */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Distance from ADSSU Bunawan Campus
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: '500m', label: 'Within 500m (5m walk)' },
                    { val: '1km', label: 'Within 1 km (10m walk)' },
                    { val: 'any', label: 'Any Distance' },
                  ].map((d) => (
                    <button
                      key={d.val}
                      type="button"
                      onClick={() => setMaxDistance(d.val)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        maxDistance === d.val
                          ? 'bg-[#00875A] text-white border-[#00875A] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Room Type Preference */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Preferred Room Setup
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { val: 'any', label: 'Any Setup' },
                    { val: 'bedspace', label: 'Bedspace (Shared)' },
                    { val: 'solo', label: 'Solo Private Room' },
                  ].map((r) => (
                    <button
                      key={r.val}
                      type="button"
                      onClick={() => setRoomTypePref(r.val)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all text-center cursor-pointer ${
                        roomTypePref === r.val
                          ? 'bg-[#00875A] text-white border-[#00875A] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Must-Have Amenities */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Must-Have Amenities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Free High-Speed Wi-Fi',
                    '24/7 Water Supply',
                    'Low Flood Zone',
                    'Curfew 10:00 PM',
                    'Cooking Allowed',
                    'Own Private CR',
                  ].map((amenity) => {
                    const isSelected = amenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`p-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isSelected ? 'text-[#00875A]' : 'text-slate-300'
                          }`}
                        />
                        <span className="truncate">{amenity}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Student Emergency & Guardian Info */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#00875A]" />
              <span>Contact & Emergency Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student Mobile Number
                </label>
                <input
                  type="text"
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Parent / Guardian Name
                </label>
                <input
                  type="text"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Parent / Guardian Emergency Phone
                </label>
                <input
                  type="text"
                  value={guardianPhone}
                  onChange={(e) => setGuardianPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-600"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Shared confidentially with your boarding house landlord upon check-in for university safety compliance.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Notifications, Verified ID, and Actions */}
        <div className="space-y-6">
          {/* Card 3: Verified Student Credentials */}
          <div className="bg-gradient-to-br from-[#053728] to-[#04281D] text-white rounded-3xl p-5 sm:p-6 shadow-md border border-emerald-700/50 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                CAMPUS CREDENTIALS
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-emerald-700/70 text-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/50">
                  <ShieldCheck className="w-3 h-3 text-[#E5A93C]" /> Verified
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingCredentials(!isEditingCredentials)}
                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1 border border-white/20"
                  title="Edit Student Credentials"
                >
                  {isEditingCredentials ? (
                    <>
                      <X className="w-3 h-3" />
                      <span>Cancel</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-3 h-3 text-[#E5A93C]" />
                      <span>Edit</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {!isEditingCredentials ? (
              <>
                <div className="flex items-center gap-3">
                  {currentUser?.profilePhoto ? (
                    <img
                      src={currentUser.profilePhoto}
                      alt={currentUser.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#E5A93C] shadow-sm shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-emerald-400 text-[#053728] font-black text-sm flex items-center justify-center border-2 border-[#E5A93C] shadow-sm shrink-0">
                      {currentUser?.avatar || 'ST'}
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-base font-bold text-white truncate">{currentUser?.name || 'Angelo Nuer'}</h4>
                    <p className="text-xs text-emerald-200 truncate">{currentUser?.subTitle || 'BSIT - 3rd Year'}</p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-emerald-800/80 text-xs">
                  <div className="flex justify-between text-slate-200">
                    <span className="text-emerald-300/80">Student ID:</span>
                    <span className="font-mono font-bold text-white">{currentUser?.studentId || '2024-0192-B'}</span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span className="text-emerald-300/80">Course:</span>
                    <span className="font-semibold text-white">{currentUser?.subTitle || 'BSIT - 3rd Year'}</span>
                  </div>
                  <div className="flex justify-between text-slate-200">
                    <span className="text-emerald-300/80">Email:</span>
                    <span className="font-semibold text-white truncate max-w-[180px]">{currentUser?.email || 'anuer@adssu.edu.ph'}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-200 pt-1.5 border-t border-emerald-800/60">
                    <span className="text-emerald-300/80">ADSSU COR Status:</span>
                    <span className="font-bold text-[#E5A93C] flex items-center gap-1 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A93C]" />
                      <span>Approved & Verified</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-300">
                    <span className="text-emerald-300/60">Submitted File:</span>
                    <span className="font-mono text-emerald-200 truncate max-w-[160px]">ADSSU_COR_2026.pdf</span>
                  </div>
                </div>
              </>
            ) : (
              <form onSubmit={handleSaveCredentials} className="space-y-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-emerald-200 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={credName}
                    onChange={(e) => setCredName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white/10 border border-emerald-600 text-white text-xs font-medium focus:bg-white/20 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-emerald-200 mb-1">Student ID (M-00000)</label>
                  <input
                    type="text"
                    value={credStudentId}
                    onChange={(e) => setCredStudentId(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white/10 border border-emerald-600 text-amber-300 text-xs font-mono font-bold focus:bg-white/20 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-emerald-200 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={credEmail}
                    onChange={(e) => setCredEmail(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white/10 border border-emerald-600 text-white text-xs font-medium focus:bg-white/20 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-emerald-200 mb-1">Course & Year Level</label>
                  <input
                    type="text"
                    value={credSubTitle}
                    onChange={(e) => setCredSubTitle(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-xl bg-white/10 border border-emerald-600 text-white text-xs font-medium focus:bg-white/20 focus:outline-none"
                    required
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingCredentials(false)}
                    className="flex-1 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-xl bg-[#E5A93C] hover:bg-amber-500 text-emerald-950 font-bold text-xs cursor-pointer shadow-md flex items-center justify-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Save</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Card 4: Notification Toggles */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3.5">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#00875A]" />
              <span>SMS & Safety Notifications</span>
            </h3>

            <div className="space-y-3 pt-1">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsVacantAlerts}
                  onChange={(e) => setSmsVacantAlerts(e.target.checked)}
                  className="mt-1 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Vacant Room Alerts
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Instant SMS when a room matching my budget becomes vacant.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsChatAlerts}
                  onChange={(e) => setSmsChatAlerts(e.target.checked)}
                  className="mt-1 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Landlord Reply Alerts
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Receive SMS alerts when a landlord answers your inquiry.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={curfewReminder}
                  onChange={(e) => setCurfewReminder(e.target.checked)}
                  className="mt-1 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Campus Curfew Reminder
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Notice at 9:30 PM before the 10:00 PM boarding gate lock.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Save Action Button */}
          <button
            onClick={handleSave}
            className="w-full py-3.5 rounded-2xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Student Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};
