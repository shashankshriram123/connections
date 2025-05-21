'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ProceduralGraph = dynamic(
  () => import('@/components/ProceduralGraph'),
  { ssr: false }
);

export default function Home() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [insta, setInsta] = useState('');
  const [ties, setTies] = useState<string[]>(['', '', '']);

  // Advance to next step
  function goNext() {
    if (step < 4) setStep(step + 1 as 2 | 3 | 4);
  }

  // Finish & reset
  function finish() {
    // TODO: submit data to backend...
    setTimeout(() => {
      setPanelOpen(false);
      setStep(1);
      setEmail('');
      setCode('');
      setName('');
      setInsta('');
      setTies(['', '', '']);
    }, 300);
  }

  // Update a tie handle
  function updateTie(idx: number, val: string) {
    setTies(ties.map((t, i) => (i === idx ? val : t)));
  }

  // Add another connection (up to 5)
  function addTie() {
    if (ties.length < 5) setTies([...ties, '']);
  }

  // Progress bar: 0%, 33%, 66%, 100%
  const progressWidth =
    step === 1 ? '0%' : step === 2 ? '33%' : step === 3 ? '66%' : '100%';

  return (
    <main className="relative h-screen w-screen bg-[#1F1D1B] overflow-hidden">
      {/* 1) Procedural Graph */}
      <div
        className={`
          absolute top-0 h-full
          transition-all duration-700 ease-out
          ${panelOpen
            ? 'left-0 w-full flex items-center justify-center overflow-visible'
            : 'right-0 w-3/5 overflow-hidden'}
        `}
      >
        <div
          className={`
            transform transition-transform duration-700 ease-out
            ${panelOpen ? 'scale-150' : 'scale-100'}
          `}
        >
          <ProceduralGraph />
        </div>
      </div>

      {/* 2) Headline + Join Button */}
      <div
        className={`
          relative z-10 flex h-full w-full items-center
          transform transition-transform duration-700 ease-out
          ${panelOpen ? '-translate-x-[60%]' : 'translate-x-0'}
        `}
      >
        <div className="w-1/2 flex flex-col items-start justify-center px-12">
          <h1 className="text-8xl font-extrabold text-white">Hey!</h1>
          <p className="mt-4 text-5xl font-semibold text-white">
            Grow your network
          </p>
          <p className="mt-16 text-5xl font-semibold text-white">
            Meaningfully.
          </p>
          <button
            onClick={() => setPanelOpen(true)}
            className="mt-12 rounded-lg bg-gray-600 px-8 py-4 text-xl font-medium text-black hover:bg-gray-500"
          >
            Join ember @ UC Merced
          </button>
        </div>
      </div>

      {/* 3) Slide-in Panel */}
      <div
        className={`
          fixed top-0 right-0 h-full
          w-2/3 md:w-1/2 lg:w-1/3
          bg-[#1F1D1B]/60 shadow-2xl z-20
          transform transition-transform duration-700 ease-out
          ${panelOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="relative h-full flex flex-col">
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button
              onClick={() => setPanelOpen(false)}
              className="text-white text-2xl font-bold leading-none"
              aria-label="Close panel"
            >
              ×
            </button>
          </div>

          <div className="px-8 flex-grow text-white flex flex-col">
            {step === 1 && (
              <>
                <h2 className="text-3xl font-bold mb-6">
                  Prove you’re a bobcat 🐱
                </h2>
                <input
                  type="email"
                  placeholder="you@ucmerced.edu"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mb-4 w-full rounded-lg bg-white/20 px-4 py-3 placeholder-white/70 text-white focus:outline-none"
                />
                <button
                  onClick={goNext}
                  className="mt-2 w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-xl font-medium text-white"
                >
                  Next →
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-3xl font-bold mb-6">
                  Enter your 6-digit code
                </h2>
                <input
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className="mb-4 w-full rounded-lg bg-white/20 px-4 py-3 placeholder-white/70 text-white focus:outline-none"
                />
                <button
                  onClick={goNext}
                  className="mt-2 w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-xl font-medium text-white"
                >
                  Next →
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-3xl font-bold mb-6">
                  Your name &amp; Instagram
                </h2>
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
                  onClick={goNext}
                  className="mt-2 w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-xl font-medium text-white"
                >
                  Next →
                </button>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="text-3xl font-bold mb-6">
                  Who are your closest ties 🤔💭
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
                    className="mb-4 text-sm text-blue-400 underline"
                  >
                    + Add connection
                  </button>
                )}
                <button
                  onClick={finish}
                  className="mt-2 w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-xl font-medium text-white"
                >
                  Finish
                </button>
              </>
            )}
          </div>

          {/* Progress Bar (only under the open panel) */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
            <div
              className="h-full bg-white transition-all duration-700 ease-in-out"
              style={{ width: progressWidth }}
            />
          </div>
        </div>
      </div>

      {/* Ember logo */}
      <footer className="absolute bottom-0 right-8 z-30">
        <img
          src="/lightmode_ember_logo.png"
          alt="Ember logo"
          className="h-40 w-40"
        />
      </footer>
    </main>
  );
}
