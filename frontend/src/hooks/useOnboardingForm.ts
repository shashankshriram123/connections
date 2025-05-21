// src/hooks/useOnboardingForm.ts
import { useState } from 'react';

export function useOnboardingForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code,  setCode]  = useState('');
  const [name,  setName]  = useState('');
  const [insta, setInsta] = useState('');
  const [ties,  setTies]  = useState<string[]>(['', '', '']);

  const next = () => setStep(s => Math.min(4, s + 1));
  const finish = () => { /* submit and close panel */ };

  return {
    step,
    data: { email, code, name, insta, ties },
    handlers: {
      step1: { email, setEmail },
      step2: { code, setCode },
      step3: { name, setName, insta, setInsta },
      step4: { ties, setTies },
    },
    next,
    finish
  };
}
