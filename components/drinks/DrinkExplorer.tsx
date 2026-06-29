"use client";

import { useMemo, useState } from "react";
import { DrinkCard } from "./DrinkCard";
import { DrinkFilters } from "./DrinkFilters";
import type { Recipe } from "@/lib/mixer/types";

export function DrinkExplorer({ recipes }: { recipes: Recipe[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const visibleRecipes = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return recipes.filter((recipe) => {
      const matchesQuery = !normalized || [recipe.name, recipe.description, recipe.originContext, ...recipe.tags].join(" ").toLowerCase().includes(normalized);
      const matchesFilter = filter === "all" || recipe.tags.includes(filter);
      return matchesQuery && matchesFilter;
    });
  }, [filter, query, recipes]);

  return (
    <div className="space-y-4">
      <DrinkFilters query={query} activeFilter={filter} onQueryChange={setQuery} onFilterChange={setFilter} />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleRecipes.map((recipe) => (
          <DrinkCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
      {visibleRecipes.length === 0 && <p className="rounded-md border border-stone-200 bg-white/80 p-6 text-center text-stone-600">No drinks match that search yet.</p>}
    </div>
  );
}
