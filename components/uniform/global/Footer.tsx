import {
  type ComponentProps,
  UniformSlot,
  UniformRichText,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import SocialIcons from "@/components/client-components/navigation/SocialIcons";

const Footer = ({ component, context }: ComponentProps) => {
  return (
    <footer className="bg-gray-600">
      <div className="container flex w-full flex-col gap-16 px-8 py-16 text-center text-sm text-white lg:gap-6">
        <div className="footer-links flex w-full flex-col justify-center gap-3 text-center max-lg:items-center lg:flex-row">
          <UniformSlot name="navigation" data={component} context={context} />
        </div>
        {/* Text Block */}
        <UniformRichText
          parameterId="text"
          component={component}
          className="flex flex-col gap-2"
        />
        {/* Copyright */}
        <UniformRichText
          parameterId="copyright"
          component={component}
          className="italic"
        />
        {/* Social Icons */}
        <SocialIcons />
      </div>
    </footer>
  );
};

registerUniformComponent({
  type: "footer",
  component: Footer,
});

export default Footer;
