import {
  ALLERGEN_LABELS,
  CUISINE_LABELS,
  type Allergen,
  type Cuisine,
  type FlavourTag,
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
  | "timeBudget"
  | "soloPortions"
  | "soloVibe"
  | "soloSetup"
  | "coupleSync"
  | "coupleDuty"
  | "coupleOccasion"
  | "familyPickyEater"
  | "familyMealStyle"
  | "familyChaos";

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

// Household follow-ups — conditional on the household answer (see `when` below)
export type SoloPortionsAnswer = "batch" | "freeze" | "small_portions";
export type SoloVibeAnswer = "treat_myself" | "fast_and_done" | "depends";
export type SoloSetupAnswer = "table" | "couch" | "counter";

export type CoupleSyncAnswer = "same_page" | "one_adventurous" | "compromise";
export type CoupleDutyAnswer = "i_cook" | "they_cook" | "we_split";
export type CoupleOccasionAnswer = "sometimes" | "practical" | "bit_of_both";

export type FamilyPickyAnswer = FlavourTag | "none";
export type FamilyMealStyleAnswer =
  | "same_meal"
  | "side_option"
  | "separate_kids_meal";
export type FamilyChaosAnswer = "calm" | "rolling_shifts" | "controlled_chaos";

export type FlowAnswers = {
  household?: HouseholdAnswer;
  dinnersPerWeek?: DinnersPerWeekAnswer;
  diet?: DietAnswer;
  allergies?: (Allergen | "none")[];
  cuisines?: CuisineAnswer[];
  mainGoal?: MainGoalAnswer;
  timeBudget?: TimeBudgetAnswer;
  soloPortions?: SoloPortionsAnswer;
  soloVibe?: SoloVibeAnswer;
  soloSetup?: SoloSetupAnswer;
  coupleSync?: CoupleSyncAnswer;
  coupleDuty?: CoupleDutyAnswer;
  coupleOccasion?: CoupleOccasionAnswer;
  familyPickyEater?: FamilyPickyAnswer[];
  familyMealStyle?: FamilyMealStyleAnswer;
  familyChaos?: FamilyChaosAnswer;
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
  when?: (answers: FlowAnswers) => boolean;
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
  when?: (answers: FlowAnswers) => boolean;
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
  /** Any step can declare a condition on earlier answers — only appears when this returns true. */
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
  when?: (answers: FlowAnswers) => boolean;
};

export type FlowStep =
  | WelcomeStep
  | SectionIntroStep
  | QuestionStep
  | ResultsStep;

export type StepId = FlowStep["id"];

// ---------------------------------------------------------------------------
// Conditional-logic helpers — keep branch conditions readable in FLOW_STEPS
// ---------------------------------------------------------------------------

const whenHousehold = (value: HouseholdAnswer) => (answers: FlowAnswers) =>
  answers.household === value;

// ---------------------------------------------------------------------------
// Sections
// ---------------------------------------------------------------------------

export const FLOW_SECTIONS: FlowSection[] = [
  {
    id: "household",
    title: "Your household",
    stepIds: [
      "intro-household",
      "household",
      "soloPortions",
      "soloVibe",
      "soloSetup",
      "coupleSync",
      "coupleDuty",
      "coupleOccasion",
      "familyPickyEater",
      "familyMealStyle",
      "familyChaos",
      "dinnersPerWeek",
    ],
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

const FLAVOUR_TAG_OPTIONS: FlowOption[] = [
  { value: "mushrooms", label: "Mushrooms" },
  { value: "olives", label: "Olives" },
  { value: "coriander", label: "Coriander" },
  { value: "tofu", label: "Tofu" },
];

export const FLOW_STEPS: FlowStep[] = [
  {
    kind: "welcome",
    id: "welcome",
    headline: "Dinner decisions are hard. Let's fix that in about two minutes.",
    subhead:
      "Three quick chapters, a handful of easy questions — then we hand you a weekly plan that actually fits. No endless scrolling.",
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

  // --- Solo follow-ups (household = "just_me") ------------------------------
  {
    kind: "question",
    id: "soloPortions",
    sectionId: "household",
    title: "Solo cooking has a secret question: what happens to the extras?",
    subtitle:
      "There's no wrong answer. Except the one where it dies quietly in the back of the fridge.",
    selection: "single",
    when: whenHousehold("just_me"),
    options: [
      { value: "batch", label: "Batch it — leftovers all week" },
      { value: "freeze", label: "Freeze it for later" },
      { value: "small_portions", label: "Small portions, no leftovers" },
    ],
  },
  {
    kind: "question",
    id: "soloVibe",
    sectionId: "household",
    title: "When it's just you, what's dinner really about?",
    subtitle: "No one's watching. Be honest.",
    selection: "single",
    when: whenHousehold("just_me"),
    options: [
      { value: "treat_myself", label: "Treating myself properly" },
      { value: "fast_and_done", label: "Fast, filling, done" },
      { value: "depends", label: "Depends on the day" },
    ],
  },
  {
    kind: "question",
    id: "soloSetup",
    sectionId: "household",
    title: "Where does dinner actually happen when you're solo?",
    subtitle: "We won't tell anyone if it's the couch.",
    selection: "single",
    when: whenHousehold("just_me"),
    options: [
      { value: "table", label: "At the table, properly" },
      { value: "couch", label: "Couch, plate on lap" },
      { value: "counter", label: "Standing at the counter" },
    ],
  },

  // --- Couple follow-ups (household = "couple") ------------------------------
  {
    kind: "question",
    id: "coupleSync",
    sectionId: "household",
    title: "You two, at dinner — same wavelength, or need a translator?",
    subtitle: "Be honest. We're not telling them what you picked.",
    selection: "single",
    when: whenHousehold("couple"),
    options: [
      { value: "same_page", label: "Always on the same page" },
      { value: "one_adventurous", label: "One of us is more adventurous" },
      { value: "compromise", label: "We compromise most nights" },
    ],
  },
  {
    kind: "question",
    id: "coupleDuty",
    sectionId: "household",
    title: "Who's usually holding the spatula at your place?",
    subtitle: "No wrong answer — unless you're both lying.",
    selection: "single",
    when: whenHousehold("couple"),
    options: [
      { value: "i_cook", label: "I mostly cook" },
      { value: "they_cook", label: "They mostly cook" },
      { value: "we_split", label: "We split it evenly" },
    ],
  },
  {
    kind: "question",
    id: "coupleOccasion",
    sectionId: "household",
    title: "Do your weeknights ever need to feel like a date?",
    subtitle:
      "Some couples want candles on a Tuesday. No judgment either way.",
    selection: "single",
    when: whenHousehold("couple"),
    options: [
      { value: "sometimes", label: "Sometimes — treat us" },
      { value: "practical", label: "Nah, keep it practical" },
      { value: "bit_of_both", label: "A bit of both" },
    ],
  },

  // --- Family follow-ups (household = "family_kids") -------------------------
  {
    kind: "question",
    id: "familyPickyEater",
    sectionId: "household",
    title:
      "Every family's got a dish that came back untouched. What's the culprit at yours?",
    subtitle: "Tell us what to dodge and we'll keep the peace at the table.",
    selection: "multi",
    exclusiveOptionId: "none",
    when: whenHousehold("family_kids"),
    options: [
      ...FLAVOUR_TAG_OPTIONS,
      { value: "none", label: "Nothing off-limits here" },
    ],
  },
  {
    kind: "question",
    id: "familyMealStyle",
    sectionId: "household",
    title:
      "Does everyone eat the same thing, or is there a 'kids' menu' happening?",
    subtitle: "No shame either way — we've all been there at 6pm on a Tuesday.",
    selection: "single",
    when: whenHousehold("family_kids"),
    options: [
      { value: "same_meal", label: "Same meal for everyone" },
      { value: "side_option", label: "Mostly the same, plus a side" },
      { value: "separate_kids_meal", label: "Kids get their own thing" },
    ],
  },
  {
    kind: "question",
    id: "familyChaos",
    sectionId: "household",
    title: "What's dinner time actually like at yours?",
    subtitle: "Paint us a picture.",
    selection: "single",
    when: whenHousehold("family_kids"),
    options: [
      { value: "calm", label: "Calm, everyone's at the table" },
      { value: "rolling_shifts", label: "Rolling shifts, whenever hungry" },
      { value: "controlled_chaos", label: "Controlled chaos, but it works" },
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
  soloPortions: {
    batch: "Batch it — leftovers all week",
    freeze: "Freeze it for later",
    small_portions: "Small portions, no leftovers",
  },
  soloVibe: {
    treat_myself: "Treating myself properly",
    fast_and_done: "Fast, filling, done",
    depends: "Depends on the day",
  },
  soloSetup: {
    table: "At the table, properly",
    couch: "Couch, plate on lap",
    counter: "Standing at the counter",
  },
  coupleSync: {
    same_page: "Always on the same page",
    one_adventurous: "One of us is more adventurous",
    compromise: "We compromise most nights",
  },
  coupleDuty: {
    i_cook: "I mostly cook",
    they_cook: "They mostly cook",
    we_split: "We split it evenly",
  },
  coupleOccasion: {
    sometimes: "Sometimes — treat us",
    practical: "Nah, keep it practical",
    bit_of_both: "A bit of both",
  },
  familyPickyEater: {
    none: "Nothing off-limits here",
    mushrooms: "Mushrooms",
    olives: "Olives",
    coriander: "Coriander",
    tofu: "Tofu",
  },
  familyMealStyle: {
    same_meal: "Same meal for everyone",
    side_option: "Mostly the same, plus a side",
    separate_kids_meal: "Kids get their own thing",
  },
  familyChaos: {
    calm: "Calm, everyone's at the table",
    rolling_shifts: "Rolling shifts, whenever hungry",
    controlled_chaos: "Controlled chaos, but it works",
  },
};
