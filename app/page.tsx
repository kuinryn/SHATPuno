import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { DrinkExplorer } from "@/components/drinks/DrinkExplorer";
import { recipes } from "@/lib/data/drinks";

export default function HomePage() {
  return (
    <div className="space-y-5">
      <section className="grid gap-4 rounded-md border border-stone-200 bg-white/75 p-4 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h1 className="text-2xl font-black text-stone-950 sm:text-3xl">Explore Filipino drinks by volume, ABV, and standard drinks.</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">
            Tagay Lab is an educational library and visual mixer. It uses local curated data and estimates only; it never predicts personal impairment.
          </p>
        </div>
        <Link href="/mix" className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-stone-950 px-4 text-sm font-black text-white">
          <FlaskConical size={17} /> Mix Your Own
        </Link>
      </section>
      <DrinkExplorer recipes={recipes} />
    </div>
  );
}
