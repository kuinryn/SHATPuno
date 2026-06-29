"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SavedMixes } from "./SavedMixes";
import { loadCustomShelfItems, loadSavedMixes, storeSavedMixes } from "@/lib/mixer/localStorage";
import type { Ingredient, SavedMix } from "@/lib/mixer/types";

export function CompareSavedMixes({ ingredients }: { ingredients: Ingredient[] }) {
  const [mixes, setMixes] = useState<SavedMix[]>([]);
  const [customShelfItems, setCustomShelfItems] = useState<Ingredient[]>([]);
  const router = useRouter();

  useEffect(() => {
    setMixes(loadSavedMixes());
    setCustomShelfItems(loadCustomShelfItems());
  }, []);

  function deleteMix(id: string) {
    const next = mixes.filter((mix) => mix.id !== id);
    setMixes(next);
    storeSavedMixes(next);
  }

  function editMix(id: string) {
    router.push(`/mix?saved=${encodeURIComponent(id)}`);
  }

  return (
    <SavedMixes
      mixes={mixes}
      ingredients={[...ingredients, ...customShelfItems]}
      onDelete={deleteMix}
      onEdit={editMix}
    />
  );
}
