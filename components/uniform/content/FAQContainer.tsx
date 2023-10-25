import {
  type ComponentProps,
  registerUniformComponent,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc";

import { Accordion } from "@/components/ui/accordion";

type FAQProps = ComponentProps<{
  title: string;
}>;

export function FAQContainer({ title, component, context }: FAQProps) {
  return (
    <div className="my-12 rounded-t-lg bg-white">
      <h3 className="p-4 px-6">{title}</h3>
      <Accordion type="single" collapsible>
        <UniformSlot name="faqs" data={component} context={context} />
      </Accordion>
    </div>
  );
}

registerUniformComponent({
  type: "faqContainer",
  component: FAQContainer,
});
