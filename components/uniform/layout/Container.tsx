import {
  UniformSlot,
  ComponentProps,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import {
  Container as BaseContainer,
  Props as BaseContainerProps,
  ContainerVariants,
} from "@/components/ui/layout/Container";

export type ContainerProps = ComponentProps<BaseContainerProps>;

export function Container(props: ContainerProps) {
  const { component, context } = props;

  return (
    <BaseContainer {...props} containerVariant={component?.variant}>
      <UniformSlot name="containerInner" data={component} context={context} />
    </BaseContainer>
  );
}

[undefined, ContainerVariants.FullWidth].forEach((variantId) => {
  registerUniformComponent({
    type: "container",
    component: Container,
    variantId,
  });
});

export default Container;
