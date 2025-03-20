'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { truncateText } from '@/lib/utils';

interface BookCardProps {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  author?: string;
}

export function BookCard({ id, title, description, price, imageUrl, author }: BookCardProps) {
  const { addItemToCart, loading } = useCart();

  const handleAddToCart = async () => {
    await addItemToCart(id);
  };

  return (
    <div className="card flex flex-col rounded-lg overflow-hidden h-full">
      <div className="relative h-64 bg-black">
        {/* Using unoptimized for external images to avoid domain restrictions */}
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          unoptimized={!imageUrl.startsWith('/')} // Use unoptimized for external URLs
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            const imgElement = e.currentTarget as HTMLImageElement;
            imgElement.src = '/book-placeholder.jpg';
          }}
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-[#daa520] mb-1">{title}</h3>
        {/* Author info */}
        <p className="text-sm text-[#a0a0a0] mb-3 italic">
          by {author || "Andrzej Sapkowski"}
        </p>
        <div 
          className="text-sm text-[#a0a0a0] mb-4 flex-grow" 
        >
          {truncateText(description.replace(/<[^>]*>?/gm, ''), 120)}
        </div>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-[#e2e2e2]">{price}</span>
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="btn-primary px-4 py-2 rounded text-sm font-medium"
          >
            {loading ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}