import { z } from "zod";

export const ingredientSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(["spirit", "beer", "traditional", "wine", "mixer", "citrus", "sweetener", "dilution"]),
  defaultAbvPercent: z.number().min(0).max(100),
  abvRangePercent: z.tuple([z.number().min(0).max(100), z.number().min(0).max(100)]).optional(),
  color: z.string().regex(/^#[0-9a-fA-F]{6}$/),
  isAlcoholic: z.boolean(),
  visualWeight: z.number().positive().optional(),
});

export const pourSchema = z.object({
  ingredientId: z.string().min(1),
  volumeMl: z.number().positive(),
});

export const recipeSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  originContext: z.string().min(1),
  glassType: z.string().min(1),
  servingVolumeMl: z.number().positive(),
  ingredients: z.array(pourSchema).min(1),
  methodSteps: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string().min(1)),
  sourceConfidence: z.enum(["verified", "estimated", "mixed"]),
  estimateNote: z.string().min(1),
});

export const ingredientsSchema = z.array(ingredientSchema);
export const recipesSchema = z.array(recipeSchema);
