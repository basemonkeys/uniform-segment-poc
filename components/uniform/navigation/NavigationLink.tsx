// import { useMediaQuery } from "react-responsive";

import {
  LinkProps,
  SSHeaderLink,
  SSQuickLink,
  SSFooterLink,
  SSNavigationGroup,
} from "@/components/ui/client-components/navigation/SSNavigationLinks";

export const HeaderLink = ({ title, link }: LinkProps) => {
  return <SSHeaderLink link={link} title={title} />;
};

export const QuickLink = ({ title, link }: LinkProps) => {
  return <SSQuickLink link={link} title={title} />;
};

export const FooterLink = ({ title, link }: LinkProps) => {
  return <SSFooterLink link={link} title={title} />;
};

export const NavigationGroup = (props: LinkProps) => {
  return (
    <>
      <SSNavigationGroup {...props} />
    </>
  );
};
