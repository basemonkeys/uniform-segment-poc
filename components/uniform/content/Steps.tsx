import {
  registerUniformComponent,
  ComponentProps,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc";

import { Steps as BaseSteps } from "@/components/ui/client-components/Steps";

export type StepsProps = ComponentProps<{
  title: string;
  children: React.ReactNode;
}>;

export enum StepsVariant {
  DarkBackground = "darkBackground",
}

export function Steps(props: StepsProps) {
  const { component, context } = props;

  return (
    <BaseSteps {...props}>
      <UniformSlot name="stepItems" data={component} context={context} />
    </BaseSteps>
  );
}

[undefined, StepsVariant.DarkBackground].forEach((variantId) => {
  registerUniformComponent({
    type: "steps",
    component: Steps,
  });
});
