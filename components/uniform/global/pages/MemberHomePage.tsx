/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type ComponentProps,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc/component";

type MemberHomePageProps = ComponentProps<"banners" | "content">;

export async function MemberHomePage({
  component,
  context,
  slots,
}: MemberHomePageProps) {
  return (
    <main className="main">
      <UniformSlot data={component} context={context} slot={slots.content} />
      <UniformSlot data={component} context={context} slot={slots.banners} />
    </main>
  );
}
