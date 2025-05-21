'use client';
import React from 'react';

interface Props {
  name: string;
  ties: string[];
  setTies(v: string[]): void;
  onFinish(): void;
}

export function Step4Ties({ name, ties, setTies, onFinish }: Props) {
  const addTie = () => {
    if (ties.length < 5) setTies([...ties, '']);
  };

  const updateTie = (i: number, v: string) => {
    const copy = [...ties];
    copy[i] = v;
    setTies(copy);
  };

  const anyFilled = ties.some(t => t.trim() !== '');

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">
        Hey {name}
        <br />
        Who are your strongest ties?
      </h2>

      {ties.map((t, i) => (
        <input
          key={i}
          type="text"
          placeholder="@friendhandle"
          value={t}
          onChange={e => updateTie(i, e.target.value)}
          className="mb-4 w-full rounded-lg bg-white/20 px-4 py-3 placeholder-white/70 text-white focus:outline-none"
        />
      ))}

      {ties.length < 5 && (
        <button
          onClick={addTie}
          className="mb-4 w-full px-6 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-xl font-medium text-white"
        >
          + Connection
        </button>
      )}

      <button
        onClick={onFinish}
        disabled={!anyFilled}
        className="mt-2 w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-xl font-medium text-white disabled:opacity-50"
      >
        Finish
      </button>
    </>
  );
}
