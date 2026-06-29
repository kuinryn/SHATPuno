import Link from "next/link";
import { FlaskConical, Scale, Search } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-[#fffaf2]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-md bg-emerald-900 text-amber-200">
            <FlaskConical size={19} />
          </span>
          <span className="truncate text-xl font-black tracking-normal text-stone-950">SHATPuno</span>
        </Link>
        <nav className="hidden items-center gap-1 sm:flex">
          <Link className="rounded-md px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100" href="/drinks">
            Library
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100" href="/mix">
            Mix Your Own
          </Link>
          <Link className="rounded-md px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100" href="/compare">
            Compare
          </Link>
        </nav>
        <Link className="hidden items-center gap-2 rounded-md bg-stone-950 px-3 py-2 text-sm font-bold text-white sm:flex" href="/mix">
          <Search size={16} /> Start Mixing
        </Link>
        <Link className="grid size-10 place-items-center rounded-md bg-stone-950 text-white sm:hidden" href="/compare" aria-label="Compare">
          <Scale size={18} />
        </Link>
      </div>
    </header>
  );
}
