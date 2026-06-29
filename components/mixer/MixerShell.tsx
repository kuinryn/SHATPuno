"use client";

import { useEffect, useMemo, useReducer, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BottleShelf } from "./BottleShelf";
import { MixResultPanel } from "./MixResultPanel";
import { PourControls } from "./PourControls";
import { VirtualGlass } from "./VirtualGlass";
import { WarningPanel } from "./WarningPanel";
import { calculateMixTotals } from "@/lib/alcohol/calculations";
import { mixerReducer } from "@/lib/mixer/reducer";
import { loadCustomShelfItems, loadSavedMixes, storeCustomShelfItems, storeSavedMixes } from "@/lib/mixer/localStorage";
import type { Ingredient, IngredientCategory, Pour, SavedMix } from "@/lib/mixer/types";

export function MixerShell({ ingredients, initialPours = [] }: { ingredients: Ingredient[]; initialPours?: Pour[] }) {
  const searchParams = useSearchParams();
  const savedMixId = searchParams.get("saved");
  const [pours, dispatch] = useReducer(mixerReducer, initialPours);
  const [selectedId, setSelectedId] = useState(initialPours[0]?.ingredientId ?? ingredients[0]?.id ?? "");
  const [blended, setBlended] = useState(false);
  const [savedMixes, setSavedMixes] = useState<SavedMix[]>([]);
  const [customShelfItems, setCustomShelfItems] = useState<Ingredient[]>([]);
  const shelfIngredients = useMemo(() => [...ingredients, ...customShelfItems], [ingredients, customShelfItems]);
  const totals = useMemo(() => calculateMixTotals(pours, shelfIngredients), [shelfIngredients, pours]);
  const selected = shelfIngredients.find((ingredient) => ingredient.id === selectedId) ?? shelfIngredients[0];

  useEffect(() => {
    setSavedMixes(loadSavedMixes());
    setCustomShelfItems(loadCustomShelfItems());
  }, []);

  useEffect(() => {
    if (!savedMixId) return;
    const mixes = loadSavedMixes();
    const savedMix = mixes.find((mix) => mix.id === savedMixId);
    if (!savedMix) return;
    dispatch({ type: "load", pours: savedMix.pours });
    setSelectedId(savedMix.pours[0]?.ingredientId ?? shelfIngredients[0]?.id ?? "");
  }, [savedMixId, shelfIngredients]);

  function saveMix() {
    if (pours.length === 0) return;
    const name = window.prompt("Name this mix", `Tagay Mix ${savedMixes.length + 1}`);
    if (!name) return;
    const next = [{ id: crypto.randomUUID(), name, createdAt: new Date().toISOString(), pours }, ...savedMixes];
    setSavedMixes(next);
    storeSavedMixes(next);
  }

  function addCustomShelfItem(ingredient: Omit<Ingredient, "id"> & { id?: string }) {
    const item: Ingredient = { id: ingredient.id ?? `custom-${crypto.randomUUID()}`, ...ingredient };
    setCustomShelfItems((prev) => {
      const next = [item, ...prev];
      storeCustomShelfItems(next);
      return next;
    });
    setSelectedId(item.id);
  }

  function removeCustomShelfItem(id: string) {
    setCustomShelfItems((prev) => {
      const next = prev.filter((item) => item.id !== id);
      storeCustomShelfItems(next);
      return next;
    });
    if (selectedId === id) {
      setSelectedId(shelfIngredients.find((ingredient) => ingredient.id !== id)?.id ?? "");
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(260px,330px)_1fr_minmax(280px,360px)]">
      <BottleShelf
        ingredients={ingredients}
        customShelfItems={customShelfItems}
        selectedId={selected?.id ?? ""}
        onSelect={setSelectedId}
        onAddCustom={addCustomShelfItem}
        onRemoveCustom={removeCustomShelfItem}
      />
      <section className="rounded-md border border-stone-200 bg-white/70 p-4">
        <VirtualGlass pours={totals.pours} capacityMl={360} blended={blended} />
        <div className="mt-4 rounded-md bg-stone-50 p-3">
          <h2 className="text-sm font-black text-stone-950">Ingredient Breakdown</h2>
          <div className="mt-2 space-y-2">
            {totals.pours.length === 0 ? (
              <p className="text-sm text-stone-500">Pick a bottle and add a pour.</p>
            ) : (
              totals.pours.map((pour, index) => (
                <div key={`${pour.ingredientId}-${index}`} className="flex items-center justify-between gap-2 text-sm">
                  <span className="min-w-0 truncate"><span className="mr-2 inline-block size-3 rounded-full" style={{ backgroundColor: pour.color }} />{pour.name}</span>
                  <span className="shrink-0 font-bold">{pour.volumeMl}ml</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <div className="space-y-4">
        <PourControls
          selectedName={selected?.name ?? "None"}
          blended={blended}
          onPour={(volumeMl) => selected && dispatch({ type: "pour", ingredientId: selected.id, volumeMl })}
          onUndo={() => dispatch({ type: "undo" })}
          onReset={() => dispatch({ type: "reset" })}
          onSave={saveMix}
          onToggleBlend={() => setBlended((value) => !value)}
        />
        <div className="rounded-md border border-stone-200 bg-white/90 p-3 text-sm text-stone-700">
          <p className="font-semibold text-stone-900">Saved mixes</p>
          <p className="mt-1">You have {savedMixes.length} saved mix{savedMixes.length === 1 ? "" : "es"}.</p>
          <a href="/compare" className="mt-3 inline-flex rounded-md bg-emerald-900 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800">
            View saved mixes
          </a>
        </div>
        <MixResultPanel totals={totals} />
        <WarningPanel standardDrinks={totals.usStandardDrinks} />
      </div>
    </div>
  );
}
