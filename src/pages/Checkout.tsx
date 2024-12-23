import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { stripePromise, isStripeEnabled } from '../config/stripe';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../components/layouts/MainLayout';
import CheckoutForm from '../components/checkout/CheckoutForm';

const Checkout = () => {
  const { state } = useCart();
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isStripeEnabled) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-red-500/10 text-red-500 p-6 rounded-lg max-w-md text-center">
          <h2 className="text-lg font-semibold mb-2">Payment System Unavailable</h2>
          <p>Our payment system is currently unavailable. Please try again later.</p>
        </div>
      </div>
    );
  }

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (formData: any) => {
    setLoading(true);
    setError('');

    try {
      // Handle authentication if needed
      if (formData.checkoutType === 'login') {
        await signIn(formData.email, formData.password);
      } else if (formData.checkoutType === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await signUp(formData.email, formData.password, formData.name);
      }

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      // Create Stripe checkout session
      const session = await StripeService.createCheckoutSession(
        state.items.map(item => ({
          id: item.productId, 
          quantity: item.quantity,
          price: item.price,
          name: item.title,
          images: item.image ? [item.image] : []
        }))
      );

      if (!session?.id) throw new Error('Failed to create checkout session');

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id
      });

      if (result.error) {
        throw new Error(result.error.message);
      }
      
    } catch (err) {
      setError('Payment failed. Please try again.');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-400">Add some items to your cart to checkout</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-zinc-900 rounded-lg p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Checkout</h2>
            <p className="text-gray-400">Complete your purchase</p>
            <div className="mt-4 text-sm text-gray-400">
              {state.items.length} items • Total: ${total.toFixed(2)}
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="space-y-6 mb-8">
            <h3 className="text-xl font-semibold">Order Summary</h3>
            {state.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-black p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-[#3dd8e8] font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            
            <div className="border-t border-zinc-800 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-[#3dd8e8]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <CheckoutForm onSubmit={handleSubmit} loading={loading} />

          <div className="mt-6 text-center text-sm text-gray-400">
            <Lock className="inline-block w-4 h-4 mr-1" />
            Secure payment powered by Stripe
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Checkout;