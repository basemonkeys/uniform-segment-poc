import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

// Canvas Components
import "./pages/HomePage";
import "./pages/Page";
import "./navigation/Header";
import {
  HeaderLink,
  FooterLink,
  NavigationGroup,
} from "./navigation/NavigationLink";
import "./navigation/Footer";
import "./Banner";
import "./Hero";
import "./MemberProfile";
import "./contact/ContactUsForm";
import "./contact/ContactPhone";
import "./contact/ContactMedia";
import "./PrivacyPolicy";
import "./TermsOfUse";

// default variant
registerUniformComponent({
  type: "navigationLink",
  component: HeaderLink,
});

registerUniformComponent({
  type: "navigationLink",
  component: HeaderLink,
  variantId: "header",
});

registerUniformComponent({
  type: "navigationLink",
  component: FooterLink,
  variantId: "footer",
});

registerUniformComponent({
  type: "navigationGroup",
  component: NavigationGroup,
});
