export type UserRole = 'donor' | 'ngo' | 'admin' | 'public';
export type DonorType = 'individual' | 'restaurant' | 'hotel' | 'caterer';
export type FoodCategory = 'cooked' | 'raw' | 'packaged' | 'dry' | 'beverage';
export type DonationStatus = 'available' | 'claimed' | 'in-transit' | 'completed' | 'cancelled';
export type Language = 'en' | 'te' | 'hi' | 'ta' | 'kn';
export type Theme = 'light' | 'dark';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  address: string;
  donorType?: DonorType;
  ngoRegId?: string;
  isVerified?: boolean;
  avatarUrl?: string;
  points: number;
  badges: string[];
  joinedDate: string;
}

export interface FoodDonation {
  id: string;
  donorId: string;
  donorName: string;
  donorType: DonorType | 'ngo'; 
  title: string;
  category: FoodCategory;
  quantity: string; // e.g., "50 Meals" or "10 kg"
  quantityValue: number; // numerical representation for aggregate math
  expiryTime: string; // ISO datetime or relative
  expiryHours: number; // hours remaining
  location: string;
  lat: number;
  lng: number;
  instructions: string;
  status: DonationStatus;
  imageUrl?: string;
  createdAt: string;
  claimedByNgoId?: string;
  claimedByNgoName?: string;
  pickupTime?: string;
}

export interface PickupRequest {
  id: string;
  donationId: string;
  donorId: string;
  donorName: string;
  ngoId: string;
  ngoName: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  scheduledTime: string;
  notes?: string;
  updatedAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'success' | 'alert' | 'urgent';
  link?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  role: 'donor' | 'ngo';
  points: number;
  donationsCount: number;
  badgesCount: number;
  type?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
