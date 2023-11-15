import {
  type ComponentProps,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc/component";

type MemberProfileProps = ComponentProps<"profileInner">;

export async function MemberProfile({
  component,
  context,
  slots,
}: MemberProfileProps) {
  return (
    <div className="my-12 grid grid-cols-1 justify-evenly gap-8 lg:grid-cols-2">
      <UniformSlot
        data={component}
        context={context}
        slot={slots.profileInner}
      />
    </div>
  );
}
