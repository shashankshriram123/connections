'use client';

import React, { useState } from 'react';
import { GraphSection } from '@/components/GraphSection';
import { HeroSection } from '@/components/HeroSection';
import { OnboardingPanel } from '@/components/OnboardingPanel';
import { StepWizard } from '@/components/StepWizard';

export default function Home() {
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <main className="relative h-screen w-screen bg-[#1F1D1B] overflow-hidden">
      <GraphSection open={panelOpen} />

      <HeroSection
        open={panelOpen}
        onJoin={() => setPanelOpen(true)}
      />

      <OnboardingPanel open={panelOpen} onClose={() => setPanelOpen(false)}>
        <StepWizard onFinish={() => setPanelOpen(false)} />
      </OnboardingPanel>

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
