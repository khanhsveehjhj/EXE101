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
  Doctor = 'doctor',
  Receptionist = 'receptionist',
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

// Additional interfaces for role-specific data
export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: 'consultation' | 'follow-up' | 'emergency' | 'routine';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
  symptoms?: string;
  notes?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentId: string;
  date: string;
  diagnosis: string;
  symptoms: string;
  treatment: string;
  medications: Medication[];
  notes: string;
  followUpDate?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
  };
}

// Enhanced Appointment Management Types
export interface AppointmentRequest {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'follow-up' | 'emergency' | 'routine' | 'specialist';
  status: 'pending' | 'approved' | 'declined' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show' | 'rescheduled';
  symptoms: string;
  notes?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  bookingSource: 'online' | 'walk-in' | 'doctor-initiated' | 'receptionist';
  createdAt: string;
  approvedAt?: string;
  declineReason?: string;
  rescheduleRequested?: boolean;
  originalDate?: string;
  originalTime?: string;
  conflicts?: ConflictInfo[];
  estimatedCost?: number;
  insuranceCovered?: boolean;
}

export interface ConflictInfo {
  type: 'appointment' | 'break' | 'meeting' | 'unavailable' | 'holiday';
  conflictingAppointmentId?: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  suggestedAlternatives?: TimeSlotSuggestion[];
}

export interface TimeSlotSuggestion {
  date: string;
  time: string;
  confidence: number;
  reason: string;
  doctorAvailability: boolean;
  estimatedWaitTime?: number;
}

export interface QueueItem {
  id: string;
  appointmentId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  appointmentTime: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: 'scheduled' | 'arrived' | 'waiting' | 'in-consultation' | 'completed' | 'no-show';
  waitTime: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  type: string;
  estimatedDuration: number;
  queuePosition?: number;
  estimatedCallTime?: string;
}

export interface NotificationItem {
  id: string;
  type: 'appointment_request' | 'appointment_approved' | 'appointment_declined' | 'patient_arrived' | 'queue_update' | 'payment_due' | 'system_alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionRequired?: boolean;
  relatedId?: string; // appointment ID, patient ID, etc.
}

export interface PaymentRecord {
  id: string;
  appointmentId: string;
  patientId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'paid' | 'partial' | 'overdue' | 'cancelled';
  paymentMethod: 'cash' | 'card' | 'insurance' | 'bank_transfer';
  paidAt?: string;
  dueDate: string;
  services: ServiceItem[];
  insuranceInfo?: InsuranceInfo;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  coveragePercentage: number;
  approvalCode?: string;
}

// Additional app-wide types
export interface AppConfig {
  apiUrl: string;
  version: string;
}

export interface SearchFilters {
  city?: string;
  district?: string;
  specialty?: string;
  rating?: number;
  priceRange?: {
    min: number;
    max: number;
  };
}