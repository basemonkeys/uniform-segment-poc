import {
  type ComponentProps,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc/component";

import { QuickLinks as BaseQuickLinks } from "@/components/client-components/navigation/QuickLinks";

type QuickLinksProps = ComponentProps<"navigation">;

export function QuickLinks({ component, context, slots }: QuickLinksProps) {
  return (
    <>
      <BaseQuickLinks>
        <UniformSlot
          data={component}
          context={context}
          slot={slots.navigation}
        />
      </BaseQuickLinks>
    </>
  );
}
