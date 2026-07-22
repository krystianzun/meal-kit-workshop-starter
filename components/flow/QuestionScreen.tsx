"use client";

import type { QuestionStep } from "@/lib/flow-data";
import type { FlowAnswers } from "@/lib/flow-data";
import { isOptionSelected } from "@/lib/flow-resolver";
import { OptionCard } from "./OptionCard";

interface QuestionScreenProps {
  step: QuestionStep;
  answers: FlowAnswers;
  onSelectSingle: (value: string) => void;
  onToggleMulti: (value: string) => void;
}

export function QuestionScreen({
  step,
  answers,
  onSelectSingle,
  onToggleMulti,
}: QuestionScreenProps) {
  return (
    <div className="animate-step-in flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-medium leading-8 text-lime-950">
          {step.title}
        </h2>
        <p className="text-base text-olive-600">{step.subtitle}</p>
      </div>

      <div className="flex flex-col gap-2">
        {step.options.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            selected={isOptionSelected(step, answers, option.value)}
            onClick={() =>
              step.selection === "single"
                ? onSelectSingle(option.value)
                : onToggleMulti(option.value)
            }
          />
        ))}
      </div>
    </div>
  );
}
