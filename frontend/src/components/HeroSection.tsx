'use client';
import React from 'react';

interface HeroSectionProps {
  onJoin(): void;
  open: boolean;
}

export function HeroSection({ onJoin, open }: HeroSectionProps) {
  return (
    <div
      className={`relative z-10 flex h-full w-full items-center transform transition-transform duration-700 ease-out ${
        open ? '-translate-x-full' : 'translate-x-0'
      }`}
    >
      <div className="w-1/2 flex flex-col items-start justify-center px-12">
        <h1 className="text-8xl font-extrabold text-white">Hey!</h1>
        <p className="mt-4 text-5xl font-semibold text-white">Grow your network</p>
        <p className="mt-16 text-5xl font-semibold text-white">Meaningfully.</p>

        <button
          onClick={onJoin}
          className="mt-12 rounded-2xl px-8 py-4 text-xl font-bold text-white shadow-lg transform-gpu transition-all duration-200 ease-out hover:shadow-2xl hover:-translate-y-1 active:shadow-md active:translate-y-1 border-4 border-transparent"
          style={{
            backgroundColor: '#1F1D1B',
            borderTopColor: '#ffbf3c',
            borderLeftColor: '#ffbf3c',
            borderRightColor: '#005487',
            borderBottomColor: '#005487',
            boxShadow: 'inset 0 2px 6px rgba(0, 0, 0, 0.6)'
          }}
        >
          Join ember @ UC Merced
        </button>
      </div>
    </div>
  );
}