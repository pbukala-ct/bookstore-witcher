import React from 'react';
import Link from 'next/link';

interface BannerProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export function Banner({ title, subtitle, ctaText, ctaLink }: BannerProps) {
  return (
    <div className="witcher-banner py-20 px-6 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-[#daa520] mb-4 drop-shadow-lg">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-[#e2e2e2] max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>
      )}
      {ctaText && ctaLink && (
        <Link 
          href={ctaLink}
          className="btn-primary px-8 py-3 rounded-md text-lg font-medium inline-block"
        >
          {ctaText}
        </Link>
      )}
    </div>
  );
}