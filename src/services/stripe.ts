import { supabase } from '../lib/supabase';

export const StripeService = {
  async createPaymentIntent(amount: number) {
    try {
      const { data, error } = await supabase.functions.invoke('create-payment-intent', {
        body: { amount }
      });

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error creating payment intent:', err);
      throw err;
    }
  },

  async createCheckoutSession(items: Array<{ id: string; quantity: number }>) {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { 
          items: items.map(item => ({
            ...item,
            price: item.price,
            name: item.name,
            images: item.image ? [item.image] : []
          }))
        }
      });

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error creating checkout session:', err);
      throw err;
    }
  }
};