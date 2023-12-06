import { type ComponentProps } from "@uniformdev/canvas-next-rsc/component";

import { LinkCard as BaseLinkCard } from "@/components/client-components/navigation/LinkCard";

export type LinkCardProps = ComponentProps<{
  title: string;
  description: string;
  cta: string;
  ctaLink: {
    path: string;
  };
  image: [
    {
      url: string;
    },
  ];
}>;

export function LinkCard(props: LinkCardProps) {
  return <BaseLinkCard {...props} />;
}
