import { loadStripe } from '@stripe/stripe-js';

const STRIPE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!STRIPE_KEY) {
  console.warn('Stripe publishable key not found. Payment features will be disabled.');
}

export const stripePromise = STRIPE_KEY 
  ? loadStripe(STRIPE_KEY)
      .catch(err => {
        console.error('Failed to initialize Stripe:', err);
        return null;
      })
  : null;

export const isStripeEnabled = !!STRIPE_KEY;