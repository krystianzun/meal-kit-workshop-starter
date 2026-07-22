import {
  FLOW_SECTIONS,
  FLOW_STEPS,
  type FlowAnswers,
  type FlowStep,
  type QuestionId,
  type QuestionStep,
  type SectionProgressSegment,
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

function isSectionVisible(sectionId: string, answers: FlowAnswers): boolean {
  const section = FLOW_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return false;
  if (section.when && !section.when(answers)) return false;
  return true;
}

/** Ordered steps visible for the current answers (supports future conditionals). */
export function resolveVisibleSteps(answers: FlowAnswers): FlowStep[] {
  return FLOW_STEPS.filter((step) => {
    if (step.kind === "welcome" || step.kind === "results") return true;
    if (step.kind === "sectionIntro") {
      return isSectionVisible(step.sectionId, answers);
    }
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
  if (
    step.kind === "welcome" ||
    step.kind === "sectionIntro" ||
    step.kind === "results"
  ) {
    return true;
  }

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
  return (
    step?.kind === "sectionIntro" ||
    step?.kind === "question" ||
    step?.kind === "results"
  );
}

function questionIdsInSection(sectionId: string): QuestionId[] {
  const section = FLOW_SECTIONS.find((s) => s.id === sectionId);
  if (!section) return [];
  return section.stepIds.filter(
    (id): id is QuestionId => !id.startsWith("intro-"),
  );
}

function globalStepIndex(stepId: StepId, answers: FlowAnswers): number {
  const visible = resolveVisibleSteps(answers);
  return visible.findIndex((s) => s.id === stepId);
}

function isStepComplete(step: FlowStep, answers: FlowAnswers): boolean {
  if (step.kind === "sectionIntro") return true;
  if (step.kind === "question") return canAdvance(step, answers);
  return false;
}

/** Segmented progress — one bar + checkpoint square per section. */
export function getSectionsProgress(
  stepId: StepId,
  answers: FlowAnswers,
): SectionProgressSegment[] {
  const currentGlobalIdx = globalStepIndex(stepId, answers);

  return FLOW_SECTIONS.filter((section) =>
    isSectionVisible(section.id, answers),
  ).map((section) => {
    const sectionStepIds = section.stepIds;
    const questions = questionIdsInSection(section.id);
    const questionCount = questions.length;

    const firstSectionGlobalIdx = globalStepIndex(sectionStepIds[0], answers);
    const lastSectionGlobalIdx = globalStepIndex(
      sectionStepIds[sectionStepIds.length - 1],
      answers,
    );

    if (currentGlobalIdx < firstSectionGlobalIdx) {
      return {
        sectionId: section.id,
        fillPercent: 0,
        checkpointComplete: false,
      };
    }

    if (currentGlobalIdx > lastSectionGlobalIdx) {
      return {
        sectionId: section.id,
        fillPercent: 100,
        checkpointComplete: true,
      };
    }

    const currentStep = FLOW_STEPS.find((s) => s.id === stepId);
    if (currentStep?.kind === "sectionIntro" && currentStep.sectionId === section.id) {
      return {
        sectionId: section.id,
        fillPercent: 0,
        checkpointComplete: false,
      };
    }

    if (currentStep?.kind === "question" && currentStep.sectionId === section.id) {
      const qIdx = questions.indexOf(currentStep.id);
      const fillPercent =
        questionCount > 0 ? ((qIdx + 1) / questionCount) * 100 : 0;
      const isLastQuestion = qIdx === questionCount - 1;
      const checkpointComplete =
        isLastQuestion && isStepComplete(currentStep, answers);

      return {
        sectionId: section.id,
        fillPercent,
        checkpointComplete,
      };
    }

    if (stepId === "results") {
      return {
        sectionId: section.id,
        fillPercent: 100,
        checkpointComplete: true,
      };
    }

    return {
      sectionId: section.id,
      fillPercent: 0,
      checkpointComplete: false,
    };
  });
}

export function getProgressHeaderTitle(stepId: StepId): string {
  const section = getSectionForStep(stepId);
  if (section) return section.title;
  if (stepId === "results") return "Your plan";
  return "Your plan";
}

/** @deprecated Use getSectionsProgress — kept for compatibility during migration */
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
      sectionTitle: getProgressHeaderTitle(stepId),
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

export function isFirstProgressStep(stepId: StepId): boolean {
  return stepId === "intro-household";
}
