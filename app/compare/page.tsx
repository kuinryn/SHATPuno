import { CompareSavedMixes } from "@/components/mixer/CompareSavedMixes";
import { ingredients } from "@/lib/data/drinks";

export default function ComparePage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-black text-stone-950">Compare Saved Mixes</h1>
        <p className="mt-1 text-sm text-stone-600">Saved custom mixes stay in local browser storage and can be compared by volume, ABV, and standard drinks.</p>
      </div>
      <CompareSavedMixes ingredients={ingredients} />
    </div>
  );
}
