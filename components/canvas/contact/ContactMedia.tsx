import {
  ComponentProps,
  UniformRichText,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

type ContactMediaProps = ComponentProps & {
  heading: string;
};

export function ContactMedia({ heading, component }: ContactMediaProps) {
  return (
    <div className="container m-auto mb-6">
      <h2 className="mb-4">{heading}</h2>
      <UniformRichText parameterId="text" component={component} />
    </div>
  );
}

registerUniformComponent({
  type: "contactMedia",
  component: ContactMedia,
});
