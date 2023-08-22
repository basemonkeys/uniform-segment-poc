import {
  ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

export async function Page(props: ComponentProps) {
  const { component } = props || {};
  return (
    <div>
    {/* <pre>{JSON.stringify(component.slots?.content[0]._pattern)}</pre> */}
    <UniformSlot name="content" data={component} />;
    </div>
  )
}

registerUniformComponent({
  type: "page",
  component: Page as any,
});
