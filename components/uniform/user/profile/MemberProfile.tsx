import {
  type ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

export default async function MemberProfile({
  component,
  context,
}: ComponentProps) {
  return (
    <div className="my-12 grid grid-cols-1 justify-evenly gap-8 lg:grid-cols-2">
      <UniformSlot name="profileInner" data={component} context={context} />
    </div>
  );
}

registerUniformComponent({
  type: "memberProfile",
  component: MemberProfile,
});
