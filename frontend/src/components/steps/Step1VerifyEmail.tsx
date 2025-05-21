'use client';
import React from 'react';

interface Props {
  email: string;
  setEmail(v: string): void;
  onNext(): void;
}

export function Step1VerifyEmail({ email, setEmail, onNext }: Props) {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Prove you’re a bobcat 🐱</h2>
      <input
        type="email"
        placeholder="you@ucmerced.edu"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="mb-4 w-full rounded-lg bg-white/20 px-4 py-3 placeholder-white/70 text-white focus:outline-none"
      />
      <button
        onClick={onNext}
        className="mt-2 w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-xl font-medium text-white"
      >
        Next →
      </button>
    </>
  );
}
