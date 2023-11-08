// This is the global component ui state.

import { atom } from "jotai";

import { StepsVariant } from "@/components/uniform/content/Steps";

type Variant = undefined | StepsVariant.DarkBackground;

// This is the background color state of the Steps component set by the variant prop.
export const stepsBackgroundAtom = atom<Variant>(StepsVariant.DarkBackground);
stepsBackgroundAtom.debugLabel = "stepsBackgroundAtom";

// This is the live class status state of the LiveClasses component set by the live class start and end times.
export const liveClassStatusAtom = atom<boolean>(false);
liveClassStatusAtom.debugLabel = "liveClassStatusAtom";

// Member Dashboard Link Card Grid and Link Card components
export const gridCardCountAtom = atom<number>(2);
gridCardCountAtom.debugLabel = "gridCardCountAtom";

export const lastGridItemIdAtom = atom<string>("");
lastGridItemIdAtom.debugLabel = "lastGridItemIdAtom";
