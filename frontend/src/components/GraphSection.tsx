'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const ProceduralGraph = dynamic(
  () => import('@/components/ProceduralGraph'),
  { ssr: false }
);

export function GraphSection({ open }: { open: boolean }) {
  return (
    <div
      className={`
        absolute top-0 h-full
        transition-all duration-700 ease-out
        ${open
          ? 'left-0 w-full flex items-center justify-center overflow-visible'
          : 'right-0 w-3/5 overflow-hidden'}
      `}
    >
      <div
        className={`
          transform transition-transform duration-700 ease-out
          ${open ? 'scale-150' : 'scale-100'}
        `}
      >
        <ProceduralGraph />
      </div>
    </div>
  );
}
