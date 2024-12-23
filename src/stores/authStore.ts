import { atom } from 'jotai';
import { AuthService } from '../services/auth';
import type { User } from '../types/auth';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
  initialized: false
};

export const authStateAtom = atom<AuthState>(initialState);

export const authActionsAtom = atom(
  null,
  async (get, set, action: { type: string; payload?: any }) => {
    const currentState = get(authStateAtom);

    switch (action.type) {
      case 'LOGIN':
        try {
          set(authStateAtom, { ...currentState, loading: true, error: null });
          const user = await AuthService.login(action.payload.email, action.payload.password);
          set(authStateAtom, { user, loading: false, error: null, initialized: true });
        } catch (err) {
          set(authStateAtom, {
            ...currentState,
            error: err instanceof Error ? err.message : 'Failed to login',
            loading: false,
            initialized: true
          });
          throw err;
        }
        break;

      case 'LOGOUT':
        try {
          set(authStateAtom, { ...currentState, loading: true, error: null });
          await AuthService.logout();
          set(authStateAtom, { user: null, loading: false, error: null, initialized: true });
        } catch (err) {
          set(authStateAtom, {
            ...currentState,
            error: err instanceof Error ? err.message : 'Failed to logout',
            loading: false
          });
          throw err;
        }
        break;

      case 'SET_USER':
        set(authStateAtom, {
          ...currentState,
          user: action.payload,
          loading: false,
          initialized: true
        });
        break;

      case 'SET_ERROR':
        set(authStateAtom, {
          ...currentState,
          error: action.payload,
          loading: false
        });
        break;
    }
  }
);