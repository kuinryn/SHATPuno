import Link from "next/link";
import { notFound } from "next/navigation";
import { FlaskConical } from "lucide-react";
import { DrinkFacts } from "@/components/drinks/DrinkFacts";
import { RecipeTimeline } from "@/components/drinks/RecipeTimeline";
import { VirtualGlass } from "@/components/mixer/VirtualGlass";
import { WarningPanel } from "@/components/mixer/WarningPanel";
import { getIngredient, getRecipeBySlug, getRecipeTotals, recipes } from "@/lib/data/drinks";
import { ratioParts } from "@/lib/alcohol/calculations";

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export default async function DrinkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();
  const totals = getRecipeTotals(recipe);
  const ratios = ratioParts(recipe.ingredients);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
      <section className="space-y-4">
        <div className="rounded-md border border-stone-200 bg-white/80 p-5">
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span key={tag} className="rounded bg-stone-100 px-2 py-1 text-xs font-bold uppercase text-stone-600">{tag}</span>
            ))}
          </div>
          <h1 className="mt-3 text-3xl font-black text-stone-950">{recipe.name}</h1>
          <p className="mt-2 text-sm leading-6 text-stone-600">{recipe.description}</p>
          <p className="mt-3 text-sm font-semibold text-stone-700">{recipe.originContext}</p>
        </div>

        <DrinkFacts totals={totals} />

        <div className="grid gap-4 md:grid-cols-2">
          <section className="rounded-md border border-stone-200 bg-white/80 p-4">
            <h2 className="text-lg font-black text-stone-950">Ingredients</h2>
            <div className="mt-3 space-y-3">
              {recipe.ingredients.map((pour) => {
                const ingredient = getIngredient(pour.ingredientId);
                return (
                  <div key={pour.ingredientId} className="flex justify-between gap-3 border-b border-stone-100 pb-2 text-sm last:border-0">
                    <span className="font-semibold text-stone-800">{ingredient?.name ?? pour.ingredientId}</span>
                    <span className="font-black text-stone-950">{pour.volumeMl}ml</span>
                  </div>
                );
              })}
            </div>
          </section>
          <section className="rounded-md border border-stone-200 bg-white/80 p-4">
            <h2 className="text-lg font-black text-stone-950">Ratio</h2>
            <div className="mt-3 space-y-2">
              {ratios.map((part) => {
                const ingredient = getIngredient(part.ingredientId);
                return (
                  <p key={part.ingredientId} className="text-sm text-stone-700">
                    <span className="font-bold text-stone-950">{ingredient?.name ?? part.ingredientId}:</span> {part.ratio.toFixed(part.ratio % 1 ? 1 : 0)} part
                  </p>
                );
              })}
            </div>
          </section>
        </div>

        <section className="rounded-md border border-stone-200 bg-white/80 p-4">
          <h2 className="text-lg font-black text-stone-950">Method</h2>
          <ol className="mt-3 space-y-2">
            {recipe.methodSteps.map((step, index) => (
              <li key={step} className="text-sm leading-6 text-stone-700"><span className="font-black text-stone-950">{index + 1}. </span>{step}</li>
            ))}
          </ol>
        </section>
        <WarningPanel standardDrinks={totals.usStandardDrinks} />
      </section>

      <aside className="space-y-4">
        <section className="rounded-md border border-stone-200 bg-white/80 p-4">
          <VirtualGlass pours={totals.pours} capacityMl={Math.max(recipe.servingVolumeMl, 240)} />
          <RecipeTimeline recipe={recipe} />
          <Link href={`/mix?recipe=${recipe.slug}`} className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-stone-950 px-4 text-sm font-black text-white">
            <FlaskConical size={17} /> Load into Mixer
          </Link>
        </section>
        <section className="rounded-md border border-stone-200 bg-white/80 p-4">
          <h2 className="text-sm font-black uppercase text-stone-500">Source Note</h2>
          <p className="mt-2 text-sm leading-6 text-stone-700">{recipe.estimateNote}</p>
          <p className="mt-2 text-xs font-bold uppercase text-stone-500">Confidence: {recipe.sourceConfidence}</p>
        </section>
      </aside>
    </div>
  );
}
