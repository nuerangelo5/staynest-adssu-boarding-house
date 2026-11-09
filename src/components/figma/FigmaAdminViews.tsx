import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Building,
  Camera,
  Check,
  CheckCircle2,
  ExternalLink,
  FileCheck2,
  FileText,
  Search,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  X,
  Eye,
  Calendar,
  MapPin,
  UserCheck,
  GraduationCap,
  Home,
  Flag,
  Clock,
  Layers,
  Award,
  Download,
  Phone,
  Printer,
  Sparkles,
  Image as ImageIcon,
  Crown,
  Wallet,
  Receipt,
  DollarSign,
} from 'lucide-react';
import { PropertyData, BookingTransaction } from './FigmaPropertyDetail';
import { LandlordSubscription, INITIAL_LANDLORD_BOOKINGS, INITIAL_LANDLORD_SUBSCRIPTION } from './FigmaLandlordViews';
import { StayNestEmblem } from './StayNestEmblem';

export interface LandlordVerificationItem {
  id: string;
  name: string;
  houseName: string;
  roomsCount: number;
  docsSubmitted: string;
  location: string;
  status: 'PENDING' | 'APPROVED' | 'NEEDS_FIX';
  permitNo: string;
  avatar: string;
  submissionDate?: string;
  email?: string;
  phone?: string;
  profilePhoto?: string;
  propertyPhotos?: string[];
  uploadedDocuments?: {
    title?: { name: string; previewUrl?: string };
    permit?: { name: string; previewUrl?: string };
    id?: { name: string; previewUrl?: string };
    fire?: { name: string; previewUrl?: string };
  };
}

export interface StudentVerificationItem {
  id: string;
  name: string;
  studentId: string;
  email: string;
  course: string;
  corFile: string;
  status: 'PENDING' | 'APPROVED' | 'NEEDS_FIX';
  submissionDate?: string;
  avatar: string;
  profilePhoto?: string;
  corPreviewUrl?: string;
}

export const INITIAL_VERIFICATIONS: LandlordVerificationItem[] = [
  {
    id: 'LL-2026-089',
    name: 'Jiomer Dalayap',
    houseName: 'Jiomer Dalayap Boarding House',
    roomsCount: 12,
    docsSubmitted: '4 Docs Submitted (Title, LGU Permit, PhilID, BFP Cert)',
    location: 'Purok 8, Poblacion, Bunawan, Agusan del Sur',
    status: 'APPROVED',
    permitNo: '2026-BNW-0491',
    avatar: 'JD',
    submissionDate: 'Oct 26, 2026 · 10:15 AM',
  },
  {
    id: 'LL-2026-090',
    name: 'Elizabeth Cabanillia',
    houseName: 'Cabanillia Boarding House',
    roomsCount: 8,
    docsSubmitted: 'Complete 4 LGU Requirements Verified (With Carinderia Clearance)',
    location: 'Toog Street, Poblacion, Bunawan, Agusan del Sur',
    status: 'APPROVED',
    permitNo: '2026-BNW-0492',
    avatar: 'EC',
    submissionDate: 'Oct 26, 2026 · 11:30 AM',
  },
  {
    id: 'LL-2026-091',
    name: 'Flordeliza Quintas',
    houseName: 'Flordeliza Quintas Boarding House',
    roomsCount: 10,
    docsSubmitted: '4 Docs Submitted (LGU Permit, PhilID, Sanitary, BFP Cert)',
    location: 'Purok 3, San Jose, Bunawan, Agusan del Sur',
    status: 'APPROVED',
    permitNo: '2026-BNW-0493',
    avatar: 'FQ',
    submissionDate: 'Oct 25, 2026 · 01:20 PM',
  },
  {
    id: 'LL-2026-092',
    name: 'Myrna Hiponia',
    houseName: "Hiponia's Boarding House",
    roomsCount: 9,
    docsSubmitted: 'Complete LGU Permit & Haus General Store Business License',
    location: 'Acacia Street, Poblacion, Bunawan, Agusan del Sur',
    status: 'APPROVED',
    permitNo: '2026-BNW-0494',
    avatar: 'MH',
    submissionDate: 'Oct 25, 2026 · 03:45 PM',
  },
  {
    id: 'LL-2026-093',
    name: 'Rhejie Largo',
    houseName: 'UNO Boarding House',
    roomsCount: 14,
    docsSubmitted: '4 LGU Compliance Docs (Mayor Permit, BFP Safety Cert, PhilSys ID, Land Title)',
    location: 'Purok 4, San Teodoro, Bunawan, Agusan del Sur (near bus terminal)',
    status: 'PENDING',
    permitNo: '2026-BNW-0495',
    avatar: 'RL',
    submissionDate: 'Oct 28, 2026 · 09:00 AM',
  },
];

export const INITIAL_STUDENT_VERIFICATIONS: StudentVerificationItem[] = [
  {
    id: 'STU-2026-101',
    name: 'Angelo Laureta Nuer',
    studentId: '2024-0192-B',
    email: 'anuer15@adssu.edu.ph',
    course: 'BSIT – Bachelor of Science in Information Technology (3rd Year)',
    corFile: 'ADSSU_COR_2026_AngeloNuer.pdf',
    status: 'APPROVED',
    submissionDate: 'Oct 27, 2026 · 11:45 AM',
    avatar: 'AN',
  },
  {
    id: 'STU-2026-102',
    name: 'Kean Ide',
    studentId: '2024-0311-A',
    email: 'kide@adssu.edu.ph',
    course: 'BSIT – Bachelor of Science in Information Technology (3rd Year)',
    corFile: 'ADSSU_COR_2026_KeanIde.pdf',
    status: 'PENDING',
    submissionDate: 'Oct 28, 2026 · 10:20 AM',
    avatar: 'KI',
  },
  {
    id: 'STU-2026-103',
    name: 'Conrado Candari',
    studentId: '2024-0245-B',
    email: 'ccandari@adssu.edu.ph',
    course: 'BSIT – Bachelor of Science in Information Technology (3rd Year)',
    corFile: 'ADSSU_COR_2026_ConradoCandari.pdf',
    status: 'PENDING',
    submissionDate: 'Oct 27, 2026 · 02:15 PM',
    avatar: 'CC',
  },
  {
    id: 'STU-2026-104',
    name: 'Jolina Asuncion',
    studentId: '2024-0188-C',
    email: 'jasuncion@adssu.edu.ph',
    course: 'BSIT – Bachelor of Science in Information Technology (3rd Year)',
    corFile: 'ADSSU_COR_2026_JolinaAsuncion.pdf',
    status: 'PENDING',
    submissionDate: 'Oct 26, 2026 · 04:30 PM',
    avatar: 'JA',
  },
  {
    id: 'STU-2026-105',
    name: 'Mary Joy Doroteo',
    studentId: '2024-0167-A',
    email: 'mdoroteo@adssu.edu.ph',
    course: 'BSIT – Bachelor of Science in Information Technology (3rd Year)',
    corFile: 'ADSSU_COR_2026_MaryJoyDoroteo.pdf',
    status: 'APPROVED',
    submissionDate: 'Oct 25, 2026 · 08:30 AM',
    avatar: 'MD',
  },
];

export interface FigmaAdminViewsProps {
  onLogout: () => void;
  verifications?: LandlordVerificationItem[];
  studentVerifications?: StudentVerificationItem[];
  onApprove?: (item: LandlordVerificationItem) => void;
  onApproveStudent?: (item: StudentVerificationItem) => void;
  onSendFixRequest?: (item: LandlordVerificationItem, flaggedDocs: string[], reason: string) => void;
  onSendStudentFixRequest?: (item: StudentVerificationItem, reason: string) => void;
  activeTab?: 'queue' | 'accredited' | 'payments';
  onTabChange?: (tab: 'queue' | 'accredited' | 'payments') => void;
  properties?: PropertyData[];
  bookings?: BookingTransaction[];
  onUpdateBookings?: (bookings: BookingTransaction[]) => void;
  subscriptions?: LandlordSubscription[];
  onUpdateSubscriptions?: (subs: LandlordSubscription[]) => void;
}

export const FigmaAdminViews: React.FC<FigmaAdminViewsProps> = ({
  onLogout,
  verifications: externalVerifications,
  studentVerifications: externalStudentVerifications,
  onApprove: externalOnApprove,
  onApproveStudent: externalOnApproveStudent,
  onSendFixRequest: externalOnSendFixRequest,
  onSendStudentFixRequest: externalOnSendStudentFixRequest,
  activeTab: externalActiveTab,
  onTabChange: externalOnTabChange,
  properties: externalProperties,
  bookings: externalBookings,
  onUpdateBookings: externalOnUpdateBookings,
  subscriptions: externalSubscriptions,
  onUpdateSubscriptions: externalOnUpdateSubscriptions,
}) => {
  const [internalVerifications, setInternalVerifications] =
    useState<LandlordVerificationItem[]>(INITIAL_VERIFICATIONS);
  const [internalStudentVerifications, setInternalStudentVerifications] =
    useState<StudentVerificationItem[]>(INITIAL_STUDENT_VERIFICATIONS);

  const verifications = externalVerifications || internalVerifications;
  const studentVerifications = externalStudentVerifications || internalStudentVerifications;

  // Bookings & Subscriptions State
  const [internalBookings, setInternalBookings] = useState<BookingTransaction[]>(INITIAL_LANDLORD_BOOKINGS);
  const bookings = externalBookings || internalBookings;
  const setBookings = externalOnUpdateBookings
    ? (action: React.SetStateAction<BookingTransaction[]>) => {
        if (typeof action === 'function') {
          externalOnUpdateBookings(action(bookings));
        } else {
          externalOnUpdateBookings(action);
        }
      }
    : setInternalBookings;

  const [internalSubscriptions, setInternalSubscriptions] = useState<LandlordSubscription[]>([
    INITIAL_LANDLORD_SUBSCRIPTION,
    {
      id: 'sub-2026-002',
      landlordId: '44444444-4444-4444-4444-444444444444',
      landlordName: 'Marites Plaza',
      houseName: 'San Jose Haven Boarding House',
      plan: 'MONTHLY_PRO',
      planName: 'Landlord Pro Monthly Plan',
      amount: 49,
      duration: '1 Month',
      status: 'PENDING_VERIFICATION',
      featuredListingsEnabled: false,
      gcashReferenceNo: '1004 9912 8841',
      receiptUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
      startDate: '2026-11-01',
      expiryDate: '2026-12-01',
    },
  ]);
  const subscriptions = externalSubscriptions || internalSubscriptions;
  const setSubscriptions = externalOnUpdateSubscriptions
    ? (action: React.SetStateAction<LandlordSubscription[]>) => {
        if (typeof action === 'function') {
          externalOnUpdateSubscriptions(action(subscriptions));
        } else {
          externalOnUpdateSubscriptions(action);
        }
      }
    : setInternalSubscriptions;

  const [queueSubTab, setQueueSubTab] = useState<'landlords' | 'students'>('landlords');
  const [paymentsSubTab, setPaymentsSubTab] = useState<'commissions' | 'subscriptions'>('commissions');

  const [internalTab, setInternalTab] = useState<'queue' | 'accredited' | 'payments'>('queue');
  const currentTab = externalActiveTab || internalTab;
  const setTab = externalOnTabChange || setInternalTab;

  const [selectedCertificateProp, setSelectedCertificateProp] = useState<PropertyData | null>(null);
  const [reviewItem, setReviewItem] = useState<LandlordVerificationItem | null>(null);
  const [fixModalItem, setFixModalItem] = useState<LandlordVerificationItem | null>(null);

  const [reviewStudentItem, setReviewStudentItem] = useState<StudentVerificationItem | null>(null);
  const [fixStudentModalItem, setFixStudentModalItem] = useState<StudentVerificationItem | null>(null);

  const [previewDocType, setPreviewDocType] = useState<
    'title' | 'permit' | 'id' | 'fire' | null
  >(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZoomPhoto, setSelectedZoomPhoto] = useState<string | null>(null);
  const [auditNotes, setAuditNotes] = useState(
    'All documents match LGU Bunawan municipal records. Property address verified by university liaison officer.'
  );
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [showCommissionLedgerModal, setShowCommissionLedgerModal] = useState(false);

  // Fix request form states
  const [flaggedDocs, setFlaggedDocs] = useState<string[]>([
    'LGU Bunawan Business Permit (Needs Fix)',
  ]);
  const [fixReason, setFixReason] = useState(
    'Uploaded LGU Business Permit image is blurry and date of validity is unreadable. Please upload a clear photo of your 2026 Mayor permit.'
  );
  const [studentFixReason, setStudentFixReason] = useState(
    'Attached COR document page 2 is missing official registrar dry seal or school seal. Please re-upload a clear copy.'
  );

  const handleApproveStudent = (item: StudentVerificationItem) => {
    if (externalOnApproveStudent) {
      externalOnApproveStudent(item);
    } else {
      setInternalStudentVerifications((prev) =>
        prev.map((v) => (v.id === item.id ? { ...v, status: 'APPROVED' } : v))
      );
    }
    setReviewStudentItem(null);
    setSuccessBanner(`Student Approved! ${item.name} (${item.studentId}) account officially accredited by ADSSU Admin.`);
    setTimeout(() => setSuccessBanner(null), 5000);
  };

  const handleSendStudentFixRequest = (item: StudentVerificationItem) => {
    if (externalOnSendStudentFixRequest) {
      externalOnSendStudentFixRequest(item, studentFixReason);
    } else {
      setInternalStudentVerifications((prev) =>
        prev.map((v) => (v.id === item.id ? { ...v, status: 'NEEDS_FIX' } : v))
      );
    }
    setFixStudentModalItem(null);
    setReviewStudentItem(null);
    setSuccessBanner(`Revision Request Sent: Email notification dispatched to ${item.name}.`);
    setTimeout(() => setSuccessBanner(null), 5000);
  };

  const pendingCount = verifications.filter((v) => v.status === 'PENDING').length;
  const approvedCount = verifications.filter((v) => v.status === 'APPROVED').length;
  const needsFixCount = verifications.filter((v) => v.status === 'NEEDS_FIX').length;

  const handleApprove = (item: LandlordVerificationItem) => {
    if (externalOnApprove) {
      externalOnApprove(item);
    } else {
      setInternalVerifications((prev) =>
        prev.map((v) => (v.id === item.id ? { ...v, status: 'APPROVED' } : v))
      );
    }
    setReviewItem(null);
    setPreviewDocType(null);
    setSuccessBanner(`Approved! ${item.houseName} granted official LGU Verified badge.`);
    setTimeout(() => setSuccessBanner(null), 5000);
  };

  const handleSendFixRequest = (item: LandlordVerificationItem) => {
    if (externalOnSendFixRequest) {
      externalOnSendFixRequest(item, flaggedDocs, fixReason);
    } else {
      setInternalVerifications((prev) =>
        prev.map((v) => (v.id === item.id ? { ...v, status: 'NEEDS_FIX' } : v))
      );
    }
    setFixModalItem(null);
    setReviewItem(null);
    setPreviewDocType(null);
    setSuccessBanner(`Fix Request Dispatched: SMS alert sent to ${item.name}.`);
    setTimeout(() => setSuccessBanner(null), 5000);
  };

  const filteredVerifications = verifications.filter(
    (v) =>
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.houseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.permitNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full h-full min-h-[720px] staynest-bg flex flex-col justify-between select-none font-sans overflow-y-auto">
      {/* Ambient Liquid Glass Floating Glow Orbs */}
      <div className="absolute top-20 left-10 w-80 h-80 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

      {/* 1. ADMIN CONTROL STRIP - CLEAN LIQUID GLASS (NO DUPLICATE LOGO / SIGN OUT) */}
      <div className="bg-gradient-to-r from-[#053728] via-[#094735] to-[#04281e] text-white px-5 sm:px-8 pt-6 pb-7 rounded-b-[32px] shadow-xl border-b border-emerald-400/20 relative overflow-hidden backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-extrabold text-[10px] tracking-wide uppercase border border-emerald-400/30">
                Bunawan LGU & ADSSU Official Oversight
              </span>
              <span className="text-xs text-emerald-200/90 font-medium">AY 2026–2027 Inspection Desk</span>
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white mt-1 leading-tight tracking-tight">
              Accreditation & Document Verification Queue
            </h2>
            <p className="text-xs text-emerald-100/80 mt-0.5">
              Review and authenticate boarding house photos, legal LGU compliance permits, and ADSSU student certificates.
            </p>
          </div>

          {/* Quick Counter Badges */}
          <div className="flex items-center gap-2">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
              <span className="text-[10px] uppercase font-bold text-emerald-300 block">Accredited Houses</span>
              <span className="text-sm font-extrabold text-white">{(externalProperties || []).length || 6} Verified</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-amber-400/15 backdrop-blur-md border border-amber-400/30 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">Pending Reviews</span>
              <span className="text-sm font-extrabold text-amber-200">{pendingCount} Landlords</span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl">
          <Search className="w-4 h-4 text-emerald-200 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search landlord name, permit # (e.g. 2026-BNW-0491), student ID (M-00000), or boarding house..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-emerald-300 text-xs sm:text-sm text-white placeholder:text-emerald-200/70 focus:outline-none transition-all shadow-inner backdrop-blur-md"
          />
        </div>

        {/* 3 Main Admin Navigation Tabs (Queue, Accredited, 5% Commission & Payments) */}
        <div className="flex items-center gap-2 pt-4 flex-wrap">
          <button
            type="button"
            onClick={() => setTab('queue')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              currentTab === 'queue'
                ? 'bg-white text-[#053728] shadow-md'
                : 'bg-white/10 text-emerald-100 hover:bg-white/20'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Document Verification Queue</span>
            {pendingCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setTab('accredited')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              currentTab === 'accredited'
                ? 'bg-white text-[#053728] shadow-md'
                : 'bg-white/10 text-emerald-100 hover:bg-white/20'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Accredited Houses ({(externalProperties || []).length || 6})</span>
          </button>

          <button
            type="button"
            onClick={() => setTab('payments')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              currentTab === 'payments'
                ? 'bg-[#E5A93C] text-slate-900 font-extrabold shadow-md'
                : 'bg-white/10 text-amber-200 hover:bg-white/20'
            }`}
          >
            <Receipt className="w-3.5 h-3.5 text-amber-300" />
            <span>5% Commission & Payments Ledger</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          </button>
        </div>
      </div>

      {/* 2. MAIN CONTENT BODY */}
      <div className="p-4 sm:p-8 flex-1 space-y-6">
        {/* Dynamic Success / Action Notification Banner */}
        {successBanner && (
          <div
            className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2 duration-200 ${
              successBanner.includes('Approved')
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {successBanner.includes('Approved') ? (
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              )}
              <span>{successBanner}</span>
            </div>
            <button
              onClick={() => setSuccessBanner(null)}
              className="text-slate-500 hover:text-slate-800 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {currentTab === 'queue' ? (
          <>
            {/* SYSTEM METRICS CARDS */}
            <div>
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              ADSSU BUNAWAN HOUSING METRICS
            </span>
            <span className="text-[11px] text-emerald-800 font-semibold">
              Live Municipal Sync • Academic Year 2026–2027
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-3xl liquid-glass-card shadow-md flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 uppercase font-bold block mb-1">
                  HOUSES
                </span>
                <span className="text-2xl font-bold text-[#00875A] block leading-tight">
                  {14 + approvedCount - 1}
                </span>
                <span className="text-xs text-[#00875A] font-semibold flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> LGU Verified
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-50/80 text-[#00875A] flex items-center justify-center border border-emerald-200 shadow-inner">
                <Home className="w-6 h-6 text-[#00875A]" />
              </div>
            </div>

            <div className="p-4 rounded-3xl liquid-glass-card shadow-md flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 uppercase font-bold block mb-1">
                  STUDENTS
                </span>
                <span className="text-2xl font-bold text-blue-600 block leading-tight">342</span>
                <span className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-1">
                  <UserCheck className="w-3.5 h-3.5 text-blue-600" /> ADSSU Bunawan
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50/80 text-blue-600 flex items-center justify-center border border-blue-200 shadow-inner">
                <GraduationCap className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            <div
              className={`p-4 rounded-3xl shadow-md flex items-center justify-between ${
                pendingCount > 0 ? 'bg-amber-50/90 border-2 border-amber-300' : 'liquid-glass-card'
              }`}
            >
              <div>
                <span className="text-xs text-amber-900 uppercase font-bold block mb-1">
                  PENDING REVIEW
                </span>
                <span className="text-2xl font-bold text-amber-700 block leading-tight">
                  {pendingCount}
                </span>
                <span className="text-xs text-amber-800 font-semibold flex items-center gap-1 mt-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Requires LGU Approval
                </span>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-300 shadow-inner">
                <Clock className="w-6 h-6 text-amber-700" />
              </div>
            </div>
          </div>

          {/* Enhanced StayNest Platform Commission & Municipal Revenue Oversight Card */}
          <div className="p-5 sm:p-6 rounded-3xl liquid-glass-dark text-white border-2 border-amber-400/50 shadow-2xl flex flex-col justify-between gap-5 mt-4 backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-40 h-40 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] tracking-wide uppercase border border-emerald-400/30">
                    Municipal Revenue & Housing Oversight
                  </span>
                  <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                    StayNest 5% Platform Commission Ledger
                  </span>
                </div>
                <p className="text-xs text-emerald-100/90 max-w-xl">
                  Official municipal housing commission collected automatically on verified booking transactions.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowCommissionLedgerModal(true)}
                  className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400/20 to-amber-500/20 hover:from-amber-400/30 hover:to-amber-500/30 border border-amber-400/70 text-amber-200 hover:text-white text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md active:scale-95 group"
                >
                  <FileText className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                  <span>Inspect 23-Booking Ledger</span>
                </button>
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border-2 border-amber-400/60 text-amber-300 flex items-center justify-center font-bold text-2xl shadow-inner shrink-0">
                  ₱
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-emerald-500/30 relative z-10">
              <div>
                <span className="text-[10px] text-emerald-200 uppercase block font-semibold">Total Rent Volume</span>
                <span className="text-lg sm:text-2xl font-extrabold text-white">₱34,500.00</span>
                <span className="text-[9px] text-emerald-300/80 block mt-0.5">23 bookings processed</span>
              </div>
              <div>
                <span className="text-[10px] text-amber-300 uppercase block font-semibold">5% Platform Commission</span>
                <span className="text-lg sm:text-2xl font-extrabold text-amber-300">₱1,725.00</span>
                <span className="text-[9px] text-amber-200/80 block mt-0.5">Retained platform yield</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-200 uppercase block font-semibold">Landlord Net Payout</span>
                <span className="text-lg sm:text-xl font-bold text-emerald-100">₱32,775.00</span>
                <span className="text-[9px] text-emerald-300/80 block mt-0.5">100% disbursed to owners</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-200 uppercase block font-semibold">Projected Monthly Yield</span>
                <span className="text-lg sm:text-xl font-bold text-emerald-300">₱12,500.00 / mo</span>
                <span className="text-[9px] text-emerald-300/80 block mt-0.5">From 14 verified houses</span>
              </div>
            </div>
          </div>
        </div>

        {/* PENDING APPROVAL QUEUE (LANDLORDS & STUDENTS) */}
        <div className="space-y-4">
          {/* Sub-tab Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1 border-b border-slate-200/80 pb-3 mt-2">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setQueueSubTab('landlords')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  queueSubTab === 'landlords'
                    ? 'bg-[#00875A] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Building className="w-4 h-4" />
                <span>Landlord LGU Accreditation ({filteredVerifications.length})</span>
                {pendingCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setQueueSubTab('students')}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  queueSubTab === 'students'
                    ? 'bg-[#00875A] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student ADSSU COR Queue ({studentVerifications.length})</span>
                {studentVerifications.filter((s) => s.status === 'PENDING').length > 0 && (
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping inline-block" />
                )}
              </button>
            </div>

            <div className="mt-1 sm:mt-0">
              <span className="text-xs text-slate-500 font-medium block sm:text-right">
                {queueSubTab === 'landlords'
                  ? 'Inspecting Mayor Permits, Ownership Title & BFP Fire Safety'
                  : 'Inspecting ADSSU Student IDs & Certificate of Registration (COR)'}
              </span>
            </div>
          </div>

          {queueSubTab === 'landlords' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-full">
              {filteredVerifications.map((item) => (
                <div
                  key={item.id}
                  className={`w-full max-w-full p-4 sm:p-5 rounded-3xl liquid-glass-card border transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4 ${
                    item.status === 'NEEDS_FIX'
                      ? 'border-rose-300'
                      : item.status === 'APPROVED'
                      ? 'border-emerald-300'
                      : 'border-white/80'
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    {item.profilePhoto ? (
                      <img
                        src={item.profilePhoto}
                        alt={item.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-emerald-300 shadow-2xs shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0 border border-emerald-200 shadow-2xs">
                        {item.avatar}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{item.name}</h4>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 flex items-center gap-1 ${
                            item.status === 'APPROVED'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : item.status === 'NEEDS_FIX'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {item.status === 'PENDING' ? (
                            <>
                              <Clock className="w-3 h-3 text-amber-700 shrink-0" />
                              <span>PENDING</span>
                            </>
                          ) : (
                            item.status
                          )}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 font-semibold mt-0.5 break-words">
                        {item.houseName} · <span className="font-normal text-slate-500">{item.roomsCount} Rooms</span>
                      </p>
                      <p className="text-[11px] text-slate-500 mt-1 flex items-start gap-1 min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                        <span className="break-words">{item.location}</span>
                      </p>
                      <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-medium max-w-full">
                        <FileText className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{item.docsSubmitted}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-2 border-t border-slate-100">
                    {item.status === 'PENDING' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setReviewItem(item);
                            setPreviewDocType(null);
                          }}
                          className="flex-1 py-2.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs shadow-xs active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>Review & Verify</span>
                        </button>
                        <button
                          onClick={() => setFixModalItem(item)}
                          className="flex-1 py-2.5 rounded-xl border border-rose-300 text-rose-600 bg-rose-50/60 hover:bg-rose-100 font-bold text-xs active:scale-98 transition-all cursor-pointer"
                        >
                          Reject / Request Fix
                        </button>
                      </div>
                    ) : item.status === 'NEEDS_FIX' ? (
                      <div className="p-2.5 rounded-xl bg-amber-50 text-xs text-amber-900 font-semibold flex items-center justify-between border border-amber-200">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-700" />
                          <span>Awaiting Landlord Re-upload (SMS Notification Sent)</span>
                        </span>
                        <button
                          onClick={() => setReviewItem(item)}
                          className="text-xs font-bold text-amber-800 underline hover:text-amber-950"
                        >
                          View
                        </button>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-emerald-50 text-xs text-emerald-900 font-semibold flex items-center justify-between border border-emerald-200">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                          <span>Verified Partner · Official LGU Verified Badge Active</span>
                        </span>
                        <button
                          onClick={() => setReviewItem(item)}
                          className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
                        >
                          Details
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-full">
              {studentVerifications
                .filter(
                  (s) =>
                    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    s.email.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((student) => (
                  <div
                    key={student.id}
                    className={`w-full max-w-full p-4 sm:p-5 rounded-3xl liquid-glass-card border transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between space-y-4 ${
                      student.status === 'NEEDS_FIX'
                        ? 'border-rose-300'
                        : student.status === 'APPROVED'
                        ? 'border-emerald-300'
                        : 'border-white/80'
                    }`}
                  >
                    <div className="flex items-start gap-3.5 min-w-0">
                      {student.profilePhoto ? (
                        <img
                          src={student.profilePhoto}
                          alt={student.name}
                          className="w-12 h-12 rounded-2xl object-cover border border-blue-300 shadow-2xs shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 font-bold text-sm flex items-center justify-center shrink-0 border border-blue-200 shadow-2xs">
                          {student.avatar}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-sm font-bold text-slate-900 truncate">{student.name}</h4>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 flex items-center gap-1 ${
                              student.status === 'APPROVED'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : student.status === 'NEEDS_FIX'
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : 'bg-blue-100 text-blue-800 border border-blue-300'
                            }`}
                          >
                            {student.status === 'PENDING' ? (
                              <>
                                <Clock className="w-3 h-3 text-blue-700 shrink-0" />
                                <span>PENDING ADSSU</span>
                              </>
                            ) : (
                              student.status
                            )}
                          </span>
                        </div>
                        <p className="text-xs text-[#00875A] font-bold mt-0.5 flex items-center gap-1 min-w-0">
                          <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">Student ID: {student.studentId}</span>
                        </p>
                        <p className="text-[11px] text-slate-600 mt-1 break-words">{student.course}</p>
                        <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-700 font-medium max-w-full">
                          <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{student.corFile}</span>
                        </div>
                      </div>
                    </div>

                    {/* Student Card Actions */}
                    <div className="pt-2 border-t border-slate-100">
                      {student.status === 'PENDING' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setReviewStudentItem(student)}
                            className="flex-1 py-2.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs shadow-xs active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            <span>Review COR & Accept</span>
                          </button>
                          <button
                            onClick={() => setFixStudentModalItem(student)}
                            className="flex-1 py-2.5 rounded-xl border border-rose-300 text-rose-600 bg-rose-50/60 hover:bg-rose-100 font-bold text-xs active:scale-98 transition-all cursor-pointer"
                          >
                            Reject / Request COR
                          </button>
                        </div>
                      ) : student.status === 'NEEDS_FIX' ? (
                        <div className="p-2.5 rounded-xl bg-amber-50 text-xs text-amber-900 font-semibold flex items-center justify-between border border-amber-200">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-amber-700" />
                            <span>Awaiting Student COR Re-upload</span>
                          </span>
                          <button
                            onClick={() => setReviewStudentItem(student)}
                            className="text-xs font-bold text-amber-800 underline hover:text-amber-950"
                          >
                            View
                          </button>
                        </div>
                      ) : (
                        <div className="p-2.5 rounded-xl bg-emerald-50 text-xs text-emerald-900 font-semibold flex items-center justify-between border border-emerald-200">
                          <span className="flex items-center gap-1.5">
                            <UserCheck className="w-4 h-4 text-emerald-700" />
                            <span>Accredited ADSSU Student Account</span>
                          </span>
                          <button
                            onClick={() => setReviewStudentItem(student)}
                            className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950"
                          >
                            Details
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* RECENT SYSTEM AUDIT LOG */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block px-1">
            RECENT SYSTEM & ACCREDITATION AUDIT LOG
          </span>
          <div className="rounded-3xl liquid-glass-card overflow-hidden divide-y divide-slate-100/60 shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#00875A] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#00875A]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Jolina's Boarding House Approved
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Verified by Admin & LGU Inspector • 2 hours ago
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Permit BNW-0388
              </span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    Fritzcel Boarding House (Conrado Candari) Submitted 4 Documents
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Awaiting admin sign-off • Purok 3 San Jose
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                In Review
              </span>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <Flag className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 block">
                    1 Flagged Student Review Resolved
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Reported by Landlord Conrado • Mediated by ADSSU Student Affairs
                  </span>
                </div>
              </div>
              <span className="text-[11px] font-bold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                Closed
              </span>
            </div>
          </div>
        </div>
      </>
    ) : currentTab === 'accredited' ? (
      /* ========================================================================= */
      /* ACCREDITED HOUSES TAB & EDUCATIONAL GUIDE                                */
      /* ========================================================================= */
      <div className="space-y-6">
        {/* EDUCATIONAL BANNER: What is an Accredited Boarding House? */}
        <div className="rounded-3xl bg-gradient-to-br from-[#053728] via-[#084A37] to-[#04281D] text-white p-6 sm:p-8 shadow-xl border border-emerald-600/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-500/50 text-xs font-bold text-emerald-200">
              <Award className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>Official Joint Mandate · LGU Bunawan & ADSSU Campus</span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#EAA938] leading-tight">
                What is an Accredited Boarding House?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-3xl leading-relaxed">
                An <strong>Accredited Boarding House</strong> is a legally registered and officially inspected accommodation facility by the joint inspection team of the <strong>Municipality of Bunawan</strong> (Mayor's Office, BFP Fire Marshal, Municipal Health) alongside the <strong>Agusan del Sur State University (ADSSU) Student Housing & Welfare Board</strong>.
              </p>
            </div>

            {/* The 4 Pillars of Accreditation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1">
                <span className="text-[11px] font-bold text-[#E5A93C] flex items-center gap-1.5 uppercase tracking-wide">
                  <FileCheck2 className="w-4 h-4 text-[#E5A93C]" /> LGU Business Permit
                </span>
                <p className="text-xs text-slate-100 font-semibold">
                  Legally licensed by the Municipality of Bunawan with verified Sanitary & Health inspection clearances.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1">
                <span className="text-[11px] font-bold text-[#E5A93C] flex items-center gap-1.5 uppercase tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-[#E5A93C]" /> BFP Fire Safety
                </span>
                <p className="text-xs text-slate-100 font-semibold">
                  Equipped with certified Fire Extinguishers, clear emergency exits, and safe electrical wiring.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1">
                <span className="text-[11px] font-bold text-[#E5A93C] flex items-center gap-1.5 uppercase tracking-wide">
                  <GraduationCap className="w-4 h-4 text-[#E5A93C]" /> ADSSU Student Cap
                </span>
                <p className="text-xs text-slate-100 font-semibold">
                  Affordable rates (₱1,000–₱2,500/mo), zero hidden broker markups, and enforced 10 PM curfew protection.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs space-y-1">
                <span className="text-[11px] font-bold text-[#E5A93C] flex items-center gap-1.5 uppercase tracking-wide">
                  <CheckCircle2 className="w-4 h-4 text-[#E5A93C]" /> Flood & Safety Inspected
                </span>
                <p className="text-xs text-slate-100 font-semibold">
                  Elevated ground inspection verified in San Jose and San Teodoro to protect students from floods.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LIST OF ACCREDITED HOUSES (5 PARTNERS) */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 px-1">
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Certified Boarding Houses ({(externalProperties || []).length || 5} Partners)
              </h4>
              <p className="text-xs text-slate-500">
                Official list for ADSSU Academic Year 2026–2027. Click any card to inspect legal credentials or view certificate.
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>100% Passed Joint LGU Inspection</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {((externalProperties && externalProperties.length > 0)
              ? externalProperties
              : [
                  {
                    id: 'bh-fritzcel',
                    name: 'Fritzcel Boarding House',
                    price: '₱1,000',
                    priceNum: 1000,
                    location: 'Purok 3, San Jose, Bunawan, Agusan del Sur',
                    distance: '0.5 km',
                    walkTime: '6 min walk',
                    rating: 4.8,
                    reviewsCount: 12,
                    image:
                      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
                    ownerName: 'Conrado Candari',
                    ownerRole: 'Boarding House Owner / Landlord',
                    ownerAvatar: 'CC',
                    replyTime: 'Replies within 15 mins',
                    phone: '+63 912 345 6789',
                    highlights: [
                      { label: '24/7 Water', icon: '', bg: '#DCFCE7', text: '#15803D' },
                      { label: 'Low Flood Zone', icon: '', bg: '#DCFCE7', text: '#15803D' },
                      { label: '24/7 CCTV', icon: '', bg: '#F1F5F9', text: '#475569' },
                      { label: 'Free Wi-Fi', icon: '', bg: '#E0F2FE', text: '#0284C7' },
                    ],
                  },
                  {
                    id: 'bh-sanjose',
                    name: 'San Jose Haven Boarding House',
                    price: '₱1,850',
                    priceNum: 1850,
                    location: 'Purok 4, Poblacion, Bunawan, Agusan del Sur',
                    distance: '1.4 km',
                    walkTime: '16 min walk',
                    rating: 4.9,
                    reviewsCount: 18,
                    image:
                      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
                    ownerName: 'Marites Plaza',
                    ownerRole: 'Resident Landlord',
                    ownerAvatar: 'MP',
                    replyTime: 'Replies within 10 mins',
                    phone: '+63 918 765 4321',
                    highlights: [
                      { label: 'Free Wi-Fi', icon: '', bg: '#E0F2FE', text: '#0284C7' },
                      { label: 'Aircon / Fan', icon: '', bg: '#FEF3C7', text: '#B45309' },
                      { label: 'Low Flood', icon: '', bg: '#DCFCE7', text: '#15803D' },
                    ],
                  },
                  {
                    id: 'bh-jolina',
                    name: "Jolina's Boarding House",
                    price: '₱900',
                    priceNum: 900,
                    location: 'Purok 3, San Jose, Bunawan, Agusan del Sur',
                    distance: '0.8 km',
                    walkTime: '9 min walk',
                    rating: 4.7,
                    reviewsCount: 9,
                    image:
                      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
                    ownerName: 'Jolina Asuncion',
                    ownerRole: 'Accredited Operator',
                    ownerAvatar: 'JA',
                    replyTime: 'Replies within 1 hr',
                    phone: '+63 920 111 2233',
                    highlights: [
                      { label: 'Free Wi-Fi', icon: '', bg: '#E0F2FE', text: '#0284C7' },
                      { label: 'Scheduled Water', icon: '', bg: '#FEF9C3', text: '#854D0E' },
                      { label: 'Cooking Allowed', icon: '', bg: '#DCFCE7', text: '#15803D' },
                    ],
                  },
                  {
                    id: 'bh-greenhaven',
                    name: 'Green Haven Student Residences',
                    price: '₱1,100',
                    priceNum: 1100,
                    location: 'Purok 1, San Teodoro, Bunawan, Agusan del Sur',
                    distance: '1.2 km',
                    walkTime: '14 min walk',
                    rating: 4.6,
                    reviewsCount: 14,
                    image:
                      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80',
                    ownerName: 'Dionisio Fernandez',
                    ownerRole: 'Proprietor',
                    ownerAvatar: 'DF',
                    replyTime: 'Replies within 30 mins',
                    phone: '+63 922 888 9900',
                    highlights: [
                      { label: 'Free Wi-Fi', icon: '', bg: '#E0F2FE', text: '#0284C7' },
                      { label: 'Study Lounge', icon: '', bg: '#F1F5F9', text: '#475569' },
                      { label: '24/7 Water', icon: '', bg: '#DCFCE7', text: '#15803D' },
                    ],
                  },
                  {
                    id: 'bh-sunrise',
                    name: 'Sunrise Villa Student Dormitory',
                    price: '₱2,200',
                    priceNum: 2200,
                    location: 'Purok 2, Poblacion, Bunawan, Agusan del Sur',
                    distance: '0.3 km',
                    walkTime: '3 min walk',
                    rating: 4.95,
                    reviewsCount: 22,
                    image:
                      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80',
                    ownerName: 'Esther Morales',
                    ownerRole: 'Host & Manager',
                    ownerAvatar: 'EM',
                    replyTime: 'Replies instantly',
                    phone: '+63 919 444 3322',
                    highlights: [
                      { label: 'Aircon Rooms', icon: '', bg: '#DCFCE7', text: '#15803D' },
                      { label: 'Own CR', icon: '', bg: '#E0F2FE', text: '#0284C7' },
                      { label: 'Free Wi-Fi', icon: '', bg: '#F1F5F9', text: '#475569' },
                    ],
                  },
                ]
            ).map((house: any, idx: number) => {
              const permitCode = `2026-BNW-${(490 + idx * 22).toString()}`;
              return (
                <div
                  key={house.id}
                  className="rounded-3xl liquid-glass-card overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex flex-col sm:flex-row gap-4 p-4">
                    <img
                      src={house.image}
                      alt={house.name}
                      className="w-full sm:w-36 h-28 object-cover rounded-2xl shrink-0 border border-slate-100"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                          <span>LGU Accredited</span>
                        </span>
                        <span className="text-[10px] font-bold text-slate-500">
                          {house.distance} · {house.walkTime}
                        </span>
                      </div>

                      <h5 className="font-bold text-slate-900 text-sm truncate">{house.name}</h5>
                      <p className="text-xs text-slate-600 font-medium">
                        Landlord: <span className="font-bold text-slate-800">{house.ownerName}</span>
                      </p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{house.location}</span>
                      </p>

                      <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px]">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono text-[10px]">
                          Permit #{permitCode}
                        </span>
                        <span className="font-bold text-[#00875A]">{house.price}/month</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-500 font-medium">
                      Valid for AY 2026–2027
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCertificateProp(house)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5 text-[#E5A93C]" />
                        <span>View Official Certificate</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    ) : (
      /* ========================================================================= */
      /* 5% COMMISSION & PAYMENTS VERIFICATION TABLE                               */
      /* ========================================================================= */
      <div className="space-y-6">
        {/* Metric Cards Header */}
        {(() => {
          const totalGross = bookings.reduce((a, b) => a + b.monthlyRent, 0);
          const totalCommission = bookings.reduce((a, b) => a + b.platformCommission, 0);
          const totalClearedPayout = bookings
            .filter((b) => b.paymentStatus === 'CLEARED' || b.paymentStatus === 'REMITTED')
            .reduce((a, b) => a + b.landlordPayout, 0);
          const totalSubscriptionsRevenue = subscriptions.reduce((a, s) => a + s.amount, 0);

          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl liquid-glass-card border border-emerald-500/40 shadow-sm space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Total Managed Gross Rent
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#053728]">
                  ₱{totalGross.toLocaleString()}.00
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {bookings.length} student bookings processed
                </span>
              </div>

              <div className="p-4 rounded-2xl liquid-glass-card border border-amber-500/40 shadow-sm space-y-1 bg-amber-50/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                  Retained 5% Platform Yield
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#E5A93C]">
                  ₱{totalCommission.toLocaleString()}.00
                </span>
                <span className="text-[11px] text-amber-900 font-medium block">
                  Municipal oversight & server upkeep
                </span>
              </div>

              <div className="p-4 rounded-2xl liquid-glass-card border border-emerald-500/60 shadow-sm space-y-1 bg-emerald-50/50">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#00875A] block">
                  Landlord Payouts Remitted
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#00875A]">
                  ₱{totalClearedPayout.toLocaleString()}.00
                </span>
                <span className="text-[11px] text-emerald-700 block">
                  95% net rent dispatched to owners
                </span>
              </div>

              <div className="p-4 rounded-2xl liquid-glass-card border border-purple-300 shadow-sm space-y-1 bg-purple-50/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
                  Landlord Subscriptions
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-purple-900">
                  ₱{totalSubscriptionsRevenue.toLocaleString()}.00
                </span>
                <span className="text-[11px] text-purple-800 block">
                  {subscriptions.length} active premium & featured tiers
                </span>
              </div>
            </div>
          );
        })()}

        {/* Verification Sub-Tabs: Commissions vs Subscriptions */}
        <div className="p-5 sm:p-6 rounded-[32px] liquid-glass border-2 border-white/90 shadow-2xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#053728] font-serif italic tracking-wide flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#00875A]" />
                <span>Admin Financial Verification & Remittance Desk</span>
              </h3>
              <p className="text-xs text-slate-600">
                Review and approve student 5% reservation transactions and landlord GCash subscriptions
              </p>
            </div>

            {/* Toggle Sub-Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-300">
              <button
                type="button"
                onClick={() => setPaymentsSubTab('commissions')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  paymentsSubTab === 'commissions'
                    ? 'bg-[#00875A] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>5% Bookings ({bookings.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentsSubTab('subscriptions')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  paymentsSubTab === 'subscriptions'
                    ? 'bg-[#00875A] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-amber-300" />
                <span>Subscriptions ({subscriptions.length})</span>
              </button>
            </div>
          </div>

          {/* TAB 1: 5% COMMISSION BOOKINGS VERIFICATION TABLE */}
          {paymentsSubTab === 'commissions' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                      <th className="pb-3 px-3">Transaction</th>
                      <th className="pb-3 px-3">Student Tenant</th>
                      <th className="pb-3 px-3">Boarding House</th>
                      <th className="pb-3 px-3 text-right">Rent</th>
                      <th className="pb-3 px-3 text-right">5% Fee</th>
                      <th className="pb-3 px-3 text-right">Net Payout</th>
                      <th className="pb-3 px-3 text-center">Status</th>
                      <th className="pb-3 px-3 text-center">Admin Verification Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-emerald-50/40 transition-colors">
                        <td className="py-3.5 px-3">
                          <span className="font-mono text-[11px] font-bold text-slate-900 block">
                            {b.transactionCode}
                          </span>
                          <span className="text-[10px] text-slate-400">{b.createdDate}</span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-slate-900 block">{b.studentName}</span>
                          <span className="text-[10px] font-mono text-emerald-700">{b.studentId}</span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="font-medium text-slate-800 block truncate max-w-[170px]">
                            {b.houseName}
                          </span>
                          <span className="text-[10px] text-slate-500">Landlord {b.landlordName}</span>
                        </td>
                        <td className="py-3.5 px-3 text-right font-semibold text-slate-900">
                          ₱{b.monthlyRent.toLocaleString()}.00
                        </td>
                        <td className="py-3.5 px-3 text-right font-bold text-amber-700">
                          + ₱{b.platformCommission.toLocaleString()}.00
                        </td>
                        <td className="py-3.5 px-3 text-right font-extrabold text-[#00875A]">
                          ₱{b.landlordPayout.toLocaleString()}.00
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                              b.paymentStatus === 'CLEARED'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : b.paymentStatus === 'REMITTED'
                                ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}
                          >
                            {b.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          {b.paymentStatus === 'PENDING' ? (
                            <button
                              type="button"
                              onClick={() => {
                                setBookings((prev) =>
                                  prev.map((item) =>
                                    item.id === b.id ? { ...item, paymentStatus: 'CLEARED' } : item
                                  )
                                );
                                setSuccessBanner(`Verified & Cleared: Payout for ${b.studentName} (${b.transactionCode}) approved.`);
                                setTimeout(() => setSuccessBanner(null), 4000);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-[11px] font-bold shadow-xs cursor-pointer active:scale-95 transition-all"
                            >
                              Verify & Clear Payout
                            </button>
                          ) : b.paymentStatus === 'CLEARED' ? (
                            <button
                              type="button"
                              onClick={() => {
                                setBookings((prev) =>
                                  prev.map((item) =>
                                    item.id === b.id ? { ...item, paymentStatus: 'REMITTED' } : item
                                  )
                                );
                                setSuccessBanner(`Remittance Recorded: Net ₱${b.landlordPayout.toLocaleString()} marked as remitted to Landlord ${b.landlordName}.`);
                                setTimeout(() => setSuccessBanner(null), 4000);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold shadow-xs cursor-pointer active:scale-95 transition-all"
                            >
                              Mark Remitted to Landlord
                            </button>
                          ) : (
                            <span className="text-[11px] text-slate-500 font-semibold flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                              <span>Remitted via GCash</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: LANDLORD GCASH SUBSCRIPTIONS TABLE */}
          {paymentsSubTab === 'subscriptions' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                      <th className="pb-3 px-3">Subscription</th>
                      <th className="pb-3 px-3">Landlord & House</th>
                      <th className="pb-3 px-3">Tier Plan</th>
                      <th className="pb-3 px-3 text-right">Fee Paid</th>
                      <th className="pb-3 px-3">GCash Reference No.</th>
                      <th className="pb-3 px-3 text-center">Receipt Proof</th>
                      <th className="pb-3 px-3 text-center">Status</th>
                      <th className="pb-3 px-3 text-center">Verification Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {subscriptions.map((s) => (
                      <tr key={s.id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="py-3.5 px-3">
                          <span className="font-mono text-[11px] font-bold text-slate-900 block">
                            {s.id}
                          </span>
                          <span className="text-[10px] text-slate-400">Exp: {s.expiryDate}</span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-slate-900 block">{s.landlordName}</span>
                          <span className="text-[11px] text-emerald-800 font-medium">{s.houseName}</span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-amber-950 block flex items-center gap-1">
                            <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                            <span>{s.planName}</span>
                          </span>
                          <span className="text-[10px] text-slate-500">{s.duration} Duration</span>
                        </td>
                        <td className="py-3.5 px-3 text-right font-bold text-slate-900">
                          ₱{s.amount}.00
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            {s.gcashReferenceNo}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          {s.receiptUrl ? (
                            <button
                              type="button"
                              onClick={() => setSelectedZoomPhoto(s.receiptUrl!)}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3 h-3 text-[#00875A]" />
                              <span>View Proof</span>
                            </button>
                          ) : (
                            <span className="text-slate-400 text-[10px]">No image</span>
                          )}
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                              s.status === 'ACTIVE'
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}
                          >
                            {s.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-center">
                          {s.status === 'PENDING_VERIFICATION' ? (
                            <button
                              type="button"
                              onClick={() => {
                                setSubscriptions((prev) =>
                                  prev.map((item) =>
                                    item.id === s.id ? { ...item, status: 'ACTIVE', featuredListingsEnabled: true } : item
                                  )
                                );
                                setSuccessBanner(`GCash Reference Verified! ${s.landlordName}'s subscription activated.`);
                                setTimeout(() => setSuccessBanner(null), 4000);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-[11px] font-bold shadow-xs cursor-pointer active:scale-95 transition-all"
                            >
                              Verify & Activate
                            </button>
                          ) : (
                            <span className="text-[11px] text-emerald-800 font-semibold flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#00875A]" />
                              <span>Active & Compliant</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>

      {/* --- MODAL 1: VERIFICATION REVIEW (Matches Figma Screenshot 004424 / 004703) --- */}
      {reviewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans my-auto border border-slate-200 animate-in fade-in zoom-in-95 duration-200 max-h-[92vh]">
            {/* Modal Header */}
            <div className="bg-[#053728] text-white p-4 sm:p-5 flex items-center justify-between border-b border-[#03241A]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setReviewItem(null);
                    setPreviewDocType(null);
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 active:scale-95 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h3 className="text-sm font-bold leading-tight">Landlord Verification Review</h3>
                  <p className="text-xs text-emerald-200">
                    Application #{reviewItem.id} • Bunawan LGU Accreditation Check
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setReviewItem(null);
                  setPreviewDocType(null);
                }}
                className="text-white/70 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              {/* Landlord Card Info */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-[#F8FAF7] flex justify-between items-center shadow-2xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-2xl border-2 border-emerald-400 p-0.5 flex items-center justify-center bg-white shadow-2xs overflow-hidden shrink-0">
                    {reviewItem.profilePhoto ? (
                      <img src={reviewItem.profilePhoto} alt={reviewItem.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <div className="w-full h-full rounded-xl bg-emerald-700 text-white font-black text-sm flex items-center justify-center">
                        {reviewItem.avatar}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                      <span>{reviewItem.name}</span>
                      {reviewItem.phone && (
                        <span className="text-[11px] font-normal text-slate-500 font-mono">
                          ({reviewItem.phone})
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-slate-700 font-medium">
                      <strong className="text-emerald-800">{reviewItem.houseName}</strong> ({reviewItem.roomsCount} Rooms Total)
                      {reviewItem.email && <span className="font-normal text-slate-400"> · {reviewItem.email}</span>}
                    </p>
                    <p className="text-[11px] text-rose-600 font-medium mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{reviewItem.location}</span>
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ml-2 ${
                    reviewItem.status === 'APPROVED'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}
                >
                  {reviewItem.status}
                </span>
              </div>

              {/* Boarding House Room & Property Photos Gallery */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                      Boarding House Room & Facility Photos ({
                        (reviewItem.propertyPhotos && reviewItem.propertyPhotos.length > 0
                          ? reviewItem.propertyPhotos
                          : [
                              'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
                              'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
                              'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
                              'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
                            ]).length
                      })
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Click photo to zoom
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(reviewItem.propertyPhotos && reviewItem.propertyPhotos.length > 0
                    ? reviewItem.propertyPhotos
                    : [
                        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
                        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
                      ]
                  ).map((photoUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedZoomPhoto(photoUrl)}
                      className="group relative h-24 rounded-xl overflow-hidden border-2 border-slate-200 hover:border-emerald-500 cursor-pointer shadow-2xs transition-all hover:scale-[1.02]"
                      title="Click to view high-resolution photo"
                    >
                      <img
                        src={photoUrl}
                        alt={`Property photo ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="w-5 h-5 text-white drop-shadow-sm" />
                      </div>
                      <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-white text-[9px] font-bold">
                        Photo {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submitted Legal Documents (4) */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    SUBMITTED LEGAL DOCUMENTS (4 REQUIREMENTS)
                  </span>
                  <span className="text-[11px] text-emerald-800 font-bold">
                    Bunawan Municipal Standards
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Doc 1: Proof of Property Ownership */}
                  <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:border-emerald-300 transition-all">
                    <div className="p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00875A] flex items-center justify-center">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">
                            1. Proof of Property Ownership
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Transfer Certificate of Title No. T-48192 (Lot 412, Poblacion)
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreviewDocType(previewDocType === 'title' ? null : 'title')}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
                          previewDocType === 'title'
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-emerald-50 text-[#00875A] hover:bg-emerald-100'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{previewDocType === 'title' ? 'Hide Preview' : 'Preview'}</span>
                      </button>
                    </div>

                    {/* Inline Preview for Doc 1 */}
                    {previewDocType === 'title' && (
                      <div className="p-4 bg-slate-900 text-white border-t border-slate-800 space-y-3 animate-in fade-in duration-150">
                        <div className="flex items-center justify-between text-xs text-amber-300 font-bold border-b border-slate-800 pb-2">
                          <span className="flex items-center gap-1.5">
                            <Search className="w-3.5 h-3.5" />
                            <span>Land Title & Property Ownership Certificate</span>
                          </span>
                          {reviewItem.uploadedDocuments?.title?.previewUrl && (
                            <button
                              type="button"
                              onClick={() => setSelectedZoomPhoto(reviewItem.uploadedDocuments!.title!.previewUrl!)}
                              className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Zoom Image</span>
                            </button>
                          )}
                        </div>

                        {reviewItem.uploadedDocuments?.title?.previewUrl && (
                          <div className="max-h-64 overflow-hidden rounded-xl border border-slate-700 bg-black flex items-center justify-center">
                            <img
                              src={reviewItem.uploadedDocuments.title.previewUrl}
                              alt="Uploaded Land Title"
                              className="max-h-64 w-auto object-contain rounded-lg"
                            />
                          </div>
                        )}

                        <div className="bg-amber-50/90 text-slate-900 p-4 rounded-xl text-center space-y-2 font-serif border-2 border-amber-600 shadow-inner">
                          <div className="text-[10px] uppercase tracking-wider text-slate-600 font-sans font-bold">
                            Land Registration Authority · Register of Deeds
                            <br />
                            AGUSAN DEL SUR DISTRICT
                          </div>
                          <h5 className="text-sm font-bold text-amber-900">
                            TRANSFER CERTIFICATE OF TITLE NO. T-48192
                          </h5>
                          <p className="text-[11px] font-sans text-slate-700">
                            It is hereby certified that certain land situated in Bunawan, Agusan del Sur, containing an area of 850 square meters, is registered in the name of <strong>{reviewItem.name}</strong>.
                          </p>
                          <div className="flex justify-between items-center text-[10px] font-sans text-slate-500 pt-2 border-t border-amber-300">
                            <span>Lot 412, Cadastre 18</span>
                            <span className="font-bold text-amber-800 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>DEED OF TITLE AUTHENTIC</span>
                            </span>
                            <span>LRA Certified</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Doc 2: LGU Bunawan Business Permit */}
                  <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:border-emerald-300 transition-all">
                    <div className="p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00875A] flex items-center justify-center">
                          <FileCheck2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">
                            2. LGU Bunawan Mayor's Business Permit
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Permit #{reviewItem.permitNo} · Valid thru Dec 31, 2026
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreviewDocType(previewDocType === 'permit' ? null : 'permit')}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
                          previewDocType === 'permit'
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-emerald-50 text-[#00875A] hover:bg-emerald-100'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{previewDocType === 'permit' ? 'Hide Preview' : 'Preview'}</span>
                      </button>
                    </div>

                    {/* Inline Preview for Doc 2 */}
                    {previewDocType === 'permit' && (
                      <div className="p-4 bg-slate-900 text-white border-t border-slate-800 space-y-3 animate-in fade-in duration-150">
                        <div className="flex items-center justify-between text-xs text-emerald-400 font-bold border-b border-slate-800 pb-2">
                          <span className="flex items-center gap-1.5">
                            <Search className="w-3.5 h-3.5" />
                            <span>Bunawan Mayor's Business Permit 2026</span>
                          </span>
                          {reviewItem.uploadedDocuments?.permit?.previewUrl && (
                            <button
                              type="button"
                              onClick={() => setSelectedZoomPhoto(reviewItem.uploadedDocuments!.permit!.previewUrl!)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Zoom Image</span>
                            </button>
                          )}
                        </div>

                        {reviewItem.uploadedDocuments?.permit?.previewUrl && (
                          <div className="max-h-64 overflow-hidden rounded-xl border border-slate-700 bg-black flex items-center justify-center">
                            <img
                              src={reviewItem.uploadedDocuments.permit.previewUrl}
                              alt="Uploaded Business Permit"
                              className="max-h-64 w-auto object-contain rounded-lg"
                            />
                          </div>
                        )}

                        <div className="bg-white text-slate-900 p-4 rounded-xl text-center space-y-2 font-serif border-2 border-emerald-700 shadow-inner">
                          <div className="text-[10px] uppercase tracking-wider text-slate-600 font-sans font-bold">
                            Republic of the Philippines · Province of Agusan del Sur
                            <br />
                            MUNICIPALITY OF BUNAWAN
                          </div>
                          <h5 className="text-sm font-bold text-[#053728]">
                            OFFICE OF THE MUNICIPAL MAYOR
                          </h5>
                          <div className="text-xs font-sans font-bold text-emerald-800 bg-emerald-50 py-1 rounded-md">
                            MAYOR'S BUSINESS PERMIT NO: {reviewItem.permitNo}
                          </div>
                          <p className="text-[11px] font-sans text-slate-700">
                            Granted to <strong>{reviewItem.name}</strong> for the operation of <strong>{reviewItem.houseName}</strong> situated at {reviewItem.location}.
                          </p>
                          <div className="flex justify-between items-center text-[10px] font-sans text-slate-500 pt-2 border-t border-slate-200">
                            <span>Issued: Jan 12, 2026</span>
                            <span className="font-bold text-[#00875A] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>MUNICIPAL SEAL VERIFIED</span>
                            </span>
                            <span>Expires: Dec 31, 2026</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Doc 3: Government Valid ID */}
                  <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:border-emerald-300 transition-all">
                    <div className="p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00875A] flex items-center justify-center">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">
                            3. Valid Government Issued ID
                          </span>
                          <span className="text-[11px] text-slate-500">
                            Philippine National ID (PhilID) · {reviewItem.name}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreviewDocType(previewDocType === 'id' ? null : 'id')}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
                          previewDocType === 'id'
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-emerald-50 text-[#00875A] hover:bg-emerald-100'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{previewDocType === 'id' ? 'Hide Preview' : 'Preview'}</span>
                      </button>
                    </div>

                    {/* Inline Preview for Doc 3 */}
                    {previewDocType === 'id' && (
                      <div className="p-4 bg-slate-900 text-white border-t border-slate-800 space-y-3 animate-in fade-in duration-150">
                        <div className="flex items-center justify-between text-xs text-blue-400 font-bold border-b border-slate-800 pb-2">
                          <span className="flex items-center gap-1.5">
                            <Search className="w-3.5 h-3.5" />
                            <span>Philippine National Identification Card (PhilID)</span>
                          </span>
                          {reviewItem.uploadedDocuments?.id?.previewUrl && (
                            <button
                              type="button"
                              onClick={() => setSelectedZoomPhoto(reviewItem.uploadedDocuments!.id!.previewUrl!)}
                              className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Zoom Image</span>
                            </button>
                          )}
                        </div>

                        {reviewItem.uploadedDocuments?.id?.previewUrl && (
                          <div className="max-h-64 overflow-hidden rounded-xl border border-slate-700 bg-black flex items-center justify-center">
                            <img
                              src={reviewItem.uploadedDocuments.id.previewUrl}
                              alt="Uploaded PhilID"
                              className="max-h-64 w-auto object-contain rounded-lg"
                            />
                          </div>
                        )}

                        <div className="bg-slate-50 text-slate-900 p-4 rounded-xl space-y-2 font-sans border-2 border-blue-600 shadow-inner">
                          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                            <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wide">
                              REPUBLIKA NG PILIPINAS · PHILIPPINE IDENTIFICATION SYSTEM
                            </span>
                            <span className="text-[10px] font-mono font-bold text-slate-500">PhilID</span>
                          </div>
                          <div className="flex items-center gap-3 pt-1">
                            <div className="w-12 h-14 bg-slate-300 rounded-md border border-slate-400 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0 overflow-hidden">
                              {reviewItem.profilePhoto ? (
                                <img src={reviewItem.profilePhoto} alt={reviewItem.name} className="w-full h-full object-cover" />
                              ) : (
                                reviewItem.avatar
                              )}
                            </div>
                            <div className="text-left text-xs space-y-0.5">
                              <div>
                                <span className="text-[9px] text-slate-400 block font-bold">FULL NAME</span>
                                <span className="font-bold text-slate-900">{reviewItem.name}</span>
                              </div>
                              <div>
                                <span className="text-[9px] text-slate-400 block font-bold">ADDRESS</span>
                                <span className="text-[11px] text-slate-700 font-medium">{reviewItem.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Doc 4: BFP Fire Safety Inspection Certificate */}
                  <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs hover:border-emerald-300 transition-all">
                    <div className="p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-[#00875A] flex items-center justify-center">
                          <Building className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-800 block">
                            4. BFP Fire Safety Inspection Certificate (FSIC)
                          </span>
                          <span className="text-[11px] text-slate-500">
                            FSIC No. R13-ADS-BNW-2026-0082 & Barangay Clearance
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPreviewDocType(previewDocType === 'fire' ? null : 'fire')}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all cursor-pointer ${
                          previewDocType === 'fire'
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-emerald-50 text-[#00875A] hover:bg-emerald-100'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{previewDocType === 'fire' ? 'Hide Preview' : 'Preview'}</span>
                      </button>
                    </div>

                    {/* Inline Preview for Doc 4 */}
                    {previewDocType === 'fire' && (
                      <div className="p-4 bg-slate-900 text-white border-t border-slate-800 space-y-3 animate-in fade-in duration-150">
                        <div className="flex items-center justify-between text-xs text-rose-400 font-bold border-b border-slate-800 pb-2">
                          <span className="flex items-center gap-1.5">
                            <Search className="w-3.5 h-3.5" />
                            <span>BFP Fire Safety & Barangay Clearance</span>
                          </span>
                          {reviewItem.uploadedDocuments?.fire?.previewUrl && (
                            <button
                              type="button"
                              onClick={() => setSelectedZoomPhoto(reviewItem.uploadedDocuments!.fire!.previewUrl!)}
                              className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Zoom Image</span>
                            </button>
                          )}
                        </div>

                        {reviewItem.uploadedDocuments?.fire?.previewUrl && (
                          <div className="max-h-64 overflow-hidden rounded-xl border border-slate-700 bg-black flex items-center justify-center">
                            <img
                              src={reviewItem.uploadedDocuments.fire.previewUrl}
                              alt="Uploaded BFP Fire Certificate"
                              className="max-h-64 w-auto object-contain rounded-lg"
                            />
                          </div>
                        )}

                        <div className="bg-rose-50/90 text-slate-900 p-4 rounded-xl text-center space-y-2 font-serif border-2 border-rose-600 shadow-inner">
                          <div className="text-[10px] uppercase tracking-wider text-slate-600 font-sans font-bold">
                            BUREAU OF FIRE PROTECTION · MUNICIPAL FIRE STATION
                            <br />
                            BUNAWAN, AGUSAN DEL SUR
                          </div>
                          <h5 className="text-sm font-bold text-rose-900">
                            FIRE SAFETY INSPECTION CERTIFICATE
                          </h5>
                          <p className="text-[11px] font-sans text-slate-700">
                            Certificate No. <strong>R13-ADS-BNW-2026-0082</strong> issued to <strong>{reviewItem.houseName}</strong> after satisfactory fire safety inspection compliant with RA 9514.
                          </p>
                          <div className="flex justify-between items-center text-[10px] font-sans text-slate-500 pt-2 border-t border-rose-300">
                            <span>Equipped: Fire Extinguisher, Emergency Exits</span>
                            <span className="font-bold text-rose-800 flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>BFP INSPECTED</span>
                            </span>
                            <span>Valid AY 2026–2027</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* INTERACTIVE DOCUMENT PREVIEW CARD */}
              {previewDocType && (
                <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-3 animate-in fade-in duration-150">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5" />
                      <span>
                        {previewDocType === 'title'
                          ? 'Land Title & Property Ownership Certificate'
                          : previewDocType === 'permit'
                          ? "Bunawan Mayor's Business Permit 2026"
                          : previewDocType === 'id'
                          ? 'Philippine National Identification Card (PhilID)'
                          : 'BFP Fire Safety & Barangay Clearance'}
                      </span>
                    </span>
                    <button
                      onClick={() => setPreviewDocType(null)}
                      className="text-slate-400 hover:text-white p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {previewDocType === 'permit' && (
                    <div className="bg-white text-slate-900 p-4 rounded-xl text-center space-y-2 font-serif border-2 border-emerald-700 shadow-inner">
                      <div className="text-[10px] uppercase tracking-wider text-slate-600 font-sans font-bold">
                        Republic of the Philippines · Province of Agusan del Sur
                        <br />
                        MUNICIPALITY OF BUNAWAN
                      </div>
                      <h5 className="text-sm font-bold text-[#053728]">
                        OFFICE OF THE MUNICIPAL MAYOR
                      </h5>
                      <div className="text-xs font-sans font-bold text-emerald-800 bg-emerald-50 py-1 rounded-md">
                        MAYOR'S BUSINESS PERMIT NO: {reviewItem.permitNo}
                      </div>
                      <p className="text-[11px] font-sans text-slate-700">
                        Granted to <strong>{reviewItem.name}</strong> for the operation of{' '}
                        <strong>{reviewItem.houseName}</strong> situated at {reviewItem.location}.
                      </p>
                      <div className="flex justify-between items-center text-[10px] font-sans text-slate-500 pt-2 border-t border-slate-200">
                        <span>Issued: Jan 12, 2026</span>
                        <span className="font-bold text-[#00875A] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>MUNICIPAL SEAL VERIFIED</span>
                        </span>
                        <span>Expires: Dec 31, 2026</span>
                      </div>
                    </div>
                  )}

                  {previewDocType === 'title' && (
                    <div className="bg-amber-50/90 text-slate-900 p-4 rounded-xl text-center space-y-2 font-serif border-2 border-amber-600 shadow-inner">
                      <div className="text-[10px] uppercase tracking-wider text-slate-600 font-sans font-bold">
                        Land Registration Authority · Register of Deeds
                        <br />
                        AGUSAN DEL SUR DISTRICT
                      </div>
                      <h5 className="text-sm font-bold text-amber-900">
                        TRANSFER CERTIFICATE OF TITLE NO. T-48192
                      </h5>
                      <p className="text-[11px] font-sans text-slate-700">
                        It is hereby certified that certain land situated in Bunawan, Agusan del
                        Sur, containing an area of 850 square meters, is registered in the name of{' '}
                        <strong>{reviewItem.name}</strong>.
                      </p>
                      <div className="flex justify-between items-center text-[10px] font-sans text-slate-500 pt-2 border-t border-amber-300">
                        <span>Lot 412, Cadastre 18</span>
                        <span className="font-bold text-amber-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>DEED OF TITLE AUTHENTIC</span>
                        </span>
                        <span>LRA Certified</span>
                      </div>
                    </div>
                  )}

                  {previewDocType === 'id' && (
                    <div className="bg-slate-50 text-slate-900 p-4 rounded-xl space-y-2 font-sans border-2 border-blue-600 shadow-inner">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-1.5">
                        <span className="text-[10px] font-bold text-blue-900 uppercase">
                          Republika ng Pilipinas · PhilSys ID
                        </span>
                        <span className="text-[9px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          GOVERNMENT ID
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-14 rounded-lg bg-slate-300 flex items-center justify-center text-xs font-bold text-slate-700">
                          {reviewItem.avatar}
                        </div>
                        <div className="text-left text-xs space-y-0.5">
                          <p className="font-bold text-slate-900">{reviewItem.name}</p>
                          <p className="text-[10px] text-slate-500">PSN: 9412-8821-4412-0019</p>
                          <p className="text-[10px] text-slate-500">{reviewItem.location}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {previewDocType === 'fire' && (
                    <div className="bg-rose-50/90 text-slate-900 p-4 rounded-xl text-center space-y-2 font-sans border-2 border-rose-500 shadow-inner">
                      <div className="text-[10px] uppercase tracking-wider text-slate-600 font-bold">
                        BUREAU OF FIRE PROTECTION · REGION XIII
                        <br />
                        BUNAWAN MUNICIPAL FIRE STATION
                      </div>
                      <h5 className="text-sm font-bold text-rose-900">
                        FIRE SAFETY INSPECTION CERTIFICATE
                      </h5>
                      <p className="text-[11px] text-slate-700">
                        Certificate No. <strong>R13-ADS-BNW-2026-0082</strong> issued to{' '}
                        <strong>{reviewItem.houseName}</strong> after satisfactory fire safety
                        inspection compliant with RA 9514.
                      </p>
                      <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-rose-300">
                        <span>Equipped: Fire Extinguisher, Emergency Lights</span>
                        <span className="font-bold text-rose-800 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>BFP INSPECTED</span>
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Admin Audit Notes */}
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">
                  ADMIN AUDIT & ACCREDITATION NOTES
                </span>
                <textarea
                  value={auditNotes}
                  onChange={(e) => setAuditNotes(e.target.value)}
                  rows={2}
                  className="w-full p-3 rounded-2xl border border-slate-200 text-xs text-slate-800 bg-[#F8FAF7] focus:outline-none focus:border-emerald-600 leading-relaxed"
                />
              </div>

              {/* Approval Notice */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                <span className="font-bold flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-800" />
                  <span>Accreditation Impact:</span>
                </span>
                Granting approval attaches the official <strong>"LGU Verified"</strong> badge to{' '}
                {reviewItem.houseName}, elevating the property in student search results and
                enabling booking requests from ADSSU students.
              </div>

              {/* Modal Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => handleApprove(reviewItem)}
                  className="w-full py-3.5 rounded-2xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Approve & Grant LGU Verified Badge</span>
                </button>

                <button
                  onClick={() => setFixModalItem(reviewItem)}
                  className="w-full py-3 rounded-2xl border border-rose-300 bg-rose-50 text-rose-600 font-bold text-xs uppercase tracking-wider hover:bg-rose-100 transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Reject Application / Request Document Fix</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 2: REQUEST DOCUMENT FIX (Matches Figma Screenshot 004434) --- */}
      {fixModalItem && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
          <div className="w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-200 space-y-4 max-h-[92vh] overflow-y-auto border border-slate-200">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto sm:hidden" />

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Request Document Fix</h3>
                <p className="text-xs text-slate-500">
                  {fixModalItem.name} • {fixModalItem.houseName}
                </p>
              </div>
            </div>

            {/* Select Flagged Docs */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 block">
                SELECT FLAGGED DOCUMENT(S)
              </span>
              <div className="space-y-2">
                {[
                  'Proof of Ownership / Land Title',
                  'LGU Bunawan Business Permit (Needs Fix)',
                  'Government Valid ID',
                  'BFP Fire Safety Inspection Certificate',
                ].map((doc) => {
                  const checked = flaggedDocs.includes(doc);
                  const isRed = doc.includes('Needs Fix');
                  return (
                    <button
                      key={doc}
                      onClick={() =>
                        setFlaggedDocs((prev) =>
                          prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
                        )
                      }
                      className={`w-full p-3 rounded-2xl border text-left text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                        checked && isRed
                          ? 'border-rose-400 bg-rose-50 text-rose-900'
                          : checked
                          ? 'border-emerald-400 bg-emerald-50 text-emerald-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                          checked
                            ? isRed
                              ? 'bg-rose-500 text-white'
                              : 'bg-emerald-600 text-white'
                            : 'border border-slate-300'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{doc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Reason Text */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">
                REASON FOR FIX REQUEST / REJECTION NOTE
              </span>
              <textarea
                value={fixReason}
                onChange={(e) => setFixReason(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-2xl border border-slate-200 text-xs text-slate-800 bg-[#F8FAF7] focus:outline-none focus:border-rose-500 leading-relaxed"
              />
            </div>

            {/* Push / SMS Preview */}
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 leading-relaxed">
              <span className="font-bold block text-[11px] text-blue-800 flex items-center gap-1.5 mb-1">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Simulated SMS & Landlord Notification:</span>
              </span>
              "{fixReason.substring(0, 95)}..."
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleSendFixRequest(fixModalItem)}
                className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                Send Fix Request to Landlord
              </button>

              <button
                onClick={() => setFixModalItem(null)}
                className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 text-center cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: STUDENT ADSSU COR REVIEW & APPROVAL --- */}
      {reviewStudentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans my-auto border border-emerald-500/40 relative max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#053728] text-white p-5 flex items-center justify-between border-b border-[#03241A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-400/50 flex items-center justify-center text-blue-300 font-bold text-lg">
                  <GraduationCap className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight flex items-center gap-2">
                    <span>ADSSU Student COR & ID Accreditation Review</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-900 text-blue-200 border border-blue-600/50">
                      Academic Year 2026–2027
                    </span>
                  </h3>
                  <p className="text-xs text-emerald-200">
                    Verify Certificate of Registration (COR) for student tenant eligibility
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setReviewStudentItem(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Student Info Bar */}
            <div className="bg-slate-50 p-4 border-b border-slate-200 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl border-2 border-emerald-400 p-0.5 flex items-center justify-center bg-white shadow-xs overflow-hidden shrink-0">
                    {reviewStudentItem.profilePhoto ? (
                      <img src={reviewStudentItem.profilePhoto} alt={reviewStudentItem.name} className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <div className="w-full h-full rounded-xl bg-blue-600 text-white font-bold text-lg flex items-center justify-center">
                        {reviewStudentItem.avatar}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{reviewStudentItem.name}</h4>
                    <p className="text-xs text-[#00875A] font-bold flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>ID: {reviewStudentItem.studentId}</span>
                    </p>
                    <p className="text-[11px] text-slate-500">{reviewStudentItem.course}</p>
                  </div>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    reviewStudentItem.status === 'APPROVED'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : reviewStudentItem.status === 'NEEDS_FIX'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-blue-100 text-blue-800 border border-blue-300'
                  }`}
                >
                  {reviewStudentItem.status}
                </span>
              </div>
            </div>

            {/* COR Document Preview Stage */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Attached Certificate of Registration (COR):</span>
                </span>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {reviewStudentItem.corFile}
                </span>
              </div>

              {/* Uploaded Real COR Image Preview (if present) */}
              {reviewStudentItem.corPreviewUrl && (
                <div className="p-3.5 bg-slate-900 rounded-2xl border border-blue-500/50 space-y-2">
                  <div className="flex items-center justify-between text-xs text-blue-300 font-bold">
                    <span>Uploaded Student COR Document Image ({reviewStudentItem.corFile})</span>
                    <button
                      type="button"
                      onClick={() => setSelectedZoomPhoto(reviewStudentItem.corPreviewUrl!)}
                      className="px-2.5 py-1 rounded-lg bg-blue-700 hover:bg-blue-600 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Zoom Full Screen</span>
                    </button>
                  </div>
                  <div className="max-h-72 overflow-hidden rounded-xl border border-slate-700 bg-black flex items-center justify-center">
                    <img
                      src={reviewStudentItem.corPreviewUrl}
                      alt="Student COR Upload"
                      className="max-h-72 w-auto object-contain rounded-lg"
                    />
                  </div>
                </div>
              )}

              {/* Document Certificate Frame */}
              <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3 relative overflow-hidden border border-slate-700 shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div className="flex items-center gap-2">
                    <StayNestEmblem size="sm" />
                    <div>
                      <span className="font-bold text-xs text-amber-300 block">
                        AGUSAN DEL SUR STATE UNIVERSITY (ADSSU)
                      </span>
                      <span className="text-[10px] text-slate-300">
                        OFFICIAL CERTIFICATE OF REGISTRATION (COR)
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900 text-blue-200 border border-blue-600">
                    SEALED & STAMPED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">STUDENT NAME</span>
                    <span className="font-bold text-white">{reviewStudentItem.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">STUDENT ID NUMBER</span>
                    <span className="font-mono font-bold text-amber-300">{reviewStudentItem.studentId}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">COLLEGE / DEGREE</span>
                    <span className="font-semibold text-slate-200">{reviewStudentItem.course}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">EMAIL ADDRESS</span>
                    <span className="font-mono text-slate-300">{reviewStudentItem.email}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-[11px] text-emerald-200 flex items-center gap-2 mt-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified Enrolled ADSSU Bunawan Student • Eligible for Accredited Boarding House Booking</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setReviewStudentItem(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFixStudentModalItem(reviewStudentItem);
                    setReviewStudentItem(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all cursor-pointer"
                >
                  Reject / Request Fix
                </button>
                <button
                  type="button"
                  onClick={() => handleApproveStudent(reviewStudentItem)}
                  className="px-5 py-2.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Approve & Activate Account</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: REJECT / REQUEST COR FIX FOR STUDENT --- */}
      {fixStudentModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Request Student COR Revision</h3>
                <p className="text-xs text-slate-500">
                  {fixStudentModalItem.name} ({fixStudentModalItem.studentId})
                </p>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 block">
                REASON FOR COR REVISION / REJECTION NOTE
              </span>
              <textarea
                value={studentFixReason}
                onChange={(e) => setStudentFixReason(e.target.value)}
                rows={3}
                className="w-full p-3 rounded-2xl border border-slate-200 text-xs text-slate-800 bg-[#F8FAF7] focus:outline-none focus:border-rose-500 leading-relaxed"
              />
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 leading-relaxed">
              <span className="font-bold block text-[11px] text-blue-800 flex items-center gap-1.5 mb-1">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Email & Account Status Update Notification:</span>
              </span>
              "{studentFixReason.substring(0, 95)}..."
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleSendStudentFixRequest(fixStudentModalItem)}
                className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                Send Revision Notice to Student
              </button>

              <button
                onClick={() => setFixStudentModalItem(null)}
                className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 text-center cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL: ITEMISED 5% COMMISSION & REVENUE AUDIT LEDGER --- */}
      {showCommissionLedgerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans my-auto border border-emerald-500/40 relative max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-[#053728] text-white p-5 flex items-center justify-between border-b border-[#03241A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#E5A93C]/20 border border-[#E5A93C]/50 flex items-center justify-center text-[#E5A93C] font-bold text-lg">
                  ₱
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-tight flex items-center gap-2">
                    <span>StayNest 5% Commission & Municipal Revenue Ledger</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200 border border-emerald-600/50">
                      Academic Year 2026–2027
                    </span>
                  </h3>
                  <p className="text-xs text-emerald-200">
                    Itemized Record of 23 Verified ADSSU Student Rent Transactions & 5% Retained Oversight Yield
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowCommissionLedgerModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Metric Summary Ribbon */}
            <div className="bg-emerald-950 p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-white border-b border-emerald-900">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-emerald-300 uppercase block font-semibold">Total Rent Volume</span>
                <span className="text-lg font-bold text-white">₱34,500.00</span>
                <span className="text-[9px] text-emerald-400 block mt-0.5">23 Bookings</span>
              </div>
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30">
                <span className="text-[10px] text-amber-300 uppercase block font-semibold">5% Retained Fee</span>
                <span className="text-lg font-bold text-amber-300">₱1,725.00</span>
                <span className="text-[9px] text-amber-200/80 block mt-0.5">Platform Yield</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-emerald-300 uppercase block font-semibold">Landlord Payout</span>
                <span className="text-lg font-bold text-emerald-100">₱32,775.00</span>
                <span className="text-[9px] text-emerald-400 block mt-0.5">Disbursed 100%</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-emerald-300 uppercase block font-semibold">Audit Status</span>
                <span className="text-lg font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cleared
                </span>
                <span className="text-[9px] text-emerald-300/80 block mt-0.5">LGU Verified</span>
              </div>
            </div>

            {/* Table of Itemized Transactions */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-3 flex-1 text-slate-700 text-xs">
              <div className="flex items-center justify-between pb-1">
                <span className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                  Verified Booking Transactions (Recent 8 of 23)
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Formula: Monthly Rent × 5% = Platform Sustenance
                </span>
              </div>

              <div className="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-2xs">
                {[
                  { id: 'TX-BNW-2026-001', student: 'Kean Ide (BSIT 3rd Yr)', house: 'Jiomer Dalayap Boarding House', owner: 'Jiomer Dalayap', rent: 1000, fee: 50, payout: 950, date: 'Oct 28, 2026' },
                  { id: 'TX-BNW-2026-002', student: 'Conrado Candari (BSIT 3rd Yr)', house: 'Cabanillia Boarding House', owner: 'Elizabeth Cabanillia', rent: 1100, fee: 55, payout: 1045, date: 'Oct 27, 2026' },
                  { id: 'TX-BNW-2026-003', student: 'Jolina Asuncion (BSIT 3rd Yr)', house: 'Flordeliza Quintas Boarding House', owner: 'Flordeliza Quintas', rent: 1000, fee: 50, payout: 950, date: 'Oct 26, 2026' },
                  { id: 'TX-BNW-2026-004', student: 'Mary Joy Doroteo (BSIT 3rd Yr)', house: "Hiponia's Boarding House", owner: 'Myrna Hiponia', rent: 1200, fee: 60, payout: 1140, date: 'Oct 25, 2026' },
                  { id: 'TX-BNW-2026-005', student: 'Angelo Laureta Nuer (BSIT 3rd Yr)', house: 'UNO Boarding House', owner: 'Rhejie Largo', rent: 1300, fee: 65, payout: 1235, date: 'Oct 24, 2026' },
                  { id: 'TX-BNW-2026-006', student: 'Bea Alcantara (Agri 3rd Yr)', house: 'Cabanillia Boarding House', owner: 'Elizabeth Cabanillia', rent: 1600, fee: 80, payout: 1520, date: 'Oct 23, 2026' },
                  { id: 'TX-BNW-2026-007', student: 'Joshua Alcantara (Forestry 2nd Yr)', house: 'Flordeliza Quintas Boarding House', owner: 'Flordeliza Quintas', rent: 1400, fee: 70, payout: 1330, date: 'Oct 22, 2026' },
                  { id: 'TX-BNW-2026-008', student: 'Mark Santos (Criminology 4th Yr)', house: 'UNO Boarding House', owner: 'Rhejie Largo', rent: 1700, fee: 85, payout: 1615, date: 'Oct 21, 2026' },
                ].map((tx) => (
                  <div key={tx.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[11px] text-slate-500">{tx.id}</span>
                        <span className="font-bold text-slate-900 text-xs">{tx.student}</span>
                      </div>
                      <p className="text-[11px] text-slate-600">
                        {tx.house} · Landlord: <span className="font-medium text-slate-800">{tx.owner}</span>
                      </p>
                      <p className="text-[10px] text-slate-400">{tx.date} · Direct Bank / GCash Remittance</p>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto text-right">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Rent Amount</span>
                        <span className="font-bold text-slate-900 text-xs">₱{tx.rent.toLocaleString()}</span>
                      </div>
                      <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-200">
                        <span className="text-[10px] text-amber-800 font-semibold block">5% Fee</span>
                        <span className="font-bold text-amber-700 text-xs">₱{tx.fee.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Landlord Net</span>
                        <span className="font-bold text-emerald-700 text-xs">₱{tx.payout.toFixed(2)}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                        Cleared
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <span className="font-bold text-slate-800 block">Municipal Legal Compliance:</span>
                <p>
                  All 5% commission retentions are audited under Bunawan Municipal Revenue Code & ADSSU Student Welfare Board regulations. Landlord payouts are processed within 24 hours of tenant booking confirmation.
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Live sync active with PostgreSQL Supabase ledger.
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSuccessBanner('Export Generated: StayNest_Revenue_Ledger_AY2026.csv downloaded.');
                    setShowCommissionLedgerModal(false);
                    setTimeout(() => setSuccessBanner(null), 4000);
                  }}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-100 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Export CSV Audit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCommissionLedgerModal(false)}
                  className="px-5 py-2 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold transition-all shadow-sm cursor-pointer active:scale-95"
                >
                  Close Ledger
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL 3: OFFICIAL ACCREDITATION CERTIFICATE (LGU & ADSSU) --- */}
      {selectedCertificateProp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="w-full max-w-2xl bg-[#FCFDF9] rounded-3xl overflow-hidden shadow-2xl flex flex-col font-sans my-auto border-4 border-[#E5A93C]/40 relative">
            {/* Certificate Header Bar */}
            <div className="bg-[#053728] text-white p-4 flex items-center justify-between border-b border-[#03241A]">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#E5A93C]" />
                <span className="text-sm font-bold tracking-wide">
                  Official Certificate of Housing Accreditation
                </span>
              </div>
              <button
                onClick={() => setSelectedCertificateProp(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Inner Parchment Certificate Frame */}
            <div className="p-6 sm:p-10 text-center relative bg-gradient-to-b from-[#FFFDF8] via-white to-[#F9FAF5]">
              {/* Decorative Corner Ornaments */}
              <div className="border-2 border-[#E5A93C]/50 p-6 sm:p-8 rounded-2xl relative shadow-inner bg-white/60">
                {/* Crest & Seal Header */}
                <div className="flex items-center justify-center gap-6 mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#053728] text-[#E5A93C] flex items-center justify-center shadow-md border-2 border-[#E5A93C]">
                    <StayNestEmblem size="md" />
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] tracking-widest uppercase font-bold text-slate-500">
                      Republic of the Philippines · Province of Agusan del Sur
                    </p>
                    <p className="text-xs font-bold text-slate-800">
                      MUNICIPALITY OF BUNAWAN & ADSSU HOUSING BOARD
                    </p>
                    <p className="text-[10px] text-emerald-800 font-medium">
                      Joint Student Housing Accreditation Council
                    </p>
                  </div>
                </div>

                <div className="w-24 h-0.5 bg-[#E5A93C] mx-auto my-3" />

                <h2 className="font-serif italic text-2xl sm:text-3xl font-bold text-[#053728] tracking-tight mb-2">
                  Certificate of Accreditation
                </h2>
                <p className="text-[11px] uppercase tracking-wider text-slate-500 font-bold mb-4">
                  OFFICIAL SAFE STUDENT HOUSING SEAL
                </p>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-lg mx-auto">
                  This hereby certifies that the boarding facility known as:
                </p>

                <div className="my-3 py-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-200/80 inline-block">
                  <h3 className="font-serif italic text-xl font-bold text-[#053728]">
                    {selectedCertificateProp.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600">
                    Operated by: {selectedCertificateProp.ownerName}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {selectedCertificateProp.location}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-lg mx-auto mb-6">
                  has officially passed all municipal safety requirements including <strong>BFP Fire Inspection</strong>, <strong>LGU Sanitary and Health Permits</strong>, and full compliance with the <strong>ADSSU 2026–2027 Student Welfare Housing Guidelines</strong>.
                </p>

                {/* Badges / Seals Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-[11px] mb-6">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">PERMIT NO.</span>
                    <span className="font-mono font-bold text-slate-800">2026-BNW-0491</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">VALIDITY</span>
                    <span className="font-bold text-emerald-800">AY 2026–2027</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">BFP FIRE CODE</span>
                    <span className="font-bold text-slate-800">FSIC-2026-088</span>
                  </div>
                </div>

                {/* Signatures */}
                <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <div className="font-serif italic font-bold text-xs text-slate-800 border-b border-slate-400 pb-1 mx-4">
                      Hon. Sylvia B. Elorde
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Municipal Mayor · Bunawan, Agusan del Sur
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="font-serif italic font-bold text-xs text-slate-800 border-b border-slate-400 pb-1 mx-4">
                      Dr. Joy C. Capistrano
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      University President · ADSSU Bunawan
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Official digital accreditation record stored in StayNest Bunawan Registry.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-100 cursor-pointer shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Certificate</span>
                </button>
                <button
                  onClick={() => setSelectedCertificateProp(null)}
                  className="px-4 py-2 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Zoom Photo Modal */}
      {selectedZoomPhoto && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4 animate-in fade-in backdrop-blur-md">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setSelectedZoomPhoto(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer"
              title="Close image view"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedZoomPhoto}
              alt="Zoomed Inspection View"
              className="max-h-[82vh] w-auto object-contain rounded-2xl shadow-2xl border border-white/20"
            />
            <p className="text-white/80 text-xs mt-3 font-semibold text-center">
              Official Bunawan LGU & ADSSU Accreditation Document & Facility Inspection
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
