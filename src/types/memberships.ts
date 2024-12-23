export interface Membership {
  id: string;
  name: string;
  description: string;
  features: string[];
  price_monthly: number;
  price_yearly: number;
  status: 'active' | 'inactive';
  popular: boolean;
  type: 'app' | 'trainer' | 'nutrition' | 'plus';
  duration?: string;
  level?: string;
  details?: {
    whoIsItFor?: string;
    notes?: string[];
  };
}