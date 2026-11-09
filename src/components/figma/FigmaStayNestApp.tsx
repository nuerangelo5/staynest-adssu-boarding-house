import React, { useState, useEffect } from 'react';
import {
  Compass,
  Heart,
  Home,
  Laptop,
  Layers,
  LogOut,
  MapPin,
  Maximize2,
  MessageSquare,
  Minimize2,
  Phone,
  Search,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  User,
  X,
  GraduationCap,
  Users,
  ArrowLeft,
  Info,
  Crown,
  Wallet,
  Receipt,
  HelpCircle,
  Settings,
} from 'lucide-react';
import { PropertyData, FigmaPropertyDetail, BookingTransaction } from './FigmaPropertyDetail';
import { FigmaStudentHome } from './FigmaStudentHome';
import { FigmaInteractiveMap } from './FigmaInteractiveMap';
import { FigmaStudentChat, ChatThread, Message } from './FigmaStudentChat';
import { FigmaStudentProfile } from './FigmaStudentProfile';
import { FigmaFilterModal } from './FigmaFilterModal';
import {
  FigmaLandlordViews,
  INITIAL_ROOMS,
  RoomItem,
  LandlordSubscription,
  INITIAL_LANDLORD_BOOKINGS,
  INITIAL_LANDLORD_SUBSCRIPTION,
  LandlordTabType,
} from './FigmaLandlordViews';
import { StayNestAppDownloadModal } from './StayNestAppDownloadModal';
import { StayNestGuideAndTeamModal } from './FigmaTeamAndDemoSections';
import {
  FigmaAddNewRoomModal,
  FigmaEditVacantRoomModal,
  FigmaTenantDetailModal,
  FigmaLandlordProfileModal,
} from './FigmaLandlordModals';
import {
  FigmaAdminViews,
  INITIAL_VERIFICATIONS,
  INITIAL_STUDENT_VERIFICATIONS,
  LandlordVerificationItem,
  StudentVerificationItem,
} from './FigmaAdminViews';
import {
  FigmaAuthScreens,
  StudentRegistrationData,
  LandlordRegistrationData,
} from './FigmaAuthScreens';
import { FigmaStudentSettings } from './FigmaStudentSettings';
import { FigmaOnboardingModal } from './FigmaOnboardingModal';
import { FigmaLandlordOnboardingModal } from './FigmaLandlordOnboardingModal';
import { StayNestEmblem } from './StayNestEmblem';
import {
  verifyAndHydrateSession,
  createSession,
  clearSession,
  subscribeSession,
  CurrentUser,
} from '../../services/sessionManager';

// --- VERIFIED STUDENT PROPERTIES WITH AUTHENTIC STUDENT ROOM PHOTOS ---
export const FIGMA_PROPERTIES: PropertyData[] = [
  {
    id: 'bh-dalayap',
    name: 'Jiomer Dalayap Boarding House',
    price: '₱1,200',
    priceNum: 1200,
    location: 'Purok 8, Poblacion, Bunawan, Agusan del Sur',
    distance: '0.6 km',
    walkTime: '7 min walk',
    trikeTime: '2–3 min trike',
    rating: 4.9,
    reviewsCount: 16,
    image: '/assets/aistudio/Dalayap__Jiomer_c2096588.jpg',
    ownerName: 'Jiomer Dalayap',
    ownerRole: 'Boarding House Owner / Landlord',
    ownerAvatar: 'JD',
    replyTime: 'Replies within 10 mins',
    phone: '+63 907 121 0348',
    highlights: [
      { label: '24/7 Water Supply', icon: '', bg: '#DCFCE7', text: '#15803D' },
      { label: 'Low Flood Zone', icon: '', bg: '#DCFCE7', text: '#15803D' },
      { label: '24/7 CCTV', icon: '', bg: '#F1F5F9', text: '#475569' },
      { label: 'Free Wi-Fi', icon: '', bg: '#E0F2FE', text: '#0284C7' },
      { label: 'Curfew 10:00 PM', icon: '', bg: '#FEF3C7', text: '#B45309' },
      { label: 'Gated Perimeter', icon: '', bg: '#FEF9C3', text: '#854D0E' },
    ],
    description:
      'Clean, highly secure, and peaceful student room accommodations owned by Jiomer Dalayap. Located at Purok 8, Poblacion, Bunawan, Agusan del Sur, just a short walk to ADSSU Bunawan Campus (~7 min walk / 2–3 min tricycle). Features 24/7 continuous water supply, sturdy wooden beds, screened windows, and strict 10:00 PM security curfew.',
    gallery: [
      {
        url: '/assets/aistudio/Dalayap__Jiomer_c2096588.jpg',
        caption: 'Jiomer Dalayap Boarding House Main Entrance & Gate (Purok 8, Poblacion)',
        category: 'Exterior',
      },
      {
        url: '/assets/aistudio/Dalayap__Jiomer_2_9d281101.jpg',
        caption: 'Spacious Exterior Courtyard & Student Room Entryways',
        category: 'Room',
      },
      {
        url: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80',
        caption: 'Room Interior with Bed & Personal Study Station',
        category: 'Bedspace',
      },
      {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
        caption: 'Clean Tiled Restroom / CR with Constant Water Supply',
        category: 'Bathroom',
      },
    ],
    roomOptions: [
      {
        id: 'opt-d1',
        name: 'Room 01 - Bedspace (4-Cap)',
        type: 'Bedspace Sharing',
        price: '₱1,000',
        priceNum: 1000,
        slots: '2 Slots Vacant',
        image: '/assets/aistudio/Dalayap__Jiomer_c2096588.jpg',
        description: 'Includes single bed, foam mattress, personal study desk, individual locker.',
        features: ['Bunk Bed', 'Study Desk', 'Individual Locker'],
      },
      {
        id: 'opt-d2',
        name: 'Room 02 - Solo Private Room',
        type: 'Private Solo',
        price: '₱1,500',
        priceNum: 1500,
        slots: '1 Room Vacant',
        image: '/assets/aistudio/Dalayap__Jiomer_2_9d281101.jpg',
        description: 'Quiet solo room with dedicated study nook, clothes cabinet, wall outlet.',
        features: ['Solo Bed', 'Private Desk', 'Cabinet'],
      },
    ],
  },
  {
    id: 'bh-cabanillia',
    name: 'Cabanillia Boarding House',
    price: '₱1,100',
    priceNum: 1100,
    location: 'Toog Street, Poblacion, Bunawan, Agusan del Sur',
    distance: '0.7 km',
    walkTime: '8 min walk',
    trikeTime: '3 min trike',
    rating: 4.8,
    reviewsCount: 14,
    image: '/assets/aistudio/Elizabeth_cabanillia_a5f0b13d.jpg',
    ownerName: 'Elizabeth Cabanillia',
    ownerRole: 'Boarding House Owner / Landlord',
    ownerAvatar: 'EC',
    replyTime: 'Replies within 15 mins',
    phone: '+63 918 345 6789',
    highlights: [
      { label: '24/7 Water Supply', icon: '', bg: '#DCFCE7', text: '#15803D' },
      { label: 'Ground Floor Carinderia', icon: '', bg: '#FEF9C3', text: '#854D0E' },
      { label: 'Low Flood Zone', icon: '', bg: '#DCFCE7', text: '#15803D' },
      { label: '24/7 CCTV', icon: '', bg: '#F1F5F9', text: '#475569' },
      { label: 'Curfew 10:00 PM', icon: '', bg: '#FEF3C7', text: '#B45309' },
      { label: 'Free Wi-Fi', icon: '', bg: '#E0F2FE', text: '#0284C7' },
    ],
    description:
      'Convenient student boarding house along Toog Street, Poblacion, Bunawan managed by Elizabeth Cabanillia (~8 min walk / 3 min tricycle). Features a ground-floor home-cooked Carinderia so students have instant access to affordable meals, 24/7 continuous water, study balcony, and secure perimeter.',
    gallery: [
      {
        url: '/assets/aistudio/Elizabeth_cabanillia_a5f0b13d.jpg',
        caption: 'Cabanillia Boarding House Facade & Ground Carinderia (Toog Street, Poblacion)',
        category: 'Exterior',
      },
      {
        url: '/assets/aistudio/Elizabeth_cabanillia2_e2e9ebef.jpg',
        caption: '2nd Floor Covered Balcony & Student Dorm Rooms',
        category: 'Room',
      },
      {
        url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
        caption: 'Student Bedroom with Desk & Breeze Windows',
        category: 'Room',
      },
    ],
    roomOptions: [
      {
        id: 'opt-c1',
        name: 'Unit 1 - Bedspace Sharing',
        type: 'Bedspace Sharing',
        price: '₱1,100',
        priceNum: 1100,
        slots: '2 Slots Vacant',
        image: '/assets/aistudio/Elizabeth_cabanillia_a5f0b13d.jpg',
        description: 'Includes single bed frame, mattress, clothes rack, access to ground carinderia.',
        features: ['Single Bed', 'Clothes Rack', 'Carinderia Access'],
      },
      {
        id: 'opt-c2',
        name: 'Unit 2 - Solo Student Room',
        type: 'Private Solo',
        price: '₱1,600',
        priceNum: 1600,
        slots: '1 Room Vacant',
        image: '/assets/aistudio/Elizabeth_cabanillia2_e2e9ebef.jpg',
        description: 'Private room on the 2nd floor balcony with study lamp and private key.',
        features: ['Solo Bed', 'Private Key', 'Balcony Access'],
      },
    ],
  },
  {
    id: 'bh-quintas',
    name: 'Flordeliza Quintas Boarding House',
    price: '₱1,000',
    priceNum: 1000,
    location: 'Purok 3, San Jose, Bunawan, Agusan del Sur',
    distance: '0.5 km',
    walkTime: '6 min walk',
    trikeTime: '2 min trike',
    rating: 4.8,
    reviewsCount: 18,
    image: '/assets/aistudio/Flordeliza_Quintas_f9dca90f.jpg',
    ownerName: 'Flordeliza Quintas',
    ownerRole: 'Boarding House Owner / Landlord',
    ownerAvatar: 'FQ',
    replyTime: 'Replies within 12 mins',
    phone: '+63 929 456 7890',
    highlights: [
      { label: '24/7 Water Supply', icon: '', bg: '#DCFCE7', text: '#15803D' },
      { label: 'Low Flood Zone', icon: '', bg: '#DCFCE7', text: '#15803D' },
      { label: 'Free Wi-Fi', icon: '', bg: '#E0F2FE', text: '#0284C7' },
      { label: '24/7 CCTV', icon: '', bg: '#F1F5F9', text: '#475569' },
      { label: 'Curfew 10:00 PM', icon: '', bg: '#FEF3C7', text: '#B45309' },
      { label: 'Laundry Wash Area', icon: '', bg: '#DCFCE7', text: '#15803D' },
    ],
    description:
      'Spacious and homey student residence situated at Purok 3, San Jose, Bunawan, Agusan del Sur (~6 min walk / 2 min tricycle). Managed by Flordeliza Quintas. Features wide covered study verandas, quiet study environment, constant tap water supply, and gated security.',
    gallery: [
      {
        url: '/assets/aistudio/Flordeliza_Quintas_f9dca90f.jpg',
        caption: 'Flordeliza Quintas Boarding House Main Front View (Purok 3, San Jose)',
        category: 'Exterior',
      },
      {
        url: '/assets/aistudio/Flordeliza_Quintas2_3cf44cf5.jpg',
        caption: 'Spacious Upper Level Balcony & Room Corridors',
        category: 'Room',
      },
      {
        url: '/assets/aistudio/Flordeliza_Quintas3_0ffa558a.jpg',
        caption: 'Ground Courtyard & Covered Washing Area',
        category: 'Exterior',
      },
    ],
    roomOptions: [
      {
        id: 'opt-q1',
        name: 'Room A - Student Bedspace',
        type: 'Bedspace Sharing',
        price: '₱1,000',
        priceNum: 1000,
        slots: '3 Slots Vacant',
        image: '/assets/aistudio/Flordeliza_Quintas_f9dca90f.jpg',
        description: 'Clean bedspace with wooden bed, electric fan, study lamp desk, and locker.',
        features: ['Wooden Bed', 'Electric Fan', 'Study Lamp'],
      },
      {
        id: 'opt-q2',
        name: 'Room B - Solo Private Room',
        type: 'Private Solo',
        price: '₱1,400',
        priceNum: 1400,
        slots: '1 Room Vacant',
        image: '/assets/aistudio/Flordeliza_Quintas2_3cf44cf5.jpg',
        description: 'Single occupancy private room with desk, screened window, and quiet study setup.',
        features: ['Solo Bed', 'Private Desk', 'Locker'],
      },
    ],
  },
  {
    id: 'bh-hiponia',
    name: "Hiponia's Boarding House",
    price: '₱1,200',
    priceNum: 1200,
    location: 'Acacia Street, Poblacion, Bunawan, Agusan del Sur',
    distance: '0.8 km',
    walkTime: '9 min walk',
    trikeTime: '3–4 min trike',
    rating: 4.7,
    reviewsCount: 15,
    image: '/assets/aistudio/Myrna_hiponia_0f453f79.jpg',
    ownerName: 'Myrna Hiponia',
    ownerRole: 'Boarding House Owner / Landlord',
    ownerAvatar: 'MH',
    replyTime: 'Replies within 10 mins',
    phone: '+63 909 431 2657',
    highlights: [
      { label: '24/7 Water Supply', icon: '', bg: '#DCFCE7', text: '#15803D' },
      { label: 'Haus General Store', icon: '', bg: '#FEF9C3', text: '#854D0E' },
      { label: 'Low Flood Zone', icon: '', bg: '#DCFCE7', text: '#15803D' },
      { label: 'Free Wi-Fi', icon: '', bg: '#E0F2FE', text: '#0284C7' },
      { label: 'Curfew 10:00 PM', icon: '', bg: '#FEF3C7', text: '#B45309' },
      { label: '24/7 CCTV Security', icon: '', bg: '#F1F5F9', text: '#475569' },
    ],
    description:
      "A well-known student residence along Acacia Street, Poblacion, Bunawan (~9 min walk / 3–4 min tricycle) featuring the 'Haus General Merchandise' store on the ground floor. Students have instant access to school supplies, snacks, and load. Includes 24/7 continuous water and gated safety.",
    gallery: [
      {
        url: '/assets/aistudio/Myrna_hiponia_0f453f79.jpg',
        caption: "Haus General Merchandise & Ground Entrance at Hiponia's (Acacia St, Poblacion)",
        category: 'Exterior',
      },
      {
        url: '/assets/aistudio/Myrna_hiponia2_88e1fd12.jpg',
        caption: 'Upper Level Dorm Rooms, Veranda & Laundry Area',
        category: 'Room',
      },
    ],
    roomOptions: [
      {
        id: 'opt-h1',
        name: 'Room 101 - Bedspace Sharing',
        type: 'Bedspace Sharing',
        price: '₱1,000',
        priceNum: 1000,
        slots: '2 Slots Vacant',
        image: '/assets/aistudio/Myrna_hiponia_0f453f79.jpg',
        description: 'Single bunk bed space with desk, ceiling fan, locker, and 24/7 water access.',
        features: ['Bunk Bed', 'Ceiling Fan', 'General Store Access'],
      },
      {
        id: 'opt-h2',
        name: 'Room 102 - Solo Room',
        type: 'Private Solo',
        price: '₱1,500',
        priceNum: 1500,
        slots: '1 Room Vacant',
        image: '/assets/aistudio/Myrna_hiponia2_88e1fd12.jpg',
        description: 'Private 2nd floor room with balcony entrance and study lamp station.',
        features: ['Solo Bed', 'Balcony Access', 'Private Study Lamp'],
      },
    ],
  },
  {
    id: 'bh-uno',
    name: 'UNO Boarding House',
    price: '₱1,300',
    priceNum: 1300,
    location: 'Purok 4, San Teodoro, Bunawan, Agusan del Sur (near the bus terminal)',
    distance: '0.7 km',
    walkTime: '8 min walk',
    trikeTime: '3 min trike',
    rating: 4.9,
    reviewsCount: 22,
    image: '/assets/aistudio/Rhejie_largo_uno_ca160f5d.jpg',
    ownerName: 'Rhejie Largo',
    ownerRole: 'Boarding House Owner / Landlord',
    ownerAvatar: 'RL',
    replyTime: 'Replies within 5 mins',
    phone: '+63 930 123 4567',
    highlights: [
      { label: '24/7 Water Supply', icon: '', bg: '#DCFCE7', text: '#15803D' },
      { label: 'Accepts Male & Female', icon: '', bg: '#E0F2FE', text: '#0284C7' },
      { label: 'Low Flood Zone', icon: '', bg: '#DCFCE7', text: '#15803D' },
      { label: '24/7 CCTV', icon: '', bg: '#F1F5F9', text: '#475569' },
      { label: 'Curfew 10:00 PM', icon: '', bg: '#FEF3C7', text: '#B45309' },
      { label: 'Garden Courtyard', icon: '', bg: '#DCFCE7', text: '#15803D' },
    ],
    description:
      'Modern two-storey student dormitory in Purok 4, San Teodoro, Bunawan, Agusan del Sur near the bus terminal (~8 min walk / 3 min tricycle), owned by Rhejie Largo. Accepting both male and female boarders. Features beautifully landscaped flower garden courtyard, 24/7 water supply, high-speed Wi-Fi, and 10 PM curfew policy.',
    gallery: [
      {
        url: '/assets/aistudio/Rhejie_largo_uno_ca160f5d.jpg',
        caption: 'UNO Boarding House 2-Storey Building Facade (Purok 4, San Teodoro near Bus Terminal)',
        category: 'Exterior',
      },
      {
        url: '/assets/aistudio/Rhejie_largo_uno2_b1329e25.jpg',
        caption: 'Front Garden Courtyard & Side Access Staircase',
        category: 'Exterior',
      },
    ],
    roomOptions: [
      {
        id: 'opt-u1',
        name: 'Unit A - Deluxe Bedspace',
        type: 'Bedspace Sharing',
        price: '₱1,100',
        priceNum: 1100,
        slots: '2 Slots Vacant',
        image: '/assets/aistudio/Rhejie_largo_uno_ca160f5d.jpg',
        description: 'Single bed space in clean room with ceiling fan, study table, personal locker.',
        features: ['Single Bed', 'Ceiling Fan', 'Study Table'],
      },
      {
        id: 'opt-u2',
        name: 'Unit B - Solo Executive Room',
        type: 'Private Solo',
        price: '₱1,700',
        priceNum: 1700,
        slots: '1 Room Vacant',
        image: '/assets/aistudio/Rhejie_largo_uno2_b1329e25.jpg',
        description: 'Spacious solo room with window looking out to garden, quiet study atmosphere.',
        features: ['Solo Bed', 'Garden View Desk', 'Private Key'],
      },
    ],
  },
  // Legacy alias compatibility entries
  {
    id: 'bh-fritzcel',
    name: 'Jiomer Dalayap Boarding House (Fritzcel)',
    price: '₱1,200',
    priceNum: 1200,
    location: 'Purok 8, Poblacion, Bunawan, Agusan del Sur',
    distance: '0.6 km',
    walkTime: '7 min walk',
    trikeTime: '2–3 min trike',
    rating: 4.9,
    reviewsCount: 16,
    image: '/assets/aistudio/Dalayap__Jiomer_c2096588.jpg',
    ownerName: 'Jiomer Dalayap',
    ownerRole: 'Boarding House Owner / Landlord',
    ownerAvatar: 'JD',
    replyTime: 'Replies within 10 mins',
    phone: '+63 907 121 0348',
    highlights: [
      { label: '24/7 Water Supply', icon: '', bg: '#DCFCE7', text: '#15803D' },
      { label: 'Low Flood Zone', icon: '', bg: '#DCFCE7', text: '#15803D' },
      { label: '24/7 CCTV', icon: '', bg: '#F1F5F9', text: '#475569' },
      { label: 'Free Wi-Fi', icon: '', bg: '#E0F2FE', text: '#0284C7' },
      { label: 'Curfew 10:00 PM', icon: '', bg: '#FEF3C7', text: '#B45309' },
    ],
    description: 'Jiomer Dalayap Boarding House in Purok 8 Poblacion Bunawan.',
    gallery: [
      { url: '/assets/aistudio/Dalayap__Jiomer_c2096588.jpg', caption: 'Main Frontage', category: 'Exterior' },
      { url: '/assets/aistudio/Dalayap__Jiomer_2_9d281101.jpg', caption: 'Courtyard & Rooms', category: 'Room' },
    ],
    roomOptions: [],
  },
];

// --- 5 VERIFIED BUNAWAN LANDLORD PROFILES & ROOM INVENTORIES ---
export interface VerifiedLandlordAccount {
  name: string;
  email: string;
  houseName: string;
  phone: string;
  address: string;
  avatar: string;
  profilePhoto: string;
}

export const VERIFIED_LANDLORDS: Record<string, VerifiedLandlordAccount> = {
  'jiomer.dalayap@staynest.ph': {
    name: 'Jiomer Dalayap',
    email: 'jiomer.dalayap@staynest.ph',
    houseName: 'Jiomer Dalayap Boarding House',
    phone: '09071210348',
    address: 'Purok 8, Poblacion, Bunawan, Agusan del Sur',
    avatar: 'JD',
    profilePhoto: '/assets/aistudio/Dalayap__Jiomer_c2096588.jpg',
  },
  'elizabeth.cabanillia@staynest.ph': {
    name: 'Elizabeth Cabanillia',
    email: 'elizabeth.cabanillia@staynest.ph',
    houseName: 'Cabanillia Boarding House',
    phone: '+63 918 345 6789',
    address: 'Toog Street, Poblacion, Bunawan, Agusan del Sur',
    avatar: 'EC',
    profilePhoto: '/assets/aistudio/Elizabeth_cabanillia_a5f0b13d.jpg',
  },
  'flordeliza.quintas@staynest.ph': {
    name: 'Flordeliza Quintas',
    email: 'flordeliza.quintas@staynest.ph',
    houseName: 'Flordeliza Quintas Boarding House',
    phone: '+63 929 456 7890',
    address: 'Purok 3, San Jose, Bunawan, Agusan del Sur',
    avatar: 'FQ',
    profilePhoto: '/assets/aistudio/Flordeliza_Quintas_f9dca90f.jpg',
  },
  'myrna.hiponia@staynest.ph': {
    name: 'Myrna Hiponia',
    email: 'myrna.hiponia@staynest.ph',
    houseName: "Hiponia's Boarding House",
    phone: '+63 909 431 2657',
    address: 'Acacia Street, Poblacion, Bunawan, Agusan del Sur',
    avatar: 'MH',
    profilePhoto: '/assets/aistudio/Myrna_hiponia_0f453f79.jpg',
  },
  'rhejie.largo@staynest.ph': {
    name: 'Rhejie Largo',
    email: 'rhejie.largo@staynest.ph',
    houseName: 'UNO Boarding House',
    phone: '+63 930 123 4567',
    address: 'Purok 4, San Teodoro, Bunawan, Agusan del Sur (near bus terminal)',
    avatar: 'RL',
    profilePhoto: '/assets/aistudio/Rhejie_largo_uno_ca160f5d.jpg',
  },
  'owner@staynest.ph': {
    name: 'Conrado Candari',
    email: 'owner@staynest.ph',
    houseName: 'Fritzcel Boarding House',
    phone: '+63 912 345 6789',
    address: 'Purok 2, San Teodoro, Bunawan, Agusan del Sur',
    avatar: 'CC',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
};

export const LANDLORD_INITIAL_ROOMS: Record<string, RoomItem[]> = {
  'jiomer.dalayap@staynest.ph': [
    {
      id: 'rm-dalayap-01',
      name: 'Room 01',
      type: 'Bed space (4-Cap)',
      price: '₱1,000 / month',
      status: 'OCCUPIED',
      tenant: 'Kean Ide',
      course: 'BSIT - 3rd Year (ADSSU)',
      due: '20th of Every Month',
      phone: '+63 912 333 4455',
      guardianName: 'Mr. Ide (Father)',
      guardianPhone: '+63 912 222 1100',
      guardianAddress: 'Purok 5, Trento, Bunawan',
      inclusions: [
        'Free High-Speed Wi-Fi',
        '24/7 Water Supply',
        'Study Desk & Chair',
        'Individual Locker',
        '10 PM Curfew Rule',
      ],
      image: '/assets/aistudio/Dalayap__Jiomer_c2096588.jpg',
    },
    {
      id: 'rm-dalayap-02',
      name: 'Room 02',
      type: 'Solo Private Room',
      price: '₱1,500 / month',
      status: 'VACANT',
      inclusions: [
        'Solo Bed Frame & Foam',
        '24/7 Water Supply',
        'Dedicated Study Station',
        'Private Door Key',
        '10 PM Curfew Rule',
      ],
      image: '/assets/aistudio/Dalayap__Jiomer_2_9d281101.jpg',
    },
    {
      id: 'rm-dalayap-03',
      name: 'Room 03',
      type: 'Bed spacer Deluxe',
      price: '₱1,200 / month',
      status: 'VACANT',
      inclusions: [
        'Free High-Speed Wi-Fi Access',
        'Study Desk & Chair',
        '24/7 Water Supply',
        'Cabinet Included',
        '10 PM Curfew Rule',
      ],
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'rm-dalayap-04',
      name: 'Room 04',
      type: 'Bedspace (2-Cap)',
      price: '₱1,400 / month',
      status: 'VACANT',
      inclusions: [
        'Free Wi-Fi',
        '24/7 Continuous Water',
        'Personal Study Desks',
        'Screened Windows',
        '10 PM Curfew Rule',
      ],
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    },
  ],
  'elizabeth.cabanillia@staynest.ph': [
    {
      id: 'rm-cabanillia-01',
      name: 'Unit 1',
      type: 'Bed space Sharing',
      price: '₱1,100 / month',
      status: 'OCCUPIED',
      tenant: 'Conrado Candari',
      course: 'BSIT - 3rd Year (ADSSU)',
      due: '15th of Every Month',
      phone: '+63 918 345 6789',
      guardianName: 'Mrs. Candari (Mother)',
      guardianPhone: '+63 918 555 6677',
      guardianAddress: 'Purok 2, San Teodoro, Bunawan',
      inclusions: [
        '24/7 Water Supply',
        'Free Wi-Fi Access',
        'Carinderia on Premises',
        'Study Table & Chair',
        '10 PM Curfew Rule',
      ],
      image: '/assets/aistudio/Elizabeth_cabanillia_a5f0b13d.jpg',
    },
    {
      id: 'rm-cabanillia-02',
      name: 'Unit 2',
      type: 'Solo Room with CR',
      price: '₱1,600 / month',
      status: 'VACANT',
      inclusions: [
        'Own Private Tiled CR',
        '24/7 Continuous Water',
        'Free High-Speed Wi-Fi',
        'Single Bed Frame',
        '10 PM Curfew Rule',
      ],
      image: '/assets/aistudio/Elizabeth_cabanillia2_fc2c53a2.jpg',
    },
    {
      id: 'rm-cabanillia-03',
      name: 'Unit 3',
      type: 'Bed space (2-Cap)',
      price: '₱1,200 / month',
      status: 'VACANT',
      inclusions: [
        '24/7 Water Supply',
        'Free Wi-Fi',
        'Individual Cabinet',
        'Bunk Bed with Foam',
        '10 PM Curfew Rule',
      ],
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    },
  ],
  'flordeliza.quintas@staynest.ph': [
    {
      id: 'rm-quintas-01',
      name: 'Room A',
      type: 'Solo Bed space',
      price: '₱1,000 / month',
      status: 'OCCUPIED',
      tenant: 'Jolina Asuncion',
      course: 'BSIT - 3rd Year (ADSSU)',
      due: '18th of Every Month',
      phone: '+63 929 456 7890',
      guardianName: 'Mrs. Asuncion (Mother)',
      guardianPhone: '+63 929 777 8899',
      guardianAddress: 'Purok 3, San Jose, Bunawan',
      inclusions: [
        '24/7 Water Supply',
        'Free High-Speed Wi-Fi',
        'Study Table & Chair',
        'Clothes Hanging Area',
        '10 PM Curfew Rule',
      ],
      image: '/assets/aistudio/Flordeliza_Quintas_f9dca90f.jpg',
    },
    {
      id: 'rm-quintas-02',
      name: 'Room B',
      type: 'Deluxe Solo Room',
      price: '₱1,400 / month',
      status: 'VACANT',
      inclusions: [
        'Single Bed Frame with Foam',
        '24/7 Water Supply',
        'Screened Windows & Quiet Area',
        'Free Wi-Fi',
        '10 PM Curfew Rule',
      ],
      image: '/assets/aistudio/Flordeliza_Quintas2_4057ea41.jpg',
    },
    {
      id: 'rm-quintas-03',
      name: 'Room C',
      type: 'Bed space (4-Cap)',
      price: '₱1,100 / month',
      status: 'VACANT',
      inclusions: [
        '24/7 Water Supply',
        'Free Wi-Fi',
        'Personal Cabinet Space',
        'Study Desk',
        '10 PM Curfew Rule',
      ],
      image: '/assets/aistudio/Flordeliza_Quintas3_c6fc21eb.jpg',
    },
  ],
  'myrna.hiponia@staynest.ph': [
    {
      id: 'rm-hiponia-01',
      name: 'Room 101',
      type: 'Bed space Sharing',
      price: '₱1,000 / month',
      status: 'VACANT',
      inclusions: [
        '24/7 Water Supply',
        'Quiet Study Environment',
        'Free Wi-Fi',
        'Shared Clean Restroom',
        '10 PM Curfew Rule',
      ],
      image: '/assets/aistudio/Myrna_hiponia_0f453f79.jpg',
    },
    {
      id: 'rm-hiponia-02',
      name: 'Room 102',
      type: 'Single Room with Desk',
      price: '₱1,200 / month',
      status: 'OCCUPIED',
      tenant: 'Mary Joy Doroteo',
      course: 'BSIT - 3rd Year (ADSSU)',
      due: '18th of Every Month',
      phone: '+63 909 431 2657',
      guardianName: 'Mrs. Doroteo (Mother)',
      guardianPhone: '+63 909 444 8899',
      guardianAddress: 'Purok 1, Loreto, ADS',
      inclusions: [
        'Single Bed Frame with Mattress',
        'Study Desk & Chair',
        'Wall Fan Included',
        '24/7 Continuous Water',
        '10 PM Curfew Rule',
      ],
      image: '/assets/aistudio/Myrna_hiponia2_7185ae15.jpg',
    },
    {
      id: 'rm-hiponia-03',
      name: 'Room 103',
      type: 'Bed space (2-Cap)',
      price: '₱1,200 / month',
      status: 'VACANT',
      inclusions: [
        '24/7 Water Supply',
        'Free High-Speed Wi-Fi',
        'Study Table',
        'Clothes Cabinet',
        '10 PM Curfew Rule',
      ],
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80',
    },
  ],
  'rhejie.largo@staynest.ph': [
    {
      id: 'rm-uno-01',
      name: 'Unit A',
      type: 'Bed space (2-Cap)',
      price: '₱1,300 / month',
      status: 'OCCUPIED',
      tenant: 'Angelo Laureta Nuer',
      course: 'BSIT - 3rd Year (ADSSU)',
      due: '16th of Every Month',
      phone: '+63 912 345 6789',
      guardianName: 'Mrs. Maria Nuer (Mother)',
      guardianPhone: '+63 998 765 4321',
      guardianAddress: 'Purok 2, San Francisco, ADS',
      inclusions: [
        '24/7 Water Supply',
        'Free Wi-Fi Access',
        'Close to Bus Terminal & Market',
        'Study Desk',
        '10 PM Curfew Rule',
      ],
      image: '/assets/aistudio/Rhejie_largo_uno_ca160f5d.jpg',
    },
    {
      id: 'rm-uno-02',
      name: 'Unit B',
      type: 'Private Solo Room',
      price: '₱1,700 / month',
      status: 'VACANT',
      inclusions: [
        'Solo Bed Frame with Foam',
        'Private Door Key',
        'Study Desk & Chair',
        '24/7 Water Supply',
        '10 PM Curfew Rule',
      ],
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'rm-uno-03',
      name: 'Unit C',
      type: 'Bed space Deluxe',
      price: '₱1,300 / month',
      status: 'VACANT',
      inclusions: [
        '24/7 Water Supply',
        'Free High-Speed Wi-Fi',
        'Bunk Bed',
        'Individual Locker Space',
        '10 PM Curfew Rule',
      ],
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    },
  ],
  'owner@staynest.ph': INITIAL_ROOMS,
};

export const getStoredRoomsForLandlord = (email: string): RoomItem[] => {
  const cleanEmail = (email || '').toLowerCase().trim();
  try {
    const raw = localStorage.getItem(`staynest_rooms_${cleanEmail}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to parse stored landlord rooms:', e);
  }
  return (
    LANDLORD_INITIAL_ROOMS[cleanEmail] ||
    LANDLORD_INITIAL_ROOMS['jiomer.dalayap@staynest.ph'] ||
    INITIAL_ROOMS
  );
};

export const saveStoredRoomsForLandlord = (email: string, rooms: RoomItem[]) => {
  const cleanEmail = (email || '').toLowerCase().trim();
  try {
    localStorage.setItem(`staynest_rooms_${cleanEmail}`, JSON.stringify(rooms));
  } catch (e) {
    console.error('Failed to save landlord rooms:', e);
  }
};

export const FigmaStayNestApp: React.FC = () => {
  // Tokenized Session & Short-Lived Memory Hydration State
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    const { user } = verifyAndHydrateSession();
    return user;
  });

  const [role, setRole] = useState<'student' | 'landlord' | 'admin'>(() => {
    const { user } = verifyAndHydrateSession();
    return user ? user.role : 'student';
  });

  // Subscribe to token verification events (cross-tab sync & periodic token validation)
  React.useEffect(() => {
    const unsubscribe = subscribeSession((verifiedUser) => {
      setCurrentUser(verifiedUser);
      if (verifiedUser) {
        setRole(verifiedUser.role);
      }
    });

    // 60-second background token heartbeat validation
    const heartbeatTimer = setInterval(() => {
      const { user } = verifyAndHydrateSession();
      if (!user && currentUser) {
        setCurrentUser(null);
      }
    }, 60000);

    return () => {
      unsubscribe();
      clearInterval(heartbeatTimer);
    };
  }, [currentUser]);

  const [studentTab, setStudentTab] = useState<'explore' | 'saved' | 'chat' | 'profile' | 'settings'>('explore');
  const [selectedProperty, setSelectedProperty] = useState<PropertyData | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isLandlordOnboardingOpen, setIsLandlordOnboardingOpen] = useState(false);

  // Universal Navigation History Stack for Seamless Back Button Support
  interface StudentNavSnapshot {
    tab: 'explore' | 'saved' | 'chat' | 'profile' | 'settings';
    selectedProperty: PropertyData | null;
    isMapOpen: boolean;
  }
  const [navHistory, setNavHistory] = useState<StudentNavSnapshot[]>([]);

  const pushNavState = (
    nextTab: 'explore' | 'saved' | 'chat' | 'profile' | 'settings',
    nextProperty: PropertyData | null = null,
    nextMapOpen: boolean = false
  ) => {
    const currentSnapshot: StudentNavSnapshot = {
      tab: studentTab,
      selectedProperty,
      isMapOpen,
    };

    const last = navHistory[navHistory.length - 1];
    const isDup =
      last &&
      last.tab === currentSnapshot.tab &&
      last.selectedProperty?.id === currentSnapshot.selectedProperty?.id &&
      last.isMapOpen === currentSnapshot.isMapOpen;

    if (!isDup) {
      setNavHistory((prev) => [...prev, currentSnapshot]);
    }

    setStudentTab(nextTab);
    setSelectedProperty(nextProperty);
    setIsMapOpen(nextMapOpen);
    triggerTabLoading();
  };

  const handleGoBack = () => {
    triggerTabLoading();
    if (navHistory.length === 0) {
      setSelectedProperty(null);
      setIsMapOpen(false);
      setStudentTab('explore');
      return;
    }

    const previousState = navHistory[navHistory.length - 1];
    setNavHistory((prev) => prev.slice(0, prev.length - 1));

    setStudentTab(previousState.tab);
    setSelectedProperty(previousState.selectedProperty);
    setIsMapOpen(previousState.isMapOpen);
  };

  const navigateStudentTab = (target: 'explore' | 'saved' | 'chat' | 'profile' | 'settings') => {
    pushNavState(target, null, false);
  };

  const [landlordTab, setLandlordTab] = useState<LandlordTabType>('overview');
  const [adminTab, setAdminTab] = useState<'queue' | 'accredited' | 'payments'>('queue');
  const [isTabLoading, setIsTabLoading] = useState<boolean>(false);

  const triggerTabLoading = () => {
    setIsTabLoading(true);
    setTimeout(() => setIsTabLoading(false), 260);
  };

  // Shared Bookings / 5% Commission & Subscriptions State
  const [bookings, setBookings] = useState<BookingTransaction[]>(INITIAL_LANDLORD_BOOKINGS);
  const [subscription, setSubscription] = useState<LandlordSubscription>(INITIAL_LANDLORD_SUBSCRIPTION);
  const [isFeaturedListing, setIsFeaturedListing] = useState<boolean>(true);
  const [showDownloadAppModal, setShowDownloadAppModal] = useState<boolean>(false);
  const [showAboutModal, setShowAboutModal] = useState<boolean>(false);

  // Shared Properties & Landlord / Student Verifications across RBAC
  const [properties, setProperties] = useState<PropertyData[]>(() =>
    FIGMA_PROPERTIES.map((p) => (p.id === 'bh-fritzcel' ? { ...p, isFeatured: true } : p))
  );

  // Sync Featured status of Fritzcel Boarding House whenever isFeaturedListing updates
  React.useEffect(() => {
    setProperties((prev) =>
      prev.map((p) => {
        if (p.id === 'bh-fritzcel') {
          return { ...p, isFeatured: isFeaturedListing };
        }
        return p;
      })
    );
  }, [isFeaturedListing]);

  const [verifications, setVerifications] = useState<LandlordVerificationItem[]>(INITIAL_VERIFICATIONS);
  const [studentVerifications, setStudentVerifications] = useState<StudentVerificationItem[]>(INITIAL_STUDENT_VERIFICATIONS);
  const [landlordRooms, setLandlordRooms] = useState<RoomItem[]>(() => {
    const { user } = verifyAndHydrateSession();
    if (user && user.role === 'landlord') {
      return getStoredRoomsForLandlord(user.email);
    }
    return getStoredRoomsForLandlord('jiomer.dalayap@staynest.ph');
  });

  // Automatically load the active landlord's specific room inventory whenever the logged-in user changes
  useEffect(() => {
    if (currentUser && currentUser.role === 'landlord') {
      const specificRooms = getStoredRoomsForLandlord(currentUser.email);
      setLandlordRooms(specificRooms);
    }
  }, [currentUser?.email, currentUser?.role]);

  // Persist room updates (price, photos, vacancy toggle, additions) to state and localStorage by landlord
  const handleUpdateLandlordRooms = (
    newRooms: RoomItem[] | ((prev: RoomItem[]) => RoomItem[])
  ) => {
    setLandlordRooms((prev) => {
      const resolved = typeof newRooms === 'function' ? newRooms(prev) : newRooms;
      if (currentUser?.email) {
        saveStoredRoomsForLandlord(currentUser.email, resolved);
      }
      return resolved;
    });
  };

  // Landlord modals
  const [editRoom, setEditRoom] = useState<RoomItem | null>(null);
  const [tenantDetailRoom, setTenantDetailRoom] = useState<RoomItem | null>(null);
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [isLandlordProfileOpen, setIsLandlordProfileOpen] = useState(false);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChip, setActiveChip] = useState('');
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3500);
  };

  // Toggle Save
  const handleToggleSave = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Student Chat Threads & Unread Count State
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([]);
  const [activeChatThreadId, setActiveChatThreadId] = useState<string | null>(null);

  const unreadCount = chatThreads.filter((t) => t.unread).length;

  const handleOpenChatWithLandlord = (prop: PropertyData) => {
    if (!prop) return;

    const threadId = prop.id || `th-${(prop.name || 'bh').replace(/\s+/g, '-').toLowerCase()}`;
    const existing = chatThreads.find(
      (t) => t.id === threadId || t.name.toLowerCase() === prop.name.toLowerCase()
    );

    let targetId = threadId;

    if (existing) {
      targetId = existing.id;
      setChatThreads((prev) =>
        prev.map((t) => (t.id === targetId ? { ...t, unread: false } : t))
      );
    } else {
      const ownerName = prop.ownerName || 'Boarding House Owner';
      const firstRoom = prop.roomOptions?.[0]?.name || 'Student Room';
      const newThread: ChatThread = {
        id: threadId,
        name: prop.name,
        landlord: ownerName,
        roomInfo: `${firstRoom} (${prop.price}) • ${prop.distance} to ADSSU`,
        lastMessage: `${ownerName.split(' ')[0]}: "Maayong adlaw! Welcome sa ${prop.name}..."`,
        time: 'Just now',
        unread: false,
        avatar: prop.ownerAvatar || ownerName.substring(0, 2).toUpperCase(),
        phone: prop.phone || '+63 912 345 6789',
        messages: [
          {
            id: `m-init-${Date.now()}`,
            sender: 'landlord',
            text: `Maayong adlaw! Welcome sa ${prop.name}. Unsa'y imong pangutana bahin sa kwarto, curfew, o reservation?`,
            time: 'Just now',
          },
        ],
      };

      setChatThreads((prev) => [newThread, ...prev]);
      targetId = newThread.id;
    }

    setActiveChatThreadId(targetId);
    setSelectedProperty(null);
    setIsMapOpen(false);
    pushNavState('chat', null, false);
  };

  // Helper to capitalize full names nicely (e.g., "angelo nuer" -> "Angelo Nuer")
  const formatName = (str: string) => {
    if (!str) return '';
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // RBAC Authentication & Session Handlers
  const handleLogin = (
    selectedRole: 'student' | 'landlord' | 'admin',
    accountIdentifier?: string
  ) => {
    setRole(selectedRole);
    let newUser: CurrentUser;
    if (selectedRole === 'student') {
      const email = (accountIdentifier || 'anuer15@adssu.edu.ph').toLowerCase().trim();
      newUser = {
        role: 'student',
        name: 'Angelo Laureta Nuer',
        email: email,
        studentId: '2024-0192-B',
        subTitle: 'BSIT - 3rd Year',
        avatar: 'AL',
        profilePhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      };
    } else if (selectedRole === 'landlord') {
      const target = (accountIdentifier || 'jiomer.dalayap@staynest.ph').toLowerCase().trim();
      const matched =
        VERIFIED_LANDLORDS[target] ||
        Object.values(VERIFIED_LANDLORDS).find(
          (l) => l.email.toLowerCase() === target || l.name.toLowerCase().includes(target)
        ) ||
        VERIFIED_LANDLORDS['jiomer.dalayap@staynest.ph'];

      newUser = {
        role: 'landlord',
        name: matched.name,
        email: matched.email,
        subTitle: `${matched.houseName} Owner`,
        avatar: matched.avatar,
        profilePhoto: matched.profilePhoto,
      };

      const specificRooms = getStoredRoomsForLandlord(matched.email);
      setLandlordRooms(specificRooms);
    } else {
      newUser = {
        role: 'admin',
        name: 'ADSSU Administrator',
        email: 'admin@staynest.adssu.edu.ph',
        subTitle: 'Bunawan LGU & School Moderator',
        avatar: 'AD',
        profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      };
    }
    createSession(newUser);
    setCurrentUser(newUser);
    setSelectedProperty(null);
    setIsMapOpen(false);
    setStudentTab('explore');
    setLandlordTab('overview');
  };

  // Dynamic Student Profile Update Handler
  const handleUpdateStudentProfile = (updated: {
    name?: string;
    email?: string;
    studentId?: string;
    subTitle?: string;
    profilePhoto?: string;
  }) => {
    setCurrentUser((prev) => {
      if (!prev) return null;
      const newName = updated.name !== undefined ? updated.name : prev.name;
      const initials = newName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
      const next: CurrentUser = {
        ...prev,
        name: newName,
        email: updated.email !== undefined ? updated.email : prev.email,
        studentId: updated.studentId !== undefined ? updated.studentId : (prev.studentId || '2024-0192-B'),
        subTitle: updated.subTitle !== undefined ? updated.subTitle : prev.subTitle,
        profilePhoto: updated.profilePhoto !== undefined ? updated.profilePhoto : prev.profilePhoto,
        avatar: initials || prev.avatar,
      };
      createSession(next);
      return next;
    });
  };

  const handleLogout = () => {
    clearSession();
    setCurrentUser(null);
    setSelectedProperty(null);
    setIsMapOpen(false);
  };

  // RBAC Registration & Verification Handlers
  const handleRegisterStudent = (data: StudentRegistrationData) => {
    setRole('student');
    const cleanName = formatName(data.name) || 'Student User';
    const initials = cleanName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const newUser: CurrentUser = {
      role: 'student',
      name: cleanName,
      email: data.email || 'student@adssu.edu.ph',
      studentId: data.studentId || '2024-0192-B',
      subTitle: data.course || 'BSIT - Bachelor of Science in Information Technology',
      avatar: initials || 'ST',
      profilePhoto: data.profilePhoto || undefined,
    };

    createSession(newUser);
    setCurrentUser(newUser);

    const newStudentItem: StudentVerificationItem = {
      id: `STU-2026-${Math.floor(100 + Math.random() * 899)}`,
      name: cleanName,
      studentId: data.studentId || 'M-01928',
      email: data.email || 'student@adssu.edu.ph',
      course: data.course || 'BSIT - 3rd Year',
      corFile: data.corFile || 'ADSSU_COR_2026_Submitted.pdf',
      status: 'PENDING',
      submissionDate: 'Just now',
      avatar: initials || 'ST',
      profilePhoto: data.profilePhoto,
      corPreviewUrl: data.corPreviewUrl,
    };

    setStudentVerifications((prev) => [newStudentItem, ...prev]);

    setSelectedProperty(null);
    setIsMapOpen(false);
    setStudentTab('explore');
    setIsOnboardingOpen(true);
  };

  const handleRegisterLandlord = (data: LandlordRegistrationData) => {
    setRole('landlord');
    const initials = (data.name || 'Landlord')
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const newUser: CurrentUser = {
      role: 'landlord',
      name: data.name || 'Landlord Owner',
      email: data.email || 'owner@staynest.ph',
      subTitle: data.houseName || 'Boarding House Owner',
      avatar: initials || 'LL',
      profilePhoto: data.profilePhoto,
    };

    createSession(newUser);
    setCurrentUser(newUser);

    const newVerification: LandlordVerificationItem = {
      id: `LL-2026-${Math.floor(100 + Math.random() * 899)}`,
      name: data.name,
      houseName: data.houseName,
      roomsCount: 6,
      docsSubmitted: '4 Docs Submitted (Title, Mayor Permit, PhilID, BFP)',
      location: data.address,
      status: 'PENDING',
      permitNo: `2026-BNW-${Math.floor(1000 + Math.random() * 8999)}`,
      avatar: initials || 'LL',
      submissionDate: 'Just now',
      email: data.email,
      phone: data.phone,
      profilePhoto: data.profilePhoto,
      propertyPhotos: data.propertyPhotos,
      uploadedDocuments: data.uploadedFiles,
    };

    setVerifications((prev) => [newVerification, ...prev]);

    // Also add to properties list
    const propertyImage = data.propertyPhotos && data.propertyPhotos.length > 0
      ? data.propertyPhotos[0]
      : 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80';

    const propertyGallery = data.propertyPhotos && data.propertyPhotos.length > 0
      ? data.propertyPhotos.map((url, i) => ({
          url,
          caption: `Room & Facility Photo ${i + 1}`,
          category: 'Room' as const,
        }))
      : [
          {
            url: propertyImage,
            caption: 'Room 01 - Bedspace & Desk',
            category: 'Bedspace' as const,
          },
        ];

    const newProp: PropertyData = {
      id: `bh-${Date.now()}`,
      name: data.houseName,
      price: '₱1,200',
      priceNum: 1200,
      location: data.address,
      distance: '0.8 km',
      walkTime: '9 min walk',
      rating: 5.0,
      reviewsCount: 1,
      image: propertyImage,
      ownerName: data.name,
      ownerRole: 'Boarding House Owner / Landlord',
      ownerAvatar: initials || 'LL',
      replyTime: 'Replies within 15 mins',
      phone: data.phone || '+63 912 888 9900',
      highlights: [
        { label: '24/7 Water', icon: '', bg: '#DCFCE7', text: '#15803D' },
        { label: 'Low Flood Zone', icon: '', bg: '#FEE2E2', text: '#B91C1C' },
        { label: '24/7 CCTV', icon: '', bg: '#F1F5F9', text: '#475569' },
        { label: 'Free Wi-Fi', icon: '', bg: '#E0F2FE', text: '#0284C7' },
        { label: 'Curfew 10:00 PM', icon: '', bg: '#FEF3C7', text: '#B45309' },
      ],
      description: `Newly registered student boarding house in Bunawan by ${data.name}. Complete legal documents submitted for LGU accreditation.`,
      gallery: propertyGallery,
      roomOptions: [
        {
          id: 'opt-new-1',
          name: 'Room 01 - Bedspace Sharing',
          type: 'Bedspace Sharing',
          price: '₱1,200',
          priceNum: 1200,
          slots: '2 Slots Vacant',
          image:
            'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80',
          description: 'Single bed, mattress, personal study desk, and storage locker.',
          features: ['Bed Frame', 'Study Table', 'Locker'],
        },
      ],
    };
    setProperties((prev) => [newProp, ...prev]);
    setLandlordTab('overview');
    setIsLandlordOnboardingOpen(true);
  };

  const handleUpdateLandlordProfile = (updated: {
    name?: string;
    email?: string;
    phone?: string;
    houseName?: string;
    profilePhoto?: string;
  }) => {
    setCurrentUser((prev) => {
      if (!prev) return null;
      const newName = updated.name || prev.name;
      const initials = newName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
      const next: CurrentUser = {
        ...prev,
        name: newName,
        email: updated.email || prev.email,
        subTitle: updated.houseName ? `${updated.houseName} Owner` : prev.subTitle,
        avatar: initials || prev.avatar,
        profilePhoto: updated.profilePhoto !== undefined ? updated.profilePhoto : prev.profilePhoto,
      };
      createSession(next);
      return next;
    });

    if (updated.houseName || updated.name || updated.phone) {
      setProperties((prev) =>
        prev.map((p) => {
          if (p.ownerName === currentUser?.name || p.id === 'bh-fritzcel') {
            return {
              ...p,
              name: updated.houseName || p.name,
              ownerName: updated.name || p.ownerName,
              phone: updated.phone || p.phone,
            };
          }
          return p;
        })
      );
    }
    showToast('Nabag-o na ang imong Landlord Profile!');
  };

  const handleAdminApprove = (item: LandlordVerificationItem) => {
    setVerifications((prev) =>
      prev.map((v) => (v.id === item.id ? { ...v, status: 'APPROVED' } : v))
    );
  };

  const handleAdminSendFixRequest = (
    item: LandlordVerificationItem,
    flaggedDocs: string[],
    reason: string
  ) => {
    setVerifications((prev) =>
      prev.map((v) => (v.id === item.id ? { ...v, status: 'NEEDS_FIX' } : v))
    );
  };

  const handleAdminApproveStudent = (item: StudentVerificationItem) => {
    setStudentVerifications((prev) =>
      prev.map((s) => (s.id === item.id ? { ...s, status: 'APPROVED' } : s))
    );
  };

  const handleAdminSendStudentFixRequest = (
    item: StudentVerificationItem,
    reason: string
  ) => {
    setStudentVerifications((prev) =>
      prev.map((s) => (s.id === item.id ? { ...s, status: 'NEEDS_FIX' } : s))
    );
  };

  // 0. FULL-SCREEN WEBSITE LANDING & AUTHENTICATION PORTAL (Displayed upon first opening the app)
  if (!currentUser) {
    return (
      <div className="min-h-screen w-full bg-[#053728] text-white flex flex-col font-sans select-none relative overflow-x-hidden">
        <FigmaAuthScreens
          initialScreen="splash"
          onNavigateHome={handleLogin}
          onRegisterStudent={(data) => {
            handleRegisterStudent(data);
          }}
          onRegisterLandlord={(data) => {
            handleRegisterLandlord(data);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen staynest-bg text-slate-800 flex flex-col font-sans select-none relative overflow-x-hidden">
      {/* Universal Liquid Glass Floating Refraction Glow Orbs */}
      <div className="fixed top-24 left-10 w-96 h-96 rounded-full bg-emerald-400/25 blur-3xl pointer-events-none animate-pulse z-0" />
      <div className="fixed bottom-24 right-10 w-[420px] h-[420px] rounded-full bg-amber-400/25 blur-3xl pointer-events-none animate-pulse z-0" />
      <div className="fixed top-1/2 left-1/3 w-80 h-80 rounded-full bg-teal-400/20 blur-3xl pointer-events-none z-0" />

      {/* 1. TOP WEBSITE HEADER BAR (Deep Emerald Green #053728 with crisp accents) */}
      <header className="sticky top-0 z-40 bg-[#053728]/95 backdrop-blur-xl border-b border-emerald-900/60 text-white shadow-md w-full shrink-0 flex-shrink-0">
        <div className="w-full overflow-x-auto no-scrollbar shrink-0 flex-shrink-0">
          <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-4 shrink-0">
            {/* Logo & Brand Identity with Universal Back Button */}
            <div className="flex items-center gap-3 shrink-0 flex-shrink-0 flex-nowrap whitespace-nowrap">
              {(role === 'student' ? (selectedProperty !== null || isMapOpen || studentTab !== 'explore') : (navHistory.length > 0)) && (
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/10 backdrop-blur-2xl border border-white/25 shadow-xl hover:bg-white/20 text-[#E5A93C] font-bold text-xs sm:text-sm flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shrink-0 flex-shrink-0 whitespace-nowrap"
                  title="Go back to previous screen"
                >
                  <ArrowLeft className="w-4 h-4 text-[#E5A93C] shrink-0" />
                  <span className="hidden sm:inline whitespace-nowrap">Back</span>
                </button>
              )}

              <div
                onClick={() => navigateStudentTab('explore')}
                className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group shrink-0 flex-shrink-0 flex-nowrap whitespace-nowrap"
              >
                <StayNestEmblem size="md" className="group-hover:scale-105 transition-transform shrink-0 flex-shrink-0" />
                <div className="min-w-0 shrink-0 flex-shrink-0">
                  <div className="flex items-center gap-2 flex-nowrap whitespace-nowrap">
                    <span className="font-serif italic font-bold text-xl sm:text-2xl lg:text-3xl tracking-tight text-[#EAA938] leading-tight drop-shadow-[0_1px_8px_rgba(234,169,56,0.3)] whitespace-nowrap shrink-0">
                      StayNest
                    </span>
                    <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-emerald-800/90 text-[10px] xl:text-xs font-bold text-emerald-200 border border-emerald-600/50 shrink-0 flex-shrink-0 whitespace-nowrap">
                      ADSSU Bunawan
                    </span>
                  </div>
                  <p className="font-serif italic text-[11px] text-[#F4F7F2] font-normal tracking-wide hidden xl:block truncate whitespace-nowrap">
                    A Smarter Way to Find Boarding Houses
                  </p>
                </div>
              </div>
            </div>

            {/* Center Navigation Links or Property Viewing Indicator */}
            {selectedProperty !== null ? (
              <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#04281D]/95 border border-emerald-700/80 text-emerald-200 text-xs font-bold shadow-inner shrink-0 flex-shrink-0 flex-nowrap whitespace-nowrap">
                <Home className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate max-w-[260px] whitespace-nowrap">Viewing Room: {selectedProperty.name}</span>
              </div>
            ) : (
              <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-[#04281D]/90 p-1.5 rounded-2xl border border-emerald-800/80 shadow-inner shrink-0 flex-shrink-0 flex-nowrap whitespace-nowrap">
                {role === 'student' ? (
                  <>
                    <button
                      onClick={() => navigateStudentTab('explore')}
                      className={`px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 flex-shrink-0 whitespace-nowrap ${
                        studentTab === 'explore' && !isMapOpen && !selectedProperty
                          ? 'bg-[#00875A] text-white shadow-xs'
                          : 'text-emerald-200 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Compass className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0" />
                      <span className="whitespace-nowrap">Explore Houses</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedProperty(null);
                        setIsMapOpen(true);
                      }}
                      className={`px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 flex-shrink-0 whitespace-nowrap ${
                        isMapOpen
                          ? 'bg-[#00875A] text-white shadow-xs'
                          : 'text-emerald-200 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-amber-400 shrink-0" />
                      <span className="whitespace-nowrap">Campus Map</span>
                    </button>

                    <button
                      onClick={() => navigateStudentTab('saved')}
                      className={`px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 flex-shrink-0 whitespace-nowrap ${
                        studentTab === 'saved'
                          ? 'bg-[#00875A] text-white shadow-xs'
                          : 'text-emerald-200 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Heart className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-rose-400 shrink-0" />
                      <span className="whitespace-nowrap">Saved ({savedIds.length})</span>
                    </button>

                    <button
                      onClick={() => navigateStudentTab('chat')}
                      className={`px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer relative shrink-0 flex-shrink-0 whitespace-nowrap ${
                        studentTab === 'chat'
                          ? 'bg-[#00875A] text-white shadow-xs'
                          : 'text-emerald-200 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <MessageSquare className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-emerald-300 shrink-0" />
                      <span className="whitespace-nowrap">Messages</span>
                      {unreadCount > 0 && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1 right-1 animate-pulse" />
                      )}
                    </button>

                    <button
                      onClick={() => navigateStudentTab('settings')}
                      className={`px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 flex-shrink-0 whitespace-nowrap ${
                        studentTab === 'settings'
                          ? 'bg-[#00875A] text-white shadow-xs'
                          : 'text-emerald-200 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-emerald-300 shrink-0" />
                      <span className="whitespace-nowrap">Settings</span>
                    </button>

                    <button
                      onClick={() => setIsOnboardingOpen(true)}
                      className="px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs xl:text-sm font-semibold text-emerald-200 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5 cursor-pointer shrink-0 flex-shrink-0 whitespace-nowrap border border-amber-400/30 bg-amber-400/10"
                      title="View StayNest Student Tutorial & Guide"
                    >
                      <HelpCircle className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-amber-300 shrink-0" />
                      <span className="whitespace-nowrap">Tutorial Guide</span>
                    </button>
                  </>
                ) : role === 'landlord' ? null : (
                  <>
                    <button
                      onClick={() => setAdminTab('queue')}
                      className={`px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs xl:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 flex-shrink-0 whitespace-nowrap ${
                        adminTab === 'queue'
                          ? 'bg-[#00875A] text-white shadow-xs'
                          : 'text-emerald-200 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-emerald-300 shrink-0" />
                      <span className="whitespace-nowrap">Verification Queue</span>
                    </button>
                    <button
                      onClick={() => setAdminTab('accredited')}
                      className={`px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs xl:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 flex-shrink-0 whitespace-nowrap ${
                        adminTab === 'accredited'
                          ? 'bg-[#00875A] text-white shadow-xs'
                          : 'text-emerald-200 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-amber-400 shrink-0" />
                      <span className="whitespace-nowrap">Accredited Houses ({properties.length})</span>
                    </button>
                    <button
                      onClick={() => setAdminTab('payments')}
                      className={`px-3 py-1.5 xl:px-4 xl:py-2 rounded-xl text-xs xl:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 flex-shrink-0 whitespace-nowrap ${
                        adminTab === 'payments'
                          ? 'bg-[#00875A] text-white shadow-xs'
                          : 'text-emerald-200 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Receipt className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#E5A93C] shrink-0" />
                      <span className="whitespace-nowrap">5% Commission & Payments</span>
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                    </button>
                  </>
                )}
              </nav>
            )}

            {/* Right: Authenticated User Profile & Sign Out */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 flex-shrink-0 flex-nowrap whitespace-nowrap">

              <div
                onClick={() => {
                  if (role === 'student') navigateStudentTab('profile');
                  if (role === 'landlord') setIsLandlordProfileOpen(true);
                }}
                className={`flex items-center gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/25 shadow-xl hover:bg-white/20 text-white transition-all shrink-0 flex-shrink-0 flex-nowrap whitespace-nowrap ${
                  role === 'student' || role === 'landlord'
                    ? 'cursor-pointer hover:border-amber-400/80 active:scale-95'
                    : ''
                }`}
                title={
                  role === 'student'
                    ? 'Click to view & edit student profile'
                    : role === 'landlord'
                    ? 'Click to view & edit landlord profile'
                    : currentUser.name
                }
              >
                <div className="relative shrink-0 flex-shrink-0">
                  {currentUser.profilePhoto ? (
                    <img
                      src={currentUser.profilePhoto}
                      alt={currentUser.name}
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-[#E5A93C] shadow-sm"
                    />
                  ) : (
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-400 text-[#053728] font-black text-xs flex items-center justify-center border-2 border-[#E5A93C] shadow-sm">
                      {currentUser.avatar}
                    </div>
                  )}
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#053728] absolute -bottom-0.5 -right-0.5 shadow-2xs" />
                </div>
                <div className="text-left hidden md:block max-w-[140px] lg:max-w-[170px] overflow-hidden shrink-0 flex-shrink-0">
                  <div className="font-bold text-xs sm:text-sm leading-tight text-white truncate capitalize whitespace-nowrap">{currentUser.name}</div>
                  <div className="text-[10px] sm:text-[11px] text-emerald-200 font-medium flex items-center gap-1 mt-0.5 min-w-0 whitespace-nowrap">
                    {currentUser.role === 'student' ? (
                      <>
                        <GraduationCap className="w-3 h-3 text-amber-300 shrink-0" />
                        <span className="truncate whitespace-nowrap">{currentUser.subTitle || 'ADSSU Student'}</span>
                      </>
                    ) : currentUser.role === 'landlord' ? (
                      <>
                        <Home className="w-3 h-3 text-amber-300 shrink-0" />
                        <span className="truncate whitespace-nowrap">{currentUser.subTitle || 'Accredited Landlord'}</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3 h-3 text-amber-300 shrink-0" />
                        <span className="truncate whitespace-nowrap">{currentUser.subTitle || 'LGU & Campus Admin'}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-white/10 backdrop-blur-2xl border border-white/25 shadow-xl hover:bg-rose-600/90 hover:border-rose-400 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shrink-0 flex-shrink-0 whitespace-nowrap"
                title="Sign Out of StayNest"
              >
                <LogOut className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline whitespace-nowrap">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN WEBSITE BODY */}
      <main className="flex-1 flex flex-col relative pb-20 lg:pb-0">
        {isTabLoading ? (
          <div className="flex-1 max-w-7xl mx-auto w-full p-6 sm:p-10 space-y-6 animate-pulse my-auto flex flex-col justify-center min-h-[500px]">
            <div className="flex items-center justify-between border-b border-emerald-900/30 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-800/30 animate-spin flex items-center justify-center border border-emerald-600/30">
                  <Sparkles className="w-5 h-5 text-[#E5A93C]" />
                </div>
                <div>
                  <div className="h-5 bg-emerald-800/30 rounded-lg w-48 mb-1.5" />
                  <div className="h-3 bg-emerald-800/20 rounded-md w-72" />
                </div>
              </div>
              <div className="h-9 bg-emerald-800/30 rounded-xl w-32 border border-emerald-600/20" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="h-64 bg-emerald-950/40 rounded-3xl border border-emerald-500/20 shadow-xl p-5 flex flex-col justify-between">
                <div className="h-32 bg-emerald-800/25 rounded-2xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-emerald-800/30 rounded-md w-3/4" />
                  <div className="h-3 bg-emerald-800/20 rounded-md w-1/2" />
                </div>
              </div>
              <div className="h-64 bg-emerald-950/40 rounded-3xl border border-emerald-500/20 shadow-xl p-5 flex flex-col justify-between">
                <div className="h-32 bg-emerald-800/25 rounded-2xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-emerald-800/30 rounded-md w-3/4" />
                  <div className="h-3 bg-emerald-800/20 rounded-md w-1/2" />
                </div>
              </div>
              <div className="h-64 bg-emerald-950/40 rounded-3xl border border-emerald-500/20 shadow-xl p-5 flex flex-col justify-between">
                <div className="h-32 bg-emerald-800/25 rounded-2xl" />
                <div className="space-y-2">
                  <div className="h-4 bg-emerald-800/30 rounded-md w-3/4" />
                  <div className="h-3 bg-emerald-800/20 rounded-md w-1/2" />
                </div>
              </div>
            </div>
          </div>
        ) : role === 'student' ? (
          /* VIEW 2: STUDENT PORTAL */
          <div className="flex-1 flex flex-col">
            {/* Property Detail View */}
            {selectedProperty ? (
              <FigmaPropertyDetail
                property={selectedProperty}
                onBack={handleGoBack}
                onChatLandlord={handleOpenChatWithLandlord}
                onCallOwner={(ph) => showToast(`Initiating direct call to landlord at ${ph}...`)}
                onConfirmBooking={(newBooking) => {
                  setBookings((prev) => [newBooking, ...prev]);
                  showToast(`Reservation Confirmed! Pass generated for ${newBooking.roomName}.`);
                }}
              />
            ) : isMapOpen ? (
              /* Interactive Campus Map View */
              <div className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 h-[750px]">
                  <FigmaInteractiveMap
                    properties={properties}
                    selectedPropertyId="bh-fritzcel"
                    onBack={handleGoBack}
                    onOpenDetails={(p) => {
                      pushNavState(studentTab, p, false);
                    }}
                    onMessageLandlord={handleOpenChatWithLandlord}
                  />
                </div>
              </div>
            ) : studentTab === 'explore' ? (
              /* Main Student Home with Verified Listings */
              <FigmaStudentHome
                properties={properties}
                savedIds={savedIds}
                onToggleSave={handleToggleSave}
                onSelectProperty={(p) => pushNavState(studentTab, p, false)}
                onOpenMap={() => pushNavState(studentTab, selectedProperty, true)}
                onOpenFilter={() => setIsFilterOpen(true)}
                onMessageLandlord={handleOpenChatWithLandlord}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                activeChip={activeChip}
                onChipChange={setActiveChip}
                onOpenTutorial={() => setIsOnboardingOpen(true)}
                onNavigateTab={navigateStudentTab}
              />
            ) : studentTab === 'saved' ? (
              /* Saved Favorites View */
              <section className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-10 py-4 sm:py-8 flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
                      Saved Boarding Houses ({savedIds.length})
                    </h2>
                    <p className="text-xs text-slate-500">
                      Your bookmarked accommodations for the ADSSU academic year
                    </p>
                  </div>
                  <button
                    onClick={handleGoBack}
                    className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 self-start sm:self-auto"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {properties.filter((p) => savedIds.includes(p.id)).map((p) => (
                    <div
                      key={p.id}
                      className="liquid-glass-card rounded-3xl overflow-hidden flex flex-col justify-between"
                    >
                      <div
                        onClick={() => pushNavState(studentTab, p, false)}
                        className="relative aspect-[16/10] cursor-pointer"
                      >
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        <span className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-[#0F172A]/85 text-[#34D399] font-bold text-xs">
                          {p.price} / mo
                        </span>
                      </div>
                      <div className="p-4 sm:p-5 space-y-3">
                        <h4 className="text-base font-bold text-slate-900">{p.name}</h4>
                        <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span>{p.distance} to ADSSU</span>
                        </p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => pushNavState(studentTab, p, false)}
                            className="flex-1 py-2 rounded-xl bg-[#00875A] text-white font-bold text-xs cursor-pointer"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleToggleSave(p.id)}
                            className="px-3 py-2 rounded-xl border border-rose-200 text-rose-500 hover:bg-rose-50 cursor-pointer"
                          >
                            <Heart className="w-4 h-4 fill-rose-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : studentTab === 'chat' ? (
              /* Student Direct Inquiries & Chat */
              <section className="max-w-4xl mx-auto w-full px-2 sm:px-6 lg:px-8 py-3 sm:py-6 flex-1 pb-20 lg:pb-0">
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-slate-200 h-[calc(100vh-180px)] min-h-[460px] sm:h-[720px] max-h-[760px]">
                  <FigmaStudentChat
                    threads={chatThreads}
                    setThreads={setChatThreads}
                    activeThreadId={activeChatThreadId}
                    setActiveThreadId={setActiveChatThreadId}
                    onBackToExplore={handleGoBack}
                  />
                </div>
              </section>
            ) : studentTab === 'settings' ? (
              /* Dedicated Student Housing Settings & Preferences */
              <FigmaStudentSettings
                onBackToExplore={handleGoBack}
                onShowToast={showToast}
                currentUser={currentUser}
                onUpdateProfile={handleUpdateStudentProfile}
              />
            ) : (
              /* Student Profile Screen */
              <section className="max-w-xl mx-auto w-full px-2.5 sm:px-6 lg:px-8 py-3 sm:py-8 flex-1">
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-slate-200">
                  <FigmaStudentProfile
                    onLogout={handleLogout}
                    onOpenSaved={() => navigateStudentTab('saved')}
                    onOpenMessages={() => navigateStudentTab('chat')}
                    userName={currentUser.name}
                    userEmail={currentUser.email}
                    userStudentId={currentUser.studentId || '2024-0192-B'}
                    userSubtitle={currentUser.subTitle}
                    userPhoto={currentUser.profilePhoto}
                    onUpdatePhoto={(url) => {
                      handleUpdateStudentProfile({ profilePhoto: url });
                    }}
                    onUpdateProfile={handleUpdateStudentProfile}
                  />
                </div>
              </section>
            )}

            {/* Filter Bottom Sheet Modal */}
            <FigmaFilterModal
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
              onApply={(filters) => {
                if (filters.distance.includes('1')) {
                  setActiveChip('Within 1 km');
                } else if (filters.maxPrice <= 1500) {
                  setActiveChip('Under ₱1,500');
                }
              }}
            />
          </div>
        ) : role === 'landlord' ? (
          /* VIEW 3: LANDLORD PORTAL */
          <section className="max-w-[1720px] mx-auto w-full p-2.5 sm:p-6 lg:p-10 flex-1 space-y-6">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-slate-200 min-h-0 flex-1 flex flex-col">
              {/* Landlord Sub Navigation Bar */}
              <div className="bg-[#04281D] px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between text-white border-b border-emerald-900 gap-2 overflow-hidden">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="font-bold text-xs sm:text-sm truncate text-white">
                    {currentUser?.subTitle?.replace(/ Owner$/i, '') || 'Boarding House'} Hub
                  </span>
                  <span className="text-emerald-300 text-[11px] sm:text-xs truncate">
                    · Hello, {currentUser?.name || 'Landlord'}
                  </span>
                </div>

                {/* Mobile Language & Status Badge */}
                <div className="flex md:hidden items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-bold text-emerald-200 bg-white/10 px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>EN / Visayan</span>
                  </span>
                </div>

                {/* Fully Scrollable Pill Navigation Strip for Desktop (Hidden on Mobile since navigation is in bottom nav bar) */}
                <div className="hidden md:flex md:w-auto overflow-x-auto flex-nowrap no-scrollbar items-center gap-1.5 px-4 py-2 scroll-smooth">
                  <button
                    onClick={() => setLandlordTab('overview')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer shrink-0 whitespace-nowrap transition-all ${
                      landlordTab === 'overview'
                        ? 'bg-[#00875A] text-white shadow-xs'
                        : 'text-emerald-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setLandlordTab('reservations')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-1.5 transition-all ${
                      landlordTab === 'reservations'
                        ? 'bg-[#00875A] text-white shadow-xs'
                        : 'text-emerald-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>Reservations</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  </button>
                  <button
                    onClick={() => setLandlordTab('rooms')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer shrink-0 whitespace-nowrap transition-all ${
                      landlordTab === 'rooms'
                        ? 'bg-[#00875A] text-white shadow-xs'
                        : 'text-emerald-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Rooms ({landlordRooms.length})
                  </button>
                  <button
                    onClick={() => setLandlordTab('earnings')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-1.5 transition-all ${
                      landlordTab === 'earnings'
                        ? 'bg-[#00875A] text-white shadow-xs'
                        : 'text-emerald-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Receipt className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>Earnings & 5% Ledger</span>
                  </button>
                  <button
                    onClick={() => setLandlordTab('premium')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer shrink-0 whitespace-nowrap flex items-center gap-1.5 transition-all ${
                      landlordTab === 'premium'
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-xs'
                        : 'text-amber-300 hover:text-white bg-amber-400/10 border border-amber-400/30'
                    }`}
                  >
                    <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
                    <span>Upgrade to Premium</span>
                  </button>
                  <button
                    onClick={() => setLandlordTab('messages')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer shrink-0 whitespace-nowrap transition-all ${
                      landlordTab === 'messages'
                        ? 'bg-[#00875A] text-white shadow-xs'
                        : 'text-emerald-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Inquiries & Feed
                  </button>
                  <button
                    onClick={() => setLandlordTab('settings')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer shrink-0 whitespace-nowrap transition-all ${
                      landlordTab === 'settings'
                        ? 'bg-[#00875A] text-white shadow-xs'
                        : 'text-emerald-200 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Settings & Rules
                  </button>
                  <button
                    onClick={() => setIsLandlordProfileOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer shrink-0 whitespace-nowrap text-emerald-200 hover:text-white hover:bg-white/10 flex items-center gap-1.5 transition-all"
                  >
                    <User className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>My Profile</span>
                  </button>
                  <button
                    onClick={() => setIsLandlordOnboardingOpen(true)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer shrink-0 whitespace-nowrap text-amber-300 hover:text-white bg-amber-400/10 border border-amber-400/30 flex items-center gap-1.5 transition-all"
                    title="View Landlord Onboarding & Management Guide"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>Landlord Guide</span>
                  </button>
                </div>
              </div>

              {/* Views */}
              <FigmaLandlordViews
                activeTab={landlordTab}
                onTabChange={(t) => {
                  triggerTabLoading();
                  setLandlordTab(t);
                }}
                onLogout={handleLogout}
                onOpenAddRoom={() => setIsAddRoomOpen(true)}
                onOpenEditRoom={(r) => setEditRoom(r)}
                onOpenTenant={(r) => setTenantDetailRoom(r)}
                rooms={landlordRooms}
                onUpdateRooms={handleUpdateLandlordRooms}
                bookings={bookings}
                onUpdateBookings={setBookings}
                subscription={subscription}
                onUpdateSubscription={setSubscription}
                isFeaturedListing={isFeaturedListing}
                onToggleFeaturedListing={setIsFeaturedListing}
              />
            </div>

            {/* Landlord Modals */}
            <FigmaEditVacantRoomModal
              room={editRoom}
              isOpen={Boolean(editRoom)}
              onClose={() => setEditRoom(null)}
              onSave={(updated) => {
                handleUpdateLandlordRooms((prev) =>
                  prev.map((r) => (r.id === updated.id ? { ...r, ...updated } : r))
                );
                showToast(`Nabag-o na ang litrato ug detalye sa ${updated.name}!`);
              }}
            />

            <FigmaTenantDetailModal
              room={tenantDetailRoom}
              isOpen={Boolean(tenantDetailRoom)}
              onClose={() => setTenantDetailRoom(null)}
              onMessageTenant={(name) => {
                setTenantDetailRoom(null);
                triggerTabLoading();
                setLandlordTab('messages');
              }}
              onMarkVacant={(id) => {
                handleUpdateLandlordRooms((prev) =>
                  prev.map((r) =>
                    r.id === id ? { ...r, status: 'VACANT', tenant: undefined } : r
                  )
                );
                showToast('Nabag-o na ang status sa kwarto: Bakante na.');
              }}
            />

            <FigmaAddNewRoomModal
              isOpen={isAddRoomOpen}
              onClose={() => setIsAddRoomOpen(false)}
              onAddRoom={(newRoom) => {
                handleUpdateLandlordRooms((prev) => [newRoom, ...prev]);
                showToast(`Nadugang na ang ${newRoom.name} sa inventory!`);
              }}
            />

            <FigmaLandlordProfileModal
              isOpen={isLandlordProfileOpen}
              onClose={() => setIsLandlordProfileOpen(false)}
              currentUser={currentUser}
              onUpdateProfile={handleUpdateLandlordProfile}
              onLogout={handleLogout}
              roomsCount={landlordRooms.length}
              occupiedRoomsCount={landlordRooms.filter((r) => r.status === 'OCCUPIED').length}
            />
          </section>
        ) : (
          /* VIEW 4: ADMIN CONSOLE */
          <section className="max-w-[1720px] mx-auto w-full p-4 sm:p-6 lg:p-10 flex-1">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200 min-h-[750px]">
              <FigmaAdminViews
                onLogout={handleLogout}
                verifications={verifications}
                studentVerifications={studentVerifications}
                onApprove={handleAdminApprove}
                onApproveStudent={handleAdminApproveStudent}
                onSendFixRequest={handleAdminSendFixRequest}
                onSendStudentFixRequest={handleAdminSendStudentFixRequest}
                activeTab={adminTab}
                onTabChange={(t) => {
                  triggerTabLoading();
                  setAdminTab(t);
                }}
                properties={properties}
                bookings={bookings}
                onUpdateBookings={setBookings}
                subscriptions={[subscription]}
                onUpdateSubscriptions={(subs) => {
                  if (subs[0]) setSubscription(subs[0]);
                }}
              />
            </div>
          </section>
        )}
      </main>

      {/* 3. WEBSITE FOOTER */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <StayNestEmblem size="sm" />
            <div>
              <p className="font-bold text-slate-800">
                StayNest · ADSSU Student Boarding House Finder
              </p>
              <p className="text-[11px] text-emerald-800">
                Agusan del Sur State University (ADSSU), Bunawan, Agusan del Sur
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600">
            <span>ADSSU BSIT Team: Angelo Nuer, Kean Ide, Conrado Candari, Jolina Asuncion, Mary Joy Doroteo</span>
            <span>·</span>
            <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              Verified Bunawan LGU & ADSSU Directory
            </span>
          </div>
        </div>
      </footer>

      {/* 4. TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#053728] text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-slide-up text-sm font-semibold max-w-md">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5A93C] animate-ping shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-auto text-emerald-300 hover:text-white p-1 rounded-md hover:bg-white/10"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 5. DOWNLOAD APP & ABOUT TEAM MODALS */}
      <StayNestAppDownloadModal
        isOpen={showDownloadAppModal}
        onClose={() => setShowDownloadAppModal(false)}
      />
      <StayNestGuideAndTeamModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
      <FigmaOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={() => setIsOnboardingOpen(false)}
        studentName={currentUser?.name || 'Student'}
      />
      <FigmaLandlordOnboardingModal
        isOpen={isLandlordOnboardingOpen}
        onClose={() => setIsLandlordOnboardingOpen(false)}
        onComplete={() => setIsLandlordOnboardingOpen(false)}
        landlordName={currentUser?.name || 'Landlord'}
        houseName={currentUser?.subTitle || 'Boarding House'}
      />

      {/* 6. MOBILE FIXED THUMB NAVIGATION BAR */}
      {currentUser && (
        <nav
          aria-label="Mobile Bottom Navigation"
          className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#053728]/95 backdrop-blur-xl border-t border-emerald-900/80 px-2 py-1.5 shadow-[0_-8px_24px_rgba(0,0,0,0.4)] safe-area-bottom"
        >
          {currentUser.role === 'student' ? (
            <div className="flex items-center justify-around gap-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedProperty(null);
                  setIsMapOpen(false);
                  setStudentTab('explore');
                }}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
                  studentTab === 'explore' && !isMapOpen
                    ? 'text-white font-bold bg-white/10'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                <Compass className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] tracking-tight">Explore</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedProperty(null);
                  setIsMapOpen(true);
                }}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
                  isMapOpen
                    ? 'text-white font-bold bg-white/10'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                <MapPin className="w-5 h-5 mb-0.5 text-[#E5A93C]" />
                <span className="text-[10px] tracking-tight">Map</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedProperty(null);
                  setIsMapOpen(false);
                  setStudentTab('saved');
                }}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] relative ${
                  studentTab === 'saved' && !isMapOpen
                    ? 'text-white font-bold bg-white/10'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                <Heart className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] tracking-tight">Saved</span>
                {savedIds.length > 0 && (
                  <span className="absolute top-1 right-2.5 w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedProperty(null);
                  setIsMapOpen(false);
                  setStudentTab('chat');
                }}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] relative ${
                  studentTab === 'chat' && !isMapOpen
                    ? 'text-white font-bold bg-white/10'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                <MessageSquare className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] tracking-tight">Chat</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-2.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedProperty(null);
                  setIsMapOpen(false);
                  setStudentTab('profile');
                }}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
                  studentTab === 'profile' && !isMapOpen
                    ? 'text-white font-bold bg-white/10'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                <User className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] tracking-tight">Profile</span>
              </button>
            </div>
          ) : currentUser.role === 'landlord' ? (
            <div className="flex items-center justify-around gap-1">
              <button
                type="button"
                onClick={() => setLandlordTab('overview')}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
                  landlordTab === 'overview'
                    ? 'text-white font-bold bg-white/10'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                <Home className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] tracking-tight">Overview</span>
              </button>

              <button
                type="button"
                onClick={() => setLandlordTab('reservations')}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] relative ${
                  landlordTab === 'reservations'
                    ? 'text-white font-bold bg-white/10'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                <Users className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] tracking-tight">Bookings</span>
                {bookings.filter((b) => b.paymentStatus === 'PENDING').length > 0 && (
                  <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setLandlordTab('rooms')}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
                  landlordTab === 'rooms'
                    ? 'text-white font-bold bg-white/10'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                <Layers className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] tracking-tight">Rooms ({landlordRooms.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setLandlordTab('earnings')}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
                  landlordTab === 'earnings'
                    ? 'text-white font-bold bg-white/10'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                <Receipt className="w-5 h-5 mb-0.5 text-amber-300" />
                <span className="text-[10px] tracking-tight">Earnings</span>
              </button>

              <button
                type="button"
                onClick={() => setLandlordTab('settings')}
                className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
                  landlordTab === 'settings'
                    ? 'text-white font-bold bg-white/10'
                    : 'text-emerald-300/80 hover:text-white'
                }`}
              >
                <Settings className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] tracking-tight">Settings</span>
              </button>
            </div>
          ) : null}
        </nav>
      )}
    </div>
  );
};

