"use client";

import {
  canAdvance,
  getQuestionProgress,
  showsProgressHeader,
} from "@/lib/flow-resolver";
import { useCurrentStep, useFlowStore } from "@/lib/flow-store";
import { FlowLayout } from "./FlowLayout";
import { NextButton } from "./NextButton";
import { ProgressHeader } from "./ProgressHeader";
import { QuestionScreen } from "./QuestionScreen";
import { ResultsScreen } from "./ResultsScreen";
import { WelcomeScreen } from "./WelcomeScreen";

export function FlowShell() {
  const step = useCurrentStep();
  const currentStepId = useFlowStore((s) => s.currentStepId);
  const answers = useFlowStore((s) => s.answers);
  const setSingleAnswer = useFlowStore((s) => s.setSingleAnswer);
  const toggleMultiSelect = useFlowStore((s) => s.toggleMultiSelect);
  const goNext = useFlowStore((s) => s.goNext);
  const goBack = useFlowStore((s) => s.goBack);
  const restart = useFlowStore((s) => s.restart);

  if (!step) return null;

  const isWelcome = step.kind === "welcome";
  const isQuestion = step.kind === "question";
  const isResults = step.kind === "results";
  const showProgress = showsProgressHeader(currentStepId);
  const progress = getQuestionProgress(currentStepId);
  const advanceEnabled = canAdvance(step, answers);

  return (
    <FlowLayout wide={isWelcome}>
      {showProgress && (
        <ProgressHeader
          sectionTitle={progress.sectionTitle}
          fillPercent={progress.fillPercent}
          onBack={goBack}
          showBack={currentStepId !== "household"}
        />
      )}

      {isWelcome && <WelcomeScreen step={step} onNext={goNext} />}

      {isQuestion && (
        <>
          <QuestionScreen
            step={step}
            answers={answers}
            onSelectSingle={(value) => setSingleAnswer(step.id, value)}
            onToggleMulti={(value) =>
              toggleMultiSelect(step.id, value, step.exclusiveOptionId)
            }
          />
          <div className="mt-8">
            <NextButton
              label="Next"
              onClick={goNext}
              disabled={!advanceEnabled}
            />
          </div>
        </>
      )}

      {isResults && (
        <ResultsScreen step={step} answers={answers} onRestart={restart} />
      )}
    </FlowLayout>
  );
}
