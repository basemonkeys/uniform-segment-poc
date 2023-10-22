import {
  registerUniformComponent,
  ComponentProps,
  UniformSlotProps,
} from "@uniformdev/canvas-next-rsc";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItemProps = ComponentProps<{
  question: string;
  answer: any;
}>;

export function FAQItem({ question, answer, component }: FAQItemProps) {
  return (
    <AccordionItem value={component._id as string} className="bg-gray-100">
      <AccordionTrigger className="p-4 px-12 text-lg text-link">
        {question}
      </AccordionTrigger>
      <AccordionContent className="prose max-w-full bg-white px-12 py-6">
        {documentToReactComponents(answer)}
      </AccordionContent>
    </AccordionItem>
  );
}

registerUniformComponent({
  type: "faqItem",
  component: FAQItem,
});
