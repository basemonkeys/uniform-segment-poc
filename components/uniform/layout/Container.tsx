import {
  ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import {
  Container as BaseContainer,
  BaseContainerProps,
  ContainerVariants,
} from "@/components/ui/layout/Container";

export type ContainerProps = ComponentProps<BaseContainerProps> & {
  showAsPageTitle: boolean;
};

export function Container(props: ContainerProps) {
  const { showAsPageTitle, component, context } = props;

  return (
    <BaseContainer {...props} containerVariant={component?.variant}>
      {showAsPageTitle && (
        <h2 className="mb-2 mt-12">
          {component.parameters?.title.value as React.ReactNode[]}
        </h2>
      )}
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
