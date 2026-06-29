import { MixerShell } from "@/components/mixer/MixerShell";
import { getRecipeBySlug, ingredients } from "@/lib/data/drinks";

export default async function MixPage({ searchParams }: { searchParams: Promise<{ recipe?: string }> }) {
  const { recipe: recipeSlug } = await searchParams;
  const recipe = recipeSlug ? getRecipeBySlug(recipeSlug) : undefined;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black text-stone-950">Mix Your Own</h1>
        <p className="mt-1 text-sm text-stone-600">
          {recipe ? `Loaded ${recipe.name}. Edit the pours or save your own version locally.` : "Add ingredients, watch the glass update, and save custom mixes locally in this browser."}
        </p>
      </div>
      <MixerShell ingredients={ingredients} initialPours={recipe?.ingredients} />
    </div>
  );
}
