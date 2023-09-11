import { FC } from "react";

import {
  UniformSlot,
  ComponentProps,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

type FooterSectionProps = ComponentProps<{
  title: string;
}>;

const FooterSection: FC<FooterSectionProps> = ({
  title,
  component,
  context,
}) => (
  <div>
    <span className="footer-title text-primary opacity-100">{title}</span>
    <UniformSlot name="navigation" data={component} context={context} />
  </div>
);

registerUniformComponent({
  type: "footerSection",
  component: FooterSection,
});

export default FooterSection;
