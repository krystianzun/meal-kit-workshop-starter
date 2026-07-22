"use client";

import {
  ANSWER_LABELS,
  type FlowAnswers,
  type ResultsStep,
} from "@/lib/flow-data";
import { formatAllergySummary, recommendRecipes } from "@/lib/recommend-recipes";
import { NextButton } from "./NextButton";
import { RecipeCard } from "./RecipeCard";

interface ResultsScreenProps {
  step: ResultsStep;
  answers: FlowAnswers;
  onRestart: () => void;
}

function summaryLines(answers: FlowAnswers): string[] {
  const lines: string[] = [];

  if (answers.household) {
    lines.push(ANSWER_LABELS.household[answers.household] ?? answers.household);
  }
  if (answers.dinnersPerWeek) {
    lines.push(
      ANSWER_LABELS.dinnersPerWeek[answers.dinnersPerWeek] ??
        `${answers.dinnersPerWeek} dinners`,
    );
  }
  if (answers.diet) {
    lines.push(ANSWER_LABELS.diet[answers.diet] ?? answers.diet);
  }
  lines.push(formatAllergySummary(answers));

  return lines;
}

export function ResultsScreen({ step, answers, onRestart }: ResultsScreenProps) {
  const recipes = recommendRecipes(answers);
  const summary = summaryLines(answers);

  return (
    <div className="animate-step-in flex flex-col gap-8 pb-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-medium leading-8 text-lime-950">
          {step.headline}
        </h2>
        <p className="text-base text-olive-600">{step.subhead}</p>
      </div>

      <div className="rounded-lg bg-olive-300/50 p-4">
        <p className="mb-2 text-sm font-semibold text-lime-950">
          {step.summaryIntro}
        </p>
        <ul className="flex flex-col gap-1">
          {summary.map((line) => (
            <li key={line} className="text-sm text-olive-600">
              {line}
            </li>
          ))}
        </ul>
      </div>

      {recipes.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-medium text-lime-950">
            {step.recipesHeading}
          </h3>
          <div className="flex flex-col gap-4">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-base text-olive-600">{step.emptyState}</p>
      )}

      <NextButton label={step.restartCta} onClick={onRestart} />
    </div>
  );
}
