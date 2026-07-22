import { ALLERGEN_LABELS, type Allergen } from "./recipes";

// ---------------------------------------------------------------------------
// Answer types — keyed by question id in the store
// ---------------------------------------------------------------------------

export type QuestionId =
  | "household"
  | "dinnersPerWeek"
  | "diet"
  | "allergies";

export type HouseholdAnswer = "just_me" | "couple" | "family_kids";
export type DinnersPerWeekAnswer = "2" | "3" | "4" | "5";
export type DietAnswer =
  | "everything"
  | "flexitarian"
  | "pescatarian"
  | "vegetarian"
  | "vegan";

export type FlowAnswers = {
  household?: HouseholdAnswer;
  dinnersPerWeek?: DinnersPerWeekAnswer;
  diet?: DietAnswer;
  allergies?: (Allergen | "none")[];
};

// ---------------------------------------------------------------------------
// Step & section config
// ---------------------------------------------------------------------------

export interface FlowOption {
  value: string;
  label: string;
}

export interface FlowSection {
  id: string;
  title: string;
  /** Question step ids belonging to this section (order within section). */
  stepIds: QuestionId[];
  /** Future: hide entire section when false. */
  when?: (answers: FlowAnswers) => boolean;
}

export type WelcomeStep = {
  kind: "welcome";
  id: "welcome";
  headline: string;
  subhead: string;
  cta: string;
  imageSrc: string;
  imageAlt: string;
};

export type QuestionStep = {
  kind: "question";
  id: QuestionId;
  sectionId: string;
  title: string;
  subtitle: string;
  selection: "single" | "multi";
  options: FlowOption[];
  /** For multi-select: value that clears all other selections. */
  exclusiveOptionId?: string;
  when?: (answers: FlowAnswers) => boolean;
};

export type ResultsStep = {
  kind: "results";
  id: "results";
  headline: string;
  subhead: string;
  summaryIntro: string;
  recipesHeading: string;
  emptyState: string;
  restartCta: string;
};

export type FlowStep = WelcomeStep | QuestionStep | ResultsStep;

export type StepId = FlowStep["id"];

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

export const FLOW_SECTIONS: FlowSection[] = [
  {
    id: "plan",
    title: "Your plan",
    stepIds: ["household", "dinnersPerWeek", "diet", "allergies"],
  },
];

// ---------------------------------------------------------------------------
// All steps (ordered) — edit here to reorder or add steps
// ---------------------------------------------------------------------------

const ALLERGEN_OPTIONS: FlowOption[] = (
  Object.entries(ALLERGEN_LABELS) as [Allergen, string][]
).map(([value, label]) => ({
  value,
  label: label.charAt(0).toUpperCase() + label.slice(1),
}));

export const FLOW_STEPS: FlowStep[] = [
  {
    kind: "welcome",
    id: "welcome",
    headline: "Dinner decisions are hard. Let's fix that in about 60 seconds.",
    subhead:
      "Answer four quick questions and we'll hand you a weekly plan that actually fits your life — no endless scrolling required.",
    cta: "Find my plan",
    imageSrc: "/welcome-hero.jpg",
    imageAlt: "Colourful meal-kit ingredients laid out on a kitchen counter",
  },
  {
    kind: "question",
    id: "household",
    sectionId: "plan",
    title: "Who are you cooking for most nights?",
    subtitle: "Be honest — we won't judge your cereal-for-dinner era.",
    selection: "single",
    options: [
      { value: "just_me", label: "Just me" },
      { value: "couple", label: "Me and one other" },
      { value: "family_kids", label: "A family with kids" },
    ],
  },
  {
    kind: "question",
    id: "dinnersPerWeek",
    sectionId: "plan",
    title: "How many dinners a week should we plan?",
    subtitle: "We'll fill the box — you just decide how many nights to rescue.",
    selection: "single",
    options: [
      { value: "2", label: "2 dinners" },
      { value: "3", label: "3 dinners" },
      { value: "4", label: "4 dinners" },
      { value: "5", label: "5 dinners" },
    ],
  },
  {
    kind: "question",
    id: "diet",
    sectionId: "plan",
    title: "Which best describes how you eat?",
    subtitle: "No lectures — just better matches.",
    selection: "single",
    options: [
      { value: "everything", label: "I eat everything" },
      { value: "flexitarian", label: "Flexitarian" },
      { value: "pescatarian", label: "Pescatarian" },
      { value: "vegetarian", label: "Vegetarian" },
      { value: "vegan", label: "Vegan" },
    ],
  },
  {
    kind: "question",
    id: "allergies",
    sectionId: "plan",
    title: "Any allergies or ingredients you avoid?",
    subtitle: "No judgment — mushrooms are divisive too.",
    selection: "multi",
    exclusiveOptionId: "none",
    options: [
      ...ALLERGEN_OPTIONS,
      { value: "none", label: "None of these" },
    ],
  },
  {
    kind: "results",
    id: "results",
    headline: "Here's your plan",
    subhead: "We listened. Here's what we heard — and what we'd cook.",
    summaryIntro: "What we heard",
    recipesHeading: "Your dinners this week",
    emptyState:
      "Hmm — that's a tricky combo. We couldn't find enough matches, but we're working on it. Try tweaking your answers?",
    restartCta: "Start over",
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export function getStepById(id: StepId): FlowStep | undefined {
  return FLOW_STEPS.find((s) => s.id === id);
}

export function getSectionForStep(stepId: StepId): FlowSection | undefined {
  const step = getStepById(stepId);
  if (!step || step.kind !== "question") return undefined;
  return FLOW_SECTIONS.find((s) => s.id === step.sectionId);
}

export function getQuestionSteps(): QuestionStep[] {
  return FLOW_STEPS.filter((s): s is QuestionStep => s.kind === "question");
}

/** Human-readable labels for results playback. */
export const ANSWER_LABELS: Record<QuestionId, Record<string, string>> = {
  household: {
    just_me: "Just me",
    couple: "Me and one other",
    family_kids: "A family with kids",
  },
  dinnersPerWeek: {
    "2": "2 dinners a week",
    "3": "3 dinners a week",
    "4": "4 dinners a week",
    "5": "5 dinners a week",
  },
  diet: {
    everything: "I eat everything",
    flexitarian: "Flexitarian",
    pescatarian: "Pescatarian",
    vegetarian: "Vegetarian",
    vegan: "Vegan",
  },
  allergies: {
    none: "No allergies or avoids",
    gluten: "Gluten",
    dairy: "Dairy",
    nuts: "Nuts",
    shellfish: "Shellfish",
    soy: "Soy",
    eggs: "Eggs",
  },
};
