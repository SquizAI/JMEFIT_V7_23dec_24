import React from 'react';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { ProfileProvider } from '../contexts/ProfileContext';
import { HelmetProvider } from 'react-helmet-async';

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ProfileProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ProfileProvider>
      </AuthProvider>
    </HelmetProvider>
  );
};