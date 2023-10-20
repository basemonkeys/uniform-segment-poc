import {
  ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import { QuickLinks as BaseQuickLinks } from "@/components/ui/client-components/navigation/QuickLinks";

export function QuickLinks(props: ComponentProps) {
  const { component, context } = props;
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

export default QuickLinks;
