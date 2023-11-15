import {
  type ComponentProps,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc/component";

import { Accordion } from "@/components/primitives/accordion";

type FAQProps = ComponentProps<
  {
    title: string;
  },
  "faqs"
>;

export function FAQ({ title, component, context, slots }: FAQProps) {
  return (
    <div className="my-12 rounded-t-lg bg-white">
      <h3 className="p-4 px-6">{title}</h3>
      <Accordion type="single" collapsible>
        <UniformSlot data={component} context={context} slot={slots.faqs} />
      </Accordion>
    </div>
  );
}
