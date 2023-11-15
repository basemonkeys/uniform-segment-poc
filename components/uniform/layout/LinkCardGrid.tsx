import {
  type ComponentProps,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc/component";

import { LinkCardGrid as BaseLinkCardGrid } from "@/components/client-components/layout/LinkCardGrid";

export type LinkCardGridProps = ComponentProps<
  {
    title: string;
    description: string;
    cardCount: number;
    children: React.ReactNode;
  },
  "gridItems"
>;
export function LinkCardGrid(props: LinkCardGridProps) {
  const { component, context, slots } = props;

  return (
    <BaseLinkCardGrid {...props}>
      <UniformSlot data={component} context={context} slot={slots.gridItems} />
    </BaseLinkCardGrid>
  );
}
