import { AlertTriangle, Info } from "lucide-react";
import { evergreenSafetyNotes, getWarningForStandardDrinks } from "@/lib/alcohol/warnings";

export function WarningPanel({ standardDrinks }: { standardDrinks: number }) {
  const warning = getWarningForStandardDrinks(standardDrinks);
  const color = warning.level === "high" ? "border-red-300 bg-red-50" : warning.level === "caution" ? "border-amber-300 bg-amber-50" : "border-emerald-200 bg-emerald-50";

  return (
    <section className={`rounded-md border p-4 ${color}`}>
      <div className="flex gap-3">
        {warning.level === "high" ? <AlertTriangle className="mt-0.5 shrink-0 text-red-700" size={20} /> : <Info className="mt-0.5 shrink-0 text-emerald-800" size={20} />}
        <div>
          <h2 className="font-bold text-stone-950">{warning.title}</h2>
          <p className="mt-1 text-sm leading-6 text-stone-700">{warning.message}</p>
          <p className="mt-2 text-xs font-semibold text-stone-600">U.S. standard drink basis: 14g pure alcohol.</p>
          <ul className="mt-3 grid gap-1 text-xs leading-5 text-stone-700 sm:grid-cols-2">
            {evergreenSafetyNotes.map((note) => (
              <li key={note}>- {note}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
