import { getStrengthLabel } from "@/lib/alcohol/strengthLabels";
import type { MixTotals } from "@/lib/mixer/types";

export function DrinkFacts({ totals }: { totals: MixTotals }) {
  const facts = [
    ["Volume", `${Math.round(totals.totalVolumeMl)}ml`],
    ["ABV", `${totals.finalAbvPercent.toFixed(1)}%`],
    ["U.S. standard drinks", totals.usStandardDrinks.toFixed(2)],
    ["Pure alcohol", `${totals.totalPureAlcoholGrams.toFixed(1)}g`],
  ];

  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
      {facts.map(([label, value]) => (
        <div key={label} className="rounded-md border border-stone-200 bg-white/80 p-3">
          <p className="text-xs font-bold uppercase text-stone-500">{label}</p>
          <p className="mt-1 text-lg font-black text-stone-950">{value}</p>
        </div>
      ))}
      <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 lg:col-span-4">
        <p className="text-sm font-bold text-emerald-950">{getStrengthLabel(totals.finalAbvPercent, totals.usStandardDrinks)}</p>
      </div>
    </div>
  );
}
