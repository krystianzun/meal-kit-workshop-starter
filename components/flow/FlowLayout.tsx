"use client";

import type { ReactNode } from "react";

interface FlowLayoutProps {
  children: ReactNode;
  wide?: boolean;
}

export function FlowLayout({ children, wide = false }: FlowLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="w-full">
        <div className="flex h-[72px] items-center justify-center gap-2 px-2.5">
          <span className="text-2xl font-black text-lime-950">YumYum</span>
          <span className="rounded-full bg-lime-500 px-2 py-1 text-xs font-semibold text-white">
            MEALS
          </span>
        </div>
        <div className="h-0.5 w-full bg-olive-300" />
      </header>

      <main
        className={`mx-auto w-full flex-1 px-4 py-8 ${
          wide ? "max-w-4xl" : "max-w-md"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
