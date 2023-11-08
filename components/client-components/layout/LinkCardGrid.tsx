"use client";

import { useSetAtom } from "jotai";
import { gridCardCountAtom, lastGridItemIdAtom } from "@/utils/uiState";

import { type LinkCardGridProps } from "@/components/uniform/layout/LinkCardGrid";

export function LinkCardGrid({
  title,
  description,
  cardCount,
  component,
  children,
}: LinkCardGridProps) {
  const setGridCardCount = useSetAtom(gridCardCountAtom);
  setGridCardCount(cardCount);

  const setLastGridItemId = useSetAtom(lastGridItemIdAtom);
  const gridItems = component?.slots?.gridItems;
  const lastGridItem = gridItems?.[gridItems.length - 1];
  setLastGridItemId(lastGridItem?._id as string);

  return (
    <div className="space-y-6">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">{children}</div>
    </div>
  );
}
