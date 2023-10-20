import {
  ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import MainNavigation from "@/components/ui/client-components/navigation/MainNavigation";

import { getImageUrl } from "@/utils";

export type HeaderProps = ComponentProps & {
  logo: string | Types.CloudinaryImage;
};

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { logo, component, context } = props;

  return (
    <>
      <MainNavigation {...props} logo={getImageUrl(logo)}>
        {/* this UniformSlot component renders the navigation slot which can contain the Header and Footer NavigationLink components and the Accordion(mobile) and Dropdown(desktop) NavigationGroups from SSNavigationLink.tsx and NavigationLink.tsx. This is what displays the main navigation in header. */}
        <UniformSlot name="navigation" data={component} context={context} />
      </MainNavigation>
    </>
  );
};

registerUniformComponent({
  type: "header",
  component: Header,
});

export default Header;
