import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, User, Hospital, Booking, UserRole } from '@/types';
import { mockHospitals, mockUser } from '@/services/MockData';

// Action types
type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_HOSPITALS'; payload: Hospital[] }
  | { type: 'SET_SELECTED_HOSPITAL'; payload: Hospital | null }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'UPDATE_BOOKING'; payload: { id: string; updates: Partial<Booking> } }
  | { type: 'SET_SEARCH_FILTERS'; payload: SearchFilters };

// Search filters interface
export interface SearchFilters {
  city: string;
  district: string;
  specialty: string;
  searchTerm: string;
}

// App state interface
interface AppState {
  auth: AuthState;
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  bookings: Booking[];
  searchFilters: SearchFilters;
}

// Initial state
const initialState: AppState = {
  auth: {
    isAuthenticated: false,
    user: null,
    isLoading: false,
  },
  hospitals: [],
  selectedHospital: null,
  bookings: [],
  searchFilters: {
    city: '',
    district: '',
    specialty: '',
    searchTerm: '',
  },
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        auth: { ...state.auth, isLoading: action.payload },
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        auth: {
          isAuthenticated: true,
          user: action.payload,
          isLoading: false,
        },
      };
    case 'LOGOUT':
      return {
        ...state,
        auth: {
          isAuthenticated: false,
          user: null,
          isLoading: false,
        },
        selectedHospital: null,
      };
    case 'SET_HOSPITALS':
      return {
        ...state,
        hospitals: action.payload,
      };
    case 'SET_SELECTED_HOSPITAL':
      return {
        ...state,
        selectedHospital: action.payload,
      };
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      };
    case 'UPDATE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map(booking =>
          booking.id === action.payload.id
            ? { ...booking, ...action.payload.updates }
            : booking
        ),
      };
    case 'SET_SEARCH_FILTERS':
      return {
        ...state,
        searchFilters: action.payload,
      };
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  login: (phone: string, verificationCode: string) => Promise<boolean>;
  logout: () => void;
  searchHospitals: (filters: SearchFilters) => Hospital[];
  selectHospital: (hospital: Hospital) => void;
  createBooking: (bookingData: Omit<Booking, 'id' | 'createdAt'>) => void;
} | null>(null);

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load initial data
  useEffect(() => {
    // Load hospitals
    dispatch({ type: 'SET_HOSPITALS', payload: mockHospitals });

    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }

    // Load bookings from localStorage
    const savedBookings = localStorage.getItem('userBookings');
    if (savedBookings) {
      try {
        const bookings = JSON.parse(savedBookings);
        bookings.forEach((booking: Booking) => {
          dispatch({ type: 'ADD_BOOKING', payload: booking });
        });
      } catch (error) {
        console.error('Error parsing saved bookings:', error);
      }
    }
  }, []);

  // Helper functions
  const login = async (phone: string, verificationCode: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock verification - accept any 6-digit code
    if (verificationCode.length === 6) {
      let user: User;

      // Hard coded phone numbers for different roles
      if (phone === '+84987654321' || phone === '0987654321') {
        // Doctor login
        user = {
          id: 'doctor-1',
          phone: phone,
          name: 'BS. Nguyễn Văn Minh',
          email: 'doctor.minh@medihome.vn',
          role: UserRole.Doctor,
          hospitalId: 'hospital-1',
          isVerified: true
        };
      } else if (phone === '+84976543210' || phone === '0976543210') {
        // Receptionist login
        user = {
          id: 'receptionist-1',
          phone: phone,
          name: 'Nguyễn Thị Mai',
          email: 'receptionist.mai@medihome.vn',
          role: UserRole.Receptionist,
          hospitalId: 'hospital-1',
          isVerified: true
        };
      } else if (phone === '+84965432109' || phone === '0965432109') {
        // Another doctor login
        user = {
          id: 'doctor-2',
          phone: phone,
          name: 'BS. Trần Thị Lan',
          email: 'doctor.lan@medihome.vn',
          role: UserRole.Doctor,
          hospitalId: 'hospital-1',
          isVerified: true
        };
      } else if (phone === '+84954321098' || phone === '0954321098') {
        // Another receptionist login
        user = {
          id: 'receptionist-2',
          phone: phone,
          name: 'Trần Thị Lan',
          email: 'receptionist.lan@medihome.vn',
          role: UserRole.Receptionist,
          hospitalId: 'hospital-1',
          isVerified: true
        };
      } else {
        // Default patient login for any other phone number
        user = {
          ...mockUser,
          phone: phone,
        };
      }

      // Save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(user));

      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return true;
    }

    dispatch({ type: 'SET_LOADING', payload: false });
    return false;
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userBookings');
    dispatch({ type: 'LOGOUT' });
  };

  const searchHospitals = (filters: SearchFilters): Hospital[] => {
    let filtered = state.hospitals;

    if (filters.city) {
      filtered = filtered.filter(hospital => hospital.city === filters.city);
    }

    if (filters.district) {
      filtered = filtered.filter(hospital => hospital.district === filters.district);
    }

    if (filters.specialty) {
      filtered = filtered.filter(hospital =>
        hospital.specialties.some(specialty =>
          specialty.toLowerCase().includes(filters.specialty.toLowerCase())
        )
      );
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(hospital =>
        hospital.name.toLowerCase().includes(term) ||
        hospital.address.toLowerCase().includes(term) ||
        hospital.specialties.some(specialty => specialty.toLowerCase().includes(term))
      );
    }

    return filtered;
  };

  const selectHospital = (hospital: Hospital) => {
    dispatch({ type: 'SET_SELECTED_HOSPITAL', payload: hospital });
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const booking: Booking = {
      ...bookingData,
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: 'ADD_BOOKING', payload: booking });

    // Save to localStorage
    const updatedBookings = [...state.bookings, booking];
    localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
  };

  const value = {
    state,
    dispatch,
    login,
    logout,
    searchHospitals,
    selectHospital,
    createBooking,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
