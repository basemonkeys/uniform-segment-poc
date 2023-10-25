// This is the global component ui state.

import { atom } from "jotai";

import { StepsVariant } from "@/components/uniform/content/Steps";

type Variant = undefined | StepsVariant.DarkBackground;

// This is the background color state of the Steps component set by the variant prop.
export const stepsBackgroundAtom = atom<Variant>(StepsVariant.DarkBackground);
stepsBackgroundAtom.debugLabel = "stepsBackgroundAtom";
