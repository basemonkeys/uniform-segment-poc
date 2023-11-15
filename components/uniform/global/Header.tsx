import {
  type ComponentProps,
  UniformSlot,
} from "@uniformdev/canvas-next-rsc/component";

import MainNavigation from "@/components/client-components/navigation/MainNavigation";

import { getImageUrl } from "@/utils";

export type HeaderProps = ComponentProps<
  {
    logo: string | Types.CloudinaryImage;
  },
  "navigation"
>;

export const Header = (props: HeaderProps) => {
  const { logo, component, context, slots } = props;

  return (
    <>
      <MainNavigation {...props} logo={getImageUrl(logo)}>
        {/* this UniformSlot component renders the navigation slot which can contain the Header and Footer NavigationLink components and the Accordion(mobile) and Dropdown(desktop) NavigationGroups from SSNavigationLink.tsx and NavigationLink.tsx. This is what displays the main navigation in header. */}
        <UniformSlot
          data={component}
          context={context}
          slot={slots.navigation}
        />
      </MainNavigation>
    </>
  );
};
