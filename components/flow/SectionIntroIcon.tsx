"use client";

import FlagCircleSharp from "@mui/icons-material/FlagCircleSharp";
import GroupsSharp from "@mui/icons-material/GroupsSharp";
import RestaurantMenuSharp from "@mui/icons-material/RestaurantMenuSharp";
import type { SectionIntroIconKey } from "@/lib/flow-data";

const ICONS: Record<
  SectionIntroIconKey,
  typeof GroupsSharp
> = {
  household: GroupsSharp,
  dining: RestaurantMenuSharp,
  goals: FlagCircleSharp,
};

interface SectionIntroIconProps {
  icon: SectionIntroIconKey;
}

export function SectionIntroIcon({ icon }: SectionIntroIconProps) {
  const Icon = ICONS[icon];

  return (
    <div
      className="mx-auto flex size-24 items-center justify-center rounded-full bg-olive-300 transition-transform duration-200"
      aria-hidden
    >
      <Icon className="!text-[40px] text-lime-950/80" />
    </div>
  );
}
