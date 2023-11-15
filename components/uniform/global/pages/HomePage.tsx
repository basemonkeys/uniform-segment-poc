/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ComponentProps,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc/component";

type HomePageProps = ComponentProps<"banners" | "content">;

// This component looks the same as Page.tsx in the frontend, but it is a separate Uniform component because it includes Header and Footer slots, which exist only in the Home Uniform Composotion and are designed to be global components. They are being loading into layout.tsx.
export async function HomePage({ component, context, slots }: HomePageProps) {
  return (
    <main className="main">
      <UniformSlot data={component} context={context} slot={slots.banners} />
      <UniformSlot data={component} context={context} slot={slots.content} />
    </main>
  );
}
