import {
  type ComponentProps,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import { StepItem as BaseStepItem } from "@/components/client-components/StepItem";

export type StepItemProps = ComponentProps<{
  stepNumber: number;
  title: string;
  description: string;
}>;

export function StepItem(props: StepItemProps) {
  return <BaseStepItem {...props} />;
}

registerUniformComponent({
  type: "stepItem",
  component: StepItem,
});
