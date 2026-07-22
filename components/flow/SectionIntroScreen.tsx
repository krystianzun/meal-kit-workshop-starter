"use client";

import type { SectionIntroStep } from "@/lib/flow-data";
import { NextButton } from "./NextButton";
import { SectionIntroIcon } from "./SectionIntroIcon";

interface SectionIntroScreenProps {
  step: SectionIntroStep;
  onNext: () => void;
}

export function SectionIntroScreen({ step, onNext }: SectionIntroScreenProps) {
  return (
    <div className="animate-step-in flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <SectionIntroIcon icon={step.icon} />
        <div className="flex flex-col gap-4 text-center">
          <h2 className="text-2xl font-medium leading-8 text-lime-950">
            {step.headline}
          </h2>
          <p className="text-base text-olive-600">{step.subhead}</p>
        </div>
      </div>
      <div className="pt-2">
        <NextButton label={step.cta} onClick={onNext} />
      </div>
    </div>
  );
}
