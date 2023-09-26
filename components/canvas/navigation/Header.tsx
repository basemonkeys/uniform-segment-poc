import {
  ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import MainNavigation from "../../navigation/MainNavigation";

import { getImageUrl } from "@/lib/utils";

export type HeaderProps = ComponentProps & {
  logo: string | Types.CloudinaryImage;
};

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { component, context, logo } = props;

  const getLogo = () => {
    return getImageUrl(logo);
  };

  return (
    <>
      <MainNavigation {...props} logo={getLogo()}>
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
