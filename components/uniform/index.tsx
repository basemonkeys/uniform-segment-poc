import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

// Canvas Components
import "./global/pages/HomePage";
import "./global/pages/Page";
import "./layout/Container";
import "./layout/Grid";
import "./content/RichTextContentCard";
import "./content/FAQContainer";
import "./content/FAQItem";
import "./global/Header";
import {
  HeaderLink,
  FooterLink,
  QuickLink,
  NavigationGroup,
} from "./navigation/NavigationLink";
import "./navigation/QuickLinks";
import "./global/Footer";
import "./global/Banner";
import "./content/Hero";
import "./content/Steps";
import "./content/StepItem";
import "./user/LoginForm";
import "./user/MemberProfile";
import "./contact/ContactUsForm";
import "./contact/ContactCard";
import "./content/PrivacyPolicy";
import "./content/TermsOfUse";

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
  component: QuickLink,
  variantId: "quickLink",
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
