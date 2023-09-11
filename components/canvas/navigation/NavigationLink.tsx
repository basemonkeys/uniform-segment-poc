import {
  ComponentProps,
  UniformSlot,
  registerUniformComponent,
} from "@uniformdev/canvas-next-rsc";

import { Link } from "@nextui-org/link";
import NextLink from "next/link";

import { NavbarItem } from "@nextui-org/navbar";

import SSNavigationGroup from "../../navigation/SSNavigationGroup";

export type LinkProps = ComponentProps<{
  title: string;
  link: {
    path: string;
  };
  description: string;
}>;

export const HeaderLink: React.FC<LinkProps> = ({ title, link }) => {
  return (
    <NavbarItem key={link?.path}>
      <Link
        as={NextLink}
        href={link?.path || "#"}
        className="px-3 py-5 hover:bg-default-hover"
        color="foreground"
      >
        {title}
      </Link>
    </NavbarItem>
  );
};

export const FooterLink: React.FC<LinkProps> = ({ title, link }) => (
  <Link
    href={link?.path || "#"}
    className="link text-secondary-content link-hover font-bold"
  >
    {title}
  </Link>
);

export const NavigationGroup = (props: LinkProps) => {
  const { component, context } = props;
  // console.log(props, "NavigationGroup Props");

  return (
    <>
      {/* <UniformSlot name"subNavItems"> would normally go here but the dropdown needs to be an imported component because is requires 'use client'  */}
      <SSNavigationGroup {...props}>
        <UniformSlot name="subNavItems" data={component} context={context} />
      </SSNavigationGroup>
    </>
  );
};

registerUniformComponent({
  type: "navigationLink",
  component: NavigationGroup,
});
