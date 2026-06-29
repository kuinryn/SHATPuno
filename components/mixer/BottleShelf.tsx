"use client";

"use client";

import { useMemo, useState } from "react";
import { BottleButton } from "./BottleButton";
import type { Ingredient, IngredientCategory } from "@/lib/mixer/types";

const categoryGroups: { key: IngredientCategory; label: string }[] = [
  { key: "spirit", label: "Spirits" },
  { key: "beer", label: "Beer" },
  { key: "traditional", label: "Traditional" },
  { key: "wine", label: "Wine" },
  { key: "mixer", label: "Mixers" },
  { key: "citrus", label: "Citrus" },
  { key: "sweetener", label: "Sweeteners" },
  { key: "dilution", label: "Dilution" },
];

const categoryOptions = categoryGroups.map((group) => ({ value: group.key, label: group.label }));

export function BottleShelf({
  ingredients,
  customShelfItems = [],
  selectedId,
  onSelect,
  onAddCustom,
  onRemoveCustom,
}: {
  ingredients: Ingredient[];
  customShelfItems?: Ingredient[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAddCustom: (ingredient: Ingredient) => void;
  onRemoveCustom: (id: string) => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<IngredientCategory>("spirit");
  const [defaultAbvPercent, setDefaultAbvPercent] = useState(0);
  const [color, setColor] = useState("#cccccc");
  const [isAlcoholic, setIsAlcoholic] = useState(false);

  const allIngredients = useMemo(() => [...ingredients, ...customShelfItems], [ingredients, customShelfItems]);
  const groupedIngredients = useMemo(
    () =>
      categoryGroups
        .map((group) => ({
          ...group,
          items: allIngredients.filter((ingredient) => ingredient.category === group.key),
        }))
        .filter((group) => group.items.length > 0),
    [allIngredients],
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) return;

    onAddCustom({
      id: `custom-${crypto.randomUUID()}`,
      name: name.trim(),
      category,
      defaultAbvPercent,
      color,
      isAlcoholic,
    });
    setName("");
    setDefaultAbvPercent(0);
    setColor("#cccccc");
    setIsAlcoholic(false);
  }

  return (
    <section className="rounded-md border border-stone-200 bg-white/85 p-4">
      <h2 className="text-base font-black text-stone-950">Bar Shelf</h2>

      <div className="mt-3 space-y-4">
        {groupedIngredients.map((group) => (
          <div key={group.key}>
            <h3 className="font-semibold text-stone-700">{group.label}</h3>
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
              {group.items.map((ingredient) => {
                const isCustom = customShelfItems.some((item) => item.id === ingredient.id);
                return (
                  <BottleButton
                    key={ingredient.id}
                    ingredient={ingredient}
                    selected={selectedId === ingredient.id}
                    onClick={() => onSelect(ingredient.id)}
                    onRemove={isCustom ? () => onRemoveCustom(ingredient.id) : undefined}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-6 rounded-md border border-stone-200 bg-stone-50 p-4">
        <h3 className="text-sm font-black text-stone-950">Add bottle to shelf</h3>
        <div className="mt-3 space-y-3 text-sm text-stone-700">
          <label className="block">
            <span className="block text-xs uppercase tracking-wide text-stone-500">Name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-1 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400"
              placeholder="My Bottle"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="block text-xs uppercase tracking-wide text-stone-500">Category</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as IngredientCategory)}
                className="mt-1 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400"
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block text-xs uppercase tracking-wide text-stone-500">ABV (%)</span>
              <input
                type="number"
                value={defaultAbvPercent}
                onChange={(event) => setDefaultAbvPercent(Number(event.target.value))}
                min={0}
                max={100}
                className="mt-1 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-400"
              />
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="block text-xs uppercase tracking-wide text-stone-500">Color</span>
              <input
                type="color"
                value={color}
                onChange={(event) => setColor(event.target.value)}
                className="mt-1 h-10 w-full rounded-md border border-stone-200 bg-white p-1"
              />
            </label>

            <label className="flex items-center gap-2 rounded-md border border-stone-200 bg-white px-3 py-2">
              <input
                type="checkbox"
                checked={isAlcoholic}
                onChange={(event) => setIsAlcoholic(event.target.checked)}
                className="h-4 w-4 rounded border-stone-300 text-emerald-600"
              />
              <span className="text-sm text-stone-700">Alcoholic</span>
            </label>
          </div>

          <button type="submit" className="mt-2 inline-flex items-center justify-center rounded-md bg-emerald-900 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-800">
            Add bottle
          </button>
        </div>
      </form>
    </section>
  );
}
