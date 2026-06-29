"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FlaskConical } from "lucide-react";
import { calculateMixTotals } from "@/lib/alcohol/calculations";
import { loadCustomShelfItems, loadSavedMixes } from "@/lib/mixer/localStorage";
import type { Ingredient, SavedMix } from "@/lib/mixer/types";

export function CustomMixLibrary({ ingredients }: { ingredients: Ingredient[] }) {
  const [savedMixes, setSavedMixes] = useState<SavedMix[]>([]);
  const [customShelfItems, setCustomShelfItems] = useState<Ingredient[]>([]);

  useEffect(() => {
    setSavedMixes(loadSavedMixes());
    setCustomShelfItems(loadCustomShelfItems());
  }, []);

  const allIngredients = useMemo(() => [...ingredients, ...customShelfItems], [ingredients, customShelfItems]);

  const sortedMixes = useMemo(
    () => [...savedMixes].sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? "")),
    [savedMixes],
  );

  if (sortedMixes.length === 0) {
    return (
      <section className="rounded-md border border-stone-200 bg-white/80 p-5">
        <div className="flex items-center gap-3 text-stone-700">
          <FlaskConical size={20} />
          <div>
            <p className="font-semibold text-stone-950">My custom mixes</p>
            <p className="text-sm text-stone-600">Save a mix in Mix Your Own and it will appear here.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4 rounded-md border border-stone-200 bg-white/80 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-stone-950">My custom drinks</h2>
          <p className="mt-1 text-sm text-stone-600">Saved mixes from Mix Your Own appear here so you can load or edit them again.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sortedMixes.map((mix) => {
          const totals = calculateMixTotals(mix.pours, allIngredients);
          const mainIngredients = [...new Set(totals.pours.map((pour) => pour.name))].slice(0, 4).join(", ");

          return (
            <div key={mix.id} className="group rounded-md border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-stone-500">Custom mix</p>
                  <h3 className="mt-1 text-lg font-black text-stone-950">{mix.name}</h3>
                </div>
                <span className="rounded-full bg-stone-100 px-2 py-1 text-xs font-semibold uppercase text-stone-600">{new Date(mix.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-stone-700">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900">Volume</span>
                  <span>{Math.round(totals.totalVolumeMl)}ml</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900">ABV</span>
                  <span>{totals.finalAbvPercent.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-stone-900">Std drinks</span>
                  <span>{totals.usStandardDrinks.toFixed(2)}</span>
                </div>
                <div>
                  <p className="font-semibold text-stone-900">Ingredients</p>
                  <p className="mt-1 text-sm text-stone-600 truncate">{mainIngredients || "Unknown ingredient"}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/mix?saved=${encodeURIComponent(mix.id)}`} className="inline-flex items-center justify-center rounded-md bg-emerald-900 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
                  Edit mix
                </Link>
                <Link href="/compare" className="inline-flex items-center justify-center rounded-md border border-stone-200 bg-white px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50">
                  View library
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
