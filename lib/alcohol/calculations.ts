import { PURE_ALCOHOL_DENSITY_G_PER_ML, US_STANDARD_DRINK_GRAMS } from "./constants";
import type { Ingredient, MixTotals, Pour } from "@/lib/mixer/types";

export function calculatePureAlcoholMl(pouredVolumeMl: number, abvPercent: number) {
  return pouredVolumeMl * (abvPercent / 100);
}

export function calculatePureAlcoholGrams(pureAlcoholMl: number) {
  return pureAlcoholMl * PURE_ALCOHOL_DENSITY_G_PER_ML;
}

export function calculateMixTotals(pours: Pour[], ingredients: Ingredient[]): MixTotals {
  const ingredientMap = new Map(ingredients.map((ingredient) => [ingredient.id, ingredient]));
  const calculatedPours = pours.map((pour) => {
    const ingredient = ingredientMap.get(pour.ingredientId);
    if (!ingredient) {
      throw new Error(`Unknown ingredient: ${pour.ingredientId}`);
    }
    const pureAlcoholMl = calculatePureAlcoholMl(pour.volumeMl, ingredient.defaultAbvPercent);
    return {
      ...pour,
      name: ingredient.name,
      abvPercent: ingredient.defaultAbvPercent,
      pureAlcoholMl,
      pureAlcoholGrams: calculatePureAlcoholGrams(pureAlcoholMl),
      color: ingredient.color,
      isAlcoholic: ingredient.isAlcoholic,
    };
  });

  const totalVolumeMl = calculatedPours.reduce((sum, pour) => sum + pour.volumeMl, 0);
  const totalPureAlcoholMl = calculatedPours.reduce((sum, pour) => sum + pour.pureAlcoholMl, 0);
  const totalPureAlcoholGrams = calculatePureAlcoholGrams(totalPureAlcoholMl);
  const finalAbvPercent = totalVolumeMl > 0 ? (totalPureAlcoholMl / totalVolumeMl) * 100 : 0;
  const usStandardDrinks = totalPureAlcoholGrams / US_STANDARD_DRINK_GRAMS;

  return {
    totalVolumeMl,
    totalPureAlcoholMl,
    totalPureAlcoholGrams,
    finalAbvPercent,
    usStandardDrinks,
    pours: calculatedPours,
  };
}

export function ratioParts(pours: Pour[]) {
  const smallest = Math.min(...pours.filter((pour) => pour.volumeMl > 0).map((pour) => pour.volumeMl));
  return pours.map((pour) => ({
    ...pour,
    ratio: smallest ? pour.volumeMl / smallest : 0,
  }));
}
