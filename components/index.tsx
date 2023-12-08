import { HomePage } from "./uniform/global/pages/HomePage";
import { Page } from "./uniform/global/pages/Page";
import { Container } from "./uniform/layout/Container";
import { Grid } from "./uniform/layout/Grid";
import { LinkCardGrid } from "./uniform/layout/LinkCardGrid";
import { RichTextContentCard } from "./uniform/content/RichTextContentCard";
import { FAQ } from "./uniform/content/FAQ";
import { FAQItem } from "./uniform/content/FAQItem";
import { Header } from "./uniform/global/Header";
import {
  HeaderLink,
  FooterLink,
  QuickLink,
  NavigationGroup,
} from "./uniform/navigation/NavigationLink";
import { QuickLinks } from "./uniform/navigation/QuickLinks";
import { LinkCard } from "./uniform/navigation/LinkCard";
import { Footer } from "./uniform/global/Footer";
import { Banner } from "./uniform/global/Banner";
import { Hero } from "./uniform/content/Hero";
import { Steps } from "./uniform/content/Steps";
import { StepItem } from "./uniform/content/StepItem";
import { EligibilityForm } from "./uniform/user/eligibility/EligibilityForm";
import { EligibilityTryAgain } from "./uniform/user/eligibility/TryAgain";
import { MemberProfile } from "./uniform/user/profile/MemberProfile";
import { MemberProfileCard } from "./uniform/user/profile/MemberProfileCard";
import { MemberIdCard } from "./uniform/user/profile/MemberIdCard";
import { MemberActivityTrackerCard } from "./uniform/user/profile/MemberActivityTrackerCard";
import { MemberDashboard } from "./uniform/user/dashboard/MemberDashboard";
import { DashboardHeader } from "./uniform/user/dashboard/DashboardHeader";
import { FeaturedLiveClasses } from "./uniform/user/dashboard/FeaturedLiveClasses";
import { FitnessLocations } from "./uniform/user/dashboard/FitnessLocations";
import { Campaigns } from "./uniform/user/dashboard/Campaigns";
import { CampaignItem } from "./uniform/user/dashboard/CampaignItem";
import { CampaignItemAlt } from "./uniform/user/dashboard/CampaignItemAlt";
import { ContactUsForm } from "./uniform/contact/ContactUsForm";
import { ContactCard } from "./uniform/contact/ContactCard";
import { PrivacyPolicy } from "./uniform/content/PrivacyPolicy";
import { TermsOfUse } from "./uniform/content/TermsOfUse";

import {
  type ResolveComponentFunction,
  type ResolveComponentResult,
  DefaultNotImplementedComponent,
} from "@uniformdev/canvas-next-rsc/component";

export const resolveComponent: ResolveComponentFunction = ({ component }) => {
  let resolved: ResolveComponentResult["component"] =
    DefaultNotImplementedComponent;
  if (component.type === "page") {
    resolved = Page;
  } else if (component.type === "homePage") {
    resolved = HomePage;
  } else if (component.type === "container") {
    resolved = Container;
  } else if (component.type === "grid") {
    resolved = Grid;
  } else if (component.type === "linkCardGrid") {
    resolved = LinkCardGrid;
  } else if (component.type === "richTextContentCard") {
    resolved = RichTextContentCard;
  } else if (component.type === "faq") {
    resolved = FAQ;
  } else if (component.type === "faqItem") {
    resolved = FAQItem;
  } else if (component.type === "header") {
    resolved = Header;
  } else if (component.type === "navigationLink") {
    resolved = HeaderLink;
    if (component.variant === "header") {
      resolved = HeaderLink;
    } else if (component.variant === "footer") {
      resolved = FooterLink;
    } else if (component.variant === "quickLink") {
      resolved = QuickLink;
    }
  } else if (component.type === "navigationGroup") {
    resolved = NavigationGroup;
  } else if (component.type === "quickLinks") {
    resolved = QuickLinks;
  } else if (component.type === "linkCard") {
    resolved = LinkCard;
  } else if (component.type === "footer") {
    resolved = Footer;
  } else if (component.type === "banner") {
    resolved = Banner;
  } else if (component.type === "hero") {
    resolved = Hero;
  } else if (component.type === "steps") {
    resolved = Steps;
  } else if (component.type === "stepItem") {
    resolved = StepItem;
  } else if (component.type === "eligibilityForm") {
    resolved = EligibilityForm;
  } else if (component.type === "eligibilityTryAgain") {
    resolved = EligibilityTryAgain;
  } else if (component.type === "memberProfile") {
    resolved = MemberProfile;
  } else if (component.type === "memberProfileCard") {
    resolved = MemberProfileCard;
  } else if (component.type === "memberIdCard") {
    resolved = MemberIdCard;
  } else if (component.type === "memberActivityTrackerCard") {
    resolved = MemberActivityTrackerCard;
  } else if (component.type === "memberDashboard") {
    resolved = MemberDashboard;
  } else if (component.type === "dashboardHeader") {
    resolved = DashboardHeader;
  } else if (component.type === "featuredLiveClasses") {
    resolved = FeaturedLiveClasses;
  } else if (component.type === "fitnessLocations") {
    resolved = FitnessLocations;
  } else if (component.type === "campaigns") {
    resolved = Campaigns;
  } else if (component.type === "campaignItem") {
    resolved = CampaignItem;
  } else if (component.type === "campaignItemAlt") {
    resolved = CampaignItemAlt;
  } else if (component.type === "contactUsForm") {
    resolved = ContactUsForm;
  } else if (component.type === "contactCard") {
    resolved = ContactCard;
  } else if (component.type === "privacyPolicy") {
    resolved = PrivacyPolicy;
  } else if (component.type === "termsOfUse") {
    resolved = TermsOfUse;
  }

  return {
    component: resolved,
  };
};
