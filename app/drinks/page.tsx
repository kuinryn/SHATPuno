import { DrinkExplorer } from "@/components/drinks/DrinkExplorer";
import { CustomMixLibrary } from "@/components/drinks/CustomMixLibrary";
import { ingredients, recipes } from "@/lib/data/drinks";

export default function DrinksPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black text-stone-950">Drink Library</h1>
        <p className="mt-1 text-sm text-stone-600">Browse curated Filipino drinks, cocktail templates, and your saved custom mixes.</p>
      </div>
      <CustomMixLibrary ingredients={ingredients} />
      <DrinkExplorer recipes={recipes} />
    </div>
  );
}
