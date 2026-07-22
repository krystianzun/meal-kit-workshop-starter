"use client";

import Image from "next/image";
import type { WelcomeStep } from "@/lib/flow-data";
import { NextButton } from "./NextButton";

interface WelcomeScreenProps {
  step: WelcomeStep;
  onNext: () => void;
}

export function WelcomeScreen({ step, onNext }: WelcomeScreenProps) {
  return (
    <div className="animate-step-in flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
      <div className="flex flex-1 flex-col gap-6">
        <h1 className="text-3xl font-medium leading-tight text-lime-950 md:text-4xl md:leading-tight">
          {step.headline}
        </h1>
        <p className="text-base text-olive-600">{step.subhead}</p>
        <div className="pt-2 md:max-w-xs">
          <NextButton label={step.cta} onClick={onNext} />
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg md:flex-1">
        <Image
          src={step.imageSrc}
          alt={step.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
    </div>
  );
}
