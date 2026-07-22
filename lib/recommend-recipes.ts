import type { FlowAnswers } from "./flow-data";
import {
  type Allergen,
  type Base,
  type Recipe,
  mealTypeOf,
  recipes,
} from "./recipes";

function allowedBases(diet: FlowAnswers["diet"]): Base[] | null {
  switch (diet) {
    case "vegan":
      return ["vegan"];
    case "vegetarian":
      return ["vegetarian", "vegan"];
    case "pescatarian":
      return ["fish", "vegetarian", "vegan"];
    case "everything":
    case "flexitarian":
    default:
      return null;
  }
}

function getSelectedAllergens(answers: FlowAnswers): Allergen[] {
  const raw = answers.allergies;
  if (!raw || raw.length === 0 || raw.includes("none")) return [];
  return raw.filter((a): a is Allergen => a !== "none");
}

function getDinnerLimit(answers: FlowAnswers): number {
  const n = parseInt(answers.dinnersPerWeek ?? "3", 10);
  return Number.isFinite(n) ? n : 3;
}

export function recommendRecipes(answers: FlowAnswers): Recipe[] {
  const bases = allowedBases(answers.diet);
  const allergens = getSelectedAllergens(answers);
  const limit = getDinnerLimit(answers);

  let pool = recipes.filter((r) => mealTypeOf(r) === "dinner");

  if (bases) {
    pool = pool.filter((r) => bases.includes(r.base));
  }

  if (allergens.length > 0) {
    pool = pool.filter(
      (r) => !r.allergens.some((a) => allergens.includes(a)),
    );
  }

  if (answers.household === "family_kids") {
    pool = [...pool].sort((a, b) => {
      if (a.kidFriendly === b.kidFriendly) return 0;
      return a.kidFriendly ? -1 : 1;
    });
  }

  return pool.slice(0, limit);
}

export function formatAllergySummary(answers: FlowAnswers): string {
  const raw = answers.allergies;
  if (!raw || raw.length === 0 || raw.includes("none")) {
    return "No allergies or avoids";
  }
  return raw
    .filter((a) => a !== "none")
    .map((a) => a.charAt(0).toUpperCase() + a.slice(1))
    .join(", ");
}
