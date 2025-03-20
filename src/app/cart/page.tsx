'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/components/CartItem';

export default function CartPage() {
  const { cart, loading, totalItems, totalPrice, checkout } = useCart();
  const [orderId, setOrderId] = React.useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const newOrderId = await checkout();
      if (newOrderId) {
        setOrderId(newOrderId);
      }
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (orderId) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="p-8 card rounded-lg">
            <h2 className="text-3xl font-bold text-[#daa520] mb-4">Order Confirmation</h2>
            <p className="text-xl text-[#e2e2e2] mb-6">
              Thank you for your order!
            </p>
            <p className="text-[#a0a0a0] mb-8">
              Your order ID is: <span className="font-mono text-[#daa520]">{orderId}</span>
            </p>
            <p className="text-[#e2e2e2] mb-6">
              We'll ship your books to the provided address in Sydney, Australia.
            </p>
            <Link
              href="/"
              className="btn-primary px-6 py-3 rounded-md text-lg font-medium inline-block"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading && !cart) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-xl text-[#e2e2e2]">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.lineItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#daa520] mb-4">Your Cart is Empty</h2>
          <p className="text-[#e2e2e2] mb-8">
            Looks like you haven't added any books to your cart yet.
          </p>
          <Link
            href="/books"
            className="btn-primary px-6 py-3 rounded-md text-lg font-medium inline-block"
          >
            Browse Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#daa520] mb-8">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#e2e2e2] mb-4">Items ({totalItems})</h2>
            
            <div className="divide-y divide-[#3a3a3a]">
              {cart.lineItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-[#e2e2e2] mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-[#a0a0a0]">Subtotal</span>
                <span className="text-[#e2e2e2]">{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#a0a0a0]">Shipping</span>
                <span className="text-[#e2e2e2]">Free</span>
              </div>
              <div className="pt-3 border-t border-[#3a3a3a] flex justify-between font-bold">
                <span className="text-[#e2e2e2]">Total</span>
                <span className="text-[#daa520]">{totalPrice}</span>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut || loading}
              className="w-full btn-primary py-3 px-4 rounded-md text-center font-medium"
            >
              {isCheckingOut ? 'Processing...' : 'Checkout'}
            </button>
            
            <p className="text-xs text-[#a0a0a0] mt-4 text-center">
              Shipping to Sydney, Australia only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}