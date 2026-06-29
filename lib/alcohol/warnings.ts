export type WarningLevel = "none" | "standard" | "caution" | "high";

export function getWarningForStandardDrinks(standardDrinks: number): {
  level: WarningLevel;
  title: string;
  message: string;
} {
  if (standardDrinks <= 0) {
    return {
      level: "none",
      title: "No alcohol detected",
      message: "This mix currently has 0 U.S. standard drinks based on the selected ingredients.",
    };
  }
  if (standardDrinks <= 1) {
    return {
      level: "standard",
      title: "Standard educational note",
      message: "This serving is at or below about one U.S. standard drink.",
    };
  }
  if (standardDrinks <= 2) {
    return {
      level: "caution",
      title: "More than one standard drink",
      message: "This serving contains more than one U.S. standard drink. Sip slowly and consider serving size.",
    };
  }
  return {
    level: "high",
    title: "High-alcohol serving",
    message: "This serving is above two U.S. standard drinks. Treat it as a high-alcohol pour, not a challenge.",
  };
}

export const evergreenSafetyNotes = [
  "Estimates only.",
  "Do not use this to decide whether you can drive.",
  "Alcohol affects people differently.",
  "For adults of legal drinking age only.",
  "Impairment depends on body weight, time, food, medication, tolerance, and other factors.",
];
