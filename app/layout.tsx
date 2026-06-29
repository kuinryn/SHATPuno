import type { Metadata } from "next";
import "./globals.css";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "SHATPuno",
  description: "Explore Filipino drinks and simulate responsible recipe mixing.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppHeader />
        <main className="mx-auto w-full max-w-7xl px-4 pb-24 pt-4 sm:px-6 lg:px-8">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
