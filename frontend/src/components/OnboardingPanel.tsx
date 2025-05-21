'use client';
import React from 'react';

export function OnboardingPanel({
  open,
  onClose,
  children
}: {
  open: boolean;
  onClose(): void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`
        fixed top-0 right-0 h-full
        w-2/3 md:w-1/2 lg:w-1/3
        bg-[#1F1D1B]/60 shadow-2xl z-20
        transform transition-transform duration-700 ease-out
        ${open ? 'translate-x-0' : 'translate-x-full'}
      `}
    >
      <div className="relative h-full flex flex-col">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-white text-2xl font-bold leading-none"
            aria-label="Close panel"
          >
            ×
          </button>
        </div>
        <div className="px-8 flex-grow text-white flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
