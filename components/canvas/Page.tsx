import {
  ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

// This component is used by all content pages except the home page
export async function Page({ component, context }: ComponentProps) {
  return (
    <main className="main">
      <UniformSlot name="banners" data={component} context={context} />
      <UniformSlot name="content" data={component} context={context} />
    </main>
  );
}

registerUniformComponent({
  type: "page",
  component: Page as any,
});
