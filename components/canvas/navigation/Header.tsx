import {
  ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import MainNavigation from "../../navigation/MainNavigation";

type HeaderProps = ComponentProps & {
  logo: string | Types.CloudinaryImage;
};

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { component, context } = props;

  return (
    <>
      <MainNavigation {...props}>
        {/* this UniformSlot component renders the navigation slot which can contain the NavigationGroup and Header and Footer NavigationLink components from NavLink.tsx */}
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
