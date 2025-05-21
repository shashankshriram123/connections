'use client';
import React from 'react';

interface Props {
  code: string;
  setCode(v: string): void;
  onNext(): void;
}

export function Step2EnterCode({ code, setCode, onNext }: Props) {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Enter your 6-digit code</h2>
      <input
        type="text"
        placeholder="123456"
        maxLength={6}
        value={code}
        onChange={e => setCode(e.target.value)}
        className="mb-4 w-full rounded-lg bg-white/20 px-4 py-3 placeholder-white/70 text-white focus:outline-none"
      />
      <button
        onClick={onNext}
        disabled={code.length !== 6}
        className="mt-2 w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-xl font-medium text-white disabled:opacity-50"
      >
        Next →
      </button>
    </>
  );
}
