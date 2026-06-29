import { blendPourColors } from "@/lib/mixer/colorBlend";
import type { CalculatedPour } from "@/lib/mixer/types";

type VirtualGlassProps = {
  pours: CalculatedPour[];
  capacityMl?: number;
  blended?: boolean;
  compact?: boolean;
};

export function VirtualGlass({ pours, capacityMl = 330, blended = false, compact = false }: VirtualGlassProps) {
  const total = pours.reduce((sum, pour) => sum + pour.volumeMl, 0);
  const fillPercent = Math.min(100, (total / capacityMl) * 100);
  const mixedColor = blendPourColors(pours);
  let offset = 0;

  return (
    <div className={compact ? "mx-auto w-16" : "mx-auto w-full max-w-[230px]"}>
      <div className={compact ? "relative h-24" : "relative h-80"}>
        <div className="absolute inset-x-3 bottom-0 top-2 rounded-b-[2rem] rounded-t-md border-4 border-stone-800/80 bg-white/45 shadow-inner overflow-hidden">
          <div className="glass-shine pointer-events-none absolute inset-y-0 left-4 z-20 w-10 opacity-50" />
          <div className="absolute inset-x-0 bottom-0 transition-all duration-500" style={{ height: `${fillPercent}%` }}>
            {blended ? (
              <div className="size-full transition-colors duration-500" style={{ backgroundColor: mixedColor }} />
            ) : (
              pours.map((pour, index) => {
                const height = total > 0 ? (pour.volumeMl / total) * 100 : 0;
                const bottom = offset;
                offset += height;
                return (
                  <div
                    key={`${pour.ingredientId}-${index}`}
                    className="absolute inset-x-0 transition-all duration-500"
                    style={{ height: `${height}%`, bottom: `${bottom}%`, backgroundColor: pour.color }}
                    title={`${pour.name} ${pour.volumeMl}ml`}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
      {!compact && <p className="mt-2 text-center text-sm font-semibold text-stone-600">{Math.round(total)}ml in glass</p>}
    </div>
  );
}
