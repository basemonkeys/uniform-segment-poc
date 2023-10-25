import { atom } from "jotai";

import type { StepsVariant } from "@/components/uniform/content/Steps";

type Variant = undefined | StepsVariant.DarkBackground;

// Steps component background variant
export const stepsBackgroundAtom = atom<Variant>(undefined);
