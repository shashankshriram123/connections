'use client';
import React from 'react';

interface Props {
  name: string;
  setName(v: string): void;
  insta: string;
  setInsta(v: string): void;
  onNext(): void;
}

export function Step3NameIG({ name, setName, insta, setInsta, onNext }: Props) {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Your name &amp; Instagram</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="mb-4 w-full rounded-lg bg-white/20 px-4 py-3 placeholder-white/70 text-white focus:outline-none"
      />
      <input
        type="text"
        placeholder="@yourhandle"
        value={insta}
        onChange={e => setInsta(e.target.value)}
        className="mb-4 w-full rounded-lg bg-white/20 px-4 py-3 placeholder-white/70 text-white focus:outline-none"
      />
      <button
        onClick={onNext}
        disabled={!name.trim() || !insta.trim()}
        className="mt-2 w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-xl font-medium text-white disabled:opacity-50"
      >
        Next →
      </button>
    </>
  );
}
