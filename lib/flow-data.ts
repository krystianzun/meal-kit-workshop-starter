import {
  ALLERGEN_LABELS,
  CUISINE_LABELS,
  type Allergen,
  type Cuisine,
} from "./recipes";

// ---------------------------------------------------------------------------
// Answer types — keyed by question id in the store
// ---------------------------------------------------------------------------

export type QuestionId =
  | "household"
  | "dinnersPerWeek"
  | "diet"
  | "allergies"
  | "cuisines"
  | "mainGoal"
  | "timeBudget";

export type SectionIntroId =
  | "intro-household"
  | "intro-how-you-eat"
  | "intro-goals";

export type SectionId = "household" | "how-you-eat" | "goals";

export type HouseholdAnswer = "just_me" | "couple" | "family_kids";
export type DinnersPerWeekAnswer = "2" | "3" | "4" | "5";
export type DietAnswer =
  | "everything"
  | "flexitarian"
  | "pescatarian"
  | "vegetarian"
  | "vegan";
export type CuisineAnswer = Cuisine | "any";
export type MainGoalAnswer =
  | "eat_healthier"
  | "save_time"
  | "more_protein"
  | "better_cook";
export type TimeBudgetAnswer = "15" | "30" | "45_plus";

export type FlowAnswers = {
  household?: HouseholdAnswer;
  dinnersPerWeek?: DinnersPerWeekAnswer;
  diet?: DietAnswer;
  allergies?: (Allergen | "none")[];
  cuisines?: CuisineAnswer[];
  mainGoal?: MainGoalAnswer;
  timeBudget?: TimeBudgetAnswer;
};

// ---------------------------------------------------------------------------
// Step & section config
// ---------------------------------------------------------------------------

export interface FlowOption {
  value: string;
  label: string;
}

export interface FlowSection {
  id: SectionId;
  title: string;
  /** Ordered step ids in this section (intros + questions). */
  stepIds: (SectionIntroId | QuestionId)[];
  when?: (answers: FlowAnswers) => boolean;
}

/** One segment per section — square checkpoint at the end of each. */
export interface SectionProgressSegment {
  sectionId: SectionId;
  /** 0–100 fill within this section's bar */
  fillPercent: number;
  /** true once the last step in the section is complete or passed */
  checkpointComplete: boolean;
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

/** Icon key — mapped to MUI icons in SectionIntroIcon.tsx */
export type SectionIntroIconKey = "household" | "dining" | "goals";

export type SectionIntroStep = {
  kind: "sectionIntro";
  id: SectionIntroId;
  sectionId: SectionId;
  icon: SectionIntroIconKey;
  headline: string;
  subhead: string;
  cta: string;
};

export type QuestionStep = {
  kind: "question";
  id: QuestionId;
  sectionId: SectionId;
  title: string;
  subtitle: string;
  selection: "single" | "multi";
  options: FlowOption[];
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

export type FlowStep =
  | WelcomeStep
  | SectionIntroStep
  | QuestionStep
  | ResultsStep;

export type StepId = FlowStep["id"];

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

export const FLOW_SECTIONS: FlowSection[] = [
  {
    id: "household",
    title: "Your household",
    stepIds: ["intro-household", "household", "dinnersPerWeek"],
  },
  {
    id: "how-you-eat",
    title: "How you eat",
    stepIds: ["intro-how-you-eat", "diet", "allergies", "cuisines"],
  },
  {
    id: "goals",
    title: "Your goals",
    stepIds: ["intro-goals", "mainGoal", "timeBudget"],
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

const CUISINE_OPTIONS: FlowOption[] = (
  Object.entries(CUISINE_LABELS) as [Cuisine, string][]
).map(([value, label]) => ({ value, label }));

export const FLOW_STEPS: FlowStep[] = [
  {
    kind: "welcome",
    id: "welcome",
    headline: "Dinner decisions are hard. Let's fix that in about two minutes.",
    subhead:
      "Three quick chapters, seven easy questions — then we hand you a weekly plan that actually fits. No endless scrolling.",
    cta: "Find my plan",
    imageSrc: "/welcome-hero.jpg",
    imageAlt: "Colourful meal-kit ingredients laid out on a kitchen counter",
  },

  {
    kind: "sectionIntro",
    id: "intro-household",
    sectionId: "household",
    icon: "household",
    headline: "First up: who's at your table?",
    subhead:
      "Two quick ones about your household — so we don't send you a family-sized lasagna when it's just you and the cat.",
    cta: "Let's go",
  },
  {
    kind: "question",
    id: "household",
    sectionId: "household",
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
    sectionId: "household",
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
    kind: "sectionIntro",
    id: "intro-how-you-eat",
    sectionId: "how-you-eat",
    icon: "dining",
    headline: "Now — how do you actually eat?",
    subhead:
      "Diet, allergies, and the flavours you genuinely crave. This is where the magic happens.",
    cta: "On we go",
  },
  {
    kind: "question",
    id: "diet",
    sectionId: "how-you-eat",
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
    sectionId: "how-you-eat",
    title: "Any allergies or ingredients you avoid?",
    subtitle: "No judgment — mushrooms are divisive too.",
    selection: "multi",
    exclusiveOptionId: "none",
    options: [...ALLERGEN_OPTIONS, { value: "none", label: "None of these" }],
  },
  {
    kind: "question",
    id: "cuisines",
    sectionId: "how-you-eat",
    title: "Which cuisines make you actually excited about dinner?",
    subtitle: "Pick as many as you like — or tell us you're not picky.",
    selection: "multi",
    exclusiveOptionId: "any",
    options: [
      ...CUISINE_OPTIONS,
      { value: "any", label: "I'm easy — surprise me" },
    ],
  },

  {
    kind: "sectionIntro",
    id: "intro-goals",
    sectionId: "goals",
    icon: "goals",
    headline: "Last chapter: what are you hoping for?",
    subhead:
      "Your goal and your time budget — so we don't suggest a 45-minute curry on a Wednesday.",
    cta: "Almost there",
  },
  {
    kind: "question",
    id: "mainGoal",
    sectionId: "goals",
    title: "What's your main goal right now?",
    subtitle: "No wrong answers — just the one that matters most this week.",
    selection: "single",
    options: [
      { value: "eat_healthier", label: "Eat healthier" },
      { value: "save_time", label: "Spend less time on dinner" },
      { value: "more_protein", label: "Get more protein" },
      { value: "better_cook", label: "Become a better cook" },
    ],
  },
  {
    kind: "question",
    id: "timeBudget",
    sectionId: "goals",
    title: "How much time do you have on a typical weeknight?",
    subtitle: "Be realistic — Tuesday-you is tired.",
    selection: "single",
    options: [
      { value: "15", label: "About 15 minutes" },
      { value: "30", label: "About 30 minutes" },
      { value: "45_plus", label: "45 minutes or more" },
    ],
  },

  {
    kind: "results",
    id: "results",
    headline: "Here's your plan",
    subhead:
      "We listened. Here's what we heard — and what we'd cook this week.",
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

export function getSectionById(id: SectionId): FlowSection | undefined {
  return FLOW_SECTIONS.find((s) => s.id === id);
}

export function getSectionForStep(stepId: StepId): FlowSection | undefined {
  const step = getStepById(stepId);
  if (!step) return undefined;
  if (step.kind === "question" || step.kind === "sectionIntro") {
    return getSectionById(step.sectionId);
  }
  return undefined;
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
  cuisines: {
    italian: "Italian",
    mexican: "Mexican",
    asian: "Asian",
    mediterranean: "Mediterranean",
    indian: "Indian",
    american: "American",
    any: "Open to anything",
  },
  mainGoal: {
    eat_healthier: "Eat healthier",
    save_time: "Spend less time on dinner",
    more_protein: "Get more protein",
    better_cook: "Become a better cook",
  },
  timeBudget: {
    "15": "About 15 minutes",
    "30": "About 30 minutes",
    "45_plus": "45 minutes or more",
  },
};
