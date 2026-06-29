import type { Pour } from "./types";

export type MixerAction =
  | { type: "pour"; ingredientId: string; volumeMl: number }
  | { type: "undo" }
  | { type: "reset" }
  | { type: "load"; pours: Pour[] };

export function mixerReducer(pours: Pour[], action: MixerAction): Pour[] {
  switch (action.type) {
    case "pour":
      return [...pours, { ingredientId: action.ingredientId, volumeMl: action.volumeMl }];
    case "undo":
      return pours.slice(0, -1);
    case "reset":
      return [];
    case "load":
      return action.pours;
  }
}
