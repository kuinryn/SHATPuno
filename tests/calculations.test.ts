import { describe, expect, it } from "vitest";
import { calculateMixTotals } from "@/lib/alcohol/calculations";
import type { Ingredient } from "@/lib/mixer/types";

const testIngredients: Ingredient[] = [
  { id: "spirit", name: "Spirit", category: "spirit", defaultAbvPercent: 40, color: "#ffffff", isAlcoholic: true },
  { id: "mixer", name: "Mixer", category: "mixer", defaultAbvPercent: 0, color: "#000000", isAlcoholic: false },
  { id: "wine", name: "Wine", category: "wine", defaultAbvPercent: 12, color: "#aa0000", isAlcoholic: true },
];

describe("alcohol calculations", () => {
  it("calculates 45ml of 40% spirit as about one U.S. standard drink", () => {
    const totals = calculateMixTotals([{ ingredientId: "spirit", volumeMl: 45 }], testIngredients);
    expect(totals.totalPureAlcoholGrams).toBeCloseTo(14.2, 1);
    expect(totals.usStandardDrinks).toBeCloseTo(1.01, 2);
  });

  it("does not add pure alcohol for a non-alcoholic mixer", () => {
    const totals = calculateMixTotals([{ ingredientId: "mixer", volumeMl: 120 }], testIngredients);
    expect(totals.totalPureAlcoholMl).toBe(0);
    expect(totals.usStandardDrinks).toBe(0);
  });

  it("decreases final ABV when mixer is added", () => {
    const neat = calculateMixTotals([{ ingredientId: "spirit", volumeMl: 45 }], testIngredients);
    const diluted = calculateMixTotals([{ ingredientId: "spirit", volumeMl: 45 }, { ingredientId: "mixer", volumeMl: 90 }], testIngredients);
    expect(diluted.finalAbvPercent).toBeLessThan(neat.finalAbvPercent);
  });

  it("sums pure alcohol across multiple alcoholic ingredients", () => {
    const totals = calculateMixTotals([{ ingredientId: "spirit", volumeMl: 30 }, { ingredientId: "wine", volumeMl: 100 }], testIngredients);
    expect(totals.totalPureAlcoholMl).toBeCloseTo(24, 3);
    expect(totals.totalPureAlcoholGrams).toBeCloseTo(18.936, 3);
  });
});
