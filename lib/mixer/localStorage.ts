"use client";

import type { Ingredient, SavedMix } from "./types";

const MIX_STORAGE_KEY = "tagay-lab-saved-mixes";
const SHELF_STORAGE_KEY = "tagay-lab-bar-shelf";

export function loadSavedMixes(): SavedMix[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(MIX_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as SavedMix[];
  } catch {
    return [];
  }
}

export function storeSavedMixes(mixes: SavedMix[]) {
  window.localStorage.setItem(MIX_STORAGE_KEY, JSON.stringify(mixes));
}

export function loadCustomShelfItems(): Ingredient[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(SHELF_STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Ingredient[];
  } catch {
    return [];
  }
}

export function storeCustomShelfItems(items: Ingredient[]) {
  window.localStorage.setItem(SHELF_STORAGE_KEY, JSON.stringify(items));
}
