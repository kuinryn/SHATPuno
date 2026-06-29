import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getRecipeTotals } from "@/lib/data/drinks";
import type { Recipe } from "@/lib/mixer/types";
import { VirtualGlass } from "@/components/mixer/VirtualGlass";

export function DrinkCard({ recipe }: { recipe: Recipe }) {
  const totals = getRecipeTotals(recipe);

  return (
    <Link href={`/drinks/${recipe.slug}`} className="group grid min-h-[210px] grid-cols-[1fr_82px] gap-3 rounded-md border border-stone-200 bg-white/85 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md">
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap gap-1">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="rounded bg-stone-100 px-2 py-1 text-[11px] font-bold uppercase text-stone-600">
              {tag}
            </span>
          ))}
        </div>
        <h2 className="text-lg font-black text-stone-950">{recipe.name}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-stone-600">{recipe.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <p><span className="font-bold">{totals.finalAbvPercent.toFixed(1)}%</span> ABV</p>
          <p><span className="font-bold">{totals.usStandardDrinks.toFixed(2)}</span> std drinks</p>
        </div>
        <p className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-emerald-800">
          View details <ArrowRight size={15} className="transition group-hover:translate-x-1" />
        </p>
      </div>
      <VirtualGlass compact pours={totals.pours} capacityMl={Math.max(recipe.servingVolumeMl, 180)} />
    </Link>
  );
}
