export type IngredientCategory =
  | "spirit"
  | "beer"
  | "traditional"
  | "wine"
  | "mixer"
  | "citrus"
  | "sweetener"
  | "dilution";

export type Ingredient = {
  id: string;
  name: string;
  category: IngredientCategory;
  defaultAbvPercent: number;
  abvRangePercent?: [number, number];
  color: string;
  isAlcoholic: boolean;
  visualWeight?: number;
};

export type Pour = {
  ingredientId: string;
  volumeMl: number;
};

export type Recipe = {
  id: string;
  slug: string;
  name: string;
  description: string;
  originContext: string;
  glassType: string;
  servingVolumeMl: number;
  ingredients: Pour[];
  methodSteps: string[];
  tags: string[];
  sourceConfidence: "verified" | "estimated" | "mixed";
  estimateNote: string;
};

export type CalculatedPour = Pour & {
  name: string;
  abvPercent: number;
  pureAlcoholMl: number;
  pureAlcoholGrams: number;
  color: string;
  isAlcoholic: boolean;
};

export type MixTotals = {
  totalVolumeMl: number;
  totalPureAlcoholMl: number;
  totalPureAlcoholGrams: number;
  finalAbvPercent: number;
  usStandardDrinks: number;
  pours: CalculatedPour[];
};

export type SavedMix = {
  id: string;
  name: string;
  createdAt: string;
  pours: Pour[];
};
