import {
  type ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import { LinkCardGrid as BaseLinkCardGrid } from "@/components/client-components/layout/LinkCardGrid";

export type LinkCardGridProps = ComponentProps & {
  title: string;
  description: string;
  cardCount: number;
  children: React.ReactNode;
};
export function LinkCardGrid(props: LinkCardGridProps) {
  const { component, context } = props;

  return (
    <BaseLinkCardGrid {...props}>
      <UniformSlot name="gridItems" data={component} context={context} />
    </BaseLinkCardGrid>
  );
}

registerUniformComponent({
  type: "linkCardGrid",
  component: LinkCardGrid,
});
