'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { LineItem } from '@commercetools/platform-sdk';

interface CartItemProps {
  item: LineItem;
}

export function CartItem({ item }: CartItemProps) {
  const { removeItemFromCart, updateItemQuantity, loading } = useCart();

  // Extract necessary info
  const name = item.name['en-AU'] || item.name['en'] || 'Unknown Product';
  const imageUrl = item.variant.images?.[0]?.url || '/book-placeholder.jpg';
  const price = item.price.value;
  const formattedPrice = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(price.centAmount / 100);
  
  const totalPrice = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: price.currencyCode,
  }).format((price.centAmount * item.quantity) / 100);

  const handleRemove = () => {
    removeItemFromCart(item.id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    updateItemQuantity(item.id, newQuantity);
  };

  return (
    <div className="cart-item flex py-4 gap-4">
      <div className="relative w-24 h-32 flex-shrink-0">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover rounded"
        />
      </div>
      
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-[#daa520]">{name}</h3>
        <p className="text-sm text-[#a0a0a0]">{formattedPrice} each</p>
        
        <div className="flex items-center gap-3 mt-2">
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={loading || item.quantity <= 1}
            className="w-8 h-8 flex items-center justify-center bg-[#3a3a3a] rounded-full"
          >
            -
          </button>
          <span className="text-[#e2e2e2]">{item.quantity}</span>
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={loading}
            className="w-8 h-8 flex items-center justify-center bg-[#3a3a3a] rounded-full"
          >
            +
          </button>
        </div>
      </div>
      
      <div className="flex flex-col items-end gap-2">
        <span className="text-lg font-bold text-[#e2e2e2]">{totalPrice}</span>
        <button 
          onClick={handleRemove}
          disabled={loading}
          className="text-[#8b0000] hover:text-[#ff0000] text-sm"
        >
          Remove
        </button>
      </div>
    </div>
  );
}