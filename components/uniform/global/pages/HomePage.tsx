/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

// This component looks the same as Page.tsx in the frontend, but it is a separate Uniform component because it includes Header and Footer slots, which exist only in the Home Uniform Composotion and are designed to be global components. They are being loading into layout.tsx.
export async function HomePage({ component, context }: ComponentProps) {
  return (
    <main className="main">
      <UniformSlot name="banners" data={component} context={context} />
      <UniformSlot name="content" data={component} context={context} />
    </main>
  );
}

registerUniformComponent({
  type: "homePage",
  component: HomePage as React.ComponentType<ComponentProps<any>>,
});
