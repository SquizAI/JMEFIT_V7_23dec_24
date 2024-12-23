export type UserRole = 'user' | 'admin' | 'trainer';

export interface User {
  id: string;
  email: string;
  displayName?: string;
  role: UserRole;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}