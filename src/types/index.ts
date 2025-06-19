// Re-export all types from services
export * from '../services/Types';

// Additional app-wide types can be added here
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
