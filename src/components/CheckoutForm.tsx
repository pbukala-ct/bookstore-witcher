'use client';

import React, { useState } from 'react';
import { DEFAULT_SHIPPING_ADDRESS } from '@/lib/commercetools';

interface CheckoutFormProps {
  onSubmit: () => void;
}

export function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [formState, setFormState] = useState({
    firstName: DEFAULT_SHIPPING_ADDRESS.firstName,
    lastName: DEFAULT_SHIPPING_ADDRESS.lastName,
    streetName: DEFAULT_SHIPPING_ADDRESS.streetName,
    postalCode: DEFAULT_SHIPPING_ADDRESS.postalCode,
    city: DEFAULT_SHIPPING_ADDRESS.city,
    email: DEFAULT_SHIPPING_ADDRESS.email,
    phone: DEFAULT_SHIPPING_ADDRESS.phone
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[#a0a0a0] mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-[#e2e2e2]"
            required
          />
        </div>
        <div>
          <label className="block text-[#a0a0a0] mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-[#e2e2e2]"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-[#a0a0a0] mb-1">Street Address</label>
        <input
          type="text"
          name="streetName"
          value={formState.streetName}
          onChange={handleChange}
          className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-[#e2e2e2]"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[#a0a0a0] mb-1">City</label>
          <input
            type="text"
            name="city"
            value={formState.city}
            onChange={handleChange}
            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-[#e2e2e2]"
            required
            readOnly
          />
        </div>
        <div>
          <label className="block text-[#a0a0a0] mb-1">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formState.postalCode}
            onChange={handleChange}
            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-[#e2e2e2]"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-[#a0a0a0] mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-[#e2e2e2]"
          required
        />
      </div>
      
      <div>
        <label className="block text-[#a0a0a0] mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-[#e2e2e2]"
          required
        />
      </div>
      
      <div className="text-center pt-4">
        <p className="text-[#a0a0a0] text-sm mb-4">
          All orders currently ship to Sydney, Australia only
        </p>
        <button
          type="submit"
          className="w-full btn-primary py-3 px-4 rounded-md text-center font-medium"
        >
          Complete Order
        </button>
      </div>
    </form>
  );
}