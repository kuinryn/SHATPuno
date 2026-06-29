import type { MixTotals } from "@/lib/mixer/types";
import { getStrengthLabel } from "@/lib/alcohol/strengthLabels";

export function MixResultPanel({ totals }: { totals: MixTotals }) {
  return (
    <section className="rounded-md border border-stone-200 bg-white/85 p-4">
      <h2 className="text-base font-black text-stone-950">Live Estimate</h2>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Metric label="Volume" value={`${Math.round(totals.totalVolumeMl)}ml`} />
        <Metric label="Final ABV" value={`${totals.finalAbvPercent.toFixed(1)}%`} />
        <Metric label="Std drinks" value={totals.usStandardDrinks.toFixed(2)} />
        <Metric label="Alcohol" value={`${totals.totalPureAlcoholGrams.toFixed(1)}g`} />
      </div>
      <p className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-950">
        {getStrengthLabel(totals.finalAbvPercent, totals.usStandardDrinks)}
      </p>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-stone-50 p-3">
      <p className="text-xs font-bold uppercase text-stone-500">{label}</p>
      <p className="mt-1 text-xl font-black text-stone-950">{value}</p>
    </div>
  );
}
