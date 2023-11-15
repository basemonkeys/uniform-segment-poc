import {
  type ComponentProps,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc/component";

import { Steps as BaseSteps } from "@/components/client-components/Steps";

export type StepsProps = ComponentProps<
  {
    title: string;
    children: React.ReactNode;
  },
  "stepItems"
>;

export enum StepsVariant {
  DarkBackground = "darkBackground",
}

export function Steps(props: StepsProps) {
  const { component, context, slots } = props;

  return (
    <BaseSteps {...props}>
      <UniformSlot data={component} context={context} slot={slots.stepItems} />
    </BaseSteps>
  );
}
