"use client";

import { Trash2 } from "lucide-react";
import { calculateMixTotals } from "@/lib/alcohol/calculations";
import type { Ingredient, SavedMix } from "@/lib/mixer/types";

export function SavedMixes({ mixes, ingredients, onDelete, onEdit }: { mixes: SavedMix[]; ingredients: Ingredient[]; onDelete: (id: string) => void; onEdit: (id: string) => void }) {
  if (mixes.length === 0) {
    return <p className="rounded-md border border-stone-200 bg-white/85 p-4 text-sm text-stone-600">No saved mixes yet. Build one in Mix Your Own and save it.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-md border border-stone-200 bg-white/85">
      <table className="w-full min-w-[720px] border-collapse text-sm">
        <thead className="bg-stone-100 text-left text-xs uppercase text-stone-500">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Volume</th>
            <th className="p-3">ABV</th>
            <th className="p-3">Std drinks</th>
            <th className="p-3">Main ingredients</th>
            <th className="p-3">Edit</th>
            <th className="p-3">Delete</th>
          </tr>
        </thead>
        <tbody>
          {mixes.map((mix) => {
            const totals = calculateMixTotals(mix.pours, ingredients);
            const mainIngredients = [...new Set(totals.pours.map((pour) => pour.name))].slice(0, 4).join(", ");
            return (
              <tr key={mix.id} className="border-t border-stone-200">
                <td className="p-3 font-bold text-stone-950">{mix.name}</td>
                <td className="p-3">{Math.round(totals.totalVolumeMl)}ml</td>
                <td className="p-3">{totals.finalAbvPercent.toFixed(1)}%</td>
                <td className="p-3">{totals.usStandardDrinks.toFixed(2)}</td>
                <td className="p-3">{mainIngredients}</td>
                <td className="p-3">
                  <button type="button" onClick={() => onEdit(mix.id)} className="rounded-md border border-stone-200 bg-stone-100 px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-200" aria-label={`Edit ${mix.name}`}>
                    Edit
                  </button>
                </td>
                <td className="p-3">
                  <button type="button" onClick={() => onDelete(mix.id)} className="grid size-9 place-items-center rounded-md bg-stone-100 text-stone-700 hover:bg-red-100 hover:text-red-700" aria-label={`Delete ${mix.name}`}>
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
