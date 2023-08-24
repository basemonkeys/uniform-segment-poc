import {
  ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

export async function Page(props: ComponentProps) {
  const { component, context } = props || {};
  return <UniformSlot name="content" data={component} context={context} />;
}

registerUniformComponent({
  type: "page",
  component: Page as any,
});
