'use client';
import React, { useState } from 'react';
import { Step1VerifyEmail } from './steps/Step1VerifyEmail';
import { Step2EnterCode } from './steps/Step2EnterCode';
import { Step3NameIG } from './steps/Step3NameIG';
import { Step4Ties } from './steps/Step4Ties';
import { ProgressBar } from './ProgressBar';

export function StepWizard({ onFinish }: { onFinish(): void }) {
  const [step, setStep] = useState<1|2|3|4>(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [insta, setInsta] = useState('');
  const [ties, setTies] = useState<string[]>(['', '', '']);

  const goNext = () => { if (step < 4) setStep(step + 1 as 2|3|4); };
  const finish = () => {
    // TODO: submit to backend…
    setTimeout(() => {
      setStep(1);
      setEmail(''); setCode(''); setName(''); setInsta(''); setTies(['','','']);
      onFinish();
    }, 300);
  };

  return (
    <div className="flex-grow flex flex-col">
      {step === 1 && (
        <Step1VerifyEmail email={email} setEmail={setEmail} onNext={goNext}/>
      )}
      {step === 2 && (
        <Step2EnterCode code={code} setCode={setCode} onNext={goNext}/>
      )}
      {step === 3 && (
        <Step3NameIG
          name={name} setName={setName}
          insta={insta} setInsta={setInsta}
          onNext={goNext}
        />
      )}
      {step === 4 && (
          <Step4Ties
          name={name}
          ties={ties}
          setTies={setTies}
          onFinish={finish}
      />
      )}
      <ProgressBar step={step}/>
    </div>
  );
}
