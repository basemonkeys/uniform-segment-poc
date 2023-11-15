/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ComponentProps,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc/component";

type MemberHomePageProps = ComponentProps<"banners" | "content">;

// This component is used by all content pages except the home page
export async function Page({ component, context, slots }: MemberHomePageProps) {
  return (
    <main className="main">
      <UniformSlot data={component} context={context} slot={slots.banner} />
      <UniformSlot data={component} context={context} slot={slots.content} />
    </main>
  );
}
