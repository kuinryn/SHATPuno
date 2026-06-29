"use client";

import Link from "next/link";
import { BookOpen, FlaskConical, Scale } from "lucide-react";

export function BottomNav() {
  const items = [
    { href: "/drinks", label: "Library", icon: BookOpen },
    { href: "/mix", label: "Mix", icon: FlaskConical },
    { href: "/compare", label: "Compare", icon: Scale },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-[#fffaf2]/95 px-3 py-2 backdrop-blur sm:hidden">
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1 rounded-md px-2 py-1.5 text-xs font-semibold text-stone-700">
            <item.icon size={18} />
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
