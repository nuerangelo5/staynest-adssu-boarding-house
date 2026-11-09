import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  ChevronRight,
  Compass,
  Heart,
  HelpCircle,
  LogOut,
  MessageSquare,
  User,
  Check,
  Camera,
  Upload,
} from 'lucide-react';

interface FigmaStudentProfileProps {
  onLogout: () => void;
  onOpenSaved?: () => void;
  onOpenMessages?: () => void;
  userPhoto?: string;
  userName?: string;
  userEmail?: string;
  userStudentId?: string;
  userSubtitle?: string;
  onUpdatePhoto?: (newPhotoUrl: string) => void;
  onUpdateProfile?: (updated: {
    name?: string;
    email?: string;
    studentId?: string;
    subTitle?: string;
    profilePhoto?: string;
  }) => void;
}

export const FigmaStudentProfile: React.FC<FigmaStudentProfileProps> = ({
  onLogout,
  onOpenSaved,
  onOpenMessages,
  userPhoto,
  userName = 'Angelo Laureta Nuer',
  userEmail = 'anuer15@adssu.edu.ph',
  userStudentId = '2024-0192-B',
  userSubtitle = 'BSIT - 3rd Year',
  onUpdatePhoto,
  onUpdateProfile,
}) => {
  const [profilePhoto, setProfilePhoto] = useState<string | null>(userPhoto || null);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userName);
  const [editEmail, setEditEmail] = useState(userEmail);
  const [editStudentId, setEditStudentId] = useState(userStudentId);
  const [editSubtitle, setEditSubtitle] = useState(userSubtitle);
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  // Keep state in sync with dynamic user props
  useEffect(() => {
    setProfilePhoto(userPhoto || null);
    setEditName(userName);
    setEditEmail(userEmail);
    setEditStudentId(userStudentId);
    setEditSubtitle(userSubtitle);
  }, [userPhoto, userName, userEmail, userStudentId, userSubtitle]);

  // Interactive Modals
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showCampusModal, setShowCampusModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [campusPreference, setCampusPreference] = useState<'bunawan' | 'main'>('bunawan');

  const photoInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setProfilePhoto(url);
      if (onUpdatePhoto) {
        onUpdatePhoto(url);
      }
      if (onUpdateProfile) {
        onUpdateProfile({ profilePhoto: url });
      }
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateProfile) {
      onUpdateProfile({
        name: editName.trim() || userName,
        email: editEmail.trim() || userEmail,
        studentId: editStudentId.trim() || userStudentId,
        subTitle: editSubtitle.trim() || userSubtitle,
        profilePhoto: profilePhoto || undefined,
      });
    }
    setIsEditing(false);
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3500);
  };

  return (
    <div className="relative w-full h-full min-h-[720px] bg-gradient-to-br from-emerald-50/70 via-amber-50/30 to-emerald-100/50 flex flex-col justify-between select-none font-sans overflow-y-auto">
      {/* Ambient liquid lighting blurs */}
      <div className="absolute top-12 left-10 w-72 h-72 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-48 right-10 w-80 h-80 bg-amber-300/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="bg-gradient-to-r from-[#053728] via-[#084533] to-[#04281e] text-white px-4 sm:px-8 pt-5 sm:pt-7 pb-10 sm:pb-12 rounded-b-[28px] sm:rounded-b-[36px] shadow-lg shadow-emerald-950/20 border-b border-emerald-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden backdrop-blur-xl">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 min-w-0 max-w-full">
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-white drop-shadow-xs">My Profile & Account</h2>
          <div className="mt-1.5 flex items-center gap-2 flex-wrap">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-center sm:text-left px-3 py-1 rounded-xl sm:rounded-full bg-emerald-400/15 border border-emerald-400/30 text-emerald-200 text-xs font-semibold backdrop-blur-sm max-w-full leading-relaxed">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>Verified ADSSU Housing Student Account</span>
              <span className="text-emerald-400/50 hidden sm:inline">•</span>
              <span className="font-mono font-bold text-white bg-emerald-900/50 px-2 py-0.5 rounded-md border border-emerald-400/30 shrink-0">
                {userStudentId}
              </span>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (!isEditing) {
              setEditName(userName);
              setEditEmail(userEmail);
              setEditStudentId(userStudentId);
              setEditSubtitle(userSubtitle);
            }
            setIsEditing(!isEditing);
          }}
          className="relative z-10 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold backdrop-blur-md transition-all border border-white/25 cursor-pointer shadow-md active:scale-95 self-start sm:self-auto shrink-0"
        >
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      {/* Main Container */}
      <div className="px-3 sm:px-6 -mt-6 sm:-mt-7 flex-1 space-y-4 pb-8 max-w-2xl mx-auto w-full relative z-10">
        {/* Hidden File Input for Profile Photo Upload */}
        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />

        {showSaveAlert && (
          <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-500/15 backdrop-blur-md border border-emerald-400/40 text-emerald-950 text-xs font-bold flex items-center gap-2.5 shadow-md animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Your student profile details & ADSSU ID ({editStudentId}) have been updated!</span>
          </div>
        )}

        {/* Profile Card / Edit Form */}
        {!isEditing ? (
          <div className="p-4 sm:p-6 rounded-2xl sm:rounded-[28px] bg-white/80 backdrop-blur-xl border border-white/90 shadow-xl shadow-emerald-950/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all hover:bg-white/90">
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
              <div
                onClick={() => photoInputRef.current?.click()}
                className="relative cursor-pointer group shrink-0"
                title="Click to Upload / Change Profile Picture"
              >
                <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-2xl border-2 border-[#E5A93C] p-0.5 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-800 overflow-hidden shadow-sm">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt={userName}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <User className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-800" />
                  )}
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5.5 h-5.5 sm:w-6 sm:h-6 rounded-full bg-[#00875A] border-2 border-white flex items-center justify-center text-white shadow-2xs">
                  <Camera className="w-3 h-3 text-white" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-tight truncate">
                  {userName}
                </h3>
                <p className="text-xs text-[#00875A] font-bold mt-0.5 break-words">
                  {userSubtitle}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
                  <span className="truncate max-w-[160px] sm:max-w-none font-medium text-[11px] sm:text-xs">{userEmail}</span>
                  <span className="text-slate-300">•</span>
                  <span className="inline-flex items-center gap-1.5 font-mono font-bold text-[11px] sm:text-xs text-emerald-900 bg-emerald-100/90 px-2 py-0.5 rounded-lg border border-emerald-300/80 shadow-2xs shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                    {userStudentId}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => photoInputRef.current?.click()}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/90 hover:bg-white border border-emerald-300/80 text-[#00875A] text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer flex items-center justify-center gap-1.5 shrink-0 active:scale-95 backdrop-blur-sm self-stretch sm:self-auto"
            >
              <Upload className="w-3.5 h-3.5 text-[#00875A] shrink-0" />
              <span>Change Photo</span>
            </button>
          </div>
        ) : (
          /* Edit Profile Form */
          <form
            onSubmit={handleSaveProfile}
            className="p-5 sm:p-6 rounded-[28px] bg-white/85 backdrop-blur-xl border border-white/90 shadow-xl shadow-emerald-950/5 space-y-4"
          >
            <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
              <div
                onClick={() => photoInputRef.current?.click()}
                className="relative cursor-pointer group shrink-0"
                title="Click to Upload Photo"
              >
                <div className="w-16 h-16 rounded-full border-2 border-[#00875A] p-0.5 flex items-center justify-center bg-emerald-50 text-emerald-800 overflow-hidden shadow-sm">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt={editName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-8 h-8 text-emerald-800" />
                  )}
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Profile Picture</p>
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="mt-1 text-xs text-[#00875A] hover:underline font-bold"
                >
                  Click to select new photo from device
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00875A] text-xs font-medium"
                  placeholder="e.g. Angelo Nuer"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ADSSU Student ID (M-00000)
                </label>
                <input
                  type="text"
                  value={editStudentId}
                  onChange={(e) => setEditStudentId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00875A] text-xs font-mono font-bold text-emerald-900 bg-slate-50"
                  placeholder="e.g. M-01928"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ADSSU Email Address
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00875A] text-xs font-medium"
                  placeholder="e.g. anuer15@adssu.edu.ph"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Degree Program & Year Level
                </label>
                <input
                  type="text"
                  value={editSubtitle}
                  onChange={(e) => setEditSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00875A] text-xs font-medium"
                  placeholder="e.g. BSIT – Bachelor of Science in Information Technology - 3rd Year"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#00875A] text-white text-xs font-bold hover:bg-[#00734c] shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        )}

        {/* Section 1: Housing Activity */}
        <div>
          <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900/70 mb-2 px-1">
            HOUSING ACTIVITY
          </h4>
          <div className="rounded-[24px] bg-white/75 backdrop-blur-xl border border-white/80 overflow-hidden divide-y divide-emerald-900/5 shadow-lg shadow-emerald-950/5">
            <button
              type="button"
              onClick={onOpenSaved}
              className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-white/90 transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 shadow-2xs group-hover:scale-105 transition-transform">
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Saved Boarding Houses</span>
                  <span className="text-[10px] text-slate-500">Quickly view bookmarked dorms & spaces</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onOpenMessages}
              className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-white/90 transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center border border-emerald-500/20 shadow-2xs group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Landlord Messages</span>
                  <span className="text-[10px] text-slate-500">Official inquiries with verified Bunawan owners</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Section 2: Preferences & App */}
        <div>
          <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-900/70 mb-2 px-1">
            PREFERENCES & APP
          </h4>
          <div className="rounded-[24px] bg-white/75 backdrop-blur-xl border border-white/80 overflow-hidden divide-y divide-emerald-900/5 shadow-lg shadow-emerald-950/5">
            <button
              type="button"
              onClick={() => setShowNotificationsModal(true)}
              className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-white/90 transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-500/20 shadow-2xs group-hover:scale-105 transition-transform">
                  <Bell className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Notifications</span>
                  <span className="text-[10px] text-slate-500">Rent reminders, replies & LGU alerts</span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full border border-emerald-300/80 shadow-2xs flex items-center gap-1">
                3 Active
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowCampusModal(true)}
              className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-white/90 transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center border border-blue-500/20 shadow-2xs group-hover:scale-105 transition-transform">
                  <Compass className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    Campus Preference
                  </span>
                  <span className="text-[10px] text-slate-500">Target distance calculations to Bunawan</span>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-lg border border-slate-200">
                ADSSU Bunawan
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowFaqModal(true)}
              className="w-full px-5 py-3.5 flex items-center justify-between hover:bg-white/90 transition-all text-left cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-700/10 text-emerald-800 flex items-center justify-center border border-emerald-700/20 shadow-2xs group-hover:scale-105 transition-transform">
                  <HelpCircle className="w-4 h-4 text-emerald-800" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Help Center & FAQ</span>
                  <span className="text-[10px] text-slate-500">LGU verification guidelines & student rights</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Log Out Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onLogout}
            className="w-full py-3.5 rounded-2xl border border-rose-300/80 bg-rose-50/70 hover:bg-rose-100 text-rose-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md active:scale-98 backdrop-blur-md"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. NOTIFICATIONS MODAL                                                    */}
      {/* ========================================================================= */}
      {showNotificationsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-[28px] overflow-hidden shadow-2xl border border-white/80 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Bell className="w-4 h-4 text-amber-500" />
                <span>Student Housing Notifications</span>
              </div>
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-slate-700">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-emerald-950">
                  <span>Room Inquiry Replied</span>
                  <span className="text-[10px] text-emerald-700 font-mono">10:42 AM</span>
                </div>
                <p className="text-slate-600">
                  Landlord <strong>Conrado Candari</strong> replied to your inquiry regarding Room 01 at Fritzcel Boarding House.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-amber-950">
                  <span>Monthly Due Reminder</span>
                  <span className="text-[10px] text-amber-700 font-mono">Yesterday</span>
                </div>
                <p className="text-slate-600">
                  Your upcoming monthly rent due date is approaching on <strong>Nov 10, 2026</strong>.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                <div className="flex items-center justify-between font-bold text-blue-950">
                  <span>LGU Bunawan Safety Seal</span>
                  <span className="text-[10px] text-blue-700 font-mono">Oct 28</span>
                </div>
                <p className="text-slate-600">
                  BFP Bunawan Station inspected and re-certified 5 boarding houses near ADSSU campus gate.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowNotificationsModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#00875A] text-white font-bold text-xs cursor-pointer shadow-xs"
            >
              Close Notifications
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CAMPUS PREFERENCE MODAL                                                */}
      {/* ========================================================================= */}
      {showCampusModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-[28px] overflow-hidden shadow-2xl border border-white/80 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <Compass className="w-4 h-4 text-blue-500" />
                <span>Select Campus Location</span>
              </div>
              <button
                onClick={() => setShowCampusModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5">
              <div
                onClick={() => setCampusPreference('bunawan')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  campusPreference === 'bunawan'
                    ? 'border-[#00875A] bg-emerald-50/70 font-bold text-emerald-950 shadow-2xs'
                    : 'border-slate-200/80 bg-white/70 text-slate-700 hover:bg-white'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">ADSSU Bunawan Main Campus</div>
                  <div className="text-[11px] text-slate-500">Agusan del Sur State University · San Jose, Bunawan</div>
                </div>
                {campusPreference === 'bunawan' && <Check className="w-4 h-4 text-[#00875A]" />}
              </div>

              <div
                onClick={() => setCampusPreference('main')}
                className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                  campusPreference === 'main'
                    ? 'border-[#00875A] bg-emerald-50/70 font-bold text-emerald-950 shadow-2xs'
                    : 'border-slate-200/80 bg-white/70 text-slate-700 hover:bg-white'
                }`}
              >
                <div>
                  <div className="text-xs font-bold">ADSSU Extension / College Satellite</div>
                  <div className="text-[11px] text-slate-500">Agusan del Sur Academic Satellite Grounds</div>
                </div>
                {campusPreference === 'main' && <Check className="w-4 h-4 text-[#00875A]" />}
              </div>
            </div>

            <button
              onClick={() => setShowCampusModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs cursor-pointer shadow-sm active:scale-98 transition-all"
            >
              Save Preference
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. HELP CENTER & FAQ MODAL                                                */}
      {/* ========================================================================= */}
      {showFaqModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-[28px] overflow-hidden shadow-2xl border border-white/80 p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-emerald-900/10 pb-3">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                <HelpCircle className="w-4 h-4 text-slate-600" />
                <span>ADSSU Student Housing Help Center</span>
              </div>
              <button
                onClick={() => setShowFaqModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 block text-xs">How do I verify if a boarding house is accredited?</strong>
                <p className="text-slate-600 leading-relaxed">
                  Every listed house in StayNest features the official <strong>LGU Verified</strong> green badge, confirming valid Mayor's Business Permits and BFP Fire Safety Inspection Certificates.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 block text-xs">Are there extra agent or booking fees?</strong>
                <p className="text-slate-600 leading-relaxed">
                  No! StayNest provides direct contact with registered homeowners in Bunawan with zero markup or hidden broker fees.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 block text-xs">Who do I contact for emergency housing issues?</strong>
                <p className="text-slate-600 leading-relaxed">
                  Contact ADSSU Student Affairs Office at <strong>sao@adssu.edu.ph</strong> or Bunawan Municipal Police / BFP Station.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowFaqModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#00875A] text-white font-bold text-xs cursor-pointer shadow-xs"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
