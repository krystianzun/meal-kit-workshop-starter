"use client";

interface NextButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function NextButton({ label, onClick, disabled = false }: NextButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full rounded-full px-6 py-4 text-base font-bold text-white transition-colors duration-200 active:scale-[0.99] ${
        disabled
          ? "cursor-not-allowed bg-olive-400 opacity-60"
          : "bg-orange-400 hover:bg-orange-800"
      }`}
    >
      {label}
    </button>
  );
}
