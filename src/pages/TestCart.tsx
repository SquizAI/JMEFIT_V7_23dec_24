import React from 'react';
import MainLayout from '../components/layouts/MainLayout';
import TestProduct from '../components/TestProduct';
import CartDrawer from '../components/cart/CartDrawer';

const TestCart = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold mb-8">Test Cart</h1>
        <div className="max-w-md">
          <TestProduct />
        </div>
      </div>
      <CartDrawer />
    </MainLayout>
  );
};

export default TestCart;