"use client";

import Image from "next/image";

interface ProgressHeaderProps {
  sectionTitle: string;
  fillPercent: number;
  onBack: () => void;
  showBack?: boolean;
}

export function ProgressHeader({
  sectionTitle,
  fillPercent,
  onBack,
  showBack = true,
}: ProgressHeaderProps) {
  return (
    <div className="mb-6">
      <div className="mb-4 flex items-center gap-6 pb-6 pt-2">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="flex size-6 shrink-0 items-center justify-center transition-opacity duration-200 hover:opacity-70 active:scale-95"
          >
            <Image
              src="/icons/back-arrow.svg"
              alt=""
              width={24}
              height={24}
              className="size-6"
            />
          </button>
        ) : (
          <div className="size-6 shrink-0" />
        )}
        <p className="flex-1 text-center text-base font-semibold text-lime-950">
          {sectionTitle}
        </p>
        <div className="size-6 shrink-0" />
      </div>

      <div className="flex items-center gap-1">
        <div className="relative h-2 flex-1 overflow-hidden bg-olive-300">
          <div
            className="absolute left-0 top-0 h-full bg-lime-500 transition-[width] duration-300 ease-out"
            style={{ width: `${fillPercent}%` }}
          />
        </div>
        <div className="size-3.5 shrink-0 rounded-sm bg-olive-300" />
      </div>
    </div>
  );
}
