import {
  registerUniformComponent,
  ComponentProps,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc";

export type StepsProps = ComponentProps<{
  title: string;
  //   steps: {
  //     title: string;
  //     description: string;
  //   }[];
}>;

export function Steps({ title, component, context }: StepsProps) {
  return (
    <div>
      <h2>{title}</h2>
      <UniformSlot name="stepItems" data={component} context={context} />
    </div>
  );
}

registerUniformComponent({
  type: "steps",
  component: Steps,
});
