export const env = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY
  },
  stripe: {
    publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
  }
} as const;

// Validate required environment variables
const requiredEnvVars = [
  ['VITE_SUPABASE_URL', env.supabase.url],
  ['VITE_SUPABASE_ANON_KEY', env.supabase.anonKey]
] as const;

for (const [name, value] of requiredEnvVars) {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}