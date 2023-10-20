// import { useMediaQuery } from "react-responsive";

import {
  LinkProps,
  SSHeaderLink,
  SSQuickLink,
  SSFooterLink,
  SSNavigationGroup,
} from "@/components/ui/client-components/navigation/SSNavigationLinks";

export const HeaderLink: React.FC<LinkProps> = ({ title, link }) => {
  return <SSHeaderLink link={link} title={title} />;
};

export const QuickLink: React.FC<LinkProps> = ({ title, link }) => {
  return <SSQuickLink link={link} title={title} />;
};

export const FooterLink: React.FC<LinkProps> = ({ title, link }) => {
  return <SSFooterLink link={link} title={title} />;
};

export const NavigationGroup: React.FC<LinkProps> = (props: LinkProps) => {
  return (
    <>
      <SSNavigationGroup {...props} />
    </>
  );
};
