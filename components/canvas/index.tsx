import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

// Canvas Components
import "./navigation/Header";
import "./Page";
import "./Banner";
import "./Hero";
import {
  HeaderLink,
  FooterLink,
  NavigationGroup,
} from "./navigation/NavigationLink";
import "./navigation/Footer";

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
