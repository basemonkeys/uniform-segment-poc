import {
  type ComponentProps,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc/component";

type MemberDashboardProps = ComponentProps<"dashboardInner">;

export function MemberDashboard({
  component,
  context,
  slots,
}: MemberDashboardProps) {
  return (
    <div className="my-12 flex flex-col gap-12">
      <UniformSlot
        data={component}
        context={context}
        slot={slots.dashboardInner}
      />
    </div>
  );
}
