// import { useMediaQuery } from "react-responsive";

import {
  LinkProps,
  SSFooterLink,
  SSHeaderLink,
  SSHeaderNavigationGroup,
  SSMobileNavigationGroup,
} from "../../navigation/SSNavigationLinks";

export const HeaderLink: React.FC<LinkProps> = ({ title, link }) => {
  return <SSHeaderLink link={link} title={title} />;
};

export const FooterLink: React.FC<LinkProps> = ({ title, link }) => {
  return <SSFooterLink link={link} title={title} />;
};

export const NavigationGroup: React.FC<LinkProps> = (props: LinkProps) => {
  return (
    <>
      <SSHeaderNavigationGroup {...props} />
      <SSMobileNavigationGroup {...props} />
    </>
  );
};
