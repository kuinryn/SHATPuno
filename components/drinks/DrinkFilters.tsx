"use client";

import { Search } from "lucide-react";

const filters = ["all", "spirit", "beer", "traditional", "cocktail", "low strength", "stronger"];

export function DrinkFilters({
  query,
  activeFilter,
  onQueryChange,
  onFilterChange,
}: {
  query: string;
  activeFilter: string;
  onQueryChange: (value: string) => void;
  onFilterChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 rounded-md border border-stone-200 bg-white/80 p-3 md:grid-cols-[minmax(220px,1fr)_auto]">
      <label className="relative block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search drinks, ingredients, styles..."
          className="h-11 w-full rounded-md border border-stone-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-emerald-500"
        />
      </label>
      <div className="flex gap-2 overflow-x-auto">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => onFilterChange(filter)}
            className={`h-11 shrink-0 rounded-md px-3 text-sm font-bold capitalize ${activeFilter === filter ? "bg-stone-950 text-white" : "bg-stone-100 text-stone-700 hover:bg-stone-200"}`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
