import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Edit,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  MapPin,
  Megaphone,
  MessageSquare,
  Phone,
  Plus,
  Send,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  User,
  Users,
  Eye,
  DoorClosed,
  GraduationCap,
  X,
  Calendar,
  Sparkles,
  Wifi,
  Droplets,
  Zap,
  Lock,
  TrendingUp,
  BarChart2,
  Activity,
  ArrowUpRight,
  Crown,
  DollarSign,
  Wallet,
  Receipt,
  ArrowDownToLine,
  QrCode,
} from 'lucide-react';
import { StayNestEmblem } from './StayNestEmblem';
import { BookingTransaction } from './FigmaPropertyDetail';

export interface RoomItem {
  id: string;
  name: string;
  type: string;
  price: string;
  status: 'VACANT' | 'OCCUPIED';
  tenant?: string;
  course?: string;
  due?: string;
  phone?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianAddress?: string;
  inclusions: string[];
  image: string;
}

export const INITIAL_ROOMS: RoomItem[] = [
  {
    id: 'rm-01',
    name: 'Room 01',
    type: 'Bed space (4-Cap)',
    price: '₱1,000 / month',
    status: 'VACANT',
    inclusions: [
      'Free High-Speed Wi-Fi',
      '24/7 Water Supply',
      'Study Desk & Chair',
      'Shared Comfort Room',
    ],
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rm-02',
    name: 'Room 02',
    type: 'Single Bed Frame',
    price: '₱1,000 / month',
    status: 'OCCUPIED',
    tenant: 'Angelo Nuer',
    course: 'BSIT - 2nd Year (ADSSU)',
    due: '16th of Every Month',
    phone: '+63 912 345 6789',
    guardianName: 'Mrs. Maria Ruiz (Mother)',
    guardianPhone: '+63 998 765 4321',
    guardianAddress: 'Purok 2, San Francisco, ADS',
    inclusions: [
      'Free High-Speed Wi-Fi Access',
      'Study Desk & Chair',
      '24/7 Water Supply',
      'Single Bed Frame',
    ],
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rm-03',
    name: 'Room 03',
    type: 'Bed spacer Deluxe',
    price: '₱1,500 / month',
    status: 'VACANT',
    inclusions: [
      'Own Private Comfort Room',
      'Free Wi-Fi & Cabinet Included',
      'Submetered Electricity',
      'Study Table & Single Bed',
    ],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rm-04',
    name: 'Room 04',
    type: 'Bedspace (2-Bed Capacity)',
    price: '₱2,000 / month',
    status: 'OCCUPIED',
    tenant: 'Mark Santos & John Dela Cruz',
    course: 'BS Forestry / BS Agriculture',
    due: '20th of Every Month',
    phone: '+63 912 111 2233',
    guardianName: 'Mrs. Elena Santos (Mother)',
    guardianPhone: '+63 919 222 3344',
    guardianAddress: 'Purok 5, Trento, Bunawan',
    inclusions: ['Free Wi-Fi', '24/7 Water', 'Individual Study Desks'],
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rm-05',
    name: 'Room 05',
    type: 'Solo Bedspace',
    price: '₱1,000 / month',
    status: 'OCCUPIED',
    tenant: 'Mary Joy Doroteo',
    course: 'BSIT - 3rd Year (ADSSU)',
    due: '23rd of Every Month',
    phone: '+63 912 999 8877',
    guardianName: 'Mrs. Joy (Mother)',
    guardianPhone: '+63 912 888 7766',
    guardianAddress: 'Purok 1, Loreto, ADS',
    inclusions: ['Free Wi-Fi', '24/7 Water Supply'],
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rm-06',
    name: 'Room 06',
    type: 'Bed space',
    price: '₱1,000 / month',
    status: 'OCCUPIED',
    tenant: 'TJ Pacheco',
    course: 'ADSSU Student',
    due: '20th of Every Month',
    phone: '+63 912 777 6655',
    guardianName: 'Mr. Pacheco (Father)',
    guardianPhone: '+63 912 666 5544',
    guardianAddress: 'Purok 4, Sta. Josefa, ADS',
    inclusions: ['Free Wi-Fi', 'Shared CR', 'Water included'],
    image: 'https://images.unsplash.com/photo-1540518614846-7ede433c4b4f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'rm-07',
    name: 'Room 07',
    type: 'Bed space',
    price: '₱1,000 / month',
    status: 'OCCUPIED',
    tenant: 'Kean Ide',
    course: 'BSIT - 3rd Year (ADSSU)',
    due: '20th of Every Month',
    phone: '+63 912 333 4455',
    guardianName: 'Mr. Abalos (Father)',
    guardianPhone: '+63 912 222 1100',
    guardianAddress: 'Purok 5, Trento, Bunawan',
    inclusions: ['Free Wi-Fi', 'Water included'],
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
  },
];

export interface LandlordSubscription {
  id: string;
  landlordId: string;
  landlordName: string;
  houseName: string;
  plan: 'FREE_STARTER' | 'MONTHLY_PRO' | 'ANNUAL_GOLD';
  planName: string;
  amount: number; // 0, 49, 299
  duration: 'Standard' | '1 Month' | '1 Year';
  status: 'PENDING_VERIFICATION' | 'ACTIVE' | 'EXPIRED';
  featuredListingsEnabled: boolean;
  gcashReferenceNo: string;
  receiptUrl?: string;
  startDate: string;
  expiryDate: string;
}

export const INITIAL_LANDLORD_BOOKINGS: BookingTransaction[] = [
  {
    id: 'bk-dalayap-01',
    transactionCode: 'TX-BNW-2026-001',
    studentName: 'Kean Ide',
    studentId: '2024-0311-A',
    studentEmail: 'kide@adssu.edu.ph',
    studentPhone: '+63 912 333 4455',
    houseName: 'Jiomer Dalayap Boarding House',
    landlordName: 'Jiomer Dalayap',
    roomName: 'Room 01 (Bed space 4-Cap)',
    monthlyRent: 1000,
    platformCommission: 50, // 5% StayNest platform fee
    landlordPayout: 950,     // 95% net landlord payout
    paymentStatus: 'CLEARED',
    paymentMethod: 'GCash',
    moveInDate: 'Nov 1, 2026',
    voucherCode: 'STAYNEST-JD-9481',
    createdDate: 'Oct 28, 2026',
    notes: 'BSIT 3rd Year · Certificate of Registration Verified · Paid via GCash Express',
  },
  {
    id: 'bk-cabanillia-01',
    transactionCode: 'TX-BNW-2026-002',
    studentName: 'Conrado Candari',
    studentId: '2024-0245-B',
    studentEmail: 'ccandari@adssu.edu.ph',
    studentPhone: '+63 918 345 6789',
    houseName: 'Cabanillia Boarding House',
    landlordName: 'Elizabeth Cabanillia',
    roomName: 'Unit 1 (Bed space Sharing)',
    monthlyRent: 1100,
    platformCommission: 55, // 5% StayNest platform fee
    landlordPayout: 1045,    // 95% net landlord payout
    paymentStatus: 'CLEARED',
    paymentMethod: 'GCash',
    moveInDate: 'Nov 2, 2026',
    voucherCode: 'STAYNEST-EC-8372',
    createdDate: 'Oct 27, 2026',
    notes: 'BSIT 3rd Year · Certificate of Registration Verified · Move-In Pass Issued',
  },
  {
    id: 'bk-quintas-01',
    transactionCode: 'TX-BNW-2026-003',
    studentName: 'Jolina Asuncion',
    studentId: '2024-0188-C',
    studentEmail: 'jasuncion@adssu.edu.ph',
    studentPhone: '+63 929 456 7890',
    houseName: 'Flordeliza Quintas Boarding House',
    landlordName: 'Flordeliza Quintas',
    roomName: 'Room A (Solo Bed space)',
    monthlyRent: 1000,
    platformCommission: 50, // 5% StayNest platform fee
    landlordPayout: 950,     // 95% net landlord payout
    paymentStatus: 'CLEARED',
    paymentMethod: 'GCash',
    moveInDate: 'Nov 3, 2026',
    voucherCode: 'STAYNEST-FQ-7261',
    createdDate: 'Oct 26, 2026',
    notes: 'BSIT 3rd Year · Certificate of Registration Verified · Key Handover Ready',
  },
  {
    id: 'bk-hiponia-01',
    transactionCode: 'TX-BNW-2026-004',
    studentName: 'Mary Joy Doroteo',
    studentId: '2024-0167-A',
    studentEmail: 'mdoroteo@adssu.edu.ph',
    studentPhone: '+63 909 431 2657',
    houseName: "Hiponia's Boarding House",
    landlordName: 'Myrna Hiponia',
    roomName: 'Room 102 (Single Room with Desk)',
    monthlyRent: 1200,
    platformCommission: 60, // 5% StayNest platform fee
    landlordPayout: 1140,    // 95% net landlord payout
    paymentStatus: 'CLEARED',
    paymentMethod: 'GCash',
    moveInDate: 'Nov 1, 2026',
    voucherCode: 'STAYNEST-MH-6150',
    createdDate: 'Oct 25, 2026',
    notes: 'BSIT 3rd Year · Certificate of Registration Verified · Automated Remittance Disbursed',
  },
  {
    id: 'bk-uno-01',
    transactionCode: 'TX-BNW-2026-005',
    studentName: 'Angelo Laureta Nuer',
    studentId: '2024-0192-B',
    studentEmail: 'anuer15@adssu.edu.ph',
    studentPhone: '+63 912 345 6789',
    houseName: 'UNO Boarding House',
    landlordName: 'Rhejie Largo',
    roomName: 'Unit A (Bed space 2-Cap)',
    monthlyRent: 1300,
    platformCommission: 65, // 5% StayNest platform fee
    landlordPayout: 1235,    // 95% net landlord payout
    paymentStatus: 'CLEARED',
    paymentMethod: 'GCash',
    moveInDate: 'Nov 5, 2026',
    voucherCode: 'STAYNEST-RL-5049',
    createdDate: 'Oct 24, 2026',
    notes: 'BSIT 3rd Year · Lead Developer · Certificate of Registration Verified',
  },
  {
    id: 'bk-pend-01',
    transactionCode: 'TX-BNW-2026-006',
    studentName: 'Kean Ide',
    studentId: '2024-0311-A',
    studentEmail: 'kide@adssu.edu.ph',
    studentPhone: '+63 912 333 4455',
    houseName: 'Jiomer Dalayap Boarding House',
    landlordName: 'Jiomer Dalayap',
    roomName: 'Room 04 (Bedspace 2-Cap)',
    monthlyRent: 1200,
    platformCommission: 60, // 5% StayNest platform fee
    landlordPayout: 1140,    // 95% net landlord payout
    paymentStatus: 'PENDING',
    paymentMethod: 'Cash on Campus',
    moveInDate: 'Nov 15, 2026',
    voucherCode: 'STAYNEST-PEND-01',
    createdDate: 'Oct 29, 2026',
    notes: 'Upcoming semester reservation deposit pending move-in confirmation',
  },
];

export const INITIAL_BOOKING_REQUESTS = [
  {
    id: 'req-2026-001',
    avatar: 'KI',
    studentName: 'Kean Ide',
    studentId: '2024-0311-A',
    course: 'BSIT - 3rd Year (ADSSU)',
    status: 'PENDING',
    roomName: 'Room 01 (Bed space 4-Cap)',
    monthlyPrice: '₱1,000 / mo',
    moveInDate: 'Nov 15, 2026',
    voucherCode: 'STAYNEST-JD-9481',
    notes: 'Inquiring about move-in for mid-semester. COR already submitted for verification.',
    requestDate: 'Today · 10:30 AM',
    guardianName: 'Mr. Ide (Father)',
    guardianPhone: '+63 912 222 1100',
  },
  {
    id: 'req-2026-002',
    avatar: 'CC',
    studentName: 'Conrado Candari',
    studentId: '2024-0245-B',
    course: 'BSIT - 3rd Year (ADSSU)',
    status: 'CONFIRMED',
    roomName: 'Unit 1 (Bed space Sharing)',
    monthlyPrice: '₱1,100 / mo',
    moveInDate: 'Nov 2, 2026',
    voucherCode: 'STAYNEST-EC-8372',
    notes: 'Paid reservation deposit via GCash. Need desk space for laptop programming.',
    requestDate: 'Yesterday',
    guardianName: 'Mrs. Candari (Mother)',
    guardianPhone: '+63 918 555 6677',
  },
  {
    id: 'req-2026-003',
    avatar: 'JA',
    studentName: 'Jolina Asuncion',
    studentId: '2024-0188-C',
    course: 'BSIT - 3rd Year (ADSSU)',
    status: 'PENDING',
    roomName: 'Room A (Solo Bed space)',
    monthlyPrice: '₱1,000 / mo',
    moveInDate: 'Nov 3, 2026',
    voucherCode: 'STAYNEST-FQ-7261',
    notes: 'Requesting room near front gate. Prepared 1 month advance deposit.',
    requestDate: 'Oct 28, 2026',
    guardianName: 'Mrs. Asuncion (Mother)',
    guardianPhone: '+63 929 777 8899',
  },
  {
    id: 'req-2026-004',
    avatar: 'MD',
    studentName: 'Mary Joy Doroteo',
    studentId: '2024-0167-A',
    course: 'BSIT - 3rd Year (ADSSU)',
    status: 'CONFIRMED',
    roomName: 'Room 101 (Bed space Sharing)',
    monthlyPrice: '₱1,200 / mo',
    moveInDate: 'Nov 1, 2026',
    voucherCode: 'STAYNEST-MH-6150',
    notes: 'Move-in pass verified by ADSSU admin. Transferring from previous dorm.',
    requestDate: 'Oct 27, 2026',
    guardianName: 'Mrs. Doroteo (Mother)',
    guardianPhone: '+63 909 444 8899',
  },
  {
    id: 'req-2026-005',
    avatar: 'AN',
    studentName: 'Angelo Laureta Nuer',
    studentId: '2024-0192-B',
    course: 'BSIT - 3rd Year (ADSSU)',
    status: 'CONFIRMED',
    roomName: 'Unit A (Bed space 2-Cap)',
    monthlyPrice: '₱1,300 / mo',
    moveInDate: 'Nov 5, 2026',
    voucherCode: 'STAYNEST-RL-5049',
    notes: 'Lead Capstone Developer · Verified student tenant with official clearance pass.',
    requestDate: 'Oct 25, 2026',
    guardianName: 'Mrs. Maria Nuer (Mother)',
    guardianPhone: '+63 998 765 4321',
  },
];

export const INITIAL_LANDLORD_SUBSCRIPTION: LandlordSubscription = {
  id: 'sub-2026-001',
  landlordId: '22222222-2222-2222-2222-222222222222',
  landlordName: 'Conrado Candari',
  houseName: 'Fritzcel Boarding House',
  plan: 'ANNUAL_GOLD',
  planName: 'Landlord Annual Gold Plan',
  amount: 299,
  duration: '1 Year',
  status: 'ACTIVE',
  featuredListingsEnabled: true,
  gcashReferenceNo: '1004 8892 1102',
  receiptUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80',
  startDate: '2026-10-01',
  expiryDate: '2027-10-01',
};

export type LandlordTabType =
  | 'overview'
  | 'reservations'
  | 'rooms'
  | 'messages'
  | 'earnings'
  | 'premium'
  | 'settings';

export interface FigmaLandlordViewsProps {
  activeTab: LandlordTabType;
  onTabChange: (tab: LandlordTabType) => void;
  onLogout: () => void;
  onOpenAddRoom: () => void;
  onOpenEditRoom: (room: RoomItem) => void;
  onOpenTenant: (room: RoomItem) => void;
  rooms?: RoomItem[];
  onUpdateRooms?: (rooms: RoomItem[]) => void;
  bookings?: BookingTransaction[];
  onUpdateBookings?: (bookings: BookingTransaction[]) => void;
  subscription?: LandlordSubscription;
  onUpdateSubscription?: (sub: LandlordSubscription) => void;
  isFeaturedListing?: boolean;
  onToggleFeaturedListing?: (enabled: boolean) => void;
}

export const FigmaLandlordViews: React.FC<FigmaLandlordViewsProps> = ({
  activeTab,
  onTabChange,
  onLogout,
  onOpenAddRoom,
  onOpenEditRoom,
  onOpenTenant,
  rooms: externalRooms,
  onUpdateRooms: externalOnUpdateRooms,
  bookings: externalBookings,
  onUpdateBookings: externalOnUpdateBookings,
  subscription: externalSubscription,
  onUpdateSubscription: externalOnUpdateSubscription,
  isFeaturedListing: externalIsFeaturedListing,
  onToggleFeaturedListing: externalOnToggleFeaturedListing,
}) => {
  const [internalRooms, setInternalRooms] = useState<RoomItem[]>(INITIAL_ROOMS);
  const rooms = externalRooms || internalRooms;
  const setRooms = externalOnUpdateRooms
    ? (action: React.SetStateAction<RoomItem[]>) => {
        if (typeof action === 'function') {
          externalOnUpdateRooms(action(rooms));
        } else {
          externalOnUpdateRooms(action);
        }
      }
    : setInternalRooms;

  // Bookings / 5% Commission State
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

  // Subscription & Featured State
  const [internalSubscription, setInternalSubscription] = useState<LandlordSubscription>(INITIAL_LANDLORD_SUBSCRIPTION);
  const subscription = externalSubscription || internalSubscription;
  const setSubscription = externalOnUpdateSubscription
    ? (action: React.SetStateAction<LandlordSubscription>) => {
        if (typeof action === 'function') {
          externalOnUpdateSubscription(action(subscription));
        } else {
          externalOnUpdateSubscription(action);
        }
      }
    : setInternalSubscription;

  const [internalFeatured, setInternalFeatured] = useState<boolean>(true);
  const isFeatured = externalIsFeaturedListing !== undefined ? externalIsFeaturedListing : internalFeatured;
  const setIsFeatured = externalOnToggleFeaturedListing || setInternalFeatured;

  // GCash Manual Reference Upload State
  const [selectedPlanForUpgrade, setSelectedPlanForUpgrade] = useState<'MONTHLY_PRO' | 'ANNUAL_GOLD'>('MONTHLY_PRO');
  const [gcashRefInput, setGcashRefInput] = useState('');
  const [gcashProofUrl, setGcashProofUrl] = useState<string | null>(null);
  const [isSubmittingSubscription, setIsSubmittingSubscription] = useState(false);
  const [subscriptionSuccessNotice, setSubscriptionSuccessNotice] = useState<string | null>(null);

  // Payout Request State
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [payoutGcashNumber, setPayoutGcashNumber] = useState('+63 912 345 6789');
  const [payoutSuccessNotice, setPayoutSuccessNotice] = useState<string | null>(null);

  // Language & Translation State: 'en' (English - Default) or 'ceb' (Bisaya/Cebuano)
  const [landlordLang, setLandlordLang] = useState<'en' | 'ceb'>('en');
  const [settingsSavedSuccess, setSettingsSavedSuccess] = useState(false);


  const [announcementText, setAnnouncementText] = useState('');
  const [announcements, setAnnouncements] = useState([
    {
      id: 'ann-1',
      author: 'Conrado Candari (Landlord)',
      text: 'Advisory for all Fritzcel Tenants: Garbage collection scheduled tomorrow at 8:00 AM. Palihug ibutang sa gawas ang inyong mga trash bags.',
      time: '8:00 AM Today',
      replies: [
        { name: 'Angelo Ruiz (Room 02)', text: 'Noted sir! Naipagawas na nako amoa sa Room 02.' },
        { name: 'Mary Joy (Room 05)', text: 'Salamat sa pahibalo boss!' },
      ],
    },
    {
      id: 'ann-2',
      author: 'Conrado Candari (Landlord)',
      text: 'Water tank cleaning scheduled this Saturday 1PM to 3PM. Naay backup drums para magamit ninyo.',
      time: 'Yesterday',
      replies: [
        { name: 'TJ Pacheco (Room 06)', text: 'Copy sir Conrado, mag-pundo mi daan ug tubig.' },
      ],
    },
  ]);

  // Scheduled Ocular Visits State
  const [ocularVisits, setOcularVisits] = useState<any[]>([]);

  // Student Booking & Reservation Requests State
  const [bookingRequests, setBookingRequests] = useState<any[]>(INITIAL_BOOKING_REQUESTS);

  const handleApproveBooking = (id: string, roomName: string, studentName: string) => {
    setBookingRequests((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'CONFIRMED' } : b))
    );

    // Also update corresponding room status to occupied in landlord inventory
    setRooms((prev) =>
      prev.map((r) => {
        if (roomName.includes(r.name) || r.name.includes(roomName.split(' ')[1] || '')) {
          return {
            ...r,
            status: 'OCCUPIED',
            tenant: studentName,
            course: 'ADSSU Student',
            due: '15th of Every Month',
          };
        }
        return r;
      })
    );
  };

  const handleDeclineBooking = (id: string) => {
    setBookingRequests((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'DECLINED' } : b))
    );
  };

  // House Rules Configuration State
  const [curfewHour, setCurfewHour] = useState('10:00 PM');
  const [quietHours, setQuietHours] = useState('9:00 PM - 6:00 AM');
  const [visitorPolicy, setVisitorPolicy] = useState('Allowed in study lounge until 8:00 PM only');

  // Stats calculation
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter((r) => r.status === 'OCCUPIED').length;
  const vacantRooms = totalRooms - occupiedRooms;
  const occupancyPercentage = Math.round((occupiedRooms / totalRooms) * 100);

  // Quick toggle room status
  const handleToggleRoomStatus = (roomId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRooms((prev) =>
      prev.map((r) => {
        if (r.id === roomId) {
          const newStatus = r.status === 'OCCUPIED' ? 'VACANT' : 'OCCUPIED';
          return {
            ...r,
            status: newStatus,
            tenant: newStatus === 'OCCUPIED' ? (r.tenant || 'New Student Tenant') : undefined,
          };
        }
        return r;
      })
    );
  };

  const handlePostAnnouncement = () => {
    if (!announcementText.trim()) return;
    const newAnn = {
      id: `ann-${Date.now()}`,
      author: 'Conrado Candari (Landlord)',
      text: announcementText,
      time: 'Just now',
      replies: [],
    };
    setAnnouncements([newAnn, ...announcements]);
    setAnnouncementText('');
  };

  // Detailed Interactive Student Profile State
  const [selectedStudentProfile, setSelectedStudentProfile] = useState<{
    studentName: string;
    studentId?: string;
    course: string;
    roomAssignment: string;
    rentStatus: string;
    monthlyPrice: string;
    dueDate?: string;
    moveInDate?: string;
    ocularDate?: string;
    phone: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
      address: string;
    };
    credentials: {
      idType: string;
      idNumber: string;
      verified: boolean;
      verificationDate: string;
      corStatus: string;
    };
    voucherCode?: string;
    notes?: string;
    profileType: 'tenant' | 'reservation' | 'ocular';
    avatarInitials?: string;
  } | null>(null);

  const handleConfirmVisit = (id: string) => {
    setOcularVisits((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'CONFIRMED' } : v))
    );
  };

  const handleCompleteVisit = (id: string) => {
    setOcularVisits((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'COMPLETED' } : v))
    );
  };

  const handleRescheduleVisit = (id: string) => {
    setOcularVisits((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              date: 'Rescheduled: Sat, Nov 01 · 9:30 AM',
              status: 'CONFIRMED',
            }
          : v
      )
    );
  };

  const openStudentProfileForRoom = (room: RoomItem) => {
    setSelectedStudentProfile({
      studentName: room.tenant || 'Enrolled Student',
      studentId: '2024-ADSSU-0492',
      course: room.course || 'BSIT - 3rd Year (ADSSU)',
      roomAssignment: `${room.name} · Fritzcel Boarding House`,
      rentStatus: 'Active Enrolled Tenant · Paid this month',
      monthlyPrice: room.price || '₱1,000 / month',
      dueDate: room.due || 'Every 15th of the Month',
      phone: room.phone || '+63 912 345 6789',
      emergencyContact: {
        name: room.guardianName || 'Mrs. Maria Ruiz',
        relationship: 'Mother',
        phone: room.guardianPhone || '+63 998 765 4321',
        address: room.guardianAddress || 'Purok 2, San Francisco, Agusan del Sur',
      },
      credentials: {
        idType: 'ADSSU Institutional Student ID Card (AY 2026–2027)',
        idNumber: '2024-ADSSU-0492',
        verified: true,
        verificationDate: 'Verified by ADSSU Registrar (AY 2026)',
        corStatus: 'Verified Certificate of Registration (COR) on File',
      },
      profileType: 'tenant',
      avatarInitials: room.tenant?.substring(0, 2).toUpperCase() || 'ST',
    });
  };

  const openStudentProfileForBooking = (req: any) => {
    setSelectedStudentProfile({
      studentName: req.studentName,
      studentId: req.studentId || '2024-ADSSU-0192',
      course: req.course,
      roomAssignment: `${req.roomName} · Fritzcel Boarding House`,
      rentStatus:
        req.status === 'CONFIRMED'
          ? 'Reservation Confirmed · Move-In Pass Active'
          : 'Pending Landlord Confirmation',
      monthlyPrice: req.monthlyPrice,
      moveInDate: req.moveInDate,
      phone: req.phone || '+63 912 345 6789',
      emergencyContact: {
        name: 'Mr. & Mrs. Nuer',
        relationship: 'Parents',
        phone: '+63 917 888 9911',
        address: 'Purok 4, Poblacion, Bunawan, Agusan del Sur',
      },
      credentials: {
        idType: 'ADSSU Institutional Student ID Card (AY 2026–2027)',
        idNumber: req.studentId || '2024-ADSSU-0192',
        verified: true,
        verificationDate: 'Validated via Student Portal',
        corStatus: 'Official Registrar COR Verified',
      },
      voucherCode: req.voucherCode,
      notes: req.notes,
      profileType: 'reservation',
      avatarInitials: req.avatar || req.studentName.substring(0, 2).toUpperCase(),
    });
  };

  const openStudentProfileForOcular = (visit: any) => {
    setSelectedStudentProfile({
      studentName: visit.studentName,
      studentId: '2025-ADSSU-0881',
      course: visit.course,
      roomAssignment: `Prospective Tenant for ${visit.roomInterest}`,
      rentStatus: `Ocular Visit ${visit.status} · Move-in pending physical inspection`,
      monthlyPrice: '₱1,000 / month (Target)',
      ocularDate: visit.date,
      phone: visit.phone,
      emergencyContact: {
        name: 'Mrs. Elena Flores',
        relationship: 'Guardian',
        phone: '+63 919 555 4321',
        address: 'Purok 1, San Teodoro, Bunawan, Agusan del Sur',
      },
      credentials: {
        idType: 'ADSSU Institutional Student ID Card (AY 2026–2027)',
        idNumber: '2025-ADSSU-0881',
        verified: true,
        verificationDate: 'Verified by Student Affairs Office',
        corStatus: 'Active Student Record on File',
      },
      profileType: 'ocular',
      avatarInitials: visit.studentName.substring(0, 2).toUpperCase(),
    });
  };

  return (
    <div className="relative w-full h-full min-h-0 staynest-bg flex flex-col font-sans select-none p-3 sm:p-6 lg:p-8 space-y-6">
      {/* Ambient Liquid Glass Floating Glow Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl pointer-events-none" />

      {/* Language Switcher Bar with Liquid Glass */}
      <div className="flex items-center justify-between liquid-glass px-5 py-3.5 rounded-2xl shadow-sm relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700">Landlord Portal Language:</span>
          <div className="flex items-center bg-slate-100 border border-slate-300 rounded-xl p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setLandlordLang('en')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                landlordLang === 'en'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLandlordLang('ceb')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                landlordLang === 'ceb'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bisaya
            </button>
          </div>
        </div>

        <button
          onClick={onOpenAddRoom}
          className="px-4 py-2 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{landlordLang === 'en' ? 'Add Room' : 'Dugang Kwarto'}</span>
        </button>
      </div>

      <div className="space-y-6 flex-1">
        {/* ========================================================================= */}
        {/* VIEW A: ROOMS INVENTORY & STUDENT BOOKINGS MANAGEMENT                     */}
        {/* ========================================================================= */}
        {activeTab === 'reservations' ? (
          <div className="space-y-6">
            {/* INCOMING STUDENT ROOM BOOKING REQUESTS SECTION (Clear Liquid Glassmorphism) */}
            <div className="p-5 sm:p-6 rounded-[32px] liquid-glass border-2 border-white/90 shadow-2xl space-y-4 relative overflow-hidden text-slate-900">
              {/* Ambient liquid glow orb */}
              <div className="absolute top-4 right-4 w-48 h-48 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3 relative z-10">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center font-bold shadow-xs">
                    <Calendar className="w-5 h-5 text-[#00875A]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#053728] font-serif italic tracking-wide">
                      Incoming Student Room Reservations ({bookingRequests.filter((b) => b.status === 'PENDING').length} Pending)
                    </h3>
                    <p className="text-xs text-slate-600 font-medium">
                      Direct student room reservation requests with official StayNest Move-In passes
                    </p>
                  </div>
                </div>

                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-[#00875A] border border-emerald-300 shrink-0 shadow-2xs">
                  Zero Broker Markup
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                {bookingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-4 rounded-2xl liquid-glass-card border-2 border-emerald-200/80 space-y-3 flex flex-col justify-between shadow-md"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div
                          onClick={() => openStudentProfileForBooking(req)}
                          className="flex items-center gap-2.5 cursor-pointer group"
                          title="Click to view full verified student profile"
                        >
                          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#00875A] border border-emerald-300 font-bold text-xs flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                            {req.avatar}
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 flex items-center gap-2 transition-colors">
                              <span className="underline decoration-emerald-500/40 underline-offset-2">{req.studentName}</span>
                              <span className="text-[10px] font-mono text-emerald-700">({req.studentId})</span>
                            </h4>
                            <p className="text-[11px] text-slate-600 font-medium">{req.course}</p>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                            req.status === 'CONFIRMED'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : req.status === 'DECLINED'
                              ? 'bg-rose-100 text-rose-800 border border-rose-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {req.status}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl liquid-glass-input border border-slate-200/80 space-y-1 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-[#053728] font-bold">{req.roomName}</span>
                          <span className="text-[#00875A] font-extrabold">{req.monthlyPrice}</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-600">
                          <span>Target Move-In: <strong>{req.moveInDate}</strong></span>
                          <span className="font-mono text-[10px] text-amber-700 font-bold">{req.voucherCode}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 italic pt-1 border-t border-slate-200/60">
                          "{req.notes}"
                        </p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openStudentProfileForBooking(req)}
                          className="px-2.5 py-1 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200 cursor-pointer transition-all active:scale-95 flex items-center gap-1 shadow-2xs"
                        >
                          <Eye className="w-3 h-3 text-emerald-700" />
                          <span>View Profile</span>
                        </button>
                        <span className="text-[10px] text-slate-500 font-medium">{req.requestDate}</span>
                      </div>

                      {req.status === 'PENDING' ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleDeclineBooking(req.id)}
                            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-300 cursor-pointer transition-all active:scale-95"
                          >
                            Decline
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApproveBooking(req.id, req.roomName, req.studentName)}
                            className="px-4 py-1.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold shadow-md border border-emerald-300 cursor-pointer transition-all flex items-center gap-1 active:scale-95"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Confirm Pass & Move-In</span>
                          </button>
                        </div>
                      ) : req.status === 'CONFIRMED' ? (
                        <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-[#00875A]" />
                          <span>Reservation Confirmed & Room Reserved</span>
                        </span>
                      ) : (
                        <span className="text-xs text-rose-600 italic">Reservation Declined</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scheduled Ocular Campus Visits Section */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                    <span>Scheduled Ocular Campus Visits ({ocularVisits.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    ADSSU students registered to inspect rooms in person
                  </p>
                </div>
                <span className="text-xs text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  2 Scheduled This Week
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ocularVisits.map((visit) => (
                  <div
                    key={visit.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <div
                          onClick={() => openStudentProfileForOcular(visit)}
                          className="cursor-pointer group"
                          title="Click to view student profile"
                        >
                          <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors underline decoration-emerald-500/40 underline-offset-2">
                            {visit.studentName}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{visit.course}</p>
                        </div>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            visit.status === 'CONFIRMED'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : visit.status === 'COMPLETED'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {visit.status}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-800 font-semibold mt-1">
                        Target: {visit.roomInterest}
                      </p>
                      <p className="text-[11px] text-slate-600 mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{visit.date}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-200/60">
                      <button
                        type="button"
                        onClick={() => openStudentProfileForOcular(visit)}
                        className="py-1 px-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold hover:bg-emerald-100 flex items-center justify-center gap-1 cursor-pointer transition-all active:scale-95 shadow-2xs"
                      >
                        <Eye className="w-3 h-3 text-emerald-700" />
                        <span>View Profile</span>
                      </button>

                      {visit.status === 'PENDING' && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleConfirmVisit(visit.id)}
                            className="py-1 px-2.5 rounded-xl bg-[#00875A] text-white text-[11px] font-bold hover:bg-[#00704A] cursor-pointer transition-all active:scale-95 shadow-2xs"
                          >
                            Confirm Slot
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRescheduleVisit(visit.id)}
                            className="py-1 px-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 text-[11px] font-bold hover:bg-slate-200 cursor-pointer transition-all active:scale-95"
                          >
                            Reschedule
                          </button>
                        </>
                      )}

                      {visit.status === 'CONFIRMED' && (
                        <>
                          <button
                            type="button"
                            onClick={() => handleCompleteVisit(visit.id)}
                            className="py-1 px-2.5 rounded-xl bg-[#00875A] text-white text-[11px] font-bold hover:bg-[#00704A] cursor-pointer transition-all active:scale-95 shadow-2xs flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" />
                            <span>Mark as Completed</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRescheduleVisit(visit.id)}
                            className="py-1 px-2 rounded-xl bg-slate-100 border border-slate-300 text-slate-700 text-[11px] font-bold hover:bg-slate-200 cursor-pointer transition-all active:scale-95"
                          >
                            Reschedule
                          </button>
                        </>
                      )}

                      {visit.status === 'COMPLETED' && (
                        <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Visit Completed</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (activeTab === 'overview' || activeTab === 'rooms') ? (
          <div className="space-y-6">
            {/* DEDICATED OVERVIEW DASHBOARD METRICS & LGU PERMIT TRACKER (WHEN ON OVERVIEW TAB) */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* 1. Live Occupancy Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div className="p-4 rounded-2xl liquid-glass-card border border-emerald-500/40 shadow-sm space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      {landlordLang === 'en' ? 'Live Occupancy Rate' : 'Rate sa Nagpuyo'}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#00875A]">{occupancyPercentage}%</span>
                      <span className="text-xs font-semibold text-emerald-700">({occupiedRooms}/{totalRooms})</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      {vacantRooms} {landlordLang === 'en' ? 'rooms ready for move-in' : 'kwarto bakante'}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl liquid-glass-card border border-emerald-500/40 shadow-sm space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      {landlordLang === 'en' ? 'Active Room Listings' : 'Gipatik nga Kwarto'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{totalRooms}</span>
                    <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{landlordLang === 'en' ? 'All Listed on StayNest' : 'Makita sa Directory'}</span>
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl liquid-glass-card border border-emerald-500/40 shadow-sm space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      {landlordLang === 'en' ? 'Monthly Rent Volume' : 'Koleksyon Kada Bulan'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#053728]">₱{(occupiedRooms * 1000).toLocaleString()}.00</span>
                    <span className="text-[11px] text-slate-500 block">
                      {landlordLang === 'en' ? 'Projected student rent' : 'Gipaabot nga abang'}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl liquid-glass-card border border-emerald-500/40 shadow-sm space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                      {landlordLang === 'en' ? 'Tenant Inquiries' : 'Mga Nangutana'}
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#E5A93C]">{bookingRequests.length}</span>
                      <span className="text-xs font-semibold text-amber-700">Pending</span>
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      {ocularVisits.length} {landlordLang === 'en' ? 'scheduled visits' : 'ocular visits'}
                    </span>
                  </div>
                </div>

                {/* 2. LGU Compliance Permit Submission Tracker */}
                <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#053728] via-[#084A37] to-[#04281D] text-white shadow-xl border-2 border-emerald-500/50 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 border-b border-emerald-700/60 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-[#E5A93C]/20 border border-[#E5A93C]/60 flex items-center justify-center font-bold text-[#E5A93C] shadow-sm">
                        <ShieldCheck className="w-6 h-6 text-[#E5A93C]" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold font-serif text-[#EAA938] leading-tight">
                          {landlordLang === 'en'
                            ? 'LGU Compliance Permit Submission Tracker'
                            : 'Tracker sa mga Dokumento & Permiso sa LGU'}
                        </h3>
                        <p className="text-xs text-emerald-100/90">
                          {landlordLang === 'en'
                            ? 'Official municipal accreditation requirements for ADSSU Bunawan student housing'
                            : 'Opisyal nga mga rekisitos sa Munisipyo sa Bunawan para sa boarding house'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 font-extrabold text-xs border border-emerald-400/40 flex items-center gap-1.5 shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#E5A93C]" />
                        <span>100% LGU Accredited</span>
                      </span>
                    </div>
                  </div>

                  {/* Document Status Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
                    {/* Permit 1: Mayor's Business Permit */}
                    <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1.5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                          LGU PERMIT
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-extrabold text-[10px] border border-emerald-400/40">
                          VERIFIED & VALID
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white">Mayor's Business Permit</h4>
                      <p className="text-[11px] text-slate-200">
                        Permit No: <strong className="text-[#E5A93C] font-mono">2026-BNW-0491</strong>
                      </p>
                      <p className="text-[10px] text-emerald-200/80">Valid until: Dec 31, 2026</p>
                    </div>

                    {/* Permit 2: Fire Safety Inspection Certificate (FSIC) */}
                    <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1.5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                          FIRE SAFETY (FSIC)
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-extrabold text-[10px] border border-emerald-400/40">
                          COMPLIANT
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white">Fire Safety Inspection Cert</h4>
                      <p className="text-[11px] text-slate-200">
                        Cert No: <strong className="text-[#E5A93C] font-mono">FSIC-2026-089</strong>
                      </p>
                      <p className="text-[10px] text-emerald-200/80">BFP Bunawan Station Inspected</p>
                    </div>

                    {/* Permit 3: Real Property Land Title */}
                    <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1.5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                          LAND TITLE
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-extrabold text-[10px] border border-emerald-400/40">
                          ON FILE
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white">Proof of Ownership / Title</h4>
                      <p className="text-[11px] text-slate-200">
                        Registry: <strong className="text-[#E5A93C]">TCT # 48291-ADS</strong>
                      </p>
                      <p className="text-[10px] text-emerald-200/80">Conrado Candari (Authenticated)</p>
                    </div>

                    {/* Permit 4: Sanitary & Health Clearance */}
                    <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 space-y-1.5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                          HEALTH & SANITARY
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-extrabold text-[10px] border border-emerald-400/40">
                          PASSED
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white">Municipal Health Clearance</h4>
                      <p className="text-[11px] text-slate-200">
                        Water Test: <strong className="text-[#E5A93C]">Potable (24/7 Flow)</strong>
                      </p>
                      <p className="text-[10px] text-emerald-200/80">Bunawan MHO Verified</p>
                    </div>
                  </div>
                </div>

                {/* 3. Verified Real Bunawan Boarding Houses Showcase Grid */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#00875A] border border-emerald-300 flex items-center justify-center font-bold shadow-xs">
                        <Home className="w-5 h-5 text-[#00875A]" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 leading-tight">
                          Verified Real Boarding Houses in Bunawan ({5} Listed)
                        </h3>
                        <p className="text-xs text-slate-500">
                          Official ADSSU student accommodations with verified landlords, addresses, photos & water/curfew badges
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                      100% Verified Locations
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5">
                    {[
                      {
                        name: 'Jiomer Dalayap Boarding House',
                        owner: 'Jiomer Dalayap',
                        address: 'Purok 8, Poblacion',
                        price: '₱1,200/mo',
                        photo: '/assets/aistudio/Dalayap__Jiomer_c2096588.jpg',
                        phone: '+63 907 121 0348',
                      },
                      {
                        name: 'Cabanillia Boarding House',
                        owner: 'Elizabeth Cabanillia',
                        address: 'Toog Street, Poblacion',
                        price: '₱1,100/mo',
                        photo: '/assets/aistudio/Elizabeth_cabanillia_a5f0b13d.jpg',
                        phone: '+63 918 345 6789',
                      },
                      {
                        name: 'Flordeliza Quintas Boarding House',
                        owner: 'Flordeliza Quintas',
                        address: 'Purok 3, San Jose',
                        price: '₱1,000/mo',
                        photo: '/assets/aistudio/Flordeliza_Quintas_f9dca90f.jpg',
                        phone: '+63 929 456 7890',
                      },
                      {
                        name: "Hiponia's Boarding House",
                        owner: 'Myrna Hiponia',
                        address: 'Acacia Street, Poblacion',
                        price: '₱1,200/mo',
                        photo: '/assets/aistudio/Myrna_hiponia_0f453f79.jpg',
                        phone: '+63 909 431 2657',
                      },
                      {
                        name: 'UNO Boarding House',
                        owner: 'Rhejie Largo',
                        address: 'Purok 4, San Teodoro',
                        price: '₱1,300/mo',
                        photo: '/assets/aistudio/Rhejie_largo_uno_ca160f5d.jpg',
                        phone: '+63 930 123 4567',
                      },
                    ].map((bh, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all group"
                      >
                        <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden">
                          <img
                            src={bh.photo}
                            alt={bh.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-emerald-950/80 text-emerald-300 font-extrabold text-[10px] border border-emerald-400/40 backdrop-blur-xs">
                            {bh.price}
                          </span>
                        </div>
                        <div className="p-3 space-y-1.5 text-left">
                          <h4 className="font-bold text-xs text-slate-900 leading-snug line-clamp-1">{bh.name}</h4>
                          <p className="text-[11px] text-slate-600 font-medium leading-none">
                            Landlord: <strong className="text-emerald-900">{bh.owner}</strong>
                          </p>
                          <p className="text-[10px] text-slate-500 truncate flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                            <span>{bh.address}</span>
                          </p>
                          <div className="flex flex-wrap items-center gap-1 pt-1">
                            <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[9px] font-bold border border-emerald-200 flex items-center gap-0.5">
                              <Droplets className="w-2.5 h-2.5" /> 24/7 Water
                            </span>
                            <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[9px] font-bold border border-amber-200 flex items-center gap-0.5">
                              <Clock className="w-2.5 h-2.5" /> 10 PM Curfew
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Older-Friendly Helper Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border-2 border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                  <HelpCircle className="w-5 h-5 text-amber-900" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-amber-950">
                    {landlordLang === 'en'
                      ? 'Landlord Management Guide (Senior-Friendly Flow)'
                      : 'Giya para sa Tag-iya sa Kwarto (Senior-Friendly Flow)'}
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-900/90 mt-0.5">
                    {landlordLang === 'en' ? (
                      <>
                        Simple and clear: Tap the big action button to switch room status (
                        <strong>Vacant</strong> or <strong>Occupied</strong>). Tap{' '}
                        <strong>"Change Photo & Price"</strong> to upload room pictures or edit rates.
                      </>
                    ) : (
                      <>
                        Dali ug klaro: Pindota ang dako nga buton para ilisan ang status (
                        <strong>Bakante</strong> o <strong>Naay Nagpuyo</strong>). Pindota ang{' '}
                        <strong>"Bag-ohon ang Litrato & Presyo"</strong> aron mag-upload ug bag-ong litrato sa kwarto.
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold bg-white px-3 py-1.5 rounded-xl border border-amber-300 text-emerald-800">
                  {vacantRooms} {landlordLang === 'en' ? 'Vacant' : 'Bakante'}
                </span>
                <span className="text-xs font-bold bg-white px-3 py-1.5 rounded-xl border border-amber-300 text-slate-700">
                  {occupiedRooms} {landlordLang === 'en' ? 'Occupied' : 'Naay Nagpuyo'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {rooms.map((room) => {
                const isOccupied = room.status === 'OCCUPIED';
                return (
                  <div
                    key={room.id}
                    className={`liquid-glass-card rounded-3xl border-2 overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between ${
                      isOccupied ? 'border-slate-300/80' : 'border-emerald-500/80 ring-4 ring-emerald-500/10'
                    }`}
                  >
                    <div>
                      {/* Room Photo & Badges */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                        <img
                          src={room.image || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80'}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80';
                          }}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                        {/* Top Large Status Badge */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span
                            className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 ${
                              isOccupied
                                ? 'bg-slate-900 text-white border-2 border-slate-700'
                                : 'bg-emerald-600 text-white border-2 border-emerald-400'
                            }`}
                          >
                            {isOccupied ? (
                              <>
                                <User className="w-3.5 h-3.5" />
                                <span>
                                  {landlordLang === 'en'
                                    ? 'OCCUPIED (STUDENT RENTING)'
                                    : 'NAAY NAGPUYO (OCCUPIED)'}
                                </span>
                              </>
                            ) : (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>
                                  {landlordLang === 'en'
                                    ? 'VACANT (READY FOR RENT)'
                                    : 'BAKANTE PA (READY FOR RENT)'}
                                </span>
                              </>
                            )}
                          </span>

                          <button
                            type="button"
                            onClick={() => onOpenEditRoom(room)}
                            className="px-3 py-1.5 rounded-full bg-white text-slate-900 font-bold text-xs shadow-md border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800 transition-colors cursor-pointer flex items-center gap-1"
                            title={
                              landlordLang === 'en'
                                ? 'Edit Room Details & Photo'
                                : 'I-edit ang Detalye ug Litrato'
                            }
                          >
                            <Edit className="w-3.5 h-3.5 text-emerald-700" />
                            <span>
                              {landlordLang === 'en' ? 'Edit Room Details & Photo' : 'I-edit ang Detalye ug Litrato'}
                            </span>
                          </button>
                        </div>

                        {/* Bottom Photo Overlay Info */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                          <div>
                            <span className="text-base sm:text-lg font-black block drop-shadow-md">
                              {room.name}
                            </span>
                            <span className="text-xs text-slate-100 font-medium">
                              {room.type}
                            </span>
                          </div>
                          <span className="px-3 py-1.5 rounded-xl bg-[#00875A] text-white font-black text-sm sm:text-base shadow-md border border-emerald-400">
                            {room.price}
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-4 sm:p-5 space-y-3.5">
                        {isOccupied ? (
                          <div className="p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                              {landlordLang === 'en'
                                ? 'Current Enrolled Tenant:'
                                : 'Mao kini ang Estudyante nga Nag-abang:'}
                            </span>
                            <div className="flex items-center justify-between gap-2">
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openStudentProfileForRoom(room);
                                }}
                                className="cursor-pointer group"
                                title="Click to view full verified student profile"
                              >
                                <p className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 flex items-center gap-1.5 transition-colors">
                                  <User className="w-4 h-4 text-emerald-700 shrink-0" />
                                  <span className="underline decoration-emerald-500/40 underline-offset-2">{room.tenant}</span>
                                </p>
                                <p className="text-xs text-slate-600 mt-0.5">
                                  {room.course || 'ADSSU Student'} ·{' '}
                                  {landlordLang === 'en' ? 'Rent Due:' : 'Abang Due:'}{' '}
                                  <strong>{room.due || 'Every 15th'}</strong>
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openStudentProfileForRoom(room);
                                }}
                                className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer transition-all active:scale-95 shadow-2xs"
                              >
                                <Eye className="w-3.5 h-3.5 text-emerald-700" />
                                <span>{landlordLang === 'en' ? 'View Profile' : 'Tan-awa ang Profile'}</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3.5 rounded-2xl bg-emerald-50/80 border-2 border-emerald-300 space-y-1">
                            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                              {landlordLang === 'en'
                                ? 'STATUS: VACANT & READY'
                                : 'STATUS: BAKANTE PA KARON'}
                            </span>
                            <p className="text-sm text-emerald-950 font-bold">
                              {landlordLang === 'en'
                                ? 'Ready for immediate move-in by ADSSU Bunawan students'
                                : 'Andam na kapuy-an sa estudyante sa ADSSU Bunawan'}
                            </p>
                            <p className="text-xs text-emerald-800">
                              {landlordLang === 'en'
                                ? 'Published live on the StayNest campus boarding house directory.'
                                : 'Makita kini dayon sa mga estudyante sa ilang StayNest app.'}
                            </p>
                          </div>
                        )}

                        {/* Inclusions Chips - Clean without raw emoji */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {room.inclusions.map((inc, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700 border border-slate-200 flex items-center gap-1"
                            >
                              <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                              <span>{inc}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Actions Footer - Older-Friendly Big Buttons */}
                    <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex flex-col sm:flex-row items-stretch gap-2.5">
                      {/* Big Room Status Toggle Button */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleRoomStatus(room.id, e)}
                        className={`flex-1 py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] ${
                          isOccupied
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-300'
                            : 'bg-emerald-700 hover:bg-emerald-800 text-white border-2 border-emerald-600 shadow-sm'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        <span>
                          {isOccupied
                            ? landlordLang === 'en'
                              ? 'Set to "Vacant" (Mark Available)'
                              : 'Ilisan ug "Bakante" (Walay Nagpuyo)'
                            : landlordLang === 'en'
                            ? 'Set to "Occupied" (Mark Taken)'
                            : 'Ilisan ug "Naay Nagpuyo" (Occupied)'}
                        </span>
                      </button>

                      {/* Explicit Photo & Price Edit Button */}
                      <button
                        type="button"
                        onClick={() => onOpenEditRoom(room)}
                        className="py-3 px-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-[0.98]"
                      >
                        <Edit className="w-4 h-4 text-emerald-700" />
                        <span>
                          {landlordLang === 'en'
                            ? 'Edit Room Details & Photo'
                            : 'I-edit ang Detalye ug Litrato'}
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* ========================================================================= */}
        {/* VIEW B: STUDENT TENANTS & OCULAR VISITS                                   */}
        {/* ========================================================================= */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            {/* Ocular Visits Scheduled Section */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-700" />
                    <span>Scheduled Ocular Campus Visits ({ocularVisits.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    ADSSU students registered to inspect rooms in person
                  </p>
                </div>
                <span className="text-xs text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  2 Scheduled This Week
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ocularVisits.map((visit) => (
                  <div
                    key={visit.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <button
                          type="button"
                          onClick={() => openStudentProfileForOcular(visit)}
                          className="text-left font-bold text-xs text-slate-900 hover:text-[#00875A] hover:underline cursor-pointer"
                        >
                          {visit.studentName}
                        </button>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            visit.status === 'CONFIRMED'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : visit.status === 'COMPLETED'
                              ? 'bg-slate-200 text-slate-700 border border-slate-300'
                              : 'bg-amber-100 text-amber-800 border border-amber-300'
                          }`}
                        >
                          {visit.status === 'COMPLETED' ? 'COMPLETED' : visit.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{visit.course}</p>
                      <p className="text-xs text-emerald-800 font-semibold mt-1">
                        Target: {visit.roomInterest}
                      </p>
                      <p className="text-[11px] text-slate-600 mt-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{visit.date}</span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60">
                      <button
                        type="button"
                        onClick={() => openStudentProfileForOcular(visit)}
                        className="py-1.5 px-3 rounded-xl bg-white border border-emerald-300 text-[#00875A] text-xs font-bold hover:bg-emerald-50 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Profile</span>
                      </button>
                      {visit.status === 'PENDING' && (
                        <button
                          type="button"
                          onClick={() => handleConfirmVisit(visit.id)}
                          className="py-1.5 px-3 rounded-xl bg-[#00875A] text-white text-xs font-bold hover:bg-[#00704A] cursor-pointer transition-colors"
                        >
                          Confirm Slot
                        </button>
                      )}
                      {visit.status !== 'COMPLETED' ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleRescheduleVisit(visit.id)}
                            className="py-1.5 px-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-100 cursor-pointer transition-colors"
                          >
                            Reschedule
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCompleteVisit(visit.id)}
                            className="py-1.5 px-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-emerald-50 hover:text-emerald-800 cursor-pointer transition-colors"
                          >
                            Mark as Completed
                          </button>
                        </>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-500 italic py-1">
                          Visit Completed & Room Toured
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Current Enrolled Tenants Directory */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-700" />
                <span>Current Boarding House Student Tenants ({occupiedRooms})</span>
              </h3>

              <div className="overflow-x-auto w-full max-w-full rounded-2xl border border-slate-200">
                <table className="w-full min-w-[620px] text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                    <tr>
                      <th className="p-3">Tenant & Course</th>
                      <th className="p-3">Assigned Room</th>
                      <th className="p-3">Rent Due Date</th>
                      <th className="p-3">Guardian Contact</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rooms
                      .filter((r) => r.status === 'OCCUPIED')
                      .map((room) => (
                        <tr key={room.id} className="hover:bg-slate-50/80">
                          <td className="p-3 font-semibold text-slate-900">
                            <button
                              type="button"
                              onClick={() => openStudentProfileForRoom(room)}
                              className="text-left font-bold text-slate-900 hover:text-[#00875A] hover:underline cursor-pointer block"
                            >
                              {room.tenant}
                            </button>
                            <span className="block text-[11px] font-normal text-slate-500">
                              {room.course || 'ADSSU Student'}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-emerald-800">{room.name}</td>
                          <td className="p-3 text-slate-600">{room.due || '20th of the Month'}</td>
                          <td className="p-3 text-slate-600">
                            {room.guardianName || 'Guardian on Record'}
                            <span className="block text-[10px] text-slate-400">
                              {room.guardianPhone || '+63 912 000 0000'}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => openStudentProfileForRoom(room)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs cursor-pointer inline-flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View Profile</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW C: TENANT BULLETIN & HOUSE RULES                                     */}
        {/* ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Broadcast Announcement */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-emerald-700" />
                    <span>Broadcast Announcement to All Tenants</span>
                  </h3>
                  <span className="text-[10px] text-slate-400">Instant in-app notice</span>
                </div>

                <div className="space-y-3">
                  <textarea
                    rows={3}
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    placeholder="Type an announcement for all students (e.g., Water supply advisory, curfew reminder, inspection schedule)..."
                    className="w-full p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-800 bg-slate-50 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handlePostAnnouncement}
                      className="px-4 py-2 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Post to Tenants</span>
                    </button>
                  </div>
                </div>

                {/* Announcement Feed */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Recent Bulletins ({announcements.length})
                  </h4>

                  {announcements.map((ann) => (
                    <div
                      key={ann.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-900">{ann.author}</span>
                        <span className="text-[10px] text-slate-400">{ann.time}</span>
                      </div>
                      <p className="text-xs text-slate-800 leading-relaxed">{ann.text}</p>

                      {ann.replies.length > 0 && (
                        <div className="space-y-1.5 pt-2 border-t border-slate-200/60 pl-3">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            Tenant Acknowledgments:
                          </span>
                          {ann.replies.map((reply, idx) => (
                            <div key={idx} className="text-[11px] text-slate-600">
                              <strong className="text-slate-800">{reply.name}:</strong> "{reply.text}"
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Language Preferences & Curfew Rules */}
            <div className="space-y-6">
              {/* Language Preferences Card (English Default vs Bisaya) */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span>Language / Pinulongan</span>
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {landlordLang === 'en' ? 'English Active' : 'Binisaya Aktibo'}
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  Switch the landlord interface between standard English and senior-friendly Bisaya (Cebuano).
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setLandlordLang('en');
                      setSettingsSavedSuccess(true);
                      setTimeout(() => setSettingsSavedSuccess(false), 3000);
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      landlordLang === 'en'
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">English</span>
                      {landlordLang === 'en' && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                    </div>
                    <span className="text-[10px] text-slate-500 block">Default / Official</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLandlordLang('ceb');
                      setSettingsSavedSuccess(true);
                      setTimeout(() => setSettingsSavedSuccess(false), 3000);
                    }}
                    className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                      landlordLang === 'ceb'
                        ? 'border-emerald-600 bg-emerald-50/60 shadow-xs ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">Bisaya</span>
                      {landlordLang === 'ceb' && <Check className="w-3.5 h-3.5 text-emerald-700" />}
                    </div>
                    <span className="text-[10px] text-slate-500 block">Senior Friendly</span>
                  </button>
                </div>
              </div>

              {/* House Rules & Curfew Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-700" />
                  <span>
                    {landlordLang === 'en'
                      ? 'Bunawan House Rules & Curfew'
                      : 'Balaod sa Boarding House & Curfew'}
                  </span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                      {landlordLang === 'en'
                        ? 'Main Gate Curfew Lock Time'
                        : 'Oras sa Pagtrangka sa Gate'}
                    </label>
                    <input
                      type="text"
                      value={curfewHour}
                      onChange={(e) => setCurfewHour(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                      {landlordLang === 'en' ? 'Quiet Study Hours' : 'Oras sa Hilum / Pagtuon'}
                    </label>
                    <input
                      type="text"
                      value={quietHours}
                      onChange={(e) => setQuietHours(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">
                      {landlordLang === 'en' ? 'Outside Visitors Policy' : 'Balaod sa mga Bisita'}
                    </label>
                    <input
                      type="text"
                      value={visitorPolicy}
                      onChange={(e) => setVisitorPolicy(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-slate-50"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
                    <strong className="block font-bold">LGU Bunawan Ordinance No. 2024-11:</strong>
                    <span>
                      Boarding houses must maintain an active logbook for student curfews and fire safety clearances.
                    </span>
                  </div>

                  {settingsSavedSuccess && (
                    <div className="p-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm">
                      <Check className="w-4 h-4" />
                      <span>
                        {landlordLang === 'en'
                          ? 'Settings updated successfully!'
                          : 'Malampusong nabag-o ang mga setting!'}
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setSettingsSavedSuccess(true);
                      setTimeout(() => setSettingsSavedSuccess(false), 3000);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    {landlordLang === 'en' ? 'Save Landlord Rules' : 'I-save ang mga Balaod'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW D: EARNINGS & 5% COMMISSION PAYOUT LEDGER                            */}
        {/* ========================================================================= */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            {/* Header & Metric Cards */}
            {(() => {
              const totalGross = bookings.reduce((acc, b) => acc + b.monthlyRent, 0);
              const totalCommission = bookings.reduce((acc, b) => acc + b.platformCommission, 0);
              const netPayout = bookings.reduce((acc, b) => acc + b.landlordPayout, 0);
              const clearedPayout = bookings.filter((b) => b.paymentStatus === 'CLEARED').reduce((acc, b) => acc + b.landlordPayout, 0);
              const pendingPayout = bookings.filter((b) => b.paymentStatus === 'PENDING').reduce((acc, b) => acc + b.landlordPayout, 0);

              return (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl liquid-glass-card border border-emerald-500/40 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Total Rental Volume
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#053728]">
                        ₱{totalGross.toLocaleString()}.00
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {bookings.length} student booking transactions
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl liquid-glass-card border border-amber-500/40 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                        StayNest 5% Platform Fee
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#E5A93C]">
                        - ₱{totalCommission.toLocaleString()}.00
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        Transparent safety & server maintenance
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl liquid-glass-card border border-emerald-500/60 shadow-md space-y-1 bg-emerald-50/50">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#00875A] block">
                        Net Cleared Landlord Payout
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#00875A]">
                        ₱{clearedPayout.toLocaleString()}.00
                      </span>
                      <span className="text-[11px] text-emerald-700 font-medium block">
                        95% net remittance ready for withdrawal
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl liquid-glass-card border border-slate-300 shadow-sm space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                        Pending Tenant Collections
                      </span>
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-700">
                        ₱{pendingPayout.toLocaleString()}.00
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {bookings.filter((b) => b.paymentStatus === 'PENDING').length} reservations pending move-in
                      </span>
                    </div>
                  </div>

                  {/* Payout Action & Ledger Table Card */}
                  <div className="p-5 sm:p-6 rounded-[32px] liquid-glass border-2 border-white/90 shadow-2xl space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                      <div>
                        <h3 className="text-lg font-bold text-[#053728] font-serif italic tracking-wide flex items-center gap-2">
                          <Receipt className="w-5 h-5 text-[#00875A]" />
                          <span>Official 5% Commission & Payout Ledger</span>
                        </h3>
                        <p className="text-xs text-slate-600">
                          Automated deduction of 5% platform fee with verified transaction vouchers
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setShowPayoutModal(true)}
                          className="px-4 py-2.5 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white text-xs font-bold flex items-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer"
                        >
                          <Wallet className="w-4 h-4 text-amber-300" />
                          <span>Request GCash Payout</span>
                        </button>
                      </div>
                    </div>

                    {payoutSuccessNotice && (
                      <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#00875A]" />
                        <span>{payoutSuccessNotice}</span>
                      </div>
                    )}

                    {/* Ledger Table */}
                    <div className="overflow-x-auto w-full max-w-full rounded-2xl border border-slate-200">
                      <table className="w-full min-w-[680px] sm:min-w-[760px] text-left text-xs">
                        <thead className="bg-slate-50">
                          <tr className="border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider font-bold">
                            <th className="pb-3 pt-3 px-3">Transaction</th>
                            <th className="pb-3 pt-3 px-3">Student Tenant</th>
                            <th className="pb-3 pt-3 px-3">Room</th>
                            <th className="pb-3 pt-3 px-3 text-right">Gross Rent</th>
                            <th className="pb-3 pt-3 px-3 text-right">5% StayNest Fee</th>
                            <th className="pb-3 pt-3 px-3 text-right">Net Payout</th>
                            <th className="pb-3 pt-3 px-3 text-center">Payment</th>
                            <th className="pb-3 pt-3 px-3 text-center">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {bookings.map((b) => (
                            <tr key={b.id} className="hover:bg-emerald-50/40 transition-colors">
                              <td className="py-3.5 px-3">
                                <span className="font-mono text-[11px] font-bold text-slate-800 block">
                                  {b.transactionCode}
                                </span>
                                <span className="text-[10px] text-slate-400">{b.createdDate}</span>
                              </td>
                              <td className="py-3.5 px-3">
                                <span className="font-bold text-slate-900 block">{b.studentName}</span>
                                <span className="text-[10px] font-mono text-emerald-700">{b.studentId}</span>
                              </td>
                              <td className="py-3.5 px-3">
                                <span className="text-slate-800 font-medium block truncate max-w-[160px]">
                                  {b.roomName}
                                </span>
                                <span className="text-[10px] text-slate-500">Move-in: {b.moveInDate}</span>
                              </td>
                              <td className="py-3.5 px-3 text-right font-semibold text-slate-900">
                                ₱{b.monthlyRent.toLocaleString()}.00
                              </td>
                              <td className="py-3.5 px-3 text-right font-semibold text-amber-700">
                                - ₱{b.platformCommission.toLocaleString()}.00
                              </td>
                              <td className="py-3.5 px-3 text-right font-extrabold text-[#00875A]">
                                ₱{b.landlordPayout.toLocaleString()}.00
                              </td>
                              <td className="py-3.5 px-3 text-center">
                                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[10px] border border-slate-200">
                                  {b.paymentMethod}
                                </span>
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
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW E: UPGRADE TO PREMIUM & FEATURED LISTINGS                            */}
        {/* ========================================================================= */}
        {activeTab === 'premium' && (
          <div className="space-y-6">
            {/* Current Tier & Featured Listing Status Banner */}
            <div className="p-6 rounded-[32px] liquid-glass border-2 border-white/90 shadow-2xl relative overflow-hidden space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shadow-lg border border-amber-300">
                    <Crown className="w-6 h-6 fill-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-[#053728] font-serif italic">
                        {subscription.planName}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#00875A] border border-emerald-300 text-[10px] font-black uppercase">
                        {subscription.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Registered Landlord: <strong>Conrado Candari</strong> · Fritzcel Boarding House (Valid until {subscription.expiryDate})
                    </p>
                  </div>
                </div>

                {/* Featured Listings Toggle */}
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/90 flex items-center justify-between gap-4 shadow-sm">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                      <Crown className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                      <span>Featured Listings Pinning</span>
                    </span>
                    <span className="text-[11px] text-amber-800 block">
                      Pin Fritzcel Boarding House to top of ADSSU student search
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsFeatured(!isFeatured)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ${
                      isFeatured ? 'bg-[#00875A] justify-end' : 'bg-slate-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-white shadow-md transform transition-transform" />
                  </button>
                </div>
              </div>

              {isFeatured && (
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00875A] shrink-0" />
                  <span>
                    Your property <strong>Fritzcel Boarding House</strong> is currently active as <strong>FEATURED</strong> and pinned to the top of all ADSSU student search results!
                  </span>
                </div>
              )}
            </div>

            {/* Subscription Pricing Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Tier 1: Free Starter */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Starter Plan
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-slate-900">₱0</span>
                    <span className="text-xs text-slate-500">/ forever</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Standard LGU Bunawan accreditation listing for single property owners.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>1 Active Boarding House</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Direct student messaging</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Standard search directory</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  disabled
                  className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-400 text-xs font-bold cursor-not-allowed"
                >
                  Included with LGU Permit
                </button>
              </div>

              {/* Tier 2: Landlord Pro Monthly */}
              <div className={`p-6 rounded-3xl bg-white border-2 shadow-lg space-y-4 flex flex-col justify-between relative ${
                selectedPlanForUpgrade === 'MONTHLY_PRO' ? 'border-[#00875A] ring-2 ring-emerald-500/20' : 'border-slate-200'
              }`}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#00875A] block">
                      Landlord Pro Monthly
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-[#00875A] text-[10px] font-bold">
                      Most Flexible
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-[#053728]">₱49</span>
                    <span className="text-xs text-slate-500">/ month</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Ideal for landlords seeking high student occupancy and inquiry analytics.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#00875A] shrink-0" />
                      <span>Unlimited Room Options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#00875A] shrink-0" />
                      <span>Real-time Student View Analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#00875A] shrink-0" />
                      <span>Verified Landlord Pro Badge</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#00875A] shrink-0" />
                      <span>Priority Tenant Inquiries Chat</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPlanForUpgrade('MONTHLY_PRO')}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-sm ${
                    selectedPlanForUpgrade === 'MONTHLY_PRO'
                      ? 'bg-[#00875A] text-white hover:bg-[#00704A]'
                      : 'bg-emerald-50 text-[#00875A] hover:bg-emerald-100'
                  }`}
                >
                  {selectedPlanForUpgrade === 'MONTHLY_PRO' ? 'Selected Plan (₱49)' : 'Choose Pro Monthly'}
                </button>
              </div>

              {/* Tier 3: Landlord Annual Gold */}
              <div className={`p-6 rounded-3xl bg-gradient-to-b from-amber-50/60 to-white border-2 shadow-xl space-y-4 flex flex-col justify-between relative overflow-hidden ${
                selectedPlanForUpgrade === 'ANNUAL_GOLD' ? 'border-[#E5A93C] ring-2 ring-amber-400/30' : 'border-amber-200'
              }`}>
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#E5A93C] to-amber-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl shadow-xs">
                  Save 50%
                </div>

                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                    Landlord Annual Gold
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-[#053728]">₱299</span>
                    <span className="text-xs text-slate-500">/ 12 months</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Full featured listing boost + top search ranking all year long.
                  </p>
                  <ul className="space-y-2 text-xs text-slate-800 pt-2 border-t border-amber-200/60 font-medium">
                    <li className="flex items-center gap-2">
                      <Crown className="w-4 h-4 text-amber-600 fill-amber-600 shrink-0" />
                      <span><strong>Pinned 'Featured' Badge</strong> on search</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#00875A] shrink-0" />
                      <span>Everything in Pro Plan Included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#00875A] shrink-0" />
                      <span>Direct SMS Move-In Alerts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#00875A] shrink-0" />
                      <span>Zero Interruption for Academic Year</span>
                    </li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPlanForUpgrade('ANNUAL_GOLD')}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all cursor-pointer shadow-sm ${
                    selectedPlanForUpgrade === 'ANNUAL_GOLD'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700'
                      : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                  }`}
                >
                  {selectedPlanForUpgrade === 'ANNUAL_GOLD' ? 'Selected Gold (₱299)' : 'Choose Gold Annual'}
                </button>
              </div>
            </div>

            {/* Manual GCash Reference Upload for MVP Verification */}
            <div className="p-6 rounded-[32px] liquid-glass border-2 border-white/90 shadow-2xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
                <div>
                  <h3 className="text-base font-bold text-[#053728] font-serif italic flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-[#00875A]" />
                    <span>GCash Payment Verification (MVP Manual Reference)</span>
                  </h3>
                  <p className="text-xs text-slate-600">
                    Send the subscription fee (₱{selectedPlanForUpgrade === 'MONTHLY_PRO' ? '49' : '299'}) to our official StayNest GCash merchant account and input the 13-digit reference code.
                  </p>
                </div>

                <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
                  GCash: 0912 345 6789
                </span>
              </div>

              {subscriptionSuccessNotice && (
                <div className="p-3.5 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00875A] shrink-0" />
                  <span>{subscriptionSuccessNotice}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: GCash Account Details Card */}
                <div className="p-4 rounded-2xl bg-[#005CE6]/10 border border-[#005CE6]/30 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#005CE6] text-white flex items-center justify-center font-bold text-xs">
                      G
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#005CE6] block">StayNest Agusan del Sur Merchant</span>
                      <span className="text-[11px] text-slate-600">Official Municipal Portal Account</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Account Name:</span>
                      <span className="font-bold text-slate-900">StayNest ADSSU Platform</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">GCash Mobile:</span>
                      <span className="font-mono font-bold text-[#005CE6]">0912 345 6789</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-100 pt-1">
                      <span className="text-slate-500">Amount Due:</span>
                      <span className="font-bold text-[#00875A]">₱{selectedPlanForUpgrade === 'MONTHLY_PRO' ? '49.00' : '299.00'}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Reference Input & Receipt Upload */}
                <div className="space-y-3.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                      GCash Reference Number (13 Digits)
                    </label>
                    <input
                      type="text"
                      value={gcashRefInput}
                      onChange={(e) => setGcashRefInput(e.target.value)}
                      placeholder="e.g. 1004 8892 1102"
                      className="w-full px-4 py-2.5 rounded-xl liquid-glass-input text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-[#00875A]"
                    />
                  </div>

                  {/* Fast-Fill & 1-Tap Activate Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setGcashRefInput(`1004 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`);
                        setGcashProofUrl('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200 cursor-pointer transition-all active:scale-95"
                    >
                      Autofill Sample GCash Receipt
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const sampleRef = `1004 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
                        setGcashRefInput(sampleRef);
                        const updated: LandlordSubscription = {
                          ...subscription,
                          plan: 'ANNUAL_GOLD',
                          planName: 'Landlord Annual Gold Plan',
                          amount: 299,
                          duration: '1 Year',
                          status: 'ACTIVE',
                          featuredListingsEnabled: true,
                          gcashReferenceNo: sampleRef,
                          startDate: '2026-11-08',
                          expiryDate: '2027-11-08',
                        };
                        setSubscription(updated);
                        setIsFeatured(true);
                        setSubscriptionSuccessNotice('1-Tap Checkout Complete! Landlord Annual Gold (₱299/yr) is now ACTIVE with 1-Year renewal tracker set to Nov 08, 2027.');
                        setTimeout(() => setSubscriptionSuccessNotice(null), 5000);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] font-bold border border-amber-400 cursor-pointer transition-all active:scale-95 shadow-2xs flex items-center gap-1"
                    >
                      <Crown className="w-3 h-3 fill-white" />
                      <span>Instant Activate Gold (₱299/yr)</span>
                    </button>
                    {gcashProofUrl && (
                      <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Receipt Attached</span>
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    disabled={isSubmittingSubscription}
                    onClick={() => {
                      if (!gcashRefInput.trim()) {
                        alert('Please enter your GCash reference number first.');
                        return;
                      }
                      setIsSubmittingSubscription(true);
                      setTimeout(() => {
                        setIsSubmittingSubscription(false);
                        const isGold = selectedPlanForUpgrade === 'ANNUAL_GOLD';
                        const updated: LandlordSubscription = {
                          ...subscription,
                          plan: selectedPlanForUpgrade,
                          planName: isGold ? 'Landlord Annual Gold Plan' : 'Landlord Pro Monthly Plan',
                          amount: isGold ? 299 : 49,
                          duration: isGold ? '1 Year' : '1 Month',
                          status: 'ACTIVE',
                          featuredListingsEnabled: true,
                          gcashReferenceNo: gcashRefInput.trim(),
                          receiptUrl: gcashProofUrl || undefined,
                          startDate: '2026-11-01',
                          expiryDate: isGold ? '2027-11-01' : '2026-12-01',
                        };
                        setSubscription(updated);
                        setIsFeatured(true);
                        setSubscriptionSuccessNotice(`Success! Upgraded to ${updated.planName}. Your property is now FEATURED with unlimited room options.`);
                        setTimeout(() => setSubscriptionSuccessNotice(null), 5000);
                      }, 700);
                    }}
                    className="w-full py-3 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                    <span>{isSubmittingSubscription ? 'Submitting GCash Proof...' : 'Submit GCash Reference for Verification'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Payout Request Modal with Responsive Mobile Framing & Sticky Action Footer */}
      {showPayoutModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="w-[92vw] max-w-md max-h-[85vh] rounded-3xl p-4 sm:p-6 bg-white shadow-2xl border border-slate-200 flex flex-col my-auto overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#00875A] flex items-center justify-center">
                  <Wallet className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Request GCash Remittance</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPayoutModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 cursor-pointer transition-all active:scale-95"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 py-3 flex-1 overflow-y-auto">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1 text-xs">
                <span className="text-slate-600 block">Available Cleared Balance (95% Net):</span>
                <span className="text-2xl font-extrabold text-[#00875A] block">
                  ₱{bookings.filter((b) => b.paymentStatus === 'CLEARED').reduce((acc, b) => acc + b.landlordPayout, 0).toLocaleString()}.00
                </span>
                <span className="text-[10px] text-emerald-800">StayNest 5% commission has already been cleanly deducted.</span>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Landlord GCash Mobile Number
                </label>
                <input
                  type="text"
                  value={payoutGcashNumber}
                  onChange={(e) => setPayoutGcashNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-[#00875A]"
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white pt-3 pb-1 border-t border-slate-100 flex flex-col sm:flex-row gap-2 shrink-0 z-10">
              <button
                type="button"
                onClick={() => {
                  setShowPayoutModal(false);
                  setPayoutSuccessNotice(`Payout request of ₱${bookings.filter((b) => b.paymentStatus === 'CLEARED').reduce((acc, b) => acc + b.landlordPayout, 0).toLocaleString()}.00 dispatched to ${payoutGcashNumber}. Admin will clear remittance within 2 hours.`);
                  setTimeout(() => setPayoutSuccessNotice(null), 5000);
                }}
                className="flex-1 py-3 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs shadow-md cursor-pointer transition-all active:scale-95"
              >
                Confirm GCash Disbursal
              </button>
              <button
                type="button"
                onClick={() => setShowPayoutModal(false)}
                className="px-4 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold cursor-pointer transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* ========================================================================= */}
      {/* DETAILED INTERACTIVE STUDENT PROFILE MODAL                                */}
      {/* ========================================================================= */}
      {selectedStudentProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col font-sans max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Emerald Header */}
            <div className="bg-gradient-to-r from-[#053728] via-[#00875A] to-[#0A4F38] text-white p-5 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white backdrop-blur-xs">
                  <GraduationCap className="w-5 h-5 text-emerald-200" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-black tracking-tight leading-none text-white">
                      ADSSU Student Dossier & Verification
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-200 border border-emerald-300/30">
                      Verified
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-100/90 font-medium mt-1">
                    StayNest Official University Residence Record
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStudentProfile(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              {/* Student Identification Banner */}
              <div className="p-4 rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-[#00875A] text-white font-black text-lg flex items-center justify-center shadow-md border-2 border-white ring-2 ring-emerald-400/40">
                      {selectedStudentProfile.avatarInitials ||
                        selectedStudentProfile.studentName.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white shadow-xs">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900 leading-tight">
                      {selectedStudentProfile.studentName}
                    </h4>
                    <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5 mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{selectedStudentProfile.course}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-mono text-[10px] font-bold text-slate-600 bg-slate-200/80 px-2 py-0.5 rounded-md">
                        ID: {selectedStudentProfile.studentId || '2024-ADSSU-0492'}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                        Enrolled AY 2026–2027
                      </span>
                    </div>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <span
                    className={`inline-block text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${
                      selectedStudentProfile.profileType === 'tenant'
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : selectedStudentProfile.profileType === 'reservation'
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : 'bg-blue-100 text-blue-900 border-blue-300'
                    }`}
                  >
                    {selectedStudentProfile.profileType === 'tenant'
                      ? 'ACTIVE TENANT'
                      : selectedStudentProfile.profileType === 'reservation'
                      ? 'PENDING RESERVATION'
                      : 'OCULAR VISITOR'}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Bunawan Campus, Agusan del Sur
                  </p>
                </div>
              </div>

              {/* Room Assignment & Rent Status Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                  <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-1">
                    <DoorClosed className="w-3 h-3 text-emerald-600" />
                    <span>Room Assignment</span>
                  </span>
                  <p className="text-xs font-bold text-slate-900">
                    {selectedStudentProfile.roomAssignment}
                  </p>
                  <p className="text-[11px] font-extrabold text-[#00875A]">
                    {selectedStudentProfile.monthlyPrice}
                  </p>
                  {selectedStudentProfile.voucherCode && (
                    <div className="pt-1 border-t border-slate-100">
                      <span className="text-[10px] text-slate-500">Voucher / Pass: </span>
                      <span className="font-mono font-bold text-slate-800 text-[10px]">
                        {selectedStudentProfile.voucherCode}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-1.5">
                  <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-1">
                    <CreditCard className="w-3 h-3 text-emerald-600" />
                    <span>Rent & Tenancy Status</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <p className="text-xs font-bold text-emerald-800">
                      {selectedStudentProfile.rentStatus}
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    {selectedStudentProfile.dueDate
                      ? `Billing Schedule: ${selectedStudentProfile.dueDate}`
                      : selectedStudentProfile.moveInDate
                      ? `Target Move-In: ${selectedStudentProfile.moveInDate}`
                      : selectedStudentProfile.ocularDate
                      ? `Visit Slot: ${selectedStudentProfile.ocularDate}`
                      : 'Active Registration'}
                  </p>
                  {selectedStudentProfile.notes && (
                    <p className="text-[10px] text-slate-500 italic truncate pt-1 border-t border-slate-100">
                      "{selectedStudentProfile.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Emergency Contact & Guardian */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Emergency Contact & Guardian on Record</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    Verified Guardian
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Guardian Name</span>
                    <span className="font-bold text-slate-800 block mt-0.5">
                      {selectedStudentProfile.emergencyContact.name}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      ({selectedStudentProfile.emergencyContact.relationship})
                    </span>
                  </div>

                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Guardian Phone</span>
                    <span className="font-mono font-bold text-slate-800 block mt-0.5">
                      {selectedStudentProfile.emergencyContact.phone}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold">Active Line</span>
                  </div>

                  <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Permanent Address</span>
                    <span className="font-semibold text-slate-800 block mt-0.5 text-[11px] leading-tight">
                      {selectedStudentProfile.emergencyContact.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Uploaded ID Credentials Card */}
              <div className="p-4 rounded-2xl border border-emerald-300 bg-gradient-to-br from-emerald-50/40 via-white to-amber-50/30 shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold tracking-wider text-emerald-800 uppercase flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Uploaded ID Credentials & Enrollment Verification</span>
                  </span>
                  <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Validated Document</span>
                  </span>
                </div>

                {/* Simulated Digital ID Card Preview */}
                <div className="p-3.5 rounded-2xl border-2 border-dashed border-emerald-300/80 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#053728] text-white flex flex-col items-center justify-center text-center p-1 shadow-sm shrink-0">
                      <GraduationCap className="w-5 h-5 text-emerald-300" />
                      <span className="text-[8px] font-extrabold tracking-tighter text-emerald-200 uppercase">
                        ADSSU
                      </span>
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs leading-snug">
                        {selectedStudentProfile.credentials.idType}
                      </h5>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          No. {selectedStudentProfile.credentials.idNumber}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {selectedStudentProfile.credentials.verificationDate}
                        </span>
                      </div>
                      <p className="text-[10px] font-medium text-slate-600 mt-1 flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#00875A]" />
                        <span>{selectedStudentProfile.credentials.corStatus}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-1.5 shrink-0">
                    <div className="flex items-center gap-1 text-[9px] font-extrabold text-[#00875A] bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-md">
                      <QrCode className="w-3.5 h-3.5 text-emerald-700" />
                      <span>REGISTRAR SEAL</span>
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono">SEC-8506-VERIFIED</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStudentProfile(null);
                    onTabChange('messages');
                  }}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#00875A] hover:bg-[#00704A] text-white font-bold text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send In-App Message to Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedStudentProfile(null)}
                  className="w-full sm:w-auto py-2.5 px-5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs cursor-pointer transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>

    </div>
  );
};


