export function getStrengthLabel(finalAbvPercent: number, standardDrinks: number) {
  if (standardDrinks === 0) return "No alcohol detected";
  if (finalAbvPercent < 5) return "Low strength";
  if (finalAbvPercent < 12) return "Moderate strength";
  if (standardDrinks > 2 || finalAbvPercent >= 20) return "High-alcohol serving";
  return "Spirit-forward";
}
