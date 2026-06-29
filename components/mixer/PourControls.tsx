"use client";

import { RotateCcw, Save, Undo2, Waves } from "lucide-react";

export function PourControls({
  selectedName,
  blended,
  onPour,
  onUndo,
  onReset,
  onSave,
  onToggleBlend,
}: {
  selectedName: string;
  blended: boolean;
  onPour: (volumeMl: number) => void;
  onUndo: () => void;
  onReset: () => void;
  onSave: () => void;
  onToggleBlend: () => void;
}) {
  return (
    <section className="rounded-md border border-stone-200 bg-white/85 p-4">
      <p className="text-sm font-semibold text-stone-600">Selected: <span className="text-stone-950">{selectedName}</span></p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[15, 30, 45].map((amount) => (
          <button key={amount} type="button" onClick={() => onPour(amount)} className="h-11 rounded-md bg-emerald-800 px-3 text-sm font-black text-white hover:bg-emerald-900">
            +{amount}ml
          </button>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        <button type="button" title="Undo last pour" onClick={onUndo} className="grid h-11 place-items-center rounded-md bg-stone-100 text-stone-800 hover:bg-stone-200"><Undo2 size={18} /></button>
        <button type="button" title="Reset" onClick={onReset} className="grid h-11 place-items-center rounded-md bg-stone-100 text-stone-800 hover:bg-stone-200"><RotateCcw size={18} /></button>
        <button type="button" title={blended ? "Show layers" : "Stir or shake"} onClick={onToggleBlend} className="grid h-11 place-items-center rounded-md bg-stone-100 text-stone-800 hover:bg-stone-200"><Waves size={18} /></button>
        <button type="button" title="Save mix" onClick={onSave} className="grid h-11 place-items-center rounded-md bg-stone-950 text-white hover:bg-stone-800"><Save size={18} /></button>
      </div>
    </section>
  );
}
