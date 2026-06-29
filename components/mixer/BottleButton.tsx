import type { Ingredient } from "@/lib/mixer/types";

export function BottleButton({
  ingredient,
  selected,
  onClick,
  onRemove,
}: {
  ingredient: Ingredient;
  selected: boolean;
  onClick: () => void;
  onRemove?: () => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onClick}
        className={`flex min-h-24 w-full flex-col items-center justify-between rounded-md border p-2 text-center transition ${
          selected ? "border-stone-950 bg-stone-950 text-white" : "border-stone-200 bg-white hover:border-emerald-300"
        }`}
      >
        <span className="h-9 w-5 rounded-t-md rounded-b-sm border border-black/10" style={{ backgroundColor: ingredient.color }} />
        <span className="text-xs font-bold leading-4">{ingredient.name}</span>
        <span className="text-[11px] opacity-75">{ingredient.defaultAbvPercent}%</span>
      </button>
      {onRemove ? (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-red-100 text-red-700 hover:bg-red-200"
          aria-label={`Remove ${ingredient.name}`}
        >
          ×
        </button>
      ) : null}
    </div>
  );
}
