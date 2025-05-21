'use client';
import React from 'react';

export function ProgressBar({ step }: { step: number }) {
  const width =
    step === 1 ? '0%' :
    step === 2 ? '33%' :
    step === 3 ? '66%' : '100%';

  return (
    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
      <div
        className="h-full bg-white transition-all duration-700 ease-in-out"
        style={{ width }}
      />
    </div>
  );
}
