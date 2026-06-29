import ingredientsJson from "@/data/ingredients.json";
import recipesJson from "@/data/recipes.json";
import { calculateMixTotals } from "@/lib/alcohol/calculations";
import { ingredientsSchema, recipesSchema } from "./schemas";
import type { Ingredient, Recipe } from "@/lib/mixer/types";

export const ingredients = ingredientsSchema.parse(ingredientsJson) as Ingredient[];
export const recipes = recipesSchema.parse(recipesJson) as Recipe[];

export function getRecipeBySlug(slug: string) {
  return recipes.find((recipe) => recipe.slug === slug);
}

export function getIngredient(id: string) {
  return ingredients.find((ingredient) => ingredient.id === id);
}

export function getRecipeTotals(recipe: Recipe) {
  return calculateMixTotals(recipe.ingredients, ingredients);
}

export function ingredientNamesFor(recipe: Recipe) {
  return recipe.ingredients.map((pour) => getIngredient(pour.ingredientId)?.name ?? pour.ingredientId);
}
