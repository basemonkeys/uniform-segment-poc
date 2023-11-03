import {
  type ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

export function MemberDashboard({ component, context }: ComponentProps) {
  return (
    <div className="my-12 flex flex-col gap-12">
      <UniformSlot name="dashboardInner" data={component} context={context} />
    </div>
  );
}

registerUniformComponent({
  type: "memberDashboard",
  component: MemberDashboard,
});
