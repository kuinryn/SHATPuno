import type { CalculatedPour, Pour } from "./types";
import { ingredients } from "@/lib/data/drinks";

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((channel) => Math.round(channel).toString(16).padStart(2, "0")).join("")}`;
}

export function blendPourColors(pours: Pick<CalculatedPour, "color" | "volumeMl">[]) {
  const total = pours.reduce((sum, pour) => sum + pour.volumeMl, 0);
  if (total <= 0) return "#dbeafe";
  const mixed = pours.reduce(
    (acc, pour) => {
      const rgb = hexToRgb(pour.color);
      const weight = pour.volumeMl / total;
      return { r: acc.r + rgb.r * weight, g: acc.g + rgb.g * weight, b: acc.b + rgb.b * weight };
    },
    { r: 0, g: 0, b: 0 },
  );
  return rgbToHex(mixed.r, mixed.g, mixed.b);
}

export function poursToVisualLayers(pours: Pour[]) {
  return pours.map((pour) => ({
    ...pour,
    color: ingredients.find((ingredient) => ingredient.id === pour.ingredientId)?.color ?? "#cbd5e1",
  }));
}
