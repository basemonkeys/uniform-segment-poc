import {
  ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

export async function Page({ component, context }: ComponentProps) {
  return (
    <>
      <header>
        <UniformSlot name="header" data={component} context={context} />
      </header>
      <main className="main">
        <UniformSlot name="banners" data={component} context={context} />
        <UniformSlot name="content" data={component} context={context} />
      </main>
      <footer>
        <UniformSlot name="footer" data={component} context={context} />
      </footer>
    </>
  );
}

registerUniformComponent({
  type: "page",
  component: Page as any,
});
