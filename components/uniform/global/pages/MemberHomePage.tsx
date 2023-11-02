/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

export async function MemberHomePage({ component, context }: ComponentProps) {
  return (
    <main className="main">
      <UniformSlot name="banners" data={component} context={context} />
      <UniformSlot name="content" data={component} context={context} />
    </main>
  );
}

registerUniformComponent({
  type: "memberHomePage",
  component: MemberHomePage as React.ComponentType<ComponentProps<any>>,
});
