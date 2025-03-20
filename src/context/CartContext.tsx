'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart } from '@commercetools/platform-sdk';
import { DEFAULT_SHIPPING_ADDRESS } from '@/lib/commercetools';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: Error | null;
  addItemToCart: (productId: string, quantity?: number) => Promise<void>;
  removeItemFromCart: (lineItemId: string) => Promise<void>;
  updateItemQuantity: (lineItemId: string, quantity: number) => Promise<void>;
  checkout: () => Promise<string | null>;
  totalItems: number;
  totalPrice: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper function to call the cart API
async function callCartApi(action: string, data: any = {}) {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      action,
      ...data
    }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error with cart operation');
  }
  
  return response.json();
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Initialize or load cart on mount
  useEffect(() => {
    async function initializeCart() {
      setLoading(true);
      try {
        // Check for existing cart ID in localStorage
        const cartId = localStorage.getItem('witcherCartId');
        
        if (cartId) {
          try {
            // Try to get existing cart
            const existingCart = await callCartApi('getCart', { cartId });
            setCart(existingCart);
          } catch (err) {
            // If cart not found, create a new one
            console.warn('Existing cart not found, creating new cart');
            const newCart = await callCartApi('createCart');
            setCart(newCart);
            localStorage.setItem('witcherCartId', newCart.id);
          }
        } else {
          // No cart ID stored, create a new cart
          const newCart = await callCartApi('createCart');
          setCart(newCart);
          localStorage.setItem('witcherCartId', newCart.id);
        }
           
      } catch (err: any) {
        console.error('Error initializing cart:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    initializeCart();
  }, []);

  // Calculate total items in cart
  const totalItems = cart?.lineItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  // Calculate total price
  const totalPrice = cart?.totalPrice?.centAmount 
    ? new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: cart.totalPrice.currencyCode,
      }).format(cart.totalPrice.centAmount / 100)
    : '$0.00';

  // Add item to cart
  const addItemToCart = async (productId: string, quantity: number = 1) => {
    if (!cart) return;
    
    setLoading(true);
    try {
      const updatedCart = await callCartApi('addToCart', {
        cartId: cart.id, 
        version: cart.version, 
        productId, 
        quantity
      });
      setCart(updatedCart);
         
    } catch (err: any) {
      console.error('Error adding item to cart:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeItemFromCart = async (lineItemId: string) => {
    if (!cart) return;
    
    setLoading(true);
    try {
      const updatedCart = await callCartApi('removeFromCart', {
        cartId: cart.id, 
        version: cart.version, 
        lineItemId
      });
      setCart(updatedCart);
         
    } catch (err: any) {
      console.error('Error removing item from cart:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateItemQuantity = async (lineItemId: string, quantity: number) => {
    if (!cart) return;
    
    setLoading(true);
    try {
      const updatedCart = await callCartApi('updateQuantity', {
        cartId: cart.id, 
        version: cart.version, 
        lineItemId, 
        quantity
      });
      setCart(updatedCart);
         
    } catch (err: any) {
      console.error('Error updating item quantity:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Checkout (convert cart to order)
  const checkout = async (): Promise<string | null> => {
    if (!cart) return null;
    
    setLoading(true);
    try {
      // Set shipping address first
      await callCartApi('setShippingAddress', {
        cartId: cart.id,
        version: cart.version,
        address: DEFAULT_SHIPPING_ADDRESS
      });
      
      // Get updated cart after setting address
      const updatedCart = await callCartApi('getCart', { cartId: cart.id });
      
      // Create order from cart
      const order = await callCartApi('checkout', {
        cartId: cart.id,
        version: updatedCart.version
      });
      
      // Clear cart after successful order
      localStorage.removeItem('witcherCartId');
      setCart(null);
      
      return order.id;
         
    } catch (err: any) {
      console.error('Error during checkout:', err);
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addItemToCart,
        removeItemFromCart,
        updateItemQuantity,
        checkout,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}