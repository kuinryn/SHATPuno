import { describe, expect, it } from "vitest";
import { ingredientSchema, recipeSchema } from "@/lib/data/schemas";

describe("data schemas", () => {
  it("rejects invalid negative volumes", () => {
    expect(() =>
      recipeSchema.parse({
        id: "bad",
        slug: "bad",
        name: "Bad",
        description: "Bad recipe",
        originContext: "Test",
        glassType: "rocks",
        servingVolumeMl: 100,
        ingredients: [{ ingredientId: "gin", volumeMl: -1 }],
        methodSteps: ["Pour."],
        tags: ["test"],
        sourceConfidence: "estimated",
        estimateNote: "Test",
      }),
    ).toThrow();
  });

  it("rejects impossible ABV values", () => {
    expect(() =>
      ingredientSchema.parse({
        id: "bad",
        name: "Bad",
        category: "spirit",
        defaultAbvPercent: 120,
        color: "#ffffff",
        isAlcoholic: true,
      }),
    ).toThrow();
  });
});
