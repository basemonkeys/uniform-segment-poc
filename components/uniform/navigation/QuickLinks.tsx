import {
  type ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import { QuickLinks as BaseQuickLinks } from "@/components/ui/client-components/navigation/QuickLinks";

export default function QuickLinks({ component, context }: ComponentProps) {
  return (
    <>
      <BaseQuickLinks>
        <UniformSlot name="navigation" data={component} context={context} />
      </BaseQuickLinks>
    </>
  );
}

registerUniformComponent({
  type: "quickLinks",
  component: QuickLinks,
});
