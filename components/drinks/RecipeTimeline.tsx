import type { Recipe } from "@/lib/mixer/types";
import { getIngredient } from "@/lib/data/drinks";

export function RecipeTimeline({ recipe }: { recipe: Recipe }) {
  return (
    <div className="space-y-3">
      {recipe.ingredients.map((pour, index) => {
        const ingredient = getIngredient(pour.ingredientId);
        return (
          <div key={`${pour.ingredientId}-${index}`} className="flex items-center gap-3">
            <span className="size-4 rounded-full border border-stone-300" style={{ backgroundColor: ingredient?.color }} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-stone-900">{ingredient?.name ?? pour.ingredientId}</p>
              <p className="text-xs text-stone-500">{pour.volumeMl}ml</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
