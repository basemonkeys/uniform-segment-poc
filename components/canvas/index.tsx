import { registerUniformComponent } from "@uniformdev/canvas-next-rsc";

// Canvas Components
import "./Page";
import "./Banner";
import "./Hero";
import "./navigation/Header";
import {
  HeaderLink,
  FooterLink,
  NavigationGroup,
} from "./navigation/NavigationLink";

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
