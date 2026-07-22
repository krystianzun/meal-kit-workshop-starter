"use client";

interface OptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

export function OptionCard({ label, selected, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded px-6 py-4 text-center text-base font-medium transition-all duration-200 active:scale-[0.99] ${
        selected
          ? "bg-lime-500 text-white"
          : "bg-olive-300 text-[rgba(25,46,3,0.75)] hover:bg-olive-400"
      }`}
    >
      {label}
    </button>
  );
}
