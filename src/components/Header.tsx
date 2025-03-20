'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export function Header() {
  const { totalItems } = useCart();

  return (
    <header className="bg-[#121212] border-b border-[#3a3a3a] sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 relative medallion-icon">
            <Image 
              src="/medallion.svg" 
              alt="Witcher Medallion" 
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-[#daa520] font-bold text-xl">The Witcher Library</h1>
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/" className="text-[#e2e2e2] hover:text-[#daa520] transition-colors">
            Home
          </Link>
          <Link href="/books" className="text-[#e2e2e2] hover:text-[#daa520] transition-colors">
            Books
          </Link>
          <Link href="/cart" className="relative">
            <div className="p-2 text-[#e2e2e2] hover:text-[#daa520] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </div>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#8b0000] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}