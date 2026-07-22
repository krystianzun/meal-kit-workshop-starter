import {
  FLOW_STEPS,
  type FlowAnswers,
  type FlowStep,
  type QuestionStep,
  type StepId,
  getQuestionSteps,
  getSectionForStep,
} from "./flow-data";

function isQuestionVisible(step: QuestionStep, answers: FlowAnswers): boolean {
  if (step.when && !step.when(answers)) return false;
  const section = getSectionForStep(step.id);
  if (section?.when && !section.when(answers)) return false;
  return true;
}

/** Ordered steps visible for the current answers (supports future conditionals). */
export function resolveVisibleSteps(answers: FlowAnswers): FlowStep[] {
  return FLOW_STEPS.filter((step) => {
    if (step.kind === "question") return isQuestionVisible(step, answers);
    return true;
  });
}

export function getNextStepId(
  currentId: StepId,
  answers: FlowAnswers,
): StepId | null {
  const visible = resolveVisibleSteps(answers);
  const idx = visible.findIndex((s) => s.id === currentId);
  if (idx === -1 || idx >= visible.length - 1) return null;
  return visible[idx + 1].id;
}

export function getPrevStepId(
  currentId: StepId,
  answers: FlowAnswers,
): StepId | null {
  const visible = resolveVisibleSteps(answers);
  const idx = visible.findIndex((s) => s.id === currentId);
  if (idx <= 0) return null;
  return visible[idx - 1].id;
}

export function canAdvance(step: FlowStep, answers: FlowAnswers): boolean {
  if (step.kind === "welcome") return true;
  if (step.kind === "results") return true;

  const answer = answers[step.id];
  if (step.selection === "single") {
    return typeof answer === "string" && answer.length > 0;
  }

  if (step.selection === "multi") {
    return Array.isArray(answer) && answer.length > 0;
  }

  return false;
}

export function showsProgressHeader(stepId: StepId): boolean {
  const step = FLOW_STEPS.find((s) => s.id === stepId);
  return step?.kind === "question" || step?.kind === "results";
}

export function getQuestionProgress(stepId: StepId): {
  questionIndex: number;
  questionTotal: number;
  fillPercent: number;
  sectionTitle: string;
} {
  const questions = getQuestionSteps();
  const idx = questions.findIndex((q) => q.id === stepId);
  const section = getSectionForStep(stepId);
  const total = questions.length;

  if (idx === -1) {
    return {
      questionIndex: total,
      questionTotal: total,
      fillPercent: 100,
      sectionTitle: section?.title ?? "Your plan",
    };
  }

  return {
    questionIndex: idx + 1,
    questionTotal: total,
    fillPercent: ((idx + 1) / total) * 100,
    sectionTitle: section?.title ?? "Your plan",
  };
}

export function toggleMultiAnswer(
  current: string[] | undefined,
  value: string,
  exclusiveId?: string,
): string[] {
  const selected = current ?? [];

  if (exclusiveId && value === exclusiveId) {
    return [exclusiveId];
  }

  const withoutExclusive =
    exclusiveId && selected.includes(exclusiveId)
      ? selected.filter((v) => v !== exclusiveId)
      : [...selected];

  if (withoutExclusive.includes(value)) {
    return withoutExclusive.filter((v) => v !== value);
  }

  return [...withoutExclusive, value];
}

export function isOptionSelected(
  step: QuestionStep,
  answers: FlowAnswers,
  value: string,
): boolean {
  const answer = answers[step.id];
  if (step.selection === "single") return answer === value;
  return Array.isArray(answer) && (answer as string[]).includes(value);
}
