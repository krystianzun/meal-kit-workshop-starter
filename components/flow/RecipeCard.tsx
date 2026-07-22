"use client";

import Image from "next/image";
import type { Recipe } from "@/lib/recipes";
import { recipeThumb } from "@/lib/recipe-images";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const thumb = recipeThumb(recipe);

  return (
    <article className="overflow-hidden rounded-lg border border-olive-300 bg-white transition-shadow duration-200 hover:shadow-md">
      <div className="relative aspect-[16/10] bg-olive-300">
        {thumb ? (
          <Image
            src={thumb}
            alt={recipe.name}
            fill
            className="object-cover"
            sizes="448px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">
            {recipe.emoji}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 p-4">
        <h3 className="text-base font-semibold text-lime-950">{recipe.name}</h3>
        <p className="text-sm text-olive-600">{recipe.description}</p>
        <p className="mt-1 text-xs text-olive-600">{recipe.minutes} min</p>
      </div>
    </article>
  );
}
