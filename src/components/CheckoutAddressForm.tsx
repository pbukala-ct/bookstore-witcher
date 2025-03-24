'use client';

import React, { useState, useEffect } from 'react';
import { DEFAULT_SHIPPING_ADDRESS } from '@/lib/commercetools';

export function CheckoutAddressForm() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    streetName: '',
    postalCode: '',
    city: '',
    country: 'AU',
    email: '',
    phone: ''
  });

  // Initialize with default values on component mount
  useEffect(() => {
    console.log("Setting up address form with:", DEFAULT_SHIPPING_ADDRESS);
    setFormState({
      firstName: DEFAULT_SHIPPING_ADDRESS.firstName || '',
      lastName: DEFAULT_SHIPPING_ADDRESS.lastName || '',
      streetName: DEFAULT_SHIPPING_ADDRESS.streetName || '',
      postalCode: DEFAULT_SHIPPING_ADDRESS.postalCode || '',
      city: DEFAULT_SHIPPING_ADDRESS.city || '',
      country: 'AU',
      email: DEFAULT_SHIPPING_ADDRESS.email || '',
      phone: DEFAULT_SHIPPING_ADDRESS.phone || ''
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#daa520] mb-4">Shipping Address</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[#a0a0a0] mb-1 text-sm">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formState.firstName}
            onChange={handleChange}
            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-[#e2e2e2]"
          />
        </div>
        <div>
          <label className="block text-[#a0a0a0] mb-1 text-sm">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formState.lastName}
            onChange={handleChange}
            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-[#e2e2e2]"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-[#a0a0a0] mb-1 text-sm">Street Address</label>
        <input
          type="text"
          name="streetName"
          value={formState.streetName}
          onChange={handleChange}
          className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-[#e2e2e2]"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[#a0a0a0] mb-1 text-sm">City</label>
          <input
            type="text"
            name="city"
            value={formState.city}
            onChange={handleChange}
            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-[#e2e2e2]"
          />
        </div>
        <div>
          <label className="block text-[#a0a0a0] mb-1 text-sm">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            value={formState.postalCode}
            onChange={handleChange}
            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-[#e2e2e2]"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-[#a0a0a0] mb-1 text-sm">Country</label>
        <select
          name="country"
          value={formState.country}
          onChange={handleChange}
          className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-[#e2e2e2]"
        >
          <option value="AU">Australia</option>
        </select>
      </div>
      
      <div>
        <label className="block text-[#a0a0a0] mb-1 text-sm">Email</label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-[#e2e2e2]"
        />
      </div>
      
      <div>
        <label className="block text-[#a0a0a0] mb-1 text-sm">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formState.phone}
          onChange={handleChange}
          className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded px-3 py-2 text-[#e2e2e2]"
        />
      </div>
      
      <div className="pt-2">
        <p className="text-[#a0a0a0] text-xs">
          Currently shipping to Sydney, Australia only
        </p>
      </div>
    </div>
  );
}