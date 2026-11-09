export type UserRole = 'student' | 'landlord';

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface Review {
  id: string;
  studentName: string;
  courseAndYear: string;
  rating: number;
  date: string;
  comment: string;
  verifiedStudent: boolean;
  avatarUrl?: string;
}

export interface RoomOption {
  id: string;
  name: string;
  type: 'bedspace' | 'private_room' | 'shared_room';
  priceMonthly: number;
  totalSlots: number;
  availableSlots: number;
  depositRequired: number;
  description: string;
}

export interface BoardingHouse {
  id: string;
  name: string;
  tagline: string;
  address: string;
  barangay: string;
  coordinates: LocationCoordinates;
  distanceKm: number;
  walkMinutes: number;
  priceStart: number;
  verified: boolean;
  verificationLevel: 'ADSSU Verified' | 'Barangay Certified' | 'Pending Inspection';
  rating: number;
  reviewCount: number;
  genderPolicy: 'all' | 'female_only' | 'male_only';
  
  // Slide 3 Core Problem Matchers
  waterSupply: {
    status: '24/7 Continuous' | 'Scheduled (Morning/Night)' | 'Deep Well with Tank';
    is247: boolean;
    hasWaterTank: boolean;
    description: string;
  };
  
  floodRisk: {
    level: 'Low' | 'Moderate' | 'Elevated Safe';
    description: string;
  };
  
  security: {
    hasCCTV: boolean;
    hasSecurityGuard: boolean;
    hasGatedPerimeter: boolean;
    curfew: string; // e.g. "10:00 PM" or "None"
    curfewStrict: boolean;
    details: string;
  };
  
  rules: {
    curfew: string;
    visitorsAllowed: string;
    cookingAllowed: boolean;
    petsAllowed: boolean;
    laundryAllowed: boolean;
    alcoholProhibited: boolean;
  };
  
  amenities: {
    wifi: boolean;
    studyArea: boolean;
    individualMeter: boolean;
    potableDrinkingWater: boolean;
    kitchenArea: boolean;
    laundrySpace: boolean;
    motorcycleParking: boolean;
    emergencyLight: boolean;
  };

  images: string[];
  contactPerson: string;
  landlordId: string;
  contactNumber: string;
  rooms: RoomOption[];
  reviews: Review[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderRole: UserRole;
  senderName: string;
  text: string;
  timestamp: string;
  isQuickAction?: boolean;
}

export interface Conversation {
  id: string;
  houseId: string;
  houseName: string;
  studentId: string;
  studentName: string;
  landlordId: string;
  landlordName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface BookingRequest {
  id: string;
  houseId: string;
  houseName: string;
  roomName: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  studentIdNumber: string;
  targetMoveInDate: string;
  visitDate?: string;
  type: 'visit_schedule' | 'room_reservation';
  status: 'pending' | 'confirmed' | 'declined';
  notes?: string;
  createdAt: string;
}

export interface FilterState {
  searchQuery: string;
  maxPrice: number; // e.g. 1500
  maxDistanceKm: number; // e.g. 1.0
  gender: 'all' | 'female_only' | 'male_only';
  waterOnly247: boolean;
  floodLowOnly: boolean;
  securityVerifiedOnly: boolean;
  amenities: string[];
}
