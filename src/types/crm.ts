export interface Customer {
  id: string;
  email: string;
  display_name: string;
  role: string;
  created_at: string;
  last_login?: string;
  subscription?: Subscription;
  orders?: Order[];
  progress?: Progress[];
  notes?: CustomerNote[];
}

export interface CustomerNote {
  id: string;
  customer_id: string;
  note: string;
  type: 'general' | 'support' | 'billing' | 'training';
  created_at: string;
  created_by: string;
}

export interface CustomerActivity {
  id?: string;
  customer_id: string;
  type: 'login' | 'purchase' | 'support' | 'training' | 'progress';
  description: string;
  metadata?: Record<string, any>;
  created_at?: string;
}

export interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'cancelled' | 'expired';
  started_at: string;
  expires_at?: string;
}

export interface Order {
  id: string;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
}

export interface Progress {
  id: string;
  date: string;
  weight?: number;
  body_fat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
  };
  notes?: string;
}