'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

const ProceduralGraph = dynamic(
  () => import('@/components/ProceduralGraph'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative h-screen w-screen bg-[#1F1D1B] overflow-hidden">
      {/* Graph clipped to right half */}
      <div className="absolute inset-y-0 right-0 w-1/2 h-full overflow-hidden">
        <ProceduralGraph />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex h-full w-full">
        <div className="w-1/2 flex flex-col items-start justify-center px-12">
          <h1 className="text-8xl font-extrabold text-white">Hey!</h1>
          <p className="mt-4 text-5xl font-semibold text-white">Grow your network</p>
          <p className="mt-16 text-5xl font-semibold text-white">Meaningfully.</p>
          <Link
            href="/get-started"
            className="mt-12 rounded-lg bg-gray-600 px-8 py-4 text-xl font-medium text-black hover:bg-gray-500"
          >
            Join ember @ UC Merced
          </Link>
        </div>
      </div>

      {/* Logo */}
      <footer className="absolute bottom-0 right-8 z-10">
        <img
          src="/lightmode_ember_logo.png"
          alt="Ember logo"
          className="h-40 w-40"
        />
      </footer>
    </main>
  );
}
