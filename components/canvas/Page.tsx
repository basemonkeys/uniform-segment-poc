import {
  ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

export async function Page({ component, context }: ComponentProps) {
  return (
    <>
      <UniformSlot name="header" data={component} context={context} />
      <main className="main">
        <UniformSlot name="banners" data={component} context={context} />
        <UniformSlot name="content" data={component} context={context} />
      </main>
      <UniformSlot name="footer" data={component} context={context} />
    </>
  );
}

registerUniformComponent({
  type: "page",
  component: Page as any,
});
