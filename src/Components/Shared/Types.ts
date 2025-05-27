export enum SelectedPage {
  Home = 'home',
  Hospitals = 'hospitals',
  Services = 'services',
  Booking = 'booking',
  Doctors = 'doctors',
  Reviews = 'reviews',
}

export enum SelectedService {
  Neurology = 'neurology',
  Cardiology = 'cardiology',
  Orthopedics = 'orthopedics',
  Surgery = 'surgery',
  Dentistry = 'dentistry',
  Radiology = 'radiology',
  Urology = 'urology',
  Medicine = 'medicine',
  SeeMore = 'seemore',
}

export enum UserRole {
  Patient = 'patient',
  HospitalAdmin = 'hospital_admin',
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  district: string;
  city: string;
  phone: string;
  email: string;
  website?: string;
  image: string;
  rating: number;
  totalReviews: number;
  specialties: string[];
  description: string;
  facilities: string[];
  workingHours: {
    weekdays: string;
    weekends: string;
  };
  location: {
    lat: number;
    lng: number;
  };
  doctors: Doctor[];
  services: HospitalService[];
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  education: string[];
  image: string;
  rating: number;
  consultationFee: number;
  availableSlots: TimeSlot[];
  hospitalId: string;
}

export interface HospitalService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
}

export interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  role: UserRole;
  hospitalId?: string; // for hospital admins
  isVerified: boolean;
}

export interface Booking {
  id: string;
  patientId: string;
  hospitalId: string;
  doctorId: string;
  serviceId?: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  symptoms: string;
  notes?: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}
