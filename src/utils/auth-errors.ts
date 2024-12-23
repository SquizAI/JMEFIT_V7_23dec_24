export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_IN_USE: 'Email already registered',
  WEAK_PASSWORD: 'Password must be at least 8 characters',
  INVALID_EMAIL: 'Invalid email format',
  USER_NOT_FOUND: 'User not found',
  PROFILE_CREATION_FAILED: 'Failed to create user profile',
  NETWORK_ERROR: 'Network error. Please check your connection',
  UNKNOWN_ERROR: 'An unknown error occurred'
} as const;

export function getAuthErrorMessage(error: unknown): string {
  if (!error) return AUTH_ERRORS.UNKNOWN_ERROR;

  // Handle Supabase AuthApiError
  if (error && typeof error === 'object' && '__isAuthError' in error) {
    const authError = error as { message: string, status?: number };
    
    // Handle Supabase auth errors
    if (authError.message.includes('already registered')) {
      return AUTH_ERRORS.EMAIL_IN_USE;
    }
    if (authError.status === 401) {
      return AUTH_ERRORS.INVALID_CREDENTIALS;
    }
    if (authError.message.includes('Password should be')) {
      return AUTH_ERRORS.WEAK_PASSWORD;
    }
    if (authError.message.includes('Invalid email')) {
      return AUTH_ERRORS.INVALID_EMAIL;
    }
    return authError.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return AUTH_ERRORS.UNKNOWN_ERROR;
}