import {
  type ComponentProps,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc/component";

import {
  type BaseContainerProps,
  Container as BaseContainer,
} from "@/components/layout/Container";

type ContainerProps = ComponentProps<
  BaseContainerProps & {
    showAsPageTitle: boolean;
  },
  "containerInner"
>;

export function Container(props: ContainerProps) {
  const { showAsPageTitle, component, context, slots } = props;
  const { parameters } = component;

  return (
    <BaseContainer {...props} containerVariant={component?.variant}>
      {showAsPageTitle && (
        <h2 className="mb-2 mt-12">
          {parameters?.title.value as React.ReactNode[]}
        </h2>
      )}
      <UniformSlot
        data={component}
        context={context}
        slot={slots.containerInner}
      />
    </BaseContainer>
  );
}
